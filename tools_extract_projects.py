import xlrd, json, collections

FN = 'C:/Users/ADMIN/Downloads/ASDF Dams and Tanks Monthly Report 25_26 11.06.2026.xls'
b = xlrd.open_workbook(FN)

def num(v):
    try:
        if v in ('', None): return None
        return float(v)
    except: return None

def yr(v):
    n = num(v)
    if n is None or n <= 0: return None
    try: return xlrd.xldate_as_datetime(n, b.datemode).year
    except: return None

def txt(s, r, c):
    if c is None: return ''
    try: return str(s.cell_value(r, c)).strip()
    except: return ''

def valid(lat, lng):
    return lat is not None and lng is not None and -5.5 <= lat <= 5.5 and 33 <= lng <= 42

records = []

# ── 1. Cumulative "Total" registries (header found by 'Community Group') ──
def find_hr(s, key='Community Group'):
    for r in range(min(6, s.nrows)):
        for c in range(s.ncols):
            if str(s.cell_value(r, c)).strip() == key: return r
    return None

def hmap(s, hr):
    m = {}
    for c in range(s.ncols):
        v = str(s.cell_value(hr, c)).strip()
        if v and v not in m: m[v] = c
    return m

# Prefer the corrected *_EK coordinate columns; the raw Latitude/Longitude columns
# contain sign errors and lat/long swaps in some rows (fall back to them only if _EK blank).
total_cfgs = [
    ('ASDF Total Sand Dams',      'Sand Dam',       ['Latitude_EK','Latitude'],   ['Longitude_EK','Longitude']),
    ('ASDF Total Shallow Wells',  'Shallow Well',   ['Latitude_EK'],              ['Longitude_EK']),
    ('ASDF Total Water Tanks',    'School Tank',    ['Latitude_EK','Latitude'],   ['Longititude_EK','Longititude']),
    ('ASDF Total Rock Catchments','Rock Catchment', ['Latitude_EK','Latitude'],   ['Longititude_EK','Longititude']),
    ('Total Dam Water Distribution Pr','Solar Pipeline',['Latitude_EK','Latitude'],['Longititude_EK','Longititude']),
]
for sheet, ptype, latN, lngN in total_cfgs:
    s = b.sheet_by_name(sheet); hr = find_hr(s); mp = hmap(s, hr)
    def g(row, *names):
        for n in names:
            if n in mp: return s.cell_value(row, mp[n])
        return ''
    for row in range(hr+1, s.nrows):
        # Water-tank rows sometimes have a School but no Community Group — fall back to the School.
        name = str(g(row, 'Community Group')).strip() or str(g(row, 'School')).strip()
        if not name: continue
        lat = next((num(s.cell_value(row, mp[c])) for c in latN if c in mp and num(s.cell_value(row, mp[c])) is not None), None)
        lng = next((num(s.cell_value(row, mp[c])) for c in lngN if c in mp and num(s.cell_value(row, mp[c])) is not None), None)
        if not valid(lat, lng): continue
        male = female = 0
        for k in mp:
            kl = k.lower()
            if kl.startswith('male'):   male   = num(s.cell_value(row, mp[k])) or male
            if kl.startswith('female'): female = num(s.cell_value(row, mp[k])) or female
        records.append(dict(name=name, type=ptype, source=sheet,
            county=str(g(row, 'County')).strip(),
            lat=round(lat,6), lng=round(lng,6), year=yr(g(row, 'Date built')),
            beneficiaries=int((male or 0)+(female or 0)),
            village=str(g(row, 'Village')).strip(),
            location=str(g(row, 'Location')).strip(),
            subcounty=str(g(row, 'Sub County','SubCounty','New_SubCounty')).strip(),
            donor=str(g(row, 'Specific Donor','Main Donor','Main Partner')).strip(),
            school=str(g(row, 'School')).strip(), partner=str(g(row, 'Partner')).strip()))

# ── 2. Road Crossings (new type; header row 2) ──
s = b.sheet_by_name('Total Road Crossings'); hr = 2
for row in range(hr+1, s.nrows):
    name = txt(s, row, 1)
    if not name or name.lower().startswith('total'): continue
    # NOTE: this sheet's 'Longititude'/'Latitude' headers are swapped vs their values
    lat = num(s.cell_value(row, 3)); lng = num(s.cell_value(row, 4))
    if not valid(lat, lng): continue
    male = num(s.cell_value(row,16)) or 0; female = num(s.cell_value(row,17)) or 0
    records.append(dict(name=name, type='Road Crossing', source='Total Road Crossings',
        county=txt(s,row,12), lat=round(lat,6), lng=round(lng,6), year=yr(s.cell_value(row,13)),
        beneficiaries=int(male+female), village=txt(s,row,6), location=txt(s,row,8),
        subcounty=txt(s,row,11), donor=txt(s,row,15) or txt(s,row,14), school='', partner=txt(s,row,22)))

