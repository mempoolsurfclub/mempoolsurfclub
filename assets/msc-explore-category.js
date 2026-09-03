(() => {
  const WALLET_TOPIC_ORDER = [
    'Software Wallets',
    'Bitcoin Asset Wallets',
    'Lightning & Payment Wallets',
    'Multisig & Collaborative Custody',
    'Hardware & Signing Devices'
  ];

  const STATUS_ORDER = ['ACTIVE', 'HISTORICAL', 'INACTIVE', 'UNCERTAIN'];

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const normalize = (value = '') => String(value).trim().toLowerCase();

  const labelize = (value = '') => String(value)
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());

  function renderCard(record) {
    const tags = (record.supporting_tags || []).slice(0, 4);
    const favorite = record.msc_editorial?.label === 'MSC Favorite';
    const statusClass = normalize(record.lifecycle_status);

    return `
      <article class="msc-explore-card msc-explore-card--${escapeHtml(statusClass)}" data-record-card>
        <div class="msc-explore-card__topline">
          <span class="msc-explore-card__id">${escapeHtml(record.registry_id)}</span>
          <span class="msc-explore-card__status"><i aria-hidden="true"></i>${escapeHtml(labelize(record.lifecycle_status))}</span>
        </div>

        ${favorite ? '<div class="msc-explore-card__favorite">MSC Favorite</div>' : ''}

        <h3>${escapeHtml(record.canonical_name)}</h3>
        <p class="msc-explore-card__description">${escapeHtml(record.concise_description)}</p>

        <dl class="msc-explore-card__taxonomy">
          <div>
            <dt>Topic</dt>
            <dd>${escapeHtml(record.topic)}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>${escapeHtml(record.subtopic || record.entity_type)}</dd>
          </div>
        </dl>

        ${tags.length ? `<div class="msc-explore-card__tags" aria-label="Tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>` : ''}

        <div class="msc-explore-card__footer">
          <div>
            <span>Evidence</span>
            <strong>${escapeHtml(labelize(record.source_confidence))}</strong>
          </div>
          <div>
            <span>Verified</span>
            <strong>${escapeHtml(record.last_verified_date || '—')}</strong>
          </div>
        </div>

        <a
          class="msc-explore-card__route"
          href="${escapeHtml(record.route)}"
          aria-disabled="true"
          tabindex="-1"
          data-planned-profile-route
        >Profile route planned <span aria-hidden="true">↗</span></a>
      </article>
    `;
  }

  async function init(root) {
    const category = root.dataset.category;
    if (category !== 'WALLETS') {
      root.dataset.state = 'blocked';
      return;
    }

    const grid = root.querySelector('[data-record-grid]');
    const summary = root.querySelector('[data-results-summary]');
    const empty = root.querySelector('[data-empty-state]');
    const search = root.querySelector('[data-filter-search]');
    const topicSelect = root.querySelector('[data-filter-topic]');
    const statusSelect = root.querySelector('[data-filter-status]');
    const topicStrip = root.querySelector('[data-topic-strip]');
    const form = root.querySelector('[data-filter-form]');

    try {
      const response = await fetch(root.dataset.runtimeUrl, { credentials: 'same-origin' });
      if (!response.ok) throw new Error(`Explore runtime request failed: ${response.status}`);

      const runtime = await response.json();
      const categoryMeta = runtime.categories?.find((item) => item.category === category);
      const records = (runtime.records || []).filter((record) => record.canonical_category === category);

      if (!categoryMeta || records.length !== categoryMeta.record_count) {
        throw new Error('Wallet category/runtime count mismatch');
      }

      const topicCounts = new Map();
      const statusCounts = new Map();
      records.forEach((record) => {
        topicCounts.set(record.topic, (topicCounts.get(record.topic) || 0) + 1);
        statusCounts.set(record.lifecycle_status, (statusCounts.get(record.lifecycle_status) || 0) + 1);
      });

      root.querySelectorAll('[data-wallet-count], [data-metric-total]').forEach((node) => {
        node.textContent = String(records.length);
      });
      root.querySelector('[data-topic-count]').textContent = String(topicCounts.size);
      root.querySelector('[data-metric-active]').textContent = String(statusCounts.get('ACTIVE') || 0);
      root.querySelector('[data-metric-historical]').textContent = String(statusCounts.get('HISTORICAL') || 0);
      root.querySelector('[data-metric-inactive]').textContent = String(statusCounts.get('INACTIVE') || 0);
      root.querySelector('[data-metric-uncertain]').textContent = String(statusCounts.get('UNCERTAIN') || 0);

      WALLET_TOPIC_ORDER.forEach((topic) => {
        if (!topicCounts.has(topic)) return;
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = `${topic} (${topicCounts.get(topic)})`;
        topicSelect.append(option);
      });

      STATUS_ORDER.forEach((status) => {
        if (!statusCounts.has(status)) return;
        const option = document.createElement('option');
        option.value = status;
        option.textContent = `${labelize(status)} (${statusCounts.get(status)})`;
        statusSelect.append(option);
      });

      topicStrip.innerHTML = [
        `<button type="button" class="is-active" data-topic-button="">All <span>${records.length}</span></button>`,
        ...WALLET_TOPIC_ORDER
          .filter((topic) => topicCounts.has(topic))
          .map((topic) => `<button type="button" data-topic-button="${escapeHtml(topic)}">${escapeHtml(topic)} <span>${topicCounts.get(topic)}</span></button>`)
      ].join('');

      const getFiltered = () => {
        const query = normalize(search.value);
        const topic = topicSelect.value;
        const status = statusSelect.value;

        return records.filter((record) => {
          if (topic && record.topic !== topic) return false;
          if (status && record.lifecycle_status !== status) return false;
          if (!query) return true;

          const haystack = normalize([
            record.canonical_name,
            record.concise_description,
            record.topic,
            record.subtopic,
            record.entity_type,
            ...(record.supporting_tags || [])
          ].join(' '));

          return haystack.includes(query);
        });
      };

      const render = () => {
        const filtered = getFiltered();
        grid.innerHTML = filtered.map(renderCard).join('');
        grid.setAttribute('aria-busy', 'false');
        empty.hidden = filtered.length !== 0;
        summary.textContent = `${filtered.length} of ${records.length} wallet records shown`;

        root.querySelectorAll('[data-topic-button]').forEach((button) => {
          const active = button.dataset.topicButton === topicSelect.value;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', String(active));
        });
      };

      search.addEventListener('input', render);
      topicSelect.addEventListener('change', render);
      statusSelect.addEventListener('change', render);

      topicStrip.addEventListener('click', (event) => {
        const button = event.target.closest('[data-topic-button]');
        if (!button) return;
        topicSelect.value = button.dataset.topicButton;
        render();
      });

      form.addEventListener('reset', () => {
        window.requestAnimationFrame(() => {
          topicSelect.value = '';
          statusSelect.value = '';
          render();
        });
      });

      root.addEventListener('click', (event) => {
        const plannedRoute = event.target.closest('[data-planned-profile-route]');
        if (plannedRoute) event.preventDefault();
      });

      render();
      root.dataset.state = 'ready';
    } catch (error) {
      console.error('[MSC Explore category]', error);
      grid.setAttribute('aria-busy', 'false');
      grid.innerHTML = '';
      empty.hidden = false;
      empty.querySelector('strong').textContent = 'The Wallets registry could not be loaded.';
      empty.querySelector('span').textContent = 'The Explore runtime is unavailable or failed validation.';
      summary.textContent = 'Wallet registry unavailable';
      root.dataset.state = 'error';
    }
  }

  document.querySelectorAll('[data-explore-category]').forEach(init);
})();
