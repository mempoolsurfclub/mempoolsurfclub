(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const XLINK_NS = 'http://www.w3.org/1999/xlink';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /*
   * Region title composition is intentionally per-region. Regions on the
   * western half of the chart read from the right; eastern regions read from
   * the left. The preferred vertical position is only a starting point: the
   * collision pass moves the title/leader when destination typography occupies
   * that lane so the leader never intentionally crosses Atlas text.
   */
  const PLACEMENT = Object.freeze({
    mining: { side: 'right', y: 0.78 },
    ordinals: { side: 'right', y: 0.78 },
    runes: { side: 'right', y: 0.24 },
    wallets: { side: 'left', y: 0.68 },
    marketplaces: { side: 'left', y: 0.30 },
    payments: { side: 'left', y: 0.24 },
    exchanges: { side: 'left', y: 0.24 },
    network: { side: 'left', y: 0.24 },
  });

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
      /* The source d remains a safe fallback. */
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
      const samples = 220;
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

  const findRegionEdge = (geometry, side, targetY, viewBox) => {
    const verticalTolerance = Math.max(22, viewBox[3] * 0.11);
    let candidates = geometry.points.filter(
      (point) => Math.abs(point.y - targetY) <= verticalTolerance
    );

    if (!candidates.length) candidates = geometry.points;

    const edgeX = side === 'left'
      ? geometry.bounds.x
      : geometry.bounds.x + geometry.bounds.width;

    return candidates.reduce((best, point) => {
      const verticalPenalty = Math.abs(point.y - targetY) * 2.4;
      const edgePenalty = Math.abs(point.x - edgeX) * 0.75;
      const score = verticalPenalty + edgePenalty;
      return !best || score < best.score ? { point, score } : best;
    }, null)?.point || null;
  };

  const insetPoint = (edge, center, amount) => {
    const dx = center.x - edge.x;
    const dy = center.y - edge.y;
    const length = Math.hypot(dx, dy) || 1;

    return {
      x: edge.x + ((dx / length) * amount),
      y: edge.y + ((dy / length) * amount),
    };
  };

  const candidateRatios = (preferred) => {
    const offsets = [0, -0.12, 0.12, -0.22, 0.22, -0.31, 0.31];
    const values = offsets.map((offset) => clamp(preferred + offset, 0.16, 0.84));
    return [...new Set(values.map((value) => Number(value.toFixed(3))))];
  };

  document.querySelectorAll('[data-atlas]').forEach((atlas) => {
    const svg = atlas.querySelector('[data-atlas-map]');
    const navTargets = [...atlas.querySelectorAll('[data-atlas-target]')];
    const routeRegistry = document.querySelector('[data-atlas-callout-routes]');
    if (!svg || !navTargets.length || !routeRegistry) return;

    const routeBySlug = new Map(
      Object.keys(PLACEMENT).map((slug) => [
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
      const placement = PLACEMENT[slug];
      const region = atlas.querySelector(`[data-atlas-region-shape="${slug}"]`);
      const shape = region?.querySelector(
        '.msc-atlas-map__region-shape:not(.msc-atlas-map__region-shape--inner)'
      );
      const viewBox = parseBox(svg.getAttribute('viewBox'));
      const label = labelBySlug.get(slug) || region?.dataset.atlasRegionLabel || slug.toUpperCase();

      if (!placement || !shape || viewBox.length !== 4) {
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

      const textX = placement.side === 'left'
        ? viewBox[0] + (viewBox[2] * 0.055)
        : viewBox[0] + (viewBox[2] * 0.945);
      const textAnchor = placement.side === 'left' ? 'start' : 'end';
      const obstacles = collectTextObstacles(svg, viewBox);
      let best = null;

      candidateRatios(placement.y).forEach((ratio, index) => {
        const textY = viewBox[1] + (viewBox[3] * ratio);
        title.setAttribute('x', String(textX));
        title.setAttribute('y', String(textY));
        title.setAttribute('text-anchor', textAnchor);

        const titleBox = getRootBBox(title, svg);
        if (!titleBox) return;

        const edge = findRegionEdge(geometry, placement.side, titleBox.y + (titleBox.height / 2), viewBox);
        if (!edge) return;

        const lineEnd = insetPoint(edge, geometry.center, Math.max(12, viewBox[2] * 0.018));
        const lineStart = {
          x: placement.side === 'left'
            ? titleBox.x + titleBox.width + (viewBox[2] * 0.018)
            : titleBox.x - (viewBox[2] * 0.018),
          y: titleBox.y + (titleBox.height * 0.54),
        };

        const paddedTitle = expandBox(titleBox, Math.max(8, viewBox[2] * 0.012));
        const hitBox = expandBox(titleBox, Math.max(6, viewBox[2] * 0.010));
        const textCollisions = obstacles.filter((box) => boxesIntersect(paddedTitle, expandBox(box, 5))).length;
        const lineCollisions = obstacles.filter((box) => (
          segmentIntersectsBox(
            lineStart.x,
            lineStart.y,
            lineEnd.x,
            lineEnd.y,
            expandBox(box, Math.max(6, viewBox[2] * 0.009))
          )
        )).length;
        const lineLength = Math.hypot(lineEnd.x - lineStart.x, lineEnd.y - lineStart.y);
        const tooShort = lineLength < (viewBox[2] * 0.07) ? 1 : 0;
        const score = (textCollisions * 100) + (lineCollisions * 40) + (tooShort * 20) + index;

        const candidate = {
          score,
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
      callout.dataset.atlasCalloutSide = placement.side;
      callout.classList.add('is-visible');
      callout.setAttribute('aria-hidden', 'false');
    };

    const scheduleCallout = () => {
      renderVersion += 1;
      const version = renderVersion;
      if (renderTimer) window.clearTimeout(renderTimer);
      hideCallout();

      const slug = atlas.dataset.atlasActive || '';
      const mode = atlas.dataset.atlasMode || '';
      if (!slug || mode !== 'locked' || !PLACEMENT[slug]) return;

      renderTimer = window.setTimeout(() => {
        if (version !== renderVersion) return;
        if (atlas.dataset.atlasActive !== slug || atlas.dataset.atlasMode !== 'locked') return;
        positionCallout(slug);
      }, reduceMotion ? 0 : 455);
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
      if (atlas.dataset.atlasMode === 'locked') scheduleCallout();
    }, { passive: true });

    scheduleCallout();
  });
})();
