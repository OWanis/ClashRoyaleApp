import {test} from 'node:test';import assert from 'node:assert/strict';import '../history-model.js';
const row=(id,kind,value)=>({id,form:{id},kind,value,field:kind==='hp'?'Hitpoints':'Damage',panelKind:'main',observation:{displayedLevel:11},card:{forms:[{id}]}});
const change=(id,kind,before,after)=>({id:'c-'+id,cardFormId:id,formType:'base',stat:kind==='hp'?'Hitpoints':'Damage',unit:kind==='hp'?'hp':'damage',before,after});
const patch={id:'patch',effectiveDate:'2025-01-05',effectiveDateKnown:true,level:11,sourceUrl:'https://example.test/patch',changes:[change('attacker','damage',110,130),change('defender','hp',100,140)]};
const templates=[row('attacker','damage',999),row('defender','hp',999),row('unknown','hp',1)];
test('historical comparisons use both sides of the dated patch, without current/future or unknown fallbacks',()=>{
 const future={...patch,id:'future',effectiveDate:'2026-01-01',changes:[change('defender','hp',140,999)]};const rows=HistoryModel.historicalReferences(patch,templates,[patch,future]);assert.equal(rows.length,2);const hp=rows.find(r=>r.kind==='hp');assert.equal(hp.beforeValue,100);assert.equal(hp.value,140);assert.equal(templates[1].value,999);
 const result=HistoryModel.detectCrossings(patch,rows).find(r=>r.change.cardFormId==='attacker');assert.equal(result.thresholds.length,1);assert.equal(result.thresholds[0].before,true);assert.equal(result.thresholds[0].after,false);
});
test('unparsed, unknown-level and uncertain-date changes invalidate older historical anchors',()=>{
 for(const extra of [{level:null},{effectiveDateKnown:false},{changes:[{...change('defender','hp',140,150),after:'increased'}]}]){const next={...patch,id:'next',effectiveDate:'2025-02-01',changes:[change('defender','hp',140,150)],...extra};const selected={...patch,id:'selected',effectiveDate:'2025-03-01',changes:[]};assert.ok(!HistoryModel.historicalReferences(selected,templates,[patch,next,selected]).some(r=>r.form.id==='defender'));}
});
test('same-day ordering is not invented for multiple patches affecting one form',()=>{
 const other={...patch,id:'other',changes:[change('defender','hp',140,160)]};assert.ok(!HistoryModel.historicalReferences(patch,templates,[patch,other]).some(r=>r.form.id==='defender'));
});
test('base-stat edits invalidate potentially shared form values unless explicitly updated too',()=>{
 const card={forms:[{id:'base'},{id:'evo'}]},base={...row('base','hp',999),card},evo={...row('evo','hp',999),card};const earlier={...patch,id:'early',effectiveDate:'2025-01-01',changes:[{...change('evo','hp',100,120),formType:'evolution'}]},selected={...patch,changes:[change('base','hp',100,110)]};assert.ok(!HistoryModel.historicalReferences(selected,[base,evo],[earlier,selected]).some(r=>r.form.id==='evo'));
 const paired={...selected,changes:[{...change('evo','hp',120,130),formType:'evolution'},...selected.changes]};assert.equal(HistoryModel.historicalReferences(paired,[base,evo],[earlier,paired]).find(r=>r.form.id==='evo').value,130);
});
test('ambiguous older same-day patches stay unknown until a later unambiguous observation',()=>{
 const other={...patch,id:'other',changes:[change('defender','hp',140,160)]},selected={...patch,id:'later',effectiveDate:'2025-03-01',changes:[]};assert.ok(!HistoryModel.historicalReferences(selected,templates,[patch,other,selected]).some(r=>r.form.id==='defender'));
 const correction={...selected,id:'correction',effectiveDate:'2025-02-01',changes:[change('defender','hp',160,180)]};assert.equal(HistoryModel.historicalReferences(selected,templates,[patch,other,correction,selected]).find(r=>r.form.id==='defender').value,180);
});
