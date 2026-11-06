(function(root){
'use strict';
const HISTORY_START='2021-10-27';
function inScope(update){return update.effectiveDate>=HISTORY_START;}
const presentation={
  "ea043182-2e45-515c-9e6e-7f0aa4a171a5": {
    "seasonLabel": "October 2026 \u00b7 Season 88",
    "seasonBasis": "Owner-supplied RoyaleAPI October 2026 Season 88 screenshot. Calendar-season label; the selected patch remains October 19.",
    "classificationBasis": "Supercell October 19 subsection headings: NERFS, BUFFS and REWORKS.",
    "changes": {
      "00f3489b-1f3c-54e8-b556-11c491ac6257": "nerf",
      "cf4d392e-7575-545c-ba4e-7b753a0cc4c5": "nerf",
      "afb5dd05-81d7-5b64-95d6-cd1abbabe091": "nerf",
      "49b07490-d43a-551d-a0e2-7548361d2968": "nerf",
      "5fc75733-6bfe-55e1-a28c-9553f885bd49": "nerf",
      "5c1f7401-960a-565a-9562-82528e867870": "buff",
      "75a35506-1b30-5566-89b5-222aeca29460": "buff",
      "10a52d84-430b-5c26-8b58-ff4cc686bb2d": "buff",
      "3ad2d09c-f6f2-5d2f-98d4-2aefd76fbd41": "buff",
      "548ddacc-696b-5991-9282-241ecca9d3a9": "rework",
      "c3720e3c-7d38-575a-9913-5d7a527af9be": "rework",
      "2dd4a268-2672-5506-a3f5-e9b92d996b86": "rework"
    }
  }
};
function verifiedUpdate(update){
 const proofs=root.HISTORY_VERIFICATIONS?.changes||{};
 return {...update,changes:update.changes.map(c=>{const proof=proofs[c.id];
  if(!proof||proof.level!==11||proof.effectiveDate!==update.effectiveDate||proof.cardFormId!==c.cardFormId||proof.stat!==c.stat||proof.before!==c.before||proof.after!==c.after)return c;
  return {...c,levelReference:11,levelVerification:proof};
 })};
}
function snapshotPatches(update){
 const groups=new Map(),data=root.HISTORY_VERIFICATIONS;
 for(const o of data?.observations||[]){
  // Same-day snapshots cannot establish what was true before the selected patch.
  if(o.level!==11||o.date<HISTORY_START||o.date>=update.effectiveDate)continue;
  if(!groups.has(o.date))groups.set(o.date,{id:'snapshot-'+o.date,effectiveDate:o.date,effectiveDateKnown:true,referenceSnapshot:true,level:11,changes:[]});
  groups.get(o.date).changes.push({id:o.id,cardName:o.cardName,cardFormId:o.cardFormId,formType:'base',stat:o.field,comparisonKey:o.field,unit:o.kind==='hp'?'hp':'damage',before:o.value,after:o.value,referenceId:o.templateId,referenceSource:data.sources[o.evidence.source].url});
 }
 return [...groups.values()];
}
function updatePresentation(update){if(update.id==='80fa387d-c2eb-530a-a766-f1fcdb675eda')return {...update.presentation,seasonLabel:'December 2022 · Season 42'};if(update.id==='e7d42138-c3d1-50cb-b666-61e56b35b3fe')return {...update.presentation,seasonLabel:'October 2022 · Q3'};const result=update.presentation||presentation[update.id]||{seasonLabel:null,changes:{}};return update.id==='08fc975e-b81d-5767-a1e3-83e716be6662'?{...result,seasonLabel:'November 2021 · Season 29'}:result;}
function changePresentation(update,change){
 const single=change.before==null||['','—','-'].includes(change.before);
 const unit=change.unit==='value'&&/\n[\d.]+ tiles\n[\d.]+ tiles?$/.test(change.quote||'')?' tiles':change.unit==='seconds'?' s':change.unit==='tiles'?' tiles':change.unit==='percent'?'%':change.unit==='elixir'?' elixir':'';
 const sourceLines=(change.quote||'').split('\n').map(s=>s.trim());
 const evolutionBonus=change.formType==='evolution'&&/Bonus Multiplier$/.test(change.stat);
 const format=value=>{if(evolutionBonus&&typeof value==='number'){const bonus=Number(((value-1)*100).toFixed(2));return (bonus>0?'+':'')+bonus+'%';}const signedValue=typeof value==='number'&&value>=0&&sourceLines.slice(1).some(line=>line==='+'+value+(change.unit==='percent'?'%':''));return typeof value==='number'?(signedValue?'+':'')+String(value)+unit:String(value??'').replace(/^([+-])\s+(?=\d)/,'$1').replace(/\bsec\s+(?:\^\s*)?-1\b/g,'sec⁻¹').replace(/\btiles?\s+(?:\^\s*)?2\b/g,'tiles²');};
 const signed=single&&change.unit==='percent'?change.quote?.match(/([+-]\s*\d+(?:\.\d+)?)%/):null;
 let note=update.id==='08fc975e-b81d-5767-a1e3-83e716be6662'&&change.cardName==='Skeleton King'&&change.stat==='Pushback'&&update.excerpt.includes('immunity doesn’t work against The Log')?'Except The Log':null;
 const quotedPercent=(single?change.quote:sourceLines.slice(0,Math.max(1,sourceLines.length-2)).join(' '))?.match(/([+-]\s*\d+(?:\.\d+)?)%/);
 let percent=quotedPercent?quotedPercent[1].replace(/\s/g,'')+'%':null;
 const novemberPercent={'3ba1c0e4-a30a-53a3-b5b5-946b001bd3ce':['Damage\n                    -10%','-10%'],'5a5ef8bf-a5e6-5e30-8354-0684cef4b84b':['Egg Hit Points (HP)\n                    -34%','-34%']}[change.id];
 if(novemberPercent&&update.excerpt?.includes(novemberPercent[0]))percent=novemberPercent[1];
 if(change.id==='bd4dd330-d566-5640-aec4-16ba6d8d3089')percent='-7.6%';
 if(change.id==='3c46ffe7-8a26-50c5-98e7-c2e8dbe8f921')percent=null;
 if(change.id==='b783f089-5aec-5dea-b3d1-66deb6c6c5d8')percent=null;
 if(!percent&&change.stat==='Movement Speed'){const a=String(change.before).match(/\((\d+)\)/),b=String(change.after).match(/\((\d+)\)/);if(a&&b&&Number(a[1])>0){const delta=Number(((Number(b[1])/Number(a[1])-1)*100).toFixed(1));percent=(delta>0?'+':'')+delta+'%';}}
 if(!percent&&level11Values(update,change)&&Number.isFinite(change.before)&&Number.isFinite(change.after)&&change.before!==0&&change.before!==change.after){const delta=(change.after-change.before)/Math.abs(change.before)*100;const rounded=Number(delta.toFixed(1));percent=(rounded>0?'+':'')+rounded+'%';}
 // Preserve the source's distinction between seconds per hit and hits per second.
 let rate=null;
 const timing=change.unit==='seconds'&&/^(First )?Hit Time\b/.test(change.quote||'');
 if(timing&&change.before>0&&change.after>0){
  const at=(update.excerpt||'').indexOf(change.quote);
  const following=at<0?'':update.excerpt.slice(at+change.quote.length,at+change.quote.length+180).replace(/ sec\s*\n-1/g,'');
  const match=following.match(/^\s*((?:First )?Hit Speed)\s+([+-]\d+(?:\.\d+)?%)\s*(?:\(Faster\))?\s*\n(1\/[\d.]+)\s*\n(1\/[\d.]+)/);
  if(match&&Number(match[3].slice(2))===change.before&&Number(match[4].slice(2))===change.after)rate={label:match[1],percent:match[2],before:match[3],after:match[4]};
  if(rate&&update.id==='13db4bb9-f07c-5df3-a475-aaa59250b6d5'){rate.before+=' sec⁻¹';rate.after+=' sec⁻¹';rate.unit='';}
 }
 if(change.unit==='seconds'){const timingNote=change.quote?.match(/(\d+(?:\.\d+)?) sec (faster|slower|sooner)/);if(timingNote)note=timingNote[1]+' s '+timingNote[2];}
 const symbolic=/DPS$/.test(change.stat)&&/^DMG\s*\/\s*\d+(?:\.\d+)?(?:\s+(?:dmg\/sec|sec\s*-1))?$/.test(change.before)&&/^DMG\s*\/\s*\d+(?:\.\d+)?(?:\s+(?:dmg\/sec|sec\s*-1))?$/.test(change.after);
 if(update.id==='22d81425-fd9a-5c9b-9aa4-fcdc21347b01'&&change.cardName==='Rocket'&&change.stat==='Crown Tower Damage'&&/30%[\s\S]*25%/.test(update.excerpt))rate={label:'Crown Tower multiplier',before:'30%',after:'25%',percent:'-17%',unit:'of normal damage'};
 if(update.id==='0cee7cb8-cccd-536e-bcb3-bc8c9d6b6eba'&&change.formType==='evolution'&&change.stat==='Hitpoints'){
  if(change.cardName==='Royal Giant')rate={label:'Evolution HP bonus',before:'+20%',after:'+10%',percent:'',unit:'over Base'};
  if(change.cardName==='Firecracker')note='Evolution HP bonus reduced';
 }
 const season40Label=update.id==='8d353b91-7619-5f5e-9d1c-fd83be53fa1d'?({'Goblin Gang|Count':'Spear Goblin Count','Elixir Golem|EGolem 1 Hit Time':'Elixir Golem · Hit Time','Elixir Golem|EGolem 2 Hit Time':'Elixir Golemite · Hit Time','Elixir Golem|EGolem 3 Hit Time':'Elixir Blob · Hit Time','Cannon Cart|Destroyed HP':'Stationary Cannon · Hitpoints'}[change.cardName+'|'+change.stat]):null;
 if(evolutionBonus)note='Bonus over Base';
 return {symbolic,label:(evolutionBonus?change.stat.replace(' Multiplier',''):null)||(change.cardName==='Phoenix'&&change.stat==='Egg Hit Points'?'Egg Hitpoints':null)||season40Label||(timing&&/^(Hit Speed|Hit Time)/.test(change.stat)?change.quote.match(/^(?:First )?Hit Time/)[0]:change.stat.replace(/\s+[+-](?:\s+\d+(?:\.\d+)?\s*sec)?$/, '')),rate,single,before:format(change.before),after:signed?signed[1].replace(/\s/g,'')+'%':format(change.after),note,percent:single&&change.unit==='percent'?null:percent};
}
function elixirStages(update,changes){
 if(update.id!=='f9672f7f-6950-58dc-ab65-0d896a696675'||!changes.every(c=>c.cardName==='Elixir Golem'))return [];
 const find=stat=>changes.find(c=>c.stat===stat);
 const stages=[['Elixir Golem',1,'Hitpoints'],['Elixir Golemites',2,'Elixir Golemite Hitpoints'],['Elixir Blobs',4,null]].map(([name,count,hp],i)=>({name,count,release:find('Blob '+(i+1)+' Elixir Release'),total:find('x'+count),hp:find(hp)}));
 return stages.every(s=>s.release&&s.total)?stages:[];
}
function displayChanges(changes){
 const seen=new Set();return changes.filter(c=>{if(c.unit!=='seconds'||!/^Hit Time\b/.test(c.quote||''))return true;const key=[c.cardFormId,c.before,c.after].join('|');if(seen.has(key))return false;seen.add(key);return true;});
}
function relatedCards(update,change){
 if(update.id==='a669ce0a-8011-536b-b93a-5b3b2700f954'&&change.cardName==='Spear Goblins'&&change.stat==='Attack Range')return ['Spear Goblins','Goblin Hut','Goblin Gang','Goblin Giant'].map(name=>({name,component:name==='Goblin Giant'?'Spawned Spear Goblins · Attack Range':'Spear Goblins · Attack Range'}));
 if(update.id==='09a06b2b-1ba6-5f25-b791-adcd9f00a59c'&&['Minions','Minion Horde'].includes(change.cardName)&&change.stat==='Damage')return [{name:'Minions',component:'Damage'},{name:'Minion Horde',component:'Minion · Damage'}];
 if(update.id==='fd6b2a80-dd1d-5906-9213-1fbe80a72b1c'&&change.cardName==='Rage')return [{name:'Rage',component:change.stat},{name:'Lumberjack',component:'Dropped Rage · '+change.stat}];
 if(update.id==='e7d42138-c3d1-50cb-b666-61e56b35b3fe'&&/First Hit Time/.test(change.stat))return update.changes.filter(c=>/First Hit Time/.test(c.stat)).map(c=>({name:c.cardName,component:'Goblin · First Hit Time'}));
 if(update.id==='f9672f7f-6950-58dc-ab65-0d896a696675'&&change.cardName==='Fire Spirit'&&change.stat==='Damage'&&update.excerpt.includes('toning down\nFurnace'))return [{name:'Fire Spirit',component:'Damage'},{name:'Furnace',component:'Spawned Fire Spirit · Damage'}];
 // Explicit source relationships only: a spawned unit's buff is not its parent's attack.
 if(update.id==='5bd1ac7d-925a-5bd4-9934-a00a1b78d683'&&['Barbarians','Barbarian Barrel'].includes(change.cardName)&&change.stat==='Hit Speed'&&update.excerpt.includes('Barbarians, Battle Ram and Barbarian Hut')&&update.excerpt.includes('will also be getting this buff'))return ['Barbarians','Barbarian Barrel','Battle Ram','Barbarian Hut'].map(name=>({name,component:name==='Barbarians'?'Hit Time':'Spawned Barbarian · Hit Time'}));
 if(update.effectiveDate==='2022-02-03'&&change.cardName==='Musketeer'&&change.stat==='Hit Speed'&&update.excerpt.includes('Three Musketeers are also buffed because of this buff.'))return [{name:'Musketeer',component:'Hit Time'},{name:'Three Musketeers',component:'Musketeer · Hit Time'}];
 return [];
}
function changeCategory(update,change){
 if(update.id==='e6f01b25-e110-5aa4-bb9b-c6b8fa7b1d79'&&change.cardName==='Goblins'&&change.stat==='Deploy Delay Speed')return 'nerf';
 if(update.id==='80fa387d-c2eb-530a-a766-f1fcdb675eda'&&change.cardName==='Mighty Miner')return change.stat==='Hitpoints'?'buff':change.stat==='Movement Speed'?'nerf':'rework';
 if(update.id==='5bd1ac7d-925a-5bd4-9934-a00a1b78d683'&&change.cardName==='Barbarian Barrel'&&change.stat==='Distance'&&update.excerpt.includes('distance nerf'))return 'nerf';
 const category=change.classification||updatePresentation(update).changes?.[change.id]||'unclassified';
 // Some source sections group mixed changes under one heading. Only reverse a
 // heading for a stat whose benefit direction is unambiguous; mass/range and
 // explicitly labeled reworks/fixes retain the source classification.
 if(['buff','nerf','rework'].includes(category)&&Number.isFinite(change.before)&&Number.isFinite(change.after)&&change.before!==change.after){
  if(['damage','hp','healing'].includes(change.unit))return change.after>change.before?'buff':'nerf';
  if(change.unit==='seconds'&&/hit speed|hit frequency|first hit|first attack|deploy time|deploy delay time|cooldown|cast time|cooking time|production speed|spawn rate|spawn pause|spawn time|spawn delay|spawn frequency|spawn interval|elixir generation/i.test(change.stat))return change.after<change.before?'buff':'nerf';
  if(change.unit==='seconds'&&/slowdown duration|freeze duration/i.test(change.stat))return change.after>change.before?'buff':'nerf';
  if(change.unit==='seconds'&&/^life\s*time$/i.test(change.stat))return change.after>change.before?'buff':'nerf';
  if(/^(death spawn|spawns per wave|spawn count(?: per wave)?|total spawned|max count|count)$/i.test(change.stat))return change.after>change.before?'buff':'nerf';
  if(/^cycles?$/i.test(change.stat))return change.after<change.before?'buff':'nerf';
  if(change.unit==='elixir')return /destruction|generation|production|produced/i.test(change.stat)?(change.after>change.before?'buff':'nerf'):(change.after<change.before?'buff':'nerf');
 }
 return category;
}
function cardCategory(update,changes){const kinds=[...new Set(changes.map(c=>changeCategory(update,c)))];return kinds.length===1?kinds[0]:kinds.includes('unclassified')?'unclassified':'rework';}

function damageChanges(update){return update.changes.filter(c=>c.unit==='damage'&&Number.isFinite(c.before)&&Number.isFinite(c.after));}
function compare(change,hp){
 if(change.unit!=='damage'||!Number.isFinite(change.before)||!Number.isFinite(change.after)||hp.kind!=='hp')throw Error('Numeric damage and HP required');
 const result=value=>({damage:value,reaches:value>=hp.value,remaining:Math.max(0,hp.value-value)});
 return {before:result(change.before),after:result(change.after),changed:(change.before>=hp.value)!==(change.after>=hp.value),mechanicCheck:!!(hp.shield||hp.protected),referenceHP:hp.value};
}
function additionalStats(updates,formId,displayedFields={}){
 const groups=new Map();
 for(const update of updates.map(verifiedUpdate))for(const change of update.changes){
  if(!inScope(update)||change.cardFormId!==formId)continue;
  const key=change.comparisonKey||change.stat;
  const identity=JSON.stringify([key,change.levelReference??update.level]);
  if(!groups.has(identity))groups.set(identity,[]);
  groups.get(identity).push({change,update});
 }
 return [...groups.values()].map(history=>{
  history.sort((a,b)=>b.update.effectiveDate.localeCompare(a.update.effectiveDate)||a.change.id.localeCompare(b.change.id));
  const latest=history[0],peers=history.filter(h=>h.update.effectiveDate===latest.update.effectiveDate);
  const conflict=peers.some(h=>h.change.after!==latest.change.after||h.change.unit!==latest.change.unit);
  return {...latest,history,conflict,peers};
 }).filter(fact=>level11Values(fact.update,fact.change)).filter(fact=>fact.conflict||String(displayedFields[fact.change.comparisonKey||fact.change.stat])!==String(fact.change.after)).sort((a,b)=>a.change.stat.localeCompare(b.change.stat));
}
// Level 11 is the only displayed/comparable combat-stat level. Mechanics such
// as range, time, counts and percentages are independent of card level.
function level11Values(update,change){
 if((change.levelReference??update.level)===11)return true;
 if(['seconds','tiles','percent','elixir','multiplier'].includes(change.unit))return true;
 if(/radius|range|duration|time|speed|count|cycles|mass|multiplier|reduction|spawn interval/i.test(change.stat))return true;
 return !(['damage','hp','hitpoints','healing'].includes(change.unit)||/damage|\bHP\b|hitpoints|hit points|health|healing|DPS|\bDMG\b|Crown Tower(?::|$)/i.test(change.stat));
}
function changeKind(change){
 if(!Number.isFinite(change.before)||!Number.isFinite(change.after))return null;
 if(change.unit==='damage')return 'damage';
 if(['hp','hitpoints'].includes(change.unit))return 'hp';
 return null;
}
function referenceForChange(change,rows){
 const kind=changeKind(change),key=change.comparisonKey||change.stat;
 const candidates=rows.filter(r=>r.form.id===change.cardFormId&&r.kind===kind&&!r.aggregate);
 if(change.cardName==='Ice Wizard'&&change.formType==='hero'&&change.stat==='Freeze Damage'){const freeze=candidates.filter(r=>r.panelKind==='ability'&&r.context==='Frosty Fella'&&r.field==='Area Damage');if(freeze.length===1)return freeze[0];}
 const exact=candidates.filter(r=>r.field===key);
 if(exact.length===1)return exact[0];
 if(key==='Damage'){
  const main=candidates.filter(r=>r.panelKind==='main'&&/^(Damage|Ranged Damage|Area Damage|Melee Damage)$/.test(r.field));
  if(main.length===1)return main[0];
 }
 return null;
}
function coreStat(change){
 if(change.unit==='damage'&&/^(Damage|Ranged Damage|Area Damage|Melee Damage)$/.test(change.stat))return 'damage';
 if(['hp','hitpoints'].includes(change.unit)&&change.stat==='Hitpoints')return 'hp';
 return null;
}
function affectedForms(update,change,rows,history=root.HISTORY_DATA?.updates||[update]){
 if(update.id==='cee95369-b297-546b-8735-813c2d076d67'&&change.cardName==='Firecracker'&&/^First Hit/.test(change.stat)){const card=rows.find(r=>r.card.name==='Firecracker')?.card;return card?card.forms.filter(f=>['base','evolution'].includes(f.formType)).map(f=>f.id):[change.cardFormId];}
 const source=referenceForChange(change,rows),forms=[change.cardFormId],kind=coreStat(change);
 if(!kind||source?.panelKind!=='main')return forms;
 for(const c of update.changes)if(c.cardFormId!==change.cardFormId&&source.card.forms?.some(f=>f.id===c.cardFormId)&&coreStat(c)===kind&&c.before===change.before&&c.after===change.after)forms.push(c.cardFormId);
 const siblings=rows.filter(r=>r.card===source.card&&r.kind===kind&&r.panelKind==='main'&&!r.aggregate&&r.observation.displayedLevel===update.level&&r.value===change.after&&(kind==='hp'?r.field==='Hitpoints':/^(Damage|Ranged Damage|Area Damage|Melee Damage)$/.test(r.field)));
 for(const row of siblings){
  if(forms.includes(row.form.id))continue;
  const explicit=update.changes.find(c=>c.cardFormId===row.form.id&&coreStat(c)===kind);
  if(explicit){if(explicit.before===change.before&&explicit.after===change.after)forms.push(row.form.id);continue;}
  // Base core stats are shared only with a matching main-panel value and a form
  // documented by this patch date. Never project later forms or ability damage.
  if(change.formType==='base'&&(!source.historical||(row.historical&&row.beforeValue===change.before&&row.referenceDate===update.effectiveDate))&&history.some(u=>u.effectiveDate<=update.effectiveDate&&u.changes.some(c=>c.cardFormId===row.form.id)))forms.push(row.form.id);
 }
 return forms;
}
function detectCrossings(update,rows){
 update=verifiedUpdate(update);
 return update.changes.filter(c=>changeKind(c)&&(c.levelReference??update.level)===11).map(change=>{
  const kind=changeKind(change),thresholds=[],rankings=[],hitCounts=[];
  const sharedForms=affectedForms(update,change,rows);
  const source=referenceForChange(change,rows),unmapped=!source&&rows.some(r=>r.card);
  let excludedTargets=0;
  for(const row of rows){
   if(row.observation.displayedLevel!==(change.levelReference??update.level))continue;
   if(source&&row.id&&row.id===source.id)continue;
   if(row.form.id===change.cardFormId&&row.field===(change.comparisonKey||change.stat))continue;
   const beforeRelation=Math.sign(change.before-(row.beforeValue??row.value)),afterRelation=Math.sign(change.after-row.value);
   const needsCheck=!!(row.shield||row.protected||row.unverified||/shield/i.test(change.stat));
   if(row.kind===kind){
    if(kind==='damage'&&source&&(!!source.towerDamage!==!!row.towerDamage))continue;
    if(kind==='damage'&&source?.targets==='Buildings'&&row.card?.cardType==='spell'&&row.panelKind==='main'&&['Barbarian Barrel','Royal Delivery'].includes(row.card.name))continue;
    if(sharedForms.includes(row.form.id)&&row.panelKind==='main'&&coreStat(change)&&row.value===change.after)continue;
    if(beforeRelation!==afterRelation)rankings.push({other:row,beforeRelation,afterRelation,needsCheck});
   }else{
    if(unmapped)continue;
    if(source&&root.OneShot?.targetEligibility(kind==='damage'?source:row,kind==='damage'?row:source)){excludedTargets++;continue;}
    if(kind==='damage'&&source&&!source.aggregate&&/^(Damage|Ranged Damage|Area Damage|Melee Damage)$/i.test(source.field)&&change.before>0&&change.after>0&&!row.shield&&!row.protected){const beforeHits=Math.ceil((row.beforeValue??row.value)/change.before),afterHits=Math.ceil(row.value/change.after);if(beforeHits!==afterHits)hitCounts.push({other:row,beforeHits,afterHits,needsCheck:false});}
    // For HP, equality is not survival; for damage, equality reaches HP.
    const before=kind==='damage'?change.before>=(row.beforeValue??row.value):change.before>(row.beforeValue??row.value);
    const after=kind==='damage'?change.after>=row.value:change.after>row.value;
    if(before!==after)thresholds.push({other:row,before,after,needsCheck});
   }
  }
  return {change,kind,thresholds,rankings,hitCounts,excludedTargets,unmapped,affectedFormIds:sharedForms};
 });
}

function timelineGroups(items,mode,allItems=items){
 const seasonKey=item=>{const label=updatePresentation(item).seasonLabel||'',m=label.match(/^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4}) · /);return m?m[2]+'-'+String(['January','February','March','April','May','June','July','August','September','October','November','December'].indexOf(m[1])+1).padStart(2,'0'):item.effectiveDate.slice(0,7);};
 const monthName=key=>new Intl.DateTimeFormat('en-GB',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(key+'-01T00:00:00Z'));
 const seasons=new Map(),bySource=new Map();
 for(const season of root.RELEASE_DATA?.seasons||[])seasons.set(season.start.slice(0,7),monthName(season.start.slice(0,7))+' · Season '+season.id);
 for(const item of allItems){const label=updatePresentation(item).seasonLabel;if(label&&label.includes(' · ')){const key=seasonKey(item);seasons.set(key,label);if(item.presentation?.seasonSource)bySource.set(item.presentation.seasonSource,key);}}
 const result=new Map();
 for(const item of items){let key=mode==='season'?seasonKey(item):item.effectiveDate.slice(0,7);
  if(mode==='season'&&item.eventType){key=item.seasonMonth||bySource.get(item.sourceUrl)||key;
   // This source explicitly announces June content in May; do not place it in May's season.
   if(item.sourceUrl.endsWith('/june-update-2026/'))key='2026-06';
  }
  const label=mode==='season'?(seasons.get(key)||monthName(key)+' · Season unspecified'):monthName(key);
  if(!result.has(key))result.set(key,{key,label,items:[]});result.get(key).items.push(item);
 }
 return [...result.values()].map(group=>({...group,items:[...group.items].sort((a,b)=>a.effectiveDate.localeCompare(b.effectiveDate)||a.id.localeCompare(b.id))})).sort((a,b)=>b.key.localeCompare(a.key));
}


