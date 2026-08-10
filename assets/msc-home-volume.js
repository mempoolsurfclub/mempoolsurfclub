(() => {
  'use strict';

  const ROOT = '[data-msc-ecosystem-radar]';
  const PROTOCOL_WAVE_HEAVY_TX = 2500;
  const ORDINALS_URL = 'https://raw.githubusercontent.com/mempoolsurfclub/mempoolsurfclub/homepage-market-data/data/api/v1/market/ordinals.json';
  const RUNES_URL = 'https://raw.githubusercontent.com/mempoolsurfclub/mempoolsurfclub/homepage-market-data/data/api/v1/market/runes.json';
  const REFRESH_MS = 5 * 60 * 1000;
  const MAX_AGE_MS = 45 * 60 * 1000;
  const REQUEST_TIMEOUT_MS = 10000;
  const TYPES = new Set(['ORDINAL', 'RUNE']);

  function parseProtocolCount(node) {
    const text = node?.textContent || '';
    const match = text.replace(/,/g, '').match(/\d+/);
    if (!match) return null;
    const value = Number(match[0]);
    return Number.isFinite(value) && value >= 0 ? value : null;
  }

  function createProtocolWave() {
    const wave = document.createElement('div');
    wave.className = 'msc-radar-protocol-wave';
    wave.dataset.protocolWave = '';
    wave.dataset.intensity = 'pending';
    wave.setAttribute('role', 'img');
    wave.setAttribute('aria-label', 'Combined Ordinals, Runes, and BRC-20 activity wave. Activity data pending.');
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

  class ProtocolActivityWave {
    constructor(root) {
      if (root.dataset.protocolWaveInitialized === 'true') return;
      root.dataset.protocolWaveInitialized = 'true';

      this.root = root;
      this.activity = root.querySelector('.msc-radar-block-activity');
      this.values = Array.from(root.querySelectorAll('.msc-radar-block-activity__value')).slice(0, 3);
      if (!this.activity || this.values.length !== 3) return;

      this.wave = createProtocolWave();
      this.activity.insertAdjacentElement('afterend', this.wave);

      this.observer = new MutationObserver(() => this.render());
      this.values.forEach((value) => this.observer.observe(value, {
        childList: true,
        characterData: true,
        subtree: true
      }));

      this.render();
    }

    render() {
      const counts = this.values.map(parseProtocolCount);
      if (counts.some((count) => count === null)) {
        this.wave.dataset.intensity = 'pending';
        this.wave.style.setProperty('--msc-protocol-wave-scale', '.28');
        this.wave.style.setProperty('--msc-protocol-wave-duration', '18s');
        this.wave.style.setProperty('--msc-protocol-wave-opacity', '.46');
        this.wave.setAttribute('aria-label', 'Combined Ordinals, Runes, and BRC-20 activity wave. Activity data pending.');
        return;
      }

      const total = counts.reduce((sum, count) => sum + count, 0);
      const pressure = Math.min(total / PROTOCOL_WAVE_HEAVY_TX, 1);
      const scale = 0.34 + pressure * 1.16;
      const duration = 14 - pressure * 7;
      const opacity = 0.58 + pressure * 0.34;
      const intensity = pressure >= .8 ? 'heavy' : pressure >= .48 ? 'active' : pressure >= .18 ? 'rolling' : 'mellow';

      this.wave.dataset.intensity = intensity;
      this.wave.style.setProperty('--msc-protocol-wave-scale', scale.toFixed(3));
      this.wave.style.setProperty('--msc-protocol-wave-duration', `${duration.toFixed(2)}s`);
      this.wave.style.setProperty('--msc-protocol-wave-opacity', opacity.toFixed(3));
      this.wave.setAttribute(
        'aria-label',
        `Combined Ordinals, Runes, and BRC-20 activity wave based on ${total.toLocaleString()} displayed transactions in the latest confirmed block.`
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

  function normalizeProtocol(payload, expectedType) {
    if (!payload || payload.schemaVersion !== 1 || payload.api !== 'MSC API' || payload.version !== 'v1') return null;
    if (payload.window !== '24h' || payload.mode !== 'live' || payload.protocol !== expectedType || !Array.isArray(payload.assets)) return null;

    const generatedAt = Date.parse(payload.generatedAt);
    if (!Number.isFinite(generatedAt) || Date.now() - generatedAt > MAX_AGE_MS) return null;

    const assets = payload.assets.map((asset) => {
      const name = typeof asset?.name === 'string' ? asset.name.trim() : '';
      const type = typeof asset?.type === 'string' ? asset.type.toUpperCase() : expectedType;
      const volumeBtc = Number(asset?.volumeBtc);
      if (!name || type !== expectedType || !TYPES.has(type) || !Number.isFinite(volumeBtc) || volumeBtc <= 0) return null;
      return { name, type, volumeBtc };
    }).filter(Boolean);

    return { generatedAt, assets };
  }

  function updatedLabel(timestamp) {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    }).format(new Date(timestamp));
  }

  async function requestUrl(url, signal) {
    const response = await fetch(`${url}?v=${Math.floor(Date.now() / REFRESH_MS)}`, {
      signal,
      cache: 'no-store',
      headers: { accept: 'application/json' }
    });
    if (!response.ok) throw new Error(`http ${response.status}`);
    return response.json();
  }

  async function requestData() {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const [ordinalsPayload, runesPayload] = await Promise.all([
        requestUrl(ORDINALS_URL, controller.signal),
        requestUrl(RUNES_URL, controller.signal)
      ]);
      const ordinals = normalizeProtocol(ordinalsPayload, 'ORDINAL');
      const runes = normalizeProtocol(runesPayload, 'RUNE');
      if (!ordinals || !runes) return null;

      const assets = [...ordinals.assets, ...runes.assets]
        .sort((a, b) => b.volumeBtc - a.volumeBtc || a.name.localeCompare(b.name))
        .slice(0, 5)
        .map((asset, index) => ({ rank: index + 1, ...asset }));
      if (assets.length !== 5) return null;

      return {
        assets,
        sourceLine: 'MSC API · SATFLOW',
        generatedAt: Math.min(ordinals.generatedAt, runes.generatedAt)
      };
    } finally {
      window.clearTimeout(timeout);
    }
  }

  class VolumePanel {
    constructor(root) {
      if (root.dataset.volumePanelInitialized === 'true') return;
      root.dataset.volumePanelInitialized = 'true';
      this.root = root;
      this.panel = root.querySelector('[data-radar-volume]');
      this.list = root.querySelector('[data-radar-volume-list]');
      this.template = root.querySelector('[data-radar-volume-row-template]');
      this.source = root.querySelector('[data-radar-volume-source]');
      if (!this.panel || !this.list || !this.template) return;
      this.refresh();
      this.timer = window.setInterval(() => this.refresh(), REFRESH_MS);
    }

    render(snapshot) {
      const fragment = document.createDocumentFragment();
      for (const asset of snapshot.assets) {
        const row = this.template.content.firstElementChild.cloneNode(true);
        row.querySelector('[data-volume-rank]').textContent = `${asset.rank}.`;
        row.querySelector('[data-volume-name]').textContent = asset.name;
        row.querySelector('[data-volume-type]').textContent = asset.type;
        row.querySelector('[data-volume-btc]').textContent = formatBtc(asset.volumeBtc);
        fragment.appendChild(row);
      }
      this.list.replaceChildren(fragment);
      if (this.source) this.source.textContent = `${snapshot.sourceLine} · UPDATED ${updatedLabel(snapshot.generatedAt)} UTC`;
      this.panel.hidden = false;
      this.panel.dataset.volumeMode = 'live';
      this.root.dataset.volumeStatus = 'live';
    }

    hide() {
      this.panel.hidden = true;
      this.panel.removeAttribute('data-volume-mode');
      this.root.dataset.volumeStatus = 'unavailable';
    }

    async refresh() {
      if (document.hidden) return;
      try {
        const snapshot = await requestData();
        if (!snapshot) {
          this.hide();
          return;
        }
        this.render(snapshot);
      } catch (error) {
        this.hide();
      }
    }
  }

  function rootsFor(scope) {
    const roots = [];
    if (scope.matches && scope.matches(ROOT)) roots.push(scope);
    if (scope.querySelectorAll) roots.push(...scope.querySelectorAll(ROOT));
    return roots;
  }

  function init(scope = document) {
    rootsFor(scope).forEach((root) => {
      new ProtocolActivityWave(root);
      new VolumePanel(root);
    });
  }

  init(document);
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
