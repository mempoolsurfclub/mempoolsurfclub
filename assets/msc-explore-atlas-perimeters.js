(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';

  /*
   * MSC Explore Atlas selected-region edge registry.
   *
   * IMPORTANT:
   * - Every path below is copied from the currently approved rendered Atlas
   *   coastline or approved shared-boundary geometry.
   * - Region ownership is explicit. No hit-area masks, screenshot strokes,
   *   label anchoring, nearest-neighbor matching, or distance thresholds are
   *   used to decide what illuminates.
   * - Shared borders are single reusable edge definitions referenced by both
   *   neighboring regions.
   */
  const EDGE_PATHS = {
    "coast_mining_west": "M621.8 66.4 C615.6 62.6 603.5 53.8 597.3 50 C590.4 51.3 552.5 61.2 530.9 62.7 C533.9 68.5 541.1 80.2 542.3 85.4 C528.3 85.6 429.6 86.9 415.6 87.1 C410.6 92.3 395.2 107.9 390.4 112.8 C383.4 113.1 372.8 113.4 365.9 113.7 C369.2 119.8 380.2 139.9 383.5 146.1 C378.5 151.3 358.5 172.2 353.7 177.3 C360.5 178.1 424.6 185.4 431.6 186.2 C434.5 192.4 439.3 202.6 442.3 209",
    "coast_runes_nw": "M442.3 209 C435.7 210.5 422.9 213.7 416.3 215.3 C417.8 218.1 420.2 222 421.7 224.6",
    "coast_ordinals": "M421.7 224.6 C414.8 225.2 383.6 227.8 376.6 228.4 C372.6 222.6 363.1 208.9 359.1 203.1 C352.1 203.7 324 206.3 317 206.9 C311.1 210.6 270.3 236.1 264.4 239.8 C266.9 246.3 271 256.9 273.5 263.4 C280.5 263.4 304.7 263.4 311.7 263.4 C310.4 268 308.4 275.2 307.1 279.8 C300.2 278.5 238.4 266.8 231.5 265.5 C224.8 267.6 183.4 280.4 177.3 282.3 C176.7 288.7 175.6 298.7 175 305.1 C180.6 308.3 193.3 315.5 199.4 319 C206.2 317.6 246.1 309.1 252.9 307.7 C258.4 312 281 329.5 286.5 333.8 C293.5 334.4 322.3 336.6 329.3 337.2 C335.8 334.6 371.6 320.4 378.1 317.8 C384.6 320.4 412.9 330.8 419.4 333.4 C421.5 338.2 424.2 344.2 426.3 349 C431.5 347.5 444 344.6 449.2 343.1",
    "coast_runes_se": "M449.2 343.1 C455.9 345.1 472.3 349.9 479 351.9 C485.4 349 500.8 342.2 507.2 339.3 C512.5 341.6 538.6 345 543.9 347.3 C539.3 341.9 532.4 333.7 527.8 328.3 C530 322 533.3 312.3 535.5 306 C542.3 304.8 555.4 302.5 562.2 301.3 C562.4 297.5 562.8 292.5 563 288.7 C576.9 288.5 604 287.9 617.9 287.8 C622.1 279.3 629.8 263.9 634 255.4 C647.6 252.2 673.8 245.9 687.4 242.7",
    "coast_payments_sw": "M687.4 242.7 C685.5 245.2 682.5 249.1 680.6 251.6 C688.8 254.2 706 259.5 714.2 262.1 C714.6 268.5 715.4 277.6 715.7 284 C710.1 287.4 700.7 292.9 695.1 296.3 C682.9 294.6 663.7 292.1 651.5 290.4 C650.4 294.6 648.8 300.9 647.7 305.1 C637.3 303.1 621.5 300 611.1 298 C604.5 299.8 594.8 302.5 588.2 304.3 C585.9 314.7 582.1 333.9 579.8 344.3 C583.3 348.2 590.8 356.5 594.3 360.4",
    "coast_network": "M594.3 360.4 C583.3 362.8 565.6 366.8 554.6 369.2 C556.5 373.4 559.5 379.8 561.4 384 C541.8 387.8 503.9 395 484.3 398.7 C476.7 397.6 462.1 395.6 454.5 394.5 C445.4 399.6 427.7 409.7 418.6 414.8 C417.2 425.7 413.9 449.4 412.5 460.3 L468 445 L554.6 489 C556.2 485.1 559.1 478.1 560.7 474.2 C577.1 469.2 626.7 454.3 643.1 449.3 C651.3 451.8 665.5 456.1 673.7 458.6 C686.1 457.2 710.9 454.5 723.3 453.1 C734 460.2 755.4 474.3 766.1 481.4 C775 483.4 793.1 487.4 802 489.4 C799.1 476.9 793.4 452.1 790.5 439.6",
    "coast_exchanges": "M790.5 439.6 C806.4 437.2 838 432.3 853.9 429.9 C865.6 432.3 888.8 437.7 900.5 440.1 C903.6 444 909.6 451.3 912.7 455.2 C924.8 447 948.7 431 960.8 422.8 C962.4 416.4 965.4 404.7 967 398.3 C977.2 394.1 997.2 385.6 1007.4 381.4 C1005 371.1 1000.7 350.4 998.3 340.1 C979.8 333.3 942.7 319.9 924.2 313.1 C923.8 307.8 923.1 300.3 922.7 295 C931.1 296.2 947.9 298.9 956.3 300.1 C955.9 296.4 955.1 291.1 954.7 287.4 C949.2 286 941.1 283.7 935.6 282.3 C936.5 277.2 937.8 269.3 938.7 264.2 C931.9 264.3 921.1 264.5 914.3 264.6 C913.757 262.942 913.007 260.306 912.432 258.315",
    "coast_payments_east": "M912.432 258.315 C910.875 252.78 909.099 246.045 907.77 241.762",
    "coast_marketplaces": "M907.77 241.762 C907.642 241.351 907.519 240.963 907.4 240.6 C917.1 239.5 938.2 237.1 947.9 236 C948.6 240.1 949.5 246.2 950.2 250.3 C957.8 251.2 968.5 252.4 976.1 253.3 C972.4 259.4 966.1 269.9 962.4 276 C968.3 276.5 978.6 277.3 984.5 277.7 C983.7 274.7 982.3 269.7 981.5 266.7 C990.2 264.1 1007.9 259.2 1016.6 256.6 C1018.6 252.7 1022.2 246.2 1024.2 242.3 C1016.6 238.1 1000.5 229.2 992.9 225 C991.7 218.4 989.5 205.5 988.3 198.9 C977.7 195.2 959.2 188.6 948.6 184.9 C939.7 188.2 920.9 195.1 912 198.4 C901.6 197.9 885.7 197.2 875.3 196.7 C861.2 187 833.7 168.1 819.6 158.4 C827.3 154.2 839.4 147.4 847.1 143.2 C863.4 145.2 896.4 149.2 912.7 151.2 C907.7 145 899.4 134.6 894.4 128.4 C881.3 125.5 859.4 120.8 846.3 117.9 C848.1 120.3 850.6 123.9 852.4 126.3 C846.4 125 836.3 122.9 830.3 121.7 C829.9 126.6 829.1 134.5 828.7 139.4 C820 141.9 804.6 146.2 795.9 148.7 C796.3 156.6 797 168.6 797.4 176.5 C784.1 180.5 763.4 186.8 750.1 190.8 C750.9 194.8 752.3 201.6 753.1 205.6",
    "coast_payments_north": "M753.1 205.6 C744.8 208.7 727.8 215.2 719.5 218.3 C711.7 217.5 699.8 216.1 692 215.3",
    "coast_mining_east": "M692 215.3 C695.6 204.5 701.4 187.3 705 176.5",
    "coast_wallets": "M705 176.5 C722.7 174.5 749.9 171.3 767.6 169.3 C767.2 165 766.5 158.5 766.1 154.2 C777 148.8 794.2 140.2 805.1 134.8 C806.2 129 807.8 121.2 808.9 115.4 C800.8 115.1 784.1 114.4 776 114.1 C774.3 107.9 771.6 97.5 769.9 91.3 C759.9 88.4 738.7 82 728.7 79.1 C727.2 75.8 724.8 70.6 723.3 67.3 C695.8 67.1 649.3 66.6 621.8 66.4",
    "border_mining_wallets": "M621 64 C638 86 654 111 676 137 C690 153 702 165 711 174",
    "border_mining_runes": "M441 207 C492 203 537 205 579 202 C620 199 654 209 691 214",
    "border_runes_payments": "M691 214 L689 239",
    "border_marketplaces_payments": "M755 205 C805 219 855 236 907 242",
    "border_ordinals_runes": "M420 222 C427 252 435 292 447 340",
    "border_payments_network": "M594 356 C629 369 673 382 708 403 C737 421 761 437 788 438",
    "border_payments_exchanges": "M788 438 C812 420 831 393 848 367 C871 329 893 289 910 259"
  };

  const REGION_EDGES = {
    "ordinals": ["coast_ordinals", "border_ordinals_runes"],
    "runes": ["coast_runes_nw", "border_mining_runes", "border_runes_payments", "coast_runes_se", "border_ordinals_runes"],
    "wallets": ["coast_wallets", "border_mining_wallets"],
    "marketplaces": ["coast_marketplaces", "border_marketplaces_payments"],
    "mining": ["coast_mining_west", "border_mining_wallets", "coast_mining_east", "border_mining_runes"],
    "payments": ["coast_payments_north", "border_marketplaces_payments", "coast_payments_east", "border_payments_exchanges", "border_payments_network", "coast_payments_sw", "border_runes_payments"],
    "exchanges": ["coast_exchanges", "border_payments_exchanges"],
    "network": ["coast_network", "border_payments_network"]
  };

  const removeLegacyFocusGeometry = (landContext) => {
    landContext.querySelectorAll(
      '.msc-atlas-map__focus-coast, ' +
      '.msc-atlas-map__focus-boundaries, ' +
      '.msc-atlas-map__focus-perimeter-explicit, ' +
      '.msc-atlas-map__focus-perimeter-exact, ' +
      '.msc-atlas-map__focus-guide, ' +
      '.msc-atlas-map__focus-edge-registry'
    ).forEach((node) => node.remove());
  };

  const makeEdgePath = (edgeId, mode) => {
    const pathData = EDGE_PATHS[edgeId];
    if (!pathData) return null;

    const locked = mode === 'locked';
    const path = document.createElementNS(SVG_NS, 'path');
    path.classList.add('msc-atlas-map__focus-edge');
    path.dataset.atlasFocusEdge = edgeId;
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute(
      'stroke',
      locked ? 'rgba(251, 248, 239, .94)' : 'rgba(251, 248, 239, .86)'
    );
    path.setAttribute('stroke-width', locked ? '1.7' : '1.55');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('vector-effect', 'non-scaling-stroke');
    path.setAttribute('pointer-events', 'none');
    path.setAttribute('aria-hidden', 'true');
    return path;
  };

  const installAtlasEdgeRegistry = (atlas) => {
    const svg = atlas.querySelector('[data-atlas-map]');
    const landContext = svg?.querySelector('.msc-atlas-map__land-context');
    if (!svg || !landContext) return;

    removeLegacyFocusGeometry(landContext);

    const focusGroup = document.createElementNS(SVG_NS, 'g');
    focusGroup.classList.add('msc-atlas-map__focus-edge-registry');
    focusGroup.setAttribute('aria-hidden', 'true');
    focusGroup.setAttribute('pointer-events', 'none');
    focusGroup.style.display = 'none';
    landContext.appendChild(focusGroup);

    const render = () => {
      const slug = atlas.dataset.atlasActive || '';
      const mode = atlas.dataset.atlasMode || 'overview';
      const edges = REGION_EDGES[slug] || [];

      focusGroup.replaceChildren();

      if (!slug || !edges.length) {
        focusGroup.style.display = 'none';
        return;
      }

      edges.forEach((edgeId) => {
        const path = makeEdgePath(edgeId, mode);
        if (path) focusGroup.appendChild(path);
      });

      focusGroup.style.display = focusGroup.childElementCount ? 'block' : 'none';
    };

    let frame = null;
    const scheduleRender = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        render();
      });
    };

    const observer = new MutationObserver((records) => {
      if (records.some((record) => (
        record.attributeName === 'data-atlas-active'
        || record.attributeName === 'data-atlas-mode'
      ))) {
        scheduleRender();
      }
    });

    observer.observe(atlas, {
      attributes: true,
      attributeFilter: ['data-atlas-active', 'data-atlas-mode']
    });

    render();
  };

  document.querySelectorAll('[data-atlas]').forEach(installAtlasEdgeRegistry);
})();
