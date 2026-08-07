(() => {
  'use strict';

  // Parked for future placement review. Keep the complete renderer below intact.
  return;

  const ROOT = '[data-msc-ecosystem-radar]';
  const DATA_URL = 'https://raw.githubusercontent.com/mempoolsurfclub/mempoolsurfclub/homepage-market-data/data/homepage-market.json';
  const REFRESH_MS = 5 * 60 * 1000;
  const MAX_AGE_MS = 45 * 60 * 1000;
  const REQUEST_TIMEOUT_MS = 10000;
  const TYPES = new Set(['ORDINAL', 'RUNE', 'BRC-20']);

  function formatBtc(value, mode) {
    if (mode === 'preview') return '— BTC';
    if (value >= 100) return `${value.toFixed(0)} BTC`;
    if (value >= 10) return `${value.toFixed(1)} BTC`;
    if (value >= 1) return `${value.toFixed(2)} BTC`;
    if (value >= 0.1) return `${value.toFixed(2)} BTC`;
    if (value >= 0.01) return `${value.toFixed(3)} BTC`;
    return `${value.toFixed(4)} BTC`;
  }

  function normalize(payload) {
    if (!payload || payload.schemaVersion !== 1 || payload.window !== '24h') return null;
    const mode = payload.mode === 'live' ? 'live' : payload.mode === 'preview' ? 'preview' : null;
    if (!mode || !Array.isArray(payload.assets) || payload.assets.length < 5) return null;

    if (mode === 'live') {
      const generatedAt = Date.parse(payload.generatedAt);
      if (!Number.isFinite(generatedAt) || Date.now() - generatedAt > MAX_AGE_MS) return null;
    }

    const assets = payload.assets.slice(0, 5).map((asset, index) => {
      const name = typeof asset?.name === 'string' ? asset.name.trim() : '';
      const type = typeof asset?.type === 'string' ? asset.type.toUpperCase() : '';
      const volumeBtc = asset?.volumeBtc === null ? null : Number(asset?.volumeBtc);
      if (!name || !TYPES.has(type)) return null;
      if (mode === 'live' && (!Number.isFinite(volumeBtc) || volumeBtc <= 0)) return null;
      return { rank: index + 1, name, type, volumeBtc };
    });

    if (!assets.every(Boolean)) return null;
    const sourceLine = typeof payload.sourceLine === 'string' && payload.sourceLine.trim()
      ? payload.sourceLine.trim()
      : mode === 'live'
        ? 'Ordinals + Runes: Satflow · BRC-20: UniSat'
        : 'PREVIEW · SATFLOW + UNISAT API CONNECTION PENDING';

    return { mode, assets, sourceLine };
  }

  async function requestData() {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(`${DATA_URL}?v=${Math.floor(Date.now() / REFRESH_MS)}`, {
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
        row.querySelector('[data-volume-btc]').textContent = formatBtc(asset.volumeBtc, snapshot.mode);
        fragment.appendChild(row);
      }
      this.list.replaceChildren(fragment);
      if (this.source) this.source.textContent = snapshot.sourceLine;
      this.panel.hidden = false;
      this.panel.dataset.volumeMode = snapshot.mode;
      this.root.dataset.volumeStatus = snapshot.mode;
    }

    hide() {
      this.panel.hidden = true;
      this.panel.removeAttribute('data-volume-mode');
      this.root.dataset.volumeStatus = 'unavailable';
    }

    async refresh() {
      if (document.hidden) return;
      try {
        const snapshot = normalize(await requestData());
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

  function init(scope = document) {
    const roots = [];
    if (scope.matches && scope.matches(ROOT)) roots.push(scope);
    if (scope.querySelectorAll) roots.push(...scope.querySelectorAll(ROOT));
    roots.forEach((root) => new VolumePanel(root));
  }

  init(document);
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
