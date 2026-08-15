(() => {
  const OVERVIEW = [0, 0, 1200, 560];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const parseBox = (value) => String(value || '').trim().split(/\s+/).map(Number);
  const boxToString = (box) => box.map((n) => Number(n.toFixed(2))).join(' ');
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  document.querySelectorAll('[data-atlas]').forEach((atlas) => {
    const svg = atlas.querySelector('[data-atlas-map]');
    const modeReadout = atlas.querySelector('[data-atlas-mode]');
    const regionReadout = atlas.querySelector('[data-atlas-region-label]');
    const live = atlas.querySelector('[data-atlas-live]');
    const inspect = atlas.querySelector('[data-atlas-inspect]');
    const inspectTitle = atlas.querySelector('[data-atlas-inspect-title]');
    const inspectMeta = atlas.querySelector('[data-atlas-inspect-meta]');
    const inspectClose = atlas.querySelector('[data-atlas-inspect-close]');
    const navTargets = [...atlas.querySelectorAll('[data-atlas-target]')];
    const mapRegions = [...atlas.querySelectorAll('[data-atlas-region-shape]')];
    const entities = [...atlas.querySelectorAll('[data-atlas-entity]')];

    if (!svg || !navTargets.length || !mapRegions.length) return;

    let locked = null;
    let animationFrame = null;

    const regionBySlug = new Map(
      mapRegions.map((region) => [region.dataset.atlasRegionShape, region])
    );

    /* Region selection is keyboard-operated through the bottom navigation.
       Remove source-level button semantics from the SVG region groups so
       charted entity buttons remain individually exposed to assistive tech. */
    mapRegions.forEach((region) => {
      region.removeAttribute('role');
      region.removeAttribute('tabindex');
      region.removeAttribute('aria-pressed');
      region.removeAttribute('aria-label');
    });

    const getCurrentBox = () => parseBox(svg.getAttribute('viewBox'));

    const animateViewBox = (target) => {
      if (!target || target.length !== 4 || target.some(Number.isNaN)) return;
      if (animationFrame) cancelAnimationFrame(animationFrame);

      if (reduceMotion) {
        svg.setAttribute('viewBox', boxToString(target));
        return;
      }

      const from = getCurrentBox();
      const started = performance.now();
      const duration = 360;

      const tick = (now) => {
        const progress = Math.min(1, (now - started) / duration);
        const amount = ease(progress);
        const next = from.map((value, index) => value + (target[index] - value) * amount);
        svg.setAttribute('viewBox', boxToString(next));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(tick);
        } else {
          animationFrame = null;
        }
      };

      animationFrame = requestAnimationFrame(tick);
    };

    const clearInspect = () => {
      if (!inspect) return;
      inspect.hidden = true;
      entities.forEach((entity) => entity.setAttribute('aria-pressed', 'false'));
    };

    const updateEntityTabStops = (activeSlug) => {
      entities.forEach((entity) => {
        const enabled = Boolean(activeSlug && entity.dataset.atlasEntityRegion === activeSlug);
        entity.setAttribute('tabindex', enabled ? '0' : '-1');
        entity.setAttribute('aria-hidden', enabled ? 'false' : 'true');
      });
    };

    const render = (slug, mode) => {
      const activeRegion = slug ? regionBySlug.get(slug) : null;
      const label = activeRegion?.dataset.atlasRegionLabel || 'ALL 08';
      const targetBox = activeRegion ? parseBox(activeRegion.dataset.atlasViewbox) : OVERVIEW;

      atlas.classList.toggle('has-active-region', Boolean(slug));
      atlas.dataset.atlasActive = slug || '';
      atlas.dataset.atlasMode = mode;

      mapRegions.forEach((region) => {
        region.classList.toggle('is-active', region.dataset.atlasRegionShape === slug);
      });

      navTargets.forEach((target) => {
        const active = target.dataset.atlasTarget === slug;
        const isLocked = locked === target.dataset.atlasTarget;
        target.classList.toggle('is-active', active);
        target.classList.toggle('is-locked', isLocked);
        target.setAttribute('aria-pressed', isLocked ? 'true' : 'false');
        const state = target.querySelector('[data-atlas-target-state]');
        if (state) state.textContent = isLocked ? 'LOCKED' : active ? 'PREVIEW' : 'CHART';
      });

      updateEntityTabStops(slug);
      if (!slug) clearInspect();

      if (modeReadout) modeReadout.textContent = mode === 'locked' ? 'LOCKED VIEW' : mode === 'preview' ? 'REGION PREVIEW' : 'FULL OCEAN';
      if (regionReadout) regionReadout.textContent = label;
      if (live) live.textContent = slug ? `${label} ${mode === 'locked' ? 'locked' : 'preview'}` : 'Full Bitcoin Ocean view';

      animateViewBox(targetBox);
    };

    const setPreview = (slug) => {
      if (locked) return;
      clearInspect();
      render(slug, slug ? 'preview' : 'overview');
    };

    const toggleLock = (slug) => {
      clearInspect();
      if (locked === slug) {
        locked = null;
        render(null, 'overview');
        return;
      }

      locked = slug;
      render(slug, 'locked');
    };

    const focusFirstEntity = (slug) => {
      const first = entities.find((entity) => entity.dataset.atlasEntityRegion === slug);
      if (first) requestAnimationFrame(() => first.focus());
    };

    const showEntity = (entity) => {
      const slug = entity.dataset.atlasEntityRegion;
      if (!slug) return;

      if (locked !== slug) {
        locked = slug;
        render(slug, 'locked');
      }

      entities.forEach((item) => item.setAttribute('aria-pressed', item === entity ? 'true' : 'false'));

      if (inspect && inspectTitle && inspectMeta) {
        inspectTitle.textContent = entity.dataset.atlasEntity;
        inspectMeta.textContent = `${regionBySlug.get(slug)?.dataset.atlasRegionLabel || slug} · CHARTED ENTITY · PROFILE ROUTE PENDING`;
        inspect.hidden = false;
      }
    };

    navTargets.forEach((target) => {
      const slug = target.dataset.atlasTarget;
      target.addEventListener('pointerenter', () => setPreview(slug));
      target.addEventListener('focus', () => setPreview(slug));
      target.addEventListener('click', (event) => {
        toggleLock(slug);
        if (event.detail === 0 && locked === slug) focusFirstEntity(slug);
      });
    });

    mapRegions.forEach((region) => {
      const slug = region.dataset.atlasRegionShape;
      region.addEventListener('pointerenter', () => setPreview(slug));
      region.addEventListener('click', () => toggleLock(slug));
    });

    entities.forEach((entity) => {
      entity.addEventListener('click', (event) => {
        event.stopPropagation();
        showEntity(entity);
      });
      entity.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          showEntity(entity);
        }
      });
    });

    atlas.addEventListener('pointerleave', () => {
      if (!locked) setPreview(null);
    });

    atlas.addEventListener('focusout', (event) => {
      if (!locked && !atlas.contains(event.relatedTarget)) setPreview(null);
    });

    atlas.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        locked = null;
        clearInspect();
        render(null, 'overview');
      }
    });

    inspectClose?.addEventListener('click', clearInspect);

    svg.setAttribute('viewBox', boxToString(OVERVIEW));
    updateEntityTabStops(null);
    render(null, 'overview');
  });
})();
