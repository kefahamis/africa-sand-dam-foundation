import json

rows = json.load(open('projects_all.json', encoding='utf-8'))
keys = ['id','name','type','county','lat','lng','year','beneficiaries','village','location','subcounty','donor','school','partner']
clean = []
for r in rows:
    o = {}
    for k in keys:
        v = r.get(k, '')
        if k == 'year' and not v: v = None
        if isinstance(v, str): v = v.strip()
        o[k] = v
    if r.get('approx'): o['approx'] = 1   # location approximated from the group's sand dam
    clean.append(o)

order_t = {'Sand Dam':0,'Shallow Well':1,'School Tank':2,'Solar Pipeline':3,'Rock Catchment':4,'Road Crossing':5}
clean.sort(key=lambda x: (x['county'], order_t.get(x['type'],9), x['name'].lower()))
for i,r in enumerate(clean,1): r['id']=i

body = json.dumps(clean, ensure_ascii=False, separators=(',',':'))
js  = "/* ASDF full project registry — generated from EVERY worksheet of\n"
js += "   'ASDF Dams and Tanks Monthly Report 25_26' (Total registries + 2020/21 & 2025/26\n"
js += "   plan sheets + Road Crossings), deduped by type+coordinates. Only rows with GPS. */\n"
js += "window.ASDF_PROJECTS = " + body + ";\n"
out = 'C:/Users/ADMIN/.gemini/antigravity/scratch/africa-sand-dam-foundation/projects-data.js'
open(out,'w',encoding='utf-8').write(js)
print('wrote', out, '| records', len(clean), '| bytes', len(js))
