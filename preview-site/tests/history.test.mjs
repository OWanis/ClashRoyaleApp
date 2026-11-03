import {test} from 'node:test';
import assert from 'node:assert/strict';
import '../history-data.js';
import '../history-model.js';
const update=HISTORY_DATA.updates[0];
test('effective day differs from article publication; explicit form scopes and complete first-section count',()=>{assert.equal(update.effectiveDate,'2026-10-19');assert.equal(update.publishedDate,'2026-10-06');assert.equal(update.datePrecision,'day');assert.equal(update.level,11);assert.equal(update.changes.length,12);assert.equal(new Set(update.changes.map(c=>c.cardFormId)).size,11);assert.equal(update.changes.filter(c=>c.cardName==='Skeleton Barrel').length,2);assert.equal(update.changes.find(c=>c.cardName==='Electro Wizard').formType,'hero');for(const c of update.changes)assert.ok(update.excerpt.includes(c.quote));});
test('Void crosses 304 reference HP; no historical HP is inferred',()=>{const c=update.changes.find(c=>c.cardName==='Void');const r=HistoryModel.compare(c,{kind:'hp',value:304});assert.equal(r.before.remaining,8);assert.equal(r.before.reaches,false);assert.equal(r.after.reaches,true);assert.equal(r.changed,true);assert.equal(r.referenceHP,304);});
test('non-damage mechanics cannot enter HP comparisons; equality and shield cautions preserved',()=>{assert.equal(HistoryModel.damageChanges(update).length,7);assert.throws(()=>HistoryModel.compare(update.changes.find(c=>c.unit==='seconds'),{kind:'hp',value:10}));const c=update.changes.find(c=>c.cardName==='Flying Machine');assert.equal(HistoryModel.compare(c,{kind:'hp',value:179,shield:true}).after.reaches,true);assert.equal(HistoryModel.compare(c,{kind:'hp',value:179,shield:true}).mechanicCheck,true);});
test('missing stats accumulate from notes without overwriting displayed fields',()=>{
 const form=update.changes.find(c=>c.cardName==='Cannon Cart').cardFormId;
 const facts=HistoryModel.additionalStats([update],form,{'Ranged Damage':'202'});
 assert.equal(facts.length,1);assert.equal(facts[0].change.stat,'Mass');assert.equal(facts[0].change.before,3);assert.equal(facts[0].change.after,6);
 assert.equal(HistoryModel.additionalStats([update],form,{'Ranged Damage':'202',Mass:'6'}).length,0);
 assert.equal(HistoryModel.additionalStats([update],'unknown').length,0);
});
test('newest effective fact wins regardless of import order, retaining older changes and conflicts',()=>{
 const c=update.changes.find(c=>c.stat==='Mass'),later={...update,id:'later',effectiveDate:'2026-11-01',changes:[{...c,id:'later-change',before:6,after:7}]};
 const facts=HistoryModel.additionalStats([later,update],c.cardFormId,{'Ranged Damage':'202'});
 assert.equal(facts[0].change.after,7);assert.equal(facts[0].history.length,2);
 assert.equal(facts[0].conflict,false);
 const conflict={...later,id:'conflict',changes:[{...c,id:'other-change',after:8}]};
 assert.equal(HistoryModel.additionalStats([update,later,conflict],c.cardFormId,{'Ranged Damage':'202'})[0].conflict,true);
});
