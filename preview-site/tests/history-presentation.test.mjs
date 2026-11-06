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
test('December groups run earliest first and Mighty Miner reversal is a mixed rework',()=>{
 const items=HISTORY_DATA.updates.filter(u=>u.effectiveDate.startsWith('2022-12'));for(const mode of ['month','season']){const group=HistoryModel.timelineGroups(items,mode).find(g=>g.items.length===3);assert.deepEqual(group.items.map(u=>u.effectiveDate),['2022-12-07','2022-12-12','2022-12-22']);}
 const last=items.find(u=>u.effectiveDate==='2022-12-22');assert.equal(last.sourceUrl,'https://royaleapi.com/blog/season43');assert.equal(HistoryModel.cardCategory(last,last.changes),'rework');assert.deepEqual(last.changes.map(c=>HistoryModel.changeCategory(last,c)),['nerf','buff']);assert.equal(HistoryModel.changePresentation(last,last.changes[0]).percent,'-33.3%');
 const first=items.find(u=>u.effectiveDate==='2022-12-07');assert.equal(HistoryModel.changePresentation(first,first.changes.find(c=>c.cardName==='Mighty Miner')).percent,'+50%');
});
import '../release-data.js';
test('Valkyrie Evolution stays in January 2024 Season 55 despite the source title typo',()=>{
 const u=RELEASE_DATA.updates.find(u=>u.id==='release-valkyrie-evolution-2024-january');assert.equal(u.effectiveDate,'2024-01-01');assert.equal(u.seasonMonth,'2024-01');assert.equal(u.presentation.seasonLabel,'January 2024 · Season 55');assert.match(u.seasonCorrection.quote,/January 1, 2024/);
 const groups=HistoryModel.timelineGroups([...HISTORY_DATA.updates,...RELEASE_DATA.updates],'season');assert.equal(groups.find(g=>g.items.some(i=>i.id===u.id)).key,'2024-01');
 for(const group of groups)for(const item of group.items)assert.equal(group.key.slice(0,4),item.effectiveDate.slice(0,4),'Cross-year season assignment requires explicit review: '+item.id);
});
test('Season 44 displays source DPS formulas and Rocket crown tower multiplier separately',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2023-02-07');
 for(const [name,pct]of [['Monk','+13%'],['Archers','+22%'],['Goblin Giant','+13%']]){const c=u.changes.find(c=>c.cardName===name&&/DPS$/.test(c.stat)),d=HistoryModel.changePresentation(u,c);assert.equal(d.symbolic,true);assert.equal(d.percent,pct);assert.equal(HistoryModel.changeKind(c),null);}
 const rocket=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Rocket'));assert.deepEqual([rocket.before,rocket.after],['446','371']);assert.deepEqual(rocket.rate,{label:'Crown Tower multiplier',before:'30%',after:'25%',percent:'-17%',unit:'of normal damage'});
 const monk=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Monk'&&c.unit==='seconds'));assert.equal(monk.note,'0.1 s faster');assert.equal(monk.label,'Hit Time');
});
test('Season 46 Mega Minion formula and related Spear Goblins are explicit',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.id==='a669ce0a-8011-536b-b93a-5b3b2700f954'),changes=HistoryModel.displayChanges(u.changes);
 const mega=changes.filter(c=>c.cardName==='Mega Minion');assert.equal(mega.length,2);const d=HistoryModel.changePresentation(u,mega.find(c=>c.stat==='DPS'));assert.deepEqual([d.symbolic,d.before,d.after,d.percent],[true,'DMG / 1.6','DMG / 1.5','+7%']);
 const spear=u.changes.find(c=>c.cardName==='Spear Goblins');assert.deepEqual(HistoryModel.relatedCards(u,spear).map(r=>r.name),['Spear Goblins','Goblin Hut','Goblin Gang','Goblin Giant']);assert.match(HistoryModel.relatedCards(u,spear)[3].component,/Spawned/);
 assert.deepEqual(u.changes.filter(c=>c.cardName==='Furnace').map(c=>HistoryModel.changeCategory(u,c)),['buff','nerf']);
});
test('Season 48 displays unit exponents and Phoenix DPS without inventing absolute damage',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.id==='e6f01b25-e110-5aa4-bb9b-c6b8fa7b1d79');const display=stat=>HistoryModel.changePresentation(u,u.changes.find(c=>c.stat===stat));
 assert.deepEqual([display('Deploy Delay Speed').before,display('Deploy Delay Speed').after],['1/0.1 sec⁻¹','1/0.2 sec⁻¹']);assert.equal(display('Spawn Attack Area').after,'28.3 tiles²');assert.equal(display('DPS').symbolic,true);assert.equal(display('DPS').percent,'-10%');assert.equal(display('Freeze Duration').percent,'-7.7%');
});
test('Season 49 belongs to July while retaining its June 30 date and signed bonuses',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2023-06-30');assert.equal(HistoryModel.timelineGroups([u],'season')[0].key,'2023-07');assert.equal(HistoryModel.timelineGroups([u],'month')[0].key,'2023-06');
 const bonus=HistoryModel.changePresentation(u,u.changes.find(c=>c.stat==='HP Buff'));assert.deepEqual([bonus.before,bonus.after],['+30%','+20%']);
 const c=u.changes.find(c=>c.stat==='First Hit Speed'),d=HistoryModel.changePresentation(u,c);assert.deepEqual([d.before,d.after,d.percent],['1/0.6 sec⁻¹','1/0.65 sec⁻¹','-7.6%']);
 const card={name:'Firecracker',forms:[{id:'b',formType:'base'},{id:'e',formType:'evolution'},{id:'h',formType:'hero'}]};assert.deepEqual(HistoryModel.affectedForms(u,c,[{card}]),['b','e']);
});
test('Season 50 distinguishes rework directions, symbolic Tesla DPS and evolution HP bonuses',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.id==='0cee7cb8-cccd-536e-bcb3-bc8c9d6b6eba');const sk=u.changes.filter(c=>c.cardName==='Skeletons');assert.deepEqual(sk.map(c=>HistoryModel.changeCategory(u,c)),['buff','nerf']);assert.equal(HistoryModel.cardCategory(u,sk),'rework');
 const tesla=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Tesla'&&c.stat==='DPS'));assert.equal(tesla.symbolic,true);assert.equal(tesla.percent,'+9%');assert.equal(tesla.before,'DMG/1.2 sec⁻¹');
 const fc=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Firecracker'&&c.stat==='Hitpoints'));assert.equal(fc.note,'Evolution HP bonus reduced');assert.deepEqual([fc.before,fc.after],['435','394']);
 const rg=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Royal Giant'));assert.deepEqual([rg.rate.before,rg.rate.after],['+20%','+10%']);
});
test('Season 52 converts evolution multipliers into bonuses and preserves reciprocal units',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.id==='13db4bb9-f07c-5df3-a475-aaa59250b6d5');
 const bonuses=u.changes.filter(c=>/Bonus Multiplier/.test(c.stat)).map(c=>HistoryModel.changePresentation(u,c));assert.deepEqual(bonuses.map(d=>[d.before,d.after]),[['+30%','+20%'],['+9%','0%'],['+30%','+25%']]);assert.ok(bonuses.every(d=>d.note==='Bonus over Base'));
 const bomb=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Bomb Tower'));assert.equal(bomb.rate.after,'1/1.8 sec⁻¹');
 assert.deepEqual(u.changes.filter(c=>c.cardName==='Giant Snowball').map(c=>HistoryModel.changeCategory(u,c)),['buff','nerf']);
 assert.equal(HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Magic Archer')).percent,'+60%');
});
test('Season 53 Effective DPS is a signed standalone nerf and rates have no extra seconds suffix',()=>{
 const u=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2023-11-13');const d=HistoryModel.changePresentation(u,u.changes.find(c=>c.stat==='Effective DPS'));assert.deepEqual([d.single,d.after,d.percent],[true,'-18%',null]);
 const speed=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Knight'&&c.stat==='Hit Speed'));assert.deepEqual([speed.before,speed.after],['1.11 hits/sec','0.909 hits/sec']);
 const recruits=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Royal Recruits'));assert.deepEqual([recruits.before,recruits.after],['+12%','+6%']);
});
test('Season 54 Power Shot damage is verified against the Level 11 release screenshot',()=>{
 const raw=HISTORY_DATA.updates.find(u=>u.id==='58f6106c-b535-51ff-885e-6ab216b6ac26'),u=HistoryModel.verifiedUpdate(raw),c=u.changes.find(c=>c.stat==='Power Shot Damage');assert.equal(HistoryModel.level11Values(u,c),true);assert.deepEqual([c.before,c.after],[215,184]);assert.match(c.levelVerification.imageSha256,/^[a-f0-9]{64}$/);assert.equal(raw.changes.find(c=>c.stat==='Power Shot Damage').levelReference,undefined);
 const d=HistoryModel.changePresentation(u,c);assert.deepEqual([d.before,d.after,d.percent],['215','184','-15%']);const goblin=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Goblin Giant'));assert.equal(goblin.after,'1/1.7 hits/sec');
});
test('January 2024 verified values display while unverified charge stays relative-only',()=>{
 const raw=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2024-01-03'),u=HistoryModel.verifiedUpdate(raw);assert.equal(u.changes.filter(c=>c.levelVerification).length,6);
 const lp=u.changes.filter(c=>c.cardName==='Little Prince');assert.deepEqual(lp.map(c=>[c.before,c.after]),[[1800,1600],[110,100]]);assert.ok(lp.every(c=>HistoryModel.level11Values(u,c)));
 const recruits=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Royal Recruits'));assert.equal(recruits.percent,'-8%');assert.equal(recruits.single,true);
});
test('Season 57 verifies HP, corrects source time units and separates rework directions',()=>{
 const raw=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2024-03-05'),u=HistoryModel.verifiedUpdate(raw);
 for(const [name,a,b] of [['Goblin Giant',3336,3232],['Monk',2000,2150],['Goblin Drill',1440,1312]]){const c=u.changes.find(c=>c.cardName===name&&c.unit==='hp');assert.ok(HistoryModel.level11Values(u,c));assert.deepEqual([c.before,c.after],[a,b]);}
 const magic=u.changes.find(c=>c.cardName==='Magic Archer');assert.deepEqual([magic.before,magic.after,magic.unit],[0.8,0.7,'seconds']);assert.match(raw.changes.find(c=>c.id===magic.id).before,/as reported/);
 const drill=u.changes.filter(c=>c.cardName==='Goblin Drill');assert.deepEqual(drill.map(c=>HistoryModel.changeCategory(u,c)),['buff','buff','nerf']);assert.deepEqual(drill.map(c=>HistoryModel.changePresentation(u,c).percent),['+11%','-50%','-9%']);
 const knight=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Knight'&&c.stat==='Damage Multiplier'));assert.deepEqual([knight.before,knight.after,knight.percent],['+10%','0%','-9%']);
 const march18=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2024-03-18');assert.match(march18.sourceUrl,/game-update-lucky-drops/);assert.match(march18.excerpt,/Evolved Skeletons are no longer inconsistently destroyed/);assert.match(march18.excerpt,/Fixed an interaction inconsistency between Tesla and Wall Breakers/);
});
test('Season 59 fills verified Level11 values and preserves raw evidence',()=>{
 const raw=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2024-05-07'),u=HistoryModel.verifiedUpdate(raw);
 const expected=[['Archers','Power Shot Damage',184,215],['Royal Giant','Hitpoints',3072,3164],['Royal Recruits','Hitpoints',532,547],['Valkyrie','Tornado Damage',76,84],['Wall Breakers','Runner Damage',392,196],['Cannoneer','Damage',422,401],['Dagger Duchess','Hitpoints',3204,2768],['Poison','Crown Tower Damage per Second',28,23]];
 for(const [name,stat,before,after] of expected){const c=u.changes.find(c=>c.cardName===name&&c.stat===stat);assert.ok(HistoryModel.level11Values(u,c),name);assert.deepEqual([c.before,c.after],[before,after]);assert.ok(c.levelVerification.method);}
 assert.equal(raw.changes.find(c=>c.stat==='Power Shot Damage').unit,'relative');
 const valk=HistoryModel.changePresentation(u,u.changes.find(c=>c.stat==='Tornado Damage'));assert.equal(valk.percent,'+11%');
 const power=HistoryModel.changePresentation(u,u.changes.find(c=>c.stat==='Power Shot Damage'));assert.equal(power.percent,'+18%');
 assert.equal(HistoryModel.updatePresentation(u).seasonLabel,'May 2024 · Season 59');
});
test('Season 59 shared icons replace duplicate rows and retain separate Evolution bonuses',()=>{
 const u=HistoryModel.verifiedUpdate(HISTORY_DATA.updates.find(u=>u.effectiveDate==='2024-05-07')),visible=HistoryModel.displayChanges(u.changes);
 assert.deepEqual(visible.filter(c=>c.cardName==='Battle Ram').map(c=>c.stat),['Heavy Troop Pushback']);
 const barb=u.changes.find(c=>c.cardName==='Barbarians');assert.deepEqual(HistoryModel.relatedCards(u,barb).map(c=>[c.name,c.formType]),[['Barbarians','evolution'],['Battle Ram','evolution']]);
 for(const name of ['Royal Giant','Royal Recruits']){
  const changes=visible.filter(c=>c.cardName===name);assert.deepEqual(changes.map(c=>c.stat),['Hitpoints','Hitpoint Multiplier']);
  const card={name,forms:[{id:'b',formType:'base'},{id:'e',formType:'evolution'},{id:'h',formType:'hero'}]};assert.deepEqual(HistoryModel.affectedForms(u,changes[0],[{card}]),['b','e']);
  assert.deepEqual(changes.map(c=>HistoryModel.changeCategory(u,c)),['buff','nerf']);
  const d=HistoryModel.changePresentation(u,changes[1]);assert.equal(d.after,'0%');assert.equal(d.rate.after,name==='Royal Giant'?'3164':'547');
 }
 const fire=visible.filter(c=>c.cardName==='Firecracker');assert.deepEqual(fire.map(c=>HistoryModel.changeCategory(u,c)),['nerf','buff','buff','buff']);assert.deepEqual(fire.map(c=>HistoryModel.changePresentation(u,c).percent),['-23%','+20%','+25%',null]);
 const zap=HistoryModel.changePresentation(u,u.changes.find(c=>c.cardName==='Zap'));assert.notEqual(zap.note,'Bonus over Base');
});
