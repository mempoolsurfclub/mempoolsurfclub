(() => {
  const GLOSSARY_URL = '/pages/learn-bitcoin?view=msc-learn-glossary';
  const sourceScript = document.currentScript;

  const loadProgressCore = () => {
    if (!sourceScript?.src || document.querySelector('script[data-msc-learn-progress-core]')) return;
    const sourceUrl = new URL(sourceScript.src);
    const coreUrl = new URL('msc-learn-hub-progress-core.js', sourceUrl);
    coreUrl.search = sourceUrl.search;

    const script = document.createElement('script');
    script.src = coreUrl.href;
    script.async = false;
    script.dataset.mscLearnProgressCore = 'true';
    document.head.appendChild(script);
  };

  const termAnchor = (value) => `term-${String(value || '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;

  const addGlossaryLinkStyles = () => {
    if (document.getElementById('MscGuideGlossaryLinkStyles')) return;
    const style = document.createElement('style');
    style.id = 'MscGuideGlossaryLinkStyles';
    style.textContent = `
      .msc-learn-page[data-msc-registry-id^='MSC-GUIDE-'] .msc-learn-term[data-msc-glossary-href] {
        cursor: pointer;
        transition: border-color .18s ease, background-color .18s ease, transform .18s ease;
      }
      .msc-learn-page[data-msc-registry-id^='MSC-GUIDE-'] .msc-learn-term[data-msc-glossary-href]:hover,
      .msc-learn-page[data-msc-registry-id^='MSC-GUIDE-'] .msc-learn-term[data-msc-glossary-href]:focus-visible {
        border-color: rgba(212,190,153,.5);
        background: rgba(212,190,153,.075);
        transform: translateY(-1px);
        outline: none;
      }
      .msc-learn-page[data-msc-registry-id^='MSC-GUIDE-'] .msc-learn-term[data-msc-glossary-href] dt::after {
        content: '  ↗';
        color: var(--msc-sand);
        font-size: .78em;
        opacity: .78;
      }
      .msc-learn-page[data-msc-registry-id^='MSC-GUIDE-'] .msc-learn-term[data-msc-glossary-href]:focus-visible {
        box-shadow: 0 0 0 2px var(--msc-sand);
      }
    `;
    document.head.appendChild(style);
  };

  const activateGuideGlossaryLinks = (root = document) => {
    const pages = root.querySelectorAll?.('.msc-learn-page[data-msc-registry-id^="MSC-GUIDE-"]') || [];
    pages.forEach((page) => {
      page.querySelectorAll('.msc-learn-key-terms .msc-learn-term').forEach((card) => {
        if (card.dataset.mscGlossaryHref) return;
        const term = card.querySelector('dt')?.textContent?.trim();
        if (!term) return;
        const href = `${GLOSSARY_URL}#${termAnchor(term)}`;
        card.dataset.mscGlossaryHref = href;
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View ${term} in the Bitcoin Glossary`);

        card.addEventListener('click', (event) => {
          if (event.target.closest('a, button, input, select, textarea')) return;
          window.location.href = href;
        });
        card.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter') return;
          event.preventDefault();
          window.location.href = href;
        });
      });
    });
  };

  const initGlossaryLinks = (root = document) => {
    addGlossaryLinkStyles();
    activateGuideGlossaryLinks(root);
  };

  loadProgressCore();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initGlossaryLinks(), { once: true });
  } else {
    initGlossaryLinks();
  }

  document.addEventListener('shopify:section:load', (event) => initGlossaryLinks(event.target));
})();
