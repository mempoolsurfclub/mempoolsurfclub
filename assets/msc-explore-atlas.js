(() => {
  const OVERVIEW = [0, 0, 1200, 560];
  const OVERVIEW_RATIO = OVERVIEW[2] / OVERVIEW[3];
  const MIN_FOCUS_WIDTH = 560;
  const MAX_FOCUS_WIDTH = 720;
  const VIEWBOX_OVERSCAN = 180;
  const FOCUS_MASK_STROKE = 180;
  const SVG_NS = 'http://www.w3.org/2000/svg';
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

  const getVisualCenter = (node) => {
    const box = safeBBox(node);
    if (!box) return null;

    let x = box.x + (box.width / 2);
    let y = box.y + (box.height / 2);

    /* Region labels are positioned with CSS translate transforms. getBBox()
       does not reliably include that rendered translation across browsers, so
       apply the computed SVG/CSS matrix before using the label as camera focus. */
    try {
      const transform = window.getComputedStyle(node).transform;
      if (transform && transform !== 'none' && typeof DOMMatrixReadOnly !== 'undefined') {
        const matrix = new DOMMatrixReadOnly(transform);
        const point = typeof DOMPoint !== 'undefined'
          ? new DOMPoint(x, y).matrixTransform(matrix)
          : { x: x + matrix.e, y: y + matrix.f };
        x = point.x;
        y = point.y;
      }
    } catch (error) {
      /* Falling back to the untransformed label center is safer than failing
         the interaction if a browser exposes an unusual SVG transform value. */
    }

    return { x, y };
  };

  const getRenderedPathData = (path) => {
    if (!path) return '';

    try {
      const cssPath = window.getComputedStyle(path).getPropertyValue('d').trim();
      const match = cssPath.match(/^path\((['"]?)(.*)\1\)$/);
      if (match?.[2]) return match[2];
    } catch (error) {
      /* Source d remains a safe fallback if computed SVG path data is unavailable. */
    }

    return path.getAttribute('d') || '';
  };

  document.querySelectorAll('[data-atlas]').forEach((atlas, atlasIndex) => {
    const svg = atlas.querySelector('[data-atlas-map]');
    const identityLabel = atlas.querySelector('.msc-atlas-window__identity span');
    const identitySystem = atlas.querySelector('.msc-atlas-window__identity strong');
    const modeReadoutGroup = atlas.querySelector('[data-atlas-mode]')?.closest('.msc-atlas-window__readout');
    const regionReadout = atlas.querySelector('[data-atlas-region-label]');
    const regionReadoutGroup = regionReadout?.closest('.msc-atlas-window__readout');
    const regionPrefix = regionReadout?.parentElement?.querySelector('span');
    const topBar = atlas.querySelector('.msc-atlas-window__top');
    const live = atlas.querySelector('[data-atlas-live]');
    const inspect = atlas.querySelector('[data-atlas-inspect]');
    const inspectTitle = atlas.querySelector('[data-atlas-inspect-title]');
    const inspectMeta = atlas.querySelector('[data-atlas-inspect-meta]');
    const inspectClose = atlas.querySelector('[data-atlas-inspect-close]');
    const navTargets = [...atlas.querySelectorAll('[data-atlas-target]')];
    const mapRegions = [...atlas.querySelectorAll('[data-atlas-region-shape]')];
    const entities = [...atlas.querySelectorAll('[data-atlas-entity]')];

    if (!svg || !navTargets.length || !mapRegions.length) return;

    if (identitySystem) identitySystem.textContent = 'EXPLORE SYSTEM';
    if (modeReadoutGroup) {
      modeReadoutGroup.style.setProperty('display', 'none', 'important');
      modeReadoutGroup.setAttribute('aria-hidden', 'true');
    }
    topBar?.style.setProperty('grid-template-columns', 'minmax(0, 1fr) auto', 'important');

    /* The existing region readout becomes the focused Atlas title. Keep it in
       the interface chrome, centered independently of the zoomed geography. */
    if (topBar && regionReadoutGroup) {
      topBar.style.setProperty('position', 'relative', 'important');
      regionReadoutGroup.style.setProperty('position', 'absolute', 'important');
      regionReadoutGroup.style.setProperty('left', '50%', 'important');
      regionReadoutGroup.style.setProperty('top', '50%', 'important');
      regionReadoutGroup.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
      regionReadoutGroup.style.setProperty('justify-content', 'center', 'important');
      regionReadoutGroup.style.setProperty('text-align', 'center', 'important');
      regionReadoutGroup.style.setProperty('pointer-events', 'none', 'important');
    }
    if (regionPrefix) regionPrefix.style.setProperty('display', 'none', 'important');

    const syncRegionReadoutType = () => {
      if (!identityLabel || !regionReadout) return;
      const identityStyle = window.getComputedStyle(identityLabel);
      regionReadout.style.setProperty('font-size', identityStyle.fontSize, 'important');
      regionReadout.style.setProperty('font-weight', identityStyle.fontWeight, 'important');
      regionReadout.style.setProperty('line-height', identityStyle.lineHeight, 'important');
      regionReadout.style.setProperty('letter-spacing', identityStyle.letterSpacing, 'important');
      regionReadout.style.setProperty('color', identityStyle.color, 'important');
    };
    syncRegionReadoutType();
    window.addEventListener('resize', syncRegionReadoutType, { passive: true });

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

    /* Focus only real chart geography. The region polygons are interaction
       geometry, so they are converted into invisible buffered masks rather
       than drawn as outlines. The buffer captures coastline/shared-border
       strokes on both sides of the generous hit target and prevents the
       selected perimeter from being clipped into partial fragments. */
    const defs = svg.querySelector('defs');
    const landContext = svg.querySelector('.msc-atlas-map__land-context');
    const baseLandmass = landContext?.querySelector('.msc-atlas-map__landmass');
    const focusMaskBySlug = new Map();
    let focusCoast = null;
    let focusBoundaries = null;

    if (defs && landContext && baseLandmass) {
      focusCoast = baseLandmass.cloneNode(false);
      focusCoast.classList.add('msc-atlas-map__focus-coast');
      focusCoast.setAttribute('aria-hidden', 'true');
      focusCoast.removeAttribute('id');
      landContext.appendChild(focusCoast);

      const stateBoundarySource = regionBySlug
        .get('mining')
        ?.querySelector('.msc-atlas-map__region-shape--inner');
      const renderedBoundaryPath = getRenderedPathData(stateBoundarySource);

      if (renderedBoundaryPath) {
        focusBoundaries = document.createElementNS(SVG_NS, 'path');
        focusBoundaries.classList.add('msc-atlas-map__focus-boundaries');
        focusBoundaries.setAttribute('d', renderedBoundaryPath);
        focusBoundaries.setAttribute('fill', 'none');
        focusBoundaries.setAttribute('stroke-linecap', 'round');
        focusBoundaries.setAttribute('stroke-linejoin', 'round');
        focusBoundaries.setAttribute('vector-effect', 'non-scaling-stroke');
        focusBoundaries.setAttribute('pointer-events', 'none');
        focusBoundaries.setAttribute('aria-hidden', 'true');
        focusBoundaries.style.display = 'none';
        landContext.appendChild(focusBoundaries);
      }

      mapRegions.forEach((region, regionIndex) => {
        const slug = region.dataset.atlasRegionShape;
        const shape = getOuterShape(region);
        const renderedShapePath = getRenderedPathData(shape);
        if (!slug || !renderedShapePath) return;

        const maskId = `MscAtlasRegionFocusMask-${atlasIndex}-${regionIndex}-${slug}`;
        const mask = document.createElementNS(SVG_NS, 'mask');
        mask.id = maskId;
        mask.setAttribute('maskUnits', 'userSpaceOnUse');
        mask.setAttribute('maskContentUnits', 'userSpaceOnUse');
        mask.setAttribute('x', String(OVERVIEW[0] - VIEWBOX_OVERSCAN));
        mask.setAttribute('y', String(OVERVIEW[1] - VIEWBOX_OVERSCAN));
        mask.setAttribute('width', String(OVERVIEW[2] + (VIEWBOX_OVERSCAN * 2)));
        mask.setAttribute('height', String(OVERVIEW[3] + (VIEWBOX_OVERSCAN * 2)));

        const perimeterZone = document.createElementNS(SVG_NS, 'path');
        perimeterZone.setAttribute('d', renderedShapePath);
        perimeterZone.setAttribute('fill', 'white');
        perimeterZone.setAttribute('stroke', 'white');
        perimeterZone.setAttribute('stroke-width', String(FOCUS_MASK_STROKE));
        perimeterZone.setAttribute('stroke-linecap', 'round');
        perimeterZone.setAttribute('stroke-linejoin', 'round');

        mask.appendChild(perimeterZone);
        defs.appendChild(mask);
        focusMaskBySlug.set(slug, maskId);
      });
    }

    const updateFocusCoast = (slug, mode = 'overview') => {
      const maskId = slug ? focusMaskBySlug.get(slug) : null;

      if (focusCoast) {
        if (maskId) {
          focusCoast.setAttribute('mask', `url(#${maskId})`);
        } else {
          focusCoast.removeAttribute('mask');
        }
      }

      if (focusBoundaries) {
        if (maskId) {
          const lockedMode = mode === 'locked';
          focusBoundaries.setAttribute('mask', `url(#${maskId})`);
          focusBoundaries.setAttribute('stroke', lockedMode ? 'rgba(251, 248, 239, .94)' : 'rgba(251, 248, 239, .86)');
          focusBoundaries.setAttribute('stroke-width', lockedMode ? '1.7' : '1.55');
          focusBoundaries.setAttribute('opacity', lockedMode ? '1' : '.86');
          focusBoundaries.style.display = 'block';
        } else {
          focusBoundaries.removeAttribute('mask');
          focusBoundaries.style.display = 'none';
        }
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
        const label = region.querySelector('.msc-atlas-map__region-label');
        const labelCenter = getVisualCenter(label);
        const shapeCenterX = shapeBounds.x + (shapeBounds.width / 2);
        const shapeCenterY = shapeBounds.y + (shapeBounds.height / 2);
        const runesPerimeterCenter = region.dataset.atlasRegionShape === 'runes'
          ? { x: 554, y: 275 }
          : null;

        /* RUNES no longer shares the legacy source-label center used by the
           interaction polygon, so its camera follows the authoritative focused
           perimeter. Other regions retain the approved title-centered behavior. */
        const centerX = runesPerimeterCenter?.x ?? labelCenter?.x ?? shapeCenterX;
        const centerY = runesPerimeterCenter?.y ?? labelCenter?.y ?? shapeCenterY;

        const widthFromShape = shapeBounds.width * 1.06;
        const widthFromHeight = shapeBounds.height * OVERVIEW_RATIO * 1.08;
        const width = Math.max(
          MIN_FOCUS_WIDTH,
          Math.min(MAX_FOCUS_WIDTH, Math.max(widthFromShape, widthFromHeight))
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
      const label = activeRegion?.dataset.atlasRegionLabel || 'ALL';
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

      updateFocusCoast(slug, mode);
      updateEntityTabStops(slug);
      if (!slug) clearInspect();

      if (regionPrefix) regionPrefix.hidden = !slug;
      if (regionReadout) regionReadout.textContent = label;
      if (live) {
        live.textContent = slug
          ? `${label} ${mode === 'locked' ? 'locked' : 'preview'}`
          : 'All Explore regions';
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
    updateFocusCoast(null, 'overview');
    updateEntityTabStops(null);
    render(null, 'overview');
  });
})();
