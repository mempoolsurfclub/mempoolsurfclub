(() => {
  const STORAGE_KEY = 'mscLearnProgressV1';
  const HUB_RANGES = {
    'MSC-HUB-BASICS': [1, 16],
    'MSC-HUB-NETWORK': [17, 32],
    'MSC-HUB-BUILDING': [33, 48],
    'MSC-HUB-DEVELOPMENT': [49, 64],
    'MSC-HUB-ECOSYSTEM': [65, 80],
  };
  const HUB_TRANSITIONS = {
    'MSC-HUB-BASICS': {
      eyebrow: 'Next category',
      title: 'The Bitcoin Network',
      href: '/pages/learn-bitcoin-network',
      cta: 'Continue to the Network',
      readyLabel: 'Ready for The Bitcoin Network',
    },
    'MSC-HUB-NETWORK': {
      eyebrow: 'Next category',
      title: 'Building on Bitcoin',
      href: '/pages/learn-building-on-bitcoin',
      cta: 'Continue to Building on Bitcoin',
      readyLabel: 'Ready for Building on Bitcoin',
    },
    'MSC-HUB-BUILDING': {
      eyebrow: 'Next category',
      title: 'Bitcoin Development',
      href: '/pages/learn-bitcoin-development',
      cta: 'Continue to Development',
      readyLabel: 'Ready for Bitcoin Development',
    },
    'MSC-HUB-DEVELOPMENT': {
      eyebrow: 'Next category',
      title: 'Bitcoin Ecosystem',
      href: '/pages/learn-bitcoin-ecosystem',
      cta: 'Continue to the Ecosystem',
      readyLabel: 'Ready for Bitcoin Ecosystem',
    },
    'MSC-HUB-ECOSYSTEM': {
      eyebrow: 'Learn sequence',
      title: 'Return to Learn',
      href: '/pages/learn-bitcoin',
      cta: 'Open the Learn Index',
      readyLabel: 'Learn sequence complete',
    },
  };

  const padGuideNumber = (value) => String(value).padStart(3, '0');
  const toGuideId = (value) => `MSC-GUIDE-${padGuideNumber(value)}`;

  const readLocalProgress = () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return { hubs: {} };
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object'
        ? { ...parsed, hubs: parsed.hubs && typeof parsed.hubs === 'object' ? parsed.hubs : {} }
        : { hubs: {} };
    } catch (error) {
      return { hubs: {} };
    }
  };

  const getLocalHubState = (hubId) => readLocalProgress().hubs[hubId] || null;

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

  const saveHubState = (hubId, nextState) => {
    const completedGuideIds = Array.isArray(nextState.completedGuideIds)
      ? Array.from(new Set(nextState.completedGuideIds.filter((guideId) => typeof guideId === 'string')))
      : [];
    const state = {
      ...nextState,
      completedGuideIds,
      updatedAt: new Date().toISOString(),
    };
    const progress = readLocalProgress();

    progress.hubs[hubId] = state;
    progress.updatedAt = state.updatedAt;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      // Continue with the in-page state if local storage is unavailable.
    }

    const provider = window.MSCLearnProgress;
    if (provider && typeof provider.setHubState === 'function') {
      try {
        provider.setHubState(hubId, state);
      } catch (error) {
        // Device-local progress remains the fallback until account writes are available.
      }
    }

    document.dispatchEvent(
      new CustomEvent('msc:learn-progress', {
        detail: { hubId, state },
      })
    );

    return state;
  };

  const getHubIdForGuide = (guideId) => {
    const match = /^MSC-GUIDE-(\d{3})$/.exec(guideId || '');
    if (!match) return null;
    const guideNumber = Number(match[1]);

    return (
      Object.entries(HUB_RANGES).find(([, [start, end]]) => guideNumber >= start && guideNumber <= end)?.[0] ||
      null
    );
  };

  const getHubGuideIds = (hubId) => {
    const range = HUB_RANGES[hubId];
    if (!range) return [];
    const [start, end] = range;
    return Array.from({ length: end - start + 1 }, (_, index) => toGuideId(start + index));
  };

  const getGuideTitle = (page, guideId) => {
    const card = page.querySelector(`.msc-learn-guide-card[data-msc-guide-id="${guideId}"] h3`);
    return card ? card.textContent.trim() : guideId;
  };

  const getHubTitle = (page) => {
    const heading = page.querySelector('.msc-learn-page__header h1');
    return heading ? heading.textContent.trim() : 'Category';
  };

  const getResolvedProgress = (hubId, guideIds) => {
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

    return { completed, currentGuideId };
  };

  const renderWidget = (widget, page) => {
    const hubId = widget.dataset.hubId;
    const nodes = Array.from(widget.querySelectorAll('[data-msc-progress-guide]'));
    const guideIds = nodes.map((node) => node.dataset.mscProgressGuide);
    const total = guideIds.length || Number(widget.dataset.totalGuides) || 0;
    const { completed, currentGuideId } = getResolvedProgress(hubId, guideIds);

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
      if (currentNumber) currentNumber.textContent = padGuideNumber(total);
      if (currentTitle) currentTitle.textContent = `${getHubTitle(page)} complete`;
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
    const hubId = template.dataset.mscLearnProgressTemplate;
    const page = hubId ? scope.querySelector(`.msc-learn-page[data-msc-registry-id="${hubId}"]`) : null;
    const header = page ? page.querySelector('.msc-learn-page__header') : null;

    if (!page || !header || header.querySelector('[data-msc-learn-progress]')) return;

    header.appendChild(template.content.cloneNode(true));
    const widget = header.querySelector('[data-msc-learn-progress]');
    if (widget) renderWidget(widget, page);
  };

  const renderTransition = (transition) => {
    const hubId = transition.dataset.hubId;
    const config = HUB_TRANSITIONS[hubId];
    const nodes = Array.from(transition.querySelectorAll('[data-msc-transition-guide]'));
    const guideIds = nodes.map((node) => node.dataset.mscTransitionGuide);
    const total = guideIds.length;
    const { completed, currentGuideId } = getResolvedProgress(hubId, guideIds);
    const completedCount = completed.size;
    const remaining = Math.max(total - completedCount, 0);
    const isComplete = total > 0 && completedCount === total;

    nodes.forEach((node) => {
      const guideId = node.dataset.mscTransitionGuide;
      node.classList.toggle('is-complete', completed.has(guideId));
      node.classList.toggle('is-current', !isComplete && guideId === currentGuideId);
    });

    transition.querySelectorAll('[data-msc-transition-group]').forEach((group) => {
      const groupNodes = Array.from(group.querySelectorAll('[data-msc-transition-guide]'));
      const groupCompleted = groupNodes.filter((node) => completed.has(node.dataset.mscTransitionGuide)).length;
      const count = group.querySelector('[data-msc-transition-group-count]');
      if (count) count.textContent = `${groupCompleted}/${groupNodes.length}`;
    });

    const count = transition.querySelector('[data-msc-transition-count]');
    const remainingLabel = transition.querySelector('[data-msc-transition-remaining]');
    const status = transition.querySelector('[data-msc-transition-status]');

    if (count) count.textContent = `${String(completedCount).padStart(2, '0')} / ${total}`;
    if (remainingLabel) {
      remainingLabel.textContent = isComplete
        ? 'All guides complete'
        : `${remaining} guide${remaining === 1 ? '' : 's'} remaining`;
    }
    if (status) status.textContent = isComplete ? config.readyLabel : 'Continue when ready';

    transition.classList.toggle('is-ready', isComplete);
  };

  const mountTransition = (page) => {
    if (page.querySelector('[data-msc-learn-transition]')) return;

    const hubId = page.dataset.mscRegistryId;
    const config = HUB_TRANSITIONS[hubId];
    const widget = page.querySelector('[data-msc-learn-progress]');
    const container = page.querySelector('.msc-learn-page__container');
    if (!config || !widget || !container) return;

    const groups = Array.from(widget.querySelectorAll('.msc-learn-progress__group')).map((group) => ({
      label: group.querySelector('.msc-learn-progress__group-label')?.textContent.trim() || 'Section',
      guideIds: Array.from(group.querySelectorAll('[data-msc-progress-guide]')).map(
        (node) => node.dataset.mscProgressGuide
      ),
    }));

    const transition = document.createElement('section');
    transition.className = 'msc-learn-hub-transition';
    transition.dataset.mscLearnTransition = 'true';
    transition.dataset.hubId = hubId;
    transition.setAttribute('aria-label', `${getHubTitle(page)} completion and next destination`);

    const destination = document.createElement('a');
    destination.className = 'msc-learn-hub-transition__destination';
    destination.href = config.href;
    destination.innerHTML = `
      <span class="msc-learn-hub-transition__eyebrow">${config.eyebrow}</span>
      <strong class="msc-learn-hub-transition__title">${config.title}</strong>
      <span class="msc-learn-hub-transition__cta">${config.cta}<span aria-hidden="true">→</span></span>
    `;

    const progress = document.createElement('aside');
    progress.className = 'msc-learn-hub-transition__progress';
    progress.setAttribute('aria-label', `${getHubTitle(page)} progress`);

    const top = document.createElement('div');
    top.className = 'msc-learn-hub-transition__progress-top';
    const progressLabel = document.createElement('span');
    progressLabel.className = 'msc-learn-hub-transition__progress-label';
    progressLabel.textContent = `${getHubTitle(page)} progress`;
    const progressCount = document.createElement('strong');
    progressCount.dataset.mscTransitionCount = '';
    progressCount.textContent = '00 / 16';
    top.append(progressLabel, progressCount);

    const groupList = document.createElement('div');
    groupList.className = 'msc-learn-hub-transition__groups';

    groups.forEach((groupData) => {
      const group = document.createElement('div');
      group.className = 'msc-learn-hub-transition__group';
      group.dataset.mscTransitionGroup = '';

      const groupHeader = document.createElement('div');
      groupHeader.className = 'msc-learn-hub-transition__group-header';
      const label = document.createElement('span');
      label.textContent = groupData.label;
      const groupCount = document.createElement('span');
      groupCount.dataset.mscTransitionGroupCount = '';
      groupCount.textContent = `0/${groupData.guideIds.length}`;
      groupHeader.append(label, groupCount);

      const nodeRow = document.createElement('div');
      nodeRow.className = 'msc-learn-hub-transition__nodes';
      nodeRow.setAttribute('aria-hidden', 'true');
      groupData.guideIds.forEach((guideId) => {
        const node = document.createElement('span');
        node.className = 'msc-learn-hub-transition__node';
        node.dataset.mscTransitionGuide = guideId;
        nodeRow.appendChild(node);
      });

      group.append(groupHeader, nodeRow);
      groupList.appendChild(group);
    });

    const footer = document.createElement('div');
    footer.className = 'msc-learn-hub-transition__progress-footer';
    const remaining = document.createElement('span');
    remaining.dataset.mscTransitionRemaining = '';
    remaining.textContent = '16 guides remaining';
    const status = document.createElement('strong');
    status.dataset.mscTransitionStatus = '';
    status.setAttribute('aria-live', 'polite');
    status.textContent = 'Continue when ready';
    footer.append(remaining, status);

    progress.append(top, groupList, footer);
    transition.append(destination, progress);

    const oldNavigation = page.querySelector('.msc-learn-prev-next');
    if (oldNavigation) {
      oldNavigation.replaceWith(transition);
    } else {
      container.appendChild(transition);
    }

    renderTransition(transition);
  };

  const markGuideCurrent = (guideId) => {
    const hubId = getHubIdForGuide(guideId);
    if (!hubId) return;

    const state = getHubState(hubId);
    const completed = new Set(Array.isArray(state.completedGuideIds) ? state.completedGuideIds : []);

    // Revisiting an already completed guide should not move the learner backward.
    if (completed.has(guideId) || state.currentGuideId === guideId) return;

    saveHubState(hubId, {
      ...state,
      completedGuideIds: Array.from(completed),
      currentGuideId: guideId,
    });
  };

  const markGuideComplete = (guideId) => {
    const hubId = getHubIdForGuide(guideId);
    if (!hubId) return;

    const state = getHubState(hubId);
    const completed = new Set(Array.isArray(state.completedGuideIds) ? state.completedGuideIds : []);
    if (completed.has(guideId)) return;

    completed.add(guideId);

    const guideIds = getHubGuideIds(hubId);
    const currentIndex = guideIds.indexOf(guideId);
    const nextIncompleteGuideId =
      currentIndex >= 0
        ? guideIds.slice(currentIndex + 1).find((candidateId) => !completed.has(candidateId)) || null
        : null;

    saveHubState(hubId, {
      ...state,
      completedGuideIds: Array.from(completed),
      currentGuideId: nextIncompleteGuideId,
    });
  };

  const trackGuidePage = (page) => {
    if (page.dataset.mscLearnProgressTracked === 'true') return;

    const guideId = page.dataset.mscRegistryId;
    if (!getHubIdForGuide(guideId)) return;

    page.dataset.mscLearnProgressTracked = 'true';
    markGuideCurrent(guideId);

    const completionSentinel = page.querySelector('.msc-learn-prev-next');
    if (!completionSentinel || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        markGuideComplete(guideId);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(completionSentinel);
  };

  const init = (root = document) => {
    root.querySelectorAll('template[data-msc-learn-progress-template]').forEach(mountWidget);
    root
      .querySelectorAll('.msc-learn-page[data-msc-registry-id^="MSC-HUB-"]')
      .forEach(mountTransition);
    root
      .querySelectorAll('.msc-learn-page[data-msc-registry-id^="MSC-GUIDE-"]')
      .forEach(trackGuidePage);
  };

  const refresh = () => {
    document.querySelectorAll('[data-msc-learn-progress]').forEach((widget) => {
      const page = widget.closest('.msc-learn-page');
      if (page) renderWidget(widget, page);
    });
    document.querySelectorAll('[data-msc-learn-transition]').forEach(renderTransition);
  };

  document.addEventListener('click', (event) => {
    const navigationLink = event.target.closest('.msc-learn-prev-next a');
    const page = navigationLink?.closest('.msc-learn-page[data-msc-registry-id^="MSC-GUIDE-"]');
    if (page) markGuideComplete(page.dataset.mscRegistryId);
  });

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
