(() => {
  const LEARN_URL = '/pages/learn-bitcoin';

  const termAnchor = (value) => `term-${String(value || '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;

  const addStyles = () => {
    if (document.getElementById('MscLearnGlossaryStyles')) return;
    const style = document.createElement('style');
    style.id = 'MscLearnGlossaryStyles';
    style.textContent = `
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-letters {
        position: sticky;
        top: 1rem;
        z-index: 8;
        gap: .55rem;
        padding: .85rem;
        border: 1px solid rgba(212,190,153,.2);
        border-radius: 16px;
        background: rgba(16,40,45,.9);
        box-shadow: 0 12px 30px rgba(4,17,23,.18);
        backdrop-filter: blur(14px);
      }
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-letter {
        color: rgba(251,248,239,.78);
        text-decoration: none;
        transition: color .18s ease, border-color .18s ease, background-color .18s ease;
      }
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-letter:hover,
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-letter:focus-visible {
        color: var(--msc-paper-soft);
        border-color: rgba(212,190,153,.55);
        background: rgba(212,190,153,.1);
        outline: none;
      }
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-group {
        scroll-margin-top: 8rem;
      }
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-term {
        scroll-margin-top: 8rem;
        transition: border-color .18s ease, background-color .18s ease, box-shadow .18s ease;
      }
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-term:target,
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-term[data-msc-targeted='true'] {
        border-color: rgba(212,190,153,.72);
        background: rgba(212,190,153,.095);
        box-shadow: 0 0 0 2px rgba(212,190,153,.12), 0 18px 48px rgba(4,17,23,.18);
      }
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-term dl {
        display: none;
      }
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-term h3 {
        margin-bottom: .7rem;
      }
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-breadcrumbs a {
        color: inherit;
        text-decoration: none;
      }
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-breadcrumbs a:hover,
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-breadcrumbs a:focus-visible {
        color: var(--msc-sand);
        text-decoration: underline;
        text-underline-offset: .2em;
      }
      .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-prev-next {
        display: none;
      }
      @media screen and (max-width: 640px) {
        .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-letters {
          top: .5rem;
          overflow-x: auto;
          flex-wrap: nowrap;
          justify-content: flex-start;
          scrollbar-width: thin;
        }
        .msc-learn-page[data-msc-registry-id='MSC-GLOSSARY-001'] .msc-learn-glossary-letter {
          flex: 0 0 auto;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const activateBreadcrumb = (root) => {
    const firstCrumb = root.querySelector('.msc-learn-breadcrumbs li:first-child');
    const label = firstCrumb?.textContent?.trim() || 'Learn';
    if (!firstCrumb || firstCrumb.querySelector('a')) return;
    const link = document.createElement('a');
    link.href = LEARN_URL;
    link.textContent = label;
    firstCrumb.replaceChildren(link);
  };

  const activateLetters = (root) => {
    root.querySelectorAll('.msc-learn-glossary-group[data-msc-letter-group]').forEach((group) => {
      group.id = `letter-${group.dataset.mscLetterGroup}`;
    });

    root.querySelectorAll('.msc-learn-glossary-letter[data-msc-letter]').forEach((control) => {
      if (control.tagName === 'A') return;
      const letter = control.dataset.mscLetter;
      const link = document.createElement('a');
      link.className = control.className;
      link.dataset.mscLetter = letter;
      link.href = `#letter-${letter}`;
      link.innerHTML = control.innerHTML;
      link.setAttribute('aria-label', `Jump to glossary terms beginning with ${letter.toUpperCase()}`);
      control.replaceWith(link);
    });
  };

  const activateTerms = (root) => {
    root.querySelectorAll('.msc-learn-glossary-term[data-msc-term]').forEach((card) => {
      const term = card.dataset.mscTerm?.trim();
      if (!term) return;
      const id = termAnchor(term);
      card.id = id;
      card.removeAttribute('aria-disabled');
      card.setAttribute('tabindex', '-1');
      card.setAttribute('aria-labelledby', `${id}-title`);
      const heading = card.querySelector('h3');
      if (heading) heading.id = `${id}-title`;
      card.querySelectorAll('.msc-learn-preview-note').forEach((note) => note.remove());
    });
  };

  const removePreviewLanguage = (root) => {
    root.removeAttribute('data-msc-preview-only');
    root.dataset.mscPublicRuntime = 'true';
    const headerNote = root.querySelector('.msc-learn-page__header .msc-learn-preview-note');
    if (headerNote) headerNote.remove();

    root.querySelectorAll('.msc-learn-article__section p').forEach((paragraph) => {
      if (paragraph.textContent.includes('Every term link, search result, letter control, category link, and return action remains inactive')) {
        paragraph.remove();
      }
    });
  };

  const focusHashTarget = (root) => {
    if (!window.location.hash) return;
    let target = null;
    try {
      target = root.querySelector(window.location.hash);
    } catch (error) {
      return;
    }
    if (!target) return;
    root.querySelectorAll('[data-msc-targeted="true"]').forEach((node) => delete node.dataset.mscTargeted);
    target.dataset.mscTargeted = 'true';
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
      if (typeof target.focus === 'function') target.focus({ preventScroll: true });
    });
  };

  const init = (scope = document) => {
    const root = scope.querySelector?.('.msc-learn-page[data-msc-registry-id="MSC-GLOSSARY-001"]') ||
      document.querySelector('.msc-learn-page[data-msc-registry-id="MSC-GLOSSARY-001"]');
    if (!root) return;
    addStyles();
    removePreviewLanguage(root);
    activateBreadcrumb(root);
    activateLetters(root);
    activateTerms(root);
    focusHashTarget(root);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  } else {
    init();
  }

  window.addEventListener('hashchange', () => init());
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
