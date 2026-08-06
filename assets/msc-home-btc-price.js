(() => {
  'use strict';

  const ROOT = '[data-msc-ecosystem-radar]';
  const ADVANCED_URL = 'https://api.coinbase.com/api/v3/brokerage/market/products/BTC-USD';
  const EXCHANGE_URL = 'https://api.exchange.coinbase.com/products/BTC-USD/stats';
  const MEMPOOL_URL = 'https://mempool.space/api/v1/prices';
  const REFRESH_MS = 60000;
  const STALE_MS = 300000;
  const REQUEST_TIMEOUT_MS = 10000;

  const usdFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  });

  async function requestJson(url) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: 'no-store',
        headers: { accept: 'application/json' }
      });
      if (!response.ok) throw new Error(`http ${response.status}`);
      const type = response.headers.get('content-type') || '';
      if (!type.includes('json')) throw new Error('unexpected content type');
      return response.json();
    } finally {
      window.clearTimeout(timeout);
    }
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

    const data = normalizeMempool(await requestJson(MEMPOOL_URL));
    if (!data) throw new Error('invalid BTC price payload');
    return data;
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
      this.timer = window.setInterval(() => this.refresh(), REFRESH_MS);
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

  function init(scope = document) {
    const roots = [];
    if (scope.matches && scope.matches(ROOT)) roots.push(scope);
    if (scope.querySelectorAll) roots.push(...scope.querySelectorAll(ROOT));
    roots.forEach((root) => new BtcPricePanel(root));
  }

  init(document);
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
