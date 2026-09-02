(() => {
  const GLOSSARY_URL = '/pages/learn-bitcoin?view=msc-learn-glossary';
  const CATEGORY_URLS = [
    '/pages/learn-bitcoin-basics',
    '/pages/learn-bitcoin-network',
    '/pages/learn-building-on-bitcoin',
    '/pages/learn-bitcoin-development',
    '/pages/learn-bitcoin-ecosystem'
  ];

  const termAnchor = (value) => `term-${String(value || '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;

  const addStyles = () => {
    if (document.getElementById('MscLearnHomeRefinementStyles')) return;
    const style = document.createElement('style');
    style.id = 'MscLearnHomeRefinementStyles';
    style.textContent = `
      .msc-learn .msc-learn-index-block {
        margin-top: 0 !important;
        padding-top: clamp(3rem, 4vw, 4.25rem) !important;
        padding-bottom: clamp(1.1rem, 1.5vw, 1.5rem) !important;
      }
      .msc-learn .msc-learn-glossary-block {
        padding-top: clamp(1rem, 1.5vw, 1.35rem) !important;
        padding-bottom: clamp(3.5rem, 5vw, 4.75rem) !important;
      }
      .msc-learn-topic__column li {
        position: relative;
      }
      .msc-learn-topic__item-link {
        display: inline-flex;
        align-items: baseline;
        gap: .42rem;
        color: inherit;
        text-decoration: none;
        text-underline-offset: .18em;
      }
      .msc-learn-topic__item-link::after {
        content: '→';
        color: var(--msc-sand);
        font-size: .88em;
        opacity: 0;
        transform: translateX(-.2rem);
        transition: opacity .18s ease, transform .18s ease;
      }
      .msc-learn-topic__item-link:hover,
      .msc-learn-topic__item-link:focus-visible {
        color: var(--msc-paper-soft);
        text-decoration: underline;
      }
      .msc-learn-topic__item-link:hover::after,
      .msc-learn-topic__item-link:focus-visible::after {
        opacity: 1;
        transform: translateX(0);
      }
      .msc-learn-glossary-more-wrap {
        display: flex;
        justify-content: flex-start;
        margin-top: 1.35rem;
      }
      .msc-learn-glossary-more {
        display: inline-flex;
        align-items: center;
        gap: .55rem;
        min-height: 4.4rem;
        padding: 1rem 1.35rem;
        border: 1px solid rgba(212, 190, 153, .34);
        border-radius: 14px;
        color: var(--msc-paper-soft);
        background: rgba(255,255,255,.045);
        font-weight: 760;
        text-decoration: none;
        transition: border-color .18s ease, background-color .18s ease, transform .18s ease;
      }
      .msc-learn-glossary-more:hover,
      .msc-learn-glossary-more:focus-visible {
        border-color: rgba(212, 190, 153, .62);
        background: rgba(255,255,255,.075);
        transform: translateY(-1px);
      }
      .msc-glossary-item[data-msc-glossary-linked='true'] {
        position: relative;
        transition: border-color .18s ease, background-color .18s ease, transform .18s ease;
      }
      .msc-glossary-item[data-msc-glossary-linked='true']:hover,
      .msc-glossary-item[data-msc-glossary-linked='true']:focus-within {
        border-color: rgba(212, 190, 153, .42);
        background: rgba(255,255,255,.06);
        transform: translateY(-1px);
      }
      .msc-glossary-item__overlay-link {
        position: absolute;
        inset: 0;
        z-index: 2;
        border-radius: inherit;
      }
      .msc-glossary-item__overlay-link:focus-visible {
        outline: 2px solid var(--msc-sand);
        outline-offset: 3px;
      }
      .msc-glossary-item__overlay-link span {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      @media screen and (max-width: 640px) {
        .msc-learn .msc-learn-index-block {
          padding-top: 2.5rem !important;
          padding-bottom: .9rem !important;
        }
        .msc-learn .msc-learn-glossary-block {
          padding-top: .9rem !important;
          padding-bottom: 3rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const linkKnowledgeIndex = (learn) => {
    const groups = Array.from(learn.querySelectorAll('.msc-learn-index .msc-learn-topic')).slice(0, 5);
    if (!groups.length) return;

    let guideNumber = 1;
    groups.forEach((group, groupIndex) => {
      const categoryLink = group.querySelector('.msc-learn-topic__guide-link');
      let categoryPath = CATEGORY_URLS[groupIndex];
      if (categoryLink) {
        try {
          categoryPath = new URL(categoryLink.getAttribute('href'), window.location.origin).pathname || categoryPath;
        } catch (error) {
          // Keep the locked category fallback when Shopify returns a non-standard URL.
        }
      }

      group.querySelectorAll('.msc-learn-topic__column li').forEach((item) => {
        if (item.querySelector('.msc-learn-topic__item-link')) {
          guideNumber += 1;
          return;
        }

        const guideId = String(guideNumber).padStart(3, '0');
        const label = item.textContent.trim();
        const link = document.createElement('a');
        link.className = 'msc-learn-topic__item-link';
        link.href = `${categoryPath}?view=msc-learn-guide-${guideId}`;
        link.dataset.mscGuideId = `MSC-GUIDE-${guideId}`;
        link.textContent = label;
        item.replaceChildren(link);
        guideNumber += 1;
      });
    });
  };

  const linkGlossaryPreview = (learn) => {
    const block = learn.querySelector('.msc-learn-glossary-block');
    const grid = block?.querySelector('.msc-glossary-grid');
    if (!block || !grid) return;

    grid.querySelectorAll('.msc-glossary-item').forEach((card) => {
      if (card.dataset.mscGlossaryLinked === 'true') return;
      const heading = card.querySelector('h3');
      const term = heading?.textContent?.trim();
      if (!term) return;

      if (heading) heading.textContent = term;
      card.dataset.mscGlossaryLinked = 'true';
      const link = document.createElement('a');
      link.className = 'msc-glossary-item__overlay-link';
      link.href = `${GLOSSARY_URL}#${termAnchor(term)}`;
      link.setAttribute('aria-label', `View ${term} in the Bitcoin Glossary`);
      link.innerHTML = `<span>View ${term} in the Bitcoin Glossary</span>`;
      card.appendChild(link);
    });

    if (!block.querySelector('.msc-learn-glossary-more')) {
      const wrap = document.createElement('div');
      wrap.className = 'msc-learn-glossary-more-wrap';
      const link = document.createElement('a');
      link.className = 'msc-learn-glossary-more';
      link.href = GLOSSARY_URL;
      link.innerHTML = 'View Full Glossary <span aria-hidden="true">→</span>';
      wrap.appendChild(link);
      grid.insertAdjacentElement('afterend', wrap);
    }
  };

  const init = (root = document) => {
    const learn = root.querySelector?.('.msc-learn') || document.querySelector('.msc-learn');
    if (!learn) return;
    addStyles();
    linkKnowledgeIndex(learn);
    linkGlossaryPreview(learn);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
