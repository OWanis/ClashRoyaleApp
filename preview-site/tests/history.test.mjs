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
const reference=(kind,value,field=kind==='hp'?'Hitpoints':'Damage',form='reference')=>({id:kind+value+form,kind,value,field,form:{id:form},observation:{displayedLevel:11}});
test('automatic detector catches gained/lost thresholds and rank ties, excluding unchanged/self/other levels',()=>{
 const c={id:'change',cardFormId:'source',unit:'damage',stat:'Damage',before:100,after:120};
 const report=HistoryModel.detectCrossings({level:11,changes:[c]},[reference('hp',120),reference('hp',100),reference('hp',130),reference('damage',110),reference('damage',120),reference('damage',100),reference('damage',120,'Damage','source'),{...reference('hp',110),observation:{displayedLevel:12}}])[0];
 assert.equal(report.thresholds.length,1);assert.equal(report.thresholds[0].after,true);
 assert.deepEqual(report.rankings.map(r=>[r.beforeRelation,r.afterRelation]),[[-1,1],[-1,0],[0,1]]);
 const nerf=HistoryModel.detectCrossings({level:11,changes:[{...c,before:120,after:100}]},[reference('hp',120)])[0];assert.equal(nerf.thresholds[0].after,false);
});
test('HP changes reverse survival equality and detect HP ordering crossings',()=>{
 const c={id:'hp-change',cardFormId:'source',unit:'hp',stat:'Hitpoints',before:100,after:120};
 const report=HistoryModel.detectCrossings({level:11,changes:[c]},[reference('damage',100),reference('damage',120),reference('hp',110),reference('hp',120)])[0];
 assert.equal(report.thresholds.length,1);assert.equal(report.thresholds[0].other.value,100);assert.equal(report.thresholds[0].after,true);assert.equal(report.rankings.length,2);
 const nerf=HistoryModel.detectCrossings({level:11,changes:[{...c,before:120,after:100}]},[reference('damage',100)])[0];assert.equal(nerf.thresholds[0].after,false);
});
test('detector retains mechanic cautions and skips nonnumeric mechanics',()=>{
 const c=update.changes.find(c=>c.cardName==='Void');const report=HistoryModel.detectCrossings({level:11,changes:[c]},[{...reference('hp',304),protected:true}])[0];assert.equal(report.thresholds[0].needsCheck,true);
 assert.equal(HistoryModel.detectCrossings(update,[]).length,7);
});
test('automatic Minion Giant report removes Wall Breakers HP but retains valid building crossings',async()=>{
 const {readFileSync}=await import('node:fs');await import('../one-shot-model.js');
 const {cards}=JSON.parse(readFileSync(new URL('../index.html',import.meta.url),'utf8').match(/<script id="catalog-data" type="application\/json">(.*?)<\/script>/s)[1]);
 const rows=OneShot.build(cards).rows;const report=HistoryModel.detectCrossings(update,rows).find(r=>r.change.cardName==='Minion Giant');
 assert.ok(report.excludedTargets>0);const inferno=report.hitCounts.find(e=>e.other.card.name==='Inferno Tower');assert.equal(inferno.beforeHits,11);assert.equal(inferno.afterHits,12);assert.ok(report.hitCounts.every(e=>e.other.towerHP||e.other.card.cardType==='building'));assert.ok(report.thresholds.every(e=>e.other.towerHP||e.other.card.cardType==='building'));
 const building=rows.find(r=>r.card.cardType==='building'&&r.kind==='hp'&&r.panelKind==='main');
 const valid=HistoryModel.detectCrossings({level:11,changes:[report.change]},[...rows,{...building,id:'test-building',value:160}])[0];assert.ok(valid.thresholds.some(e=>e.other.id==='test-building'));
 const barrel=HistoryModel.detectCrossings(update,rows).find(r=>r.change.cardName==='Skeleton Barrel'&&r.change.formType==='evolution');assert.ok(barrel.thresholds.some(e=>e.other.card.cardType==='troop'));
});
test('source classifications drive colors instead of numeric direction; season label is evidence-bound',()=>{
 assert.equal(HistoryModel.updatePresentation(update).seasonLabel,'October 2026 · Season 88');
 assert.equal(HistoryModel.changeCategory(update,update.changes.find(c=>c.cardName==='Electro Dragon')),'buff');
 assert.equal(HistoryModel.changeCategory(update,update.changes.find(c=>c.stat==='Mass')),'nerf');
 assert.equal(HistoryModel.cardCategory(update,update.changes.filter(c=>c.cardName==='Skeleton Barrel')),'rework');
 assert.equal(HistoryModel.updatePresentation({id:'unknown'}).seasonLabel,null);
 assert.equal(HistoryModel.changeCategory(update,{id:'unknown'}),'unclassified');
 assert.deepEqual(update.changes.reduce((n,c)=>{const k=HistoryModel.changeCategory(update,c);n[k]=(n[k]||0)+1;return n;},{}),{nerf:5,buff:4,rework:3});
});
test('2026 archive keeps all patch dates, explicit source quotes and unknown levels',()=>{
 const year=HISTORY_DATA.updates.filter(u=>u.effectiveDate.startsWith('2026'));assert.equal(year.length,16);assert.equal(year.reduce((n,u)=>n+u.changes.length,0),296);
 assert.equal(new Set(year.map(u=>u.effectiveDate.slice(0,7))).size,10);
 const ids=new Set();for(const u of HISTORY_DATA.updates){assert.ok(u.effectiveDate<='2026-11-03');for(const c of u.changes){assert.ok(!ids.has(c.id));ids.add(c.id);assert.ok(u.excerpt.includes(c.quote));assert.notEqual(HistoryModel.changeCategory(u,c),'unclassified');}}
 const august=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2026-08-04');assert.equal(august.level,null);assert.match(august.presentation.notices[0],/except Boss Bandit/);assert.deepEqual(HistoryModel.detectCrossings(august,[reference('hp',220)]),[]);
 const march=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2026-03-02');assert.ok(march.publishedDate>march.effectiveDate);assert.ok(march.excerpt.includes(march.effectiveDateBasis));
 assert.equal(HistoryModel.changeKind({unit:'percent',stat:'Hitpoints bonus',before:10,after:0}),null);
});
test('component damage cannot silently become parent damage or unrestricted matchup results',async()=>{
 const {readFileSync}=await import('node:fs');await import('../one-shot-model.js');const {cards}=JSON.parse(readFileSync(new URL('../index.html',import.meta.url),'utf8').match(/<script id="catalog-data" type="application\/json">(.*?)<\/script>/s)[1]);const rows=OneShot.build(cards).rows;
 const april=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2026-04-06'),souldier=april.changes.find(c=>c.stat==='Souldier Damage');const source=HistoryModel.referenceForChange(souldier,rows);assert.ok(!source||source.panelKind!=='main');
 const fake={...souldier,stat:'Unmapped component damage',comparisonKey:null};const report=HistoryModel.detectCrossings({...april,changes:[fake]},rows)[0];assert.equal(report.unmapped,true);assert.equal(report.thresholds.length,0);assert.equal(report.hitCounts.length,0);
 const cannon=april.changes.find(c=>c.cardName==='Cannon');assert.equal(HistoryModel.referenceForChange(cannon,rows).panelKind,'main');
 const september=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2026-09-08');const fireball=september.changes.find(c=>c.cardName==='Fireball');assert.ok(HistoryModel.detectCrossings({...september,changes:[fireball]},rows)[0].thresholds.every(e=>e.other.towerHP));
});
test('mixed numerical buffs and nerfs are grouped as a rework even inside a source buff section',()=>{
 const october=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2026-10-06');const lava=october.changes.filter(c=>c.cardName==='Lava Hound');assert.equal(HistoryModel.cardCategory(october,lava),'rework');assert.equal(HistoryModel.changeCategory(october,lava.find(c=>c.stat==='Hit Speed')),'nerf');assert.equal(HistoryModel.changeCategory(october,lava.find(c=>c.stat==='Damage')),'buff');
});

