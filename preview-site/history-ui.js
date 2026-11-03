(function(){
'use strict';
const updates=HISTORY_DATA.updates;let update=updates[0];const referenceRows=OneShot.build(DATA.cards).rows,hpRows=referenceRows.filter(r=>r.kind==='hp').sort((a,b)=>a.card.name.localeCompare(b.card.name)||a.form.formType.localeCompare(b.form.formType)||a.label.localeCompare(b.label));
function date(s){return new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(new Date(s+'T00:00:00Z'));}
const picker=el('select');picker.id='history-update';picker.setAttribute('aria-label','Balance update');for(const item of updates){const option=el('option','',item.title);option.value=item.id;picker.append(option);}const pickerLabel=el('label','history-update-label','Choose an update');pickerLabel.htmlFor=picker.id;$('history-date').before(pickerLabel,picker);const archiveSummary=el('p','breakpoint-hint',updates.length+' updates · '+updates.reduce((n,u)=>n+u.changes.length,0)+' documented card changes · January–October 2026. Reviewed through 3 November; no start-of-November patch was announced.');picker.after(archiveSummary);
function renderMetadata(){
$('history-source').replaceChildren();$('history-evidence').replaceChildren();document.querySelector('.history-season')?.remove();document.querySelector('.history-global-rules')?.remove();
const source=el('a','history-source','Official Supercell article ↗');source.href=update.sourceUrl;source.target='_blank';source.rel='noopener noreferrer';$('history-source').append(source,el('p','breakpoint-hint','Article published '+date(update.publishedDate)+' · Selected update effective '+date(update.effectiveDate)+' · Time of day unspecified.'));
const season=HistoryModel.updatePresentation(update).seasonLabel;if(season){const label=el('p','history-season',season);$('history-date').before(label);}
$('history-date').textContent='Balance update · '+date(update.effectiveDate);
$('history-coverage').textContent=update.coverage.replace('October 6 changes are not yet imported. ','')+' '+(update.level===null?'Source level unspecified; automatic Level 11 comparisons are disabled.':'Source values are Level '+update.level+'.');const notices=HistoryModel.updatePresentation(update).notices||[];if(notices.length){const rules=el('section','history-global-rules');rules.append(el('h3','','Global gameplay changes'));for(const notice of notices)rules.append(el('p','notice',notice));$('history-coverage').after(rules);}
$('history-evidence').append(el('p','',update.levelQuote),el('p','breakpoint-evidence','Source section: '+update.sourceSection+' · Retained source SHA-256: '+update.sourceHash),el('p','breakpoint-evidence','Retrieved '+update.retrievedAt+'. Publication, effective and retrieval dates are kept separate.'));
}
function categoryBadge(category){return el('span','balance-category '+category,({buff:'↑ Buff',nerf:'↓ Nerf',rework:'↔ Rework',unclassified:'Unclassified',fix:'↔ Bug fix'})[category]);}
function render(){
 const query=$('history-search').value.trim().toLowerCase(),families=new Map();
 for(const c of update.changes){if(!(c.cardName+' '+c.formType+' '+c.stat).toLowerCase().includes(query))continue;const card=DATA.cards.find(card=>card.forms.some(f=>f.id===c.cardFormId)),key=baseForm(card).id;if(!families.has(key))families.set(key,{card,changes:[]});families.get(key).changes.push(c);}
 const matched=[...families.values()].reduce((n,f)=>n+f.changes.length,0);$('history-count').textContent=matched+' of '+update.changes.length+' documented changes · '+families.size+' cards';$('history-changes').replaceChildren();
 for(const {card,changes}of families.values()){
  const category=HistoryModel.cardCategory(update,changes),box=el('article','history-change balance-'+category),head=el('div','history-card-heading');const firstForm=card.forms.find(f=>f.id===changes[0].cardFormId);head.append(imageFor(card,firstForm),el('h3','',card.name));box.append(head,categoryBadge(category));
  const formIds=[...new Set(changes.map(c=>c.cardFormId))];
  for(const formId of formIds){const form=card.forms.find(f=>f.id===formId),section=el('section','history-form-changes'),heading=el('div','history-form-heading');if(formIds.length>1)heading.append(imageFor(card,form));heading.append(el('span','badge '+form.formType,title(form.formType)));section.append(heading);
   for(const c of changes.filter(c=>c.cardFormId===formId)){const stat=el('div','history-stat-change balance-'+HistoryModel.changeCategory(update,c)),name=el('div','history-stat-name');name.append(statIcon(c.stat),el('strong','',c.stat));const values=el('div','history-values');const unit=c.unit==='seconds'?' s':c.unit==='tiles'?' tiles':c.unit==='percent'?'%':c.unit==='elixir'?' elixir':'';values.append(el('span','',String(c.before)+unit),el('span','history-arrow','→'),el('strong','',String(c.after)+unit));stat.append(name,values);if(HistoryModel.detectCrossings({...update,changes:[c]},referenceRows).some(r=>r.thresholds.length||r.rankings.length||r.hitCounts.length)){const b=el('button','textbutton','View detected changes');b.addEventListener('click',()=>document.getElementById('crossing-'+c.id)?.scrollIntoView({behavior:'smooth',block:'start'}));stat.append(b);}section.append(stat);}box.append(section);
  }$('history-changes').append(box);
 }
 if(!families.size)$('history-changes').append(el('p','empty','No matching changes.'));
}

function renderAttackOptions(){
$('history-attack').replaceChildren();for(const c of HistoryModel.damageChanges(update)){const option=el('option','',c.cardName+' · '+title(c.formType)+' · '+c.stat);option.value=c.id;$('history-attack').append(option);}const preferred=HistoryModel.damageChanges(update).find(c=>c.cardName==='Void')||HistoryModel.damageChanges(update)[0];if(preferred)$('history-attack').value=preferred.id;$('history-comparison').hidden=!preferred||update.level===null;
}
for(const hp of hpRows){const option=el('option','',hp.card.name+' · '+title(hp.form.formType)+' · '+hp.context+' · '+hp.label+' · '+hp.value+' HP');option.value=hp.id;$('history-hp').append(option);}const archers=hpRows.find(h=>h.card.name==='Archers'&&h.form.formType==='base'&&h.field==='Hitpoints');$('history-hp').value=archers.id;
function compare(){if($('history-comparison').hidden)return;const c=update.changes.find(c=>c.id===$('history-attack').value),hp=hpRows.find(h=>h.id===$('history-hp').value),result=HistoryModel.compare(c,hp),box=$('history-comparison-result');box.replaceChildren();const attack=HistoryModel.referenceForChange(c,referenceRows),blocked=attack?OneShot.targetEligibility(attack,hp):'No unambiguous attack component is mapped to this source stat.';if(blocked){box.append(el('p','notice','Not an applicable target: '+blocked));$('history-comparison-note').textContent='No matchup result is calculated for an incompatible target.';$('history-reference').textContent='Targeting uses the recorded screenshot rules.';return;}const targetCard=el('div','history-reference-image');targetCard.append(imageFor(hp.card,hp.form),statIcon(hp.field),el('span','',hp.card.name+' · '+title(hp.form.formType)+' · '+hp.value+' HP'));box.append(targetCard);for(const [key,label]of [['before','Before update'],['after','After update']]){const r=result[key],n=el('div','history-outcome '+(r.reaches?'reached':'survives'));n.append(el('h3','',label),statIcon('Damage'),el('strong','',r.damage+' damage'),el('p','',r.reaches?'HP threshold reached':r.remaining+' HP remains'),el('p','breakpoint-hint',r.damage+' '+(r.reaches?'≥':'<')+' '+hp.value+' HP'));box.append(n);}$('history-comparison-note').textContent=(result.mechanicCheck?'Shield / reduction requires a mechanic check. ':'')+(result.changed?'This change crosses the selected reference HP threshold.':'This change does not cross the selected reference HP threshold.')+' This is damage arithmetic against a fixed screenshot HP reference, not a verified historical matchup. Targeting and active mechanics are not simulated.';
 $('history-reference').textContent='Reference: '+hp.card.name+' · '+title(hp.form.formType)+' · '+hp.label+' = '+hp.value+' · '+(hp.observation.capturedOn?'Captured '+hp.observation.capturedOn:'Screenshot capture date unknown')+'. Historical HP on '+update.effectiveDate+' is not established by this screenshot.';
}
function eventText(item,kind,ranking){
 if(item.beforeHits!==undefined)return item.beforeHits+' → '+item.afterHits+' hits';
 if(ranking)return (item.afterRelation>item.beforeRelation?'↑':'↓')+(item.afterRelation===0?' =':'');
 if(item.needsCheck||item.other.shield||item.other.protected)return item.after?'Now breaks this HP layer':'No longer breaks this HP layer';
 return kind==='damage'?(item.after?'Now kills in 1 hit':'No longer kills in 1 hit'):(item.after?'Now survives 1 hit':'Now dies in 1 hit');
}
function eventLabel(item,kind,ranking){
 const up=item.beforeHits!==undefined?item.afterHits<item.beforeHits:ranking?item.afterRelation>item.beforeRelation:item.after;
 const label=el('p','crossing-direction '+(up?'effect-up':'effect-down'),eventText(item,kind,ranking));
 if(ranking&&item.beforeHits===undefined){label.title=item.afterRelation===0?'Now equal':item.afterRelation>0?'Now higher':'Now lower';label.setAttribute('aria-label',label.title);}
 return label;
}
function eventSection(items,kind,ranking){
 const groups=new Map();for(const item of items){const r=item.other,key=JSON.stringify([baseForm(r.card).id,r.context,r.label,eventText(item,kind,ranking)]);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(item);}
 const grid=el('div','matchup-icon-grid');for(const values of groups.values()){values.sort((a,b)=>({base:0,evolution:1,hero:2})[a.other.form.formType]-({base:0,evolution:1,hero:2})[b.other.form.formType]);const first=values[0],family=el('section','matchup-family'+(values.length>=3?' three-versions':''));family.append(el('h3','',first.other.card.name),el('p','matchup-stat-label',(first.other.context==='Card'?'':first.other.context+' · ')+first.other.label),eventLabel(first,kind,ranking));const strip=el('div','matchup-icon-strip');for(const item of values){const r=item.other,b=el('button','matchup-icon '+r.form.formType);b.title=r.card.name+' · '+title(r.form.formType)+' · '+r.label+' · '+r.value;b.setAttribute('aria-label',b.title+' · '+eventText(item,kind,ranking));const image=el('img');image.src=r.image;image.alt='';image.loading='lazy';b.append(image,el('span','matchup-form',title(r.form.formType)),statIcon(r.kind==='hp'?'Hitpoints':'Damage'),el('strong','',r.value.toLocaleString('en-US')));if(item.needsCheck)b.append(el('span','matchup-condition','Mechanic check'));else if(r.conditional)b.append(el('span','matchup-condition','Conditional'));b.addEventListener('click',()=>openCard(r.card,r.form.id));strip.append(b);}family.append(strip);grid.append(family);}return grid;
}
function renderAutomatic(){
 const container=$('history-auto-results');container.replaceChildren();$('history-auto-count').textContent='';
 const detected=HistoryModel.detectCrossings(update,referenceRows).filter(r=>r.thresholds.length||r.rankings.length||r.hitCounts.length);
 $('history-auto').hidden=!detected.length;
 for(const report of detected){
  const c=report.change,card=DATA.cards.find(card=>card.forms.some(f=>f.id===c.cardFormId)),form=card.forms.find(f=>f.id===c.cardFormId),block=el('article','crossing-report balance-'+HistoryModel.changeCategory(update,c));block.id='crossing-'+c.id;
  const head=el('div','history-card-heading');head.append(imageFor(card,form));const text=el('div');text.append(el('h3','',c.cardName+' · '+title(c.formType)),el('p','',c.stat));const value=el('div','history-values');value.append(statIcon(report.kind==='hp'?'Hitpoints':'Damage'),el('span','',String(c.before)),el('span','history-arrow','→'),el('strong','',String(c.after)));text.append(value);head.append(text);block.append(head);
  const crossings=new Set(report.thresholds.map(item=>item.other.id));
  const hits=report.hitCounts.filter(item=>!crossings.has(item.other.id));
  for(const [items,ranking] of [[report.thresholds,false],[report.rankings,true],[hits,false]])if(items.length)block.append(eventSection(items,report.kind,ranking));
  container.append(block);
 }
}
function selectUpdate(){update=updates.find(u=>u.id===picker.value)||updates[0];renderMetadata();renderAttackOptions();render();renderAutomatic();compare();}
picker.addEventListener('change',selectUpdate);$('history-search').addEventListener('input',render);for(const id of ['history-attack','history-hp'])$(id).addEventListener('change',compare);selectUpdate();
})();

