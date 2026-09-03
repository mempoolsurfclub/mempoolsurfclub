(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const XLINK_NS = 'http://www.w3.org/1999/xlink';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /*
   * Final screenshot-reviewed placements are viewport-safe ratios. The title is
   * never rejected because a leader cannot be drawn. Leader routing is handled
   * independently and searches nearby clean lanes without moving the title.
   */
  const REGION_LAYOUT = Object.freeze({
    mining: { fallbackSide: 'right', yBias: 0.04 },
    ordinals: { reviewed: true, side: 'right', x: 0.80, y: 0.44 },
    runes: { fallbackSide: 'right', yBias: -0.03 },
    wallets: { reviewed: true, side: 'left', x: 0.18, y: 0.46 },
    marketplaces: { reviewed: true, side: 'right', x: 0.94, y: 0.46 },
    payments: { fallbackSide: 'left', yBias: -0.02 },
    exchanges: { reviewed: true, side: 'right', x: 0.94, y: 0.54 },
    network: { reviewed: true, side: 'left', x: 0.08, y: 0.52 },
  });

  const ACTIVE_MODES = new Set(['preview', 'locked']);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const parseBox = (value) => String(value || '')
    .trim()
    .split(/\s+/)
    .map(Number)
    .filter(Number.isFinite);

  const getRenderedPathData = (path) => {
    if (!path) return '';
    try {
      const cssPath = window.getComputedStyle(path).getPropertyValue('d').trim();
      const match = cssPath.match(/^path\((['"]?)(.*)\1\)$/);
      if (match?.[2]) return match[2];
    } catch (error) {
      /* Fall through to the source path. */
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
      return new DOMPoint(x, y).matrixTransform(rootMatrix.inverse().multiply(nodeMatrix));
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

    for (let index = 0; index < 4; index += 1) {
      if (p[index] === 0) {
        if (q[index] < 0) return false;
        continue;
      }
      const t = q[index] / p[index];
      if (p[index] < 0) u1 = Math.max(u1, t);
      else u2 = Math.min(u2, t);
      if (u1 > u2) return false;
    }
    return true;
  };

  const collectTextObstacles = (svg, viewBox) => {
    const viewport = { x: viewBox[0], y: viewBox[1], width: viewBox[2], height: viewBox[3] };
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
    svg.appendChild(probe);

    let points = [];
    try {
      const length = probe.getTotalLength();
      const samples = 280;
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
      center: { x: bounds.x + (bounds.width / 2), y: bounds.y + (bounds.height / 2) },
    };
  };

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
    return { x: side === 'left' ? Math.min(...intersections) : Math.max(...intersections), y: targetY };
  };

  const resolveAutomaticSide = (geometry, viewBox, fallbackSide) => {
    const viewCenterX = viewBox[0] + (viewBox[2] / 2);
    const deadband = viewBox[2] * 0.06;
    if (geometry.center.x > viewCenterX + deadband) return 'left';
    if (geometry.center.x < viewCenterX - deadband) return 'right';
    return fallbackSide;
  };

  const clampTitleIntoViewport = (title, svg, viewBox) => {
    let box = getRootBBox(title, svg);
    if (!box) return null;

    const marginX = viewBox[2] * 0.028;
    const marginY = viewBox[3] * 0.055;
    const minX = viewBox[0] + marginX;
    const maxX = viewBox[0] + viewBox[2] - marginX;
    const minY = viewBox[1] + marginY;
    const maxY = viewBox[1] + viewBox[3] - marginY;
    let dx = 0;
    let dy = 0;

    if (box.x < minX) dx += minX - box.x;
    if (box.x + box.width > maxX) dx -= (box.x + box.width) - maxX;
    if (box.y < minY) dy += minY - box.y;
    if (box.y + box.height > maxY) dy -= (box.y + box.height) - maxY;

    if (dx || dy) {
      title.setAttribute('x', String(Number(title.getAttribute('x')) + dx));
      title.setAttribute('y', String(Number(title.getAttribute('y')) + dy));
      box = getRootBBox(title, svg);
    }
    return box;
  };

  const segmentClear = (start, end, obstacles, padding) => !obstacles.some((box) => (
    segmentIntersectsBox(start.x, start.y, end.x, end.y, expandBox(box, padding))
  ));

  const routeLeader = ({ geometry, side, titleBox, viewBox, obstacles }) => {
    if (!geometry || !titleBox) return null;

    const titleY = titleBox.y + (titleBox.height * 0.54);
    const gap = Math.max(10, viewBox[2] * 0.014);
    const inset = Math.max(10, viewBox[2] * 0.014);
    const direction = side === 'left' ? 1 : -1;
    const start = {
      x: side === 'left' ? titleBox.x + titleBox.width + gap : titleBox.x - gap,
      y: titleY,
    };
    const laneOffsets = [0, -0.035, 0.035, -0.07, 0.07, -0.105, 0.105, -0.14, 0.14];
    const obstaclePadding = Math.max(5, viewBox[2] * 0.007);

    for (const ratioOffset of laneOffsets) {
      const laneY = titleY + (viewBox[3] * ratioOffset);
      if (laneY < viewBox[1] + (viewBox[3] * 0.08)) continue;
      if (laneY > viewBox[1] + (viewBox[3] * 0.92)) continue;

      const edge = findHorizontalRegionEdge(geometry, side, laneY);
      if (!edge) continue;
      const end = { x: edge.x + (side === 'left' ? inset : -inset), y: laneY };

      if (ratioOffset === 0) {
        if (!segmentClear(start, end, obstacles, obstaclePadding)) continue;
        if (Math.abs(end.x - start.x) < viewBox[2] * 0.025) continue;
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
      }

      const elbow = {
        x: start.x + (direction * Math.max(18, viewBox[2] * 0.028)),
        y: start.y,
      };
      const laneStart = { x: elbow.x, y: laneY };
      const reachesRegion = side === 'left' ? end.x > elbow.x : end.x < elbow.x;
      if (!reachesRegion) continue;
      if (!segmentClear(start, elbow, obstacles, obstaclePadding)) continue;
      if (!segmentClear(elbow, laneStart, obstacles, obstaclePadding)) continue;
      if (!segmentClear(laneStart, end, obstacles, obstaclePadding)) continue;
      return `M ${start.x} ${start.y} H ${elbow.x} V ${laneY} H ${end.x}`;
    }

    return null;
  };

  document.querySelectorAll('[data-atlas]').forEach((atlas) => {
    const svg = atlas.querySelector('[data-atlas-map]');
    const navTargets = [...atlas.querySelectorAll('[data-atlas-target]')];
    const routeRegistry = document.querySelector('[data-atlas-callout-routes]');
    if (!svg || !navTargets.length || !routeRegistry) return;

    const routeBySlug = new Map(Object.keys(REGION_LAYOUT).map((slug) => [
      slug,
      routeRegistry.getAttribute(`data-atlas-route-${slug}`) || '',
    ]));
    const labelBySlug = new Map(navTargets.map((target) => [
      target.dataset.atlasTarget,
      target.querySelector('strong')?.textContent?.trim() || target.dataset.atlasTarget,
    ]));

    const callout = document.createElementNS(SVG_NS, 'g');
    callout.classList.add('msc-atlas-map__region-callout');
    callout.setAttribute('aria-hidden', 'true');

    const leader = document.createElementNS(SVG_NS, 'path');
    leader.classList.add('msc-atlas-map__region-callout-line');
    leader.setAttribute('fill', 'none');
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

    const positionCallout = (slug) => {
      const layout = REGION_LAYOUT[slug];
      const viewBox = parseBox(svg.getAttribute('viewBox'));
      const region = atlas.querySelector(`[data-atlas-region-shape="${slug}"]`);
      const shape = region?.querySelector('.msc-atlas-map__region-shape:not(.msc-atlas-map__region-shape--inner)');
      if (!layout || viewBox.length !== 4) {
        hideCallout();
        return;
      }

      const geometry = shape ? sampleRegionGeometry(shape, svg) : null;
      const label = labelBySlug.get(slug) || region?.dataset.atlasRegionLabel || slug.toUpperCase();
      let side;
      let xRatio;
      let yRatio;

      if (layout.reviewed) {
        side = layout.side;
        xRatio = layout.x;
        yRatio = layout.y;
      } else {
        if (!geometry) {
          hideCallout();
          return;
        }
        side = resolveAutomaticSide(geometry, viewBox, layout.fallbackSide);
        xRatio = side === 'left' ? 0.065 : 0.935;
        const regionRatio = (geometry.center.y - viewBox[1]) / viewBox[3];
        yRatio = clamp(regionRatio + (layout.yBias || 0), 0.18, 0.82);
      }

      title.textContent = label;
      setRoute(slug, label);
      title.setAttribute('text-anchor', side === 'left' ? 'start' : 'end');
      title.setAttribute('x', String(viewBox[0] + (viewBox[2] * xRatio)));
      title.setAttribute('y', String(viewBox[1] + (viewBox[3] * yRatio)));

      const titleBox = clampTitleIntoViewport(title, svg, viewBox);
      if (!titleBox) {
        hideCallout();
        return;
      }

      const hitBox = expandBox(titleBox, Math.max(6, viewBox[2] * 0.010));
      hit.setAttribute('x', String(hitBox.x));
      hit.setAttribute('y', String(hitBox.y));
      hit.setAttribute('width', String(hitBox.width));
      hit.setAttribute('height', String(hitBox.height));

      const obstacles = collectTextObstacles(svg, viewBox);
      const leaderPath = routeLeader({ geometry, side, titleBox, viewBox, obstacles });
      if (leaderPath) {
        leader.setAttribute('d', leaderPath);
        leader.style.display = '';
      } else {
        leader.removeAttribute('d');
        leader.style.display = 'none';
      }

      callout.dataset.atlasCalloutRegion = slug;
      callout.dataset.atlasCalloutSide = side;
      callout.dataset.atlasCalloutPlacement = layout.reviewed ? 'reviewed-screen' : 'automatic';
      callout.dataset.atlasLeader = leaderPath ? 'visible' : 'suppressed';
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

      renderTimer = window.setTimeout(renderIfCurrent, reduceMotion ? 0 : 80);
      if (!reduceMotion) settleTimer = window.setTimeout(renderIfCurrent, 460);
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