test('2025 archive covers every month, separates maintenance dates and preserves explicitly scoped levels',()=>{
 const year=HISTORY_DATA.updates.filter(u=>u.effectiveDate.startsWith('2025'));assert.equal(year.length,24);assert.equal(year.reduce((n,u)=>n+u.changes.length,0),274);assert.equal(new Set(year.map(u=>u.effectiveDate.slice(0,7))).size,12);
 assert.equal(HISTORY_DATA.updates.length,40);assert.equal(HISTORY_DATA.updates.reduce((n,u)=>n+u.changes.length,0),570);
 const furnace=year.find(u=>u.effectiveDate==='2025-08-06');assert.equal(furnace.changes.length,2);assert.equal(furnace.effectiveDateKnown,true);
 const april=year.find(u=>u.effectiveDate==='2025-04-09');assert.equal(april.effectiveDateKnown,false);assert.equal(april.level,null);assert.equal(april.changes.find(c=>c.cardName==='Tornado').before,'84 × 2');
 const january=year.find(u=>u.effectiveDate==='2025-01-30');assert.ok(january.changes.filter(c=>c.cardName==='P.E.K.K.A').every(c=>c.levelReference===11));
 const november=year.find(u=>u.effectiveDate==='2025-11-26');assert.equal(november.changes.find(c=>c.cardName==='Tower Princess').levelReference,16);
 const cycle=year.find(u=>u.effectiveDate==='2025-09-25');assert.match(cycle.presentation.notices[0],/only the newest/);
});