// Enrich card details from persisted deltas without changing screenshot observations.
globalThis.appendBalanceStats=function(body,form,observation){
 const displayed={...observation.fieldsDisplayed,...observation.metadataDisplayed};
 for(const panel of observation.supplementalPanels)Object.assign(displayed,panel.fieldsDisplayed);
 for(const ability of observation.abilities)Object.assign(displayed,ability.fieldsDisplayed);
 const facts=HistoryModel.additionalStats(HISTORY_DATA.updates,form.id,displayed);
 if(!facts.length)return;
 const section=statSection('Additional stats from balance notes','','Latest documented values in the imported balance notes. Dates apply to the notes, not the selected screenshot. Later unimported updates may change these values.');section.classList.add('balance-extra-stats');
 for(const fact of facts){const {change,update}=fact,box=el('article','balance-extra-stat');
  box.append(el('h4','',change.stat));
  const value=el('div','balance-extra-value');value.append(statIcon(change.stat),el('strong','',fact.conflict?'Conflicting source values':String(change.after)+(change.unit==='seconds'?' s':change.unit==='tiles'?' tiles':change.unit==='percent'?'%':change.unit==='elixir'?' elixir':'')));box.append(value);
  box.append(el('p','breakpoint-hint','Previously: '+String(change.before)+' · Effective '+update.effectiveDate+(update.level===null?' · Source level unspecified':' · Level '+update.level)));
  const source=el('a','history-source',update.sourceTitle+' ↗');source.href=update.sourceUrl;source.target='_blank';source.rel='noopener noreferrer';box.append(source);
  const history=el('details','balance-extra-history');history.append(el('summary','','Recorded changes ('+fact.history.length+')'));
  for(const entry of fact.history){const line=el('p','breakpoint-evidence',entry.update.effectiveDate+' · '+String(entry.change.before)+' → '+String(entry.change.after)+' · '+entry.change.unit+' · ');const link=el('a','history-source','Source');link.href=entry.update.sourceUrl;link.target='_blank';link.rel='noopener noreferrer';line.append(link);history.append(line);}box.append(history);section.append(box);
 }
 body.append(section);
};
