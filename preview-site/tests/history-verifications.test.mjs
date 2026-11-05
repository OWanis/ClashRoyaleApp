import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import '../history-data.js';import '../history-verifications.js';import '../one-shot-model.js';import '../history-model.js';
const cards=JSON.parse(readFileSync(new URL('../index.html',import.meta.url),'utf8').match(/<script id="catalog-data" type="application\/json">(.*?)<\/script>/s)[1]).cards;
const rows=OneShot.build(cards).rows;
test('seven independently reproduced deltas resolve without changing raw imported notes',()=>{
 const raw=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2021-12-07'),before=JSON.stringify(raw),resolved=HistoryModel.verifiedUpdate(raw);
 assert.equal(resolved.changes.filter(c=>c.levelVerification).length,7);assert.equal(JSON.stringify(raw),before);
 const dart=resolved.changes.find(c=>c.cardName==='Dart Goblin');assert.equal(dart.levelReference,11);assert.deepEqual([dart.before,dart.after],[120,131]);
 assert.equal(resolved.changes.find(c=>c.cardName==='Battle Ram').levelReference,undefined,'charge multiplier not assumed');
 const altered=structuredClone(raw);altered.changes.find(c=>c.cardName==='Dart Goblin').after++;assert.equal(HistoryModel.verifiedUpdate(altered).changes.find(c=>c.cardName==='Dart Goblin').levelReference,undefined,'proof cannot attach to different numbers');
});
test('all supplemental facts retain exact source arithmetic, hashes and immutable URLs',()=>{
 assert.equal(HISTORY_VERIFICATIONS.observations.length,283);assert.equal(new Set(HISTORY_VERIFICATIONS.observations.map(o=>o.id)).size,283);
 const facts=[...Object.values(HISTORY_VERIFICATIONS.changes).flatMap(p=>p.evidence),...HISTORY_VERIFICATIONS.observations.map(o=>o.evidence)];
 for(const f of facts){assert.equal(f.level,11);assert.equal(f.value,Math.floor(f.raw*f.multiplierPercent/100));for(const key of [f.source,f.scalingSource]){const s=HISTORY_VERIFICATIONS.sources[key];assert.match(s.sha256,/^[a-f0-9]{64}$/);assert.match(s.url,/raw.githubusercontent.com\/smlbiobot\/cr-csv\/[a-f0-9]{40}\//);}}
 for(const o of HISTORY_VERIFICATIONS.observations){assert.equal(o.date,HISTORY_VERIFICATIONS.sources[o.evidence.source].commitDate.slice(0,10));const template=rows.find(r=>r.id===o.templateId);assert.ok(template);assert.equal(template.form.id,o.cardFormId);assert.equal(template.panelKind,'main');assert.equal(template.form.formType,'base');assert.equal(template.field,o.field);assert.equal(template.kind,o.kind);}
});
test('future and same-day snapshots cannot establish earlier or pre-patch stats',()=>{
 const refs=HistoryModel.historicalReferences({id:'early',effectiveDate:'2021-11-13',changes:[]},rows,[]);assert.equal(refs.length,0);
 const next=HistoryModel.historicalReferences({id:'next',effectiveDate:'2021-11-14',changes:[]},rows,[]);assert.ok(next.length>50);assert.ok(next.every(r=>r.referenceDate==='2021-11-13'));
 const knight=rows.find(r=>r.card.name==='Knight'&&r.form.formType==='base'&&r.field==='Hitpoints');
 const unknown={id:'unknown',effectiveDate:'2021-11-14',effectiveDateKnown:true,level:null,changes:[{cardName:'Knight',cardFormId:knight.form.id,formType:'base',stat:'Hitpoints',unit:'hp',before:1,after:2}]};
 assert.ok(!HistoryModel.historicalReferences({...unknown,id:'later',effectiveDate:'2021-11-15'},rows,[unknown]).some(r=>r.id===knight.id));
});
test('dated Level 11 evidence reveals the Balloon/Cannon one-hit loss with targeting respected',()=>{
 const patch=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2022-02-03');const refs=HistoryModel.historicalReferences(patch,rows);const report=HistoryModel.detectCrossings(patch,refs).find(r=>r.change.cardName==='Balloon');assert.ok(report);
 const cannon=report.thresholds.find(t=>t.other.card.name==='Cannon');assert.ok(cannon);assert.equal(cannon.other.value,896);assert.equal(cannon.before,true);assert.equal(cannon.after,false);assert.equal(cannon.needsCheck,false);
 assert.ok(report.thresholds.every(t=>['building','tower_troop'].includes(t.other.card.cardType)||t.other.towerHP));
});

test('archived arithmetic agrees with independently published Level 11 control values',()=>{
 for(const [date,name,value] of [['2021-11-13','Goblin Hut',1017],['2022-10-04','Goblin Hut',848],['2022-10-04','Cannon',824],['2022-10-04','Prince',1920],['2022-10-04','Golden Knight',1800],['2023-02-07','Knight',1766]]){
  assert.equal(HISTORY_VERIFICATIONS.observations.find(o=>o.date===date&&o.cardName===name&&o.kind==='hp').value,value);
 }
});
