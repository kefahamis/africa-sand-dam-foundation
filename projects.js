/* ── ASDF Projects Map ──
   Data comes from projects-data.js (window.ASDF_PROJECTS), generated from the
   ASDF Dams & Tanks Monthly Report tracker. ~1,800 real projects, so map
   markers are clustered for performance. */

const TYPE_COLORS = {
  'Sand Dam':      '#5e1062',
  'Shallow Well':  '#2a7db5',
  'School Tank':   '#e8920a',
  'Solar Pipeline':'#2e9e5b',
  'WASH Facility': '#9b59b6',
  'Rock Catchment':'#c0392b',
  'Road Crossing': '#7f5539',
};

// Rotate through available images (placeholder photos until real per-project photos are added)
const IMGS = ['images/hero-1.png','images/hero-2.png','images/hero-3.png'];
function imgsFor(id){ const a=id%3, b=(id+1)%3, c=(id+2)%3; return [IMGS[a],IMGS[b],IMGS[c]]; }

// Build the working project list from the tracker data
const PROJECTS = (window.ASDF_PROJECTS || []).map(p => ({
  ...p,
  images: imgsFor(p.id),
}));

// ── Count stats ──────────────────────────────────────────────────────
function updateStats(visible) {
  const by = t => visible.filter(p => p.type === t).length;
  document.getElementById('countAll').textContent  = visible.length;
  document.getElementById('countDam').textContent  = by('Sand Dam');
  document.getElementById('countWell').textContent = by('Shallow Well');
  document.getElementById('countTank').textContent = by('School Tank');
  document.getElementById('countSolar').textContent= by('Solar Pipeline');
  document.getElementById('countRock').textContent = by('Rock Catchment');
  document.getElementById('countRoad').textContent = by('Road Crossing');
  document.getElementById('visibleCount').textContent = visible.length;
  document.getElementById('totalCount').textContent   = PROJECTS.length;
}

// ── Custom circle marker ─────────────────────────────────────────────
function makeMarker(project) {
  const color = TYPE_COLORS[project.type] || '#5e1062';
  // Approximate-location markers are drawn hollow/dashed and faded so they read as estimates.
  const inner = project.approx
    ? `<circle cx="14" cy="14" r="6" fill="none" stroke="white" stroke-width="2.5" stroke-dasharray="3 2"/>`
    : `<circle cx="14" cy="14" r="6" fill="white" opacity="0.9"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36" style="${project.approx ? 'opacity:0.6' : ''}">
    <filter id="ds"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.35)"/></filter>
    <path d="M14 0C6.27 0 0 6.27 0 14c0 9.33 14 22 14 22S28 23.33 28 14C28 6.27 21.73 0 14 0z" fill="${color}" filter="url(#ds)"/>
    ${inner}
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
  });
}

// ── Popup HTML ───────────────────────────────────────────────────────
function metaItem(color, icon, label, value) {
  return `<div class="popup-meta-item">
      <span class="popup-meta-icon" style="background:${color}15;color:${color}">
        <i class="fa-solid ${icon}"></i>
      </span>
      <div class="popup-meta-text">
        <span class="meta-label">${label}</span>
        <span class="meta-value">${value}</span>
      </div>
    </div>`;
}

function makePopup(p) {
  const color = TYPE_COLORS[p.type] || '#5e1062';
  const items = [];
  items.push(metaItem(color, 'fa-location-dot', 'County', `${p.county}`));
  if (p.subcounty) items.push(metaItem(color, 'fa-map-pin', 'Sub-County', p.subcounty));
  if (p.year)          items.push(metaItem(color, 'fa-calendar-days', 'Year Built', p.year));
  if (p.beneficiaries) items.push(metaItem(color, 'fa-users', 'Beneficiaries', p.beneficiaries.toLocaleString()));
  if (p.school)   items.push(metaItem(color, 'fa-school', 'School', p.school));
  if (p.village)  items.push(metaItem(color, 'fa-house', 'Village', p.village));
  if (p.donor)    items.push(metaItem(color, 'fa-hand-holding-heart', 'Funded by', p.donor));

  const approxNote = p.approx
    ? `<div class="popup-approx"><i class="fa-solid fa-circle-info"></i> Approximate location — placed at the community group's sand dam (exact tank GPS not yet recorded).</div>`
    : '';

  return `<div class="map-popup">
    <div class="popup-type" style="background:${color}">
      <i class="fa-solid fa-droplet popup-type-icon"></i>${p.type}
    </div>
    <h4 class="popup-title">${p.name}</h4>
    <div class="popup-meta">
      ${items.join('')}
    </div>
    ${approxNote}
    <div class="popup-footer">
      <button class="popup-photos-btn" style="background:${color}" onclick="openLightbox(${p.id})">
        <i class="fa-solid fa-images"></i>
        View Photos
        <span class="popup-photo-count">${p.images.length}</span>
      </button>
    </div>
  </div>`;
}

