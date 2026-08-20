(() => {
  'use strict';

  const ROOT = '[data-msc-ecosystem-radar]';
  const DATA_URL = 'https://raw.githubusercontent.com/mempoolsurfclub/mempoolsurfclub/homepage-market-data/data/api/v1/market/homepage.json';
  const REFRESH_MS = 60 * 60 * 1000;
  const DATA_CACHE_BUCKET_MS = 5 * 60 * 1000;
  const MAX_AGE_MS = 6 * 60 * 60 * 1000;
  const LAST_GOOD_CACHE_KEY = 'msc-home-market-last-good-v1';
  const LAST_GOOD_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
  const REQUEST_TIMEOUT_MS = 10000;
  const TYPES = new Set(['ORDINAL', 'RUNE']);
  const MED_VOLUME_BTC = 0.25;
  const HIGH_VOLUME_BTC = 1;

  function createProtocolWave() {
    const wave = document.createElement('div');
    wave.className = 'msc-radar-protocol-wave';
    wave.dataset.protocolWave = '';
    wave.dataset.intensity = 'pending';
    wave.setAttribute('role', 'img');
    wave.setAttribute('aria-label', 'Bitcoin asset surf based on trailing 24-hour Ordinals and Runes volume. Market data pending.');
    wave.innerHTML = `
      <span class="msc-radar-protocol-wave__label">BTC ASSET SURF</span>
      <svg class="msc-radar-protocol-wave__svg" viewBox="0 0 240 60" aria-hidden="true" focusable="false">
        <path class="msc-radar-protocol-wave__baseline" d="M0 30H240" />
        <g class="msc-radar-protocol-wave__motion">
          <g class="msc-radar-protocol-wave__track">
            <path class="msc-radar-protocol-wave__line" d="M-80 30 C-70 30 -70 18 -60 18 S-50 42 -40 30 S-30 18 -20 18 S-10 30 0 30 C10 30 10 18 20 18 S30 42 40 30 S50 18 60 18 S70 30 80 30 C90 30 90 18 100 18 S110 42 120 30 S130 18 140 18 S150 30 160 30 C170 30 170 18 180 18 S190 42 200 30 S210 18 220 18 S230 30 240 30 C250 30 250 18 260 18 S270 42 280 30 S290 18 300 18 S310 30 320 30" />
          </g>
        </g>
      </svg>`;
    return wave;
  }

  class AssetSurf {
    constructor(root) {
      this.root = root;
      this.activity = root.querySelector('.msc-radar-block-activity');
      if (!this.activity) return;

      this.wave = root.querySelector('[data-protocol-wave]') || createProtocolWave();
      if (!this.wave.isConnected) this.activity.insertAdjacentElement('afterend', this.wave);
      this.setPending();
    }

    setPending() {
      if (!this.wave) return;
      this.wave.dataset.intensity = 'pending';
      this.wave.style.setProperty('--msc-protocol-wave-scale', '.28');
      this.wave.style.setProperty('--msc-protocol-wave-duration', '18s');
      this.wave.style.setProperty('--msc-protocol-wave-opacity', '.46');
      this.wave.setAttribute('aria-label', 'Bitcoin asset surf based on trailing 24-hour Ordinals and Runes volume. Market data pending.');
    }

    render(totalVolumeBtc, delayed = false) {
      if (!this.wave || !Number.isFinite(totalVolumeBtc) || totalVolumeBtc < 0) {
        this.setPending();
        return;
      }

      let intensity = 'mellow';
      let band = 'LOW';
      let scale = 0.42;
      let duration = 15;
      let opacity = 0.58;

      if (totalVolumeBtc >= HIGH_VOLUME_BTC) {
        intensity = 'heavy';
        band = 'HIGH';
        scale = 1.25;
        duration = 7;
        opacity = 0.92;
      } else if (totalVolumeBtc >= MED_VOLUME_BTC) {
        intensity = 'active';
        band = 'MED';
        scale = 0.8;
        duration = 10;
        opacity = 0.76;
      }

      this.wave.dataset.intensity = intensity;
      this.wave.style.setProperty('--msc-protocol-wave-scale', String(scale));
      this.wave.style.setProperty('--msc-protocol-wave-duration', `${duration}s`);
      this.wave.style.setProperty('--msc-protocol-wave-opacity', String(opacity));
      this.wave.setAttribute(
        'aria-label',
        `Bitcoin asset surf ${band.toLowerCase()} based on ${delayed ? 'the last available' : 'the current'} ${formatBtc(totalVolumeBtc)} combined trailing 24-hour volume across the displayed Ordinals and Runes assets${delayed ? '. Live market data is delayed.' : '.'}`
      );
    }
  }

  function formatBtc(value) {
    if (value >= 100) return `${value.toFixed(0)} BTC`;
    if (value >= 10) return `${value.toFixed(1)} BTC`;
    if (value >= 1) return `${value.toFixed(2)} BTC`;
    if (value >= 0.1) return `${value.toFixed(2)} BTC`;
    if (value >= 0.01) return `${value.toFixed(3)} BTC`;
    return `${value.toFixed(4)} BTC`;
  }

  function normalizeAssets(rawAssets) {
    if (!Array.isArray(rawAssets)) return [];
    return rawAssets.slice(0, 5).map((asset) => {
      const name = typeof asset?.name === 'string' ? asset.name.trim() : '';
      const type = typeof asset?.type === 'string' ? asset.type.toUpperCase() : '';
      const volumeBtc = Number(asset?.volumeBtc);
      if (!name || !TYPES.has(type) || !Number.isFinite(volumeBtc) || volumeBtc <= 0) return null;
      return { name, type, volumeBtc };
    }).filter(Boolean);
  }

  function normalize(payload) {
    if (!payload || payload.schemaVersion !== 1 || payload.api !== 'MSC API' || payload.version !== 'v1') return null;
    if (payload.window !== '24h' || payload.mode !== 'live' || !Array.isArray(payload.assets)) return null;

    const generatedAt = Date.parse(payload.generatedAt);
    if (!Number.isFinite(generatedAt) || Date.now() - generatedAt > MAX_AGE_MS) return null;

    const assets = normalizeAssets(payload.assets);
    if (!assets.length) return null;

    return {
      generatedAt,
      assets,
      totalVolumeBtc: assets.reduce((sum, asset) => sum + asset.volumeBtc, 0)
    };
  }

  function readLastGoodSnapshot() {
    try {
      const cached = JSON.parse(window.localStorage.getItem(LAST_GOOD_CACHE_KEY) || 'null');
      const generatedAt = Number(cached?.generatedAt);
      if (!Number.isFinite(generatedAt) || Date.now() - generatedAt > LAST_GOOD_CACHE_MAX_AGE_MS) return null;

      const assets = normalizeAssets(cached?.assets);
      if (!assets.length) return null;

      return {
        generatedAt,
        assets,
        totalVolumeBtc: assets.reduce((sum, asset) => sum + asset.volumeBtc, 0)
      };
    } catch (error) {
      return null;
    }
  }

  function writeLastGoodSnapshot(snapshot) {
    try {
      window.localStorage.setItem(LAST_GOOD_CACHE_KEY, JSON.stringify({
        generatedAt: snapshot.generatedAt,
        assets: snapshot.assets
      }));
    } catch (error) {
      // Storage may be unavailable in private or restricted browsing contexts.
    }
  }

  async function requestData() {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(`${DATA_URL}?v=${Math.floor(Date.now() / DATA_CACHE_BUCKET_MS)}`, {
        signal: controller.signal,
        cache: 'no-store',
        headers: { accept: 'application/json' }
      });
      if (!response.ok) throw new Error(`http ${response.status}`);
      return await response.json();
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function styleMarketRow(row, name, value) {
    row.className = 'msc-radar-block-activity__row';
    row.style.setProperty('gap', '.28rem');
    row.style.setProperty('padding-bottom', '.30rem');

    name.className = 'msc-radar-block-activity__label';
    name.style.setProperty('min-width', '0');
    name.style.setProperty('overflow', 'hidden');
    name.style.setProperty('text-overflow', 'ellipsis');
    name.style.setProperty('white-space', 'nowrap');
    name.style.setProperty('font-size', '.9rem', 'important');
    name.style.setProperty('letter-spacing', '.02em', 'important');
    name.style.setProperty('line-height', '1.08', 'important');

    value.className = 'msc-radar-block-activity__value';
    value.style.setProperty('position', 'static', 'important');
    value.style.setProperty('left', 'auto', 'important');
    value.style.setProperty('margin-right', '0', 'important');
    value.style.setProperty('font-size', '.9rem', 'important');
    value.style.setProperty('line-height', '1.08', 'important');
  }

  function createMarketRow(asset, index) {
    const row = document.createElement('li');
    const name = document.createElement('span');
    const volume = document.createElement('strong');

    styleMarketRow(row, name, volume);
    name.textContent = `${index + 1}. ${asset.name}`;
    name.title = asset.name;
    volume.textContent = formatBtc(asset.volumeBtc);

    row.append(name, volume);
    return row;
  }

  function createDelayedRow() {
    const row = document.createElement('li');
    const name = document.createElement('span');
    const status = document.createElement('strong');

    styleMarketRow(row, name, status);
    name.textContent = 'LIVE 24H FEED';
    status.textContent = 'RECONNECTING';

    row.append(name, status);
    return row;
  }

  class MarketPanel {
    constructor(root) {
      if (root.dataset.marketVolumeInitialized === 'true') return;
      root.dataset.marketVolumeInitialized = 'true';

      this.root = root;
      this.activity = root.querySelector('.msc-radar-block-activity');
      this.title = this.activity?.querySelector('.msc-radar-block-activity__title');
      this.context = this.activity?.querySelector('.msc-radar-block-activity__context');
      this.list = this.activity?.querySelector('.msc-radar-block-activity__list');
      this.surf = new AssetSurf(root);

      if (!this.activity || !this.title || !this.context || !this.list) return;

      this.lastGood = readLastGoodSnapshot();
      if (this.lastGood) this.render(this.lastGood, true);
      else this.renderUnavailable();

      this.refresh();
      this.timer = window.setInterval(() => this.refresh(), REFRESH_MS);
    }

    render(snapshot, delayed = false) {
      this.title.textContent = 'BTC ASSETS';
      this.context.textContent = delayed ? '24 HOUR VOLUME · DATA DELAYED' : '24 HOUR VOLUME:';
      this.context.style.setProperty('margin-bottom', '.42rem', 'important');
      this.list.style.setProperty('gap', '.42rem', 'important');

      const fragment = document.createDocumentFragment();
      snapshot.assets.forEach((asset, index) => fragment.appendChild(createMarketRow(asset, index)));
      this.list.replaceChildren(fragment);

      const status = delayed ? 'delayed' : 'live';
      this.activity.dataset.marketVolume = status;
      this.root.dataset.volumeStatus = status;
      this.surf.render(snapshot.totalVolumeBtc, delayed);

      if (!delayed) {
        this.lastGood = snapshot;
        writeLastGoodSnapshot(snapshot);
      }
    }

    renderUnavailable() {
      this.title.textContent = 'BTC ASSETS';
      this.context.textContent = 'MARKET DATA · TEMPORARILY DELAYED';
      this.context.style.setProperty('margin-bottom', '.42rem', 'important');
      this.list.style.setProperty('gap', '.42rem', 'important');
      this.list.replaceChildren(createDelayedRow());
      this.activity.dataset.marketVolume = 'delayed';
      this.root.dataset.volumeStatus = 'delayed';
      this.surf.setPending();
    }

    renderFallback() {
      const snapshot = this.lastGood || readLastGoodSnapshot();
      if (snapshot) this.render(snapshot, true);
      else this.renderUnavailable();
    }

    async refresh() {
      if (document.hidden) return;
      try {
        const snapshot = normalize(await requestData());
        if (!snapshot) {
          this.renderFallback();
          return;
        }
        this.render(snapshot);
      } catch (error) {
        this.renderFallback();
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