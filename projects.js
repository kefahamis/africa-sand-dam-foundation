/* ── ASDF Projects Map ── */

const TYPE_COLORS = {
  'Sand Dam':      '#5e1062',
  'Shallow Well':  '#2a7db5',
  'School Tank':   '#e8920a',
  'Solar Pipeline':'#2e9e5b',
  'WASH Facility': '#9b59b6',
  'Rock Catchment':'#c0392b',
};

// Rotate through available images (in production replace with real per-project photos)
const IMGS = ['images/hero-1.png','images/hero-2.png','images/hero-3.png'];
function imgs(a,b,c){ return [IMGS[a],IMGS[b],IMGS[c]]; }

const PROJECTS = [
  // ── Makueni County ──
  { id:1,  name:'Nzaui Sand Dam',          images: imgs(0,1,2),          type:'Sand Dam',       county:'Makueni', lat:-1.9132, lng:37.6781, year:2022, community:'Nzaui Community Group',         beneficiaries:1200, desc:'A 4m-high sand dam capturing 18,000m³ of water per season serving 5 villages.' },
  { id:2,  images: imgs(2,0,1),  name:'Katheka Shallow Well',     type:'Shallow Well',   county:'Makueni', lat:-2.0411, lng:37.5522, year:2021, community:'Katheka Self-Help Group',        beneficiaries:320,  desc:'30m deep well adjacent to sand dam, providing clean water to 320 households.' },
  { id:3,  images: imgs(0,1,2),  name:'Wote Girls School Tank',   type:'School Tank',    county:'Makueni', lat:-1.7844, lng:37.6328, year:2023, community:'Wote Girls Secondary School',    beneficiaries:480,  desc:'50,000L rainwater tank ensuring year-round water for 480 students.' },
  { id:4,  images: imgs(1,0,2),  name:'Kibwezi Solar Pipeline',   type:'Solar Pipeline', county:'Makueni', lat:-2.4103, lng:37.9706, year:2024, community:'Kibwezi Water Users Assoc.',     beneficiaries:2100, desc:'3km solar-powered pipeline bringing sand dam water to 7 remote homesteads.' },
  { id:5,  images: imgs(2,1,0),  name:'Makindu Sand Dam',         type:'Sand Dam',       county:'Makueni', lat:-2.2838, lng:37.8264, year:2020, community:'Makindu Group',                  beneficiaries:950,  desc:'Reinforced sand dam on Makindu River — third in a cascade of dams.' },
  { id:6,  images: imgs(0,2,1),  name:'Sultan Hamud WASH',        type:'WASH Facility',  county:'Makueni', lat:-2.0422, lng:37.7119, year:2023, community:'Sultan Hamud Primary School',    beneficiaries:560,  desc:'6-door latrine block and handwashing stations serving 560 school children.' },
  { id:7,  images: imgs(1,2,0),  name:'Mukaa Sand Dam',           type:'Sand Dam',       county:'Makueni', lat:-1.9622, lng:37.5110, year:2019, community:'Mukaa Water Committee',          beneficiaries:780,  desc:'Sand dam and adjacent scooping hole providing drinking water for 3 villages.' },
  { id:8,  images: imgs(2,0,1),  name:'Mtito Andei Rock Catch.',  type:'Rock Catchment', county:'Makueni', lat:-2.6891, lng:38.1644, year:2021, community:'Mtito Andei Elders Group',       beneficiaries:415,  desc:'Natural granite rock catchment channelling rainwater into 2 storage tanks.' },
  { id:9,  images: imgs(0,1,2),  name:'Emali Shallow Well',       type:'Shallow Well',   county:'Makueni', lat:-2.0812, lng:37.4998, year:2022, community:'Emali Women\'s Group',           beneficiaries:290,  desc:'25m well drilled in dry riverbed, serving the Emali market area.' },
  { id:10,  images: imgs(1,0,2), name:'Mbooni School Tank',       type:'School Tank',    county:'Makueni', lat:-1.7631, lng:37.4512, year:2024, community:'Mbooni Primary School',          beneficiaries:320,  desc:'30,000L tank and guttering installed on classroom blocks.' },

  // ── Machakos County ──
  { id:11,  images: imgs(2,1,0), name:'Masii Sand Dam',           type:'Sand Dam',       county:'Machakos', lat:-1.4601, lng:37.5889, year:2018, community:'Masii Community',                beneficiaries:1500, desc:'Large-scale sand dam serving as anchor for a cascade of 3 downstream structures.' },
  { id:12,  images: imgs(0,2,1), name:'Kangundo Shallow Well',    type:'Shallow Well',   county:'Machakos', lat:-1.2451, lng:37.3437, year:2020, community:'Kangundo Self-Help Group',        beneficiaries:410,  desc:'Hand-pumped well adjacent to sand dam in seasonal Kabaa River.' },
  { id:13,  images: imgs(1,2,0), name:'Kathiani WASH Block',      type:'WASH Facility',  county:'Machakos', lat:-1.3814, lng:37.1647, year:2022, community:'Kathiani Primary School',         beneficiaries:640,  desc:'Gender-separated toilet blocks and menstrual hygiene unit for 640 pupils.' },
  { id:14,  images: imgs(2,0,1), name:'Mutituni Sand Dam',        type:'Sand Dam',       county:'Machakos', lat:-1.5312, lng:37.4822, year:2021, community:'Mutituni Group',                  beneficiaries:870,  desc:'Community-built sand dam with scooping hole, reducing fetch time by 4 hours/day.' },
  { id:15,  images: imgs(0,1,2), name:'Machakos Solar Pipeline',  type:'Solar Pipeline', county:'Machakos', lat:-1.5177, lng:37.2634, year:2023, community:'Machakos Water Project',          beneficiaries:3200, desc:'2.5km solar pipeline connecting sand dam to a community distribution tap stand.' },
  { id:16,  images: imgs(1,0,2), name:'Athi River Rock Catch.',   type:'Rock Catchment', county:'Machakos', lat:-1.4501, lng:36.9812, year:2019, community:'Athi River Women Group',          beneficiaries:280,  desc:'Rock catchment collecting runoff from Athi escarpment into 3 lined ponds.' },
  { id:17,  images: imgs(2,1,0), name:'Iveti School Tank',        type:'School Tank',    county:'Machakos', lat:-1.5891, lng:37.3201, year:2024, community:'Iveti Primary School',            beneficiaries:290,  desc:'Two 10,000L tanks installed with first-flush diverter and mosquito proofing.' },
  { id:18,  images: imgs(0,2,1), name:'Kabaa Sand Dam',           type:'Sand Dam',       county:'Machakos', lat:-1.4101, lng:37.4219, year:2022, community:'Kabaa Community Group',           beneficiaries:640,  desc:'Sand dam constructed using community-sourced rock and ASDF technical support.' },
  { id:19,  images: imgs(1,2,0), name:'Yatta Shallow Well',       type:'Shallow Well',   county:'Machakos', lat:-1.1812, lng:37.5511, year:2020, community:'Yatta Farmers Group',             beneficiaries:380,  desc:'Well serving irrigated kitchen gardens along the Yatta Plateau edge.' },
  { id:20,  images: imgs(2,0,1), name:'Mwala WASH Facility',      type:'WASH Facility',  county:'Machakos', lat:-1.5501, lng:37.3871, year:2023, community:'Mwala Community Group',           beneficiaries:520,  desc:'Community sanitation block with 8 doors, hand-slab slabs and HWTS demonstration.' },

  // ── Kitui County ──
  { id:21,  images: imgs(0,1,2), name:'Kitui Town Sand Dam',      type:'Sand Dam',       county:'Kitui', lat:-1.3662, lng:38.0166, year:2018, community:'Kitui North Cooperative',          beneficiaries:2200, desc:'Flagship sand dam demonstrating ASDF methodology — now a training site.' },
  { id:22,  images: imgs(1,0,2), name:'Mwingi Solar Pipeline',    type:'Solar Pipeline', county:'Kitui', lat:-0.9361, lng:38.0643, year:2024, community:'Mwingi Water Project',             beneficiaries:1800, desc:'5km pipeline serving 6 villages, reducing walking distance from 9km to 0.5km.' },
  { id:23,  images: imgs(2,1,0), name:'Mutomo Rock Catchment',    type:'Rock Catchment', county:'Kitui', lat:-1.8403, lng:38.2070, year:2020, community:'Mutomo Elders Council',            beneficiaries:340,  desc:'Granite rock outcrop channelling seasonal rain into cement-lined storage.' },
  { id:24,  images: imgs(0,2,1), name:'Tseikuru Shallow Well',    type:'Shallow Well',   county:'Kitui', lat:-0.5812, lng:38.3122, year:2021, community:'Tseikuru Self-Help Group',          beneficiaries:460,  desc:'35m deep borehole with hand pump, installed alongside a sand dam structure.' },
  { id:25,  images: imgs(1,2,0), name:'Kyuso Sand Dam',           type:'Sand Dam',       county:'Kitui', lat:-0.6901, lng:38.0411, year:2022, community:'Kyuso Community Water Group',      beneficiaries:980,  desc:'Sand dam built by 240 community members over 4 months using local materials.' },
  { id:26,  images: imgs(2,0,1), name:'Zombe School Tank',        type:'School Tank',    county:'Kitui', lat:-1.5812, lng:38.1731, year:2023, community:'Zombe Secondary School',           beneficiaries:520,  desc:'80,000L tank system serving a boarding school of 520 students.' },
  { id:27,  images: imgs(0,1,2), name:'Kabati WASH Unit',         type:'WASH Facility',  county:'Kitui', lat:-0.9712, lng:37.8344, year:2022, community:'Kabati Primary School',            beneficiaries:380,  desc:'Ventilated improved pit latrines and handwashing stations for 380 pupils.' },
  { id:28,  images: imgs(1,0,2), name:'Nuu Sand Dam',             type:'Sand Dam',       county:'Kitui', lat:-1.6712, lng:38.3502, year:2019, community:'Nuu Women\'s Group',               beneficiaries:730,  desc:'Second cascade dam on Nuu river — multiplying upstream dam yield by 40%.' },
  { id:29,  images: imgs(2,1,0), name:'Ngomeni Sand Dam',         type:'Sand Dam',       county:'Kitui', lat:-1.1201, lng:38.0812, year:2021, community:'Ngomeni Group',                    beneficiaries:860,  desc:'Sand dam constructed with local masonry skills developed through ASDF training.' },
  { id:30,  images: imgs(0,2,1), name:'Mui Shallow Well',         type:'Shallow Well',   county:'Kitui', lat:-1.4412, lng:38.4211, year:2023, community:'Mui Valley Group',                 beneficiaries:275,  desc:'Hand-dug well reinforced with concrete rings, serving 275 households.' },
  { id:31,  images: imgs(1,2,0), name:'Endau Rock Catchment',     type:'Rock Catchment', county:'Kitui', lat:-1.6012, lng:38.5022, year:2020, community:'Endau Elders Group',               beneficiaries:190,  desc:'Rock catchment with 3 linked storage tanks fed by natural granite hillside.' },
  { id:32,  images: imgs(2,0,1), name:'Mumoni School Tank',       type:'School Tank',    county:'Kitui', lat:-0.8301, lng:38.1711, year:2024, community:'Mumoni Primary School',            beneficiaries:310,  desc:'25,000L tank improving hygiene and attendance at Mumoni Primary School.' },
];

