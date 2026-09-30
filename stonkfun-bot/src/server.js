import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import WebSocket from 'ws';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const PORT = Number(process.env.PORT || 3000);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://mempoolsurfclub.com';
const RPC_HTTP_URL = process.env.RPC_HTTP_URL;
const RPC_WS_URL = process.env.RPC_WS_URL;
const DATABASE_URL = process.env.DATABASE_URL;

const LAUNCHLAB_PROGRAM='LanMV9sAd7wArD4vJFi2qDdfnVhFxYSUg6eADduJ3uj';
const STANDARD='4E876qZTE9FJMrBzgVtBrSrzz2TLivB5Y5QXPjB4gZL7';
const REWARD='6BwHHDg3u1854jC8PDLXvR4spTcLNaoBxLJNGC4nTESt';
const SNAPSHOT_AGES=[10,30,60,120,300,900,3600];

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

const db = DATABASE_URL ? new Pool({
  connectionString:DATABASE_URL,
  max:5,
  idleTimeoutMillis:30000,
  connectionTimeoutMillis:10000
}) : null;

const state={
  startedAt:new Date().toISOString(),
  status:'starting',
  dbStatus:DATABASE_URL?'connecting':'disabled',
  seen:new Set(),
  launches:[],
  metrics:{launchesToday:0,trackingNow:0,graduatedToday:0,standardToday:0,rewardToday:0,buyPressurePct:0,medianLiquidityUsd:0,paperPnlSol:0}
};

function n(v){ const x=Number(v); return Number.isFinite(x)?x:null; }
function dayKey(d=new Date()){ return d.toISOString().slice(0,10); }
function median(values){
  const a=values.filter(Number.isFinite).sort((x,y)=>x-y);
  if(!a.length) return 0;
  const m=Math.floor(a.length/2);
  return a.length%2?a[m]:(a[m-1]+a[m])/2;
}
function recompute(){
  const today=dayKey();
  const todays=state.launches.filter(x=>String(x.detectedAt).slice(0,10)===today);
  state.metrics.launchesToday=todays.length;
  state.metrics.trackingNow=state.launches.filter(x=>x.signal!=='reject').length;
  state.metrics.standardToday=todays.filter(x=>x.launchType==='standard').length;
  state.metrics.rewardToday=todays.filter(x=>x.launchType==='reward').length;
  const buys=state.launches.reduce((s,x)=>s+Number(x.buys||0),0);
  const sells=state.launches.reduce((s,x)=>s+Number(x.sells||0),0);
  state.metrics.buyPressurePct=(buys+sells)>0?Math.round((buys/(buys+sells))*100):0;
  state.metrics.medianLiquidityUsd=Math.round(median(state.launches.map(x=>Number(x.liquidityUsd)).filter(Number.isFinite)));
}

async function initDb(){
  if(!db) return;
  await db.query(`
    CREATE TABLE IF NOT EXISTS launches (
      id BIGSERIAL PRIMARY KEY,
      signature TEXT UNIQUE NOT NULL,
      mint TEXT NOT NULL,
      slot BIGINT,
      launch_type TEXT,
      quote_mint TEXT,
      pool_state TEXT,
      creator TEXT,
      detected_at TIMESTAMPTZ NOT NULL,
      symbol TEXT,
      name TEXT,
      image_url TEXT,
      pair_address TEXT,
      dex_id TEXT,
      last_price_usd DOUBLE PRECISION,
      last_market_cap_usd DOUBLE PRECISION,
      last_liquidity_usd DOUBLE PRECISION,
      last_volume_h24_usd DOUBLE PRECISION,
      last_buys_m5 INTEGER,
      last_sells_m5 INTEGER,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS launches_detected_at_idx ON launches(detected_at DESC);
    CREATE INDEX IF NOT EXISTS launches_mint_idx ON launches(mint);

    CREATE TABLE IF NOT EXISTS snapshots (
      id BIGSERIAL PRIMARY KEY,
      launch_signature TEXT NOT NULL,
      mint TEXT NOT NULL,
      target_age_sec INTEGER NOT NULL,
      observed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      price_usd DOUBLE PRECISION,
      market_cap_usd DOUBLE PRECISION,
      fdv_usd DOUBLE PRECISION,
      liquidity_usd DOUBLE PRECISION,
      volume_m5_usd DOUBLE PRECISION,
      volume_h1_usd DOUBLE PRECISION,
      volume_h24_usd DOUBLE PRECISION,
      buys_m5 INTEGER,
      sells_m5 INTEGER,
      buys_h1 INTEGER,
      sells_h1 INTEGER,
      price_change_m5 DOUBLE PRECISION,
      price_change_h1 DOUBLE PRECISION,
      pair_address TEXT,
      dex_id TEXT,
      UNIQUE(launch_signature,target_age_sec)
    );
    CREATE INDEX IF NOT EXISTS snapshots_mint_idx ON snapshots(mint, observed_at DESC);
  `);
  state.dbStatus='online';
}

