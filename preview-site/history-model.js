(function(root){
'use strict';
const presentation={
  "ea043182-2e45-515c-9e6e-7f0aa4a171a5": {
    "seasonLabel": "October 2026 \u00b7 Season 88",
    "seasonBasis": "Owner-supplied RoyaleAPI October 2026 Season 88 screenshot. Calendar-season label; the selected patch remains October 19.",
    "classificationBasis": "Supercell October 19 subsection headings: NERFS, BUFFS and REWORKS.",
    "changes": {
      "00f3489b-1f3c-54e8-b556-11c491ac6257": "nerf",
      "cf4d392e-7575-545c-ba4e-7b753a0cc4c5": "nerf",
      "afb5dd05-81d7-5b64-95d6-cd1abbabe091": "nerf",
      "49b07490-d43a-551d-a0e2-7548361d2968": "nerf",
      "5fc75733-6bfe-55e1-a28c-9553f885bd49": "nerf",
      "5c1f7401-960a-565a-9562-82528e867870": "buff",
      "75a35506-1b30-5566-89b5-222aeca29460": "buff",
      "10a52d84-430b-5c26-8b58-ff4cc686bb2d": "buff",
      "3ad2d09c-f6f2-5d2f-98d4-2aefd76fbd41": "buff",
      "548ddacc-696b-5991-9282-241ecca9d3a9": "rework",
      "c3720e3c-7d38-575a-9913-5d7a527af9be": "rework",
      "2dd4a268-2672-5506-a3f5-e9b92d996b86": "rework"
    }
  }
};
function updatePresentation(update){return update.presentation||presentation[update.id]||{seasonLabel:null,changes:{}};}
function changeCategory(update,change){
 const category=change.classification||updatePresentation(update).changes?.[change.id]||'unclassified';
 // Some source sections group mixed changes under one heading. Only reverse a
 // heading for a stat whose benefit direction is unambiguous; mass/range and
 // explicitly labeled reworks/fixes retain the source classification.
 if(['buff','nerf'].includes(category)&&Number.isFinite(change.before)&&Number.isFinite(change.after)&&change.before!==change.after){
  if(['damage','hp','healing'].includes(change.unit))return change.after>change.before?'buff':'nerf';
  if(change.unit==='seconds'&&/hit speed|hit frequency|first hit|first attack|deploy time|cooldown|cast time|cooking time|production speed/i.test(change.stat))return change.after<change.before?'buff':'nerf';
  if(change.unit==='elixir')return change.after<change.before?'buff':'nerf';
 }
 return category;
}
function cardCategory(update,changes){const kinds=[...new Set(changes.map(c=>changeCategory(update,c)))];return kinds.length===1?kinds[0]:kinds.includes('unclassified')?'unclassified':'rework';}

function damageChanges(update){return update.changes.filter(c=>c.unit==='damage'&&Number.isFinite(c.before)&&Number.isFinite(c.after));}
function compare(change,hp){
 if(change.unit!=='damage'||!Number.isFinite(change.before)||!Number.isFinite(change.after)||hp.kind!=='hp')throw Error('Numeric damage and HP required');
 const result=value=>({damage:value,reaches:value>=hp.value,remaining:Math.max(0,hp.value-value)});
 return {before:result(change.before),after:result(change.after),changed:(change.before>=hp.value)!==(change.after>=hp.value),mechanicCheck:!!(hp.shield||hp.protected),referenceHP:hp.value};
}
function additionalStats(updates,formId,displayedFields={}){
 const groups=new Map();
 for(const update of updates)for(const change of update.changes){
  if(change.cardFormId!==formId)continue;
  const key=change.comparisonKey||change.stat;
  const identity=JSON.stringify([key,change.levelReference??update.level]);
  if(!groups.has(identity))groups.set(identity,[]);
  groups.get(identity).push({change,update});
 }
 return [...groups.values()].map(history=>{
  history.sort((a,b)=>b.update.effectiveDate.localeCompare(a.update.effectiveDate)||a.change.id.localeCompare(b.change.id));
  const latest=history[0],peers=history.filter(h=>h.update.effectiveDate===latest.update.effectiveDate);
  const conflict=peers.some(h=>h.change.after!==latest.change.after||h.change.unit!==latest.change.unit);
  return {...latest,history,conflict,peers};
 }).filter(fact=>fact.conflict||String(displayedFields[fact.change.comparisonKey||fact.change.stat])!==String(fact.change.after)).sort((a,b)=>a.change.stat.localeCompare(b.change.stat));
}
function changeKind(change){
 if(!Number.isFinite(change.before)||!Number.isFinite(change.after))return null;
 if(change.unit==='damage')return 'damage';
 if(['hp','hitpoints'].includes(change.unit))return 'hp';
 return null;
}
function referenceForChange(change,rows){
 const kind=changeKind(change),key=change.comparisonKey||change.stat;
 const candidates=rows.filter(r=>r.form.id===change.cardFormId&&r.kind===kind&&!r.aggregate);
 if(change.cardName==='Ice Wizard'&&change.formType==='hero'&&change.stat==='Freeze Damage'){const freeze=candidates.filter(r=>r.panelKind==='ability'&&r.context==='Frosty Fella'&&r.field==='Area Damage');if(freeze.length===1)return freeze[0];}
 const exact=candidates.filter(r=>r.field===key);
 if(exact.length===1)return exact[0];
 if(key==='Damage'){
  const main=candidates.filter(r=>r.panelKind==='main'&&/^(Damage|Ranged Damage|Area Damage|Melee Damage)$/.test(r.field));
  if(main.length===1)return main[0];
 }
 return null;
}
function coreStat(change){
 if(change.unit==='damage'&&/^(Damage|Ranged Damage|Area Damage|Melee Damage)$/.test(change.stat))return 'damage';
 if(['hp','hitpoints'].includes(change.unit)&&change.stat==='Hitpoints')return 'hp';
 return null;
}
function affectedForms(update,change,rows,history=root.HISTORY_DATA?.updates||[update]){
 const source=referenceForChange(change,rows),forms=[change.cardFormId],kind=coreStat(change);
 if(!kind||source?.panelKind!=='main')return forms;
 for(const c of update.changes)if(c.cardFormId!==change.cardFormId&&source.card.forms?.some(f=>f.id===c.cardFormId)&&coreStat(c)===kind&&c.before===change.before&&c.after===change.after)forms.push(c.cardFormId);
 const siblings=rows.filter(r=>r.card===source.card&&r.kind===kind&&r.panelKind==='main'&&!r.aggregate&&r.observation.displayedLevel===update.level&&r.value===change.after&&(kind==='hp'?r.field==='Hitpoints':/^(Damage|Ranged Damage|Area Damage|Melee Damage)$/.test(r.field)));
 for(const row of siblings){
  if(forms.includes(row.form.id))continue;
  const explicit=update.changes.find(c=>c.cardFormId===row.form.id&&coreStat(c)===kind);
  if(explicit){if(explicit.before===change.before&&explicit.after===change.after)forms.push(row.form.id);continue;}
  // Base core stats are shared only with a matching main-panel value and a form
  // documented by this patch date. Never project later forms or ability damage.
  if(change.formType==='base'&&history.some(u=>u.effectiveDate<=update.effectiveDate&&u.changes.some(c=>c.cardFormId===row.form.id)))forms.push(row.form.id);
 }
 return forms;
}
function detectCrossings(update,rows){
 if(update.level===null)return [];
 return update.changes.filter(c=>changeKind(c)).map(change=>{
  const kind=changeKind(change),thresholds=[],rankings=[],hitCounts=[];
  const sharedForms=affectedForms(update,change,rows);
  const source=referenceForChange(change,rows),unmapped=!source&&rows.some(r=>r.card);
  let excludedTargets=0;
  for(const row of rows){
   if(row.observation.displayedLevel!==update.level)continue;
   if(source&&row.id&&row.id===source.id)continue;
   if(row.form.id===change.cardFormId&&row.field===(change.comparisonKey||change.stat))continue;
   const beforeRelation=Math.sign(change.before-row.value),afterRelation=Math.sign(change.after-row.value);
   const needsCheck=!!(row.shield||row.protected||row.unverified||/shield/i.test(change.stat));
   if(row.kind===kind){
    if(sharedForms.includes(row.form.id)&&row.panelKind==='main'&&coreStat(change)&&row.value===change.after)continue;
    if(beforeRelation!==afterRelation)rankings.push({other:row,beforeRelation,afterRelation,needsCheck});
   }else{
    if(unmapped)continue;
    if(source&&root.OneShot?.targetEligibility(kind==='damage'?source:row,kind==='damage'?row:source)){excludedTargets++;continue;}
    if(kind==='damage'&&source&&!source.aggregate&&/^(Damage|Ranged Damage|Area Damage|Melee Damage)$/i.test(source.field)&&change.before>0&&change.after>0&&!row.shield&&!row.protected){const beforeHits=Math.ceil(row.value/change.before),afterHits=Math.ceil(row.value/change.after);if(beforeHits!==afterHits)hitCounts.push({other:row,beforeHits,afterHits,needsCheck:false});}
    // For HP, equality is not survival; for damage, equality reaches HP.
    const before=kind==='damage'?change.before>=row.value:change.before>row.value;
    const after=kind==='damage'?change.after>=row.value:change.after>row.value;
    if(before!==after)thresholds.push({other:row,before,after,needsCheck});
   }
  }
  return {change,kind,thresholds,rankings,hitCounts,excludedTargets,unmapped,affectedFormIds:sharedForms};
 });
}
root.HistoryModel={updatePresentation,changeCategory,cardCategory,damageChanges,compare,additionalStats,changeKind,referenceForChange,affectedForms,detectCrossings};
})(globalThis);
