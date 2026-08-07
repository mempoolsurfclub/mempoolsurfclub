(() => {
  'use strict';

  const ROOT = '[data-msc-ecosystem-radar]';
  const DATA_URL = 'https://raw.githubusercontent.com/mempoolsurfclub/mempoolsurfclub/homepage-market-data/data/homepage-market.json';
  const REFRESH_MS = 5 * 60 * 1000;
  const MAX_AGE_MS = 45 * 60 * 1000;
  const REQUEST_TIMEOUT_MS = 10000;
  const TYPES = new Set(['ORDINAL', 'RUNE', 'BRC-20']);

  function formatBtc(value) {
    if (value >= 100) return `${value.toFixed(0)} BTC`;
    if (value >= 10) return `${value.toFixed(1)} BTC`;
    if (value >= 1) return `${value.toFixed(2)} BTC`;
    if (value >= 0.1) return `${value.toFixed(2)} BTC`;
    if (value >= 0.01) return `${value.toFixed(3)} BTC`;
    return `${value.toFixed(4)} BTC`;
  }

  function normalize(payload) {
    if (!payload || payload.schemaVersion !== 1 || payload.window !== '24h') return null;
    const generatedAt = Date.parse(payload.generatedAt);
    if (!Number.isFinite(generatedAt) || Date.now() - generatedAt > MAX_AGE_MS) return null;
    if (!Array.isArray(payload.assets) || payload.assets.length < 5) return null;

    const assets = payload.assets.slice(0, 5).map((asset, index) => {
      const name = typeof asset?.name === 'string' ? asset.name.trim() : '';
      const type = typeof asset?.type === 'string' ? asset.type.toUpperCase() : '';
      const volumeBtc = Number(asset?.volumeBtc);
      if (!name || !TYPES.has(type) || !Number.isFinite(volumeBtc) || volumeBtc <= 0) return null;
      return { rank: index + 1, name, type, volumeBtc };
    });

    return assets.every(Boolean) ? assets : null;
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
      if (!this.panel || !this.list || !this.template) return;
      this.refresh();
      this.timer = window.setInterval(() => this.refresh(), REFRESH_MS);
    }

    render(assets) {
      const fragment = document.createDocumentFragment();
      for (const asset of assets) {
        const row = this.template.content.firstElementChild.cloneNode(true);
        row.querySelector('[data-volume-rank]').textContent = `${asset.rank}.`;
        row.querySelector('[data-volume-name]').textContent = asset.name;
        row.querySelector('[data-volume-type]').textContent = asset.type;
        row.querySelector('[data-volume-btc]').textContent = formatBtc(asset.volumeBtc);
        fragment.appendChild(row);
      }
      this.list.replaceChildren(fragment);
      this.panel.hidden = false;
      this.root.dataset.volumeStatus = 'live';
    }

    hide() {
      this.panel.hidden = true;
      this.root.dataset.volumeStatus = 'unavailable';
    }

    async refresh() {
      if (document.hidden) return;
      try {
        const assets = normalize(await requestData());
        if (!assets) {
          this.hide();
          return;
        }
        this.render(assets);
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