async function loadRecentLaunches(){
  if(!db) return;
  const {rows}=await db.query(`
    SELECT signature,mint,slot,launch_type,quote_mint,pool_state,creator,detected_at,
           symbol,name,image_url,pair_address,dex_id,last_price_usd,last_market_cap_usd,
           last_liquidity_usd,last_volume_h24_usd,last_buys_m5,last_sells_m5
    FROM launches
    ORDER BY detected_at DESC
    LIMIT 500
  `);
  state.launches=rows.map(r=>({
    signature:r.signature,mint:r.mint,slot:Number(r.slot||0),launchType:r.launch_type,
    quoteMint:r.quote_mint,poolState:r.pool_state,creator:r.creator,
    detectedAt:new Date(r.detected_at).toISOString(),symbol:r.symbol,name:r.name,imageUrl:r.image_url,
    pairAddress:r.pair_address,dexId:r.dex_id,priceUsd:n(r.last_price_usd),
    marketCapUsd:n(r.last_market_cap_usd),liquidityUsd:n(r.last_liquidity_usd),
    volumeUsd:n(r.last_volume_h24_usd),buys:Number(r.last_buys_m5||0),sells:Number(r.last_sells_m5||0),
    graduationPct:0,signal:'watch'
  }));
  for(const l of state.launches) state.seen.add(l.signature);
  recompute();
}

async function persistLaunch(launch){
  if(!db) return;
  await db.query(`
    INSERT INTO launches(signature,mint,slot,launch_type,quote_mint,pool_state,creator,detected_at)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8)
    ON CONFLICT(signature) DO NOTHING
  `,[
    launch.signature,launch.mint,launch.slot,launch.launchType,launch.quoteMint,
    launch.poolState,launch.creator,launch.detectedAt
  ]);
}

async function rpc(method,params){
  for(let attempt=0;attempt<6;attempt++){
    const r=await fetch(RPC_HTTP_URL,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params})});
    const j=await r.json();
    if(!j.error) return j.result;
    const msg=String(j.error?.message||'RPC error');
    if((r.status===429 || /too many requests/i.test(msg)) && attempt<5){
      await new Promise(resolve=>setTimeout(resolve,500*Math.pow(2,attempt)));
      continue;
    }
    throw new Error(msg);
  }
}

async function inspect(signature,slot){
  for(let i=0;i<8;i++){
    const tx=await rpc('getTransaction',[signature,{encoding:'jsonParsed',commitment:'confirmed',maxSupportedTransactionVersion:1}]);
    if(!tx){await new Promise(r=>setTimeout(r,500+i*200));continue;}
    for(const ix of tx?.transaction?.message?.instructions||[]){
      if(ix?.programId!==LAUNCHLAB_PROGRAM || !Array.isArray(ix.accounts)) continue;
      if(ix.accounts[3]!==STANDARD && ix.accounts[3]!==REWARD) continue;
      return {
        detectedAt:new Date().toISOString(),signature,slot,
        launchType:ix.accounts[3]===REWARD?'reward':'standard',
        mint:ix.accounts[6],quoteMint:ix.accounts[7]||null,poolState:ix.accounts[5]||null,
        creator:ix.accounts[1]||null,symbol:null,name:null,imageUrl:null,pairAddress:null,dexId:null,
        priceUsd:null,marketCapUsd:null,liquidityUsd:null,volumeUsd:null,
        buys:0,sells:0,graduationPct:0,signal:'watch'
      };
    }
    return null;
  }
  return null;
}

function selectBestPair(pairs,mint){
  return (pairs||[])
    .filter(p=>p?.chainId==='solana' && p?.baseToken?.address===mint)
    .sort((a,b)=>Number(b?.liquidity?.usd||0)-Number(a?.liquidity?.usd||0))[0] || null;
}

