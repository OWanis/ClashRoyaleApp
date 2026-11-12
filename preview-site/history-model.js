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
const january2024Proofs={"37bfc981-f8bb-53e1-adc5-78d1fd93c075": [1800, 1600, "hp", "Little Prince release guide: Guardienne HP1800 compared to Knight1766 at tournament Level11."], "09195839-dd66-535d-a97b-ca5696e6e5b1": [110, 100, "damage", "Little Prince release guide explicitly states110 damage at tournament standard Level11."], "97f250e7-e06f-58e7-8c47-5dc6e578a95c": [3424, 3616, "hp", "Pinned March2023 game table GiantSkeleton HP2140 \u00d7160% Level11 =3424."], "358c07bc-e8b0-5951-9298-5fab2a9faed1": [240, 256, "hp", "Pinned March2023 SkeletonWarrior ShieldHitpoints150 \u00d7160% Level11 =240."], "a82962ba-4546-5168-a966-393243bffc28": [222, 230, "damage", "Pinned March2023 BombSkeletonProjectile Damage87 \u00d7256% Level11, floored =222."], "e5290bbd-5f0c-5f0f-af5a-5fe6d5353b58": [310, 335, "damage", "Pinned March2023 GoldenKnight DashDamage310 at Champion tournament Level11."]};
const MAY_2024='211ab4b0-d0a4-5137-bc00-c9338c13af44';
const may2024Proofs={"Archers|Power Shot Damage": [184, 215, "damage", "December2023 Level11 Power Shot is184. May restores the original2x multiplier; November2023 Level11 release screenshot shows215 at2x (not rounded184 \u00d71.18)."], "Royal Giant|Hitpoints": [3072, 3164, "hp", "Pinned March2023 RoyalGiant HP1200 \u00d7256% =3072 at Level11."], "Royal Recruits|Hitpoints": [532, 547, "hp", "Pinned March2023 Recruit HP208 \u00d7256%, floored =532 at Level11."], "Valkyrie|Tornado Damage": [76, 84, "damage", "RoyaleAPI January2024 release image evo-valkyrie-info-01.jpg explicitly labels Level11 with Tornado Damage76."], "Wall Breakers|Runner Damage": [392, 196, "damage", "May final graphic uses Level11 baselines: RoyalGiant3072, Valkyrie tornado76, Duchess3204 and Cannoneer422 independently match dated Level11 evidence. Runner damage392\u2192196 is retained from that same final graphic and official patch, not the earlier release-preview runner195."], "Cannoneer|Damage": [422, 401, "damage", "RoyaleAPI release comparison places422 damage alongside TowerPrincess109 damage/3052HP, matching Level11; April Duchess comparison repeats these values beside the explicitly Level11 Duchess3204."], "Dagger Duchess|Hitpoints": [3204, 2768, "hp", "RoyaleAPI April release screenshot s58-dagger-duchess-01-300-5.jpg explicitly shows Level11 and3204HP."], "Poison|Crown Tower Damage per Second": [28, 23, "dps", "May final graphic uses the corroborated Level11 baselines and reports224\u2192184 total Crown Tower Damage; over8seconds this is28\u219223 per second, matching Supercell."]};
const JUNE_2024='7129a7d2-245e-56be-9aa9-5ee31c85845c';
const JUNE_EMERGENCY='a079f0e9-7a18-5319-83c5-bb8df3638d0c';
const june2024Rows={"Giant|Range": [1.6, 1.2, "tiles", "Range", "-25%"], "Little Prince|Ability Damage": [399, 207, "damage", "Ability Damage", "-48%"], "Little Prince|Ability Knockback": [2.5, 2, "tiles", "Ability Knockback", "-20%"], "Little Prince|Guardian First Hit Speed": [0.2, 0.5, "seconds", "Guardian First Hit Time", "+150%"], "Knight|Bonus HP": [1.1, 1, "multiplier", "Hitpoint Multiplier", "-9%"], "Tesla|Electro Pulse Damage": [192, 148, "damage", "Electro Pulse Damage", "-23%"], "Tesla|Electro Pulse Stun Duration": [1, 0.5, "seconds", "Electro Pulse Stun Duration", "-50%"], "Ram Rider|Charge Range": [3, 1.5, "tiles", "Charge Distance", "-50%"], "Prince|Charge Range": [3, 1.5, "tiles", "Charge Distance", "-50%"], "Spear Goblins|First Hit Speed": [0.5, 0.3, "seconds", "First Hit Time", "-40%"], "Dart Goblin|Damage": [131, 142, "damage", "Damage", "+8%"], "Goblin Cage|Cage Hitpoints": [742, 780, "hp", "Cage Hitpoints", "+5%"], "Void|First Hit Delay": [0.4, 1, "seconds", "First Hit Time", "+150%"], "Void|Hit Frequency": [0.667, 0.769, "hits per second", "Hit Speed", "+15%"], "Dagger Duchess|Damage": [153, 112, "damage", "Damage", "-27%"], "Dagger Duchess|Dagger Reload": [0.606, 0.8, "hits per second", "Hit Speed", "+32%"]};
const JULY_2024='4757c11d-4897-589d-983d-9159578fb3c2';
const JULY_SOURCE='https://royaleapi.com/blog/season-61-balance-2024-july';
// Each final-table quote is scoped to its stat, preserving its own percentage.
const july2024Rows={
 "Goblin Curse|Radius":{"expected": [4, 3, "tiles"], "stat": "Radius", "before": 4, "after": 3, "unit": "tiles", "quote": "Radius\n-25%\n4.00 Tiles\n3.00 Tiles"},
 "Goblin Curse|Damage Amplification":{"expected": [35, 20, "percent"], "stat": "Damage Amplification", "before": 35, "after": 20, "unit": "percent", "quote": "Damage Multiplier\n-43%\n35\n20"},
 "Goblin Demolisher|Death Damage":{"expected": [465, 404, "damage"], "stat": "Death Damage", "before": 465, "after": 404, "unit": "damage", "quote": "Death Damage\n-13%\n465 Hit Points\n404 Hit Points"},
 "Goblin Demolisher|Death Damage Radius":{"expected": [3, 2.5, "tiles"], "stat": "Death Damage Radius", "before": 3, "after": 2.5, "unit": "tiles", "quote": "Death Damage Radius\n-17%\n3.00 Tiles\n2.50 Tiles"},
 "Goblin Demolisher|Hit Speed":{"expected": [1.1, 1.2, "seconds"], "stat": "Hit Time", "before": 1.1, "after": 1.2, "unit": "seconds", "quote": "Hit Speed\n-8%\n0.909 Hits / Second\n0.833 Hits / Second", "percent": "+9%", "rate": {"label": "Hit Speed", "before": "0.909", "after": "0.833", "percent": "-8%", "unit": "hits/sec"}},
 "Goblin Machine|Hitpoints":{"expected": [2598, 2196, "hp"], "stat": "Hitpoints", "before": 2598, "after": 2196, "unit": "hp", "quote": "HP\n-15%\n2,598 Hit Points\n2,196 Hit Points"},
 "Goblin Machine|First Hit Speed":{"expected": [0.2, 0.5, "seconds"], "stat": "First Hit Time", "before": 0.2, "after": 0.5, "unit": "seconds", "quote": "First Hit Time\n+150%\n0.200 Seconds\n0.500 Seconds"},
 "Prince|Charge Range":{"expected": [150, 200, "source units"], "stat": "Charge Distance", "before": 1.5, "after": 2, "unit": "tiles", "quote": "Charge Distance\n+33%\n1.50 Tiles\n2.00 Tiles"},
 "Ram Rider|Charge Range":{"expected": [150, 200, "source units"], "stat": "Charge Distance", "before": 1.5, "after": 2, "unit": "tiles", "quote": "Charge Distance\n+33%\n1.50 Tiles\n2.00 Tiles"},
 "Tesla|Damage":{"expected": [230, 220, "damage"], "stat": "Damage", "before": 230, "after": 220, "unit": "damage", "quote": "Damage\n-4%\n230 Hit Points\n220 Hit Points"},
 "Tesla|Hit Speed":{"expected": [1.1, 1.2, "seconds"], "stat": "Hit Time", "before": 1.1, "after": 1.2, "unit": "seconds", "quote": "Hit Speed\n-8%\n0.909 Hits / Second\n0.833 Hits / Second", "percent": "+9%", "rate": {"label": "Hit Speed", "before": "0.909", "after": "0.833", "percent": "-8%", "unit": "hits/sec"}},
 "Wizard|Shield Hitpoints":{"expected": [371, 296, "hp"], "stat": "Shield Hitpoints", "before": 371, "after": 296, "unit": "hp", "quote": "Shield HP\n-20%\n371 Hit Points\n296 Hit Points"},
 "Dagger Duchess|Dagger Charge":{"expected": [0.8, 0.9, "seconds"], "stat": "Depleted Hit Speed", "before": 0.8, "after": 0.741, "unit": "hits per second", "quote": "Depleted Hit Speed\n-7%\n0.800 Hits / Second\n0.741 Hits / Second"},
 "Dagger Duchess|Hit Speed":{"expected": [0.35, 0.45, "seconds"], "stat": "Burst Hit Speed", "before": 2.86, "after": 2.22, "unit": "hits per second", "quote": "Burst Hit Speed\n-22%\n2.86 Hits / Second\n2.22 Hits / Second"}
};
const july2024Proofs={
 "Goblin Demolisher|Death Damage": {
  "sourceUrl": "https://royaleapi.com/blog/goblin-demolisher-new-card-2024-summer-update",
  "method": "Release guide explicitly labels tournament standard (level 11), Death Damage 465 HP. July final table matches 465 and supplies 404."
 },
 "Goblin Machine|Hitpoints": {
  "sourceUrl": "https://royaleapi.com/blog/goblin-machine-new-card-2024-summer-update",
  "method": "Release guide explicitly labels tournament standard (level 11), Health 2598 HP. July final table matches 2598 and supplies 2196."
 },
 "Wizard|Shield Hitpoints": {
  "sourceUrl": "https://royaleapi.com/blog/wizard-evolution-2024-may",
  "method": "Release guide explicitly says: At level 11, the shield has 371 HP. July final table matches 371 and supplies 296."
 },
 "Tesla|Damage": {
  "sourceUrl": "https://github.com/smlbiobot/cr-csv/tree/899e45efc765fbf3902927bb2e37dc04a78f7823/assets/csv_logic",
  "method": "Pinned buildings.csv Tesla Damage 90, Common Level 11 multiplier 256%, floor(90 × 256 / 100) = 230. July final table matches 230 and supplies 220."
 }
};
function july2024Change(c){
 const key=c.cardName+'|'+c.stat,row=july2024Rows[key];
 if(!row||c.before!==row.expected[0]||c.after!==row.expected[1]||c.unit!==row.expected[2])return c;
 const proof=july2024Proofs[key];
 return {...c,stat:row.stat,before:row.before,after:row.after,unit:row.unit,quote:row.quote,originalQuote:c.originalQuote||c.quote,sourceUrl:JULY_SOURCE,
  sourceCorrection:{sourceUrl:JULY_SOURCE,method:'Reviewed final Season 61 table; each quote contains only its matching stat. Official seconds and RoyaleAPI rates remain separate. Duchess depleted rate follows RoyaleAPI; the conflicting official 0.8→0.9 seconds remains in originalQuote.'},
  ...(row.percent?{presentationPercent:row.percent,presentationRate:row.rate}:{}),
  ...(proof?{levelReference:11,levelVerification:{level:11,...proof,balanceSourceUrl:JULY_SOURCE}}:{})};
}
const AUGUST_2024='78af2798-c05b-55cc-af53-c29b9d0bb2bf';
const AUGUST_SOURCE='https://royaleapi.com/blog/season-62-balance';
// Final-table rows, with the official intervals retained beside source hit rates.
const august2024Rows={
 "Arrows|Crown Tower Damage":{"expected": [111, 93, "damage"], "stat": "Crown Tower Damage", "before": 111, "after": 93, "unit": "damage", "quote": "Tower Damage\n-16%\n111 Hit Points\n93 Hit Points"},
 "Goblin Drill|Second Submerge Goblin Spawn":{"expected": ["Extra Goblin", "Extra Goblin removed", "mechanic"], "stat": "Second Submerge Goblin Spawn", "before": 2, "after": 1, "unit": "count", "quote": "Spawned Units from Second Spawn\n-50%\n2\n1"},
 "Wizard|Hitpoints":{"expected": [720, 754, "hp"], "stat": "Hitpoints", "before": 720, "after": 754, "unit": "hp", "quote": "HP\n+5%\n720 Hit Points\n754 Hit Points"},
 "Wizard|Shield Hitpoints":{"expected": [296, 190, "hp"], "stat": "Shield Hitpoints", "before": 296, "after": 190, "unit": "hp", "quote": "Shield HP\n-36%\n296 Hit Points\n190 Hit Points"},
 "Cannon Cart|Shielded Cannon Hit Speed":{"expected": [1, 0.9, "seconds"], "stat": "Shielded Cannon Hit Time", "before": 1, "after": 0.9, "unit": "seconds", "quote": "Hit Speed\n+11%\n1.00 Hits / Second\n1.11 Hits / Second", "percent": "-10%", "rate": {"label": "Shielded Cannon Hit Speed", "before": "1.00", "after": "1.11", "percent": "+11%", "unit": "hits/sec"}},
 "Electro Wizard|Deploy Damage Radius":{"expected": [2.5, 3, "tiles"], "stat": "Deploy Damage Radius", "before": 2.5, "after": 3, "unit": "tiles", "quote": "Spawn Radius\n+20%\n2.50 Tiles\n3.00 Tiles"},
 "Goblin Machine|Rocket Hit Speed":{"expected": [4, 3.5, "seconds"], "stat": "Rocket Hit Time", "before": 4, "after": 3.5, "unit": "seconds", "quote": "Rocket Hit Speed\n+14%\n0.250 Hits / Second\n0.286 Hits / Second", "percent": "-13%", "rate": {"label": "Rocket Hit Speed", "before": "0.250", "after": "0.286", "percent": "+14%", "unit": "hits/sec"}},
 "Hunter|Hitpoints":{"expected": [838, 884, "hp"], "stat": "Hitpoints", "before": 838, "after": 884, "unit": "hp", "quote": "HP\n+5%\n838 Hit Points\n884 Hit Points"},
 "Ice Wizard|Attack Splash Radius":{"expected": [1, 1.5, "tiles"], "stat": "Attack Splash Radius", "before": 1, "after": 1.5, "unit": "tiles", "quote": "Splash Radius\n+50%\n1.00 Tiles\n1.50 Tiles"},
 "Void|1 Target Damage":{"expected": [544, 472, "damage"], "stat": "1 Target Damage", "before": 544, "after": 472, "unit": "damage", "quote": "Damage\n-13%\n544 Hit Points\n472 Hit Points"},
 "Void|5+ Target Damage":{"expected": [48, 76, "damage"], "stat": "5+ Target Damage", "before": 48, "after": 76, "unit": "damage", "quote": "Damage\n+58%\n48 Hit Points\n76 Hit Points"},
 "Skeleton Dragons|Hitpoints":{"expected": [563, 560, "hp"], "stat": "Hitpoints", "before": 563, "after": 560, "unit": "hp", "quote": "HP\n-1%\n563 Hit Points\n560 Hit Points", "classification": "fix", "note": "Interaction consistency fix: a same-level Wizard now defeats a Skeleton Dragon in two hits at both Level 11 and Level 15."}
};
const august2024Proofs={
 "Arrows|Crown Tower Damage": {
  "sourceUrl": "https://royaleapi.com/blog/void-2024-may",
  "method": "Void release explicitly labels the following tables Level 11. Its spell comparison shows Arrows 366 troop damage and 111 tower damage; August matches 111 and supplies 93."
 },
 "Wizard|Hitpoints": {
  "sourceUrl": "https://github.com/smlbiobot/cr-csv/tree/a3bb7efaf985dea26777d0110592f053d3fd5e5d/assets/csv_logic",
  "method": "Pinned dated Level 11 verification: Wizard raw340 HP ×212%, floored =720. August final report gives720→754 for both Base and Evolution."
 },
 "Wizard|Shield Hitpoints": {
  "sourceUrl": "https://royaleapi.com/blog/wizard-evolution-2024-may",
  "referenceSources": [
   "https://royaleapi.com/blog/season-61-balance-2024-july"
  ],
  "method": "May release explicitly gives371 Level11 shield HP; reviewed July report changes371→296. August matches296 and supplies190."
 },
 "Hunter|Hitpoints": {
  "sourceUrl": "https://github.com/smlbiobot/cr-csv/tree/a3bb7efaf985dea26777d0110592f053d3fd5e5d/assets/csv_logic",
  "method": "Pinned dated Level 11 verification: Hunter raw524 HP ×160%, floored =838. August matches838 and supplies884. Final RoyaleAPI +5% annotation retained; official +6% differs."
 },
 "Void|1 Target Damage": {
  "sourceUrl": "https://royaleapi.com/blog/void-2024-may",
  "method": "Release table explicitly labels Level11 damage per beam544 for1target. August matches544 and supplies472."
 },
 "Void|5+ Target Damage": {
  "sourceUrl": "https://royaleapi.com/blog/void-2024-may",
  "method": "Release table explicitly labels Level11 damage per beam48 for5+targets. August matches48 and supplies76."
 },
 "Skeleton Dragons|Hitpoints": {
  "sourceUrl": "https://royaleapi.com/blog/season-62-balance",
  "method": "Final report explicitly explains Level11 Wizard requiring3hits before versus2hits atLevel15, and2hits at both levels after. Its paired HP table gives563→560 at that Level11 normalization; original official note also identifiesLevel11."
 }
};
function august2024Change(c){
 const key=c.cardName+'|'+c.stat,row=august2024Rows[key];
 if(!row||c.before!==row.expected[0]||c.after!==row.expected[1]||c.unit!==row.expected[2])return c;
 const proof=august2024Proofs[key];
 return {...c,stat:row.stat,before:row.before,after:row.after,unit:row.unit,quote:row.quote,originalQuote:c.originalQuote||c.quote,sourceUrl:AUGUST_SOURCE,
  sourceCorrection:{sourceUrl:AUGUST_SOURCE,method:'Reviewed final Season62 table; each quote is scoped to its component. Official hit intervals remain separate from RoyaleAPI frequencies. Hunter follows final RoyaleAPI +5%, retaining the conflicting official +6% in originalQuote.'},
  ...(row.percent?{presentationPercent:row.percent,presentationRate:row.rate}:{}),
  ...(row.classification?{classification:row.classification,presentationNote:row.note}:{}),
  ...(c.cardName==='Arrows'?{damageScope:'cast',presentationNote:'Total Crown Tower damage across all 3 waves.'}:{}),
  ...(c.cardName==='Void'?{comparisonKey:c.stat==='1 Target Damage'?'Damage: 1 Target':'Damage: 5+ Targets'}:{}),
  ...(proof?{levelReference:11,levelVerification:{level:11,...proof,balanceSourceUrl:AUGUST_SOURCE}}:{})};
}
const OCTOBER_2024='58e1bbd3-0480-5d1c-991d-664bf2fffdc1';
const OCTOBER_EMERGENCY='51019399-2753-5352-815d-5d5e6330c47c';
const OCTOBER_SOURCE='https://royaleapi.com/blog/season-64-balance';
// Retained final-table rows, matched to exact original IDs, values, units and forms.
const october2024Rows={
 "0183f6a3-e148-5e56-b8e4-00cd2a99d3b9":{"expected": [230, 225, "damage", "e7782a33-14ff-4f94-9795-274a435f0671"], "stat": "Damage", "before": 230, "after": 225, "unit": "damage", "quote": "Damage\n-2%\n230 Hit Points\n225 Hit Points", "classification": "nerf", "proof": {"sourceUrl": "https://royaleapi.com/blog/goblin-demolisher-new-card-2024-summer-update", "method": "Demolisher guide explicitly labels tournament standard Level11 and its comparison table gives Bomber230. Final October table gives230→225; official source explicitly applies this to Base and Evolution."}},
 "d3e51df0-9b13-5d55-be79-657aff2ba3b4":{"expected": [230, 225, "damage", "6fac9b7b-a20f-4073-be86-63a34850a754"], "stat": "Damage", "before": 230, "after": 225, "unit": "damage", "quote": "Damage\n-2%\n230 Hit Points\n225 Hit Points", "classification": "nerf", "proof": {"sourceUrl": "https://royaleapi.com/blog/goblin-demolisher-new-card-2024-summer-update", "method": "Demolisher guide explicitly labels tournament standard Level11 and its comparison table gives Bomber230. Final October table gives230→225; official source explicitly applies this to Base and Evolution."}},
 "97f85c94-388f-52b0-95ea-158762f02136":{"expected": [10, 7, "seconds", "5ee609e9-d125-4b83-aa6c-253af95d35db"], "stat": "Lifetime after 50% HP", "before": 10, "after": 7, "unit": "seconds", "quote": "Duration\n-30%\n10 Seconds\n7 Seconds", "classification": "nerf"},
 "05f99958-63a5-5c80-b677-fb041d0eb666":{"expected": [472, 320, "damage", "aa24fdb4-6edc-4e2c-87fe-8d2231b6a190"], "stat": "1 Target Damage", "before": 472, "after": 320, "unit": "damage", "quote": "Damage\n-32%\n472 Hit Points\n320 Hit Points", "classification": "nerf", "proof": {"sourceUrl": "https://royaleapi.com/blog/season-62-balance", "referenceSources": ["https://royaleapi.com/blog/void-2024-may"], "method": "Void release explicitly gives544 damage per beam atLevel11; reviewed August patch changes544→472. October matches472 and supplies320 for1target."}, "comparisonKey": "Damage: 1 Target"},
 "33f16cce-fe71-55c1-aab0-1b27b3b9ddf6":{"expected": [0, 1, "seconds", "e048093b-9507-43df-8eb0-31c8d03ed99c"], "stat": "First Hit Time", "before": 0, "after": 1, "unit": "seconds", "quote": "First Hit Time\n0.00 Seconds\n1.00 Seconds", "classification": "nerf", "note": "First-hit delay added after deployment."},
 "787b1fe4-dff5-5ced-b5af-aa98409e0461":{"expected": [471, 376, "healing", "6b21613d-1e17-432c-a80e-111fc89a06be"], "stat": "Heal per Kill", "before": 471, "after": 376, "unit": "healing", "quote": "Heal per Kill\n-20%\n471 Hit Points\n376 Hit Points", "classification": "nerf", "proof": {"sourceUrl": "https://royaleapi.com/blog/pekka-evolution-new-card-2024-september", "imageUrl": "https://cdns3.royaleapi.com/static/img/blog/2024-09-season-63/cards/evo-pekka/v3-0868dc4f/evo-pekka-300-2.jpg", "imageSha256": "db31f5ff352c562caf0a1b24ec20eaaea34df7a964475ee7d5b42f245fa9209c", "method": "Release comparison graphic labels BaseLevel11 and both forms3760HP; Evolution heal376 matches October after-value. Final official/RoyaleAPI reports give471→376. Release prose gives470 from12.5% of3760; that1HP before-value conflict is retained rather than silently changing the final report."}},
 "1291639b-7025-59e8-a0bd-93ae1783a4cf":{"expected": [1200, 1100, "source units", "a80f32dd-b0d7-4cbc-b896-dcc036f5927d"], "stat": "Hit Time", "before": 1.2, "after": 1.1, "unit": "seconds", "quote": "Hit Speed\n+9%\n0.83 Hits / Second\n0.91 Hits / Second", "classification": "buff", "percent": "-8%", "rate": {"label": "Hit Speed", "before": "0.83", "after": "0.91", "percent": "+9%", "unit": "hits/sec"}},
 "00fa527f-b04c-5ced-ba67-4e85440e168f":{"expected": ["Present", "Removed", "mechanic", "91535bf7-a480-4465-b766-d724131d061e"], "stat": "Death Shockwave", "before": "Present", "after": "Removed", "unit": "mechanic", "quote": "Remember when Supercell experimented with giving Evolved Tesla an extra shockwave? Yeah, that was overkill. They’ll be taking away its bonus shock but giving regular Tesla a bit of love to compensate. Balanced, as all things should be.", "classification": "nerf"},
 "954f41d2-1e65-59ce-8afc-6bf50eab8457":{"expected": [4, 3, "tiles", "512ac4bf-3a99-4da0-9a15-cd108dbd4823"], "stat": "Shield Knockback", "before": 4, "after": 3, "unit": "tiles", "quote": "Pushback\n-25%\n4 Tiles\n3 Tiles", "classification": "nerf"},
 "902eda2e-5d24-5679-86b9-72367550fd1a":{"expected": [600, 800, "source units", "8a8368b0-dc37-446b-b21b-54aa21f634cc"], "stat": "First Hit Time", "before": 0.6, "after": 0.8, "unit": "seconds", "quote": "First Hit Time\n+33%\n0.60 Seconds\n0.80 Seconds", "classification": "nerf"},
 "0c18a146-f721-54ee-9db2-5c2f744ca484":{"expected": [401, 386, "damage", "8a8368b0-dc37-446b-b21b-54aa21f634cc"], "stat": "Damage", "before": 401, "after": 386, "unit": "damage", "quote": "Damage\n-4% (New)\n401.00 Hit Points\n386.00 Hit Points", "classification": "nerf", "proof": {"sourceUrl": "https://royaleapi.com/blog/season-59-balance", "method": "Reviewed Level11 May delta422→401 establishes401; October matches401 and supplies386."}},
 "dbca834f-01dc-5752-bb83-51a7bfc14f36":{"expected": [25, 30, "dps", "b9d4875c-0327-4420-9b2b-d9962d6d7b8d"], "stat": "Damage per Second", "before": 25, "after": 30, "unit": "dps", "quote": "DPS\n+20%\n25 Hit Points / Second\n30 Hit Points / Second", "classification": "buff", "proof": {"sourceUrl": "https://royaleapi.com/blog/goblin-curse-new-card-2024-summer-update", "method": "Release guide explicitly labels tournament standard Level11 and25HP/sec. October matches25 and supplies30HP/sec."}},
 "450900b6-f5e4-56c7-b5ea-7c78cdb06d4d":{"expected": [2196, 2304, "hp", "2739c399-6b48-4d17-b20b-4fa70f12d0bd"], "stat": "Hitpoints", "before": 2196, "after": 2304, "unit": "hp", "quote": "HP\n+5%\n2,196 Hit Points\n2,304 Hit Points", "classification": "buff", "proof": {"sourceUrl": "https://royaleapi.com/blog/season-61-balance-2024-july", "referenceSources": ["https://royaleapi.com/blog/goblin-machine-new-card-2024-summer-update"], "method": "Release explicitly gives2598HP atLevel11; reviewed July patch gives2598→2196. October matches2196 and supplies2304."}},
 "9635393f-e4f7-5a52-8f28-674da42f67b7":{"expected": [133, 145, "damage", "0faf3d62-fe14-4c22-990a-e90e9ca8200b"], "stat": "Death Damage", "before": 133, "after": 145, "unit": "damage", "quote": "Death Damage\n+9%\n133 Hit Points\n145 Hit Points", "classification": "buff", "proof": {"sourceUrl": "https://github.com/smlbiobot/cr-csv/tree/899e45efc765fbf3902927bb2e37dc04a78f7823/assets/csv_logic", "method": "Pinned characters.csv SkeletonBalloon spawns SkeletonContainer; buildings.csv SkeletonContainer DeathDamage52 atCommonLevel11 multiplier256%, floored=133. October matches133 and supplies145."}},
 "a9ba50ac-606f-5419-8ad2-20eb02f5a65a":{"expected": [45, 60, "source units", "1ef7e9dc-9273-400f-b70f-6f0f149f3b8a"], "stat": "Bush Speed", "before": 45, "after": 60, "unit": "source units", "quote": "Speed\n+33%\n45\n60", "classification": "buff"},
 "89655aa3-0d4b-56fc-a806-615f83b35af9":{"expected": [306, 337, "dps", "54c2454d-7c6f-4310-b152-ef268d26ac19"], "stat": "Capture Damage per Second", "before": 306, "after": 337, "unit": "dps", "quote": "Hit Speed\n+10%\n0.91 Hits / Second\n1.00 Hits / Second", "classification": "buff", "proof": {"sourceUrl": "https://github.com/smlbiobot/cr-csv/tree/899e45efc765fbf3902927bb2e37dc04a78f7823/assets/csv_logic", "referenceSources": ["https://royaleapi.com/blog/goblin-cage-evolution-new-card-2024-august"], "method": "Pinned GoblinBrawler Damage159 ×212%RareLevel11, floored=337. Evolution guide says capture damage equals Brawler337 and hit interval1.1s, DPS306. October changes capture interval to1s, giving337DPS; no Brawler damage buff is invented."}, "rate": {"label": "Capture Hit Speed", "before": "0.91", "after": "1.00", "percent": "+10%", "unit": "hits/sec"}, "note": "Capture damage ticks every 1.1 s before, every 1 s after. Goblin Brawler damage is unchanged."},
 "60579bae-aa5c-5393-a2bd-c804dfdee34c":{"expected": ["Present", "Removed", "mechanic", "b202e79e-ce93-42e6-a592-ca3fa9f2bfa3"], "stat": "Second and Third Emergence Damage and Knockback", "before": "Present", "after": "Removed", "unit": "mechanic", "quote": "Damage and knockback of 2nd and 3rd spawns\n-\nRemoved", "classification": "nerf"},
 "32479e32-e2df-5679-ac0e-665ee7963085":{"expected": ["No added delay", "Deploy time added", "mechanic", "b202e79e-ce93-42e6-a592-ca3fa9f2bfa3"], "stat": "Submerge Goblin Deploy Time", "before": "No added delay", "after": "Deploy time added", "unit": "mechanic", "quote": "Deploy time for Goblins spawned after submerge\nAdded\n-\nNew", "classification": "nerf"},
 "cce4371d-6d45-5890-a8d6-f5d56067be0d":{"expected": ["Previous spawn", "Extra Goblin added", "mechanic", "b202e79e-ce93-42e6-a592-ca3fa9f2bfa3"], "stat": "Second Submerge Goblin Spawn", "before": null, "after": "+1 Goblin", "unit": "mechanic", "quote": "2nd Submerge Goblin\n+1\n\n", "classification": "buff", "note": "Adds one Goblin on the second submerge."},
 "9fccab29-3caf-5acf-8e95-bae758aabecf":{"expected": ["Present", "Removed", "mechanic", "d0c8a22d-63e6-41ad-b8cc-77b6581d45fd"], "stat": "Third Strike", "before": "Present", "after": "Removed", "unit": "mechanic", "quote": "3rd Strike\nRemoved\n\n", "classification": "nerf", "note": "Three strikes reduced to two."},
 "6d2cfbd2-1617-54c5-bc09-aeaa7a6e2c09":{"expected": ["Half damage", "Full damage", "mechanic", "d0c8a22d-63e6-41ad-b8cc-77b6581d45fd"], "stat": "Second Strike Damage", "before": 94, "after": 192, "unit": "damage", "quote": "2nd Strike Damage\n+104%\n94.00 Hit Points\n192.00 Hit Points", "classification": "buff", "proof": {"sourceUrl": "https://royaleapi.com/blog/zap-evolution-2024-march", "imageUrl": "https://cdns3.royaleapi.com/static/img/blog/2024-03-season57/evo-zap/v1-ac08a313/s57-evo-zap-01-300-2.jpg", "imageSha256": "3168dcdb0e7bf87b63689878bbc7e2f61c52dcb9dfb86face40aed6e974641a2", "method": "Release comparison screenshot labelsLevel11/ShowingChallengeLevels with192damage; October final table restores second strike to192 from reported94. Do not replace94 with96 by multiplying a rounded half-damage description."}},
 "5846a81d-44ce-5be9-b52b-8074204c1f22":{"expected": [532, 531, "hp", "a4b29633-f423-4986-9374-cb5d085f5aa2"], "stat": "Hitpoints", "before": 532, "after": 531, "unit": "hp", "quote": "HP\n0%\n532 Hit Points\n531 Hit Points", "classification": "fix", "proof": {"sourceUrl": "https://github.com/smlbiobot/cr-csv/tree/899e45efc765fbf3902927bb2e37dc04a78f7823/assets/csv_logic", "method": "Pinned EliteArcher HP440 ×121%LegendaryLevel11, floored=532. Final October bug-fix table gives532→531."}, "note": "−1 HP interaction consistency fix. The source table rounds this change to 0%."},
 "4987b12c-37ae-58c0-9c9c-6d9f86c8b20e":{"expected": ["Previous HP", "-1 HP (absolute values unspecified)", "relative", "9732be35-ad6b-4027-9852-57c823b1bb7c"], "stat": "Hitpoints", "before": 532, "after": 531, "unit": "hp", "quote": "HP\n0%\n532 Hit Points\n531 Hit Points", "classification": "fix", "proof": {"sourceUrl": "https://github.com/smlbiobot/cr-csv/tree/a3bb7efaf985dea26777d0110592f053d3fd5e5d/assets/csv_logic", "method": "Existing dated verification independently gives WitchMother HP440 ×121%LegendaryLevel11, floored=532. Final October bug-fix table supplies532→531, resolving the relative-only import."}, "note": "−1 HP interaction consistency fix. The source table rounds this change to 0%."}
};
function october2024Change(c){
 const row=october2024Rows[c.id];
 if(!row||c.before!==row.expected[0]||c.after!==row.expected[1]||c.unit!==row.expected[2]||c.cardFormId!==row.expected[3]||c.sourceCorrection?.audit==='season64')return c;
 return {...c,stat:row.stat,before:row.before,after:row.after,unit:row.unit,classification:row.classification,quote:row.quote,originalQuote:c.originalQuote||c.quote,sourceUrl:OCTOBER_SOURCE,
  sourceCorrection:{sourceUrl:OCTOBER_SOURCE,audit:'season64',method:'Final Season64 row/prose; component-specific percentages, explicit time/rate units and independent rework directions. Raw import retained.'},
  ...(row.comparisonKey?{comparisonKey:row.comparisonKey}:{}),
  ...(row.percent?{presentationPercent:row.percent}:{}),...(row.rate?{presentationRate:row.rate}:{}),...(row.note?{presentationNote:row.note}:{}),
  ...(row.proof?{levelReference:11,levelVerification:{level:11,...row.proof,balanceSourceUrl:OCTOBER_SOURCE}}:{})};
}
function juneSupplement(update){
 const sourceUrl='https://royaleapi.com/blog/'+(update.id===JUNE_2024?'season-60-balance':'season-60-balance-emergency');
 if(update.id===JUNE_2024)return {id:'s60-duchess-daggers-stored',cardFormId:'43d1f371-db25-44c3-b064-3fc0a3613133',cardName:'Dagger Duchess',formType:'base',stat:'Daggers Stored',before:8,after:6,unit:'count',classification:'nerf',quote:'Daggers Stored -25%\n8\n6',sourceUrl};
 if(update.id===JUNE_EMERGENCY)return {id:'s60-battle-healer-passive-heal',cardFormId:'9be024ae-a8ea-461c-8c1d-1dd33caf2474',cardName:'Battle Healer',formType:'base',stat:'Passive Healing',before:33,after:0,unit:'healing per second',levelReference:11,classification:'nerf',quote:'Passive Heal -100%\n33 Hit Points / second\n0 Hit Points / second',sourceUrl,effectiveDateKnown:false,announcementNote:'Already applied; reported on 19 June 2024.',levelVerification:{level:11,sourceUrl,method:'Emergency report uses the same tournament-standard normalization as its explicitly Level11 Goblin Machine588 baseline. Healer effective date is unspecified.'}};
 return null;
}
function verifiedUpdate(update){
 if(update.id===OCTOBER_2024)update={...update,effectiveDateKnown:true,effectiveDateBasis:'RoyaleAPI final report: These will go live on 2024-10-08 Tuesday, around 8-9am UTC.',dateVerification:{sourceUrl:OCTOBER_SOURCE},changes:update.changes.map(october2024Change)};
 if(update.id===OCTOBER_EMERGENCY)update={...update,changes:update.changes.map(c=>{
  if(c.cardName==='Electro Dragon')return {...c,classification:'fix'};
  const expected={'f7ec3eae-d154-5eb3-9144-238d6f082860':[5,4,'seconds'],'451fd408-3711-5a1a-a590-5cc17052b76b':[71,46,'damage'],'9263aa56-748b-5e7b-92e2-85257464fe58':[15,17,'seconds']}[c.id];
  if(!expected||c.before!==expected[0]||c.after!==expected[1]||c.unit!==expected[2])return c;
  const line=c.quote?.split('\n').find(line=>line.toLowerCase().startsWith(c.stat.toLowerCase().replace(' (level 11)','')+':')||line.toLowerCase().startsWith(c.stat.toLowerCase().replace(' (level 11)','')+' (level 11):'));
  return line?{...c,classification:'nerf',quote:line,originalQuote:c.originalQuote||c.quote,...(c.unit==='damage'?{presentationPercent:'-35.2%',presentationNote:'71 → 46 is a 35.2% reduction; the official note reports 36%.',levelReference:11,levelVerification:{level:11,sourceUrl:update.sourceUrl,method:'Official October17 note explicitly labels Lightning Link Crown Tower Damage (level 11):71→46.'}}:{})}:c;
 })};
 if(update.id===AUGUST_2024)update={...update,effectiveDateKnown:true,effectiveDateBasis:'RoyaleAPI final report: These will go live on 2024-08-06 Tuesday, around 8-9am UTC.',dateVerification:{sourceUrl:AUGUST_SOURCE},changes:update.changes.map(august2024Change)};
 if(update.id===JULY_2024)update={...update,effectiveDateKnown:true,effectiveDateBasis:'RoyaleAPI final report: These will go live on 2024-07-02 Tuesday, around 8-9am UTC.',dateVerification:{sourceUrl:JULY_SOURCE},changes:update.changes.map(july2024Change)};
 const proofs=root.HISTORY_VERIFICATIONS?.changes||{};
 const extra=juneSupplement(update);if(extra&&!update.changes.some(c=>c.id===extra.id))update={...update,changes:[...update.changes,extra]};
 return {...update,changes:update.changes.map(c=>{
  if(update.id==='d213d8e9-d8ff-543d-b11d-7763b5302892'){
   const hp={
    '42d5313a-025c-5664-a406-61e7c8c14fb7':[3336,3232,'RoyaleAPI August 2023 explicitly labels Goblin Giant HP 3147 →3336 Level 11.','https://royaleapi.com/blog/season-50-balance'],
    '4ce2ff01-96e7-5452-bb28-6fda7d1cf707':[2000,2150,'Pinned March2023 Monk HP2000 at Champion tournament Level11.','https://github.com/smlbiobot/cr-csv/tree/899e45efc765fbf3902927bb2e37dc04a78f7823/assets/csv_logic'],
    '6319ff07-9b4d-510b-bf7d-9e060782d530':[1440,1312,'Pinned March2023 GoblinDrill HP900 ×160% Epic Level11 =1440.','https://github.com/smlbiobot/cr-csv/tree/899e45efc765fbf3902927bb2e37dc04a78f7823/assets/csv_logic']
   }[c.id];
   if(hp&&c.unit==='hp'&&c.before===hp[0]&&c.after===hp[1])return {...c,levelReference:11,levelVerification:{level:11,method:hp[2]+' March final report supplies the matching before and changed after values.',sourceUrl:update.sourceUrl,referenceSources:[hp[3]]}};
   if(c.id==='117aac13-c953-50fa-a08c-03d7bed1f269'&&c.unit==='source notation')return {...c,before:0.8,after:0.7,unit:'seconds',sourceCorrection:{sourceUrl:'https://cdns3.royaleapi.com/static/img/blog/2024-03-season57/balance/v2-22c94fcc/s57-balance-02-72-1.jpg',reason:'Final v2 graphic shows First Hit Time 0.8 →0.7; article table incorrectly says 800/700 Seconds.'}};
  }
  if(update.id===MAY_2024){
   const proof=may2024Proofs[c.cardName+'|'+c.stat];
   if(proof&&((c.before===proof[0]&&c.after===proof[1])||(c.cardName==='Archers'&&c.unit==='relative')))return {...c,before:proof[0],after:proof[1],unit:proof[2],levelReference:11,levelVerification:{level:11,method:proof[3],sourceUrl:update.sourceUrl,referenceSources:['https://royaleapi.com/blog/season-59-balance','https://royaleapi.com/blog/archers-evolution-2023-november','https://royaleapi.com/blog/cannoneer-january-2024','https://royaleapi.com/blog/dagger-duchess-2024-april','https://royaleapi.com/blog/valkyrie-evolution-2024-january','https://github.com/smlbiobot/cr-csv/tree/899e45efc765fbf3902927bb2e37dc04a78f7823/assets/csv_logic']}};
  }
  if(update.id===JUNE_2024){
   const row=june2024Rows[c.cardName+'|'+c.stat];
   if(row){const sourceUrl='https://royaleapi.com/blog/season-60-balance';return {...c,before:row[0],after:row[1],unit:row[2],stat:row[3],quote:row[3]+' '+row[4]+'\n'+row[0]+'\n'+row[1],originalQuote:c.originalQuote||c.quote,sourceUrl,sourceCorrection:{sourceUrl,method:'Final RoyaleAPI table resolves missing values and source-unit errors; original import retained.'},...(['hp','damage'].includes(row[2])?{levelReference:11,levelVerification:{level:11,sourceUrl,method:'DartGoblin131 is verified from raw62 ×212%; Cage742 from350 ×212%. Tesla release explicitly states192 at tournament standard. Duchess release Level11 panel shows153 damage. LittlePrince399 matches the final report at those corroborated Level11 baselines.'}}:{})};}
  }
  if(update.id===JUNE_EMERGENCY&&c.cardName==='Goblin Machine'){
   const sourceUrl='https://royaleapi.com/blog/season-60-balance-emergency',isTower=c.stat==='Rocket Crown Tower Damage',isTime=c.unit==='seconds';
   return {...c,...(isTower?{before:588,after:195,unit:'damage'}:{}),...(isTime?{stat:'Rocket Hit Time'}:{levelReference:11,levelVerification:{level:11,sourceUrl:'https://royaleapi.com/blog/goblin-machine-new-card-2024-summer-update',method:'Release report explicitly labels Level11 Rocket Damage588 and says Crown Tower damage is identical. Emergency report supplies391 troop and195 tower damage.'}}),originalQuote:c.originalQuote||c.quote,quote:(isTower?'Rocket Crown Tower Damage -67%':isTime?'Rocket Hit Time +14%':'Rocket Damage -34%')+'\n'+(isTower?'588\n195':isTime?'3.5\n4':'588\n391'),sourceUrl};
  }
  const january=january2024Proofs[c.id];if(update.id==='a05cf451-cc2c-5d9d-8cae-efa053ee6a6e'&&january&&c.unit==='relative')return {...c,before:january[0],after:january[1],unit:january[2],levelReference:11,levelVerification:{level:11,sourceUrl:'https://royaleapi.com/blog/season-55-balance',method:january[3]+' The January report supplies the matching before value and changed after value.',referenceSources:['https://royaleapi.com/blog/little-prince-guide-2023-november','https://github.com/smlbiobot/cr-csv/tree/899e45efc765fbf3902927bb2e37dc04a78f7823/assets/csv_logic']}};
  if(update.id==='58f6106c-b535-51ff-885e-6ab216b6ac26'&&c.id==='7a7060d6-8adc-5d3a-a18b-7cd61e69740e'&&c.before===215&&c.after===184&&c.stat==='Power Shot Damage')return {...c,levelReference:11,levelVerification:{level:11,method:'RoyaleAPI release screenshot labels Level 11 and Showing Challenge Levels, with Power Shot Damage 215. December report matches that before value and gives 184 after.',sourceUrl:'https://royaleapi.com/blog/archers-evolution-2023-november',imageUrl:'https://cdns3.royaleapi.com/static/img/blog/2023-11-season53/archers-evo/v1-900c195c/evo-archers-info.jpg',imageSha256:'17f42c6fcad99446845b7b4ca4e7f8b7e0a6d69276b84db3fbb253ac9d61e1ec',balanceSourceUrl:update.sourceUrl}};
  const proof=proofs[c.id];
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
function updatePresentation(update){if([OCTOBER_2024,OCTOBER_EMERGENCY].includes(update.id))return {...update.presentation,seasonLabel:'October 2024 · Season 64'};if(update.id===AUGUST_2024)return {...update.presentation,seasonLabel:'August 2024 · Season 62'};if(update.id===JULY_2024)return {...update.presentation,seasonLabel:'July 2024 · Season 61'};if([JUNE_2024,JUNE_EMERGENCY,'497eeec0-1b76-5c05-b74c-96c1488af255'].includes(update.id))return {...update.presentation,seasonLabel:'June 2024 · Season 60'};if(update.id===MAY_2024)return {...update.presentation,seasonLabel:'May 2024 · Season 59'};if(update.id==='80fa387d-c2eb-530a-a766-f1fcdb675eda')return {...update.presentation,seasonLabel:'December 2022 · Season 42'};if(update.id==='e7d42138-c3d1-50cb-b666-61e56b35b3fe')return {...update.presentation,seasonLabel:'October 2022 · Q3'};const result=update.presentation||presentation[update.id]||{seasonLabel:null,changes:{}};return update.id==='08fc975e-b81d-5767-a1e3-83e716be6662'?{...result,seasonLabel:'November 2021 · Season 29'}:result;}
function changePresentation(update,change){
 const single=change.unit==='relative'||change.before==null||['','—','-'].includes(change.before);
 const unit=update.id===OCTOBER_2024&&change.unit==='dps'?' HP/sec':change.unit==='value'&&/\n[\d.]+ tiles\n[\d.]+ tiles?$/.test(change.quote||'')?' tiles':change.unit==='seconds'?' s':change.unit==='hits per second'?' hits/sec':change.unit==='healing per second'?' HP/sec':change.unit==='tiles'?' tiles':change.unit==='percent'?'%':change.unit==='multiplier'?'×':change.unit==='elixir'?' elixir':'';
 const sourceLines=(change.quote||'').split('\n').map(s=>s.trim());
 const evolutionBonus=change.formType==='evolution'&&/^(?:.*Bonus|Damage|Hitpoint) Multiplier$/.test(change.stat);
 const format=value=>{if(evolutionBonus&&typeof value==='number'){const bonus=Number(((value-1)*100).toFixed(2));return (bonus>0?'+':'')+bonus+'%';}const signedValue=typeof value==='number'&&value>=0&&sourceLines.slice(1).some(line=>line==='+'+value+(change.unit==='percent'?'%':''));return typeof value==='number'?(signedValue?'+':'')+String(value)+unit:String(value??'').replace(/HP\/sec/g,/Hit Speed/.test(change.stat)?'hits/sec':'HP/sec').replace(/^([+-])\s+(?=\d)/,'$1').replace(/\bhits per sec\b/g,'hits/sec').replace(/\bsec\s+(?:\^\s*)?-1\b/g,'sec⁻¹').replace(/\btiles?\s+(?:\^\s*)?2\b/g,'tiles²');};
 const signed=single&&change.unit==='percent'?change.quote?.match(/([+-]\s*\d+(?:\.\d+)?)%/):null;
 let note=update.id==='08fc975e-b81d-5767-a1e3-83e716be6662'&&change.cardName==='Skeleton King'&&change.stat==='Pushback'&&update.excerpt.includes('immunity doesn’t work against The Log')?'Except The Log':null;
 const quotedPercent=(single?change.quote:sourceLines.slice(0,Math.max(1,sourceLines.length-2)).join(' '))?.match(/([+-]\s*\d+(?:\.\d+)?)%/);
 let percent=quotedPercent?quotedPercent[1].replace(/\s/g,'')+'%':null;
 if(change.unit==='relative')percent=String(change.after).match(/[+-]\d+(?:\.\d+)?%/)?.[0]||percent;
 const novemberPercent={'3ba1c0e4-a30a-53a3-b5b5-946b001bd3ce':['Damage\n                    -10%','-10%'],'5a5ef8bf-a5e6-5e30-8354-0684cef4b84b':['Egg Hit Points (HP)\n                    -34%','-34%']}[change.id];
 if(novemberPercent&&update.excerpt?.includes(novemberPercent[0]))percent=novemberPercent[1];
 if(change.id==='bd4dd330-d566-5640-aec4-16ba6d8d3089')percent='-7.6%';
 if(update.id==='d213d8e9-d8ff-543d-b11d-7763b5302892'){
  const stat=change.stat==='Hitpoints'?'HP':change.stat==='Attack Rate'?'Hit Speed':change.stat==='Hitpoint Multiplier'?'HP Multiplier':change.stat;
  const i=sourceLines.indexOf(stat);if(i>=0&&/^[+-]\d+(?:\.\d+)?%$/.test(sourceLines[i+1]||''))percent=sourceLines[i+1];
  if(change.id==='117aac13-c953-50fa-a08c-03d7bed1f269')percent='-13%';
 }
 if(update.id===MAY_2024){
  const labels={'Hitpoint Multiplier':change.cardName==='Royal Giant'||change.cardName==='Royal Recruits'?'Evolution Bonus Hit Points':'Bonus Hit Points','Hitpoints':change.cardName==='Royal Giant'||change.cardName==='Royal Recruits'?change.cardName+' Hit Points':'Hit Points','Crown Tower Damage per Second':'Crown Tower Damage/sec','Second and Third Zap Damage Multiplier':'2nd and 3rd Zap Damage'};
  const label=labels[change.stat]||change.stat,index=sourceLines.findIndex(line=>line.endsWith(label+':'));
  percent=index>=0?sourceLines[index+1]?.match(/[+-]\d+(?:\.\d+)?%/)?.[0]||null:null;
 }
 if([JULY_2024,AUGUST_2024,OCTOBER_2024,OCTOBER_EMERGENCY].includes(update.id)&&change.presentationPercent)percent=change.presentationPercent;
 if(january2024Proofs[change.id])percent=null;
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
 if([JULY_2024,AUGUST_2024,OCTOBER_2024,OCTOBER_EMERGENCY].includes(update.id)&&change.presentationRate)rate=change.presentationRate;
 if(evolutionBonus)note='Bonus over Base';
 if(change.announcementNote)note=change.announcementNote;
 if([AUGUST_2024,OCTOBER_2024,OCTOBER_EMERGENCY].includes(update.id)&&change.presentationNote)note=change.presentationNote;
 if(update.id===JUNE_EMERGENCY&&change.stat==='Rocket Hit Time')rate={label:'Rocket Hit Speed',before:'0.286',after:'0.250',percent:'-13%',unit:'hits/sec'};
 if(update.id===MAY_2024){
  if(change.cardName==='Royal Giant'&&change.stat==='Hitpoint Multiplier')rate={label:'Total Evolution HP',before:'3379',after:'3164',percent:'',unit:'Level 11'};
  if(change.cardName==='Royal Recruits'&&change.stat==='Hitpoint Multiplier')rate={label:'Total Evolution HP after both changes',single:true,after:'547',percent:'',unit:'Level 11'};
  if(change.cardName==='Poison')note='Total Crown Tower damage over 8 s: 224 before, 184 after';
  if(change.cardName==='Poison')rate={label:'Crown Tower damage multiplier',before:'30%',after:'25%',percent:'',unit:'of normal damage'};
  if(change.cardName==='Archers'&&change.stat==='Power Shot Damage')rate={label:'Power Shot multiplier',before:'1.7×',after:'2×',percent:'',unit:'normal damage'};
  if(change.formType==='base'&&['Royal Giant','Royal Recruits'].includes(change.cardName))note='Shared base HP increase; Evolution bonus changes below.';
 }

 return {symbolic,label:(update.id===MAY_2024&&change.stat==='Bonus First Hit Speed'?'First Hit Time':null)||(evolutionBonus?change.stat.replace(' Multiplier','').replace(/^(Damage|Hitpoint)$/, '$1 Bonus'):null)||(change.cardName==='Phoenix'&&change.stat==='Egg Hit Points'?'Egg Hitpoints':null)||season40Label||(timing&&/^(Hit Speed|Hit Time)/.test(change.stat)?change.quote.match(/^(?:First )?Hit Time/)[0]:change.stat.replace(/\s+[+-](?:\s+\d+(?:\.\d+)?\s*sec)?$/, '')),rate,single,before:format(change.before),after:signed?signed[1].replace(/\s/g,'')+'%':format(change.after),note,percent:single&&change.unit==='percent'?null:percent};
}
function elixirStages(update,changes){
 if(update.id!=='f9672f7f-6950-58dc-ab65-0d896a696675'||!changes.every(c=>c.cardName==='Elixir Golem'))return [];
 const find=stat=>changes.find(c=>c.stat===stat);
 const stages=[['Elixir Golem',1,'Hitpoints'],['Elixir Golemites',2,'Elixir Golemite Hitpoints'],['Elixir Blobs',4,null]].map(([name,count,hp],i)=>({name,count,release:find('Blob '+(i+1)+' Elixir Release'),total:find('x'+count),hp:find(hp)}));
 return stages.every(s=>s.release&&s.total)?stages:[];
}
function displayChanges(changes){
 const hidden=new Set(['d3e51df0-9b13-5d55-be79-657aff2ba3b4','bc9c03ac-f21a-5cab-a6e2-2aadc327f0a1','fc3186b0-22a4-577e-956f-202c76bcb168','f15565da-5a6e-5141-b71f-f2af8902cc13','923a6dbc-6f75-5706-93e5-efe881adb77d','8334bb46-fe89-5776-b98e-f83e9ada5b46','387d5326-0fb6-5b05-a9c6-1c0896c6ea0c','c8234546-eb79-58f0-a8c6-1f16a334701d']);
 const seen=new Set();return changes.filter(c=>{if(hidden.has(c.id))return false;if(c.unit!=='seconds'||!/^Hit Time\b/.test(c.quote||''))return true;const key=[c.cardFormId,c.before,c.after].join('|');if(seen.has(key))return false;seen.add(key);return true;});
}
function relatedCards(update,change){
 if(update.id===JUNE_2024&&change.cardName==='Spear Goblins')return ['Spear Goblins','Goblin Gang','Goblin Giant','Goblin Hut'].map(name=>({name,component:(name==='Spear Goblins'?'':'Spawned Spear Goblin · ')+change.stat}));
 if(update.id===MAY_2024&&change.cardName==='Barbarians'&&change.formType==='evolution')return [{name:'Barbarians',formType:'evolution',component:change.stat},{name:'Battle Ram',formType:'evolution',component:'Spawned Evolved Barbarian · '+change.stat}];
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
 if(update.id===JUNE_2024){
  if(change.unit==='hits per second')return change.after>change.before?'buff':'nerf';
  if(change.cardName==='Void'&&change.stat==='First Hit Time')return 'nerf';
 }

 if(update.id===MAY_2024){
  if(change.unit==='multiplier'&&change.before!==change.after)return change.after>change.before?'buff':'nerf';
  if(['Power Shot Damage','Boost Duration','Big Sparks Duration','Small Sparks Duration','Movement Slowdown','Death Electro Pulse','Runner Speed'].includes(change.stat))return 'buff';
 }

 if(update.id==='d213d8e9-d8ff-543d-b11d-7763b5302892'&&change.cardName==='Goblin Drill'&&change.stat==='Duration')return 'buff';
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
function changeSymbol(update,change){return ({buff:'↑',nerf:'↓',rework:'⟳',fix:'⟳'})[changeCategory(update,change)]||'⟳';}
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
 // Qualitative mechanics do not require a combat-stat normalization level.
 if(change.unit==='mechanic'&&!Number.isFinite(change.before)&&!Number.isFinite(change.after))return true;
 if((change.levelReference??update.level)===11)return true;
 if(['seconds','tiles','percent','elixir','multiplier'].includes(change.unit))return true;
 if(/radius|range|duration|time|speed|count|cycles|mass|multiplier|reduction|spawn interval/i.test(change.stat))return true;
 return !(['damage','hp','hitpoints','healing'].includes(change.unit)||/damage|\bHP\b|hitpoints|hit points|health|healing|DPS|\bDMG\b|Crown Tower(?::|$)/i.test(change.stat));
}
function changeKind(change){
 if(change.damageScope==='cast')return null;
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
 if(update.id===OCTOBER_2024&&change.cardName==='Bomber'&&change.formType==='base'&&change.stat==='Damage'){const card=rows.find(r=>r.card.name==='Bomber')?.card;return card?card.forms.filter(f=>['base','evolution'].includes(f.formType)).map(f=>f.id):[change.cardFormId];}
 if(update.id===AUGUST_2024&&change.cardName==='Wizard'&&change.formType==='base'&&change.stat==='Hitpoints'){const card=rows.find(r=>r.card.name==='Wizard')?.card;return card?card.forms.filter(f=>['base','evolution'].includes(f.formType)).map(f=>f.id):[change.cardFormId];}
 // Tesla's release explicitly gives it the same ordinary attack as Base.
 if(update.id===JULY_2024&&change.cardName==='Tesla'&&['Damage','Hit Time'].includes(change.stat)){const card=rows.find(r=>r.card.name==='Tesla')?.card;return card?card.forms.filter(f=>['base','evolution'].includes(f.formType)).map(f=>f.id):[change.cardFormId];}
 if(update.id===MAY_2024&&['Royal Giant','Royal Recruits'].includes(change.cardName)&&change.formType==='base'&&change.stat==='Hitpoints'){const card=rows.find(r=>r.card.name===change.cardName)?.card;return card?card.forms.filter(f=>['base','evolution'].includes(f.formType)).map(f=>f.id):[change.cardFormId];}
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

root.HistoryModel={changeSymbol,displayChanges,elixirStages,relatedCards,changePresentation,verifiedUpdate,HISTORY_START,inScope,level11Values,historicalReferences,timelineGroups,updatePresentation,changeCategory,cardCategory,damageChanges,compare,additionalStats,changeKind,referenceForChange,affectedForms,detectCrossings};
})(globalThis);
