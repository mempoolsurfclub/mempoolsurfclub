(() => {
  const addStyles = () => {
    if (document.getElementById('MscLearnIndexPolishStyles')) return;

    const style = document.createElement('style');
    style.id = 'MscLearnIndexPolishStyles';
    style.textContent = `
      .msc-learn .msc-learn-index-block .msc-section-header {
        max-width: min(72rem, 100%);
        margin: 0 auto .65rem !important;
        text-align: center;
      }

      .msc-learn .msc-learn-index-block .msc-section-kicker {
        margin: 0 0 .55rem !important;
        color: var(--msc-sand) !important;
        font-size: clamp(2.9rem, 4.2vw, 4.9rem) !important;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -.045em !important;
      }

      .msc-learn .msc-learn-index-block .msc-section-title {
        margin: 0 !important;
        color: var(--msc-paper-soft) !important;
        font-size: clamp(1.7rem, 2vw, 2.2rem) !important;
        font-weight: 650;
        line-height: 1.28;
        letter-spacing: -.02em !important;
      }

      .msc-learn .msc-learn-index-block .msc-section-header__copy {
        display: none !important;
      }

      .msc-learn .msc-learn-index-block .msc-learn-topic__preview-label {
        display: none !important;
      }

      .msc-learn .msc-learn-index-block .msc-learn-topic__item-link {
        gap: 0 !important;
      }

      .msc-learn .msc-learn-index-block .msc-learn-topic__item-link::after,
      .msc-learn .msc-learn-index-block .msc-learn-topic__item-link:hover::after,
      .msc-learn .msc-learn-index-block .msc-learn-topic__item-link:focus-visible::after {
        content: none !important;
        display: none !important;
        opacity: 0 !important;
        transform: none !important;
      }

      @media screen and (max-width: 640px) {
        .msc-learn .msc-learn-index-block .msc-section-header {
          margin-bottom: .55rem !important;
        }

        .msc-learn .msc-learn-index-block .msc-section-kicker {
          font-size: clamp(2.5rem, 9vw, 3.4rem) !important;
        }

        .msc-learn .msc-learn-index-block .msc-section-title {
          font-size: 1.55rem !important;
        }
      }
    `;

    document.head.appendChild(style);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addStyles, { once: true });
  } else {
    addStyles();
  }

  document.addEventListener('shopify:section:load', addStyles);
})();
