import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import WebSocket from 'ws';

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://mempoolsurfclub.com';
const RPC_HTTP_URL = process.env.RPC_HTTP_URL;
const RPC_WS_URL = process.env.RPC_WS_URL;

const LAUNCHLAB_PROGRAM='LanMV9sAd7wArD4vJFi2qDdfnVhFxYSUg6eADduJ3uj';
const STANDARD='4E876qZTE9FJMrBzgVtBrSrzz2TLivB5Y5QXPjB4gZL7';
const REWARD='6BwHHDg3u1854jC8PDLXvR4spTcLNaoBxLJNGC4nTESt';

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

const state={
  startedAt:new Date().toISOString(),
  status:'starting',
  seen:new Set(),
  launches:[],
  metrics:{launchesToday:0,trackingNow:0,graduatedToday:0,standardToday:0,rewardToday:0,buyPressurePct:0,medianLiquidityUsd:0,paperPnlSol:0}
};

function dayKey(d=new Date()){ return d.toISOString().slice(0,10); }
function recompute(){
  const today=dayKey();
  const todays=state.launches.filter(x=>String(x.detectedAt).slice(0,10)===today);
  state.metrics.launchesToday=todays.length;
  state.metrics.trackingNow=state.launches.filter(x=>x.signal!=='reject').length;
  state.metrics.standardToday=todays.filter(x=>x.launchType==='standard').length;
  state.metrics.rewardToday=todays.filter(x=>x.launchType==='reward').length;
}
async function rpc(method,params){
  const r=await fetch(RPC_HTTP_URL,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params})});
  const j=await r.json(); if(j.error) throw new Error(j.error.message); return j.result;
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
        creator:ix.accounts[1]||null,symbol:null,marketCapUsd:null,liquidityUsd:null,volumeUsd:null,
        buys:0,sells:0,graduationPct:0,signal:'watch'
      };
    }
    return null;
  }
  return null;
}
function connect(){
  if(!RPC_HTTP_URL||!RPC_WS_URL){state.status='config-needed';console.error('RPC URLs missing');return;}
  const ws=new WebSocket(RPC_WS_URL);
  ws.on('open',()=>{
    state.status='online';
    ws.send(JSON.stringify({jsonrpc:'2.0',id:1,method:'logsSubscribe',params:[{mentions:[LAUNCHLAB_PROGRAM]},{commitment:'confirmed'}]}));
  });
  ws.on('message',async raw=>{
    try{
      const m=JSON.parse(raw.toString()),v=m?.params?.result?.value,c=m?.params?.result?.context;
      if(!v?.signature||v.err||state.seen.has(v.signature)) return;
      state.seen.add(v.signature);
      const launch=await inspect(v.signature,c?.slot||0);
      if(launch){state.launches.unshift(launch);state.launches=state.launches.slice(0,500);recompute();}
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
app.get('/health',(req,res)=>res.json({ok:true,status:state.status,startedAt:state.startedAt}));
app.get('/api/dashboard',(req,res)=>res.json({status:state.status,metrics:state.metrics,launchesByInterval:intervals(),launches:state.launches.slice(0,75)}));
app.listen(PORT,()=>{console.log('StonkFun backend on',PORT);connect();});
