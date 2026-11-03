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
root.HistoryModel={damageChanges,compare,additionalStats};
})(globalThis);
