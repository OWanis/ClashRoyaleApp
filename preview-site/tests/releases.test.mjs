import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import '../one-shot-model.js';import '../history-model.js';import '../history-data.js';import '../release-data.js';
const {cards}=JSON.parse(readFileSync(new URL('../index.html',import.meta.url),'utf8').match(/<script id="catalog-data" type="application\/json">(.*?)<\/script>/s)[1]);const rows=OneShot.build(cards).rows;
test('Void has separate cumulative hits for all six troop and tower tiers',()=>{
 const list=rows.filter(r=>r.card.name==='Void');assert.equal(list.length,18);
 for(const [field,unit,tower] of [['Damage: 1 Target',696,false],['Damage: 2 - 4 Targets',307,false],['Damage: 5+ Targets',153,false],['Crown Tower: 1 Target',97,true],['Crown Tower: 2 - 4 Targets',51,true],['Crown Tower: 5+ Targets',35,true]]){const entries=list.filter(r=>r.field===field).sort((a,b)=>a.value-b.value);assert.deepEqual(entries.map(r=>r.value),[unit,unit*2,unit*3]);assert.deepEqual(entries.map(r=>r.aggregate),[false,true,true]);assert.ok(entries.every(r=>r.towerDamage===tower&&r.label.includes(tower?'Crown Towers':'Troops & buildings')));}
 const normal=list.find(r=>!r.towerDamage&&!r.aggregate),crown=list.find(r=>r.towerDamage&&!r.aggregate),tower=rows.find(r=>r.towerHP),building=rows.find(r=>r.kind==='hp'&&r.card.cardType==='building'&&r.panelKind==='main');assert.ok(OneShot.targetEligibility(normal,tower));assert.equal(OneShot.targetEligibility(normal,building),null);assert.ok(OneShot.targetEligibility(crown,building));assert.equal(OneShot.targetEligibility(crown,tower),null);
});
test('Minion Giant ranking excludes reduced Crown Tower spell damage',()=>{const p=HISTORY_DATA.updates.find(u=>u.effectiveDate==='2026-10-19'),r=HistoryModel.detectCrossings(p,rows).find(r=>r.change.cardName==='Minion Giant');assert.ok(r.rankings.every(x=>!x.other.towerDamage));assert.ok(r.rankings.some(x=>x.other.card.name==='Void'&&x.other.value===153&&!x.other.aggregate));});
test('releases link canonical forms, source quotes and distinct availability dates',()=>{assert.equal(RELEASE_DATA.updates.length,79);const ids=new Set();for(const u of RELEASE_DATA.updates){assert.ok(!ids.has(u.id));ids.add(u.id);assert.equal(u.changes.length,0);assert.equal(u.level,null);assert.match(u.sourceHash,/^[a-f0-9]{64}$/);assert.equal(u.effectiveDate,u.releaseDate||u.publishedDate);if(u.releaseDate)assert.ok(u.excerpt.includes(u.dateBasis)||(u.dateEvidence||[]).some(e=>e.quote===u.dateBasis));for(const r of u.releases){assert.ok(cards.some(c=>c.forms.some(f=>f.id===r.cardFormId&&f.formType===r.formType)));assert.ok(u.excerpt.includes(r.quote));}}
 const hero=RELEASE_DATA.updates.find(u=>u.mechanic==='Heroes');assert.equal(hero.releases.length,4);assert.equal(hero.mechanicEvidence.announcedOn,'2025-11-21');const mega=RELEASE_DATA.updates.find(u=>u.releases.some(r=>r.cardName==='Mega Minion'));assert.equal(mega.releaseDate,'2026-02-13');assert.equal(mega.generalAvailabilityDate,'2026-03-02');});