// ── Count stats ──────────────────────────────────────────────────────
function updateStats(visible) {
  document.getElementById('countAll').textContent  = visible.length;
  document.getElementById('countDam').textContent  = visible.filter(p=>p.type==='Sand Dam').length;
  document.getElementById('countWell').textContent = visible.filter(p=>p.type==='Shallow Well').length;
  document.getElementById('countTank').textContent = visible.filter(p=>p.type==='School Tank').length;
  document.getElementById('countSolar').textContent= visible.filter(p=>p.type==='Solar Pipeline').length;
  document.getElementById('countWash').textContent = visible.filter(p=>p.type==='WASH Facility').length;
  document.getElementById('countRock').textContent = visible.filter(p=>p.type==='Rock Catchment').length;
  document.getElementById('visibleCount').textContent = visible.length;
  document.getElementById('totalCount').textContent   = PROJECTS.length;
}

// ── Custom circle marker ─────────────────────────────────────────────
function makeMarker(project) {
  const color = TYPE_COLORS[project.type] || '#5e1062';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
    <filter id="ds"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.35)"/></filter>
    <path d="M14 0C6.27 0 0 6.27 0 14c0 9.33 14 22 14 22S28 23.33 28 14C28 6.27 21.73 0 14 0z" fill="${color}" filter="url(#ds)"/>
    <circle cx="14" cy="14" r="6" fill="white" opacity="0.9"/>
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
function makePopup(p) {
  const color = TYPE_COLORS[p.type] || '#5e1062';
  return `<div class="map-popup">
    <div class="popup-type" style="background:${color}">
      <i class="fa-solid fa-droplet popup-type-icon"></i>${p.type}
    </div>
    <h4 class="popup-title">${p.name}</h4>
    <p class="popup-desc">${p.desc}</p>
    <div class="popup-meta">
      <div class="popup-meta-item">
        <span class="popup-meta-icon" style="background:${color}15;color:${color}">
          <i class="fa-solid fa-location-dot"></i>
        </span>
        <div class="popup-meta-text">
          <span class="meta-label">County</span>
          <span class="meta-value">${p.county}</span>
        </div>
      </div>
      <div class="popup-meta-item">
        <span class="popup-meta-icon" style="background:${color}15;color:${color}">
          <i class="fa-solid fa-users"></i>
        </span>
        <div class="popup-meta-text">
          <span class="meta-label">Beneficiaries</span>
          <span class="meta-value">${p.beneficiaries.toLocaleString()}</span>
        </div>
      </div>
      <div class="popup-meta-item">
        <span class="popup-meta-icon" style="background:${color}15;color:${color}">
          <i class="fa-solid fa-calendar-days"></i>
        </span>
        <div class="popup-meta-text">
          <span class="meta-label">Year Built</span>
          <span class="meta-value">${p.year}</span>
        </div>
      </div>
      <div class="popup-meta-item">
        <span class="popup-meta-icon" style="background:${color}15;color:${color}">
          <i class="fa-solid fa-people-roof"></i>
        </span>
        <div class="popup-meta-text">
          <span class="meta-label">Community</span>
          <span class="meta-value">${p.community}</span>
        </div>
      </div>
    </div>
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
function makeListCard(p, marker) {
  const color = TYPE_COLORS[p.type] || '#5e1062';
  const div = document.createElement('div');
  div.className = 'project-list-card';
  div.dataset.id = p.id;
  div.innerHTML = `
    <div class="plc-type-bar" style="background:${color}"></div>
    <div class="plc-body">
      <div class="plc-header">
        <span class="plc-badge" style="color:${color};border-color:${color}">
          <i class="fa-solid fa-droplet plc-badge-icon"></i>${p.type}
        </span>
        <span class="plc-year"><i class="fa-regular fa-calendar"></i> ${p.year}</span>
      </div>
      <h4 class="plc-title">${p.name}</h4>
      <div class="plc-meta">
        <span><i class="fa-solid fa-location-dot" style="color:${color}"></i> ${p.county}</span>
        <span><i class="fa-solid fa-users" style="color:${color}"></i> ${p.beneficiaries.toLocaleString()}</span>
      </div>
      <div class="plc-community">
        <i class="fa-solid fa-people-roof" style="color:${color}"></i>
        <span>${p.community}</span>
      </div>
    </div>`;
  div.addEventListener('click', () => {
    marker.openPopup();
    map.setView([p.lat, p.lng], 13, { animate: true });
    document.querySelectorAll('.project-list-card').forEach(c => c.classList.remove('active'));
    div.classList.add('active');
    div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  return div;
}

// ── Map init ─────────────────────────────────────────────────────────
let map;
let allMarkers = {}; // id → L.marker
let allListCards = {}; // id → DOM element

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

  // Place all markers
  const listEl = document.getElementById('projectList');
  PROJECTS.forEach(p => {
    const marker = L.marker([p.lat, p.lng], { icon: makeMarker(p) })
      .addTo(map)
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
    const card = makeListCard(p, marker);
    allListCards[p.id] = card;
    listEl.appendChild(card);
  });

  updateStats(PROJECTS);
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
    const matchYear   = activeYear   === 'all' || (activeYear === '2018' ? p.year <= 2018 : p.year === parseInt(activeYear));
    const matchSearch = !searchQuery  || p.name.toLowerCase().includes(searchQuery) || p.community.toLowerCase().includes(searchQuery) || p.county.toLowerCase().includes(searchQuery);
    return matchType && matchCounty && matchYear && matchSearch;
  });

  const visibleIds = new Set(filtered.map(p => p.id));

  // Show/hide markers
  PROJECTS.forEach(p => {
    if (visibleIds.has(p.id)) {
      if (!map.hasLayer(allMarkers[p.id])) allMarkers[p.id].addTo(map);
      allListCards[p.id].style.display = '';
    } else {
      if (map.hasLayer(allMarkers[p.id])) map.removeLayer(allMarkers[p.id]);
      allListCards[p.id].style.display = 'none';
    }
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
  document.getElementById('lbMeta').innerHTML = `
    <span><i class="fa-solid fa-location-dot" style="color:${color}"></i> ${p.county} County</span>
    <span><i class="fa-solid fa-users" style="color:${color}"></i> ${p.beneficiaries.toLocaleString()} beneficiaries</span>
    <span><i class="fa-solid fa-calendar-days" style="color:${color}"></i> Built ${p.year}</span>`;

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
