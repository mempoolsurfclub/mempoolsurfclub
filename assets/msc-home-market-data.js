(() => {
  'use strict';

  const ROOT = '[data-msc-ecosystem-radar]';
  const MEMPOOL_API = 'https://mempool.space/api';
  const PRICE_REFRESH_MS = 60000;
  const MARKET_REFRESH_MS = 300000;
  const MARKET_STALE_MS = 3 * 60 * 60 * 1000;
  const REQUEST_TIMEOUT_MS = 10000;
  const SATS_PER_BTC = 100000000;
  const ASSET_TYPES = new Set(['rune', 'brc-20', 'ordinal']);

  const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  });

  function requestJson(url) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    return fetch(url, { signal: controller.signal, cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error(`http ${response.status}`);
        const type = response.headers.get('content-type') || '';
        if (!type.includes('json')) throw new Error('unexpected content type');
        return response.json();
      })
      .finally(() => window.clearTimeout(timeout));
  }

  function historicalUsd(payload) {
    if (!payload) return null;
    if (Number.isFinite(Number(payload.USD))) return Number(payload.USD);
    const prices = Array.isArray(payload.prices) ? payload.prices : [];
    for (let index = prices.length - 1; index >= 0; index -= 1) {
      const value = Number(prices[index] && prices[index].USD);
      if (Number.isFinite(value) && value > 0) return value;
    }
    return null;
  }

  function normalizeMarketAsset(asset) {
    if (!asset || typeof asset !== 'object') return null;
    const type = String(asset.type || '').toLowerCase();
    const name = String(asset.name || '').trim();
    const id = String(asset.id || '').trim();
    if (!ASSET_TYPES.has(type) || !name || !id) return null;

    let volumeSats = Number(asset.volumeSats);
    if (!Number.isSafeInteger(volumeSats) || volumeSats < 0) {
      const volumeBtc = Number(asset.volumeBtc);
      if (!Number.isFinite(volumeBtc) || volumeBtc < 0) return null;
      volumeSats = Math.round(volumeBtc * SATS_PER_BTC);
    }
    if (!Number.isSafeInteger(volumeSats) || volumeSats <= 0) return null;

    return { id, type, name, volumeSats };
  }

  function assetTypeLabel(type) {
    if (type === 'brc-20') return 'BRC-20';
    if (type === 'rune') return 'RUNE';
    return 'ORDINAL';
  }

  function formatBtcFromSats(sats) {
    const btc = sats / SATS_PER_BTC;
    if (btc >= 100) return `${btc.toLocaleString('en-US', { maximumFractionDigits: 1 })} BTC`;
    if (btc >= 1) return `${btc.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BTC`;
    if (btc >= 0.01) return `${btc.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 })} BTC`;
    return `${btc.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} BTC`;
  }

  function validateMarketPayload(payload) {
    if (!payload || typeof payload !== 'object') throw new Error('missing market payload');
    if (payload.schemaVersion !== 1) throw new Error('unexpected market schema');
    if (payload.window !== '24h') throw new Error('unexpected market window');
    if (payload.unit !== 'BTC') throw new Error('unexpected market unit');
    if (payload.provider !== 'coingecko') throw new Error('unexpected market provider');
    if (payload.attribution !== 'Data provided by CoinGecko') throw new Error('missing market attribution');

    const generatedAt = Date.parse(payload.generatedAt);
    if (!Number.isFinite(generatedAt)) throw new Error('missing generatedAt');
    if (generatedAt > Date.now() + 5 * 60 * 1000) throw new Error('market snapshot is from the future');

    const byId = new Map();
    (Array.isArray(payload.assets) ? payload.assets : []).forEach((raw) => {
      const asset = normalizeMarketAsset(raw);
      if (!asset) return;
      const existing = byId.get(asset.id);
      if (!existing || asset.volumeSats > existing.volumeSats) byId.set(asset.id, asset);
    });

    const assets = [...byId.values()]
      .sort((a, b) => b.volumeSats - a.volumeSats || a.name.localeCompare(b.name));
    if (assets.length < 5) throw new Error('insufficient market assets');

    return { generatedAt, assets };
  }

  class MarketPanel {
    constructor(root) {
      if (root.dataset.marketDataInitialized === 'true') return;
      root.dataset.marketDataInitialized = 'true';
      this.root = root;
      this.endpoint = String(root.dataset.marketDataUrl || '').trim();
      this.priceValue = root.querySelector('[data-btc-price]');
      this.priceChange = root.querySelector('[data-btc-change]');
      this.volumeList = root.querySelector('[data-market-volume-list]');
      this.volumeState = root.querySelector('[data-market-volume-state]');
      this.timers = [];

      if (!this.priceValue || !this.priceChange || !this.volumeList || !this.volumeState) return;

      this.refreshPrice();
      this.refreshMarket();
      this.timers.push(window.setInterval(() => this.refreshPrice(), PRICE_REFRESH_MS));
      this.timers.push(window.setInterval(() => this.refreshMarket(), MARKET_REFRESH_MS));
    }

    async refreshPrice() {
      try {
        const nowSeconds = Math.floor(Date.now() / 1000);
        const yesterdaySeconds = nowSeconds - 86400;
        const [current, historical] = await Promise.all([
          requestJson(`${MEMPOOL_API}/v1/prices`),
          requestJson(`${MEMPOOL_API}/v1/historical-price?currency=USD&timestamp=${yesterdaySeconds}`)
        ]);
        const currentUsd = Number(current && current.USD);
        const previousUsd = historicalUsd(historical);
        if (!Number.isFinite(currentUsd) || currentUsd <= 0 || !Number.isFinite(previousUsd) || previousUsd <= 0) {
          throw new Error('invalid btc price data');
        }

        const change = ((currentUsd - previousUsd) / previousUsd) * 100;
        this.priceValue.textContent = `$${numberFormatter.format(currentUsd)}`;
        this.priceChange.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}% 24H`;
        this.priceChange.dataset.direction = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';
        this.root.dataset.btcPriceStatus = 'live';
      } catch (error) {
        this.root.dataset.btcPriceStatus = 'unavailable';
        if (this.priceValue.textContent === '—') this.priceChange.textContent = 'PRICE UNAVAILABLE';
      }
    }

    setVolumeState(message, status) {
      this.volumeList.replaceChildren();
      this.volumeState.textContent = message;
      this.volumeState.hidden = false;
      this.root.dataset.marketVolumeStatus = status;
    }

    marketRequestUrl() {
      const url = new URL(this.endpoint);
      url.searchParams.set('_msc', String(Math.floor(Date.now() / MARKET_REFRESH_MS)));
      return url.toString();
    }

    async refreshMarket() {
      if (!this.endpoint || !/^https:\/\//i.test(this.endpoint)) {
        this.setVolumeState('VOLUME DATA UNAVAILABLE', 'unavailable');
        return;
      }

      try {
        const payload = await requestJson(this.marketRequestUrl());
        const validated = validateMarketPayload(payload);
        const topFive = validated.assets.slice(0, 5);
        const fragment = document.createDocumentFragment();

        topFive.forEach((asset, index) => {
          const item = document.createElement('li');
          item.className = 'msc-radar-market__row';

          const rank = document.createElement('span');
          rank.className = 'msc-radar-market__rank';
          rank.textContent = String(index + 1);

          const identity = document.createElement('span');
          identity.className = 'msc-radar-market__identity';

          const name = document.createElement('strong');
          name.textContent = asset.name;

          const type = document.createElement('small');
          type.textContent = assetTypeLabel(asset.type);

          identity.append(name, type);

          const volume = document.createElement('span');
          volume.className = 'msc-radar-market__volume';
          volume.textContent = formatBtcFromSats(asset.volumeSats);

          item.append(rank, identity, volume);
          fragment.append(item);
        });

        this.volumeState.hidden = true;
        this.volumeState.textContent = '';
        this.volumeList.replaceChildren(fragment);
        this.root.dataset.marketVolumeStatus = Date.now() - validated.generatedAt > MARKET_STALE_MS ? 'delayed' : 'live';
      } catch (error) {
        if (this.volumeList.children.length) {
          this.root.dataset.marketVolumeStatus = 'delayed';
          return;
        }
        this.setVolumeState('VOLUME DATA DELAYED', 'delayed');
      }
    }
  }

  function init(scope = document) {
    const roots = [];
    if (scope.matches && scope.matches(ROOT)) roots.push(scope);
    if (scope.querySelectorAll) roots.push(...scope.querySelectorAll(ROOT));
    roots.forEach((root) => new MarketPanel(root));
  }

  init(document);
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
