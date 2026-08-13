(() => {
  const copy = {
    overview: 'Navigate Bitcoin by depth. Start with the fundamentals at the surface, then move through the network, systems built on Bitcoin, protocol mechanics, and the wider ecosystem. Each depth groups related guides so you can build context progressively or jump directly to the area you want to explore.',
    basics: 'Build the foundation for everything that follows. Learn what Bitcoin is, how ownership and transactions work, and why scarcity, verification, security, and privacy matter. These guides establish the core concepts and vocabulary needed to understand the network and explore deeper technical topics with confidence.',
    network: 'Follow a transaction through the distributed system that makes Bitcoin work. Explore nodes, mempools, miners, blocks, proof of work, chainwork, consensus, and upgrades. See how independent participants verify the same rules and converge on a shared transaction history without a central operator.',
    building: 'Explore the systems built around Bitcoin’s base layer. Learn how Layer 2 networks, digital assets, payment systems, and emerging protocols extend Bitcoin’s capabilities. These guides focus on how those systems work, the assumptions they introduce, and the tradeoffs that come with moving beyond the base protocol.',
    development: 'Go inside the machinery that defines and implements Bitcoin. Study Bitcoin Core, BIPs, Script, cryptography, transaction and block rules, testing, infrastructure, and software policy. These guides separate consensus rules from implementation behavior and explain how changes are designed, reviewed, tested, and deployed.',
    ecosystem: 'Map the people, organizations, infrastructure, and markets around Bitcoin. Explore builders, open-source projects, companies, service providers, marketplaces, communities, conferences, and key moments in Bitcoin’s history. Understand how the ecosystem evolves while keeping one distinction clear: influence around Bitcoin is not authority over the protocol.'
  };

  const applyCopy = (brief) => {
    if (!brief) return;
    const region = brief.dataset.region || 'overview';
    const target = region === 'overview'
      ? brief.querySelector('.msc-depth-map__brief-system-copy')
      : brief.querySelector('.msc-depth-map__brief-copy');
    if (target && copy[region]) target.textContent = copy[region];
  };

  const bind = () => {
    const brief = document.querySelector('.msc-learn .msc-depth-map__brief');
    if (!brief || brief.dataset.mscCopyBound === 'true') return;
    brief.dataset.mscCopyBound = 'true';
    applyCopy(brief);
    new MutationObserver(() => applyCopy(brief)).observe(brief, {
      attributes: true,
      attributeFilter: ['data-region']
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind, { once: true });
  } else {
    bind();
  }
  document.addEventListener('shopify:section:load', bind);
})();
