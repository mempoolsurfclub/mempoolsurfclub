(() => {
  const STORAGE_KEY = 'mscLearnProgressV1';

  const padGuideNumber = (value) => String(value).padStart(3, '0');

  const getLocalHubState = (hubId) => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && parsed.hubs ? parsed.hubs[hubId] || null : null;
    } catch (error) {
      return null;
    }
  };

  const getHubState = (hubId) => {
    const provider = window.MSCLearnProgress;

    if (provider && typeof provider.getHubState === 'function') {
      try {
        const provided = provider.getHubState(hubId);
        if (provided && typeof provided === 'object' && typeof provided.then !== 'function') {
          return provided;
        }
      } catch (error) {
        // Fall back to device-local progress until account-backed progress is connected.
      }
    }

    return getLocalHubState(hubId) || {};
  };

  const getGuideTitle = (page, guideId) => {
    const card = page.querySelector(`.msc-learn-guide-card[data-msc-guide-id="${guideId}"] h3`);
    return card ? card.textContent.trim() : guideId;
  };

  const renderWidget = (widget, page) => {
    const hubId = widget.dataset.hubId;
    const nodes = Array.from(widget.querySelectorAll('[data-msc-progress-guide]'));
    const guideIds = nodes.map((node) => node.dataset.mscProgressGuide);
    const total = guideIds.length || Number(widget.dataset.totalGuides) || 0;
    const state = getHubState(hubId);
    const completedSource = state.completedGuideIds || state.completed || [];
    const completed = new Set(
      Array.isArray(completedSource)
        ? completedSource.filter((guideId) => guideIds.includes(guideId))
        : []
    );

    let currentGuideId = guideIds.includes(state.currentGuideId) ? state.currentGuideId : null;
    if (!currentGuideId || completed.has(currentGuideId)) {
      currentGuideId = guideIds.find((guideId) => !completed.has(guideId)) || null;
    }

    const completedCount = completed.size;
    const remaining = Math.max(total - completedCount, 0);
    const percentage = total ? Math.round((completedCount / total) * 100) : 0;
    const currentIndex = currentGuideId ? guideIds.indexOf(currentGuideId) + 1 : total;
    const isComplete = total > 0 && completedCount === total;

    nodes.forEach((node) => {
      const guideId = node.dataset.mscProgressGuide;
      node.classList.toggle('is-complete', completed.has(guideId));
      node.classList.toggle('is-current', !isComplete && guideId === currentGuideId);
    });

    const count = widget.querySelector('[data-msc-progress-count]');
    const remainingLabel = widget.querySelector('[data-msc-progress-remaining]');
    const completedLabel = widget.querySelector('[data-msc-progress-completed]');
    const currentLabel = widget.querySelector('[data-msc-progress-current-label]');
    const currentNumber = widget.querySelector('[data-msc-progress-current-number]');
    const currentTitle = widget.querySelector('[data-msc-progress-current-title]');
    const position = widget.querySelector('[data-msc-progress-position]');
    const percent = widget.querySelector('[data-msc-progress-percent]');
    const progressbar = widget.querySelector('[role="progressbar"]');

    if (count) count.textContent = String(completedCount).padStart(2, '0');
    if (remainingLabel) remainingLabel.textContent = `${remaining} remaining`;
    if (completedLabel) completedLabel.textContent = `${completedCount} complete`;
    if (percent) percent.textContent = `${percentage}% complete`;

    if (isComplete) {
      if (currentLabel) currentLabel.textContent = 'Category complete';
      if (currentNumber) currentNumber.textContent = '16';
      if (currentTitle) currentTitle.textContent = 'Bitcoin Basics complete';
      if (position) position.textContent = 'Complete';
    } else {
      if (currentLabel) currentLabel.textContent = completedCount === 0 ? 'Start here' : 'Current guide';
      if (currentNumber) currentNumber.textContent = padGuideNumber(currentIndex);
      if (currentTitle) currentTitle.textContent = getGuideTitle(page, currentGuideId);
      if (position) position.textContent = `Position ${padGuideNumber(currentIndex)}`;
    }

    if (progressbar) {
      progressbar.setAttribute('aria-valuenow', String(completedCount));
      progressbar.setAttribute('aria-valuemax', String(total));
      progressbar.setAttribute('aria-valuetext', `${completedCount} of ${total} guides complete`);
    }
  };

  const mountWidget = (template) => {
    const scope = template.closest('.shopify-section') || document;
    const page = scope.querySelector('.msc-learn-page[data-msc-registry-id="MSC-HUB-BASICS"]');
    const header = page ? page.querySelector('.msc-learn-page__header') : null;

    if (!page || !header || header.querySelector('[data-msc-learn-progress]')) return;

    header.appendChild(template.content.cloneNode(true));
    const widget = header.querySelector('[data-msc-learn-progress]');
    if (widget) renderWidget(widget, page);
  };

  const init = (root = document) => {
    root.querySelectorAll('template[data-msc-learn-progress-template]').forEach(mountWidget);
  };

  const refresh = () => {
    document.querySelectorAll('[data-msc-learn-progress]').forEach((widget) => {
      const page = widget.closest('.msc-learn-page');
      if (page) renderWidget(widget, page);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', (event) => init(event.target));
  document.addEventListener('msc:learn-progress', refresh);
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) refresh();
  });
})();