test('month and season group all events once, keeping announced June content in June season',()=>{
 const all=[...HISTORY_DATA.updates,...RELEASE_DATA.updates];for(const mode of ['month','season']){const groups=HistoryModel.timelineGroups(all,mode,all);assert.equal(groups.flatMap(g=>g.items).length,all.length);assert.equal(new Set(groups.flatMap(g=>g.items.map(i=>i.id))).size,all.length);}
 const june=RELEASE_DATA.updates.find(u=>u.sourceUrl.endsWith('/june-update-2026/')&&!u.releaseDate);assert.ok(HistoryModel.timelineGroups(all,'month',all).find(g=>g.key==='2026-05').items.includes(june));assert.ok(HistoryModel.timelineGroups(all,'season',all).find(g=>g.key==='2026-06').items.includes(june));
 const october=HistoryModel.timelineGroups(all,'season',all).find(g=>g.key==='2026-10');assert.match(october.label,/Season 88/);assert.ok(october.items.some(i=>i.eventType));assert.ok(october.items.some(i=>!i.eventType));
 const releases=HistoryModel.timelineGroups(RELEASE_DATA.updates,'season',all);assert.match(releases.find(g=>g.key==='2026-10').label,/Season 88/);
});
test('release audit covers every catalog Evolution/Hero and keeps previews and date conflicts explicit',()=>{
 const released=new Set(RELEASE_DATA.updates.flatMap(u=>u.releases.map(r=>r.cardFormId)));assert.equal(released.size,95);for(const card of cards)for(const form of card.forms)if(form.formType!=='base')assert.ok(released.has(form.id),form.name);
 assert.equal(RELEASE_DATA.audit.formsTotal,188);assert.equal(RELEASE_DATA.audit.dateConflicts.length,2);
 const hogs=RELEASE_DATA.updates.find(u=>u.releases.some(r=>r.cardName==='Royal Hogs'));assert.equal(hogs.releaseDate,'2025-11-03');assert.ok(hogs.dateEvidence.some(e=>e.quote.includes('November 3rd')));
 for(const u of RELEASE_DATA.updates)for(const item of u.releases)for(const stat of item.launchStats){assert.equal(stat.status,'preview');assert.ok(stat.sourceUrl&&stat.quote&&stat.sourceHash);if(stat.level!==null)assert.ok(stat.levelQuote);}
 const evo=RELEASE_DATA.updates.find(u=>u.mechanic==='Card Evolutions');assert.equal(evo.releaseDate,'2023-06-19');assert.equal(evo.releases.length,4);
});

test('documented availability resolves previews without dating unrelated forms',()=>{
 const cage=RELEASE_DATA.updates.find(u=>u.releases.some(r=>r.cardName==='Goblin Cage'));
 assert.equal(cage.releaseDate,'2024-08-05');assert.equal(cage.availability,'Season Pass');assert.ok(cage.dateEvidence.some(e=>e.quote.includes('Shards x6')));
 const minion=RELEASE_DATA.updates.find(u=>u.releases.some(r=>r.cardName==='Minion Giant'));
 assert.equal(minion.releaseDate,'2026-09-07');assert.equal(minion.availability,'Unlock event');assert.equal(minion.releases.length,1);
 assert.equal(RELEASE_DATA.updates.find(u=>u.releases.some(r=>r.cardName==='Ice Wizard')).releaseDate,null);
 assert.ok(RELEASE_DATA.audit.dateConflicts.every(c=>c.status==='resolved-availability'&&c.resolvedDate));
});
test('older introductions preserve uncertain dates and preview scopes',()=>{
 const old=RELEASE_DATA.updates.filter(u=>u.id.startsWith('release-older-'));assert.equal(old.length,12);assert.equal(old.flatMap(u=>u.releases).length,15);
 const heal=old.find(u=>u.releases.some(r=>r.cardName==='Heal Spirit'));assert.equal(heal.releaseDate,'2020-04-02');assert.match(heal.dateBasis,/April 2nd/);
 const champions=old.find(u=>u.mechanic==='Champions');assert.equal(champions.releaseDate,null);assert.equal(champions.releases.length,3);assert.match(champions.excerpt,/We can’t tell you when the update/);
 assert.ok(old.filter(u=>u!==heal).every(u=>u.releaseDate===null&&!u.effectiveDateKnown));
 const drill=old.flatMap(u=>u.releases).find(r=>r.cardName==='Goblin Drill');assert.equal(drill.launchStats.find(s=>s.label==='Hitpoints').value,'1440');assert.ok(drill.launchStats.every(s=>s.level===11&&s.status==='preview'));
 assert.equal(RELEASE_DATA.audit.missingForms.length,93);
});
