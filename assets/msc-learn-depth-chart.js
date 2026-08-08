(() => {
  const init = () => {
    const learn = document.querySelector('.msc-learn');
    if (!learn) return;

    const chart = learn.querySelector('.msc-depth-chart');
    const field = chart?.querySelector('.msc-depth-chart__field');
    const headerMeta = chart?.querySelector('.msc-depth-chart__header span:last-child');
    const groups = Array.from(learn.querySelectorAll('.msc-learn-topic'));

    if (!chart || !field || groups.length < 5) return;
    if (chart.dataset.mscDepthEnhanced === 'true') return;

    const regionMeta = [
      { label: 'Surface', depth: '00m', key: 'basics' },
      { label: 'Shallow', depth: '25m', key: 'network' },
      { label: 'Deep', depth: '50m', key: 'building' },
      { label: 'Trench', depth: '100m', key: 'development' },
      { label: 'Open ocean', depth: 'Field', key: 'ecosystem' }
    ];

    const regions = groups.slice(0, 5).map((group, index) => {
      const title = group.querySelector('summary .msc-learn-topic__summary-copy > span')?.textContent?.trim() || `Learn region ${index + 1}`;
      const topics = Array.from(group.querySelectorAll('.msc-learn-topic__column h3'))
        .map((node) => node.textContent.trim())
        .filter(Boolean);

      return {
        group,
        title,
        topics,
        ...regionMeta[index]
      };
    });

    const map = document.createElement('div');
    map.className = 'msc-depth-map';
    map.setAttribute('role', 'navigation');
    map.setAttribute('aria-label', 'Bitcoin learning depth map');

    map.innerHTML = `
      <svg class="msc-depth-map__contours" viewBox="0 0 720 480" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M-20 62 C96 18 174 110 286 62 S502 16 748 70" />
        <path d="M-30 154 C110 106 196 212 326 154 S540 104 750 168" />
        <path d="M-20 252 C92 204 214 318 364 248 S580 194 752 270" />
        <path d="M-30 350 C126 294 242 418 402 346 S602 288 754 374" />
        <path d="M-20 442 C126 398 272 486 454 428 S626 390 748 448" />
      </svg>
    `;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    regions.forEach((region, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'msc-depth-map__region';
      button.dataset.region = region.key;
      button.setAttribute('aria-label', `Open ${region.title} in the knowledge index`);

      const topicsText = region.topics.join(' · ');
      button.innerHTML = `
        <span class="msc-depth-map__marker">
          ${String(index + 1).padStart(2, '0')}
          <strong>${region.label}</strong>
        </span>
        <span class="msc-depth-map__content">
          <span class="msc-depth-map__title"></span>
          <span class="msc-depth-map__topics"></span>
        </span>
        <span class="msc-depth-map__depth">${region.depth}</span>
      `;

      button.querySelector('.msc-depth-map__title').textContent = region.title;
      button.querySelector('.msc-depth-map__topics').textContent = topicsText;

      button.addEventListener('click', () => {
        region.group.open = true;
        region.group.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          block: 'start'
        });

        const summary = region.group.querySelector('summary');
        window.setTimeout(() => summary?.focus({ preventScroll: true }), prefersReducedMotion.matches ? 0 : 350);
      });

      map.appendChild(button);
    });

    field.replaceChildren(map);
    chart.dataset.mscDepthEnhanced = 'true';
    if (headerMeta) headerMeta.textContent = '4 depths + open ocean';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
