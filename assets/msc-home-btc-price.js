(() => {
  'use strict';

  const ROOT = '[data-msc-ecosystem-radar]';
  const ADVANCED_URL = 'https://api.coinbase.com/api/v3/brokerage/market/products/BTC-USD';
  const EXCHANGE_URL = 'https://api.exchange.coinbase.com/products/BTC-USD/stats';
  const CANDLES_URL = 'https://api.exchange.coinbase.com/products/BTC-USD/candles?granularity=900';
  const MEMPOOL_PRICE_URL = 'https://mempool.space/api/v1/prices';
  const FEES_URL = 'https://mempool.space/api/v1/fees/recommended';
  const MEMPOOL_STATS_URL = 'https://mempool.space/api/mempool';
  const TIP_HEIGHT_URL = 'https://mempool.space/api/blocks/tip/height';
  const DIFFICULTY_ADJUSTMENT_URL = 'https://mempool.space/api/v1/difficulty-adjustment';
  const HASHRATE_URL = 'https://mempool.space/api/v1/mining/hashrate/1m';
  const PRICE_REFRESH_MS = 60000;
  const NETWORK_REFRESH_MS = 120000;
  const MINING_REFRESH_MS = 600000;
  const CHART_REFRESH_MS = 300000;
  const STALE_MS = 300000;
  const REQUEST_TIMEOUT_MS = 10000;
  const HALVING_INTERVAL = 210000;
  const TARGET_BLOCK_MS = 600000;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const usdFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  });
  const integerFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  });
  const chartTimeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });

  async function request(url, mode = 'json') {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: 'no-store',
        headers: { accept: mode === 'json' ? 'application/json' : 'text/plain,*/*' }
      });
      if (!response.ok) throw new Error(`http ${response.status}`);
      if (mode === 'text') return response.text();
      const type = response.headers.get('content-type') || '';
      if (!type.includes('json')) throw new Error('unexpected content type');
      return response.json();
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function requestJson(url) {
    return request(url, 'json');
  }

  function requestText(url) {
    return request(url, 'text');
  }

  function normalizeAdvanced(payload) {
    const price = Number(payload && payload.price);
    const change = Number.parseFloat(String(payload && payload.price_percentage_change_24h || '').replace('%', ''));
    if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(change)) return null;
    return { price, change };
  }

  function normalizeExchange(payload) {
    const price = Number(payload && payload.last);
    const open = Number(payload && payload.open);
    if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(open) || open <= 0) return null;
    return { price, change: ((price - open) / open) * 100 };
  }

  function normalizeMempool(payload) {
    const price = Number(payload && payload.USD);
    if (!Number.isFinite(price) || price <= 0) return null;
    return { price, change: null };
  }

  async function fetchPriceState() {
    try {
      const data = normalizeAdvanced(await requestJson(ADVANCED_URL));
      if (data) return data;
    } catch (error) {
      // Fall through to Coinbase Exchange market data.
    }

    try {
      const data = normalizeExchange(await requestJson(EXCHANGE_URL));
      if (data) return data;
    } catch (error) {
      // Fall through to mempool.space current-price data.
    }

    const data = normalizeMempool(await requestJson(MEMPOOL_PRICE_URL));
    if (!data) throw new Error('invalid BTC price payload');
    return data;
  }

  function getMarketDirection(change) {
    if (!Number.isFinite(change)) return 'READING LIVE';
    if (change > 0.25) return 'RISING';
    if (change < -0.25) return 'FALLING';
    return 'STEADY';
  }

  function updatePriceMeta(root, data) {
    const marketTide = root.querySelector('.msc-tools-price__pair .msc-tools-price__meta-value');
    if (marketTide) marketTide.textContent = getMarketDirection(data.change);

    if (!Number.isFinite(data.change)) return;
    const driftItem = Array.from(root.querySelectorAll('.msc-tools-price__meta-item')).find((item) => {
      const label = item.querySelector('.msc-tools-price__meta-label');
      return label && label.textContent.trim().toLowerCase() === '24h drift';
    });
    const driftValue = driftItem && driftItem.querySelector('.msc-tools-price__meta-value');
    if (driftValue) {
      const prefix = data.change >= 0 ? '+' : '';
      driftValue.textContent = `${prefix}${data.change.toFixed(2)}%`;
    }
  }

  class BtcPricePanel {
    constructor(root) {
      if (root.dataset.btcPriceInitialized === 'true') return;
      root.dataset.btcPriceInitialized = 'true';

      this.root = root;
      this.value = root.querySelector('[data-btc-price]');
      this.change = root.querySelector('[data-btc-change]');
      this.lastSuccess = 0;
      this.hasData = false;

      if (!this.value || !this.change) return;

      this.refresh();
      this.timer = window.setInterval(() => this.refresh(), PRICE_REFRESH_MS);
    }

    render(data) {
      this.value.textContent = `$${usdFormatter.format(data.price)}`;
      if (Number.isFinite(data.change)) {
        const prefix = data.change >= 0 ? '+' : '';
        this.change.textContent = `${prefix}${data.change.toFixed(2)}% 24H`;
        this.root.dataset.btcPriceStatus = 'live';
      } else {
        this.change.textContent = '24H N/A';
        this.root.dataset.btcPriceStatus = 'partial';
      }
      updatePriceMeta(this.root, data);
      this.lastSuccess = Date.now();
      this.hasData = true;
    }

    handleFailure() {
      if (!this.hasData) {
        this.value.textContent = '—';
        this.change.textContent = 'PRICE UNAVAILABLE';
        this.root.dataset.btcPriceStatus = 'unavailable';
        return;
      }

      if (Date.now() - this.lastSuccess > STALE_MS) {
        this.change.textContent = 'DATA DELAYED';
        this.root.dataset.btcPriceStatus = 'delayed';
      }
    }

    async refresh() {
      if (document.hidden) return;
      try {
        const data = await fetchPriceState();
        this.render(data);
      } catch (error) {
        this.handleFailure();
      }
    }
  }

  function injectToolsStyle() {
    if (document.getElementById('msc-tools-live-instrument-style')) return;
    const style = document.createElement('style');
    style.id = 'msc-tools-live-instrument-style';
    style.textContent = `
      .msc-tools-cockpit .msc-tools-cockpit__status {
        display: inline-flex !important;
        align-items: baseline;
        gap: .65rem;
        white-space: nowrap;
      }
      .msc-tools-cockpit .msc-tools-launch {
        position: relative;
        justify-content: center !important;
        padding-inline: 2.4rem;
        text-align: center;
      }
      .msc-tools-cockpit .msc-tools-launch > span:first-child {
        display: block;
        width: 100%;
        text-align: center;
      }
      .msc-tools-cockpit .msc-tools-launch__arrow {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
      }
      .msc-tools-cockpit .msc-tools-trace__axis-grid {
        stroke: rgba(212, 190, 153, .12);
        stroke-width: 1;
        vector-effect: non-scaling-stroke;
      }
      .msc-tools-cockpit .msc-tools-trace__axis-grid--time {
        stroke: rgba(212, 190, 153, .075);
      }
      .msc-tools-cockpit .msc-tools-trace__axis-domain {
        stroke: rgba(212, 190, 153, .2);
        stroke-width: 1;
        vector-effect: non-scaling-stroke;
      }
      .msc-tools-cockpit .msc-tools-trace__axis-label {
        paint-order: stroke;
        stroke: rgba(10, 38, 43, .96);
        stroke-width: 2.5px;
        stroke-linejoin: round;
        pointer-events: none;
      }
      .msc-tools-cockpit .msc-tools-trace__axis-label--price {
        fill: rgba(251, 248, 239, .58);
        font-size: 8.5px;
        font-weight: 650;
        letter-spacing: .02em;
      }
      .msc-tools-cockpit .msc-tools-trace__axis-label--time {
        fill: rgba(212, 190, 153, .52);
        font-size: 8px;
        font-weight: 650;
        letter-spacing: .04em;
      }
      @media screen and (max-width: 700px) {
        .msc-tools-cockpit .msc-tools-cockpit__topline {
          flex-wrap: wrap;
        }
        .msc-tools-cockpit .msc-tools-trace__axis-label--price {
          font-size: 8px;
        }
        .msc-tools-cockpit .msc-tools-trace__axis-label--time {
          font-size: 7px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function safeNumber(value) {
    if (value === null || value === undefined || value === '') return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function latestFinite(items, key) {
    if (!Array.isArray(items)) return null;
    for (let index = items.length - 1; index >= 0; index -= 1) {
      const value = safeNumber(items[index] && items[index][key]);
      if (value !== null) return value;
    }
    return null;
  }

  function formatHashrate(hashrate) {
    if (!Number.isFinite(hashrate) || hashrate <= 0) return null;
    const eh = hashrate / 1e18;
    if (eh >= 100) return `${eh.toFixed(0)} EH/s`;
    if (eh >= 10) return `${eh.toFixed(1)} EH/s`;
    return `${eh.toFixed(2)} EH/s`;
  }

  function formatDifficulty(difficulty) {
    if (!Number.isFinite(difficulty) || difficulty <= 0) return null;
    return `${(difficulty / 1e12).toFixed(2)} T`;
  }

  function formatAxisPrice(price) {
    if (!Number.isFinite(price) || price <= 0) return '';
    if (price >= 10000) return `$${(price / 1000).toFixed(1)}K`;
    return `$${usdFormatter.format(price)}`;
  }

  function formatAxisTime(time) {
    if (!Number.isFinite(time)) return '';
    return chartTimeFormatter.format(new Date(time * 1000));
  }

  function normalizeCandles(payload) {
    if (!Array.isArray(payload)) return [];
    return payload
      .map((candle) => {
        if (!Array.isArray(candle) || candle.length < 5) return null;
        const time = safeNumber(candle[0]);
        const close = safeNumber(candle[4]);
        if (time === null || close === null || close <= 0) return null;
        return { time, close };
      })
      .filter(Boolean)
      .sort((a, b) => a.time - b.time)
      .slice(-97);
  }

  function niceAxisStep(value) {
    if (!Number.isFinite(value) || value <= 0) return 1;
    const magnitude = 10 ** Math.floor(Math.log10(value));
    const normalized = value / magnitude;
    let nice = 1;
    if (normalized > 5) nice = 10;
    else if (normalized > 2.5) nice = 5;
    else if (normalized > 2) nice = 2.5;
    else if (normalized > 1) nice = 2;
    return nice * magnitude;
  }

  function buildTraceGeometry(candles, width = 720, height = 150) {
    if (!Array.isArray(candles) || candles.length < 2) return null;

    const prices = candles.map((candle) => candle.close);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const observedRange = Math.max(maxPrice - minPrice, maxPrice * 0.0025);
    const rangePadding = observedRange * 0.12;
    const step = niceAxisStep((observedRange + (rangePadding * 2)) / 4);
    const axisMin = Math.floor((minPrice - rangePadding) / step) * step;
    const axisMax = Math.ceil((maxPrice + rangePadding) / step) * step;
    const axisRange = Math.max(axisMax - axisMin, step);

    const plot = {
      left: 0,
      right: 650,
      top: 6,
      bottom: 124
    };
    const plotWidth = plot.right - plot.left;
    const plotHeight = plot.bottom - plot.top;

    const points = candles.map((candle, index) => {
      const x = plot.left + ((index / (candles.length - 1)) * plotWidth);
      const ratio = (candle.close - axisMin) / axisRange;
      const y = plot.top + ((1 - ratio) * plotHeight);
      return { candle, x, y };
    });

    const path = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
      .join(' ');

    const priceTicks = [];
    for (let value = axisMin; value <= axisMax + (step * 0.5); value += step) {
      const ratio = (value - axisMin) / axisRange;
      priceTicks.push({
        value,
        y: plot.top + ((1 - ratio) * plotHeight)
      });
    }

    const timeFractions = [0, 0.25, 0.5, 0.75, 1];
    const timeTicks = timeFractions.map((fraction) => {
      const index = Math.round((candles.length - 1) * fraction);
      const point = points[index];
      return {
        time: point.candle.time,
        x: point.x,
        fraction
      };
    });

    return {
      path,
      points,
      width,
      height,
      plot,
      priceTicks,
      timeTicks
    };
  }

  function getTrendLabel(candles) {
    if (!Array.isArray(candles) || candles.length < 2) return 'LIVE 24H';
    const start = candles[0].close;
    const end = candles[candles.length - 1].close;
    if (!Number.isFinite(start) || start <= 0 || !Number.isFinite(end)) return 'LIVE 24H';
    const change = ((end - start) / start) * 100;
    if (change > 0.15) return 'UPTREND';
    if (change < -0.15) return 'DOWNTREND';
    return 'SIDEWAYS';
  }

  class ToolsSurfReport {
    constructor(root) {
      if (root.dataset.toolsSurfReportInitialized === 'true') return;
      if (!root.querySelector('.msc-tools-cockpit__deck')) return;
      root.dataset.toolsSurfReportInitialized = 'true';

      this.root = root;
      this.tipHeight = null;
      this.fastSuccess = false;
      this.miningSuccess = false;
      this.chartSuccess = false;

      injectToolsStyle();
      this.normalizeLaunchLabels();
      this.refreshFastNetwork();
      this.refreshMining();
      this.refreshChart();

      this.networkTimer = window.setInterval(() => this.refreshFastNetwork(), NETWORK_REFRESH_MS);
      this.miningTimer = window.setInterval(() => this.refreshMining(), MINING_REFRESH_MS);
      this.chartTimer = window.setInterval(() => this.refreshChart(), CHART_REFRESH_MS);
    }

    normalizeLaunchLabels() {
      const launch = Array.from(this.root.querySelectorAll('.msc-tools-launch')).find((item) => {
        const label = item.querySelector('span:first-child');
        return label && label.textContent.trim().toLowerCase() === 'mempool / fee navigator';
      });
      const label = launch && launch.querySelector('span:first-child');
      if (label) label.textContent = 'Fee Navigator';
    }

    findReadout(labelText) {
      const target = labelText.toLowerCase();
      return Array.from(this.root.querySelectorAll('.msc-tools-readout')).find((card) => {
        const label = card.querySelector('.msc-tools-readout__label');
        return label && label.textContent.trim().toLowerCase() === target;
      }) || null;
    }

    setReadout(labelText, value, note) {
      const card = this.findReadout(labelText);
      if (!card) return;
      const valueNode = card.querySelector('.msc-tools-readout__value');
      const noteNode = card.querySelector('.msc-tools-readout__note');
      if (valueNode && value) valueNode.textContent = value;
      if (noteNode && note) noteNode.textContent = note;
    }

    renderHalving() {
      if (!Number.isFinite(this.tipHeight) || this.tipHeight < 0) return;
      const nextHalvingHeight = (Math.floor(this.tipHeight / HALVING_INTERVAL) + 1) * HALVING_INTERVAL;
      const remainingBlocks = Math.max(0, nextHalvingHeight - this.tipHeight);
      const days = Math.max(0, Math.round((remainingBlocks * TARGET_BLOCK_MS) / 86400000));
      this.setReadout('Halving Countdown', `${integerFormatter.format(days)} days`, `Target pace · block ${integerFormatter.format(nextHalvingHeight)}`);
    }

    renderFastNetwork(fees, mempool, tipHeight, difficultyAdjustment) {
      const fastestFee = safeNumber(fees && fees.fastestFee);
      const halfHourFee = safeNumber(fees && fees.halfHourFee);
      if (fastestFee !== null) {
        const feeNote = halfHourFee !== null
          ? `High priority · 30m ${halfHourFee.toFixed(0)} sat/vB`
          : 'High priority · mempool.space';
        this.setReadout('Fee Environment', `${fastestFee.toFixed(0)} sat/vB`, feeNote);
      }

      const vsize = safeNumber(mempool && mempool.vsize);
      const count = safeNumber(mempool && mempool.count);
      if (vsize !== null) {
        const note = count !== null ? `${integerFormatter.format(count)} tx pending` : 'Unconfirmed transaction backlog';
        this.setReadout('Mempool Congestion', `${(vsize / 1e6).toFixed(1)} MB`, note);
      }

      if (Number.isFinite(tipHeight)) {
        this.tipHeight = tipHeight;
        this.setReadout('Latest Block', integerFormatter.format(tipHeight), 'Network tip · live');
      }

      const nextChange = safeNumber(difficultyAdjustment && difficultyAdjustment.difficultyChange);
      if (nextChange !== null) {
        const card = this.findReadout('Difficulty');
        const noteNode = card && card.querySelector('.msc-tools-readout__note');
        if (noteNode) {
          const prefix = nextChange >= 0 ? '+' : '';
          noteNode.textContent = `${prefix}${nextChange.toFixed(2)}% next retarget`;
        }
      }

      this.renderHalving();
      this.fastSuccess = true;
      this.root.dataset.toolsNetworkStatus = 'live';
    }

    async refreshFastNetwork() {
      if (document.hidden) return;
      const results = await Promise.allSettled([
        requestJson(FEES_URL),
        requestJson(MEMPOOL_STATS_URL),
        requestText(TIP_HEIGHT_URL),
        requestJson(DIFFICULTY_ADJUSTMENT_URL)
      ]);

      const fees = results[0].status === 'fulfilled' ? results[0].value : null;
      const mempool = results[1].status === 'fulfilled' ? results[1].value : null;
      const tipText = results[2].status === 'fulfilled' ? results[2].value : null;
      const difficultyAdjustment = results[3].status === 'fulfilled' ? results[3].value : null;
      const tipHeight = Number.parseInt(String(tipText || '').trim(), 10);

      if (!fees && !mempool && !Number.isFinite(tipHeight) && !difficultyAdjustment) {
        if (!this.fastSuccess) this.root.dataset.toolsNetworkStatus = 'unavailable';
        return;
      }

      this.renderFastNetwork(fees, mempool, Number.isFinite(tipHeight) ? tipHeight : null, difficultyAdjustment);
    }

    renderMining(payload) {
      const currentHashrate = safeNumber(payload && payload.currentHashrate) || latestFinite(payload && payload.hashrates, 'avgHashrate');
      const currentDifficulty = safeNumber(payload && payload.currentDifficulty) || latestFinite(payload && payload.difficulty, 'difficulty');
      const hashrateLabel = formatHashrate(currentHashrate);
      const difficultyLabel = formatDifficulty(currentDifficulty);

      if (hashrateLabel) this.setReadout('Hashrate', hashrateLabel, 'Network estimate · live');
      if (difficultyLabel) {
        const card = this.findReadout('Difficulty');
        const valueNode = card && card.querySelector('.msc-tools-readout__value');
        if (valueNode) valueNode.textContent = difficultyLabel;
      }
      if (hashrateLabel || difficultyLabel) this.miningSuccess = true;
    }

    async refreshMining() {
      if (document.hidden) return;
      try {
        this.renderMining(await requestJson(HASHRATE_URL));
      } catch (error) {
        if (!this.miningSuccess) {
          this.setReadout('Hashrate', '— EH/s', 'Network data unavailable');
        }
      }
    }

    renderChartAxes(geometry) {
      const svg = this.root.querySelector('.msc-tools-trace');
      if (!svg || !geometry) return;

      const existing = svg.querySelector('[data-btc-trace-axes]');
      if (existing) existing.remove();

      const axisGroup = document.createElementNS(SVG_NS, 'g');
      axisGroup.setAttribute('data-btc-trace-axes', '');
      axisGroup.setAttribute('aria-hidden', 'true');

      geometry.priceTicks.forEach((tick) => {
        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('class', 'msc-tools-trace__axis-grid');
        line.setAttribute('x1', geometry.plot.left.toFixed(2));
        line.setAttribute('x2', geometry.plot.right.toFixed(2));
        line.setAttribute('y1', tick.y.toFixed(2));
        line.setAttribute('y2', tick.y.toFixed(2));
        axisGroup.appendChild(line);

        const label = document.createElementNS(SVG_NS, 'text');
        label.setAttribute('class', 'msc-tools-trace__axis-label msc-tools-trace__axis-label--price');
        label.setAttribute('x', '714');
        label.setAttribute('y', (tick.y + 3).toFixed(2));
        label.setAttribute('text-anchor', 'end');
        label.textContent = formatAxisPrice(tick.value);
        axisGroup.appendChild(label);
      });

      geometry.timeTicks.forEach((tick) => {
        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('class', 'msc-tools-trace__axis-grid msc-tools-trace__axis-grid--time');
        line.setAttribute('x1', tick.x.toFixed(2));
        line.setAttribute('x2', tick.x.toFixed(2));
        line.setAttribute('y1', geometry.plot.top.toFixed(2));
        line.setAttribute('y2', geometry.plot.bottom.toFixed(2));
        axisGroup.appendChild(line);

        const label = document.createElementNS(SVG_NS, 'text');
        label.setAttribute('class', 'msc-tools-trace__axis-label msc-tools-trace__axis-label--time');
        label.setAttribute('x', tick.x.toFixed(2));
        label.setAttribute('y', '147');
        label.setAttribute('text-anchor', tick.fraction === 0 ? 'start' : (tick.fraction === 1 ? 'end' : 'middle'));
        label.textContent = formatAxisTime(tick.time);
        axisGroup.appendChild(label);
      });

      const rightAxis = document.createElementNS(SVG_NS, 'line');
      rightAxis.setAttribute('class', 'msc-tools-trace__axis-domain');
      rightAxis.setAttribute('x1', geometry.plot.right.toFixed(2));
      rightAxis.setAttribute('x2', geometry.plot.right.toFixed(2));
      rightAxis.setAttribute('y1', geometry.plot.top.toFixed(2));
      rightAxis.setAttribute('y2', geometry.plot.bottom.toFixed(2));
      axisGroup.appendChild(rightAxis);

      const bottomAxis = document.createElementNS(SVG_NS, 'line');
      bottomAxis.setAttribute('class', 'msc-tools-trace__axis-domain');
      bottomAxis.setAttribute('x1', geometry.plot.left.toFixed(2));
      bottomAxis.setAttribute('x2', geometry.plot.right.toFixed(2));
      bottomAxis.setAttribute('y1', geometry.plot.bottom.toFixed(2));
      bottomAxis.setAttribute('y2', geometry.plot.bottom.toFixed(2));
      axisGroup.appendChild(bottomAxis);

      const ghost = svg.querySelector('.msc-tools-trace__ghost');
      if (ghost) svg.insertBefore(axisGroup, ghost);
      else svg.appendChild(axisGroup);
    }

    renderChart(candles) {
      const geometry = buildTraceGeometry(candles);
      if (!geometry) throw new Error('insufficient BTC candle data');
      const trace = this.root.querySelector('.msc-tools-trace__path');
      const ghost = this.root.querySelector('.msc-tools-trace__ghost');
      const staticGrid = this.root.querySelector('.msc-tools-trace__grid');
      if (trace) trace.setAttribute('d', geometry.path);
      if (ghost) ghost.setAttribute('d', geometry.path);
      if (staticGrid) staticGrid.setAttribute('d', '');
      this.renderChartAxes(geometry);

      const trendItem = Array.from(this.root.querySelectorAll('.msc-tools-price__meta-item')).find((item) => {
        const label = item.querySelector('.msc-tools-price__meta-label');
        return label && label.textContent.trim().toLowerCase() === 'trend vector';
      });
      const trendValue = trendItem && trendItem.querySelector('.msc-tools-price__meta-value');
      if (trendValue) trendValue.textContent = getTrendLabel(candles);

      this.chartSuccess = true;
      this.root.dataset.toolsTraceStatus = 'live';
    }

    async refreshChart() {
      if (document.hidden) return;
      try {
        const candles = normalizeCandles(await requestJson(CANDLES_URL));
        this.renderChart(candles);
      } catch (error) {
        if (!this.chartSuccess) this.root.dataset.toolsTraceStatus = 'unavailable';
      }
    }
  }

  function init(scope = document) {
    const roots = [];
    if (scope.matches && scope.matches(ROOT)) roots.push(scope);
    if (scope.querySelectorAll) roots.push(...scope.querySelectorAll(ROOT));
    roots.forEach((root) => {
      new BtcPricePanel(root);
      new ToolsSurfReport(root);
    });
  }

  init(document);
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
