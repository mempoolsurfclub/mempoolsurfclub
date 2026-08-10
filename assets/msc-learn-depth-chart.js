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
    surfaceUrl.searchParams.set('msc_surface_rev', 'sonar-depth-brief-v1');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = surfaceUrl.href;
    link.dataset.mscLearnSounderSurface = 'true';
    document.head.appendChild(link);
  };

  const loadSonarDepthBriefStyles = () => {
    const script = document.currentScript;
    if (!script?.src || document.querySelector('link[data-msc-learn-sonar-depth-brief]')) return;

    const scriptUrl = new URL(script.src);
    const depthBriefUrl = new URL('msc-learn-sonar-depth-brief.css', scriptUrl);
    depthBriefUrl.search = scriptUrl.search;
    depthBriefUrl.searchParams.set('msc_depth_brief_rev', 'v8');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = depthBriefUrl.href;
    link.dataset.mscLearnSonarDepthBrief = 'true';
    document.head.appendChild(link);
  };

  loadHeroStyles();
  loadSounderReviewStyles();
  loadSounderSurfaceStyles();
  loadSonarDepthBriefStyles();

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

    const overviewCopy = 'Explore Bitcoin by depth. MSC SONAR organizes the Learn system from foundational concepts at the surface through network mechanics, systems built on Bitcoin, protocol internals, and the wider ecosystem. Hover over a depth to explore.';

    const regionMeta = [
      {
        label: 'Surface',
        key: 'basics',
        guideCount: 16,
        brief: 'Start with the foundation: what Bitcoin is, how ownership and transactions work, and the security, privacy, and monetary concepts behind using it.',
        fallbackHref: '/pages/learn-bitcoin-basics'
      },
      {
        label: 'Shallow',
        key: 'network',
        guideCount: 16,
        brief: 'Follow the network itself through mining, nodes, mempools, blocks, chainwork, proof of work, consensus, and network upgrades.',
        fallbackHref: '/pages/learn-bitcoin-network'
      },
      {
        label: 'Middle',
        key: 'building',
        guideCount: 16,
        brief: 'Explore systems built around Bitcoin: Layer 2, digital assets, development models, and emerging protocols, including the assumptions and tradeoffs each introduces.',
        fallbackHref: '/pages/learn-building-on-bitcoin'
      },
      {
        label: 'Deep',
        key: 'development',
        guideCount: 16,
        displayTitle: 'Bitcoin Protocols',
        brief: 'Go inside Bitcoin’s implementation and protocol machinery: Bitcoin Core, BIPs, Script, cryptography, testing, infrastructure, and the boundary between consensus rules and software policy.',
        fallbackHref: '/pages/learn-bitcoin-development'
      },
      {
        label: 'Trench',
        key: 'ecosystem',
        guideCount: 16,
        brief: 'Map the human and organizational layer around Bitcoin: builders, companies, service providers, marketplaces, communities, conferences, history, and open-source projects, without confusing influence with protocol authority.',
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

    if (header && headerTitle && headerMeta) {
      const brand = document.createElement('div');
      brand.className = 'msc-sonar-brand';
      header.insertBefore(brand, headerTitle);
      brand.append(headerTitle, headerMeta);
    }

    const status = document.createElement('div');
    status.className = 'msc-sonar-status';
    status.innerHTML = `
      <span class="msc-sonar-status__position">
        <span class="msc-sonar-status__position-label">Current position:</span>
        <strong class="msc-sonar-status__depth"></strong>
      </span>
      <span class="msc-sonar-status__track">
        ${regions.map((region) => `<i class="msc-sonar-status__node" data-region="${region.key}" tabindex="0" role="button" aria-label="${region.label}: ${region.title}"></i>`).join('')}
      </span>
      <strong class="msc-sonar-status__guide"></strong>
    `;

    const statusDepth = status.querySelector('.msc-sonar-status__depth');
    const statusGuide = status.querySelector('.msc-sonar-status__guide');
    const setStatus = (region = null) => {
      if (!statusDepth || !statusGuide) return;

      if (!region) {
        status.dataset.region = 'overview';
        statusDepth.textContent = 'MSC SONAR';
        statusGuide.textContent = 'LEARN SYSTEM';
        status.setAttribute('aria-label', 'MSC SONAR Learn System overview');
        return;
      }

      status.dataset.region = region.key;
      statusDepth.textContent = region.label;
      statusGuide.textContent = region.title;
      status.setAttribute('aria-label', `Current position: ${region.label}. ${region.title}`);
    };
    setStatus();

    if (header) {
      header.appendChild(status);

      const sourceAccountLink = document.querySelector('.header__icon--account');
      const accountHref = sourceAccountLink?.getAttribute('href') || '/account/login';
      const loggedIn = Boolean(sourceAccountLink && !accountHref.includes('/account/login'));
      const user = document.createElement('div');
      user.className = `msc-sonar-user msc-sonar-user--${loggedIn ? 'logged-in' : 'logged-out'}`;

      if (loggedIn) {
        user.innerHTML = `
          <span class="msc-sonar-user__label">My progress</span>
          <span class="msc-sonar-user__meter" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
          <span class="msc-sonar-user__count">— / — guides</span>
          <a class="msc-sonar-user__action" href="${accountHref}">Account</a>
        `;
        user.setAttribute('aria-label', 'My Learn progress. Guide completion tracking will appear here.');
      } else {
        user.innerHTML = `
          <a class="msc-sonar-user__action" href="${accountHref}">Login</a>
          <span class="msc-sonar-user__label">Save progress</span>
          <span class="msc-sonar-user__meter" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
        `;
        user.setAttribute('aria-label', 'Log in to save Learn guide progress.');
      }

      header.appendChild(user);
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
      <aside class="msc-depth-map__brief" data-region="overview" aria-label="MSC SONAR Learn System overview">
        <div class="msc-depth-map__brief-overview">
          <strong class="msc-depth-map__brief-system-title">MSC SONAR</strong>
          <span class="msc-depth-map__brief-system-subtitle">LEARN SYSTEM</span>
          <p class="msc-depth-map__brief-system-copy">${overviewCopy}</p>
        </div>
        <div class="msc-depth-map__brief-detail">
          <span class="msc-depth-map__brief-eyebrow">Depth brief</span>
          <span class="msc-depth-map__brief-depth"></span>
          <strong class="msc-depth-map__brief-title"></strong>
          <p class="msc-depth-map__brief-copy"></p>
          <div class="msc-depth-map__brief-footer">
            <span class="msc-depth-map__brief-count"></span>
            <a class="msc-depth-map__brief-action"></a>
          </div>
        </div>
        <div class="msc-depth-map__brief-visual" aria-hidden="true">
          <svg class="msc-sonar-wireframe" data-wireframe="overview" viewBox="0 0 240 190" focusable="false">
            <ellipse cx="120" cy="52" rx="70" ry="19" />
            <ellipse class="msc-sonar-wireframe__mid" cx="120" cy="75" rx="60" ry="17" />
            <ellipse class="msc-sonar-wireframe__mid" cx="120" cy="98" rx="50" ry="15" />
            <ellipse class="msc-sonar-wireframe__faint" cx="120" cy="121" rx="40" ry="13" />
            <ellipse class="msc-sonar-wireframe__faint" cx="120" cy="144" rx="30" ry="10" />
            <line x1="120" y1="33" x2="120" y2="155" />
            <polygon points="120,76 142,89 120,102 98,89" />
            <polyline class="msc-sonar-wireframe__mid" points="98,89 98,111 120,124 142,111 142,89" />
            <line class="msc-sonar-wireframe__mid" x1="120" y1="102" x2="120" y2="124" />
            <text class="msc-sonar-wireframe__symbol" x="120" y="92">₿</text>
          </svg>

          <svg class="msc-sonar-wireframe" data-wireframe="basics" viewBox="0 0 240 190" focusable="false">
            <ellipse cx="120" cy="94" rx="61" ry="66" />
            <ellipse class="msc-sonar-wireframe__mid" cx="128" cy="94" rx="61" ry="66" />
            <path class="msc-sonar-wireframe__faint" d="M120 28 C147 48 155 136 120 160" />
            <path class="msc-sonar-wireframe__faint" d="M120 28 C93 48 85 136 120 160" />
            <line class="msc-sonar-wireframe__mid" x1="66" y1="64" x2="74" y2="64" />
            <line class="msc-sonar-wireframe__mid" x1="66" y1="124" x2="74" y2="124" />
            <text class="msc-sonar-wireframe__symbol" x="122" y="96">₿</text>
          </svg>

          <svg class="msc-sonar-wireframe" data-wireframe="network" viewBox="0 0 240 190" focusable="false">
            <polygon points="120,60 148,76 120,92 92,76" />
            <polyline points="92,76 92,108 120,124 148,108 148,76" />
            <line x1="120" y1="92" x2="120" y2="124" />
            <line class="msc-sonar-wireframe__mid" x1="92" y1="76" x2="55" y2="48" />
            <line class="msc-sonar-wireframe__mid" x1="148" y1="76" x2="188" y2="51" />
            <line class="msc-sonar-wireframe__mid" x1="92" y1="108" x2="45" y2="128" />
            <line class="msc-sonar-wireframe__mid" x1="148" y1="108" x2="194" y2="129" />
            <line class="msc-sonar-wireframe__faint" x1="120" y1="60" x2="120" y2="25" />
            <line class="msc-sonar-wireframe__faint" x1="120" y1="124" x2="120" y2="163" />
            <circle class="msc-sonar-wireframe__node" cx="55" cy="48" r="4" />
            <circle class="msc-sonar-wireframe__node" cx="188" cy="51" r="4" />
            <circle class="msc-sonar-wireframe__node" cx="45" cy="128" r="4" />
            <circle class="msc-sonar-wireframe__node" cx="194" cy="129" r="4" />
            <circle class="msc-sonar-wireframe__node" cx="120" cy="25" r="4" />
            <circle class="msc-sonar-wireframe__node" cx="120" cy="163" r="4" />
            <text class="msc-sonar-wireframe__symbol" x="120" y="91">₿</text>
          </svg>

          <svg class="msc-sonar-wireframe" data-wireframe="building" viewBox="0 0 240 190" focusable="false">
            <polygon points="120,32 180,54 120,76 60,54" />
            <polygon class="msc-sonar-wireframe__mid" points="120,62 180,84 120,106 60,84" />
            <polygon class="msc-sonar-wireframe__mid" points="120,92 180,114 120,136 60,114" />
            <polygon class="msc-sonar-wireframe__faint" points="120,122 180,144 120,166 60,144" />
            <line class="msc-sonar-wireframe__faint" x1="60" y1="54" x2="60" y2="144" />
            <line class="msc-sonar-wireframe__faint" x1="180" y1="54" x2="180" y2="144" />
            <line class="msc-sonar-wireframe__faint" x1="120" y1="76" x2="120" y2="166" />
            <text class="msc-sonar-wireframe__symbol" x="120" y="53">₿</text>
          </svg>

          <svg class="msc-sonar-wireframe" data-wireframe="development" viewBox="0 0 240 190" focusable="false">
            <polygon points="120,24 183,58 183,128 120,164 57,128 57,58" />
            <polyline class="msc-sonar-wireframe__mid" points="57,58 120,92 183,58" />
            <line class="msc-sonar-wireframe__mid" x1="120" y1="92" x2="120" y2="164" />
            <line class="msc-sonar-wireframe__faint" x1="120" y1="24" x2="120" y2="92" />
            <line x1="86" y1="62" x2="103" y2="83" />
            <line x1="154" y1="62" x2="137" y2="83" />
            <line x1="103" y1="83" x2="120" y2="103" />
            <line x1="137" y1="83" x2="120" y2="103" />
            <line x1="120" y1="103" x2="120" y2="132" />
            <circle class="msc-sonar-wireframe__node" cx="86" cy="62" r="3.5" />
            <circle class="msc-sonar-wireframe__node" cx="154" cy="62" r="3.5" />
            <circle class="msc-sonar-wireframe__node" cx="103" cy="83" r="3.5" />
            <circle class="msc-sonar-wireframe__node" cx="137" cy="83" r="3.5" />
            <circle class="msc-sonar-wireframe__node" cx="120" cy="103" r="3.5" />
            <circle class="msc-sonar-wireframe__node" cx="120" cy="132" r="3.5" />
            <text class="msc-sonar-wireframe__symbol" x="120" y="145">₿</text>
          </svg>

          <svg class="msc-sonar-wireframe" data-wireframe="ecosystem" viewBox="0 0 240 190" focusable="false">
            <ellipse cx="120" cy="95" rx="88" ry="38" />
            <ellipse class="msc-sonar-wireframe__mid" cx="120" cy="95" rx="78" ry="52" transform="rotate(38 120 95)" />
            <ellipse class="msc-sonar-wireframe__faint" cx="120" cy="95" rx="74" ry="56" transform="rotate(-38 120 95)" />
            <circle cx="120" cy="95" r="28" />
            <circle class="msc-sonar-wireframe__node" cx="32" cy="95" r="4" />
            <circle class="msc-sonar-wireframe__node" cx="208" cy="95" r="4" />
            <circle class="msc-sonar-wireframe__node" cx="161" cy="45" r="4" />
            <circle class="msc-sonar-wireframe__node" cx="79" cy="145" r="4" />
            <circle class="msc-sonar-wireframe__node" cx="72" cy="48" r="4" />
            <circle class="msc-sonar-wireframe__node" cx="168" cy="142" r="4" />
            <text class="msc-sonar-wireframe__symbol" x="120" y="97">₿</text>
          </svg>
        </div>
      </aside>
    `;

    const scale = map.querySelector('.msc-depth-map__scale');
    const regionList = map.querySelector('.msc-depth-map__regions');
    const brief = map.querySelector('.msc-depth-map__brief');
    const briefDepth = brief?.querySelector('.msc-depth-map__brief-depth');
    const briefTitle = brief?.querySelector('.msc-depth-map__brief-title');
    const briefCopy = brief?.querySelector('.msc-depth-map__brief-copy');
    const briefCount = brief?.querySelector('.msc-depth-map__brief-count');
    const briefAction = brief?.querySelector('.msc-depth-map__brief-action');

    const setBrief = (region) => {
      if (!region || !brief || !briefDepth || !briefTitle || !briefCopy || !briefCount || !briefAction) return;
      brief.dataset.region = region.key;
      briefDepth.textContent = region.label;
      briefTitle.textContent = region.title;
      briefCopy.textContent = region.brief;
      briefCount.textContent = `${region.guideCount} guides`;
      briefAction.href = region.href;
      briefAction.textContent = `Explore ${region.label} →`;
      briefAction.setAttribute('aria-label', `Explore ${region.label}: ${region.title}`);
      brief.setAttribute('aria-label', `${region.label} depth brief: ${region.title}`);
    };

    const setOverview = () => {
      map.dataset.active = 'overview';
      setStatus();
      if (brief) {
        brief.dataset.region = 'overview';
        brief.setAttribute('aria-label', 'MSC SONAR Learn System overview');
      }
    };

    const activateRegion = (region) => {
      if (!region) return;
      map.dataset.active = region.key;
      setStatus(region);
      setBrief(region);
    };

    const resetRegion = () => {
      setOverview();
    };

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

      link.addEventListener('pointerenter', () => activateRegion(region));
      link.addEventListener('pointerleave', resetRegion);
      link.addEventListener('focus', () => activateRegion(region));
      link.addEventListener('blur', resetRegion);

      regionList.appendChild(link);
    });

    status.querySelectorAll('.msc-sonar-status__node').forEach((node) => {
      const region = regions.find((item) => item.key === node.dataset.region);
      if (!region) return;
      node.addEventListener('pointerenter', () => activateRegion(region));
      node.addEventListener('pointerleave', resetRegion);
      node.addEventListener('focus', () => activateRegion(region));
      node.addEventListener('blur', resetRegion);
    });

    setOverview();
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
