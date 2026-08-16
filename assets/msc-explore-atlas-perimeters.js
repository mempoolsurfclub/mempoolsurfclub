(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const SOURCE_STEP = 1.5;
  const REFERENCE_STEP = 1.5;
  const COAST_THRESHOLD = 7;
  const BOUNDARY_THRESHOLD = 5.5;
  const MIN_INTERVAL = 3;
  const MERGE_GAP = 4;
  const GRID_SIZE = 10;

  /* These traces are selection guides only. They are never rendered. Their sole
     purpose is to identify which portions of the already-rendered Atlas coast
     and shared-border paths belong to each selected region. */
  const REFERENCE_TRACES = {
    ordinals: 'M 75.4 64.4 L 72.2 42.2 L 66.2 21.8 L 61.1 -8.6 L 51.0 -26.5 L 49.1 -32.7 L 48.7 -49.0 L 50.4 -50.8 L 48.4 -52.1 L 46.9 -50.7 L 4.7 -49.9 L -5.3 -66.7 L -8.7 -78.4 L -19.4 -77.5 L -33.4 -72.9 L -47.6 -71.1 L -60.5 -67.4 L -83.6 -57.2 L -103.1 -39.5 L -104.5 -35.7 L -104.1 -19.6 L -103.0 -18.0 L -64.8 -16.2 L -59.9 -14.2 L -68.8 0.9 L -86.3 -4.6 L -115.7 -6.9 L -139.4 -13.4 L -181.0 -5.5 L -188.8 0.0 L -194.5 6.7 L -197.3 28.4 L -192.0 34.6 L -180.5 40.6 L -158.7 39.7 L -139.2 30.0 L -120.6 30.0 L -117.6 31.0 L -97.4 50.3 L -89.1 55.8 L -64.8 57.2 L -43.4 61.8 L -35.0 62.3 L -11.0 50.7 L 3.2 40.6 L 8.1 39.7 L 33.7 54.0 L 45.7 55.4 L 48.7 58.9 L 49.6 68.1 L 51.7 70.1 Z',
    runes: 'M -122.6 -48.0 L -120.9 -46.2 L -119.1 -24.7 L -101.5 0.8 L -102.0 5.7 L -109.4 27.0 L -109.8 38.1 L -106.1 44.6 L -97.0 52.7 L -92.8 58.9 L -92.3 76.0 L -84.7 80.7 L -72.7 84.9 L -52.4 89.5 L -49.6 89.1 L -39.5 79.0 L -32.4 74.7 L -12.8 76.6 L -5.3 79.0 L 4.0 84.9 L 5.1 83.3 L 3.2 76.8 L -6.0 58.8 L -9.7 54.6 L -6.4 47.3 L -3.1 43.9 L 2.3 42.4 L 18.7 42.9 L 34.4 39.7 L 35.1 33.0 L 31.4 23.6 L 33.1 21.7 L 55.0 22.6 L 67.1 25.8 L 84.7 24.0 L 94.2 -3.4 L 98.9 -10.0 L 127.3 -18.5 L 150.7 -19.9 L 152.7 -23.7 L 154.6 -45.5 L 153.0 -46.6 L 144.4 -46.1 L 133.2 -49.4 L 99.5 -54.9 L 75.2 -54.9 L 46.4 -58.1 L -1.6 -55.8 L -21.0 -53.5 L -40.2 -49.4 L -59.6 -49.8 L -75.0 -54.4 L -101.3 -54.4 L -112.0 -48.0 Z',
    wallets: 'M -93.0 -53.3 L -89.3 -40.8 L -84.7 -33.4 L -59.9 -9.5 L -48.7 7.2 L -29.4 30.7 L -21.4 44.1 L -13.9 51.7 L 27.0 52.1 L 39.2 54.9 L 49.4 54.4 L 51.4 51.0 L 51.4 44.5 L 48.8 34.8 L 50.8 32.8 L 60.5 29.5 L 75.7 19.4 L 87.9 9.0 L 89.6 -6.0 L 65.7 -6.0 L 58.2 -8.8 L 55.6 -11.4 L 51.7 -26.7 L 34.7 -31.9 L 23.1 -38.3 L 6.5 -44.3 L 4.8 -46.1 L 4.8 -52.4 L 2.3 -54.9 L -14.0 -52.6 L -29.4 -53.1 L -41.4 -54.9 L -68.7 -62.7 L -78.5 -62.7 L -83.1 -60.9 L -90.9 -51.8 Z',
    marketplaces: 'M -161.3 -25.6 L -157.6 -16.7 L -158.1 -12.7 L -141.3 -0.9 L -120.0 4.6 L -98.4 6.5 L -74.3 16.1 L -23.7 17.1 L -6.5 20.3 L 8.3 20.3 L 23.7 17.5 L 35.0 17.6 L 38.1 21.0 L 38.6 27.0 L 40.1 29.5 L 58.5 32.8 L 63.4 36.2 L 63.5 45.8 L 58.4 53.8 L 66.0 59.1 L 78.2 59.8 L 73.1 49.9 L 74.8 45.7 L 97.1 38.3 L 108.0 37.8 L 109.1 35.8 L 110.5 22.8 L 94.6 12.0 L 83.6 8.8 L 81.1 6.8 L 75.4 -16.4 L 73.4 -18.9 L 55.5 -24.0 L 39.7 -30.9 L 13.4 -28.1 L -10.3 -20.3 L -42.8 -20.8 L -52.4 -34.4 L -63.2 -43.4 L -84.0 -48.9 L -89.7 -53.3 L -89.7 -54.8 L -81.7 -61.3 L -59.4 -71.6 L -7.2 -71.7 L -29.5 -93.2 L -53.9 -93.2 L -61.9 -96.1 L -65.3 -101.3 L -64.8 -93.6 L -66.5 -91.9 L -72.8 -91.8 L -81.3 -94.1 L -85.6 -80.1 L -87.7 -78.1 L -99.3 -76.6 L -110.5 -72.7 L -113.3 -67.2 L -115.2 -49.7 L -118.0 -42.7 L -120.4 -40.2 L -136.2 -32.3 L -150.6 -28.1 L -160.2 -27.2 Z',
    mining: 'M -14.1 -61.4 L -3.9 -46.2 L -5.8 -42.5 L -34.8 -42.0 L -55.2 -46.2 L -76.4 -46.2 L -111.5 -42.0 L -132.7 -41.5 L -143.8 -31.4 L -154.4 -16.6 L -175.6 -16.6 L -176.5 -14.3 L -170.1 -5.1 L -165.9 4.6 L -165.9 17.1 L -180.2 36.0 L -194.5 48.5 L -185.3 49.8 L -170.1 45.2 L -165.9 45.2 L -156.7 48.5 L -151.2 54.0 L -140.5 58.6 L -126.7 58.6 L -117.9 56.8 L -105.9 78.0 L -89.3 77.5 L -78.2 73.8 L -16.4 73.8 L 0.2 75.2 L 11.3 78.9 L 24.2 78.9 L 37.6 74.8 L 53.8 74.3 L 64.4 76.6 L 75.5 81.2 L 103.2 82.2 L 135.0 90.0 L 139.6 90.0 L 141.5 88.6 L 151.2 68.8 L 157.2 48.0 L 161.8 47.1 L 162.2 42.9 L 154.4 33.7 L 147.0 29.5 L 138.2 21.7 L 127.2 7.8 L 123.9 -2.8 L 115.2 -14.3 L 98.1 -29.5 L 71.8 -58.6 L 60.7 -64.6 L 46.8 -78.9 L 35.3 -77.5 L 22.8 -73.4 L -3.0 -69.7 L -15.9 -64.6 Z',
    payments: 'M -98.6 -98.6 L -107.3 -67.6 L -108.2 -58.4 L -99.7 -53.1 L -85.1 -52.2 L -78.3 -49.7 L -76.4 -47.6 L -76.9 -28.8 L -99.0 -18.9 L -116.2 -18.9 L -135.3 -25.4 L -144.6 -10.1 L -160.2 -13.4 L -171.0 -10.1 L -193.4 -11.5 L -198.5 -10.1 L -201.4 -7.2 L -207.9 14.5 L -208.4 37.6 L -204.5 42.4 L -198.5 45.7 L -185.7 47.1 L -165.7 53.5 L -146.4 55.8 L -125.6 61.4 L -103.4 74.7 L -80.4 81.7 L -69.7 86.8 L -35.6 114.0 L -13.0 123.7 L 1.0 122.3 L 7.6 117.0 L 34.5 81.4 L 50.1 68.1 L 78.7 31.6 L 97.6 2.6 L 105.9 -29.3 L 116.1 -47.7 L 119.3 -60.2 L 118.8 -68.6 L 116.8 -70.1 L 90.2 -69.7 L 81.8 -71.1 L 61.4 -78.0 L 53.3 -78.0 L 42.6 -80.3 L 14.8 -90.4 L 2.3 -93.2 L -8.7 -92.8 L -18.4 -95.6 L -26.7 -100.6 L -34.1 -102.9 L -44.8 -102.9 L -56.4 -96.9 L -72.6 -93.7 L -96.3 -96.0 Z',
    exchanges: 'M -145.1 72.0 L -121.4 71.1 L -107.5 67.8 L -101.0 64.6 L -93.5 63.7 L -45.9 64.1 L -39.1 67.5 L -29.3 82.0 L -21.7 87.7 L 26.1 52.4 L 28.8 48.3 L 31.6 32.6 L 35.0 29.2 L 42.5 25.8 L 55.4 16.6 L 70.4 11.5 L 69.9 3.9 L 58.4 -17.9 L 57.3 -29.1 L 40.8 -30.9 L 21.7 -35.1 L 3.7 -48.9 L -9.6 -53.6 L -11.7 -55.6 L -11.8 -71.1 L -10.1 -72.9 L 8.3 -69.7 L 21.7 -69.3 L 23.3 -70.8 L 22.4 -75.5 L 18.0 -81.7 L 1.9 -85.4 L -1.6 -88.3 L -2.1 -94.2 L 0.5 -102.4 L -17.9 -102.9 L -28.4 -111.4 L -28.0 -108.2 L -43.7 -82.8 L -54.7 -68.6 L -65.3 -46.4 L -74.5 -32.1 L -110.1 38.1 L -124.1 53.0 L -136.2 60.0 Z',
    network: 'M -166.4 33.0 L -164.3 34.1 L -150.4 30.9 L -137.5 24.5 L -123.1 19.8 L -104.4 18.9 L -64.2 36.5 L -32.3 59.1 L -22.6 63.2 L -17.3 58.0 L -13.1 49.5 L -8.8 45.8 L 3.3 40.2 L 22.3 34.6 L 42.2 31.8 L 53.1 31.8 L 63.4 26.3 L 85.4 32.7 L 94.2 33.7 L 122.0 26.3 L 144.3 25.4 L 176.8 41.6 L 192.4 52.6 L 213.1 55.8 L 227.3 60.3 L 225.9 49.6 L 218.5 27.3 L 217.6 14.0 L 216.0 10.2 L 193.9 9.7 L 168.0 -2.7 L 146.4 -7.4 L 123.7 -20.8 L 111.7 -32.7 L 96.5 -42.0 L 77.1 -46.6 L 65.1 -54.4 L 50.8 -60.4 L 35.3 -60.9 L 25.0 -63.2 L 18.5 -69.2 L 15.1 -67.4 L 4.6 -66.0 L -7.5 -60.0 L -22.6 -58.1 L -23.3 -54.7 L -17.9 -49.7 L -14.5 -43.8 L -16.5 -39.8 L -21.8 -37.4 L -74.3 -32.3 L -93.0 -23.1 L -98.6 -23.1 L -122.7 -31.4 L -156.7 -10.4 L -158.1 2.9 L -163.6 18.2 Z'
  };

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
      /* Keep the untransformed center as a safe fallback. */
    }
    return { x, y };
  };

  const parseCssPath = (value) => {
    const raw = String(value || '').trim();
    const match = raw.match(/^path\((['"]?)(.*)\1\)$/);
    return match?.[2] || '';
  };

  const getRenderedPathData = (path) => {
    if (!path) return '';
    try {
      const computed = parseCssPath(window.getComputedStyle(path).getPropertyValue('d'));
      if (computed) return computed;
    } catch (error) {
      /* Fall through to the source d. */
    }
    return path.getAttribute('d') || '';
  };

  const splitSubpaths = (pathData) => String(pathData || '')
    .trim()
    .split(/(?=[Mm])/)
    .map((part) => part.trim())
    .filter(Boolean);

  const transformPointToParent = (path, point) => {
    try {
      const transform = path.transform?.baseVal?.consolidate?.();
      const matrix = transform?.matrix;
      if (!matrix) return { x: point.x, y: point.y };
      return {
        x: (matrix.a * point.x) + (matrix.c * point.y) + matrix.e,
        y: (matrix.b * point.x) + (matrix.d * point.y) + matrix.f
      };
    } catch (error) {
      return { x: point.x, y: point.y };
    }
  };

  const samplePath = (path, step) => {
    let total = 0;
    try {
      total = path.getTotalLength();
    } catch (error) {
      return { total: 0, points: [] };
    }
    if (!Number.isFinite(total) || total <= 0) return { total: 0, points: [] };

    const count = Math.max(1, Math.ceil(total / step));
    const points = [];
    for (let index = 0; index <= count; index += 1) {
      const length = Math.min(total, index * step);
      const local = path.getPointAtLength(length);
      const point = transformPointToParent(path, local);
      points.push({ x: point.x, y: point.y, length });
    }
    return { total, points };
  };

  const buildGrid = (points) => {
    const grid = new Map();
    points.forEach((point) => {
      const cellX = Math.floor(point.x / GRID_SIZE);
      const cellY = Math.floor(point.y / GRID_SIZE);
      const key = `${cellX}:${cellY}`;
      const bucket = grid.get(key) || [];
      bucket.push(point);
      grid.set(key, bucket);
    });
    return grid;
  };

  const isNearReference = (point, grid, threshold) => {
    const radius = Math.ceil(threshold / GRID_SIZE);
    const cellX = Math.floor(point.x / GRID_SIZE);
    const cellY = Math.floor(point.y / GRID_SIZE);
    const maxDistanceSquared = threshold * threshold;

    for (let offsetX = -radius; offsetX <= radius; offsetX += 1) {
      for (let offsetY = -radius; offsetY <= radius; offsetY += 1) {
        const bucket = grid.get(`${cellX + offsetX}:${cellY + offsetY}`);
        if (!bucket) continue;
        for (const reference of bucket) {
          const dx = point.x - reference.x;
          const dy = point.y - reference.y;
          if ((dx * dx) + (dy * dy) <= maxDistanceSquared) return true;
        }
      }
    }
    return false;
  };

  const mergeIntervals = (intervals, total) => {
    if (!intervals.length) return [];
    const ordered = intervals
      .map(([start, end]) => [Math.max(0, start), Math.min(total, end)])
      .filter(([start, end]) => end > start)
      .sort((a, b) => a[0] - b[0]);

    const merged = [];
    ordered.forEach(([start, end]) => {
      const previous = merged[merged.length - 1];
      if (previous && start - previous[1] <= MERGE_GAP) {
        previous[1] = Math.max(previous[1], end);
      } else {
        merged.push([start, end]);
      }
    });
    return merged.filter(([start, end]) => end - start >= MIN_INTERVAL);
  };

  const findIntervals = (sourcePath, referenceGrid, threshold) => {
    const sampled = samplePath(sourcePath, SOURCE_STEP);
    if (!sampled.points.length) return { total: 0, intervals: [] };

    const intervals = [];
    let runStart = null;
    let previousLength = 0;

    sampled.points.forEach((point) => {
      const near = isNearReference(point, referenceGrid, threshold);
      if (near && runStart === null) runStart = Math.max(0, point.length - SOURCE_STEP);
      if (!near && runStart !== null) {
        intervals.push([runStart, Math.min(sampled.total, previousLength + SOURCE_STEP)]);
        runStart = null;
      }
      previousLength = point.length;
    });

    if (runStart !== null) intervals.push([runStart, sampled.total]);
    return { total: sampled.total, intervals: mergeIntervals(intervals, sampled.total) };
  };

  const buildDashArray = (total, intervals) => {
    if (!total || !intervals.length) return '';
    const parts = [];
    const first = intervals[0];

    if (first[0] > 0) parts.push(0, first[0]);
    parts.push(first[1] - first[0]);

    for (let index = 1; index < intervals.length; index += 1) {
      const previous = intervals[index - 1];
      const current = intervals[index];
      parts.push(Math.max(0, current[0] - previous[1]));
      parts.push(current[1] - current[0]);
    }

    parts.push(Math.max(0, total - intervals[intervals.length - 1][1]));
    return parts.map((value) => Number(value.toFixed(2))).join(' ');
  };

  const makePath = (parent, pathData, hidden = false) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('pointer-events', 'none');
    if (hidden) {
      path.setAttribute('stroke', 'none');
      path.setAttribute('visibility', 'hidden');
    }
    parent.appendChild(path);
    return path;
  };

  document.querySelectorAll('[data-atlas]').forEach((atlas) => {
    const svg = atlas.querySelector('[data-atlas-map]');
    const landContext = svg?.querySelector('.msc-atlas-map__land-context');
    const landmass = landContext?.querySelector('.msc-atlas-map__landmass');
    const boundarySource = atlas.querySelector('[data-atlas-region-shape="mining"] > .msc-atlas-map__region-shape--inner');
    const replacementCoast = atlas.querySelector('[data-atlas-region-shape="marketplaces"] > .msc-atlas-map__region-shape--inner');
    if (!svg || !landContext || !landmass) return;

    /* Remove the two earlier derived-focus systems. Neither one is allowed to
       render selected geometry; this pass only brightens exact existing lines. */
    landContext.querySelectorAll('.msc-atlas-map__focus-coast, .msc-atlas-map__focus-boundaries, .msc-atlas-map__focus-perimeter-explicit').forEach((node) => node.remove());

    const guide = makePath(landContext, 'M0 0', true);
    guide.classList.add('msc-atlas-map__focus-guide');
    guide.setAttribute('aria-hidden', 'true');

    const exactGroup = document.createElementNS(SVG_NS, 'g');
    exactGroup.classList.add('msc-atlas-map__focus-perimeter-exact');
    exactGroup.setAttribute('aria-hidden', 'true');
    exactGroup.setAttribute('pointer-events', 'none');
    exactGroup.style.display = 'none';
    landContext.appendChild(exactGroup);

    const regionBySlug = new Map(
      [...atlas.querySelectorAll('[data-atlas-region-shape]')]
        .map((region) => [region.dataset.atlasRegionShape, region])
    );
    const cachedBySlug = new Map();

    const buildSourceSpecs = () => {
      const specs = [];
      const landmassData = getRenderedPathData(landmass);
      if (landmassData) specs.push({ pathData: landmassData, threshold: COAST_THRESHOLD });

      const replacementData = getRenderedPathData(replacementCoast);
      if (replacementData) {
        splitSubpaths(replacementData).forEach((pathData) => specs.push({ pathData, threshold: COAST_THRESHOLD }));
      }

      const boundaryData = getRenderedPathData(boundarySource);
      if (boundaryData) {
        splitSubpaths(boundaryData).forEach((pathData) => specs.push({ pathData, threshold: BOUNDARY_THRESHOLD }));
      }
      return specs;
    };

    const computeSegments = (slug, center) => {
      if (cachedBySlug.has(slug)) return cachedBySlug.get(slug);
      const referenceData = REFERENCE_TRACES[slug];
      if (!referenceData || !center) return [];

      guide.setAttribute('d', referenceData);
      guide.setAttribute('transform', `translate(${center.x} ${center.y})`);
      const referenceSample = samplePath(guide, REFERENCE_STEP);
      if (!referenceSample.points.length) return [];

      const referenceGrid = buildGrid(referenceSample.points);
      const results = [];
      buildSourceSpecs().forEach((spec) => {
        const sourcePath = makePath(landContext, spec.pathData, true);
        const match = findIntervals(sourcePath, referenceGrid, spec.threshold);
        sourcePath.remove();
        if (!match.intervals.length) return;

        const dashArray = buildDashArray(match.total, match.intervals);
        if (dashArray) results.push({ pathData: spec.pathData, dashArray });
      });

      cachedBySlug.set(slug, results);
      return results;
    };

    const renderExactPerimeter = (slug, mode) => {
      exactGroup.replaceChildren();
      if (!slug) {
        exactGroup.style.display = 'none';
        return;
      }

      const region = regionBySlug.get(slug);
      const label = region?.querySelector('.msc-atlas-map__region-label');
      const center = getVisualCenter(label);
      const segments = computeSegments(slug, center);
      if (!segments.length) {
        exactGroup.style.display = 'none';
        return;
      }

      const locked = mode === 'locked';
      segments.forEach(({ pathData, dashArray }) => {
        const path = makePath(exactGroup, pathData);
        path.classList.add('msc-atlas-map__focus-segment-exact');
        path.setAttribute('stroke', locked ? 'rgba(251, 248, 239, .94)' : 'rgba(251, 248, 239, .86)');
        path.setAttribute('stroke-width', locked ? '1.7' : '1.55');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-dasharray', dashArray);
        path.setAttribute('vector-effect', 'non-scaling-stroke');
      });
      exactGroup.style.display = 'block';
    };

    let frame = null;
    const refresh = () => {
      frame = null;
      renderExactPerimeter(atlas.dataset.atlasActive || '', atlas.dataset.atlasMode || 'overview');
    };
    const scheduleRefresh = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(refresh);
    };

    const observer = new MutationObserver(scheduleRefresh);
    observer.observe(atlas, {
      attributes: true,
      attributeFilter: ['data-atlas-active', 'data-atlas-mode']
    });

    refresh();
  });
})();