// A dated balance observation can anchor a recorded stat. No current value is a fallback.
function historicalReferences(update,templates,history=root.HISTORY_DATA?.updates||[]){
 if(update.effectiveDateKnown===false)return [];
 const states=new Map();
 const patches=[...history.map(verifiedUpdate),...snapshotPatches(update)].filter(u=>inScope(u)&&u.effectiveDate<=update.effectiveDate).sort((a,b)=>a.effectiveDate.localeCompare(b.effectiveDate)||Number(!!a.referenceSnapshot)-Number(!!b.referenceSnapshot)||a.id.localeCompare(b.id));
 const sameDay=new Map();for(const p of patches.filter(p=>!p.referenceSnapshot))for(const c of p.changes){if(!/damage|hitpoints|health|shield|target|type/i.test(c.stat))continue;const key=p.effectiveDate+'|'+c.cardFormId;if(!sameDay.has(key))sameDay.set(key,new Set());sameDay.get(key).add(p.id);}
 for(const patch of patches){
  // A base-stat edit may also affect its forms. Drop stale sibling anchors unless
  // this same patch explicitly supplies their new values.
  for(const change of patch.changes){if(change.formType!=='base'||!coreStat(change))continue;const base=templates.find(r=>r.form.id===change.cardFormId);if(!base)continue;for(const [id,row] of states)if(row.card===base.card&&row.form.id!==change.cardFormId&&row.panelKind==='main'&&row.kind===coreStat(change))states.delete(id);}
  for(const change of patch.changes){
   const matching=templates.filter(r=>r.form.id===change.cardFormId&&!r.aggregate);
   const source=patch.referenceSnapshot?templates.find(r=>r.id===change.referenceId&&r.form.id===change.cardFormId&&r.field===change.stat):referenceForChange(change,templates),level=change.levelReference??patch.level;
   if((sameDay.get(patch.effectiveDate+'|'+change.cardFormId)?.size||0)>1){for(const row of matching)states.delete(row.id);continue;}
   if(!source||!Number.isFinite(change.after)||level!==11||patch.effectiveDateKnown===false){
    // Unknown-level, uncertain-date or unparsed combat edits invalidate earlier anchors.
    if(/damage|hitpoints|health|shield|target|type/i.test(change.stat))for(const row of matching)states.delete(row.id);
    continue;
   }
   const before=patch.id===update.id?change.before:change.after;
   states.set(source.id,{...source,value:change.after,beforeValue:before,historical:true,referenceDate:patch.effectiveDate,referenceSource:change.referenceSource||patch.sourceUrl,raw:String(change.after)});
  }
 }
 for(const patch of patches.filter(p=>p.effectiveDate===update.effectiveDate&&p.id!==update.id))for(const change of patch.changes){if(/damage|hitpoints|health|shield|target|type/i.test(change.stat))for(const [id,row] of states)if(row.form.id===change.cardFormId)states.delete(id);}
 return [...states.values()];
}

root.HistoryModel={displayChanges,elixirStages,relatedCards,changePresentation,verifiedUpdate,HISTORY_START,inScope,level11Values,historicalReferences,timelineGroups,updatePresentation,changeCategory,cardCategory,damageChanges,compare,additionalStats,changeKind,referenceForChange,affectedForms,detectCrossings};
})(globalThis);
