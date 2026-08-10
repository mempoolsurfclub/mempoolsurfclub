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
    depthBriefUrl.searchParams.set('msc_depth_brief_rev', 'v10');

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
          <svg class="msc-sonar-wireframe" data-wireframe="overview" viewBox="0 0 260 190" focusable="false">
            <line class="msc-sonar-wireframe__faint" x1="130" y1="11" x2="130" y2="28" />
            <line class="msc-sonar-wireframe__faint" x1="122" y1="16" x2="138" y2="16" />
            <ellipse class="msc-sonar-wireframe__accent" cx="130" cy="36" rx="31" ry="8" />
            <path class="msc-sonar-wireframe__accent" d="M99 36 L103 61 C112 69 148 69 157 61 L161 36" />
            <ellipse class="msc-sonar-wireframe__mid" cx="130" cy="61" rx="27" ry="7" />
            <path class="msc-sonar-wireframe__mid" d="M116 66 L120 79 M144 66 L140 79" />
            <ellipse class="msc-sonar-wireframe__accent" cx="130" cy="82" rx="14" ry="4" />
            <path class="msc-sonar-wireframe__accent" d="M116 82 L122 94 L138 94 L144 82" />
            <line class="msc-sonar-wireframe__mid" x1="130" y1="94" x2="130" y2="101" />
            <path class="msc-sonar-wireframe__pulse" d="M107 103 C119 112 141 112 153 103" />
            <path class="msc-sonar-wireframe__pulse msc-sonar-wireframe__mid" d="M91 116 C111 132 149 132 169 116" />
            <path class="msc-sonar-wireframe__pulse msc-sonar-wireframe__faint" d="M73 130 C103 153 157 153 187 130" />
            <path class="msc-sonar-wireframe__ghost" d="M27 159 C55 149 80 166 109 157 S163 147 195 158 S224 164 244 156" />
            <path class="msc-sonar-wireframe__ghost" d="M23 168 C52 159 81 176 111 167 S166 157 198 168 S226 174 248 166" />
            <path class="msc-sonar-wireframe__ghost" d="M34 177 C61 170 85 184 114 177 S164 168 190 177 S219 184 238 178" />
          </svg>

          <svg class="msc-sonar-wireframe" data-wireframe="basics" viewBox="0 0 260 190" focusable="false">
            <rect class="msc-sonar-wireframe__ghost" x="76" y="38" width="120" height="88" rx="12" />
            <line class="msc-sonar-wireframe__ghost" x1="76" y1="38" x2="63" y2="48" />
            <line class="msc-sonar-wireframe__ghost" x1="196" y1="38" x2="183" y2="48" />
            <line class="msc-sonar-wireframe__ghost" x1="196" y1="126" x2="183" y2="136" />
            <rect class="msc-sonar-wireframe__accent" x="63" y="48" width="120" height="88" rx="12" />
            <rect class="msc-sonar-wireframe__mid" x="82" y="65" width="82" height="38" rx="5" />
            <path class="msc-sonar-wireframe__mid" d="M114 82 V76 C114 69 126 69 126 76 V82" />
            <rect class="msc-sonar-wireframe__accent" x="111" y="82" width="18" height="13" rx="2" />
            <circle class="msc-sonar-wireframe__mid" cx="91" cy="118" r="5" />
            <circle class="msc-sonar-wireframe__mid" cx="107" cy="118" r="5" />
            <path class="msc-sonar-wireframe__faint" d="M137 111 H159 M137 117 H154 M137 123 H162" />
            <path class="msc-sonar-wireframe__faint" d="M74 57 H80 V112 H74 M170 57 H176 V109 H170" />
            <line class="msc-sonar-wireframe__accent" x1="183" y1="91" x2="208" y2="91" />
            <rect class="msc-sonar-wireframe__mid" x="208" y="85" width="18" height="12" rx="2" />
            <line class="msc-sonar-wireframe__ghost" x1="217" y1="85" x2="217" y2="75" />
            <path class="msc-sonar-wireframe__ghost" d="M52 144 H198 M69 152 H181" />
          </svg>

          <svg class="msc-sonar-wireframe" data-wireframe="network" viewBox="0 0 260 190" focusable="false">
            <rect class="msc-sonar-wireframe__ghost" x="55" y="42" width="158" height="94" rx="4" />
            <line class="msc-sonar-wireframe__ghost" x1="55" y1="42" x2="45" y2="50" />
            <line class="msc-sonar-wireframe__ghost" x1="213" y1="42" x2="203" y2="50" />
            <line class="msc-sonar-wireframe__ghost" x1="213" y1="136" x2="203" y2="144" />
            <rect class="msc-sonar-wireframe__accent" x="45" y="50" width="158" height="94" rx="4" />
            <g class="msc-sonar-wireframe__rotor">
              <circle class="msc-sonar-wireframe__mid" cx="76" cy="94" r="22" />
              <circle class="msc-sonar-wireframe__faint" cx="76" cy="94" r="16" />
              <path d="M76 78 C82 83 85 87 84 94 C78 92 73 88 71 82 Z" />
              <path d="M92 94 C87 100 82 102 76 101 C78 95 82 91 88 88 Z" />
              <path d="M76 110 C70 105 67 101 68 94 C74 96 79 100 81 106 Z" />
              <path d="M60 94 C65 88 70 86 76 87 C74 93 70 97 64 100 Z" />
              <circle class="msc-sonar-wireframe__node" cx="76" cy="94" r="2.4" />
            </g>
            <g class="msc-sonar-wireframe__rotor">
              <circle class="msc-sonar-wireframe__mid" cx="124" cy="94" r="22" />
              <circle class="msc-sonar-wireframe__faint" cx="124" cy="94" r="16" />
              <path d="M124 78 C130 83 133 87 132 94 C126 92 121 88 119 82 Z" />
              <path d="M140 94 C135 100 130 102 124 101 C126 95 130 91 136 88 Z" />
              <path d="M124 110 C118 105 115 101 116 94 C122 96 127 100 129 106 Z" />
              <path d="M108 94 C113 88 118 86 124 87 C122 93 118 97 112 100 Z" />
              <circle class="msc-sonar-wireframe__node" cx="124" cy="94" r="2.4" />
            </g>
            <g class="msc-sonar-wireframe__rotor">
              <circle class="msc-sonar-wireframe__mid" cx="172" cy="94" r="22" />
              <circle class="msc-sonar-wireframe__faint" cx="172" cy="94" r="16" />
              <path d="M172 78 C178 83 181 87 180 94 C174 92 169 88 167 82 Z" />
              <path d="M188 94 C183 100 178 102 172 101 C174 95 178 91 184 88 Z" />
              <path d="M172 110 C166 105 163 101 164 94 C170 96 175 100 177 106 Z" />
              <path d="M156 94 C161 88 166 86 172 87 C170 93 166 97 160 100 Z" />
              <circle class="msc-sonar-wireframe__node" cx="172" cy="94" r="2.4" />
            </g>
            <rect class="msc-sonar-wireframe__mid" x="56" y="59" width="56" height="9" rx="2" />
            <rect class="msc-sonar-wireframe__mid" x="146" y="57" width="43" height="12" rx="2" />
            <path class="msc-sonar-wireframe__faint" d="M210 58 V135 M217 54 V131 M224 51 V128" />
            <path class="msc-sonar-wireframe__accent" d="M60 144 H188" />
            <path class="msc-sonar-wireframe__ghost" d="M36 154 H212 M58 163 H190" />
          </svg>

          <svg class="msc-sonar-wireframe" data-wireframe="building" viewBox="0 0 260 190" focusable="false">
            <g class="msc-sonar-wireframe__mid">
              <polygon points="28,135 49,126 70,135 49,144" />
              <polyline points="28,135 28,150 49,159 70,150 70,135" />
              <line x1="49" y1="144" x2="49" y2="159" />
              <polygon points="74,135 95,126 116,135 95,144" />
              <polyline points="74,135 74,150 95,159 116,150 116,135" />
              <line x1="95" y1="144" x2="95" y2="159" />
              <polygon points="120,135 141,126 162,135 141,144" />
              <polyline points="120,135 120,150 141,159 162,150 162,135" />
              <line x1="141" y1="144" x2="141" y2="159" />
              <polygon points="166,135 187,126 208,135 187,144" />
              <polyline points="166,135 166,150 187,159 208,150 208,135" />
              <line x1="187" y1="144" x2="187" y2="159" />
            </g>
            <path class="msc-sonar-wireframe__ghost" d="M19 168 H219" />
            <path class="msc-sonar-wireframe__accent" d="M43 92 C66 67 91 76 112 58 S159 50 181 66 S213 58 228 42" />
            <path class="msc-sonar-wireframe__mid" d="M43 108 C70 88 91 98 113 83 S160 76 181 91 S208 86 226 74" />
            <circle class="msc-sonar-wireframe__node" cx="43" cy="92" r="3" />
            <circle class="msc-sonar-wireframe__node" cx="112" cy="58" r="3" />
            <circle class="msc-sonar-wireframe__node" cx="181" cy="66" r="3" />
            <circle class="msc-sonar-wireframe__node" cx="228" cy="42" r="3" />
            <circle class="msc-sonar-wireframe__node" cx="43" cy="108" r="2.5" />
            <circle class="msc-sonar-wireframe__node" cx="113" cy="83" r="2.5" />
            <circle class="msc-sonar-wireframe__node" cx="181" cy="91" r="2.5" />
            <circle class="msc-sonar-wireframe__node" cx="226" cy="74" r="2.5" />
            <path class="msc-sonar-wireframe__faint" d="M49 126 V104 M95 126 V94 M141 126 V79 M187 126 V83" />
            <path class="msc-sonar-wireframe__pulse" d="M52 91 C74 72 91 77 111 61" />
            <path class="msc-sonar-wireframe__ghost" d="M130 112 C153 104 167 112 190 104 S222 104 239 91" />
          </svg>

          <svg class="msc-sonar-wireframe" data-wireframe="development" viewBox="0 0 260 190" focusable="false">
            <polygon class="msc-sonar-wireframe__ghost" points="73,40 157,20 207,45 123,66" />
            <polyline class="msc-sonar-wireframe__ghost" points="207,45 207,126 123,149" />
            <polygon class="msc-sonar-wireframe__accent" points="58,53 142,33 192,58 108,79" />
            <polyline class="msc-sonar-wireframe__accent" points="58,53 58,132 108,157 192,136 192,58" />
            <line class="msc-sonar-wireframe__mid" x1="108" y1="79" x2="108" y2="157" />
            <line class="msc-sonar-wireframe__mid" x1="58" y1="132" x2="108" y2="107" />
            <line class="msc-sonar-wireframe__mid" x1="192" y1="136" x2="108" y2="107" />
            <g class="msc-sonar-wireframe__faint">
              <line x1="49" y1="65" x2="37" y2="65" /><line x1="49" y1="78" x2="34" y2="78" /><line x1="49" y1="91" x2="35" y2="91" /><line x1="49" y1="104" x2="34" y2="104" /><line x1="49" y1="117" x2="37" y2="117" />
              <line x1="201" y1="69" x2="216" y2="69" /><line x1="201" y1="83" x2="220" y2="83" /><line x1="201" y1="97" x2="217" y2="97" /><line x1="201" y1="111" x2="220" y2="111" /><line x1="201" y1="125" x2="216" y2="125" />
              <line x1="76" y1="145" x2="70" y2="161" /><line x1="90" y1="152" x2="85" y2="169" /><line x1="122" y1="153" x2="125" y2="170" /><line x1="139" y1="149" x2="144" y2="165" /><line x1="156" y1="145" x2="162" y2="160" />
            </g>
            <polygon class="msc-sonar-wireframe__mid" points="87,70 127,60 153,73 112,84" />
            <path class="msc-sonar-wireframe__accent" d="M88 92 L105 101 M136 80 L121 97 M105 101 L121 110 M121 97 L121 110 M121 110 L121 128" />
            <circle class="msc-sonar-wireframe__node" cx="88" cy="92" r="2.6" />
            <circle class="msc-sonar-wireframe__node" cx="136" cy="80" r="2.6" />
            <circle class="msc-sonar-wireframe__node" cx="105" cy="101" r="2.6" />
            <circle class="msc-sonar-wireframe__node" cx="121" cy="97" r="2.6" />
            <circle class="msc-sonar-wireframe__node" cx="121" cy="110" r="2.8" />
            <circle class="msc-sonar-wireframe__node" cx="121" cy="128" r="3" />
            <rect class="msc-sonar-wireframe__ghost" x="148" y="92" width="20" height="11" rx="1" />
            <rect class="msc-sonar-wireframe__ghost" x="149" y="110" width="16" height="9" rx="1" />
          </svg>

          <svg class="msc-sonar-wireframe" data-wireframe="ecosystem" viewBox="0 0 260 190" focusable="false">
            <polygon class="msc-sonar-wireframe__accent" points="24,127 123,82 232,126 130,174" />
            <polyline class="msc-sonar-wireframe__mid" points="24,127 24,140 130,188 232,140 232,126" />
            <polygon class="msc-sonar-wireframe__mid" points="42,116 72,102 100,114 69,129" />
            <polyline class="msc-sonar-wireframe__mid" points="42,116 42,139 69,151 100,138 100,114" />
            <path class="msc-sonar-wireframe__faint" d="M49 120 L70 110 L93 119 M49 128 L69 118 L93 127" />
            <polygon class="msc-sonar-wireframe__accent" points="104,95 131,83 155,94 128,107" />
            <polyline class="msc-sonar-wireframe__accent" points="104,95 104,134 128,145 155,133 155,94" />
            <line class="msc-sonar-wireframe__faint" x1="112" y1="101" x2="112" y2="131" />
            <line class="msc-sonar-wireframe__faint" x1="121" y1="98" x2="121" y2="135" />
            <line class="msc-sonar-wireframe__faint" x1="139" y1="99" x2="139" y2="136" />
            <polygon class="msc-sonar-wireframe__mid" points="160,109 184,98 207,108 183,120" />
            <polyline class="msc-sonar-wireframe__mid" points="160,109 160,137 183,148 207,136 207,108" />
            <line class="msc-sonar-wireframe__accent" x1="185" y1="99" x2="185" y2="64" />
            <circle class="msc-sonar-wireframe__node" cx="185" cy="61" r="2.6" />
            <path class="msc-sonar-wireframe__pulse" d="M176 70 C181 65 189 65 194 70" />
            <path class="msc-sonar-wireframe__pulse msc-sonar-wireframe__faint" d="M169 77 C178 67 192 67 201 77" />
            <path class="msc-sonar-wireframe__mid" d="M75 142 L111 125 L146 140 L181 123" />
            <circle class="msc-sonar-wireframe__node" cx="75" cy="142" r="2.4" />
            <circle class="msc-sonar-wireframe__node" cx="111" cy="125" r="2.4" />
            <circle class="msc-sonar-wireframe__node" cx="146" cy="140" r="2.4" />
            <circle class="msc-sonar-wireframe__node" cx="181" cy="123" r="2.4" />
            <path class="msc-sonar-wireframe__ghost" d="M28 153 C63 142 84 159 116 151 S170 143 202 151 S224 158 239 153" />
            <path class="msc-sonar-wireframe__ghost" d="M38 162 C68 153 90 169 119 161 S170 153 198 161 S220 168 232 164" />
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