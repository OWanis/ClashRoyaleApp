/* Screenshot-derived HP breakpoints, version 1. No battle simulation. */
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
function build(cards){
 const rows=[],excluded=[],seen=new Set();
 for(const c of cards)for(const f of c.forms){
  const o=c.observations.find(x=>x.cardFormId===f.id&&x.capturedOn===null)||c.observations.find(x=>x.cardFormId===f.id);
  if(!o||o.displayedLevel!==11)continue;
  const panels=[{key:'main',context:'Card',fields:o.fieldsDisplayed,source:null},...o.supplementalPanels.filter(p=>p.kind!=='description'&&p.kind!=='identity').map(p=>({key:p.kind,context:p.fieldsDisplayed.Component||p.fieldsDisplayed.Ability||(p.kind==='deployment_variant_stats'?'Alternate deployment':'Component / ability'),fields:p.fieldsDisplayed,source:p.sourceImageHash}))];
  for(const p of panels)for(const [field,raw]of Object.entries(p.fields)){
   if(!/hitpoints|damage/i.test(field))continue;
   const kind=/hitpoints/i.test(field)?'hp':'damage';
   if(/\/sec|per second|reduction|healed|boost/i.test(field)||String(raw).includes('%')){excluded.push({card:c.name,form:f.formType,field,raw,reason:'Rate or percentage; not HP or damage per hit'});continue;}
   const values=parseValue(raw);
   if(!values.length){excluded.push({card:c.name,form:f.formType,field,raw,reason:'No unambiguous numeric hit value'});continue;}
   for(const part of values){
    const id=JSON.stringify([f.id,p.key,p.context,field,String(raw),part.suffix]);if(seen.has(id))continue;seen.add(id);
    rows.push({id,card:c,form:f,observation:o,context:p.context,panelKind:p.key,field,raw:String(raw),value:part.value,kind,label:field+(part.suffix?' · '+part.suffix:''),sourceImageHash:p.source,
     fields:p.fields,targets:p.fields.Targets||(p.key==='main'?o.fieldsDisplayed.Targets:null),
     shield:kind==='hp'&&/shield/i.test(field),
     protected:kind==='hp'&&field==='Hitpoints'&&Object.keys(p.fields).some(k=>/shield hitpoints|damage reduction/i.test(k)),
     towerDamage:/crown tower damage|reflected tower damage/i.test(field),
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
function filter(rows,{kind='both',query='',numbering='original'}={}){
 const q=query.trim().toLowerCase();return rows.filter(r=>(kind==='both'||r.kind===kind)&&[r.card.name,r.form.formType,r.context,r.label].join(' ').toLowerCase().includes(q)).map((r,i)=>({...r,displayRank:numbering==='filtered'?i+1:r.rank}));
}
function compare(d,h){
 if(d.kind!=='damage'||h.kind!=='hp')throw Error('Compare damage against HP');
 if(d.towerDamage&&!h.towerHP)return {group:'inapplicable',reason:'Crown Tower damage applies only to Crown Towers.'};
 if(h.towerHP&&!d.towerDamage&&Object.keys(d.fields).some(k=>/crown tower damage|reflected tower damage/i.test(k)))return {group:'inapplicable',reason:'Use this attack’s separate Crown Tower damage entry.'};
 if(d.targets==='Buildings'&&h.card.cardType==='troop'&&h.panelKind==='main')return {group:'inapplicable',reason:'This attack targets buildings, not troops.'};
 const enough=d.value>=h.value,remaining=Math.max(0,h.value-d.value);
 if(h.protected)return {group:'mechanic',reason:(enough?'Damage reaches body HP':'Damage is below body HP')+'; shield or damage reduction must be resolved separately.',enough,remaining};
 return {group:enough?'yes':'no',enough,remaining,reason:enough?(h.shield?'Enough to break this shield layer; not a whole-unit kill.':'Damage reaches this HP threshold if the hit connects.'):`${remaining.toLocaleString('en-US')} HP remains after this hit.`,conditional:d.conditional||h.conditional};
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
root.OneShot={parseValue,build,ranked,filter,compare,groupMatchups};
})(globalThis);
