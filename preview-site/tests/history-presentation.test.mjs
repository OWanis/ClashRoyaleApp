import {test} from 'node:test';import assert from 'node:assert/strict';
import '../history-data.js';import '../history-model.js';
const update=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2021-11-04');
test('relative Champion buffs show signed changes, not fabricated before/after values',()=>{
 for(const [stat,value]of [['Damage','+14%'],['Damage Area','+30%']]){const c=update.changes.find(c=>c.cardName==='Skeleton King'&&c.stat===stat),d=HistoryModel.changePresentation(update,c);assert.equal(d.single,true);assert.equal(d.after,value);assert.equal(HistoryModel.changeKind(c),null);}
 const absolute=HistoryModel.changePresentation(update,{before:0,after:15,unit:'percent',stat:'Slow',quote:'0 → 15%'});assert.equal(absolute.single,false);assert.equal(absolute.before,'0%');assert.equal(absolute.after,'15%');
});
test('pushback exception and season are preserved from the supplied evidence',()=>{
 const c=update.changes.find(c=>c.stat==='Pushback'),d=HistoryModel.changePresentation(update,c);assert.equal(d.after,'Immune');assert.equal(d.note,'Except The Log');assert.equal(d.single,true);assert.match(update.excerpt,/immunity doesn’t work against The Log/);assert.equal(HistoryModel.updatePresentation(update).seasonLabel,'November 2021 · Season 29');
 const cooldown=HistoryModel.changePresentation(update,update.changes.find(c=>c.stat==='Ability Cooldown'));assert.deepEqual([cooldown.before,cooldown.after,cooldown.single],['11 s','15 s',false]);
});
import '../history-verifications.js';
test('December changes show individual directions and sourced or calculated percentages',()=>{
 const u=HistoryModel.verifiedUpdate(HISTORY_DATA.updates.find(u=>u.effectiveDate==='2021-12-07'));
 const furnace=u.changes.filter(c=>c.cardName==='Furnace');assert.equal(HistoryModel.cardCategory(u,furnace),'rework');
 for(const [stat,category,pct]of [['Lifetime','nerf','-32.7%'],['Spawn Rate','buff','-14.3%'],['Death Spawn','buff',null],['Hitpoints','nerf','-17%']]){const c=furnace.find(c=>c.stat===stat);assert.equal(HistoryModel.changeCategory(u,c),category);assert.equal(HistoryModel.changePresentation(u,c).percent,pct);}
 const ram=u.changes.find(c=>c.cardName==='Battle Ram');assert.equal(HistoryModel.level11Values(u,ram),true);assert.deepEqual([HistoryModel.changePresentation(u,ram).before,HistoryModel.changePresentation(u,ram).after,HistoryModel.changePresentation(u,ram).percent],['530','572','+8%']);
 const ice=u.changes.find(c=>c.cardName==='Ice Wizard');assert.equal(HistoryModel.changePresentation(u,ice).single,true);
});
