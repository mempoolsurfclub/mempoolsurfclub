(() => {
  const CARD_COPY = Object.freeze({
    ordinals: 'Explore Ordinals and inscriptions',
    runes: 'Explore the Runes ecosystem',
    wallets: 'Explore wallets and signing tools',
    marketplaces: 'Explore Bitcoin-native marketplaces',
    mining: 'Explore Bitcoin mining',
    payments: 'Explore Bitcoin payments',
    exchanges: 'Explore Bitcoin exchanges',
    network: 'Explore Bitcoin network infrastructure',
  });

  document.querySelectorAll('[data-atlas-region-card-routes]').forEach((registry) => {
    const atlas = document.querySelector('[data-atlas]');
    const viewport = atlas?.querySelector('[data-atlas-viewport]');
    if (!atlas || !viewport) return;

    const routes = new Map(
      Object.keys(CARD_COPY).map((slug) => [
        slug,
        registry.getAttribute(`data-atlas-region-card-route-${slug}`) || '',
      ])
    );

    const labels = new Map(
      [...atlas.querySelectorAll('[data-atlas-target]')].map((target) => [
        target.dataset.atlasTarget,
        target.querySelector('strong')?.textContent?.trim() || target.dataset.atlasTarget,
      ])
    );

    const card = document.createElement('a');
    card.className = 'msc-atlas-region-card';
    card.hidden = true;
    card.setAttribute('data-atlas-region-card', '');

    const text = document.createElement('span');
    text.className = 'msc-atlas-region-card__text';

    const title = document.createElement('strong');
    title.className = 'msc-atlas-region-card__title';

    const subtitle = document.createElement('span');
    subtitle.className = 'msc-atlas-region-card__subtitle';

    const arrow = document.createElement('span');
    arrow.className = 'msc-atlas-region-card__arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';

    text.append(title, subtitle);
    card.append(text, arrow);
    viewport.appendChild(card);

    const hide = () => {
      card.hidden = true;
      card.removeAttribute('href');
      card.removeAttribute('aria-label');
      card.removeAttribute('aria-disabled');
      card.removeAttribute('tabindex');
      card.classList.remove('is-disabled');
      delete card.dataset.atlasRegionCardRegion;
    };

    const render = () => {
      const slug = atlas.dataset.atlasActive || '';
      const mode = atlas.dataset.atlasMode || '';

      if (!slug || mode !== 'locked' || !Object.hasOwn(CARD_COPY, slug)) {
        hide();
        return;
      }

      const label = labels.get(slug) || slug.toUpperCase();
      const route = routes.get(slug) || '';

      title.textContent = label;
      subtitle.textContent = CARD_COPY[slug];
      card.dataset.atlasRegionCardRegion = slug;
      card.hidden = false;
      card.classList.toggle('is-disabled', !route);

      if (route) {
        card.href = route;
        card.removeAttribute('aria-disabled');
        card.removeAttribute('tabindex');
        card.setAttribute('aria-label', `Open ${label} Explore page`);
      } else {
        card.removeAttribute('href');
        card.setAttribute('aria-disabled', 'true');
        card.setAttribute('tabindex', '-1');
        card.setAttribute('aria-label', `${label} Explore page not published yet`);
      }
    };

    const observer = new MutationObserver(render);
    observer.observe(atlas, {
      attributes: true,
      attributeFilter: ['data-atlas-active', 'data-atlas-mode'],
    });

    card.addEventListener('click', (event) => {
      if (card.classList.contains('is-disabled')) event.preventDefault();
      event.stopPropagation();
    });

    render();
  });
})();
