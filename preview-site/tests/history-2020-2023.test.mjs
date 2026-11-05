import {test} from 'node:test';
import assert from 'node:assert/strict';
import '../history-data.js';
import '../history-model.js';
const old=HISTORY_DATA.updates.filter(u=>u.effectiveDate<'2024-01-01');
test('reviewed older reports preserve scoped levels, quotes and unique identities',()=>{
 assert.equal(old.length,37);assert.equal(old.reduce((n,u)=>n+u.changes.length,0),399);
 for(const [year,updates,changes] of [['2020',12,120],['2021',5,86],['2022',11,110],['2023',9,83]]){
  const group=old.filter(u=>u.effectiveDate.startsWith(year));assert.equal(group.length,updates);assert.equal(group.flatMap(u=>u.changes).length,changes);
 }
 assert.equal(new Set(HISTORY_DATA.updates.map(u=>u.id)).size,HISTORY_DATA.updates.length);
 for(const u of old){assert.equal(u.level,null);assert.ok(u.excerpt.includes(u.effectiveDateBasis));for(const c of u.changes){assert.ok(u.excerpt.includes(c.quote));if(c.levelReference){assert.equal(c.levelReference,11);assert.match(c.quote,/Level 11/);}}}
});
test('only Level 11 combat values display; level-independent mechanics remain available',()=>{
 for(const level of [null,9,14,16])for(const stat of ['Damage','Spawn Damage','Hitpoints','DPS','DMG','Crown Tower: 1 Target'])assert.equal(HistoryModel.level11Values({level},{stat,unit:'value'}),false);
 assert.equal(HistoryModel.level11Values({level:null},{stat:'Damage',unit:'damage',levelReference:11}),true);
 assert.equal(HistoryModel.level11Values({level:11},{stat:'Damage',unit:'damage',levelReference:16}),false);
 for(const [stat,unit] of [['Range','tiles'],['Hit Speed','seconds'],['Crown Tower Damage','percent'],['Mass','value']])assert.equal(HistoryModel.level11Values({level:null},{stat,unit}),true);
 assert.deepEqual(HistoryModel.detectCrossings({level:16,changes:[{stat:'Damage',unit:'damage',before:100,after:120}]},[]),[]);
 assert.deepEqual(HistoryModel.historicalReferences({effectiveDate:'2023-04-02',effectiveDateKnown:false},[],HISTORY_DATA.updates),[]);
});
test('historical components and spell reductions cannot become parent attacks',()=>{
 const spell=old.find(u=>u.effectiveDate==='2020-08-04');const changes=spell.changes.filter(c=>c.stat==='Crown Tower Damage');assert.equal(changes.length,10);assert.ok(changes.every(c=>c.unit==='percent'&&c.before===35&&c.after===30));assert.ok(changes.every(c=>!['Earthquake','Tornado'].includes(c.cardName)));
 const phoenix=old.find(u=>u.effectiveDate==='2022-11-21');assert.equal(phoenix.changes.length,1);assert.equal(phoenix.changes[0].stat,'Egg Hit Points');assert.equal(phoenix.changes[0].levelReference,11);
 const december=old.find(u=>u.effectiveDate==='2022-12-07');assert.ok(december.changes.every(c=>!['Rage','Lumberjack'].includes(c.cardName)));
 const rage=old.find(u=>u.effectiveDate==='2022-12-12');assert.equal(rage.changes.find(c=>c.stat==='Damage').after,192);
 const feb=old.find(u=>u.effectiveDate==='2023-02-07');assert.ok(feb.changes.some(c=>c.stat==='Reborn Damage'&&c.after===174));
});
test('visible history begins with the Level 11 tournament era',()=>{
 assert.equal(HistoryModel.HISTORY_START,'2021-10-27');
 assert.equal(HistoryModel.inScope({effectiveDate:'2021-10-26'}),false);
 assert.equal(HistoryModel.inScope({effectiveDate:'2021-10-27'}),true);
 const visible=HISTORY_DATA.updates.filter(HistoryModel.inScope);assert.ok(visible.length>0);assert.ok(visible.every(u=>u.effectiveDate>='2021-10-27'));
 const old={effectiveDate:'2020-01-07',level:11,changes:[{cardFormId:'test',stat:'Mass',before:3,after:6,unit:'value'}]};assert.deepEqual(HistoryModel.additionalStats([old],'test'),[]);
 assert.ok(HISTORY_DATA.updates.some(u=>u.effectiveDate.startsWith('2020')),'older evidence retained');
});