async function fetchDexPairs(mints){
  const results=new Map();
  for(let i=0;i<mints.length;i+=30){
    const batch=mints.slice(i,i+30);
    try{
      const r=await fetch('https://api.dexscreener.com/tokens/v1/solana/'+batch.join(','),{headers:{accept:'application/json'}});
      if(!r.ok) throw new Error('DexScreener HTTP '+r.status);
      const pairs=await r.json();
      for(const mint of batch) results.set(mint,selectBestPair(pairs,mint));
    }catch(e){
      console.error('dexscreener',e.message||e);
      for(const mint of batch) results.set(mint,null);
    }
    if(i+30<mints.length) await new Promise(resolve=>setTimeout(resolve,250));
  }
  return results;
}

async function collectSnapshots(){
  if(!db || state.dbStatus!=='online') return;
  try{
    const {rows:launches}=await db.query(`
      SELECT signature,mint,detected_at
      FROM launches
      WHERE detected_at > NOW() - INTERVAL '2 hours'
      ORDER BY detected_at DESC
    `);
    if(!launches.length) return;

    const sigs=launches.map(x=>x.signature);
    const {rows:existing}=await db.query(
      'SELECT launch_signature,target_age_sec FROM snapshots WHERE launch_signature = ANY($1::text[])',
      [sigs]
    );
    const have=new Set(existing.map(x=>x.launch_signature+':'+x.target_age_sec));
    const now=Date.now();
    const due=[];

    for(const l of launches){
      const age=Math.max(0,(now-new Date(l.detected_at).getTime())/1000);
      for(const target of SNAPSHOT_AGES){
        const tolerance=Math.max(20,Math.round(target*0.25));
        if(age>=target && age<=target+tolerance && !have.has(l.signature+':'+target)){
          due.push({signature:l.signature,mint:l.mint,target});
        }
      }
    }
    if(!due.length) return;

    const mints=[...new Set(due.map(x=>x.mint))];
    const pairMap=await fetchDexPairs(mints);

    for(const item of due){
      const p=pairMap.get(item.mint);
      if(!p) continue;
      const row={
        priceUsd:n(p.priceUsd),marketCapUsd:n(p.marketCap),fdvUsd:n(p.fdv),
        liquidityUsd:n(p?.liquidity?.usd),volumeM5:n(p?.volume?.m5),volumeH1:n(p?.volume?.h1),
        volumeH24:n(p?.volume?.h24),buysM5:Number(p?.txns?.m5?.buys||0),sellsM5:Number(p?.txns?.m5?.sells||0),
        buysH1:Number(p?.txns?.h1?.buys||0),sellsH1:Number(p?.txns?.h1?.sells||0),
        priceChangeM5:n(p?.priceChange?.m5),priceChangeH1:n(p?.priceChange?.h1)
      };
      await db.query(`
        INSERT INTO snapshots(
          launch_signature,mint,target_age_sec,price_usd,market_cap_usd,fdv_usd,liquidity_usd,
          volume_m5_usd,volume_h1_usd,volume_h24_usd,buys_m5,sells_m5,buys_h1,sells_h1,
          price_change_m5,price_change_h1,pair_address,dex_id
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
        ON CONFLICT(launch_signature,target_age_sec) DO NOTHING
      `,[
        item.signature,item.mint,item.target,row.priceUsd,row.marketCapUsd,row.fdvUsd,row.liquidityUsd,
        row.volumeM5,row.volumeH1,row.volumeH24,row.buysM5,row.sellsM5,row.buysH1,row.sellsH1,
        row.priceChangeM5,row.priceChangeH1,p.pairAddress||null,p.dexId||null
      ]);
      await db.query(`
        UPDATE launches SET
          symbol=$2,name=$3,image_url=$4,pair_address=$5,dex_id=$6,last_price_usd=$7,
          last_market_cap_usd=$8,last_liquidity_usd=$9,last_volume_h24_usd=$10,
          last_buys_m5=$11,last_sells_m5=$12,updated_at=NOW()
        WHERE signature=$1
      `,[
        item.signature,p?.baseToken?.symbol||null,p?.baseToken?.name||null,p?.info?.imageUrl||null,
        p.pairAddress||null,p.dexId||null,row.priceUsd,row.marketCapUsd,row.liquidityUsd,
        row.volumeH24,row.buysM5,row.sellsM5
      ]);

      const local=state.launches.find(x=>x.signature===item.signature);
      if(local){
        local.symbol=p?.baseToken?.symbol||local.symbol;
        local.name=p?.baseToken?.name||local.name;
        local.imageUrl=p?.info?.imageUrl||local.imageUrl;
        local.pairAddress=p.pairAddress||local.pairAddress;
        local.dexId=p.dexId||local.dexId;
        local.priceUsd=row.priceUsd;
        local.marketCapUsd=row.marketCapUsd;
        local.liquidityUsd=row.liquidityUsd;
        local.volumeUsd=row.volumeH24;
        local.buys=row.buysM5;
        local.sells=row.sellsM5;
      }
    }
    recompute();
  }catch(e){
    console.error('snapshot collector',e.message||e);
  }
}

