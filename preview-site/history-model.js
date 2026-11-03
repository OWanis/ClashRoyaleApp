(function(root){
'use strict';
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
  const identity=JSON.stringify([key,update.level]);
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
 if(['hp','hitpoints'].includes(change.unit)||/hitpoints/i.test(change.stat))return 'hp';
 return null;
}
function detectCrossings(update,rows){
 return update.changes.filter(c=>changeKind(c)).map(change=>{
  const kind=changeKind(change),thresholds=[],rankings=[],hitCounts=[];
  const source=rows.find(r=>r.form.id===change.cardFormId&&r.field===(change.comparisonKey||change.stat)&&r.kind===kind&&!r.aggregate);
  let excludedTargets=0;
  for(const row of rows){
   if(row.observation.displayedLevel!==update.level)continue;
   if(row.form.id===change.cardFormId&&row.field===(change.comparisonKey||change.stat))continue;
   const beforeRelation=Math.sign(change.before-row.value),afterRelation=Math.sign(change.after-row.value);
   const needsCheck=!!(row.shield||row.protected||row.unverified||/shield/i.test(change.stat));
   if(row.kind===kind){
    if(beforeRelation!==afterRelation)rankings.push({other:row,beforeRelation,afterRelation,needsCheck});
   }else{
    if(source&&root.OneShot?.targetEligibility(kind==='damage'?source:row,kind==='damage'?row:source)){excludedTargets++;continue;}
    if(kind==='damage'&&source&&!source.aggregate&&/^(Damage|Ranged Damage|Area Damage|Melee Damage)$/i.test(source.field)&&change.before>0&&change.after>0&&!row.shield&&!row.protected){const beforeHits=Math.ceil(row.value/change.before),afterHits=Math.ceil(row.value/change.after);if(beforeHits!==afterHits)hitCounts.push({other:row,beforeHits,afterHits,needsCheck:false});}
    // For HP, equality is not survival; for damage, equality reaches HP.
    const before=kind==='damage'?change.before>=row.value:change.before>row.value;
    const after=kind==='damage'?change.after>=row.value:change.after>row.value;
    if(before!==after)thresholds.push({other:row,before,after,needsCheck});
   }
  }
  return {change,kind,thresholds,rankings,hitCounts,excludedTargets};
 });
}
root.HistoryModel={damageChanges,compare,additionalStats,changeKind,detectCrossings};
})(globalThis);
