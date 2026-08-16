(() => {
  const OVERVIEW = [0, 0, 1200, 560];
  const OVERVIEW_RATIO = OVERVIEW[2] / OVERVIEW[3];
  const MIN_FOCUS_WIDTH = 560;
  const MAX_FOCUS_WIDTH = 720;
  const VIEWBOX_OVERSCAN = 40;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const XLINK_NS = 'http://www.w3.org/1999/xlink';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const parseBox = (value) => String(value || '').trim().split(/\s+/).map(Number);
  const boxToString = (box) => box.map((n) => Number(n.toFixed(2))).join(' ');
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  const safeBBox = (node) => {
    if (!node || typeof node.getBBox !== 'function') return null;

    try {
      const box = node.getBBox();
      if (![box.x, box.y, box.width, box.height].every(Number.isFinite)) return null;
      if (box.width <= 0 || box.height <= 0) return null;
      return box;
    } catch (error) {
      return null;
    }
  };

  const unionBoxes = (...boxes) => {
    const valid = boxes.filter(Boolean);
    if (!valid.length) return null;

    const left = Math.min(...valid.map((box) => box.x));
    const top = Math.min(...valid.map((box) => box.y));
    const right = Math.max(...valid.map((box) => box.x + box.width));
    const bottom = Math.max(...valid.map((box) => box.y + box.height));

    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top
    };
  };

  document.querySelectorAll('[data-atlas]').forEach((atlas, atlasIndex) => {
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
       Remove source-level button semantics from SVG region groups so the
       charted entity buttons remain individually exposed to assistive tech. */
    mapRegions.forEach((region) => {
      region.removeAttribute('role');
      region.removeAttribute('tabindex');
      region.removeAttribute('aria-pressed');
      region.removeAttribute('aria-label');
    });

    const getOuterShape = (region) => (
      region?.querySelector('.msc-atlas-map__region-shape:not(.msc-atlas-map__region-shape--inner)')
      || region?.querySelector('.msc-atlas-map__region-shape')
      || null
    );

    /* Build one highlight copy of the real coastline. It is clipped by the
       selected region's invisible interaction geometry, so focus states never
       expose synthetic internal borders. */
    const defs = svg.querySelector('defs');
    const landContext = svg.querySelector('.msc-atlas-map__land-context');
    const baseLandmass = landContext?.querySelector('.msc-atlas-map__landmass');
    const focusClipBySlug = new Map();
    let focusCoast = null;

    if (defs && landContext && baseLandmass) {
      focusCoast = baseLandmass.cloneNode(false);
      focusCoast.classList.add('msc-atlas-map__focus-coast');
      focusCoast.setAttribute('aria-hidden', 'true');
      focusCoast.removeAttribute('id');
      landContext.appendChild(focusCoast);

      mapRegions.forEach((region, regionIndex) => {
        const slug = region.dataset.atlasRegionShape;
        const shape = getOuterShape(region);
        if (!slug || !shape) return;

        const shapeId = `MscAtlasRegionHit-${atlasIndex}-${regionIndex}-${slug}`;
        const clipId = `MscAtlasRegionClip-${atlasIndex}-${regionIndex}-${slug}`;

        shape.id = shapeId;

        const clip = document.createElementNS(SVG_NS, 'clipPath');
        clip.id = clipId;
        clip.setAttribute('clipPathUnits', 'userSpaceOnUse');

        const use = document.createElementNS(SVG_NS, 'use');
        use.setAttribute('href', `#${shapeId}`);
        use.setAttributeNS(XLINK_NS, 'href', `#${shapeId}`);

        clip.appendChild(use);
        defs.appendChild(clip);
        focusClipBySlug.set(slug, clipId);
      });
    }

    const updateFocusCoast = (slug) => {
      if (!focusCoast) return;

      const clipId = slug ? focusClipBySlug.get(slug) : null;
      if (clipId) {
        focusCoast.setAttribute('clip-path', `url(#${clipId})`);
      } else {
        focusCoast.removeAttribute('clip-path');
      }
    };

    const getCurrentBox = () => parseBox(svg.getAttribute('viewBox'));

    const normalizeBox = (box) => {
      let [x, y, width, height] = box;

      if (![x, y, width, height].every(Number.isFinite) || width <= 0 || height <= 0) {
        return [...OVERVIEW];
      }

      if (Math.abs(width - OVERVIEW[2]) < .01 && Math.abs(height - OVERVIEW[3]) < .01) {
        return [...OVERVIEW];
      }

      width = Math.max(MIN_FOCUS_WIDTH, Math.min(MAX_FOCUS_WIDTH, width));
      height = width / OVERVIEW_RATIO;

      const minX = OVERVIEW[0] - VIEWBOX_OVERSCAN;
      const maxX = OVERVIEW[0] + OVERVIEW[2] - width + VIEWBOX_OVERSCAN;
      const minY = OVERVIEW[1] - VIEWBOX_OVERSCAN;
      const maxY = OVERVIEW[1] + OVERVIEW[3] - height + VIEWBOX_OVERSCAN;

      x = Math.max(minX, Math.min(x, maxX));
      y = Math.max(minY, Math.min(y, maxY));

      return [x, y, width, height];
    };

    const getFocusBox = (region) => {
      if (!region) return [...OVERVIEW];

      const shape = getOuterShape(region);
      const shapeBounds = safeBBox(shape);

      if (shapeBounds) {
        const labelBounds = safeBBox(region.querySelector('.msc-atlas-map__region-label'));
        const indexBounds = safeBBox(region.querySelector('.msc-atlas-map__region-index'));
        const entityBounds = safeBBox(region.querySelector('.msc-atlas-map__entities'));
        const contentBounds = unionBoxes(labelBounds, indexBounds, entityBounds);

        const shapeCenterX = shapeBounds.x + (shapeBounds.width / 2);
        const shapeCenterY = shapeBounds.y + (shapeBounds.height / 2);
        const contentCenterX = contentBounds
          ? contentBounds.x + (contentBounds.width / 2)
          : shapeCenterX;
        const contentCenterY = contentBounds
          ? contentBounds.y + (contentBounds.height / 2)
          : shapeCenterY;

        /* Keep the territory dominant while nudging the camera toward the
           label/entity cluster so the focused composition feels authored. */
        const centerX = (shapeCenterX * .68) + (contentCenterX * .32);
        const centerY = (shapeCenterY * .62) + (contentCenterY * .38);

        const widthFromShape = shapeBounds.width * 1.06;
        const widthFromHeight = shapeBounds.height * OVERVIEW_RATIO * 1.08;
        const widthFromContent = contentBounds ? contentBounds.width * 1.24 : 0;
        const width = Math.max(
          MIN_FOCUS_WIDTH,
          Math.min(MAX_FOCUS_WIDTH, Math.max(widthFromShape, widthFromHeight, widthFromContent))
        );
        const height = width / OVERVIEW_RATIO;

        return normalizeBox([
          centerX - (width / 2),
          centerY - (height / 2),
          width,
          height
        ]);
      }

      const fallback = parseBox(region.dataset.atlasViewbox);
      return fallback.length === 4 ? normalizeBox(fallback) : [...OVERVIEW];
    };

    const setViewBox = (box) => {
      const normalized = (
        box[2] >= OVERVIEW[2] - .01 && box[3] >= OVERVIEW[3] - .01
      ) ? [...OVERVIEW] : normalizeBox(box);

      svg.setAttribute('viewBox', boxToString(normalized));

      /* Geography may zoom; labels and entity marks remain screen-readable. */
      const counterScale = Math.max(.44, Math.min(1, normalized[2] / OVERVIEW[2]));
      atlas.style.setProperty('--atlas-counter-scale', counterScale.toFixed(4));
    };

    const animateViewBox = (target) => {
      if (!target || target.length !== 4 || target.some(Number.isNaN)) return;
      if (animationFrame) cancelAnimationFrame(animationFrame);

      const normalizedTarget = (
        target[2] >= OVERVIEW[2] - .01 && target[3] >= OVERVIEW[3] - .01
      ) ? [...OVERVIEW] : normalizeBox(target);

      if (reduceMotion) {
        setViewBox(normalizedTarget);
        return;
      }

      const from = getCurrentBox();
      const started = performance.now();
      const duration = 420;

      const tick = (now) => {
        const progress = Math.min(1, (now - started) / duration);
        const amount = ease(progress);
        const next = from.map((value, index) => (
          value + ((normalizedTarget[index] - value) * amount)
        ));

        if (progress < 1) {
          /* Do not normalize intermediate frames: preserving the interpolated
             aspect ratio prevents visible snapping during overview/focus moves. */
          svg.setAttribute('viewBox', boxToString(next));
          const counterScale = Math.max(.44, Math.min(1, next[2] / OVERVIEW[2]));
          atlas.style.setProperty('--atlas-counter-scale', counterScale.toFixed(4));
          animationFrame = requestAnimationFrame(tick);
        } else {
          setViewBox(normalizedTarget);
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
      const targetBox = activeRegion ? getFocusBox(activeRegion) : OVERVIEW;

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

      updateFocusCoast(slug);
      updateEntityTabStops(slug);
      if (!slug) clearInspect();

      if (modeReadout) {
        modeReadout.textContent = (
          mode === 'locked'
            ? 'LOCKED VIEW'
            : mode === 'preview'
              ? 'REGION PREVIEW'
              : 'FULL OCEAN'
        );
      }
      if (regionReadout) regionReadout.textContent = label;
      if (live) {
        live.textContent = slug
          ? `${label} ${mode === 'locked' ? 'locked' : 'preview'}`
          : 'Full Bitcoin Ocean view';
      }

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

      entities.forEach((item) => {
        item.setAttribute('aria-pressed', item === entity ? 'true' : 'false');
      });

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

    setViewBox(OVERVIEW);
    updateFocusCoast(null);
    updateEntityTabStops(null);
    render(null, 'overview');
  });
})();