function connect(){
  if(!RPC_HTTP_URL||!RPC_WS_URL){state.status='config-needed';console.error('RPC URLs missing');return;}
  const ws=new WebSocket(RPC_WS_URL);
  const queue=[];
  let draining=false;

  async function drain(){
    if(draining) return;
    draining=true;
    while(queue.length){
      const item=queue.shift();
      if(!item || state.seen.has(item.signature)) continue;
      try{
        const launch=await inspect(item.signature,item.slot);
        state.seen.add(item.signature);
        if(launch){
          state.launches.unshift(launch);
          state.launches=state.launches.slice(0,500);
          await persistLaunch(launch);
          recompute();
        }
      }catch(e){
        console.error('inspect',item.signature,e.message||e);
        await new Promise(resolve=>setTimeout(resolve,1000));
      }
      await new Promise(resolve=>setTimeout(resolve,120));
    }
    draining=false;
  }

  ws.on('open',()=>{
    state.status='online';
    ws.send(JSON.stringify({jsonrpc:'2.0',id:101,method:'logsSubscribe',params:[{mentions:[STANDARD]},{commitment:'confirmed'}]}));
    ws.send(JSON.stringify({jsonrpc:'2.0',id:102,method:'logsSubscribe',params:[{mentions:[REWARD]},{commitment:'confirmed'}]}));
  });
  ws.on('message',raw=>{
    try{
      const m=JSON.parse(raw.toString()),v=m?.params?.result?.value,ctx=m?.params?.result?.context;
      if(!v?.signature||v.err||state.seen.has(v.signature)) return;
      if(!queue.some(x=>x.signature===v.signature)) queue.push({signature:v.signature,slot:ctx?.slot||0});
      void drain();
    }catch(e){console.error(e);}
  });
  ws.on('close',()=>{state.status='reconnecting';setTimeout(connect,2000)});
  ws.on('error',e=>console.error('ws',e.message));
}

function intervals(){
  const now=Date.now(), mins=[60,50,40,30,20,10,0];
  return mins.slice(0,-1).map((m,i)=>{
    const start=now-mins[i]*60000,end=now-mins[i+1]*60000;
    return {label:(60-mins[i])+'-'+(60-mins[i+1])+'m',count:state.launches.filter(x=>{const t=new Date(x.detectedAt).getTime();return t>=start&&t<end}).length};
  });
}

app.get('/health',(req,res)=>res.json({ok:true,status:state.status,database:state.dbStatus,startedAt:state.startedAt}));
app.get('/api/dashboard',(req,res)=>res.json({
  status:state.status,
  database:state.dbStatus,
  metrics:state.metrics,
  launchesByInterval:intervals(),
  launches:state.launches.slice(0,75)
}));
app.get('/api/token/:mint/history',async(req,res)=>{
  if(!db) return res.status(503).json({error:'database unavailable'});
  try{
    const {rows}=await db.query(`
      SELECT target_age_sec,observed_at,price_usd,market_cap_usd,fdv_usd,liquidity_usd,
             volume_m5_usd,volume_h1_usd,volume_h24_usd,buys_m5,sells_m5,buys_h1,sells_h1,
             price_change_m5,price_change_h1,pair_address,dex_id
      FROM snapshots WHERE mint=$1 ORDER BY target_age_sec ASC
    `,[req.params.mint]);
    res.json({mint:req.params.mint,snapshots:rows});
  }catch(e){res.status(500).json({error:'history unavailable'});}
});

app.listen(PORT,async()=>{
  console.log('StonkFun backend on',PORT);
  try{
    await initDb();
    await loadRecentLaunches();
    console.log('StonkFun database online');
  }catch(e){
    state.dbStatus='error';
    console.error('database',e.message||e);
  }
  connect();
  setInterval(()=>void collectSnapshots(),10000);
  setTimeout(()=>void collectSnapshots(),3000);
});