// ── Project list card HTML ───────────────────────────────────────────
function makeListCard(p) {
  const color = TYPE_COLORS[p.type] || '#5e1062';
  const div = document.createElement('div');
  div.className = 'project-list-card';
  div.dataset.id = p.id;

  // Second metric: beneficiaries if we have them, otherwise the sub-county/village
  const metric2 = p.beneficiaries
    ? `<span><i class="fa-solid fa-users" style="color:${color}"></i> ${p.beneficiaries.toLocaleString()}</span>`
    : (p.subcounty ? `<span><i class="fa-solid fa-map-pin" style="color:${color}"></i> ${p.subcounty}</span>` : '');

  const yearTag = p.year
    ? `<span class="plc-year"><i class="fa-regular fa-calendar"></i> ${p.year}</span>`
    : '';

  const bottom = p.school
    ? `<div class="plc-community"><i class="fa-solid fa-school" style="color:${color}"></i><span>${p.school}</span></div>`
    : (p.donor ? `<div class="plc-community"><i class="fa-solid fa-hand-holding-heart" style="color:${color}"></i><span>${p.donor}</span></div>` : '');

  div.innerHTML = `
    <div class="plc-type-bar" style="background:${color}"></div>
    <div class="plc-body">
      <div class="plc-header">
        <span class="plc-badge" style="color:${color};border-color:${color}">
          <i class="fa-solid fa-droplet plc-badge-icon"></i>${p.type}
        </span>
        ${yearTag}
      </div>
      <h4 class="plc-title">${p.name}${p.approx ? ' <span class="plc-approx-tag"><i class="fa-solid fa-circle-info"></i>approx</span>' : ''}</h4>
      <div class="plc-meta">
        <span><i class="fa-solid fa-location-dot" style="color:${color}"></i> ${p.county}</span>
        ${metric2}
      </div>
      ${bottom}
    </div>`;

  div.addEventListener('click', () => focusProject(p, div));
  return div;
}

// ── Map init ─────────────────────────────────────────────────────────
let map;
let clusterGroup;
let allMarkers = {};   // id → L.marker
let allListCards = {}; // id → DOM element

