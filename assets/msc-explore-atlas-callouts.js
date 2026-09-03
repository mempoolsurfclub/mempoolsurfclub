(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const XLINK_NS = 'http://www.w3.org/1999/xlink';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /*
   * Five regions are now pinned directly to the user's final marked screenshots.
   * Their X/Y title anchors are fixed visual coordinates within each focused
   * view. Reviewed anchors do not drift vertically through a generic candidate
   * search; the marked lane is used exactly and is shown only when its leader
   * can reach the region without crossing another visible map label.
   *
   * The remaining three regions keep the previously approved automatic side
   * resolution and small center bias.
   */
  const REGION_LAYOUT = Object.freeze({
    mining: { fallbackSide: 'right', yBias: 0.04 },
    ordinals: { reviewedSide: 'right', reviewedX: 0.82, reviewedY: 0.44 },
    runes: { fallbackSide: 'right', yBias: -0.03 },
    wallets: { reviewedSide: 'left', reviewedX: 0.13, reviewedY: 0.51 },
    marketplaces: { reviewedSide: 'right', reviewedX: 1.08, reviewedY: 0.50 },
    payments: { fallbackSide: 'left', yBias: -0.02 },
    exchanges: { reviewedSide: 'right', reviewedX: 1.03, reviewedY: 0.58 },
    network: { reviewedSide: 'left', reviewedX: -0.08, reviewedY: 0.57 },
  });

  const ACTIVE_MODES = new Set(['preview', 'locked']);

  const parseBox = (value) => String(value || '')
    .trim()
    .split(/\s+/)
    .map(Number)
    .filter(Number.isFinite);

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const getRenderedPathData = (path) => {
    if (!path) return '';

    try {
      const cssPath = window.getComputedStyle(path).getPropertyValue('d').trim();
      const match = cssPath.match(/^path\((['"]?)(.*)\1\)$/);
      if (match?.[2]) return match[2];
    } catch (error) {
      /* Source d remains a safe fallback. */
    }

    return path.getAttribute('d') || '';
  };

  const isVisible = (node, svg) => {
    let current = node;

    while (current && current !== svg) {
      const style = window.getComputedStyle(current);
      if (style.display === 'none' || style.visibility === 'hidden') return false;

      const opacity = Number.parseFloat(style.opacity || '1');
      if (Number.isFinite(opacity) && opacity <= 0.04) return false;

      current = current.parentElement;
    }

    return true;
  };

  const toRootPoint = (node, svg, x, y) => {
    if (typeof DOMPoint === 'undefined') return { x, y };

    try {
      const nodeMatrix = node.getScreenCTM?.();
      const rootMatrix = svg.getScreenCTM?.();
      if (!nodeMatrix || !rootMatrix) return { x, y };

      const matrix = rootMatrix.inverse().multiply(nodeMatrix);
      const point = new DOMPoint(x, y).matrixTransform(matrix);
      return { x: point.x, y: point.y };
    } catch (error) {
      return { x, y };
    }
  };

  const getRootBBox = (node, svg) => {
    if (!node || typeof node.getBBox !== 'function') return null;

    try {
      const box = node.getBBox();
      const corners = [
        toRootPoint(node, svg, box.x, box.y),
        toRootPoint(node, svg, box.x + box.width, box.y),
        toRootPoint(node, svg, box.x, box.y + box.height),
        toRootPoint(node, svg, box.x + box.width, box.y + box.height),
      ];
      const xs = corners.map((point) => point.x);
      const ys = corners.map((point) => point.y);

      if (![...xs, ...ys].every(Number.isFinite)) return null;

      return {
        x: Math.min(...xs),
        y: Math.min(...ys),
        width: Math.max(...xs) - Math.min(...xs),
        height: Math.max(...ys) - Math.min(...ys),
      };
    } catch (error) {
      return null;
    }
  };

  const expandBox = (box, amount) => ({
    x: box.x - amount,
    y: box.y - amount,
    width: box.width + (amount * 2),
    height: box.height + (amount * 2),
  });

  const boxesIntersect = (a, b) => (
    a.x < b.x + b.width
    && a.x + a.width > b.x
    && a.y < b.y + b.height
    && a.y + a.height > b.y
  );

  /* Liang-Barsky clipping: true means the leader enters the padded text box. */
  const segmentIntersectsBox = (x1, y1, x2, y2, box) => {
    const minX = box.x;
    const maxX = box.x + box.width;
    const minY = box.y;
    const maxY = box.y + box.height;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const p = [-dx, dx, -dy, dy];
    const q = [x1 - minX, maxX - x1, y1 - minY, maxY - y1];
    let u1 = 0;
    let u2 = 1;

    for (let i = 0; i < 4; i += 1) {
      if (p[i] === 0) {
        if (q[i] < 0) return false;
        continue;
      }

      const t = q[i] / p[i];
      if (p[i] < 0) {
        u1 = Math.max(u1, t);
      } else {
        u2 = Math.min(u2, t);
      }

      if (u1 > u2) return false;
    }

    return true;
  };

  const collectTextObstacles = (svg, viewBox) => {
    const viewport = {
      x: viewBox[0],
      y: viewBox[1],
      width: viewBox[2],
      height: viewBox[3],
    };

    return [...svg.querySelectorAll('text')]
      .filter((node) => !node.classList.contains('msc-atlas-map__region-callout-title'))
      .filter((node) => isVisible(node, svg))
      .map((node) => getRootBBox(node, svg))
      .filter(Boolean)
      .filter((box) => boxesIntersect(box, viewport));
  };

  const sampleRegionGeometry = (shape, svg) => {
    const d = getRenderedPathData(shape);
    if (!d) return null;

    const probe = document.createElementNS(SVG_NS, 'path');
    probe.setAttribute('d', d);
    probe.setAttribute('fill', 'none');
    probe.setAttribute('stroke', 'none');
    probe.setAttribute('pointer-events', 'none');
    probe.setAttribute('aria-hidden', 'true');
    svg.appendChild(probe);

    let points = [];

    try {
      const length = probe.getTotalLength();
      const samples = 260;
      points = Array.from({ length: samples + 1 }, (_, index) => {
        const point = probe.getPointAtLength((length * index) / samples);
        return { x: point.x, y: point.y };
      });
    } catch (error) {
      points = [];
    }

    probe.remove();
    if (!points.length) return null;

    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const bounds = {
      x: Math.min(...xs),
      y: Math.min(...ys),
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
    };

    return {
      points,
      bounds,
      center: {
        x: bounds.x + (bounds.width / 2),
        y: bounds.y + (bounds.height / 2),
      },
    };
  };

  const resolveSide = (geometry, viewBox, layout) => {
    if (layout.reviewedSide) return layout.reviewedSide;

    const viewCenterX = viewBox[0] + (viewBox[2] / 2);
    const deadband = viewBox[2] * 0.06;

    if (geometry.center.x > viewCenterX + deadband) return 'left';
    if (geometry.center.x < viewCenterX - deadband) return 'right';
    return layout.fallbackSide;
  };

  const resolvePreferredRatio = (geometry, viewBox, layout) => {
    if (Number.isFinite(layout.reviewedY)) return layout.reviewedY;

    const regionRatio = (geometry.center.y - viewBox[1]) / viewBox[3];
    return clamp(regionRatio + (layout.yBias || 0), 0.20, 0.80);
  };

  const resolveTextRatio = (side, layout) => {
    if (Number.isFinite(layout.reviewedX)) return layout.reviewedX;
    return side === 'left' ? 0.055 : 0.945;
  };

  /*
   * Find the horizontal lane where the leader reaches the region hit geometry.
   * If the lane does not actually intersect the region it is rejected instead
   * of producing a detached line.
   */
  const findHorizontalRegionEdge = (geometry, side, targetY) => {
    const intersections = [];
    const maxSegment = Math.max(geometry.bounds.width, geometry.bounds.height) * 0.34;

    for (let index = 1; index < geometry.points.length; index += 1) {
      const a = geometry.points[index - 1];
      const b = geometry.points[index];
      if (Math.hypot(b.x - a.x, b.y - a.y) > maxSegment) continue;
      if (a.y === b.y) continue;

      const minY = Math.min(a.y, b.y);
      const maxY = Math.max(a.y, b.y);
      if (targetY < minY || targetY > maxY) continue;

      const amount = (targetY - a.y) / (b.y - a.y);
      if (amount < 0 || amount > 1) continue;
      intersections.push(a.x + ((b.x - a.x) * amount));
    }

    if (!intersections.length) return null;

    return {
      x: side === 'left' ? Math.min(...intersections) : Math.max(...intersections),
      y: targetY,
    };
  };

  const insetHorizontalPoint = (edge, side, amount) => ({
    x: edge.x + (side === 'left' ? amount : -amount),
    y: edge.y,
  });

  const candidateRatios = (preferred, reviewed) => {
    if (reviewed) return [Number(preferred.toFixed(3))];

    const offsets = [0, -0.06, 0.06, -0.12, 0.12, -0.18, 0.18, -0.24, 0.24, -0.30, 0.30, -0.36, 0.36];
    const values = offsets.map((offset) => clamp(preferred + offset, 0.12, 0.88));
    return [...new Set(values.map((value) => Number(value.toFixed(3))))];
  };

  document.querySelectorAll('[data-atlas]').forEach((atlas) => {
    const svg = atlas.querySelector('[data-atlas-map]');
    const navTargets = [...atlas.querySelectorAll('[data-atlas-target]')];
    const routeRegistry = document.querySelector('[data-atlas-callout-routes]');
    if (!svg || !navTargets.length || !routeRegistry) return;

    const routeBySlug = new Map(
      Object.keys(REGION_LAYOUT).map((slug) => [
        slug,
        routeRegistry.getAttribute(`data-atlas-route-${slug}`) || '',
      ])
    );

    const labelBySlug = new Map(
      navTargets.map((target) => [
        target.dataset.atlasTarget,
        target.querySelector('strong')?.textContent?.trim() || target.dataset.atlasTarget,
      ])
    );

    const callout = document.createElementNS(SVG_NS, 'g');
    callout.classList.add('msc-atlas-map__region-callout');
    callout.setAttribute('aria-hidden', 'true');

    const leader = document.createElementNS(SVG_NS, 'line');
    leader.classList.add('msc-atlas-map__region-callout-line');
    leader.setAttribute('vector-effect', 'non-scaling-stroke');
    leader.setAttribute('pointer-events', 'none');

    const link = document.createElementNS(SVG_NS, 'a');
    link.classList.add('msc-atlas-map__region-callout-link');

    const hit = document.createElementNS(SVG_NS, 'rect');
    hit.classList.add('msc-atlas-map__region-callout-hit');
    hit.setAttribute('fill', 'transparent');

    const title = document.createElementNS(SVG_NS, 'text');
    title.classList.add('msc-atlas-map__region-callout-title');
    title.setAttribute('dominant-baseline', 'middle');

    link.append(hit, title);
    callout.append(leader, link);
    svg.appendChild(callout);

    let renderVersion = 0;
    let renderTimer = null;
    let settleTimer = null;

    const hideCallout = () => {
      callout.classList.remove('is-visible');
      callout.setAttribute('aria-hidden', 'true');
    };

    const setRoute = (slug, label) => {
      const route = routeBySlug.get(slug) || '';
      link.classList.toggle('is-disabled', !route);

      if (route) {
        link.setAttribute('href', route);
        link.setAttributeNS(XLINK_NS, 'xlink:href', route);
        link.removeAttribute('aria-disabled');
        link.removeAttribute('tabindex');
        link.setAttribute('aria-label', `Open ${label} Explore directory`);
      } else {
        link.removeAttribute('href');
        link.removeAttributeNS(XLINK_NS, 'href');
        link.setAttribute('aria-disabled', 'true');
        link.setAttribute('tabindex', '-1');
        link.setAttribute('aria-label', `${label} Explore directory not published yet`);
      }
    };

    const applyCandidate = (candidate) => {
      title.setAttribute('x', String(candidate.textX));
      title.setAttribute('y', String(candidate.textY));
      title.setAttribute('text-anchor', candidate.textAnchor);

      leader.setAttribute('x1', String(candidate.lineStart.x));
      leader.setAttribute('y1', String(candidate.lineStart.y));
      leader.setAttribute('x2', String(candidate.lineEnd.x));
      leader.setAttribute('y2', String(candidate.lineEnd.y));

      hit.setAttribute('x', String(candidate.hit.x));
      hit.setAttribute('y', String(candidate.hit.y));
      hit.setAttribute('width', String(candidate.hit.width));
      hit.setAttribute('height', String(candidate.hit.height));
    };

    const positionCallout = (slug) => {
      const layout = REGION_LAYOUT[slug];
      const region = atlas.querySelector(`[data-atlas-region-shape="${slug}"]`);
      const shape = region?.querySelector(
        '.msc-atlas-map__region-shape:not(.msc-atlas-map__region-shape--inner)'
      );
      const viewBox = parseBox(svg.getAttribute('viewBox'));
      const label = labelBySlug.get(slug) || region?.dataset.atlasRegionLabel || slug.toUpperCase();

      if (!layout || !shape || viewBox.length !== 4) {
        hideCallout();
        return;
      }

      const geometry = sampleRegionGeometry(shape, svg);
      if (!geometry) {
        hideCallout();
        return;
      }

      title.textContent = label;
      setRoute(slug, label);

      const side = resolveSide(geometry, viewBox, layout);
      const reviewed = Boolean(layout.reviewedSide);
      const preferredRatio = resolvePreferredRatio(geometry, viewBox, layout);
      const textRatio = resolveTextRatio(side, layout);
      const textX = viewBox[0] + (viewBox[2] * textRatio);
      const textAnchor = side === 'left' ? 'start' : 'end';
      const obstacles = collectTextObstacles(svg, viewBox);
      let best = null;

      candidateRatios(preferredRatio, reviewed).forEach((ratio) => {
        const textY = viewBox[1] + (viewBox[3] * ratio);
        title.setAttribute('x', String(textX));
        title.setAttribute('y', String(textY));
        title.setAttribute('text-anchor', textAnchor);

        const titleBox = getRootBBox(title, svg);
        if (!titleBox) return;

        const leaderY = titleBox.y + (titleBox.height * 0.54);
        const edge = findHorizontalRegionEdge(geometry, side, leaderY);
        if (!edge) return;

        const lineEnd = insetHorizontalPoint(
          edge,
          side,
          Math.max(12, viewBox[2] * 0.018)
        );
        const lineStart = {
          x: side === 'left'
            ? titleBox.x + titleBox.width + (viewBox[2] * 0.018)
            : titleBox.x - (viewBox[2] * 0.018),
          y: lineEnd.y,
        };

        const paddedTitle = expandBox(titleBox, Math.max(8, viewBox[2] * 0.012));
        const hitBox = expandBox(titleBox, Math.max(6, viewBox[2] * 0.010));
        const textCollisions = obstacles.filter((box) => (
          boxesIntersect(paddedTitle, expandBox(box, 5))
        )).length;
        const lineCollisions = obstacles.filter((box) => (
          segmentIntersectsBox(
            lineStart.x,
            lineStart.y,
            lineEnd.x,
            lineEnd.y,
            expandBox(box, Math.max(6, viewBox[2] * 0.009))
          )
        )).length;
        const lineLength = Math.abs(lineEnd.x - lineStart.x);
        const minLeaderRatio = reviewed ? 0.035 : 0.07;
        const tooShort = lineLength < (viewBox[2] * minLeaderRatio);

        /* Never knowingly run the title or leader through another map label. */
        if (textCollisions || lineCollisions || tooShort) return;

        const candidate = {
          score: Math.abs(ratio - preferredRatio),
          textX,
          textY,
          textAnchor,
          lineStart,
          lineEnd,
          hit: hitBox,
        };

        if (!best || candidate.score < best.score) best = candidate;
      });

      if (!best) {
        hideCallout();
        return;
      }

      applyCandidate(best);
      callout.dataset.atlasCalloutRegion = slug;
      callout.dataset.atlasCalloutSide = side;
      callout.dataset.atlasCalloutPlacement = reviewed ? 'reviewed' : 'automatic';
      callout.classList.add('is-visible');
      callout.setAttribute('aria-hidden', 'false');
    };

    const scheduleCallout = () => {
      renderVersion += 1;
      const version = renderVersion;
      if (renderTimer) window.clearTimeout(renderTimer);
      if (settleTimer) window.clearTimeout(settleTimer);
      hideCallout();

      const slug = atlas.dataset.atlasActive || '';
      const mode = atlas.dataset.atlasMode || '';
      if (!slug || !ACTIVE_MODES.has(mode) || !REGION_LAYOUT[slug]) return;

      const renderIfCurrent = () => {
        if (version !== renderVersion) return;
        if (atlas.dataset.atlasActive !== slug) return;
        if (!ACTIVE_MODES.has(atlas.dataset.atlasMode || '')) return;
        positionCallout(slug);
      };

      /* Show the title during the zoom instead of waiting for the 420ms camera
       * animation to finish, then settle it once more against the final viewBox. */
      renderTimer = window.setTimeout(renderIfCurrent, reduceMotion ? 0 : 90);
      if (!reduceMotion) {
        settleTimer = window.setTimeout(renderIfCurrent, 455);
      }
    };

    const observer = new MutationObserver(scheduleCallout);
    observer.observe(atlas, {
      attributes: true,
      attributeFilter: ['data-atlas-active', 'data-atlas-mode'],
    });

    link.addEventListener('click', (event) => {
      if (link.classList.contains('is-disabled')) {
        event.preventDefault();
        return;
      }
      event.stopPropagation();
    });

    window.addEventListener('resize', () => {
      if (ACTIVE_MODES.has(atlas.dataset.atlasMode || '')) scheduleCallout();
    }, { passive: true });

    scheduleCallout();
  });
})();
