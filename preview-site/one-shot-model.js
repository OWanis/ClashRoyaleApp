/* Screenshot-derived HP breakpoints, version 2. No battle simulation. */
(function(root){
'use strict';
function parseValue(raw){
 const s=String(raw).trim();
 if(/^\d+(?:\.\d+)?$/.test(s))return [{value:Number(s),suffix:''}];
 let m=s.match(/^(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)$/);
 if(m)return [{value:Number(m[1]),suffix:'minimum'},{value:Number(m[2]),suffix:'maximum'}];
 m=s.match(/^(\d+(?:\.\d+)?)\s*[x×]\s*(\d+)$/i);
 return m?[{value:Number(m[1]),suffix:'per hit · '+m[2]+' hits shown'}]:[];
}
// Mechanics profiles bind to canonical parent IDs; screenshots remain unchanged.
const MULTI_PROFILES={
  "6360a624-77a3-466c-a30e-5f3c8a667f57": {
    "fields": [
      "Ranged Damage"
    ],
    "single": "spread fragment",
    "total": "direct hit",
    "scope": "direct",
    "note": "Direct rocket impact: all five damage fragments connect (owner-confirmed mechanic). Spread damage is shown separately per fragment; it is not added again to the direct hit."
  },
  "57eb54ac-7fe5-4961-8241-2a66c65c9397": {
    "fields": [
      "Ranged Damage"
    ],
    "single": "one pellet",
    "total": "full volley \u00b7 all 10 pellets",
    "scope": "volley",
    "note": "Assumes all ten pellets hit the same target. Spread and distance can reduce connected pellets."
  },
  "7a090673-cee7-4ea8-aaa8-5aab9ad1ef1a": {
    "fields": [
      "Damage"
    ],
    "single": "one bolt",
    "total": "full attack \u00b7 both bolts",
    "scope": "volley",
    "note": "Both bolts must hit the same target; split targeting deals only one bolt to each target."
  },
  "d5521b79-437e-4709-a31f-9032ec947f43": {
    "fields": [
      "Area Damage",
      "Close Quarters Damage"
    ],
    "single": "one pass",
    "total": "full attack \u00b7 outgoing + return",
    "scope": "sequence",
    "note": "Two separate hits: outgoing and returning axe must both connect. This is not a single impact."
  },
  "b0cc0733-b9cc-40f2-89e0-da9500b1b2bd": {
    "fields": [
      "Area Damage",
      "Crown Tower Damage"
    ],
    "single": "one wave",
    "total": "full cast \u00b7 all 3 waves",
    "scope": "cast",
    "note": "Three successive waves must connect. Full-cast damage is not single-hit damage."
  },
  "a4b29633-f423-4986-9374-cb5d085f5aa2": {
    "fields": [
      "Triple Shot Damage"
    ],
    "single": "one projectile",
    "total": "potential total \u00b7 all 3 projectiles",
    "scope": "unverified",
    "note": "Arithmetic total only. Whether all three projectiles can damage the same target is unverified; this entry does not confirm a kill."
  }
};
function attackValues(card,field,raw){
 if(card.forms.some(f=>f.id==='aa24fdb4-6edc-4e2c-87fe-8d2231b6a190')&&/^(Damage:|Crown Tower:)/.test(field)&&/^\d+$/.test(String(raw)))return [1,2,3].map(hits=>({value:Number(raw)*hits,suffix:hits+' hit'+(hits===1?'':'s'),scope:hits===1?'single':'cast',aggregate:hits>1,formula:Number(raw)+' × '+hits+' = '+Number(raw)*hits,mechanicNote:'Assumes the same target-count damage tier for every hit. Target count can change between strikes.'}));
 const values=parseValue(raw),match=String(raw).trim().match(/^(\d+(?:\.\d+)?)\s*[x×]\s*(\d+)$/i);
 if(!match)return values;
 const parent=card.forms.find(f=>f.formType==='base'),profile=MULTI_PROFILES[parent?.id];
 if(!profile||!profile.fields.includes(field))return values;
 const unit=Number(match[1]),count=Number(match[2]);
 return [{value:unit,suffix:profile.single,scope:'single',mechanicNote:profile.note},
 {value:unit*count,suffix:profile.total,scope:profile.scope,mechanicNote:profile.note,formula:unit+' × '+count+' = '+unit*count,aggregate:true,unverified:profile.scope==='unverified'}];
}
function build(cards){
 const rows=[],excluded=[],seen=new Set();
 for(const c of cards)for(const f of c.forms){
  const o=c.observations.find(x=>x.cardFormId===f.id&&x.capturedOn===null)||c.observations.find(x=>x.cardFormId===f.id);
  if(!o||o.displayedLevel!==11)continue;
  const panels=[{key:'main',context:'Card',fields:o.fieldsDisplayed,source:null},...o.supplementalPanels.filter(p=>p.kind!=='description'&&p.kind!=='identity').map(p=>({key:p.kind,context:p.fieldsDisplayed.Component||p.fieldsDisplayed.Ability||(p.kind==='deployment_variant_stats'?'Alternate deployment':'Component / ability'),fields:p.fieldsDisplayed,source:p.sourceImageHash}))];
  for(const p of panels)for(const [field,raw]of Object.entries(p.fields)){
   if(!/hitpoints|damage|^crown tower:/i.test(field))continue;
   const kind=/hitpoints/i.test(field)?'hp':'damage';
   if(/\/sec|per second|reduction|healed|boost/i.test(field)||String(raw).includes('%')){excluded.push({card:c.name,form:f.formType,field,raw,reason:'Rate or percentage; not HP or damage per hit'});continue;}
   const values=attackValues(c,field,raw);
   if(!values.length){excluded.push({card:c.name,form:f.formType,field,raw,reason:'No unambiguous numeric hit value'});continue;}
   for(const part of values){
    const id=JSON.stringify([f.id,p.key,p.context,field,String(raw),part.suffix]);if(seen.has(id))continue;seen.add(id);
    rows.push({id,card:c,form:f,observation:o,context:p.context,panelKind:p.key,field,raw:String(raw),value:part.value,kind,label:field+(part.suffix?' · '+part.suffix:'')+(kind==='damage'&&c.cardType==='spell'?(/crown tower/i.test(field)?' · Crown Towers':(['Barbarian Barrel','Royal Delivery'].includes(c.name)&&p.key==='main'?' · Troops only':p.key!=='main'?' · Spawned troop damage':' · Troops & buildings')):''),sourceImageHash:p.source,scope:part.scope||'single',aggregate:!!part.aggregate,unverified:!!part.unverified,formula:part.formula||null,mechanicNote:part.mechanicNote||null,
     fields:p.fields,targets:p.fields.Targets||(p.key==='main'?o.fieldsDisplayed.Targets:null),
     shield:kind==='hp'&&/shield/i.test(field),
     protected:kind==='hp'&&field==='Hitpoints'&&Object.keys(p.fields).some(k=>/shield hitpoints|damage reduction/i.test(k)),
     towerDamage:/crown tower|reflected tower damage/i.test(field),
     towerHP:kind==='hp'&&c.cardType==='tower_troop'&&p.key==='main',
     conditional:part.suffix!==''||p.key!=='main'||!/^(Hitpoints|Damage|Area Damage|Ranged Damage|Crown Tower Damage)$/i.test(field),
     image:c.assets.find(a=>a.cardFormId===f.id)?.data});
   }
  }
 }
 rows.sort((a,b)=>b.value-a.value||(a.kind===b.kind?0:a.kind==='damage'?-1:1)||a.card.name.localeCompare(b.card.name)||a.form.formType.localeCompare(b.form.formType)||a.label.localeCompare(b.label)||a.id.localeCompare(b.id));
 return {rows,excluded};
}
function ranked(rows,version='all'){return rows.filter(r=>version==='all'||r.form.formType===version).map((r,i)=>({...r,rank:i+1}));}
function filter(rows,{kind='both',query='',numbering='original',cardId=''}={}){
 const q=query.trim().toLowerCase();return rows.filter(r=>(!cardId||r.card.forms.some(f=>f.formType==='base'&&f.id===cardId))&&(kind==='both'||r.kind===kind)&&[r.card.name,r.form.formType,r.context,r.label].join(' ').toLowerCase().includes(q)).map((r,i)=>({...r,displayRank:numbering==='filtered'?i+1:r.rank}));
}
function targetEligibility(d,h){
 if(d.card?.cardType==='spell'&&d.panelKind==='main'&&['Barbarian Barrel','Royal Delivery'].includes(d.card.name)&&(h.towerHP||h.card?.cardType==='building'))return 'This spell hit damages troops only.';
 if(d.towerDamage&&!h.towerHP)return 'Crown Tower damage applies only to Crown Towers.';
 if(h.towerHP&&!d.towerDamage&&Object.keys(d.fields||{}).some(k=>/crown tower|reflected tower damage/i.test(k)))return 'Use this attack’s separate Crown Tower damage entry.';
 // Normal targeting does not govern death/spawn damage or other special effects.
 const ordinary=/^(Damage|Ranged Damage|Area Damage|Melee Damage)$/i.test(d.field);
 if(ordinary&&d.targets==='Buildings'){
  if(!h.towerHP&&!(h.card?.cardType==='building'&&h.panelKind==='main'))return 'This attack targets buildings; this HP entry is not a building or Crown Tower.';
 }
 return null;
}
function compare(d,h){
 if(d.kind!=='damage'||h.kind!=='hp')throw Error('Compare damage against HP');
 const ineligible=targetEligibility(d,h);if(ineligible)return {group:'inapplicable',reason:ineligible};
 const enough=d.value>=h.value,remaining=Math.max(0,h.value-d.value);
 if(d.unverified)return {group:'mechanic',reason:'Potential total only: same-target projectile overlap is unverified.',enough,remaining};
 if(h.protected)return {group:'mechanic',reason:(enough?'Damage reaches body HP':'Damage is below body HP')+'; shield or damage reduction must be resolved separately.'+(d.aggregate?' Multiple-hit shield interactions are not inferred from the total.':''),enough,remaining};
 return {group:enough?'yes':'no',enough,remaining,reason:enough?(h.shield?'Enough to break this shield layer; not a whole-unit kill.':(d.aggregate?'Listed attack/cast total reaches this HP threshold if all required hits connect.':'Damage reaches this HP threshold if the hit connects.')):`${remaining.toLocaleString('en-US')} HP remains after ${d.aggregate?'all listed hits':'this hit'}.`,conditional:d.conditional||h.conditional};
}
// Group only corresponding stats of one canonical parent, never by matching values.
function groupMatchups(items){
 const groups=new Map(),order={base:0,evolution:1,hero:2};
 for(const item of items){const r=item.other,parent=r.card.forms.find(f=>f.formType==='base').id;
  const key=JSON.stringify([parent,r.panelKind,r.context,r.label]);
  if(!groups.has(key))groups.set(key,{key,card:r.card,context:r.context,label:r.label,items:[]});
  groups.get(key).items.push(item);
 }
 for(const group of groups.values())group.items.sort((a,b)=>order[a.other.form.formType]-order[b.other.form.formType]||b.other.value-a.other.value);
 return [...groups.values()];
}
root.OneShot={parseValue,attackValues,build,ranked,filter,compare,targetEligibility,groupMatchups};
})(globalThis);