function focusProject(p, card) {
  const marker = allMarkers[p.id];
  document.querySelectorAll('.project-list-card').forEach(c => c.classList.remove('active'));
  if (card) { card.classList.add('active'); card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  if (!marker) return;
  // Reveal the marker (it may be inside a cluster) then open its popup
  clusterGroup.zoomToShowLayer(marker, () => marker.openPopup());
}

function initMap() {
  map = L.map('projectsMap', {
    center: [-1.5, 37.8],
    zoom: 9,
    zoomControl: false,
  });

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // CartoDB Positron tiles (no API key, works from file://)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  // County boundary highlights (rough bounding boxes as rectangles)
  const countyStyles = { weight: 1.5, fillOpacity: 0.03, color: '#5e1062', fillColor: '#5e1062', dashArray: '4' };
  L.rectangle([[-2.75, 37.35], [-1.65, 38.35]], countyStyles).addTo(map).bindTooltip('Makueni County', {sticky:true});
  L.rectangle([[-1.65, 36.85], [-0.85, 37.72]], countyStyles).addTo(map).bindTooltip('Machakos County', {sticky:true});
  L.rectangle([[-1.90, 37.72], [-0.40, 38.70]], countyStyles).addTo(map).bindTooltip('Kitui County', {sticky:true});

  // Marker cluster group (handles ~1,800 markers smoothly)
  clusterGroup = L.markerClusterGroup({
    chunkedLoading: true,
    maxClusterRadius: 55,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    iconCreateFunction: cluster => {
      const n = cluster.getChildCount();
      const size = n < 25 ? 40 : n < 100 ? 48 : 58;
      return L.divIcon({
        html: `<div class="asdf-cluster"><span>${n}</span></div>`,
        className: 'asdf-cluster-wrap',
        iconSize: [size, size],
      });
    },
  });
  map.addLayer(clusterGroup);

  // Build markers + list cards
  const listEl = document.getElementById('projectList');
  const frag = document.createDocumentFragment();
  PROJECTS.forEach(p => {
    const marker = L.marker([p.lat, p.lng], { icon: makeMarker(p) })
      .bindPopup(makePopup(p), { maxWidth: 280, className: 'asdf-popup' });

    marker.on('click', () => {
      const card = allListCards[p.id];
      if (card) {
        document.querySelectorAll('.project-list-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    allMarkers[p.id] = marker;
    const card = makeListCard(p);
    allListCards[p.id] = card;
    frag.appendChild(card);
  });
  listEl.appendChild(frag);

  clusterGroup.addLayers(Object.values(allMarkers));
  updateStats(PROJECTS);
  buildYearOptions();
}

// ── Dynamic year dropdown (built from the data) ───────────────────────
function buildYearOptions() {
  const sel = document.getElementById('filterYear');
  if (!sel) return;
  const years = [...new Set(PROJECTS.map(p => p.year).filter(Boolean))].sort((a, b) => b - a);
  sel.innerHTML = '<option value="all">All Years</option>' +
    years.map(y => `<option value="${y}">${y}</option>`).join('');
}

// ── Filter logic ──────────────────────────────────────────────────────
let activeCounty = 'all';
let activeYear   = 'all';
let searchQuery  = '';

function getActiveTypes() {
  return [...document.querySelectorAll('#typeFilters input:checked')].map(i => i.value);
}

function applyFilters() {
  const types = getActiveTypes();
  const filtered = PROJECTS.filter(p => {
    const matchType   = types.includes(p.type);
    const matchCounty = activeCounty === 'all' || p.county === activeCounty;
    const matchYear   = activeYear   === 'all' || p.year === parseInt(activeYear);
    const matchSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      (p.donor && p.donor.toLowerCase().includes(searchQuery)) ||
      (p.village && p.village.toLowerCase().includes(searchQuery)) ||
      (p.subcounty && p.subcounty.toLowerCase().includes(searchQuery)) ||
      (p.school && p.school.toLowerCase().includes(searchQuery)) ||
      p.county.toLowerCase().includes(searchQuery);
    return matchType && matchCounty && matchYear && matchSearch;
  });

  const visibleIds = new Set(filtered.map(p => p.id));

  // Rebuild the cluster with only the visible markers
  clusterGroup.clearLayers();
  clusterGroup.addLayers(filtered.map(p => allMarkers[p.id]));

  // Show/hide list cards
  PROJECTS.forEach(p => {
    allListCards[p.id].style.display = visibleIds.has(p.id) ? '' : 'none';
  });

  updateStats(filtered);

  // Fit map to visible markers if any
  if (filtered.length > 0) {
    const bounds = L.latLngBounds(filtered.map(p => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }
}

// ── Wire up filters ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMap();

  // County chips
  document.querySelectorAll('#countyChips .chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#countyChips .chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCounty = btn.dataset.county;
      applyFilters();
    });
  });

  // Type checkboxes
  document.querySelectorAll('#typeFilters input').forEach(chk => {
    chk.addEventListener('change', applyFilters);
  });

  // Year select
  document.getElementById('filterYear').addEventListener('change', e => {
    activeYear = e.target.value;
    applyFilters();
  });

  // Search input
  document.getElementById('filterSearch').addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
  });

  // Reset
  document.getElementById('resetFilters').addEventListener('click', () => {
    activeCounty = 'all';
    activeYear   = 'all';
    searchQuery  = '';
    document.getElementById('filterSearch').value = '';
    document.getElementById('filterYear').value = 'all';
    document.querySelectorAll('#countyChips .chip').forEach((b, i) => b.classList.toggle('active', i === 0));
    document.querySelectorAll('#typeFilters input').forEach(c => c.checked = true);
    applyFilters();
  });
});

// ── Lightbox ─────────────────────────────────────────────────────────
let lbProject = null;
let lbIndex   = 0;

