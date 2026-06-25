/* ── ASDF Site Search ── */
(function () {

  // ── Search index ──────────────────────────────────────────────────
  const INDEX = [
    // Pages
    { type: 'Page', title: 'Home', desc: 'Africa Sand Dam Foundation homepage — hero, our reach, solutions, partners, news.', url: 'index.html', tags: 'home asdf foundation water kenya' },
    { type: 'Page', title: 'About Us', desc: 'Learn about ASDF — our journey, vision, mission and 15 years of work in Kenya.', url: 'about.html', tags: 'about journey vision mission ngo kenya 2010' },
    { type: 'Page', title: 'Blog', desc: 'Stories, updates and insights from our work on the ground.', url: 'blog.html', tags: 'blog news stories updates articles' },
    { type: 'Page', title: 'Contact Us', desc: 'Get in touch — phone, email, working hours and contact form.', url: 'contact.html', tags: 'contact phone email address working hours form' },
    { type: 'Page', title: 'Donate', desc: 'Support ASDF — fund sand dams, clean water, trees and food security for communities in Kenya.', url: 'donate.html', tags: 'donate give donation support fund contribute volunteer money gift' },

    // Solutions
    { type: 'Solution', title: 'Water Access', desc: 'Sand dams, shallow wells, solar pipelines and school water tanks.', url: 'solution-water-access.html', tags: 'water dam wells pipeline tank access clean drinking' },
    { type: 'Solution', title: 'Environmental Conservation & NRM', desc: 'Tree planting, soil conservation and natural resource management.', url: 'solution-environmental-conservation.html', tags: 'trees environment conservation nrm forest soil erosion' },
    { type: 'Solution', title: 'Food Production & Livelihoods', desc: 'Climate-smart farming, cooperatives and household income generation.', url: 'solution-food-production.html', tags: 'food farming livelihoods agriculture crops income cooperative' },
    { type: 'Solution', title: 'Hygiene & Sanitation', desc: 'WASH facilities, school sanitation units and hygiene education.', url: 'solution-hygiene-sanitation.html', tags: 'hygiene sanitation wash toilet handwashing health school' },
    { type: 'Solution', title: 'Skills & Knowledge Management', desc: 'Training community leaders, masons and water committees.', url: 'solution-skills-knowledge.html', tags: 'skills training knowledge capacity community leader education' },

    // Blog posts
    { type: 'Blog', title: 'Building Sustainable Water Systems in Arid Communities', desc: 'Sand dams transforming water access in Makueni County.', url: 'blog.html#post1', tags: 'water sand dam makueni arid communities sustainable' },
    { type: 'Blog', title: 'How Sand Dams Are Transforming Lives', desc: 'Communities taking ownership of their water infrastructure.', url: 'blog.html#post2', tags: 'sand dam community transform lives ownership' },
    { type: 'Blog', title: 'Clean Water in Schools Keeps Girls Enrolled', desc: 'Safe water and sanitation directly impacts girls\' attendance.', url: 'blog.html#post3', tags: 'school girls education water attendance enrolment sanitation' },
    { type: 'Blog', title: 'One Million Trees: Restoring Green Cover', desc: 'Reforestation alongside sand dam construction in Kitui.', url: 'blog.html#post4', tags: 'trees million reforestation kitui green cover environment' },
    { type: 'Blog', title: 'From Water Scarcity to Food Security', desc: 'The ASDF farmer model and income cooperatives.', url: 'blog.html#post5', tags: 'food security water scarcity farmer cooperative income' },
    { type: 'Blog', title: 'Women Leading Water Committees', desc: 'Female-led committees proving most effective in Machakos.', url: 'blog.html#post6', tags: 'women leadership water committee machakos gender' },
    { type: 'Blog', title: 'Solar-Powered Pipelines Bring Water to Remote Villages', desc: 'Solar pumping extends clean water access beyond dam sites.', url: 'blog.html#post7', tags: 'solar pipeline remote village pump clean water' },

    // Quick sections
    { type: 'Section', title: 'Our Reach — Stats', desc: '1.1M+ people reached, 734+ sand dams, 598+ wells, 346+ school tanks.', url: 'index.html#solutions', tags: 'statistics reach impact numbers dams wells tanks trees' },
    { type: 'Section', title: 'Our Partners', desc: 'The Water Project, Sand Dams Worldwide, Just a Drop, PAH, ERM Foundation.', url: 'index.html#projects', tags: 'partners collaborate organisations ngos donors' },
  ];

  // ── Helpers ───────────────────────────────────────────────────────
  function score(item, query) {
    const q = query.toLowerCase().trim();
    if (!q) return 0;
    const haystack = (item.title + ' ' + item.desc + ' ' + item.tags).toLowerCase();
    const words = q.split(/\s+/);
    let s = 0;
    words.forEach(w => {
      if (item.title.toLowerCase().includes(w)) s += 3;
      else if (item.desc.toLowerCase().includes(w)) s += 2;
      else if (haystack.includes(w)) s += 1;
    });
    return s;
  }

  function search(query) {
    if (!query.trim()) return [];
    return INDEX
      .map(item => ({ ...item, _score: score(item, query) }))
      .filter(item => item._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 10);
  }

  function hl(text, query) {
    if (!query.trim()) return text;
    const words = query.trim().split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = new RegExp(`(${words.join('|')})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  const TYPE_ICON = {
    Page:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>',
    Solution: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6 8 4 12 4 15a8 8 0 0 0 16 0c0-3-2-7-8-13z"/></svg>',
    Blog:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
    Section:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
  };

  // ── Build overlay DOM ─────────────────────────────────────────────
  function buildOverlay() {
    const el = document.createElement('div');
    el.id = 'searchOverlay';
    el.className = 'search-overlay';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Site search');
    el.innerHTML = `
      <div class="search-backdrop"></div>
      <div class="search-modal">
        <div class="search-input-wrap">
          <svg class="search-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input id="searchInput" type="text" class="search-input-field" placeholder="Search pages, solutions, blog posts…" autocomplete="off" spellcheck="false">
          <kbd class="search-esc-hint">ESC</kbd>
        </div>
        <div id="searchResults" class="search-results" role="listbox"></div>
        <div class="search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Open</span>
          <span><kbd>Esc</kbd> Close</span>
        </div>
      </div>`;
    document.body.appendChild(el);
    return el;
  }

  // ── Render results ────────────────────────────────────────────────
  function renderResults(results, query, container) {
    if (!query.trim()) {
      container.innerHTML = `<p class="search-hint">Start typing to search across pages, solutions and blog posts…</p>`;
      return;
    }
    if (!results.length) {
      container.innerHTML = `<p class="search-hint">No results for <strong>"${query}"</strong> — try different keywords.</p>`;
      return;
    }

    // Group by type
    const groups = {};
    results.forEach(r => {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type].push(r);
    });

    let html = '';
    Object.entries(groups).forEach(([type, items]) => {
      html += `<div class="search-group"><div class="search-group-label">${type}s</div>`;
      items.forEach((item, i) => {
        html += `
          <a href="${item.url}" class="search-result-item" role="option" tabindex="-1" data-idx="${i}">
            <span class="result-type-icon">${TYPE_ICON[item.type] || ''}</span>
            <span class="result-body">
              <span class="result-title">${hl(item.title, query)}</span>
              <span class="result-desc">${hl(item.desc, query)}</span>
            </span>
            <span class="result-arrow">↗</span>
          </a>`;
      });
      html += `</div>`;
    });

    container.innerHTML = html;
  }

  // ── Keyboard nav ──────────────────────────────────────────────────
  function setupKeyNav(overlay, input, resultsEl) {
    let active = -1;

    function items() { return [...resultsEl.querySelectorAll('.search-result-item')]; }

    function setActive(idx) {
      const all = items();
      all.forEach(el => el.classList.remove('active'));
      active = Math.max(-1, Math.min(idx, all.length - 1));
      if (active >= 0) {
        all[active].classList.add('active');
        all[active].scrollIntoView({ block: 'nearest' });
      }
    }

    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown')  { e.preventDefault(); setActive(active + 1); }
      if (e.key === 'ArrowUp')    { e.preventDefault(); setActive(active - 1); }
      if (e.key === 'Enter') {
        const all = items();
        if (active >= 0 && all[active]) { window.location.href = all[active].href; }
        else if (all[0]) { window.location.href = all[0].href; }
      }
      if (e.key === 'Escape') closeOverlay();
    });

    // Reset active index on new query
    input.addEventListener('input', () => { active = -1; });
  }

  // ── Open / Close ──────────────────────────────────────────────────
  let overlay = null;

  function openOverlay() {
    if (!overlay) overlay = buildOverlay();
    const input = document.getElementById('searchInput');
    const resultsEl = document.getElementById('searchResults');

    // Render empty state
    renderResults([], '', resultsEl);

    overlay.classList.add('open');
    document.body.classList.add('search-open');
    setTimeout(() => input.focus(), 60);

    // Live search
    input.value = '';
    input.addEventListener('input', () => {
      const q = input.value;
      renderResults(search(q), q, resultsEl);
    });

    setupKeyNav(overlay, input, resultsEl);

    // Close on backdrop click
    overlay.querySelector('.search-backdrop').addEventListener('click', closeOverlay);
  }

  function closeOverlay() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.classList.remove('search-open');
    const input = document.getElementById('searchInput');
    if (input) input.value = '';
  }

  // ── Global keyboard shortcut ─────────────────────────────────────
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openOverlay(); }
    if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) closeOverlay();
  });

  // ── Wire trigger buttons ─────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.search-trigger').forEach(btn => {
      btn.addEventListener('click', openOverlay);
    });
  });

})();

/* ── Solutions Mega Menu ─────────────────────────────────────────── */
(function () {
  const ICON = {
    water: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6 8 4 12 4 15a8 8 0 0 0 16 0c0-3-2-7-8-13z"/></svg>',
    env:   '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.34A16 16 0 0 0 8.53 21c4.72-1.81 8.49-5.81 8.49-13z"/><path d="M17 8c0 10-5 13-9 13"/></svg>',
    food:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12"/><path d="M12 12a5 5 0 0 0 5-5c0-2.8-2.2-5-5-5s-5 2.2-5 5a5 5 0 0 0 5 5z"/><path d="M17 12a4 4 0 0 0 4-4c0-2.2-1.8-4-4-4"/><path d="M7 12a4 4 0 0 1-4-4c0-2.2 1.8-4 4-4"/></svg>',
    wash:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
    skills:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
  };

  const SOLUTIONS = [
    { title: 'Water Access', url: 'solution-water-access.html', icon: ICON.water,
      children: [
        { title: 'Rock Catchments',   url: 'solution-water-access.html#rock-catchments' },
        { title: 'Sand Dams',         url: 'solution-water-access.html#sand-dams' },
        { title: 'School Water Tanks', url: 'solution-water-access.html#school-water-tanks' },
        { title: 'Shallow Wells',     url: 'solution-water-access.html#shallow-wells' },
        { title: 'Solar Pipelines',   url: 'solution-water-access.html#solar-pipelines' }
      ] },
    { title: 'Environmental Conservation &amp; NRM', url: 'solution-environmental-conservation.html', icon: ICON.env,
      children: [
        { title: 'Agro-Forestry',  url: 'solution-environmental-conservation.html#agro-forestry' },
        { title: 'Energy Stoves',  url: 'solution-environmental-conservation.html#energy-stoves' },
        { title: 'Farm Terracing', url: 'solution-environmental-conservation.html#farm-terracing' }
      ] },
    { title: 'Food Production &amp; Livelihoods', url: 'solution-food-production.html', icon: ICON.food,
      children: [
        { title: 'Drought Tolerant Seeds', url: 'solution-food-production.html#drought-tolerant-seeds' },
        { title: 'Food Production',        url: 'solution-food-production.html#food-production' },
        { title: 'Pasture Production',     url: 'solution-food-production.html#pasture-production' }
      ] },
    { title: 'Hygiene &amp; Sanitation', url: 'solution-hygiene-sanitation.html', icon: ICON.wash,
      desc: 'WASH facilities, school sanitation units and hygiene education.' },
    { title: 'Skills &amp; Knowledge Management', url: 'solution-skills-knowledge.html', icon: ICON.skills,
      desc: 'Training community leaders, masons and water committees.' }
  ];

  function build() {
    let wrap = null;
    document.querySelectorAll('.nav-dropdown-wrap .dropdown-trigger').forEach(t => {
      if (/our solutions/i.test(t.textContent)) wrap = t.closest('.nav-dropdown-wrap');
    });
    if (!wrap) return;
    const dd = wrap.querySelector('.nav-dropdown');
    if (!dd) return;

    let html = '<div class="mega-grid">';
    SOLUTIONS.forEach(s => {
      html += '<div class="mega-col">';
      html += '<a class="mega-col-title" href="' + s.url + '"><span class="mega-col-icon">' + s.icon + '</span><span>' + s.title + '</span></a>';
      if (s.children) {
        html += '<ul class="mega-sublist">';
        s.children.forEach(c => { html += '<li><a href="' + c.url + '">' + c.title + '</a></li>'; });
        html += '</ul>';
      } else {
        html += '<p class="mega-col-desc">' + s.desc + '</p>';
      }
      html += '</div>';
    });
    html += '</div>';

    dd.innerHTML = html;
    dd.classList.add('mega-menu');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
