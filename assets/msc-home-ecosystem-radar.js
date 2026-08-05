(() => {
  'use strict';

  const RUNTIME_KEY = '__mscHomeEcosystemRadarRuntime';
  const ROOT = '[data-msc-ecosystem-radar]';
  const API = 'https://mempool.space/api';
  const WS_URL = 'wss://mempool.space/api/v1/ws';
  const FALLBACK_MS = 60000;
  const STALE_MS = 180000;
  const TRANSITION_MS = 2250;
  const MAX_REST_BACKOFF_MS = 300000;
  const MAX_WS_BACKOFF_MS = 300000;
  const IMPORTANT_STATUSES = new Set(['NEW BLOCK', 'DATA DELAYED', 'UNAVAILABLE']);

  if (window[RUNTIME_KEY]) {
    window[RUNTIME_KEY].initNewRoots(document);
    return;
  }

  class RadarController {
    constructor(root, runtime) {
      this.root = root;
      this.runtime = runtime;
      this.nodes = {
        status: root.querySelector('[data-radar-status]'),
        announcer: root.querySelector('[data-radar-announcer]'),
        strip: root.querySelector('[data-radar-strip]'),
        confirmedTile: root.querySelector('[data-confirmed-tile]'),
        confirmedTitle: root.querySelector('[data-confirmed-title]'),
        confirmedState: root.querySelector('[data-confirmed-state]'),
        confirmedAge: root.querySelector('[data-confirmed-age]'),
        confirmedFee: root.querySelector('[data-confirmed-fee]'),
        projectedTile: root.querySelector('[data-projected-tile]'),
        projectedTitle: root.querySelector('[data-projected-title]'),
        projectedState: root.querySelector('[data-projected-state]'),
        projectedTx: root.querySelector('[data-projected-tx]'),
        projectedFee: root.querySelector('[data-projected-fee]'),
        transitionTile: root.querySelector('[data-transition-tile]'),
        transitionTitle: root.querySelector('[data-transition-title]'),
        transitionState: root.querySelector('[data-transition-state]'),
        transitionMeta: root.querySelector('[data-transition-meta]')
      };
      if (!this.nodes.status || !this.nodes.strip || !this.nodes.confirmedTile || !this.nodes.projectedTile) return;

      this.block = null;
      this.projected = null;
      this.initialized = false;
      this.inView = false;
      this.transitioning = false;
      this.destroyed = false;
      this.syncing = false;
      this.pendingSync = null;
      this.pendingAfterTransition = null;
      this.lastSuccess = 0;
      this.lastFallback = 0;
      this.lastProjectedRest = 0;
      this.restBackoff = 5000;
      this.restRetryAfterUntil = 0;
      this.currentStatus = null;
      this.timers = new Set();
      this.aborters = new Set();
      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

      this.onDemo = this.onDemo.bind(this);
      this.onPointerDown = this.onPointerDown.bind(this);
      this.onPointerUp = this.onPointerUp.bind(this);
      this.onMotionChange = this.onMotionChange.bind(this);

      this.observer = new IntersectionObserver((entries) => {
        this.inView = entries.some((entry) => entry.isIntersecting || entry.intersectionRatio > 0);
        this.updateMotionPause();
      }, { rootMargin: '160px 0px' });
      this.observer.observe(root);

      root.addEventListener('msc:ecosystem-radar-demo-new-block', this.onDemo);
      root.addEventListener('pointerdown', this.onPointerDown, true);
      root.addEventListener('pointerup', this.onPointerUp, true);
      root.addEventListener('pointercancel', this.onPointerUp, true);
      if (this.motionQuery.addEventListener) this.motionQuery.addEventListener('change', this.onMotionChange);

      this.sync({ initial: true, allowWave: false });
      this.startTimers();
    }

    get reducedMotion() { return this.motionQuery.matches; }

    setTimer(callback, delay) {
      const timer = window.setTimeout(() => {
        this.timers.delete(timer);
        if (!this.destroyed) callback();
      }, delay);
      this.timers.add(timer);
      return timer;
    }

    setIntervalTimer(callback, delay) {
      const timer = window.setInterval(() => {
        if (!this.destroyed) callback();
      }, delay);
      this.timers.add(timer);
      return timer;
    }

    clearTimer(timer) {
      window.clearTimeout(timer);
      window.clearInterval(timer);
      this.timers.delete(timer);
    }

    startTimers() {
      this.setIntervalTimer(() => this.renderAge(), 30000);
      this.setIntervalTimer(() => this.fallbackCheck(), 5000);
      this.setIntervalTimer(() => this.checkStale(), 15000);
    }

    async request(path) {
      const now = Date.now();
      if (now < this.restRetryAfterUntil) throw new Error('rest retry delayed');
      const controller = new AbortController();
      this.aborters.add(controller);
      const timeout = this.setTimer(() => controller.abort(), 10000);
      try {
        const response = await fetch(`${API}${path}`, { signal: controller.signal, cache: 'no-store' });
        if (response.status === 429) {
          this.applyRateLimit(response);
          throw new Error('rate limited');
        }
        if (!response.ok) throw new Error(`http ${response.status}`);
        const type = response.headers.get('content-type') || '';
        if (path === '/blocks/tip/hash') return (await response.text()).trim();
        if (!type.includes('json')) throw new Error('unexpected content type');
        return response.json();
      } finally {
        this.clearTimer(timeout);
        this.aborters.delete(controller);
      }
    }

    applyRateLimit(response) {
      const retry = response.headers.get('Retry-After');
      const seconds = retry ? Number.parseInt(retry, 10) : NaN;
      if (Number.isFinite(seconds) && seconds > 0) {
        this.restRetryAfterUntil = Date.now() + seconds * 1000;
        return;
      }
      this.restRetryAfterUntil = Date.now() + this.restBackoff;
      this.restBackoff = Math.min(this.restBackoff * 2, MAX_REST_BACKOFF_MS);
    }

    validHash(hash) { return typeof hash === 'string' && /^[a-f0-9]{64}$/i.test(hash); }

    normalizeBlock(data) {
      if (!data || !this.validHash(data.id)) return null;
      const height = Number(data.height);
      const timestamp = Number(data.timestamp);
      const txCount = Number(data.tx_count);
      if (!Number.isFinite(height) || !Number.isFinite(timestamp) || !Number.isFinite(txCount)) return null;
      return { hash: data.id, height, timestamp, txCount, medianFee: null };
    }

    normalizeMedianFee(value) {
      const medianFee = Number(value);
      if (!Number.isFinite(medianFee) || medianFee < 0) return null;
      return medianFee;
    }

    normalizeProjected(data) {
      const first = Array.isArray(data) ? data[0] : data;
      const nTx = Number(first && first.nTx);
      const medianFee = this.normalizeMedianFee(first && first.medianFee);
      if (!Number.isFinite(nTx) || nTx < 0) return null;
      return { nTx: Math.round(nTx), medianFee };
    }

    async fetchConfirmedMedianFee(hash, height) {
      try {
        const richBlock = await this.request(`/v1/block/${hash}`);
        if (!richBlock || richBlock.id !== hash || Number(richBlock.height) !== height) return null;
        return this.normalizeMedianFee(richBlock.extras && richBlock.extras.medianFee);
      } catch (error) {
        return null;
      }
    }

    async fetchState() {
      const hash = await this.request('/blocks/tip/hash');
      if (!this.validHash(hash)) throw new Error('invalid tip hash');
      const blockData = await this.request(`/block/${hash}`);
      const projectedData = await this.request('/v1/fees/mempool-blocks');
      const block = this.normalizeBlock(blockData);
      const projected = this.normalizeProjected(projectedData);
      if (!block || block.hash !== hash || !projected) throw new Error('invalid api payload');
      const medianFee = await this.fetchConfirmedMedianFee(hash, block.height);
      if (Number.isFinite(medianFee)) {
        block.medianFee = medianFee;
      } else if (this.block && this.block.hash === block.hash && Number.isFinite(this.block.medianFee)) {
        block.medianFee = this.block.medianFee;
      }
      return { block, projected };
    }

    mergeSyncOptions(current, next) {
      if (!current) return { ...next };
      return {
        initial: current.initial && next.initial,
        allowWave: current.allowWave || next.allowWave,
        silent: current.silent && next.silent
      };
    }

    async sync(options = {}) {
      const requestOptions = { initial: false, allowWave: true, silent: false, ...options };
      if (this.destroyed || Date.now() < this.restRetryAfterUntil) return;
      if (document.hidden && !requestOptions.initial) return;
      if (this.transitioning) {
        this.pendingAfterTransition = this.mergeSyncOptions(this.pendingAfterTransition, { ...requestOptions, allowWave: false, silent: true });
        return;
      }
      if (this.syncing) {
        this.pendingSync = this.mergeSyncOptions(this.pendingSync, requestOptions);
        return;
      }

      this.syncing = true;
      const hadBlock = Boolean(this.block);
      if (!requestOptions.silent && hadBlock) this.setStatus('UPDATING');
      try {
        const state = await this.fetchState();
        this.lastSuccess = Date.now();
        this.lastFallback = this.lastSuccess;
        this.lastProjectedRest = this.lastSuccess;
        this.restBackoff = 5000;
        this.restRetryAfterUntil = 0;
        if (requestOptions.initial || !this.initialized || !hadBlock) {
          this.block = state.block;
          this.projected = state.projected;
          this.initialized = true;
          this.renderAll();
          this.setStatus('LIVE');
          return;
        }

        const old = this.block;
        const isNext = state.block.height === old.height + 1 && state.block.hash !== old.hash;
        const canWave = requestOptions.allowWave && isNext && !document.hidden && this.inView;
        if (canWave) {
          await this.runTransition(state.block, state.projected, false);
        } else {
          this.block = state.block;
          this.projected = state.projected;
          this.renderAll();
          this.setStatus('LIVE');
        }
      } catch (error) {
        this.handleFailure();
      } finally {
        this.syncing = false;
        const pending = this.pendingSync;
        this.pendingSync = null;
        if (pending && !this.destroyed) this.setTimer(() => this.sync(pending), 0);
      }
    }

    async refreshProjectedOnly(projected) {
      if (this.destroyed || !this.initialized || this.transitioning || this.syncing) return;
      if (projected) {
        this.projected = projected;
        this.renderProjected();
        return;
      }
      const now = Date.now();
      if (now - this.lastProjectedRest < FALLBACK_MS || now < this.restRetryAfterUntil) return;
      this.lastProjectedRest = now;
      try {
        const projectedData = await this.request('/v1/fees/mempool-blocks');
        const nextProjected = this.normalizeProjected(projectedData);
        if (nextProjected) {
          this.projected = nextProjected;
          this.renderProjected();
        }
      } catch (error) {
        this.handleFailure();
      }
    }

    handleFailure() {
      if (!this.restRetryAfterUntil) {
        this.restRetryAfterUntil = Date.now() + this.restBackoff;
        this.restBackoff = Math.min(this.restBackoff * 2, MAX_REST_BACKOFF_MS);
      }
      if (this.block && this.projected) {
        this.checkStale();
      } else {
        this.setStatus('UNAVAILABLE');
      }
    }

    fallbackCheck() {
      if (this.destroyed || document.hidden) return;
      const now = Date.now();
      if (now - this.lastFallback < FALLBACK_MS || now < this.restRetryAfterUntil) return;
      this.lastFallback = now;
      this.sync({ allowWave: true, silent: true });
    }

    checkStale() {
      if (!this.lastSuccess || !this.block) return;
      if (Date.now() - this.lastSuccess > STALE_MS) this.setStatus('DATA DELAYED');
    }

    handleSocketMessage(data) {
      if (this.destroyed || document.hidden) return;
      const hasBlockSignal = Boolean(data && (data.block || data.blocks || data.blockHeight));
      if (hasBlockSignal) {
        this.runtime.queueBlockSync();
        return;
      }
      const mempoolPayload = data && (data['mempool-blocks'] || data.mempoolBlocks);
      const projected = this.normalizeProjected(mempoolPayload);
      if (projected) this.refreshProjectedOnly(projected);
    }

    renderAll() {
      this.renderConfirmed();
      this.renderProjected();
      if (this.block) {
        this.root.dataset.blockHeight = String(this.block.height);
        this.root.dataset.blockHash = this.block.hash;
      }
    }

    renderConfirmed() {
      if (!this.block) return;
      this.nodes.confirmedTitle.textContent = `BLOCK ${this.block.height.toLocaleString()}`;
      this.nodes.confirmedState.textContent = 'CONFIRMED';
      this.renderAge();
      if (this.nodes.confirmedFee) this.nodes.confirmedFee.textContent = this.feeLabel(this.block.medianFee);
    }

    renderProjected() {
      if (!this.projected) return;
      this.nodes.projectedTitle.textContent = 'NEXT BLOCK';
      this.nodes.projectedState.textContent = 'PROJECTED';
      this.nodes.projectedTx.textContent = `≈ ${this.projected.nTx.toLocaleString()} TX`;
      if (this.nodes.projectedFee) this.nodes.projectedFee.textContent = this.feeLabel(this.projected.medianFee);
    }

    renderAge(target = this.nodes.confirmedAge, block = this.block) {
      if (!block || !target) return;
      target.textContent = this.ageLabel(block.timestamp);
    }

    feeLabel(medianFee) {
      if (!Number.isFinite(medianFee)) return '';
      const rounded = medianFee >= 10 ? Math.round(medianFee) : Math.round(medianFee * 10) / 10;
      return `MEDIAN ${rounded.toLocaleString()} SAT/VB`;
    }

    ageLabel(timestamp) {
      const seconds = Math.max(0, Math.floor(Date.now() / 1000 - timestamp));
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) return `${days} ${days === 1 ? 'DAY' : 'DAYS'} AGO`;
      if (hours > 0) return `${hours} ${hours === 1 ? 'HOUR' : 'HOURS'} AGO`;
      if (minutes > 0) return `${minutes} ${minutes === 1 ? 'MIN' : 'MINS'} AGO`;
      return 'JUST NOW';
    }

    setStatus(status) {
      const changed = this.currentStatus !== status;
      this.currentStatus = status;
      this.nodes.status.textContent = status;
      if (this.nodes.announcer && changed) {
        if (IMPORTANT_STATUSES.has(status)) {
          this.nodes.announcer.textContent = '';
          if (this.announceTimer) this.clearTimer(this.announceTimer);
          this.announceTimer = this.setTimer(() => {
            this.announceTimer = null;
            this.nodes.announcer.textContent = status;
          }, 40);
        } else {
          if (this.announceTimer) this.clearTimer(this.announceTimer);
          this.announceTimer = null;
          this.nodes.announcer.textContent = '';
        }
      }
      this.root.dataset.radarStatus = status.toLowerCase().replace(/\s+/g, '-');
    }

    prepareTransitionTile(sourceProjected, destinationBlock) {
      const stripRect = this.nodes.strip.getBoundingClientRect();
      const projectedRect = this.nodes.projectedTile.getBoundingClientRect();
      const confirmedRect = this.nodes.confirmedTile.getBoundingClientRect();
      const startLeft = projectedRect.left - stripRect.left;
      const distance = confirmedRect.left - projectedRect.left;
      this.root.style.setProperty('--msc-radar-transition-left', `${startLeft}px`);
      this.root.style.setProperty('--msc-radar-transition-width', `${projectedRect.width}px`);
      this.root.style.setProperty('--msc-radar-transition-x', `${distance}px`);
      this.nodes.transitionTitle.textContent = 'NEXT BLOCK';
      this.nodes.transitionState.textContent = 'PROJECTED';
      this.nodes.transitionMeta.textContent = sourceProjected ? [
        `≈ ${sourceProjected.nTx.toLocaleString()} TX`,
        this.feeLabel(sourceProjected.medianFee)
      ].filter(Boolean).join(' · ') : '';
      return () => {
        this.nodes.transitionTitle.textContent = `BLOCK ${destinationBlock.height.toLocaleString()}`;
        this.nodes.transitionState.textContent = 'CONFIRMED';
        this.nodes.transitionMeta.textContent = [
          this.ageLabel(destinationBlock.timestamp),
          this.feeLabel(destinationBlock.medianFee)
        ].filter(Boolean).join(' · ');
      };
    }

    async runTransition(block, projected, demo) {
      if (this.transitioning || !this.nodes.transitionTile) return;
      this.transitioning = true;
      this.updateMotionPause();
      const sourceProjected = this.projected;
      const replaceTransitionData = this.prepareTransitionTile(sourceProjected, block);
      this.root.dataset.radarTransition = 'true';
      this.setStatus('NEW BLOCK');

      if (this.reducedMotion) {
        this.root.dataset.radarRefresh = 'true';
        await new Promise((resolve) => this.setTimer(resolve, 100));
        if (!demo) {
          this.block = block;
          this.projected = projected;
          this.renderAll();
        }
        await new Promise((resolve) => this.setTimer(resolve, 100));
        this.root.dataset.radarRefresh = 'false';
        this.finishTransition();
        return;
      }

      this.setTimer(() => {
        replaceTransitionData();
        if (!demo) {
          this.projected = projected;
          this.renderProjected();
        }
      }, 1080);
      this.setTimer(() => {
        if (!demo) {
          this.block = block;
          this.projected = projected;
          this.renderAll();
        }
      }, 2060);
      this.setTimer(() => this.finishTransition(), TRANSITION_MS);
      await new Promise((resolve) => this.setTimer(resolve, TRANSITION_MS + 20));
    }

    finishTransition() {
      this.root.dataset.radarTransition = 'false';
      this.root.dataset.radarRefresh = 'false';
      this.nodes.transitionTitle.textContent = 'NEXT BLOCK';
      this.nodes.transitionState.textContent = 'PROJECTED';
      this.nodes.transitionMeta.textContent = '';
      this.setStatus('LIVE');
      this.transitioning = false;
      this.updateMotionPause();
      const pending = this.pendingAfterTransition;
      this.pendingAfterTransition = null;
      if (pending && !this.destroyed) this.setTimer(() => this.sync(pending), 0);
    }

    updateMotionPause() {
      this.root.dataset.radarPaused = this.inView && !this.transitioning && !this.reducedMotion ? 'false' : 'true';
    }

    handleVisibilityRestore() {
      this.updateMotionPause();
      this.sync({ allowWave: false, silent: true });
    }

    handlePageShow(event) {
      if (event.persisted) this.sync({ allowWave: false, silent: true });
    }

    onDemo() {
      if (!this.initialized || this.transitioning) return;
      this.runTransition(this.block, this.projected, true);
    }

    onPointerDown(event) {
      const link = event.target.closest('[data-radar-link]');
      if (link) link.dataset.pointerActive = 'true';
    }

    onPointerUp(event) {
      const link = event.target.closest('[data-radar-link]');
      if (link) link.dataset.pointerActive = 'false';
    }

    onMotionChange() { this.updateMotionPause(); }

    destroy() {
      this.destroyed = true;
      this.timers.forEach((timer) => {
        window.clearTimeout(timer);
        window.clearInterval(timer);
      });
      this.timers.clear();
      this.aborters.forEach((controller) => controller.abort());
      this.aborters.clear();
      if (this.observer) this.observer.disconnect();
      this.root.removeEventListener('msc:ecosystem-radar-demo-new-block', this.onDemo);
      this.root.removeEventListener('pointerdown', this.onPointerDown, true);
      this.root.removeEventListener('pointerup', this.onPointerUp, true);
      this.root.removeEventListener('pointercancel', this.onPointerUp, true);
      if (this.motionQuery.removeEventListener) this.motionQuery.removeEventListener('change', this.onMotionChange);
      delete this.root.__mscHomeEcosystemRadarController;
    }
  }

  const runtime = {
    controllers: new Set(),
    ws: null,
    wsBackoff: 5000,
    wsReconnectTimer: null,
    wsDebounceTimer: null,
    initRoot(root) {
      if (!root || root.__mscHomeEcosystemRadarController) return;
      const controller = new RadarController(root, this);
      root.__mscHomeEcosystemRadarController = controller;
      this.controllers.add(controller);
      this.openSocket();
    },
    initNewRoots(scope = document) {
      scope.querySelectorAll(ROOT).forEach((root) => this.initRoot(root));
    },
    closeSocket() {
      if (this.wsDebounceTimer) {
        window.clearTimeout(this.wsDebounceTimer);
        this.wsDebounceTimer = null;
      }
      if (this.wsReconnectTimer) {
        window.clearTimeout(this.wsReconnectTimer);
        this.wsReconnectTimer = null;
      }
      if (this.ws) {
        const socket = this.ws;
        this.ws = null;
        socket.close();
      }
    },
    openSocket() {
      if (this.ws || document.hidden || !this.controllers.size) return;
      let socket;
      try {
        socket = new WebSocket(WS_URL);
      } catch (error) {
        this.scheduleSocketReconnect();
        return;
      }
      this.ws = socket;
      socket.addEventListener('open', () => {
        if (this.ws !== socket) return;
        this.wsBackoff = 5000;
        socket.send(JSON.stringify({ action: 'want', data: ['blocks', 'mempool-blocks'] }));
      });
      socket.addEventListener('message', (event) => {
        if (this.ws !== socket) return;
        this.handleSocketMessage(event);
      });
      socket.addEventListener('close', () => {
        if (this.ws !== socket) return;
        this.ws = null;
        this.scheduleSocketReconnect();
      });
      socket.addEventListener('error', () => {
        if (this.ws === socket) socket.close();
      });
    },
    scheduleSocketReconnect() {
      if (document.hidden || !this.controllers.size || this.wsReconnectTimer) return;
      const delay = Math.min(this.wsBackoff, MAX_WS_BACKOFF_MS);
      this.wsBackoff = Math.min(this.wsBackoff * 2, MAX_WS_BACKOFF_MS);
      this.wsReconnectTimer = window.setTimeout(() => {
        this.wsReconnectTimer = null;
        this.openSocket();
      }, delay);
    },
    handleSocketMessage(event) {
      let data;
      try { data = JSON.parse(event.data); } catch (error) { return; }
      this.controllers.forEach((controller) => controller.handleSocketMessage(data));
    },
    queueBlockSync() {
      if (this.wsDebounceTimer) window.clearTimeout(this.wsDebounceTimer);
      this.wsDebounceTimer = window.setTimeout(() => {
        this.wsDebounceTimer = null;
        this.controllers.forEach((controller) => controller.sync({ allowWave: true, silent: true }));
      }, 1200);
    },
    onVisibility() {
      if (document.hidden) {
        this.closeSocket();
        this.controllers.forEach((controller) => controller.updateMotionPause());
        return;
      }
      this.openSocket();
      this.controllers.forEach((controller) => controller.handleVisibilityRestore());
    },
    onPageShow(event) {
      this.controllers.forEach((controller) => controller.handlePageShow(event));
    },
    onSectionLoad(event) {
      this.initNewRoots(event.target || document);
    },
    onSectionUnload(event) {
      this.controllers.forEach((controller) => {
        if (event.target && event.target.contains(controller.root)) {
          controller.destroy();
          this.controllers.delete(controller);
        }
      });
      if (!this.controllers.size) this.closeSocket();
    }
  };

  window[RUNTIME_KEY] = runtime;
  document.addEventListener('visibilitychange', () => runtime.onVisibility());
  window.addEventListener('pageshow', (event) => runtime.onPageShow(event));
  document.addEventListener('shopify:section:load', (event) => runtime.onSectionLoad(event));
  document.addEventListener('shopify:section:unload', (event) => runtime.onSectionUnload(event));
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => runtime.initNewRoots(document), { once: true });
  } else {
    runtime.initNewRoots(document);
  }
})();
