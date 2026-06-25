/**
 * ASDF Accessibility Widget — Readabler-style floating panel
 * Injected as a direct child of <html> so body-level filters don't affect it.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'asdf-a11y-settings';

  const ICONS = {
    accessibility: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-accessibility-icon lucide-accessibility" aria-hidden="true"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/></svg>',
    reset: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    fontSize: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 20h16M6 16l6-12 6 12M9 9h6"/></svg>',
    lineHeight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8h18M3 16h18M8 4v16M16 4v16"/></svg>',
    letterSpacing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12h16M7 8l-3 4 3 4M17 8l3 4-3 4"/></svg>',
    dyslexia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19h16M7 15l3-10 2 7 2-7 3 10"/></svg>',
    alignLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h12M3 18h16"/></svg>',
    highlightLinks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    highlightTitles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h14"/></svg>',
    hideImages: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 17 5-5 4 4 3-3 6 6"/><line x1="3" y1="3" x2="21" y2="21"/></svg>',
    darkContrast: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9z"/></svg>',
    lightContrast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    readingGuide: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
    readingMask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="8" width="18" height="8" rx="1"/></svg>',
    bigCursor: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 2l15 7.5-6.2 1.8 4 7.6-3.1 1.6-4-7.6L5.8 18z"/></svg>',
    pauseAnimations: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
    epilepsy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    vision: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    cognitive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>',
    adhd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>',
    blind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 17 7 7M10.5 10.5 7 7M17 7l-3.5 3.5M14 14l3 3"/><circle cx="12" cy="12" r="10"/></svg>'
  };

  const SECTIONS = [
    {
      title: 'Accessibility Profiles',
      tiles: [
        { id: 'profile-epilepsy', label: 'Epilepsy Safe', icon: 'epilepsy', type: 'profile', profile: 'epilepsy' },
        { id: 'profile-vision', label: 'Vision Impaired', icon: 'vision', type: 'profile', profile: 'vision' },
        { id: 'profile-cognitive', label: 'Cognitive', icon: 'cognitive', type: 'profile', profile: 'cognitive' },
        { id: 'profile-adhd', label: 'ADHD Friendly', icon: 'adhd', type: 'profile', profile: 'adhd' },
        { id: 'profile-blind', label: 'Blind Users', icon: 'blind', type: 'profile', profile: 'blind' }
      ]
    },
    {
      title: 'Content Adjustments',
      tiles: [
        { id: 'font-size', label: 'Bigger Text', icon: 'fontSize', type: 'level', max: 3, htmlClass: true, prefix: 'acc-font-' },
        { id: 'line-height', label: 'Line Height', icon: 'lineHeight', type: 'level', max: 3, prefix: 'acc-lh-' },
        { id: 'letter-spacing', label: 'Text Spacing', icon: 'letterSpacing', type: 'level', max: 3, prefix: 'acc-ls-' },
        { id: 'dyslexia', label: 'Dyslexia Font', icon: 'dyslexia', type: 'toggle', className: 'acc-dyslexia' },
        { id: 'align-left', label: 'Align Text', icon: 'alignLeft', type: 'toggle', className: 'acc-align-left' },
        { id: 'highlight-links', label: 'Highlight Links', icon: 'highlightLinks', type: 'toggle', className: 'acc-highlight-links' },
        { id: 'highlight-titles', label: 'Highlight Titles', icon: 'highlightTitles', type: 'toggle', className: 'acc-highlight-titles' },
        { id: 'hide-images', label: 'Hide Images', icon: 'hideImages', type: 'toggle', className: 'acc-hide-images' }
      ]
    },
    {
      title: 'Color Adjustments',
      tiles: [
        { id: 'dark-contrast', label: 'Dark Contrast', icon: 'darkContrast', type: 'toggle', className: 'acc-dark', group: 'contrast' },
        { id: 'light-contrast', label: 'Light Contrast', icon: 'lightContrast', type: 'toggle', className: 'acc-light', group: 'contrast' }
      ]
    },
    {
      title: 'Orientation Adjustments',
      tiles: [
        { id: 'reading-guide', label: 'Reading Guide', icon: 'readingGuide', type: 'toggle', feature: 'guide' },
        { id: 'reading-mask', label: 'Reading Mask', icon: 'readingMask', type: 'toggle', feature: 'mask' },
        { id: 'big-cursor', label: 'Big Cursor', icon: 'bigCursor', type: 'toggle', className: 'acc-big-cursor', htmlClass: true },
        { id: 'pause-animations', label: 'Pause Animations', icon: 'pauseAnimations', type: 'toggle', className: 'acc-pause', htmlClass: true }
      ]
    }
  ];

  const PROFILES = {
    epilepsy: { pause: true, hideImages: true, font: 0, lh: 0, ls: 0, dyslexia: false, align: false, links: false, titles: false, dark: false, light: false, guide: false, mask: false, cursor: false },
    vision: { font: 2, lh: 1, ls: 0, dyslexia: false, align: false, links: true, titles: true, dark: true, light: false, hideImages: false, guide: false, mask: false, cursor: true, pause: false },
    cognitive: { font: 1, lh: 2, ls: 1, dyslexia: true, align: true, links: true, titles: false, dark: false, light: false, hideImages: false, guide: true, mask: false, cursor: false, pause: true },
    adhd: { font: 0, lh: 1, ls: 0, dyslexia: false, align: false, links: true, titles: false, dark: false, light: false, hideImages: false, guide: false, mask: true, cursor: false, pause: true },
    blind: { font: 2, lh: 2, ls: 1, dyslexia: false, align: true, links: true, titles: true, dark: false, light: true, hideImages: true, guide: false, mask: false, cursor: false, pause: false }
  };

  const state = {
    levels: { 'font-size': 0, 'line-height': 0, 'letter-spacing': 0 },
    toggles: {},
    activeProfile: null
  };

  let els = {};
  let lastFocus = null;

  function levelDots(max, current) {
    return '<span class="acc-level" aria-hidden="true">' +
      Array.from({ length: max }, (_, i) => `<i class="${i < current ? 'on' : ''}"></i>`).join('') +
      '</span>';
  }

  function buildTile(tile) {
    const isLevel = tile.type === 'level';
    const levelHtml = isLevel ? levelDots(tile.max, 0) : '';
    return `<button type="button" class="acc-tile" id="acc-${tile.id}" data-acc-id="${tile.id}" aria-pressed="false">
      <span class="acc-tile-icon">${ICONS[tile.icon] || ''}</span>
      <span class="acc-tile-label">${tile.label}</span>
      ${levelHtml}
    </button>`;
  }

  function buildMarkup() {
    const sections = SECTIONS.map((sec) =>
      `<section><h3>${sec.title}</h3><div class="acc-grid">${sec.tiles.map(buildTile).join('')}</div></section>`
    ).join('');

    return `
      <button type="button" class="acc-toggle" id="accToggle" aria-label="Open accessibility settings" aria-expanded="false" aria-controls="accPanel">
        <span class="acc-toggle-icon">${ICONS.accessibility}</span>
      </button>
      <div class="acc-overlay" id="accOverlay" aria-hidden="true"></div>
      <aside class="acc-panel" id="accPanel" role="dialog" aria-modal="true" aria-label="Accessibility settings" aria-hidden="true">
        <header class="acc-head">
          <h2>${ICONS.accessibility} Accessibility</h2>
          <div class="acc-head-actions">
            <button type="button" id="accReset">${ICONS.reset} Reset</button>
            <button type="button" class="acc-close" id="accClose" aria-label="Close accessibility panel">&times;</button>
          </div>
        </header>
        <div class="acc-body">${sections}</div>
        <footer class="acc-foot">Africa Sand Dam Foundation &mdash; Accessibility Tools</footer>
      </aside>
      <div class="acc-guide" id="accGuide" aria-hidden="true"></div>
      <div class="acc-mask" id="accMask" aria-hidden="true"></div>
    `;
  }

  function getTileConfig(id) {
    for (const sec of SECTIONS) {
      const tile = sec.tiles.find((t) => t.id === id);
      if (tile) return tile;
    }
    return null;
  }

  function clearLevelClasses(prefix, max, onHtml) {
    const target = onHtml ? document.documentElement : document.body;
    for (let i = 1; i <= max; i++) target.classList.remove(`${prefix}${i}`);
  }

  function applyLevel(id, level) {
    const tile = getTileConfig(id);
    if (!tile) return;
    const target = tile.htmlClass ? document.documentElement : document.body;
    clearLevelClasses(tile.prefix, tile.max, tile.htmlClass);
    if (level > 0) target.classList.add(`${tile.prefix}${level}`);
    state.levels[id] = level;
    updateTileUI(id);
  }

  function applyToggle(id, on) {
    const tile = getTileConfig(id);
    if (!tile) return;

    if (tile.group === 'contrast') {
      document.body.classList.remove('acc-dark', 'acc-light');
      state.toggles['dark-contrast'] = false;
      state.toggles['light-contrast'] = false;
      if (on) {
        const target = tile.htmlClass ? document.documentElement : document.body;
        target.classList.add(tile.className);
        state.toggles[id] = true;
      }
      updateTileUI('dark-contrast');
      updateTileUI('light-contrast');
      return;
    }

    if (tile.className) {
      const target = tile.htmlClass ? document.documentElement : document.body;
      target.classList.toggle(tile.className, on);
    }

    if (tile.feature === 'guide') {
      els.guide.style.display = on ? 'block' : 'none';
      els.guide.setAttribute('aria-hidden', on ? 'false' : 'true');
    }
    if (tile.feature === 'mask') {
      els.mask.style.display = on ? 'block' : 'none';
      els.mask.setAttribute('aria-hidden', on ? 'false' : 'true');
    }

    state.toggles[id] = on;
    updateTileUI(id);
  }

  function updateTileUI(id) {
    const btn = document.getElementById(`acc-${id}`);
    const tile = getTileConfig(id);
    if (!btn || !tile) return;

    if (tile.type === 'level') {
      const level = state.levels[id] || 0;
      btn.classList.toggle('active', level > 0);
      btn.setAttribute('aria-pressed', level > 0 ? 'true' : 'false');
      const dots = btn.querySelectorAll('.acc-level i');
      dots.forEach((dot, i) => dot.classList.toggle('on', i < level));
      return;
    }

    if (tile.type === 'profile') {
      btn.classList.toggle('active', state.activeProfile === tile.profile);
      btn.setAttribute('aria-pressed', state.activeProfile === tile.profile ? 'true' : 'false');
      return;
    }

    const on = !!state.toggles[id];
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  function resetAll() {
    state.levels = { 'font-size': 0, 'line-height': 0, 'letter-spacing': 0 };
    state.toggles = {};
    state.activeProfile = null;

    ['acc-font-', 'acc-lh-', 'acc-ls-'].forEach((prefix) => {
      for (let i = 1; i <= 3; i++) {
        document.documentElement.classList.remove(`${prefix}${i}`);
        document.body.classList.remove(`${prefix}${i}`);
      }
    });

    document.body.className = document.body.className
      .split(/\s+/)
      .filter((c) => !c.startsWith('acc-'))
      .join(' ');

    document.documentElement.className = document.documentElement.className
      .split(/\s+/)
      .filter((c) => !c.startsWith('acc-'))
      .join(' ');

    els.guide.style.display = 'none';
    els.mask.style.display = 'none';

    SECTIONS.forEach((sec) => sec.tiles.forEach((t) => updateTileUI(t.id)));
    saveState();
  }

  function applyProfile(name) {
    if (state.activeProfile === name) {
      resetAll();
      return;
    }
    resetAll();
    state.activeProfile = name;
    const p = PROFILES[name];
    if (!p) return;

    applyLevel('font-size', p.font);
    applyLevel('line-height', p.lh);
    applyLevel('letter-spacing', p.ls);
    applyToggle('dyslexia', p.dyslexia);
    applyToggle('align-left', p.align);
    applyToggle('highlight-links', p.links);
    applyToggle('highlight-titles', p.titles);
    applyToggle('hide-images', p.hideImages);
    if (p.dark) applyToggle('dark-contrast', true);
    if (p.light) applyToggle('light-contrast', true);
    applyToggle('reading-guide', p.guide);
    applyToggle('reading-mask', p.mask);
    applyToggle('big-cursor', p.cursor);
    applyToggle('pause-animations', p.pause);

    SECTIONS[0].tiles.forEach((t) => updateTileUI(t.id));
    saveState();
  }

  function handleTileClick(id) {
    const tile = getTileConfig(id);
    if (!tile) return;
    state.activeProfile = null;
    SECTIONS[0].tiles.forEach((t) => updateTileUI(t.id));

    if (tile.type === 'profile') {
      applyProfile(tile.profile);
      return;
    }

    if (tile.type === 'level') {
      const next = ((state.levels[id] || 0) % tile.max) + 1;
      const level = next > tile.max ? 0 : next;
      applyLevel(id, level);
      saveState();
      return;
    }

    applyToggle(id, !state.toggles[id]);
    saveState();
  }

  function openPanel() {
    lastFocus = document.activeElement;
    els.overlay.classList.add('open');
    els.panel.classList.add('open');
    els.toggle.classList.add('open');
    els.toggle.setAttribute('aria-expanded', 'true');
    els.panel.setAttribute('aria-hidden', 'false');
    els.overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    els.close.focus();
  }

  function closePanel() {
    els.overlay.classList.remove('open');
    els.panel.classList.remove('open');
    els.toggle.classList.remove('open');
    els.toggle.setAttribute('aria-expanded', 'false');
    els.panel.setAttribute('aria-hidden', 'true');
    els.overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    else els.toggle.focus();
  }

  function onPointerMove(e) {
    if (state.toggles['reading-guide']) {
      els.guide.style.top = `${e.clientY - 2}px`;
    }
    if (state.toggles['reading-mask']) {
      const h = 140;
      els.mask.style.top = `${e.clientY - h / 2}px`;
      els.mask.style.height = `${h}px`;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        levels: state.levels,
        toggles: state.toggles,
        activeProfile: state.activeProfile
      }));
    } catch (_) { /* ignore */ }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.activeProfile && PROFILES[saved.activeProfile]) {
        applyProfile(saved.activeProfile);
        return;
      }
      if (saved.levels) {
        Object.entries(saved.levels).forEach(([id, level]) => applyLevel(id, level));
      }
      if (saved.toggles) {
        Object.entries(saved.toggles).forEach(([id, on]) => {
          if (on) applyToggle(id, true);
        });
      }
    } catch (_) { /* ignore */ }
  }

  function bindEvents() {
    els.toggle.addEventListener('click', () => {
      if (els.panel.classList.contains('open')) closePanel();
      else openPanel();
    });
    els.close.addEventListener('click', closePanel);
    els.overlay.addEventListener('click', closePanel);
    document.getElementById('accReset').addEventListener('click', resetAll);

    SECTIONS.forEach((sec) => {
      sec.tiles.forEach((tile) => {
        document.getElementById(`acc-${tile.id}`).addEventListener('click', () => handleTileClick(tile.id));
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && els.panel.classList.contains('open')) closePanel();
    });

    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('touchmove', (e) => {
      if (e.touches[0]) onPointerMove(e.touches[0]);
    }, { passive: true });
  }

  function init() {
    const wrap = document.createElement('div');
    wrap.id = 'accWidget';
    wrap.innerHTML = buildMarkup();
    document.documentElement.appendChild(wrap);

    els = {
      toggle: document.getElementById('accToggle'),
      overlay: document.getElementById('accOverlay'),
      panel: document.getElementById('accPanel'),
      close: document.getElementById('accClose'),
      guide: document.getElementById('accGuide'),
      mask: document.getElementById('accMask')
    };

    bindEvents();
    loadState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
