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
test('February timing breakdown preserves reciprocal rates and relative-only first hit speed',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2022-02-03');
 for(const [name,before,after,percent]of [['Balloon','1/3','1/2','+50%'],['Mini P.E.K.K.A','1/1.7','1/1.6','+6%'],['Musketeer','1/1.1','1/1','+10%']]){const c=u.changes.find(c=>c.cardName===name&&c.unit==='seconds'),d=HistoryModel.changePresentation(u,c);assert.equal(d.label,'Hit Time');assert.deepEqual(d.rate,{label:'Hit Speed',before,after,percent});assert.equal(HistoryModel.changeCategory(u,c),'buff');}
 const inferno=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Inferno Tower'));assert.equal(inferno.single,true);assert.equal(inferno.after,'+25%');assert.equal(inferno.rate,null);
 const balloon=u.changes.find(c=>c.cardName==='Balloon'&&c.unit==='damage');assert.deepEqual([balloon.before,balloon.after],[960,640]);
});
test('April preserves signed boosts, cleans relative buffs, and classifies production correctly',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2022-04-04'),find=(name,stat)=>u.changes.find(c=>c.cardName===name&&c.stat===stat);
 const giant=HistoryModel.changePresentation(u,find('Giant Skeleton','Hitpoints +'));assert.deepEqual([giant.label,giant.single,giant.after],['Hitpoints',true,'+7%']);
 const tomb=HistoryModel.changePresentation(u,find('Tombstone','Spawn Rate'));assert.deepEqual([tomb.single,tomb.after],[true,'+5%']);
 const queen=HistoryModel.changePresentation(u,find('Archer Queen','Hit Speed Boost'));assert.deepEqual([queen.before,queen.after,queen.percent],['+200%','+180%','-10%']);
 const snare=HistoryModel.changePresentation(u,find('Ram Rider','Bola Snare'));assert.deepEqual([snare.before,snare.after,snare.percent],['-85%','-70%','+17.6%']);
 const mirror=HistoryModel.changePresentation(u,find('Mirror','Level'));assert.deepEqual([mirror.before,mirror.after],['+1','+2']);
 for(const [stat,category]of [['Elixir at Destruction','buff'],['Lifetime','nerf'],['Elixir Generation','nerf']])assert.equal(HistoryModel.changeCategory(u,find('Elixir Collector',stat)),category);
});
test('June shared Barbarian changes include source-confirmed parent cards and reciprocal rates',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.id==='5bd1ac7d-925a-5bd4-9934-a00a1b78d683'),c=u.changes.find(c=>c.cardName==='Barbarians');
 assert.deepEqual(HistoryModel.relatedCards(u,c).map(r=>r.name),['Barbarians','Barbarian Barrel','Battle Ram','Barbarian Hut']);assert.ok(HistoryModel.relatedCards(u,c).slice(1).every(r=>r.component.includes('Spawned Barbarian')));
 assert.deepEqual(HistoryModel.changePresentation(u,c).rate,{label:'Hit Speed',percent:'+8%',before:'1/1.4',after:'1/1.3'});
 assert.deepEqual(HistoryModel.relatedCards(u,u.changes.find(c=>c.stat==='Distance')),[]);
 assert.deepEqual(HistoryModel.relatedCards({...u,id:'other'},c),[]);
 const mother=u.changes.find(c=>c.cardName==='Mother Witch'&&c.stat==='Hit Speed');assert.equal(HistoryModel.changePresentation(u,mother).rate.percent,'+10%');
});
test('August Elixir Golem totals belong to their stages, with Level 11 HP',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2022-07-28'),stages=HistoryModel.elixirStages(u,u.changes.filter(c=>c.cardName==='Elixir Golem'));assert.equal(stages.length,3);
 for(const stage of stages){assert.equal(parseFloat(stage.release.before)*stage.count,parseFloat(stage.total.before));assert.equal(parseFloat(stage.release.after)*stage.count,parseFloat(stage.total.after));}
 assert.deepEqual(stages.map(s=>s.hp?.after),[1568,763,undefined]);
 const fireball=u.changes.find(c=>c.cardName==='Fireball');assert.equal(HistoryModel.changePresentation(u,fireball).percent,'-44%');
 assert.equal(HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Prince')).after,'3 tiles');
});
test('Season 40 names the affected component and colors individual Hut changes',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2022-09-29');
 const gang=u.changes.find(c=>c.cardName==='Goblin Gang'),d=HistoryModel.changePresentation(u,gang);assert.equal(d.label,'Spear Goblin Count');assert.deepEqual([d.before,d.after,d.percent],['2','3','+50%']);
 for(const [stat,category]of [['Elixir Cost','buff'],['Spawn Time','nerf'],['Spawn Count','buff'],['Life Time','nerf'],['Death Spawn','nerf'],['Total Spawned','nerf']])assert.equal(HistoryModel.changeCategory(u,u.changes.find(c=>c.cardName==='Barbarian Hut'&&c.stat===stat)),category);
 assert.equal(HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Cannon Cart')).label,'Stationary Cannon · Hitpoints');
});
test('October Q3 label and Goblin shared first-hit changes remain explicit',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2022-10-25');assert.equal(HistoryModel.updatePresentation(u).seasonLabel,'October 2022 · Q3');assert.equal(HistoryModel.timelineGroups([u],'season')[0].label,'October 2022 · Q3');
 const count=u.changes.find(c=>c.stat==='Count');assert.equal(HistoryModel.changeCategory(u,count),'buff');
 const gang=u.changes.find(c=>c.cardName==='Goblin Gang');assert.equal(HistoryModel.changePresentation(u,gang).label,'Goblin · First Hit Time');assert.equal(HistoryModel.changePresentation(u,gang).percent,'+100%');assert.equal(HistoryModel.relatedCards(u,gang).length,4);
});
test('November emergency updates retain source dates, percentages and nerf directions',()=>{
 const first=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2022-11-02'),second=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2022-11-21');assert.equal(first.sourceUrl,'https://royaleapi.com/blog/season41');assert.match(first.excerpt,/applied on Wednesday, November 2/);
 assert.deepEqual(first.changes.map(c=>HistoryModel.changePresentation(first,c).percent),['-10%','+7.5%','+13%']);assert.ok(first.changes.every(c=>HistoryModel.changeCategory(first,c)==='nerf'));
 const egg=HistoryModel.changePresentation(second,second.changes[0]);assert.deepEqual([egg.label,egg.before,egg.after,egg.percent],['Egg Hitpoints','363','239','-34%']);
});