function buildLightbox() {
  if (document.getElementById('projectLightbox')) return;
  const lb = document.createElement('div');
  lb.id = 'projectLightbox';
  lb.className = 'lb-overlay';
  lb.innerHTML = `
    <div class="lb-backdrop"></div>
    <div class="lb-modal">

      <!-- Header -->
      <div class="lb-header">
        <div class="lb-header-left">
          <span class="lb-type-badge" id="lbTypeBadge"></span>
          <span class="lb-title" id="lbTitle"></span>
        </div>
        <button class="lb-close" id="lbClose" aria-label="Close gallery">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Main image stage -->
      <div class="lb-stage">
        <button class="lb-arrow lb-prev" id="lbPrev" aria-label="Previous image">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div class="lb-img-wrap" id="lbImgWrap">
          <img id="lbMainImg" src="" alt="Project photo" class="lb-main-img">
          <div class="lb-img-loader"><i class="fa-solid fa-circle-notch fa-spin"></i></div>
        </div>
        <button class="lb-arrow lb-next" id="lbNext" aria-label="Next image">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <!-- Footer: counter + thumbnails -->
      <div class="lb-footer">
        <span class="lb-counter" id="lbCounter">1 / 3</span>
        <div class="lb-thumbs" id="lbThumbs"></div>
        <div class="lb-meta" id="lbMeta"></div>
      </div>

    </div>`;
  document.body.appendChild(lb);

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => lbNav(-1));
  document.getElementById('lbNext').addEventListener('click', () => lbNav(+1));
  lb.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  lbNav(-1);
    if (e.key === 'ArrowRight') lbNav(+1);
    if (e.key === 'Escape')     closeLightbox();
  });
}

function lbNav(dir) {
  if (!lbProject) return;
  lbIndex = (lbIndex + dir + lbProject.images.length) % lbProject.images.length;
  lbShow();
}

function lbShow() {
  const p   = lbProject;
  const img = p.images[lbIndex];
  const color = TYPE_COLORS[p.type] || '#5e1062';

  // Badge + title
  document.getElementById('lbTypeBadge').textContent = p.type;
  document.getElementById('lbTypeBadge').style.background = color;
  document.getElementById('lbTitle').textContent = p.name;

  // Main image with fade
  const mainImg  = document.getElementById('lbMainImg');
  const wrap     = document.getElementById('lbImgWrap');
  wrap.classList.add('loading');
  mainImg.style.opacity = '0';
  mainImg.onload = () => {
    wrap.classList.remove('loading');
    mainImg.style.opacity = '1';
  };
  mainImg.src = img;

  // Counter
  document.getElementById('lbCounter').textContent = `${lbIndex + 1} / ${p.images.length}`;

  // Thumbnails
  const thumbsEl = document.getElementById('lbThumbs');
  thumbsEl.innerHTML = p.images.map((src, i) => `
    <button class="lb-thumb ${i === lbIndex ? 'active' : ''}" data-i="${i}" style="${i === lbIndex ? `border-color:${color}` : ''}">
      <img src="${src}" alt="Thumb ${i+1}">
    </button>`).join('');
  thumbsEl.querySelectorAll('.lb-thumb').forEach(btn => {
    btn.addEventListener('click', () => { lbIndex = +btn.dataset.i; lbShow(); });
  });

  // Meta
  const metaBits = [`<span><i class="fa-solid fa-location-dot" style="color:${color}"></i> ${p.county} County</span>`];
  if (p.beneficiaries) metaBits.push(`<span><i class="fa-solid fa-users" style="color:${color}"></i> ${p.beneficiaries.toLocaleString()} beneficiaries</span>`);
  if (p.year)          metaBits.push(`<span><i class="fa-solid fa-calendar-days" style="color:${color}"></i> Built ${p.year}</span>`);
  document.getElementById('lbMeta').innerHTML = metaBits.join('');

  // Arrow visibility
  document.getElementById('lbPrev').style.display = p.images.length > 1 ? '' : 'none';
  document.getElementById('lbNext').style.display = p.images.length > 1 ? '' : 'none';
}

window.openLightbox = function(projectId) {
  buildLightbox();
  lbProject = PROJECTS.find(p => p.id === projectId);
  lbIndex   = 0;
  if (!lbProject) return;
  document.getElementById('projectLightbox').classList.add('open');
  document.body.classList.add('lb-open');
  lbShow();
};

function closeLightbox() {
  const lb = document.getElementById('projectLightbox');
  if (lb) lb.classList.remove('open');
  document.body.classList.remove('lb-open');
}
