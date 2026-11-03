import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import '../one-shot-model.js';
const {cards}=JSON.parse(readFileSync(new URL('../index.html',import.meta.url),'utf8').match(/<script id="catalog-data" type="application\/json">(.*?)<\/script>/s)[1]);
const M=globalThis.OneShot,{rows,excluded}=M.build(cards);
const find=(name,field,form='base')=>rows.find(r=>r.card.name===name&&r.field===field&&r.form.formType===form&&r.panelKind==='main');
test('ramp endpoints use hit damage, never DPS',()=>{const ramp=rows.filter(r=>r.card.name==='Inferno Tower'&&r.kind==='damage');assert.deepEqual(ramp.map(r=>r.value),[847,43]);assert.ok(ramp[0].label.includes('maximum'));assert.ok(ramp[1].label.includes('minimum'));assert.ok(excluded.some(r=>r.card==='Inferno Tower'&&r.field==='Damage/Sec'));});
test('raw multipliers parse safely; rates and percentages stay excluded',()=>{assert.deepEqual(M.parseValue('122 x3'),[{value:122,suffix:'per hit · 3 hits shown'}]);assert.deepEqual(M.parseValue('75%'),[]);assert.deepEqual(M.parseValue('+30'),[]);assert.deepEqual(M.parseValue('unknown'),[]);assert.equal(find('Arrows','Area Damage').value,366);assert.equal(rows.filter(r=>r.card.name==='Poison').length,0);});
test('Sparky crosses troop HP thresholds with surviving HP calculated',()=>{const sparky=find('Sparky','Area Damage');assert.equal(M.compare(sparky,find('Archers','Hitpoints')).group,'yes');const knight=M.compare(sparky,find('Knight','Hitpoints'));assert.equal(knight.group,'no');assert.equal(knight.remaining,435);});
test('equality reaches HP threshold; shield never means whole-unit death',()=>{const d=find('Knight','Damage'),h=find('Skeletons','Hitpoints');assert.equal(M.compare({...d,value:h.value},h).group,'yes');assert.equal(M.compare(d,{...h,value:d.value+1}).group,'no');assert.equal(M.compare(find('Sparky','Area Damage'),find('Guards','Hitpoints')).group,'mechanic');assert.match(M.compare(find('Sparky','Area Damage'),find('Guards','Shield Hitpoints')).reason,/not a whole-unit kill/);});
test('crown damage and building targeting are scoped',()=>{const tower=find('Tower Princess','Hitpoints');assert.equal(M.compare(find('Fireball','Area Damage'),tower).group,'inapplicable');assert.equal(M.compare(find('Fireball','Crown Tower Damage'),tower).group,'no');assert.equal(M.compare(find('Fireball','Crown Tower Damage'),find('Skeletons','Hitpoints')).group,'inapplicable');assert.equal(M.compare(find('Golem','Damage'),find('Skeletons','Hitpoints')).group,'inapplicable');});
test('original positions survive search/type filters; filtered mode renumbers',()=>{const ranked=M.ranked(rows,'base'),filtered=M.filter(ranked,{kind:'damage',query:'Sparky'});assert.equal(filtered.length,1);assert.equal(filtered[0].displayRank,ranked.find(r=>r.id===filtered[0].id).rank);assert.ok(filtered[0].displayRank>1);assert.equal(M.filter(ranked,{kind:'damage',query:'Sparky',numbering:'filtered'})[0].displayRank,1);assert.equal(M.filter(ranked,{kind:'hp'}).every(r=>r.kind==='hp'),true);});
test('stable ranking, unique state IDs, one observation per form and tie order',()=>{assert.equal(new Set(rows.map(r=>r.id)).size,rows.length);for(let i=1;i<rows.length;i++){assert.ok(rows[i-1].value>=rows[i].value);if(rows[i-1].value===rows[i].value&&rows[i-1].kind==='hp')assert.equal(rows[i].kind,'hp');}assert.equal(rows.filter(r=>r.card.name==='Knight'&&r.field==='Damage'&&r.form.formType==='base').length,1);assert.ok(rows.some(r=>r.context==='Golemite'));assert.ok(rows.some(r=>r.context==='Trusty Turret'));assert.deepEqual(M.build(cards).rows.map(r=>r.id),rows.map(r=>r.id));});
test('form-specific HP and damage yield independent outcomes',()=>{
 const hit=find('Electro Spirit','Ranged Damage');
 assert.equal(M.compare(hit,find('Bats','Hitpoints')).group,'yes');
 assert.equal(M.compare(hit,find('Bats','Hitpoints','evolution')).group,'no');
 assert.equal(find('Tesla','Damage').value,220);assert.equal(find('Tesla','Damage','evolution').value,351);
 assert.equal(M.compare(find('Tesla','Damage'),find('Archers','Hitpoints')).group,'no');
 assert.equal(M.compare(find('Tesla','Damage','evolution'),find('Archers','Hitpoints')).group,'yes');
 assert.equal(find('Knight','Hitpoints','hero').value,1766);
 assert.ok(rows.some(r=>r.card.name==='Knight'&&r.form.formType==='hero'&&r.field==='Shield Hitpoints'&&r.value===512));
});
test('corresponding Base/Evolution/Hero icons share a family without losing per-form values',()=>{
 const hits=rows.filter(r=>r.card.name==='Knight'&&r.field==='Damage'&&r.panelKind==='main');
 const grouped=M.groupMatchups(hits.map(other=>({other,result:M.compare(other,find('Skeletons','Hitpoints'))})));
 assert.equal(grouped.length,1);assert.deepEqual(grouped[0].items.map(i=>i.other.form.formType),['base','evolution','hero']);
 const health=rows.filter(r=>r.card.name==='Bats'&&r.kind==='hp');const groups=M.groupMatchups(health.map(other=>({other,result:M.compare(find('Sparky','Area Damage'),other)})));
 const normal=groups.find(g=>g.label==='Hitpoints');assert.deepEqual(normal.items.map(i=>i.other.value),[81,122]);assert.ok(groups.some(g=>g.label==='Max Hitpoints'));assert.equal(groups.find(g=>g.label==='Max Hitpoints').items.length,1);
});

