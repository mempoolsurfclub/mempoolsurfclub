(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const SOURCE_STEP = 1.5;
  const REFERENCE_STEP = 1.5;
  const COAST_THRESHOLD = 7;
  const BOUNDARY_THRESHOLD = 5.5;
  const MIN_INTERVAL = 3;
  const MERGE_GAP = 4;
  const GRID_SIZE = 10;

  const style = document.createElement('style');
  style.textContent = `
    .msc-explore-atlas-shell .msc-atlas-map__focus-perimeter-explicit {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

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
      /* Fall back to the source d below. */
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

    return {
      total: sampled.total,
      intervals: mergeIntervals(intervals, sampled.total)
    };
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

  const makeTemporaryPath = (landContext, pathData) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'none');
    path.setAttribute('visibility', 'hidden');
    path.setAttribute('pointer-events', 'none');
    landContext.appendChild(path);
    return path;
  };

  document.querySelectorAll('[data-atlas]').forEach((atlas) => {
    const svg = atlas.querySelector('[data-atlas-map]');
    const landContext = svg?.querySelector('.msc-atlas-map__land-context');
    const reference = landContext?.querySelector('.msc-atlas-map__focus-perimeter-explicit');
    const landmass = landContext?.querySelector('.msc-atlas-map__landmass');
    const boundarySource = atlas.querySelector('[data-atlas-region-shape="mining"] > .msc-atlas-map__region-shape--inner');
    const replacementCoast = atlas.querySelector('[data-atlas-region-shape="marketplaces"] > .msc-atlas-map__region-shape--inner');

    if (!svg || !landContext || !reference || !landmass) return;

    const exactGroup = document.createElementNS(SVG_NS, 'g');
    exactGroup.classList.add('msc-atlas-map__focus-perimeter-exact');
    exactGroup.setAttribute('aria-hidden', 'true');
    exactGroup.setAttribute('pointer-events', 'none');
    exactGroup.style.display = 'none';
    landContext.appendChild(exactGroup);

    const cachedBySlug = new Map();
    let frame = null;

    const buildSourceSpecs = () => {
      const specs = [];
      const landmassData = getRenderedPathData(landmass);
      if (landmassData) specs.push({ pathData: landmassData, threshold: COAST_THRESHOLD });

      const replacementData = getRenderedPathData(replacementCoast);
      if (replacementData) {
        splitSubpaths(replacementData).forEach((pathData) => {
          specs.push({ pathData, threshold: COAST_THRESHOLD });
        });
      }

      const boundaryData = getRenderedPathData(boundarySource);
      if (boundaryData) {
        splitSubpaths(boundaryData).forEach((pathData) => {
          specs.push({ pathData, threshold: BOUNDARY_THRESHOLD });
        });
      }
      return specs;
    };

    const computeExactSegments = (slug) => {
      if (cachedBySlug.has(slug)) return cachedBySlug.get(slug);
      const referenceData = reference.getAttribute('d');
      if (!referenceData) return [];

      const referenceSample = samplePath(reference, REFERENCE_STEP);
      if (!referenceSample.points.length) return [];
      const referenceGrid = buildGrid(referenceSample.points);
      const results = [];

      buildSourceSpecs().forEach((spec) => {
        const sourcePath = makeTemporaryPath(landContext, spec.pathData);
        const match = findIntervals(sourcePath, referenceGrid, spec.threshold);
        sourcePath.remove();
        if (!match.intervals.length) return;

        const dashArray = buildDashArray(match.total, match.intervals);
        if (!dashArray) return;
        results.push({ pathData: spec.pathData, dashArray });
      });

      cachedBySlug.set(slug, results);
      return results;
    };

    const refresh = () => {
      frame = null;
      const slug = atlas.dataset.atlasActive || '';
      const mode = atlas.dataset.atlasMode || 'overview';

      exactGroup.replaceChildren();
      if (!slug || !reference.getAttribute('d')) {
        exactGroup.style.display = 'none';
        return;
      }

      const segments = computeExactSegments(slug);
      if (!segments.length) {
        exactGroup.style.display = 'none';
        return;
      }

      const locked = mode === 'locked';
      segments.forEach(({ pathData, dashArray }) => {
        const path = document.createElementNS(SVG_NS, 'path');
        path.classList.add('msc-atlas-map__focus-segment-exact');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', locked ? 'rgba(251, 248, 239, .94)' : 'rgba(251, 248, 239, .86)');
        path.setAttribute('stroke-width', locked ? '1.7' : '1.55');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-dasharray', dashArray);
        path.setAttribute('vector-effect', 'non-scaling-stroke');
        path.setAttribute('pointer-events', 'none');
        exactGroup.appendChild(path);
      });

      exactGroup.style.display = 'block';
    };

    const scheduleRefresh = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(refresh);
    };

    const atlasObserver = new MutationObserver(scheduleRefresh);
    atlasObserver.observe(atlas, {
      attributes: true,
      attributeFilter: ['data-atlas-active', 'data-atlas-mode']
    });

    const referenceObserver = new MutationObserver(scheduleRefresh);
    referenceObserver.observe(reference, {
      attributes: true,
      attributeFilter: ['d', 'transform', 'style']
    });

    refresh();
  });
})();