# ── 3. Plan sheets (explicit columns) ──
plan_cfgs = [
    ('Sand Dams Plans 2025_26', 'Sand Dam', 19,
     dict(name=3,lat=5,lng=6,county=15,village=9,location=11,subcounty=14,partner=1,donor=57,donor2=58,completed=54,planned=24,revised=32)),
    ('Shallow Wells 2025_26', 'Shallow Well', 19,
     dict(name=3,lat=5,lng=6,partner=1,completed=21,planned=12,revised=14)),
    ('School Water Tanks 2025_26', 'School Tank', 19,
     dict(name=3,school=4,lat=6,lng=7,county=23,village=17,location=19,subcounty=22,partner=1,females=9,males=10,completed=30,planned=13,revised=15)),
    ('Dam Water Distribution 2025-26', 'Solar Pipeline', 19,
     dict(name=4,lat=23,lng=22,partner=1,donor=1,females=5,males=6,completed=27,planned=10,revised=13)),
    ('Sand Dams Plans 2020_21xx', 'Sand Dam', 17,
     dict(name=4,lat=7,lng=6,county=None,division=2,partner=1,donor=48,donor2=49,completed=46,planned=17,revised=25)),
]
for sheet, ptype, hr, cm in plan_cfgs:
    s = b.sheet_by_name(sheet)
    for row in range(hr+1, s.nrows):
        name = txt(s, row, cm['name'])
        if not name or name.lower().startswith(('total','schedule','you must','avg')): continue
        lat = num(s.cell_value(row, cm['lat'])); lng = num(s.cell_value(row, cm['lng']))
        if not valid(lat, lng): continue
        year = None
        for k in ('completed','revised','planned'):
            if cm.get(k) is not None:
                year = yr(s.cell_value(row, cm[k]))
                if year: break
        female = num(s.cell_value(row, cm['females'])) if cm.get('females') is not None else 0
        male   = num(s.cell_value(row, cm['males']))   if cm.get('males')   is not None else 0
        donor = ''
        for k in ('donor','donor2','partner'):
            if cm.get(k) is not None:
                donor = txt(s, row, cm[k])
                if donor: break
        records.append(dict(name=name, type=ptype, source=sheet,
            county=txt(s,row,cm['county']) if cm.get('county') is not None else '',
            lat=round(lat,6), lng=round(lng,6), year=year,
            beneficiaries=int((female or 0)+(male or 0)),
            village=txt(s,row,cm['village']) if cm.get('village') is not None else '',
            location=txt(s,row,cm['location']) if cm.get('location') is not None else '',
            subcounty=txt(s,row,cm['subcounty']) if cm.get('subcounty') is not None else '',
            donor=donor, school=txt(s,row,cm['school']) if cm.get('school') is not None else '',
            partner=txt(s,row,cm['partner']) if cm.get('partner') is not None else ''))

# Every ASDF project area (Makueni/Machakos/Kitui) is south of the equator, so a positive
# latitude is always a data-entry sign error (plan sheets have no _EK column to catch it).
# Force southern; this also lets an erroneous plan row dedup against its correct registry twin.
for r in records:
    if r['lat'] > 0:
        r['lat'] = -abs(r['lat'])

print('Raw records:', len(records), '| by type:', dict(collections.Counter(r['type'] for r in records)))

# ── Dedup: only merge records that are the SAME project appearing in more than one sheet.
# Key on type + coords(4dp ~11m) + a light name-normalisation, so two DIFFERENT communities
# that happen to share a GPS point (data-entry reuse) are kept as separate markers, while a
# plan-sheet row and its Total-registry twin (same name+spot) collapse into one. ──
import re
def lnorm(s):
    return re.sub(r'\s+', ' ', re.sub(r'[^a-z0-9 ]', '', s.lower())).strip()
def name_match(a, b):
    a, b = lnorm(a), lnorm(b)
    if a == b: return True
    short, lng = (a, b) if len(a) <= len(b) else (b, a)
    return len(short) >= 5 and short in lng   # one name is a variant/prefix of the other

# Group by type + coords(4dp ~11m); within a spot, merge only records whose names match
# (equal or substring-variant). Different communities that share a GPS point stay separate.
groups = collections.defaultdict(list)
for r in records:
    groups[(r['type'], round(r['lat'], 4), round(r['lng'], 4))].append(r)