test('every reviewed multiplier has separate individual and total entries across forms',()=>{
 for(const [name,field,form,unit,total] of [
 ['Firecracker','Ranged Damage','base',64,320],['Firecracker','Ranged Damage','evolution',64,320],
 ['Hunter','Ranged Damage','base',84,840],['Hunter','Ranged Damage','evolution',84,840],
 ['Electro Wizard','Damage','base',117,234],['Electro Wizard','Damage','hero',117,234],
 ['Executioner','Area Damage','base',179,358],['Executioner','Area Damage','evolution',179,358],
 ['Executioner','Close Quarters Damage','evolution',240,480],
 ['Arrows','Area Damage','base',122,366],['Arrows','Crown Tower Damage','base',25,75],
 ['Magic Archer','Triple Shot Damage','hero',46,138]]){
 const entries=rows.filter(r=>r.card.name===name&&r.form.formType===form&&r.field===field);
 assert.deepEqual(entries.map(r=>r.value),[total,unit],name+' '+form+' '+field);
 assert.ok(entries[0].aggregate);assert.ok(entries[0].formula);assert.equal(entries[1].aggregate,false);
 }
 assert.ok(!rows.some(r=>/Damage\/Sec/i.test(r.field)));
});
test('direct, volley, sequential and unverified totals have distinct matchup semantics',()=>{
 const hp=find('Archers','Hitpoints'),firecracker=find('Firecracker','Ranged Damage');
 assert.equal(firecracker.scope,'direct');assert.equal(M.compare(firecracker,hp).group,'yes');
 assert.equal(M.compare(rows.find(r=>r.card.name==='Firecracker'&&r.value===64),hp).group,'no');
 assert.equal(find('Arrows','Area Damage').scope,'cast');assert.equal(find('Executioner','Area Damage').scope,'sequence');
 assert.equal(find('Hunter','Ranged Damage').scope,'volley');
 const triple=rows.find(r=>r.card.name==='Magic Archer'&&r.aggregate);
 assert.equal(M.compare(triple,find('Skeletons','Hitpoints')).group,'mechanic');
 assert.equal(M.compare(find('Arrows','Area Damage'),find('Guards','Hitpoints')).group,'mechanic');
 assert.match(M.compare(find('Hunter','Ranged Damage'),find('Knight','Hitpoints')).reason,/all listed hits/);
});
test('card isolation is exact across forms and preserves original positions',()=>{
 const cardId=cards.find(c=>c.name==='Knight').forms.find(f=>f.formType==='base').id;
 const ranked=M.ranked(rows),isolated=M.filter(ranked,{cardId});
 assert.ok(isolated.length>5);assert.ok(isolated.every(r=>r.card.name==='Knight'));
 assert.deepEqual([...new Set(isolated.map(r=>r.form.formType))].sort(),['base','evolution','hero']);
 assert.ok(isolated.some(r=>r.field==='Shield Hitpoints'));assert.ok(isolated.some(r=>r.kind==='damage'));assert.ok(isolated.some(r=>r.kind==='hp'));
 for(const r of isolated)assert.equal(r.displayRank,ranked.find(x=>x.id===r.id).rank);
 assert.deepEqual(M.filter(ranked,{cardId,numbering:'filtered'}).map(r=>r.displayRank),isolated.map((_,i)=>i+1));
 assert.ok(M.filter(ranked,{cardId,kind:'hp',query:'shield'}).every(r=>r.kind==='hp'&&r.label.toLowerCase().includes('shield')));
});
test('building-only attacks reject troop components; death damage does not inherit deployment targets',()=>{
 const giant=find('Minion Giant','Damage');
 assert.equal(M.compare(giant,find('Wall Breakers','Hitpoints','evolution')).group,'inapplicable');
 assert.equal(M.targetEligibility(giant,find('Inferno Tower','Hitpoints')),null);
 assert.equal(M.targetEligibility(giant,find('Tower Princess','Hitpoints')),null);
 const golemite=rows.find(r=>r.context==='Golemite'&&r.kind==='hp');assert.ok(M.targetEligibility(giant,golemite));
 assert.equal(M.targetEligibility(find('Skeleton Barrel','Death Damage'),find('Skeletons','Hitpoints')),null);
});
