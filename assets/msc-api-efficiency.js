(() => {
  'use strict';

  const script = document.currentScript;
  const context = script?.dataset?.mscApiEfficiencyContext || '';
  const PATCH_KEY = '__mscApiEfficiencyV1';
  const HASHRATE_URL = 'https://mempool.space/api/v1/mining/hashrate/1m';
  const DIFFICULTY_ADJUSTMENT_URL = 'https://mempool.space/api/v1/difficulty-adjustment';
  const REST_FALLBACK_MS = 60_000;
  const LIVE_SOCKET_REST_MS = 5 * 60_000;
  const SOCKET_STALE_MS = 3 * 60_000;

  const state = window[PATCH_KEY] || {
    toolsFetchGuardInstalled: false,
    radarPatchInstalled: false,
    lastSocketMessageAt: 0
  };
  window[PATCH_KEY] = state;

  function readoutExists(labelText) {
    const target = labelText.toLowerCase();
    return Array.from(document.querySelectorAll('[data-msc-ecosystem-radar] .msc-tools-readout__label'))
      .some((label) => label.textContent.trim().toLowerCase() === target);
  }

  function requestUrl(input) {
    if (typeof input === 'string') return input;
    if (typeof URL !== 'undefined' && input instanceof URL) return input.href;
    return input && typeof input.url === 'string' ? input.url : '';
  }

  function installToolsFetchGuard() {
    if (state.toolsFetchGuardInstalled || typeof window.fetch !== 'function') return;

    const nativeFetch = window.fetch.bind(window);
    window.fetch = (input, init) => {
      const url = requestUrl(input);

      // The current Tools market-activity section replaces these legacy readouts.
      // Skip their background requests only after the readouts are no longer present.
      if (url === HASHRATE_URL && !readoutExists('Hashrate')) {
        return Promise.reject(new DOMException('Unused Tools instrument request', 'AbortError'));
      }
      if (url === DIFFICULTY_ADJUSTMENT_URL && !readoutExists('Difficulty')) {
        return Promise.reject(new DOMException('Unused Tools instrument request', 'AbortError'));
      }

      return nativeFetch(input, init);
    };

    state.toolsFetchGuardInstalled = true;
  }

  function socketIsHealthy(runtime, now = Date.now()) {
    return Boolean(
      runtime.ws
      && runtime.ws.readyState === WebSocket.OPEN
      && state.lastSocketMessageAt
      && now - state.lastSocketMessageAt < SOCKET_STALE_MS
    );
  }

  function patchRadarController(controller, runtime) {
    if (!controller || controller.__mscApiEfficiencyPatched) return;
    controller.__mscApiEfficiencyPatched = true;

    const originalHandleSocketMessage = controller.handleSocketMessage.bind(controller);
    controller.handleSocketMessage = function handleSocketMessage(data) {
      const hasBlockSignal = Boolean(data && (data.block || data.blocks || data.blockHeight));
      const mempoolPayload = data && (data['mempool-blocks'] || data.mempoolBlocks);
      const projected = this.normalizeProjected(mempoolPayload);
      const result = originalHandleSocketMessage(data);

      // A valid projected-block push is fresh network data. Count it as a
      // successful update so the UI does not become "delayed" simply because
      // the REST integrity check is intentionally less frequent.
      if (projected && !hasBlockSignal && !this.destroyed) {
        this.lastSuccess = Date.now();
        if (!this.syncing && !this.transitioning) this.setStatus('LIVE');
      }

      return result;
    };

    controller.fallbackCheck = function fallbackCheck() {
      if (this.destroyed || document.hidden) return;
      const now = Date.now();
      const interval = socketIsHealthy(runtime, now) ? LIVE_SOCKET_REST_MS : REST_FALLBACK_MS;
      if (now - this.lastFallback < interval || now < this.restRetryAfterUntil) return;
      this.lastFallback = now;
      this.sync({ allowWave: true, silent: true });
    };
  }

  function installRadarPatch() {
    const runtime = window.__mscHomeEcosystemRadarRuntime;
    if (!runtime || state.radarPatchInstalled) return Boolean(runtime);

    state.radarPatchInstalled = true;

    const originalRuntimeHandleSocketMessage = runtime.handleSocketMessage.bind(runtime);
    runtime.handleSocketMessage = function handleSocketMessage(event) {
      state.lastSocketMessageAt = Date.now();
      return originalRuntimeHandleSocketMessage(event);
    };

    runtime.controllers.forEach((controller) => patchRadarController(controller, runtime));

    const originalInitRoot = runtime.initRoot.bind(runtime);
    runtime.initRoot = function initRoot(root) {
      const result = originalInitRoot(root);
      if (root?.__mscHomeEcosystemRadarController) {
        patchRadarController(root.__mscHomeEcosystemRadarController, runtime);
      }
      return result;
    };

    return true;
  }

  if (context === 'tools') {
    installToolsFetchGuard();
    return;
  }

  if (context === 'home') {
    if (installRadarPatch()) return;
    document.addEventListener('DOMContentLoaded', installRadarPatch, { once: true });
  }
})();