rows = []
for recs in groups.values():
    clusters = []
    for r in recs:
        for cl in clusters:
            if name_match(cl[0]['name'], r['name']):
                cl.append(r); break
        else:
            clusters.append([r])
    for cl in clusters:
        m = dict(cl[0])
        for r in cl[1:]:
            for f in ('county','village','location','subcounty','donor','school','partner'):
                if not m.get(f) and r.get(f): m[f] = r[f]
            if not m.get('year') and r.get('year'): m['year'] = r['year']
            if not m.get('beneficiaries') and r.get('beneficiaries'): m['beneficiaries'] = r['beneficiaries']
        rows.append(m)
print('After dedup:', len(rows), '| by type:', dict(collections.Counter(r['type'] for r in rows)))

# ── County backfill via nearest known-county project ──
known = [r for r in rows if r['county']]
kn = [(r['lat'], r['lng'], r['county']) for r in known]
def d2(a,b): return (a[0]-b[0])**2+(a[1]-b[1])**2
for r in rows:
    if not r['county'] and kn:
        r['county'] = min(kn, key=lambda k: d2((r['lat'],r['lng']),(k[0],k[1])))[2]
for r in rows: r['county'] = r['county'].strip().title()
print('Counties:', dict(collections.Counter(r['county'] for r in rows)))
print('Years:', sorted(set(r['year'] for r in rows if r['year'])))

# ── Approximate location for School Water Tanks 2025_26 rows that have NO GPS ──
# but whose SHG matches an existing sand dam: place the tank at that dam's coords,
# flagged approx=True. (User-approved 2026-07-13.)
import re, math
def norm(s):
    s = s.lower()
    for w in ('shg','women group','self-help group','self help group','water project','group'):
        s = s.replace(w, '')
    return re.sub(r'\s+', ' ', s).strip()
dam_lists = collections.defaultdict(list)
for r in rows:
    if r['type'] == 'Sand Dam':
        dam_lists[norm(r['name'])].append(r)

def centroid_spread(ds):
    clat = sum(d['lat'] for d in ds)/len(ds)
    clng = sum(d['lng'] for d in ds)/len(ds)
    md = 0.0
    for d in ds:
        dl = (d['lat']-clat)*111.0
        dn = (d['lng']-clng)*111.0*math.cos(math.radians(clat))
        md = max(md, math.hypot(dl, dn))
    return clat, clng, md   # km max distance from centroid

s = b.sheet_by_name('School Water Tanks 2025_26'); hr = 19
cm = dict(shg=3, school=4, lat=6, lng=7, females=9, males=10, county=23,
          village=17, location=19, subcounty=22, completed=30, planned=13, revised=15)
approx_added = 0; ambiguous = []
for row in range(hr+1, s.nrows):
    shg = txt(s, row, cm['shg']); school = txt(s, row, cm['school'])
    if not (shg or school): continue
    lat = num(s.cell_value(row, cm['lat'])); lng = num(s.cell_value(row, cm['lng']))
    if valid(lat, lng): continue          # real-GPS tanks already captured earlier
    if not shg: continue                  # nothing to match on
    ds = dam_lists.get(norm(shg))
    if not ds: continue
    clat, clng, spread = centroid_spread(ds)
    if spread > 8.0:                      # group's dams too far apart -> location ambiguous
        ambiguous.append(f'{school} (SHG {shg}, dams span {spread:.0f}km)'); continue
    year = None
    for k in ('completed','revised','planned'):
        year = yr(s.cell_value(row, cm[k]))
        if year: break
    female = num(s.cell_value(row, cm['females'])) or 0
    male   = num(s.cell_value(row, cm['males']))   or 0
    rows.append(dict(name=shg, type='School Tank', source='School Water Tanks 2025_26 (approx via dam)',
        county=(txt(s,row,cm['county']) or ds[0]['county']).strip().title(),
        lat=round(clat,6), lng=round(clng,6), year=year, beneficiaries=int(female+male),
        village=txt(s,row,cm['village']), location=txt(s,row,cm['location']),
        subcounty=txt(s,row,cm['subcounty']), donor=txt(s,row,1), school=school,
        partner=txt(s,row,1), approx=True))
    approx_added += 1
print('Approx school tanks added (centroid of SHG dams):', approx_added)
print('Skipped as ambiguous (dams too spread out):', len(ambiguous))
for a in ambiguous: print('   -', a)

json.dump(rows, open('projects_all.json','w',encoding='utf-8'), ensure_ascii=False)
print('wrote projects_all.json total', len(rows), '| by type:', dict(collections.Counter(r['type'] for r in rows)))
