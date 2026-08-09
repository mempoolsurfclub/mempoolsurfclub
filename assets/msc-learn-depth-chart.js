(() => {
  const loadHeroStyles = () => {
    const script = document.currentScript;
    if (!script?.src || document.querySelector('link[data-msc-learn-hero-wide]')) return;

    const scriptUrl = new URL(script.src);
    const heroUrl = new URL('msc-learn-hero-wide.css', scriptUrl);
    heroUrl.search = scriptUrl.search;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = heroUrl.href;
    link.dataset.mscLearnHeroWide = 'true';
    document.head.appendChild(link);
  };

  const loadSounderReviewStyles = () => {
    const script = document.currentScript;
    if (!script?.src || document.querySelector('link[data-msc-learn-sounder-readability]')) return;

    const scriptUrl = new URL(script.src);
    const reviewUrl = new URL('msc-learn-sounder-readability.css', scriptUrl);
    reviewUrl.search = scriptUrl.search;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = reviewUrl.href;
    link.dataset.mscLearnSounderReadability = 'true';
    document.head.appendChild(link);
  };

  const loadSounderSurfaceStyles = () => {
    const script = document.currentScript;
    if (!script?.src || document.querySelector('link[data-msc-learn-sounder-surface]')) return;

    const scriptUrl = new URL(script.src);
    const surfaceUrl = new URL('msc-learn-sounder-surface.css', scriptUrl);
    surfaceUrl.search = scriptUrl.search;
    surfaceUrl.searchParams.set('msc_surface_rev', 'cdc6db2');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = surfaceUrl.href;
    link.dataset.mscLearnSounderSurface = 'true';
    document.head.appendChild(link);
  };

  loadHeroStyles();
  loadSounderReviewStyles();
  loadSounderSurfaceStyles();

  const init = () => {
    const learn = document.querySelector('.msc-learn');
    if (!learn) return;

    const chart = learn.querySelector('.msc-depth-chart');
    const field = chart?.querySelector('.msc-depth-chart__field');
    const header = chart?.querySelector('.msc-depth-chart__header');
    const headerTitle = chart?.querySelector('.msc-depth-chart__header span:first-child');
    const headerMeta = chart?.querySelector('.msc-depth-chart__header span:last-child');
    const groups = Array.from(learn.querySelectorAll('.msc-learn-topic'));

    if (!chart || !field || groups.length < 5) return;
    if (chart.dataset.mscDepthEnhanced === 'true') return;

    const regionMeta = [
      {
        label: 'Surface',
        key: 'basics',
        fallbackHref: '/pages/learn-bitcoin-basics',
        entryLabel: 'Surface entry'
      },
      {
        label: 'Shallow',
        key: 'network',
        fallbackHref: '/pages/learn-bitcoin-network'
      },
      {
        label: 'Middle',
        key: 'building',
        fallbackHref: '/pages/learn-building-on-bitcoin'
      },
      {
        label: 'Deep',
        key: 'development',
        displayTitle: 'Bitcoin Protocols',
        fallbackHref: '/pages/learn-bitcoin-development'
      },
      {
        label: 'Trench',
        key: 'ecosystem',
        fallbackHref: '/pages/learn-bitcoin-ecosystem'
      }
    ];

    const regions = groups.slice(0, 5).map((group, index) => {
      const sourceTitle = group.querySelector('summary .msc-learn-topic__summary-copy > span')?.textContent?.trim() || `Learn region ${index + 1}`;
      const description = group.querySelector('summary .msc-learn-topic__summary-copy > small')?.textContent?.trim() || '';
      const subcategories = Array.from(group.querySelectorAll('.msc-learn-topic__column h3'))
        .map((node) => node.textContent.trim())
        .filter(Boolean);
      const existingGuideLink = group.querySelector('.msc-learn-topic__guide-link')?.getAttribute('href');
      const meta = regionMeta[index];

      return {
        group,
        sourceTitle,
        title: meta.displayTitle || sourceTitle,
        description,
        subcategories,
        href: existingGuideLink || meta.fallbackHref,
        ...meta
      };
    });

    const status = document.createElement('div');
    status.className = 'msc-sonar-status';
    status.innerHTML = `
      <span class="msc-sonar-status__eyebrow">Current position</span>
      <strong class="msc-sonar-status__position"></strong>
      <span class="msc-sonar-status__track" aria-hidden="true">
        ${regions.map((region) => `<i class="msc-sonar-status__node" data-region="${region.key}"></i>`).join('')}
      </span>
    `;

    const statusPosition = status.querySelector('.msc-sonar-status__position');
    const setStatus = (region) => {
      if (!region || !statusPosition) return;
      status.dataset.region = region.key;
      statusPosition.textContent = `${region.label} / ${region.title}`;
      status.setAttribute('aria-label', `Current position: ${region.label}, ${region.title}`);
    };
    setStatus(regions[0]);

    if (header && headerMeta) {
      header.insertBefore(status, headerMeta);
    }

    const map = document.createElement('nav');
    map.className = 'msc-depth-map';
    map.setAttribute('aria-label', 'MSC SONAR — Bitcoin learning depth map');

    map.innerHTML = `
      <div class="msc-depth-map__chart" aria-hidden="true">
        <svg class="msc-depth-map__contours" viewBox="0 0 1000 650" preserveAspectRatio="none" focusable="false">
          <path class="msc-depth-map__contour" d="M-30 82 C118 38 206 118 332 78 S598 36 1030 92" />
          <path class="msc-depth-map__contour" d="M-30 156 C122 108 242 196 382 150 S676 104 1030 170" />
          <path class="msc-depth-map__contour" d="M-30 248 C138 194 264 302 430 238 S724 184 1030 260" />
          <path class="msc-depth-map__contour" d="M-30 356 C158 292 310 424 486 344 S760 282 1030 374" />
          <path class="msc-depth-map__contour" d="M-30 482 C174 416 342 548 548 462 S810 402 1030 500" />
          <path class="msc-depth-map__contour" d="M-30 602 C190 540 384 648 612 574 S858 526 1030 610" />
          <path class="msc-depth-map__profile" d="M-20 38 C110 54 148 92 210 128 C302 184 338 232 410 274 C490 320 510 384 602 430 C676 468 666 526 746 566 C820 604 900 612 1020 636" />
          <path class="msc-depth-map__route" d="M134 70 C214 108 224 144 300 176 S390 252 458 288 S520 390 612 424 S662 520 754 580" />
          <circle class="msc-depth-map__node msc-depth-map__node--basics" cx="134" cy="70" r="7" />
          <circle class="msc-depth-map__node msc-depth-map__node--network" cx="300" cy="176" r="7" />
          <circle class="msc-depth-map__node msc-depth-map__node--building" cx="458" cy="288" r="7" />
          <circle class="msc-depth-map__node msc-depth-map__node--development" cx="612" cy="424" r="7" />
          <circle class="msc-depth-map__node msc-depth-map__node--ecosystem" cx="754" cy="580" r="7" />
        </svg>
        <span class="msc-depth-map__scan"></span>
      </div>
      <div class="msc-depth-map__scale" aria-hidden="true"></div>
      <div class="msc-depth-map__regions"></div>
    `;

    const scale = map.querySelector('.msc-depth-map__scale');
    const regionList = map.querySelector('.msc-depth-map__regions');

    regions.forEach((region) => {
      const scaleMark = document.createElement('span');
      scaleMark.className = 'msc-depth-map__scale-mark';
      scaleMark.dataset.region = region.key;
      scaleMark.textContent = region.label;
      scale.appendChild(scaleMark);

      const link = document.createElement('a');
      link.className = 'msc-depth-map__region';
      link.dataset.region = region.key;
      link.dataset.progressKey = `learn:${region.key}`;
      link.dataset.progressState = 'untracked';
      link.href = region.href;
      link.setAttribute('aria-label', `${region.label}: open ${region.title}`);

      const subcategoryText = region.subcategories.join(' · ');
      link.innerHTML = `
        <span class="msc-depth-map__station" aria-hidden="true"></span>
        <span class="msc-depth-map__region-copy">
          <span class="msc-depth-map__region-line">
            <span class="msc-depth-map__depth-name"></span>
            <span class="msc-depth-map__entry"></span>
          </span>
          <strong class="msc-depth-map__title"></strong>
          <span class="msc-depth-map__meta">
            <span class="msc-depth-map__subcategories"></span>
            <span class="msc-depth-map__description"></span>
          </span>
        </span>
        <span class="msc-depth-map__arrow" aria-hidden="true">↗</span>
      `;

      link.querySelector('.msc-depth-map__depth-name').textContent = region.label;
      link.querySelector('.msc-depth-map__title').textContent = region.title;
      link.querySelector('.msc-depth-map__subcategories').textContent = subcategoryText;
      link.querySelector('.msc-depth-map__description').textContent = region.description;

      const entry = link.querySelector('.msc-depth-map__entry');
      if (region.entryLabel) {
        entry.textContent = region.entryLabel;
      } else {
        entry.remove();
      }

      const activate = () => {
        map.dataset.active = region.key;
        setStatus(region);
      };
      const deactivate = () => {
        if (map.dataset.active === region.key) delete map.dataset.active;
        setStatus(regions[0]);
      };

      link.addEventListener('pointerenter', activate);
      link.addEventListener('pointerleave', deactivate);
      link.addEventListener('focus', activate);
      link.addEventListener('blur', deactivate);

      regionList.appendChild(link);
    });

    field.replaceChildren(map);
    field.removeAttribute('aria-hidden');
    chart.dataset.mscDepthEnhanced = 'true';
    if (headerTitle) headerTitle.textContent = 'MSC SONAR';
    if (headerMeta) headerMeta.textContent = 'Learn system';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
