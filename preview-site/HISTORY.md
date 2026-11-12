# First historical balance slice

The owner authorized historical work on November 3, 2026 after reviewing the catalog and One-shot UI. This slice records the **October 19, 2026** section of Supercell's [October Balance Changes](https://supercell.com/en/games/clashroyale/blog/release-notes/october-balance-changes-2026/) article. The article displays publication October 6 and has a separate October 19 heading. These are different dates; the update's exact time is unknown. The source explicitly says values are Level 11.

12 changes across 11 named forms are imported into the workspace's canonical PostgreSQL database, with source record, import run, retained original HTML SHA-256, quotes and stable form mappings. The public `history-data.js` is exported from those stored records. The existing 127 cards, 188 forms and 202 screenshot observations are preserved. No complete historical card versions are created from partial patch notes. October 6 is outside this first slice.

Base changes are attached only to the explicitly named Base form. The source's phrase “most of the time” about propagation to Evolution/Hero is not enough to assign unspecified changes. Hero Electro Wizard's removed delay is a qualitative change, not an invented numeric duration.

## Comparison contract

Seven numeric damage changes can be compared before/after against a **fixed Level 11 screenshot HP reference** from any recorded form. Both sides use that same HP; this is not a reconstruction of the target's historical HP. The UI displays the screenshot date or its unknown-date status. Equality reaches the selected HP threshold. Shield/reduction states show a mechanic-check notice. Actual targeting, timing, active abilities and multi-entity effects are not simulated. This reference tool does not modify the One-shot catalog or backdate it.

Example: Void's 2–4-target damage changes 296 → 307. Against the fixed 304-HP Archers reference, the arithmetic changes from 8 HP remaining to reaching the threshold. The official article also describes that interaction, but the reference screenshot itself does not establish historical HP validity.

## Validation

- PostgreSQL tests cover source-hash rejection, mapping rejection, rollback on a mid-insert failure, exact round-trip, concurrent idempotency and drift rejection.
- Public model tests cover date distinction, scope counts, numeric eligibility, equality, shield notices and the Void threshold.
- Desktop/mobile browser checks cover all changes, source links/dates, filters, comparisons and navigation.

This GitHub/Vercel project remains a read-only exported preview; the PostgreSQL runtime is not deployed to Vercel. Canonical importer and migrations remain in the shared application workspace. Further updates require a new source-backed import, not editing the exported history by hand.

## Additional card stats

Card details derive an “Additional stats from balance notes” section from the persisted update collection. Facts are scoped to the exact form, stat and reference level, ordered by effective date (not retrieval/import date). The latest documented value, previous value, effective date and source link are displayed, with all earlier changes expandable. A fact already identical to a screenshot field is not duplicated; missing or differing values remain separately sourced rather than replacing screenshot observations. Same-day conflicting values are flagged. These are latest imported documentary facts, not a guarantee that no later balance update exists. Cannon Cart mass 3 → 6 is the first example. The exporter retains all imported history updates so older facts are not lost when the next patch is added.

## Automatic threshold and ordering report

Each numeric damage/HP change is scanned against all Level 11 reference rows from the One-shot model. Opposite-type crossings compare damage >= HP or HP > damage; equality therefore reaches HP but is not survival. Same-type ordering compares the sign of before/reference and after/reference, including entering or leaving ties. Exact self-stat rows are excluded, while related forms, conditional attacks and other HP states retain their own entries. Different-level rows are excluded. Shield/reduction and unverified entries retain mechanic-check labels. No crossings is shown explicitly, and an update with no HP changes does not invent any.

The primary report is automatic, with clickable card artwork, stat icons and form grouping. The manual comparison remains optional and collapsed. Patch changes are bundled under their canonical parent card, with separate form subsections and stat rows. Repeated source quotations are removed from each visible change card; evidence remains in the stored data and update-level source link.

These detections are numerical movements relative to fixed screenshot references, not reconstructed ordering against every other card's historical values. References that also changed in the same patch are still fixed reference values, as labeled.

## Target eligibility and repeated attacks

Automatic opposite-type threshold comparisons now call the same recorded-target eligibility helper as One-shot matchups. Ordinary building-only attacks are compared only with main building HP and Crown Tower HP, excluding troops and their components. Explicit Crown Tower damage fields are scoped to towers. The historical change uses the matching screenshot attack's targeting as reference context; unrecorded historical targeting is not invented. Death/spawn and other special effects do not inherit the unit's ordinary building-only targeting.

Where a sourced ordinary per-hit damage changes, the report also detects changes in `ceil(reference HP / damage)` for eligible unshielded reference HP. These are repeated normal attacks with no healing, regeneration or active defenses; special effects and aggregate volleys are excluded from this calculation. For Minion Giant versus the fixed 1,748-HP Inferno Tower reference, 168 → 153 damage changes 11 → 12 attacks. Manual comparisons reject known incompatible targets as well. Same-type damage ordering remains explicitly numerical rather than an interaction claim. Air/ground mobility and other unrecorded mechanics remain incomplete.

## Classification and season labels

Patch panels use green Buff, red Nerf and blue Rework badges, borders and arrows, with text labels so meaning is not color-only. Classification follows the official subsection headings rather than whether a numeric value rises or falls. For example, Electro Dragon's reduced first-hit time is a Buff; Cannon Cart's mass change remains part of its source-classified Nerf. The October 2026 · Season 88 label is supported by the owner-supplied RoyaleAPI screenshot; it does not conflate the October 6 and October 19 patches. Unknown future labels remain unspecified until supported.

## 2026 archive (reviewed November 3)

The selector now exposes 16 source-backed updates and 296 card/form/stat changes from January through October, including February 23 and March 16 gameplay fixes. August 4's global single-use ability rule is shown separately, with its Boss Bandit exception. The October 19 notes explicitly brought November seasonal changes forward; no November-start patch or future December patch is invented.

Each patch retains its publication day, effective day, source URL/hash, quotes, form identity and classification. A retroactively published article needs an explicit effective-date basis. January, February and August do not explicitly establish the numeric level, so their level is unknown and Level 11 comparisons are disabled. Source wording and disagreements between articles are preserved rather than silently reconciled. Non-numeric fixes stay non-numeric.

Season names come from official season posts. October's Season 88 number comes from the owner's screenshot; other season numbers are not extrapolated. Green/red arrows follow clear benefit direction for HP/damage and timed attack intervals; ambiguous mechanics retain the official heading. Mixed buffs/nerfs group as a blue rework. Explicit reworks remain blue; bug fixes have a separate blue label.

Automatic matchup comparisons require an unambiguous screenshot component mapping. Generic Damage may map to exactly one main-card Damage/Ranged Damage/Area Damage/Melee Damage field. Component names never fall back to parent attacks. Unmapped values can show numerical ranking shifts, with an explicit warning, but no target outcomes. Percentages and DPS cannot become hit damage or HP. Historical data does not overwrite screenshot observations or create complete historical snapshots.

Canonical ingestion: `scripts/history-year.ts`; retained manifests, transcription, source audit and commit/repeat receipts: `docs/reviews/history-2026/` (workspace only). Re-running verifies existing values and refuses drift. Public `history-data.js` is exported from PostgreSQL; no private evidence paths or credentials are published. Merge Tactics and temporary C.H.A.O.S modifiers are outside this 1v1 history.

Audience comparison layout: omit reports without any crossings/ranking/hit-count changes and omit empty groups. Results use flat icon grids, short one-hit outcome labels and green up/red down ranking symbols (`=` for a new tie). Layer-specific shields retain qualified wording. One-hit crossings are not repeated in the hit-count grid. Diagnostic counts and long explanations are removed from the visible results; the compact reference-stats tooltip preserves calculation context. All 16 patch selections and desktop/mobile layouts were browser-checked.

## Navigation and 2025 archive

Arrow buttons move to the previous/next dated record (older on the left, newer on the right), with disabled boundaries and keyboard arrow support while navigation is focused. The browse icon opens a native modal picker grouped by month/year, with card-image previews and an active selection. Escape and the close button dismiss it. Entry slides are staggered briefly; reduced-motion preferences disable animation. Detailed provenance stays in the collapsed evidence area.

The 2025 import adds 24 updates and 274 explicit card changes across all twelve months: 40 updates and 570 changes total. It includes mid-month maintenance, Furnace's rework, gameplay fixes and separately stated global rules. See workspace `docs/reviews/history-2025/` for source audit, manifests and receipts. Repeat/export: `node --import tsx scripts/history-year.ts 2025`.

Older sources do not establish an article-wide numeric level. Preserve unknown levels; explicitly labeled P.E.K.K.A Level 11 healing and Tower Princess Level 16 interactions retain per-change `levelReference`. Do not silently turn per-projectile damage, DPS or relative changes into full-hit damage. When no separate effective date is stated, timeline placement uses the publication date with `effectiveDateKnown: false`; the date tooltip and evidence panel distinguish it. The November 26 updated season post describes an earlier Three Musketeers rework without establishing its original release day. Preserve this limitation and source inconsistencies rather than inventing dates or intermediate patches.

Combat clarity revision: default to Combat outcomes; keep damage-vs-damage and HP-vs-HP comparisons in a separate Stat rankings view. Rankings have explicit group labels (for example, “Now deals less damage than”) so arrows cannot be mistaken for kill results. Effects shortcuts select the applicable view. Hero Ice Wizard's source Freeze Damage is explicitly mapped to Frosty Fella's ability-panel Area Damage, never the main attack; regression and browser checks verify the lost Skeleton/Bat one-hit outcomes. Empty results remain omitted.

Combat outcomes now shows only gained/lost one-hit kills or one-hit survival. Multi-hit count changes, shield-only thresholds, protected/unverified outcomes and aggregate multi-hit reference attacks are excluded from this view. Cards without a qualifying one-hit change are omitted; numerical rankings remain separate. Browser checks cover all 40 patches, Cannon Cart's omission and Hero Ice Wizard's retained one-hit losses.

### 2024 archive and affected forms

Added 14 source-backed updates / 158 changes for 2024 (54 updates / 728 changes overall). The March 5 final report is retained from RoyaleAPI because the old Supercell March URL now serves a different year. It remains a secondary source, distinct from official notes. Unknown levels, source-unit ambiguities, and publication-date placement remain explicit; they do not generate normalized combat results.

Shared main HP/damage changes display affected form icons together. A matching existing Evolution/Hero is excluded from same-family rank crossings when it inherits the base change. Explicitly different before/after values remain separate. Ability and component damage are not treated as shared main attacks. Combat outcomes remain limited to gained/lost one-hit outcomes.

### Releases alongside balances

The timeline now includes 27 reviewed release/mechanic records covering 42 canonical forms. All / Balance / Releases / Mechanics filters apply to navigation and the picker. Heroes links its four launch forms, with the November announcement retained separately from December availability. Mega Minion Hero keeps early access and general availability distinct.

`release-data.js` is a source-backed public release ledger, separate from the balance importer and screenshot observations. This is an initial backfill, not a complete release catalog. Unknown playable dates use clearly labeled announcement placement. Source excerpts and hashes are retained; current card buttons explicitly open current observations, never implied launch stats. Unsupported launch statistics remain blank.

Spell rankings distinguish troop/building damage from Crown Tower damage; reduced Crown Tower entries do not appear in ordinary damage crossings. Void exposes one, two and three hits for each of its three target-count tiers, separately for normal and Crown Tower damage. Cumulative totals assume the tier remains unchanged and never produce one-hit outcomes.

### Date, month and season views

Date remains the default. Month and Season combine the selected timeline type into dated event sections, retaining individual changes, releases and global rules. Arrows and the group selector navigate groups; Open date and combat-effect buttons return to the original detailed event. Search applies within the selected group. Season attribution uses recorded season labels/source associations (including June 2026's May announcement); missing season metadata stays explicitly unspecified, without invented season numbers or start/end boundaries.

### Release audit and historical references

The audit now retains 66 release/mechanic records covering 80 forms, including every one of the catalog's 61 Evolution/Hero forms. It reviewed 126 public reports, retained 139 reported preview stats and 39 sourced season starts. Remaining 108 older base-card release histories are explicitly listed as gaps in release-data.js; the older wiki source was unavailable (HTTP 402). This is not a claim of complete all-card release history.

Release-date corrections include Royal Hogs Evolution (November 3, 2025), Berserker, Rune Giant, Vines, Princess Evolution and Skeleton Barrel Evolution. Evolution-system introduction links the first four forms. Announcement, unlock, early-access and general availability remain separate. Source reports for Goblin Cage Evolution and Minion Giant contain calendar conflicts; exact playable dates remain unset. Supplemental date evidence includes retained hashes and quotes. Date corrections do not mutate balance manifests or screenshot observations.

The 139 numerical entries are labeled **Preview stats**, not confirmed launch stats. Sources explicitly warning of developer-build values remain provisional. An isolated mention of Level 11 for one ability does not normalize the article's other stats. Preview values do not seed historical combat calculations.

Automatic comparisons now default to **Recorded historical stats**, with an explicit **Current screenshot stats** alternative. Historical references are anchored only by dated, numeric, level-matched balance observations at or before the selected update. No future or current-value fallback is used. Unknown-level, unparsed, uncertain-date and ambiguous same-day changes invalidate earlier combat anchors. Both sides of a simultaneous HP/damage change use their own before/after values. This provides documented historical arithmetic with incomplete coverage, not a full historical battle simulation or complete state reconstruction. Current artwork and conservative targeting/mechanic filters remain the visual/eligibility templates. Manual comparison remains explicitly based on screenshots.

### Older-release evidence audit

The release ledger now contains 79 records covering 95 forms, with 93 older base-form introductions still unverified. Twelve older reports add fifteen forms: Wall Breakers, Fisherman, Elixir Golem, Battle Healer, Firecracker, Royal Delivery, Heal Spirit, Electro Giant, Electro Spirit, Mother Witch, Goblin Drill, the original three Champions, and Mighty Miner. Only Heal Spirit's April 2, 2020 playable date is explicitly established by these reports; the other additions retain announcement placement. Champions' November season start must not be substituted for their update date.

Goblin Cage Evolution uses documented Season Pass availability on August 5, 2024. Minion Giant uses the official September 7, 2026 unlock-event start, in a separate record from the still-undated Ice Wizard Hero introduction. Both conflicting preview claims remain in the audit/evidence. These availability dates do not assert that earlier undocumented access was impossible.

Explicit Level 11 rows for older cards remain **preview** statistics. No preview values were promoted to confirmed launch stats. The reviewed final balance tables generally omit an applicable card level; a retrospective Phoenix table explicitly gives Level 11 values for November 2, 2022, but this is neither a launch snapshot nor inside the currently covered balance window. It is not seeded into later comparisons across an unreviewed gap. Combat-reference behavior is unchanged.

### 2020–2023 expansion and Level 11 scope

Added 37 reviewed balance reports / 399 deltas: 2020 12/120, 2021 5/86, 2022 11/110, 2023 9/83. Combined coverage is 91 updates / 1,127 changes through the existing 2026 records. These are reviewed final reports from RoyaleAPI, including emergency updates found in seasonal posts; this is not a claim that every historical maintenance or undocumented adjustment has been recovered. Source reports, excluded progression tables, malformed derived-DPS rows, unknown effective dates, and date corrections remain auditable in the local yearly manifests and source audit. The 47 explicitly labeled Level 11 deltas are eligible for component mapping; only reliably dated, mapped observations can anchor historical combat comparisons.

The user-facing timeline starts at 2020. Only Level 11 HP/damage/healing values are displayed or compared. Unknown-level and other-level raw numbers stay in source evidence; their visible stat line shows `Lv.11 —`. Level-independent range, timing, counts, mass and percentages remain visible. Release-preview tables and additional historical stats follow the same restriction. Uncertain-date updates have no historical combat reference set. Older percentage changes are never reinterpreted as absolute damage.

The source headers for February/April 2022 contradict their deployment sentence's year. The report year and stated weekday support 2022, and the correction is retained as a notice. April 2023's report header incorrectly says 2022; its internal dated schedule establishes the 2023 publication placement, without guessing an effective day. November 17, 2023 retains the written date and notes the incorrect Wednesday label. Deferred Rage changes are placed with the December 12 client update rather than December 7's patch. The Heal-to-Heal-Spirit replacement is not imported as an April 7 stat change. Phoenix egg/reborn and Elixir Golem component stats remain separate from the main unit.

Release evidence now covers 96 forms in 80 records. Firecracker's January 6, 2020 unlock challenge is explicitly dated. Skeleton Dragons' June 5, 2020 date is labeled **Scheduled release**, matching the preview's wording rather than claiming post-release verification. The historical release ledger is separate from the canonical balance imports.

### Visible history boundary

At the owner's request, visible history now starts October 27, 2021, with the Level 11 tournament-standard era. The boundary applies to timeline navigation, date/month/season groups, additional historical stats and combat-reference construction. Earlier balance and release evidence remains stored internally and is not deleted. Level 11-only value restrictions still apply within the visible period.

### Supplemental Level 11 verification

`history-verifications.js` retains a separate evidence ledger: eight December 7, 2021 deltas are independently reproduced at Level 11, and 283 dated main-unit HP/damage observations cover 72 Base forms. Inputs are immutable CSV commits from the public `smlbiobot/cr-csv` archive maintained by RoyaleAPI's founder. Each observation retains the exact character/building/projectile row, raw value, rarity, multiplier, input SHA-256 hashes, commit timestamp and URL. The archive's rarity tables explicitly give tournament indices corresponding to Level 11; values use integer truncation of `base × PowerLevelMultiplier / 100`, checked against separately published Level 11 examples. These are derived game-table facts, not new screenshots or direct quotations of displayed Level 11 stats.

The December balance article establishes the change/date; pre/post archive observations reproduce both numbers at Level 11. The later archive timestamp is not treated as the patch's deployment day. The eight confirmations cover Furnace, Goblin Hut, Barbarian Hut, Executioner, Dart Goblin, Goblin Cage and Mother Witch. Battle Ram’s 530 → 572 connection damage is reproduced directly from the archived DamageSpecial field (250 → 270, with the Level 11 rarity multiplier), without assuming a charge multiplier. Canonical imported patch notes and screenshot observations remain untouched; the preview resolves matching confirmations through an auditable overlay. This supplemental ledger is not a PostgreSQL migration or replacement of canonical source records.

Reference observations are dated November 13, 2021, October 4, 2022 and February 7, 2023. Only snapshots strictly earlier than the selected patch can supply its reference stats, avoiding same-day before/after leakage. Reviewed patches apply chronologically; unknown-level/date/component edits invalidate existing anchors. A later snapshot can re-establish a measured value. Current screenshots never fill a missing historical value. Main-unit HP and a reviewed subset of ordinary attacks are covered; shields, alternate forms, spawned units, spells, charge multipliers and multishot attacks are not silently inferred. Existing targeting and protected-HP restrictions still apply. This remains incomplete historical coverage rather than a full battle simulation.

One independently checked result: the February 3, 2022 Balloon damage change from 960 to 640 crosses the dated Cannon HP of 896, removing a one-hit kill. Numerical comparisons still exclude troop targets that Balloon cannot attack.

Historical artwork: Base Furnace uses its original building artwork before August 4, 2025; Base Goblin Hut uses its original artwork before May 5, 2025. The rework entry itself uses the new artwork. Date-aware images cover history cards, browse thumbnails and historical outcome icons; current-card views and current-screenshot comparison targets keep current artwork. `historical-art.json` retains pinned source URLs, SHA-256 hashes and rework sources; the build verifies and copies both local PNGs. Combat-change buttons are centered within their stat sections.

History presentation uses signed percentages when the source reports only a relative change, preserving real zero-valued before stats. The November 4, 2021 Champion update displays Skeleton King’s +14% damage, +30% damage area, and the sourced Log exception to pushback immunity. Its Season 29 label follows the supplied RoyaleAPI graphic. Raw evidence and combat calculations are unchanged. A date/season banner and brighter category-colored cards use the locally bundled Barlow Condensed font under the included SIL Open Font License.

Each stat now has its own buff/nerf/rework direction within its parent card. Known numeric pairs show a percentage: use the source’s signed percentage when supplied, otherwise calculate the relative change to one decimal place. Zero baselines have no undefined percentage. Relative-only and qualitative additions omit missing-before placeholders. Unknown-level absolute combat values remain hidden, while sourced percentages remain visible.

Timing breakdowns retain explicitly quoted reciprocal hit-speed rows alongside hit time, with hits/sec units and the source’s percentages. Matching both denominators prevents attaching another card’s rate. February 3, 2022 includes Balloon (3→2 seconds, +50% rate), Mini P.E.K.K.A (1.7→1.6, +6%), Musketeer (1.1→1, +10%) and Hunter’s first-hit breakdown. These are presentation details, not additional independent balance events or damage observations. Inferno Tower remains a relative-only +25% first-hit-speed buff.

Signed numeric endpoints are preserved from source table rows (e.g. +200% → +180%, Mirror +1 → +2). A before/after endpoint is not mistaken for a change percentage: paired values read percentage annotations from the heading only, otherwise calculate their relative change. Relative-only values normalize sign spacing without adding a second percent symbol. Display labels drop imported trailing change suffixes. Elixir produced at destruction increases are buffs; generation intervals increasing are nerfs, independently of the card’s rework heading.

Shared-unit changes show an Applies to icon strip using explicit source relationships: Season 36 Barbarian timing affects Barbarians, Barbarian Barrel, Battle Ram and Barbarian Hut; February 2022 Musketeer timing also affects Three Musketeers. Parent-card search matches these relationships. Spawned Barbarian timing is not assigned to the parent’s own attack or used as a new damage observation. Historical artwork respects the selected update. Reciprocal rate parsing supports retained superscript sec⁻¹ line breaks. Barbarian Barrel’s stated distance nerf is colored independently of its overall rework.

Season 38 Elixir Golem displays three compact stage panels. ×1/×2/×4 are stage counts; per-unit releases and stage totals stay together, alongside changed Level 11 HP. Raw source records stay intact. Opponent-elixir increases are shown as nerfs and decreases as buffs. Only this multi-stage card spans two desktop grid columns; mobile stacks its panels. Fire Spirit’s sourced shared damage change also shows Furnace. Multiline percentage annotations and source charge-distance units are retained.

Season 40 clarifies Goblin Gang’s Count as Spear Goblin Count (2→3), supported by the surrounding source paragraph. Elixir Golem stage hit-time labels and Cannon Cart’s stationary-cannon HP identify the affected component. Barbarian Hut’s cost, spawn interval/count, lifetime, death spawn and total spawned use independent benefit directions. These are display labels; original source quotes and values remain intact.

October 25, 2022 uses the source’s Q3 identifier in the date banner and grouped view (Quarter recap), without inventing a season number. Goblin count increases are buffs within the rework; shared first-hit changes show Goblins, Goblin Gang, Goblin Barrel and Goblin Drill, preserving the Goblin component label.

November 2, 2022 emergency changes are documented inside RoyaleAPI’s Season 41 Silent Sanctuary article (season41), whose introduction explicitly identifies the application date; it is not a separate dated balance article. November 21 is documented in emergency-balance-phoenix. November’s Phoenix damage/egg HP retain the source’s rounded -10%/-34% annotations with Level 11 absolute values; egg lifetime +7.5% and Monk cooldown +13% remain nerfs. Egg Hitpoints uses the health icon.

Updates within month/season groups are chronological (earliest first); group navigation still lists recent groups first. December 2022 displays Dec 7, Dec 12, Dec 22. Mighty Miner’s Dec 22 emergency change is sourced in the Season 43 article: speed 90→60 is a nerf, Level 11 HP 2200→2300 is a buff, overall rework. Dec 7 speed 60→90 and Dec 22 reversal display computed relative percentages. Shared Minion damage and Lumberjack’s dropped Rage show related-card icons. Goblin Hut spawn intervals/counts are classified separately.

Valkyrie Evolution season attribution corrected to January 2024 / Season 55. Its source title incorrectly says January 2023, although the confirmed release is January 1, 2024. The independent Season 55 start quote resolves the conflict; source title/evidence remain retained with a seasonCorrection record. The local release enrichment generator now prefers an independently verified season calendar over conflicting title-derived dates. A regression audit checks year assignments across the current timeline.

Season 44 displays source DPS formulas (DMG / hit time) with their reported percentages without treating formulas as verified numerical Level 11 damage or one-hit attacks. Timing rows retain concise faster/slower notes. Rocket shows Level 11 Crown Tower damage separately from its normal-damage multiplier (30%→25%, source-rounded -17%).

Season 46 uses the shared symbolic DPS renderer for Mega Minion (DMG/1.6→DMG/1.5, +7%). Duplicate source Hit Time rows with identical component and values are presented once; raw evidence is retained. Spear Goblin range explicitly includes Goblin Hut, Goblin Gang and Goblin Giant’s spawned Spear Goblins. Furnace spawn delay is a buff and lifetime a nerf; pre-rework artwork is verified in both date and season views and remains date-bound through August 4, 2025.

Season 48 renders source unit exponents as sec⁻¹ and tiles². Symbolic DPS supports compact DMG/time dmg/sec notation (Phoenix -10%) without promoting it to a numeric combat observation. Goblin Hut’s original artwork remains date-bound before May 5, 2025 and is verified in date/grouped views. Ice Spirit’s source -66.7% annotation conflicts with 1.3→1.2 seconds; presentation derives -7.7% while preserving the raw quote.

Season grouping uses the recorded named season month, rather than the patch date’s month. June 30, 2023 therefore belongs to July / Season 49; calendar-month mode and the event date retain June 30. Royal Giant’s source +30%→+20% signs remain visible. Both Firecracker Base/Evolution icons accompany the source-confirmed first-hit nerf; sec⁻¹ units and the infographic’s -7.6% speed change are shown (the text table incorrectly says faster).

Season 50: Skeleton Evolution cycles decreasing is a buff and max count decreasing a nerf. Tesla’s source DMG/time sec⁻¹ DPS formula displays with +9%. Royal Giant Evolution’s prose-backed HP bonus +20%→+10% appears alongside Level 11 HP. Firecracker Evolution explicitly says its HP bonus is reduced, but its prose +133%→+130% conflicts with the 435→394 HP table; no unsupported numerical bonus is inferred or promoted into combat calculations.

Evolution Bonus Multiplier values render as bonuses over Base (e.g. 1.30→1.20 becomes +30%→+20%); raw values and calculations remain intact. Season 52 includes Knight and Barbarian HP/damage bonus reductions, Bomb Tower reciprocal speed with sec⁻¹ units, and independent Snowball slowdown buff/damage nerf. Magic Archer’s source +33% conflicts with 0.5→0.8 seconds; display uses calculated +60% with original quote preserved.

Season 53 Effective DPS is verified as a standalone -18% with no missing-before dash/arrow. Knight’s rate values use hits/sec without a duplicated seconds suffix. Royal Recruits Evolution’s damage bonus follows the general multiplier presentation (+12%→+6%).

Season 54 Archers Evolution Power Shot 215→184 is verified at Level 11 through RoyaleAPI’s release screenshot: evo-archers-info.jpg explicitly shows Level 11, Showing Challenge Levels and Power Shot Damage 215. The December 13 report matches that before value and gives 184 after. The exact matching delta receives a public evidence overlay with image URL/SHA-256; raw history remains unchanged. Image hash 17f42c6fcad99446845b7b4ca4e7f8b7e0a6d69276b84db3fbb253ac9d61e1ec. Goblin Giant’s source mislabeled Hit Speed HP/sec is displayed as hits/sec.

January 3, 2024: six relative-only deltas are supplemented by RoyaleAPI season-55-balance absolute pairs. Level 11 baseline cross-checks: Little Prince guide explicitly gives110 tournament-Level11 damage and compares Guardienne1800HP with Knight1766; pinned899e45efc765fbf3902927bb2e37dc04a78f7823 game tables give GiantSkeleton2140HP×160%=3424, SkeletonWarrior150shield×160%=240, BombSkeletonProjectile87damage×256% floored=222, GoldenKnight310DashDamage at Champion tournament index0. The January table matches those before values and supplies their after values (1600/100/3616/256/230/335). Original Supercell percentage-only rows remain untouched. Retained January HTML SHA256777c5fd846a97bb038f265e1b7e9f407b817ab1a53ea95914cda64ffffd95975. Royal Recruits charge296→273 lacks an independently established level here; its sourced -8% remains visible without promoting the absolute values. Numeric January percentages derive from confirmed pairs where the broad Supercell quote contains multiple deltas or different rounding.

March 2024 Season 57 review: Level11 HP overlays show Goblin Giant3336→3232 (August2023 source explicitly labels3336 Level11), Monk2000→2150 (pinned March2023 Champion table HP2000), and Goblin Drill1440→1312 (pinned table Epic HP900 ×160%). March final report supplies matching before/after values. Raw imports remain unchanged. Magic Archer HTML incorrectly says800/700 Seconds; the report's final v2 graphic explicitly shows0.8→0.7, used by a source-linked correction. Each multi-stat quote now supplies its own percentage for this patch; Drill duration/first spawn buffs and HP nerf display independently. Evolution multipliers display signed bonuses over Base and attack rates retain hits/sec units. March18 fixes remain: Supercell's game-update-lucky-drops article, under Quality of Life & Bug fixes, explicitly mentions spell destruction of Evolved Skeletons and the Tesla/Wall Breakers inconsistency.

May 2024 Season59 review: shared Base HP increases for Royal Giant and Royal Recruits use Base/Evolution icons, followed by separate Evolution bonus reductions. RG total Level11 HP3379→3164 uses the explicitly Level11 August2023 after-value and May's now-unbonused base value. Recruits shows the verified resulting547HP only: do not manufacture an exact old total from a rounded bonus. The source graphic and official article say1.11x, despite RoyaleAPI's HTML table saying1.1. Evolved Barbarians' rows show both Barbarians Evolution and Battle Ram Evolution icons; duplicate Ram component rows are hidden from presentation only. Ram's heavy-troop pushback nerf remains.

Eight May Level11 overlays preserve the raw ledger. RoyalGiant1200×256%=3072 and Recruit208×256%=532(floored) establish the source's starting HP level. Valkyrie's January Level11 release panel explicitly shows76 tornado damage; Duchess's April Level11 panel shows3204HP. The Cannoneer422 comparison pairs with Level11 Princess109damage/3052HP and the Duchess release comparison. The final May graphic uses these same independently corroborated Level11 baselines; its WallBreaker runner392→196 and Poison224→184 total tower damage are therefore read at that same level. Poison's8-second duration gives28→23 per second, matching the official article. These latter two rely on the graphic's consistent normalization, not an explicit level label on their individual rows. Earlier WallBreaker release-preview runner195 is not substituted for the May final report. Archers184 comes from the verified December patch; May restores2x PowerShot, matching the November Level11 release value215 and August2025 before-value215. Do not multiply184 by the rounded18%.

References: [final May report](https://royaleapi.com/blog/season-59-balance), [final v3 graphic](https://cdns3.royaleapi.com/static/img/blog/2024-05-season-59/balance/v1-d7b14121/s59-balance-05-72-1.jpg), [Valkyrie Level11 panel](https://cdns3.royaleapi.com/static/img/blog/2024-01-season55/evo-valk/v1-c567b08f/evo-valkyrie-info-01.jpg), [Duchess Level11 panel](https://cdns3.royaleapi.com/static/img/blog/2024-04-season58/dagger-duchess/v1-adff1775/s58-dagger-duchess-01-300-5.jpg). Component percentages are taken from the matching stat line instead of the first percentage in a multi-stat paragraph. All rework rows have separate buff/nerf directions. Zap's later-strike damage multiplier remains a multiplier, not an Evolution stat bonus over Base.

June 2024 S60 review: source-specific overlays use RoyaleAPI's final season-60-balance table for Giant1.6→1.2tiles, Prince/RamRider charge3→1.5tiles, Guardian first hit0.2→0.5s (official article's2→5sec is erroneous), Knight+10→0%HPbonus, Tesla192→148pulse/1→0.5sstun, SpearGoblins0.5→0.3s, DartGoblin131→142, Cage742→780, Void0.4→1s first hit and0.667→0.769hits/sec, and Duchess153→112/0.606→0.8hits/sec/8→6daggers. Only the SpearGoblins row is displayed, with Gang/Giant/Hut icons and historical Hut artwork. Raw duplicates remain in the ledger. Component quotes prevent unrelated percentages being copied across rows. Level11 evidence: prior DartGoblin CSV proof(raw62×212%), Cage raw350×212%=742, Tesla release explicitly192 at tournament standard, Duchess Level11 release153. LittlePrince399 uses the final report's consistently corroborated Level11 scale; release guide rounds the charge to400.

June19 emergency report supplies GoblinMachine588→391 rocket damage and588→195 tower damage. The release guide explicitly says Level11 and588 for both targets; tower damage's new50% multiplier stacks with the rocket nerf, giving approximately-67% overall. Hit time3.5→4s and hit rate0.286→0.250 are distinct. BattleHealer passive healing33→0HP/sec is included as a supplemental reported change with an unknown effective date and a visible already-applied note; it does not claim June19 was its effective date. Sources: https://royaleapi.com/blog/season-60-balance-emergency and https://royaleapi.com/blog/goblin-machine-new-card-2024-summer-update . Healer uses the emergency table's tournament-standard normalization. Tesla fixes remain sourced to https://supercell.com/en/games/clashroyale/blog/release-notes/game-update-june-17/ under BUG FIXES: missing pulse when dying without an attacker, and frozen deployment behavior.

Timeline-wide UI: muted dark category backgrounds, smaller inherited-font headings/stat labels and18px values, lighter font weights, and direction symbols based on each stat's gameplay effect (↑buff, ↓nerf, ⟳rework/fix). Comparison and staged Elixir rows follow the same convention. Navigation is unchanged. This is a dark-theme revision; no new light-theme switch was introduced.

Dark display-theme follow-up: restored the newer condensed display typography, patterned blue/gold banner, larger artwork, rounded cards and subtle depth on dark surfaces. Locally served Barlow Condensed SemiBold (600, Google Fonts/ofl/barlowcondensed under existing OFL) replaces the prior ExtraBold face for this theme. Titles24px/statlabels18px retain the display style while values stay18px. Removed stat-title direction markers from the DOM; only the before/after value separator carries the change arrow. Desktop/mobile browser review and check/build passed.


Season 61 audit (July 2, 2024): all eight cards / fourteen imported deltas reviewed against [RoyaleAPI's final report](https://royaleapi.com/blog/season-61-balance-2024-july). A preview overlay preserves the raw import, IDs and original quotes, matches each original numeric pair/unit before applying corrections, and retains the exact individual table row as its new quote. This prevents another component's percentage from leaking into the display. Reapplying the overlay is idempotent. Source-rounded percentages below are retained; timing and frequency have separate percentages.

| Card | Stat | Before → After | Change |
| --- | --- | --- | --- |
| Goblin Curse | Radius | 4 → 3 tiles | −25% |
| Goblin Curse | Damage amplification | 35% → 20% | −43% |
| Goblin Demolisher | Death damage, Level 11 | 465 → 404 | −13% |
| Goblin Demolisher | Death damage radius | 3 → 2.5 tiles | −17% |
| Goblin Demolisher | Hit time; hit speed | 1.1 → 1.2 s; 0.909 → 0.833 hits/sec | +9%; −8% |
| Goblin Machine | Hitpoints, Level 11 | 2598 → 2196 | −15% |
| Goblin Machine | First hit time | 0.2 → 0.5 s | +150% |
| Prince | Charge distance | 1.5 → 2 tiles | +33% |
| Ram Rider | Charge distance | 1.5 → 2 tiles | +33% |
| Wizard Evolution | Shield hitpoints, Level 11 | 371 → 296 | −20% |
| Dagger Duchess | Depleted hit speed | 0.800 → 0.741 hits/sec | −7% |
| Dagger Duchess | Burst hit speed | 2.86 → 2.22 hits/sec | −22% |
| Tesla Base / Evolution | Ordinary attack damage, Level 11 | 230 → 220 | −4% |
| Tesla Base / Evolution | Hit time; hit speed | 1.1 → 1.2 s; 0.909 → 0.833 hits/sec | +9%; −8% |

All rows are gameplay nerfs, including increased hit times and charge distances. Only the value separator carries the downward arrow, retaining the approved dark theme. Prince/Ram Rider's raw source-unit 150→200 is resolved by RoyaleAPI's explicit tile units. Tesla's [Evolution release guide](https://royaleapi.com/blog/tesla-evolution-2024-march) says its other stats remain the same as Base: both ordinary attack rows show the Base/Evolution icons without duplicating pulse damage or extending the change to later forms.

Level 11 evidence: [Demolisher release](https://royaleapi.com/blog/goblin-demolisher-new-card-2024-summer-update) explicitly states tournament standard (level 11) and Death Damage465; [Machine release](https://royaleapi.com/blog/goblin-machine-new-card-2024-summer-update) gives2598HP at that level; [Wizard release](https://royaleapi.com/blog/wizard-evolution-2024-may) explicitly says its Level11 shield has371HP. July matches each starting value and supplies its after value. Tesla's pinned [March2023 game data](https://github.com/smlbiobot/cr-csv/tree/899e45efc765fbf3902927bb2e37dc04a78f7823/assets/csv_logic) has buildings.csv Tesla Damage90 and rarities.csv Common tournament index10/multiplier256%, giving floor(90×256/100)=230. July matches230 and supplies220. These four proofs are scoped to their exact deltas, not an article-wide assumption.

Duchess source conflict: the official import says depleted dagger charge0.8→0.9 seconds, while RoyaleAPI says depleted hit speed0.800→0.741 hits/sec. These are not reciprocals. The reviewed display follows the requested final RoyaleAPI table, consistent with June's already-verified0.8hits/sec starting rate, and retains the conflicting official values in the raw ledger/originalQuote. Burst0.35→0.45seconds is consistent with the final rounded2.86→2.22hits/sec; its rate reduction is−22%, not the+29% increase in interval. No reciprocal timing is invented for the depleted-rate row.

RoyaleAPI explicitly says “These will go live on 2024-07-02 Tuesday, around 8-9am UTC.” The overlay therefore confirms the July2 effective day (day precision only), replacing publication-day uncertainty, and labels the season July2024 · Season61. Raw database data remains untouched.

Retained evidence: `.local/evidence/season-61-audit/royaleapi.html` and `rows.json` (14 extracted table rows). Final report HTML SHA256: `f4ced03101219b8609eefc7681e7e4049307c736db35e7101c31b5cea88bbd18`. Pinned Tesla buildings.csv SHA256: `317e78ed5ba4284fa5e6a3ab4a1bf4ad07b7a6a0d9550ba5128b17f64e8e5aca`; rarities.csv SHA256: `6208e65d4f26d3e9b3d7fe424902cc03b21927f66f227f477734b099ec3a3876`.

Archived goblin-demolisher-new-card-2024-summer-update HTML SHA256: `f38cbce78c63b74eceb3c29895d1314729c6451563f97a25de8bfa361e8f3044`.

Archived goblin-machine-new-card-2024-summer-update HTML SHA256: `9cc65ce152658a11adebfedc9d0655568390fe78e9f641f8c90dc24de6fa406d`.

Archived wizard-evolution-2024-may HTML SHA256: `302062c9fc85bd83be3d31591d2c303c51bf4f4db6a6c2d9f45112ee3e4f84e6`.

Archived tesla-evolution-2024-march HTML SHA256: `783dacddc4728865860b140232b64fd30144db26013e5037d647c0b053730a98`.

Publishing prerequisite found during S61 verification: fourteen official artwork URLs now return different PNG bytes. The already approved originals remain available in the saved preview and match assets.json byte lengths/SHA256. Those exact public originals are retained in pinned-assets/; build.mjs validates and copies them before downloading the remaining174 images. No manifest hashes, displayed artwork or canonical observations change, and mismatched pinned files fail the build. This avoids relying on mutable upstream URLs for those14 images.

Season 62 audit (August 6, 2024): all eleven affected forms / twelve distinct changes checked against [RoyaleAPI's final report](https://royaleapi.com/blog/season-62-balance). Its thirteen table rows include Wizard's shared HP twice (Base and Evolution); the UI keeps one HP change with both icons and an independent Evolution shield nerf. Seven scoped Level 11 proofs restore absolute combat values. Raw imports, IDs and quotes remain intact; overlays require exact original values/units and are idempotent.

| Card/form | Stat | Before → After | Source change |
| --- | --- | --- | --- |
| Arrows | Total Crown Tower damage, all 3 waves | 111 → 93 | −16% |
| Goblin Drill Evolution | Goblins spawned on second submerge | 2 → 1 | −50% |
| Wizard Base / Evolution | Hitpoints | 720 → 754 | +5% |
| Wizard Evolution | Shield HP | 296 → 190 | −36% |
| Cannon Cart | Shielded hit time; hit rate | 1 → 0.9 s; 1.00 → 1.11 hits/sec | −10%; +11% |
| Electro Wizard | Deploy damage radius | 2.5 → 3 tiles | +20% |
| Goblin Machine | Rocket hit time; hit rate | 4 → 3.5 s; 0.250 → 0.286 hits/sec | −13%; +14% |
| Hunter | Hitpoints | 838 → 884 | +5% |
| Ice Wizard | Attack splash radius | 1 → 1.5 tiles | +50% |
| Void | Damage per strike, 1 target | 544 → 472 | −13% |
| Void | Damage per strike, 5+ targets | 48 → 76 | +58% |
| Skeleton Dragons | Hitpoints, interaction bug fix | 563 → 560 | −1% |

Wizard and Void show independent buff/nerf directions within their reworks. Skeleton Dragons has the sourced bug-fix classification and an explanation of the two-hit Wizard interaction at both Level 11 and Level 15. Source-rounded percentages are retained: Hunter's final RoyaleAPI table says +5% (official import says +6%); Skeleton Dragons says −1% (official import gives unsigned >1%). Original quotes are retained. The final report explicitly confirms August 6 Tuesday as the effective day, separate from its July 31 publication and the official article's August 6 publication; day precision and the S62 label are confirmed in the overlay.

Level 11 evidence: the [Void release guide](https://royaleapi.com/blog/void-2024-may) explicitly normalizes its following tables to Level 11, giving Arrows 111 total tower damage, Void 544 per strong beam and 48 per weak beam. August matches those baselines and supplies after values. Existing pinned February 2023 verifications independently reproduce Wizard 720 HP (340×212%, floored) and Hunter 838 HP (524×160%, floored); August supplies 754 and 884. Wizard's [May release](https://royaleapi.com/blog/wizard-evolution-2024-may) labels 371 shield HP at Level 11, the reviewed [July report](https://royaleapi.com/blog/season-61-balance-2024-july) gives 371→296, and August gives 296→190. Skeleton Dragons' final report explicitly compares the Level 11 interaction to Level 15 alongside its 563→560 table. Current screenshots never fill historical gaps.

Arrows 111→93 is full-cast damage, not one wave. Its reviewed delta has `damageScope:cast`, a three-wave note, and no single-hit mapping/comparison. Void's two target tiers map to their respective nonaggregate per-strike rows, excluding aggregate and Crown Tower values.

Suspicious Bush visibility: read-only inspection confirmed it already exists in `meta_official_dev`, the saved export and the live catalog: one Base form, a 2-elixir Level 11 observation, Bush 81 HP and separate Bush Goblin stats. No duplicate card/observation was added. Catalog searches with active version/type/cost filters now explain that matching cards exist and offer “Show matching Base cards”, preserving the search term while clearing blocking filters. Its release keeps July 30, 2024 and calendar-month placement in July. Its season-content placement is S62, following [RoyaleAPI's Goblin Cage release](https://royaleapi.com/blog/goblin-cage-evolution-new-card-2024-august): “Technically, Suspicious Bush was released in Season 61, but for content release and creation it has been considered part of Season 62.” A visible release note states this distinction. Launch-preview stats remain separate from later screenshot observations. The local release generator preserves the correction on replay.

Retained final report: `.local/evidence/season-62-audit/royaleapi.html`, with thirteen extracted rows in `rows.json`; HTML SHA256 `74915358d91b8cc943a6cb072b7b0e2118da1e6e2f636f01a297b1c220add00d`.

Archived void-2024-may HTML SHA256: `8788fbae8dde105b156b1f14f59a86e7899337b930d23a7b9478be7704e7830a`.

Archived goblin-cage-evolution-new-card-2024-august HTML SHA256: `59b89a9013cdca92a3ffed862c300ccdb283432721ae7fe6b542d9be3ffec635`.

Archived suspicious-bush-2024-august HTML SHA256: `605b05668b88cc0a6d68b06ac5933b3c59a84a547ad456663b7145309b32def3`.


Season 64 audit: [RoyaleAPI's final October report](https://royaleapi.com/blog/season-64-balance), published October4, confirms an October8 effective day. All18 source sections /22 table rows are reconciled with23 imported deltas (Bomber appears twice for Base/Evolution). Display merges the matching Bomber change into one row with both icons; both raw form records remain. The17 parent cards display22 distinct change rows. The October17 maintenance is also audited below. No raw imports or database observations are overwritten.

| Card/form | Stat | Before → After | Change / direction |
| --- | --- | --- | --- |
| Bomber Base / Evolution | Damage | 230 → 225 | −2%, nerf |
| Goblin Demolisher | Lifetime after50%HP | 10 → 7 s | −30%, nerf |
| Void | Damage per strike,1target | 472 → 320 | −32%, nerf |
| Mortar Evolution | First hit time | 0 → 1 s | Nerf; percentage undefined from zero |
| P.E.K.K.A Evolution | Heal per kill | 471 → 376 | −20%, nerf |
| Tesla Base | Hit time; hit speed | 1.2 → 1.1 s;0.83 → 0.91 hits/sec | −8% interval;+9% rate, buff |
| Tesla Evolution | Death shockwave | Present → Removed | Nerf |
| Wizard Evolution | Shield knockback | 4 → 3 tiles | −25%, nerf |
| Cannoneer | First hit time | 0.6 → 0.8 s | +33%, nerf |
| Cannoneer | Damage | 401 → 386 | −4%, nerf |
| Goblin Curse | DPS | 25 → 30 HP/sec | +20%, buff |
| Goblin Machine | Hitpoints | 2196 → 2304 | +5%, buff |
| Skeleton Barrel | Death damage | 133 → 145 | +9%, buff |
| Suspicious Bush | Bush movement speed | 45 → 60 | +33%, buff |
| Goblin Cage Evolution | Capture DPS; hit speed | 306 → 337 HP/sec;0.91 → 1.00 hits/sec | +10%, buff |
| Goblin Drill Evolution | Second/third emergence damage+knockback | Present → Removed | Nerf |
| Goblin Drill Evolution | Submerge Goblin deployment delay | No added delay → Added | Nerf |
| Goblin Drill Evolution | Second-submerge spawn | +1 Goblin | Buff; total count not invented |
| Zap Evolution | Third strike | Present → Removed | Nerf |
| Zap Evolution | Second strike damage | 94 → 192 | +104%, buff |
| Magic Archer | Hitpoints | 532 → 531 | Bug fix,−1HP (−0.2% calculated) |
| Mother Witch | Hitpoints | 532 → 531 | Bug fix,−1HP (−0.2% calculated) |

Every displayed component has its own percentage and direction. Cannoneer401→386 no longer inherits its first-hit percentage. Tesla's raw1200→1100 and Cannoneer's600→800 are resolved with explicit seconds in the final report/official intervals. Goblin Cage's capture damage ticks change from1.1s to1s; the released Brawler's damage remains unchanged. Goblin Drill and Zap retain overall rework badges while their individual rows show buffs/nerfs. Mortar's real zero is retained without division by zero. Both one-HP fixes retain source0% rounding in their quotes, display the actual532→531 pair, and give the calculated−0.2% plus a−1HP note. Qualitative mechanics (such as removal of damage/knockback) remain visible without a numerical-level proof; they are not numeric combat observations.

Level11 evidence is scoped to matching original IDs, form IDs, numeric pairs and units. Bomber230 is in the explicitly Level11 [Demolisher release guide](https://royaleapi.com/blog/goblin-demolisher-new-card-2024-summer-update); the official October note explicitly names both Base/Evolution. Void472 follows the reviewed August544→472 delta anchored by the explicit Level11 release table. Cannoneer401 follows May's reviewed422→401. Goblin Curse's release explicitly gives25HP/sec at tournamentLevel11. Machine2196 follows the verified July2598→2196. Pinned game tables at899e45efc765fbf3902927bb2e37dc04a78f7823 give SkeletonBalloon's death-spawn SkeletonContainer (characters.csv); buildings.csv SkeletonContainer DeathDamage52 ×CommonLevel11 multiplier256%, floored=133. The same archive gives GoblinBrawler Damage159 ×Rare212%, floored=337; the Evolution release says capture damage is identical to Brawler damage, with1.1s interval and306DPS. Thus capture interval1s gives337DPS without asserting a Brawler damage buff.

Magic Archer's pinned EliteArcher HP440 ×Legendary121%, floored=532, and Mother Witch's independently retained February2023 WitchMother HP440 ×121%=532 establish both before values. The final October tables supply531. Zap's Level11/ShowingChallengeLevels comparison image explicitly gives192 damage. The final report's second-strike94→192 is retained: “half damage” is qualitative evidence, not permission to replace94 with96 by arithmetic. Void is mapped to its per-strike single-target row; no multi-strike total becomes a single hit.

P.E.K.K.A source conflict: both final official/RoyaleAPI notes give471→376 healing per kill. The [release article](https://royaleapi.com/blog/pekka-evolution-new-card-2024-september) prose gives470 (12.5% of3760). Its retrieved comparison graphic labels BaseLevel11 and shows both forms at3760HP, with Evolution healing376, corroborating the final after-value. We preserve471→376 from the final reports and retain the prose470 discrepancy explicitly; we do not claim to independently reproduce471 from the12.5% formula. The article's “What's New” HP wording is not treated as a separate HP nerf; the detailed table changes healing.

[October17 official maintenance](https://supercell.com/en/games/clashroyale/blog/release-notes/maintenance-bug-fixes-and-balance-changes-2/) explicitly supplies Lightning Link duration5→4s(−20%), Crown Tower damage(Level11)71→46(−36% source annotation), and cooldown15→17s(+13%). These three nerfs use their own exact source line rather than all copying−20% from the shared paragraph. The displayed damage percentage is corrected to−35.2%, calculated from71→46, with a visible note identifying the official−36% discrepancy; the original source annotation remains in the quote. Electro Dragon Evolution's failure to chain to invisible troops remains a bug fix, matching the same official note. Both October8 and17 are labeled Season64. No preview release numbers replace these maintenance values.

Retained evidence: `.local/evidence/season-64-audit/royaleapi.html` and22 extracted table rows in `rows.json`, plus `s64-emergency.html`, `s64-pekka-2.jpg`, `s64-zap-2.jpg`. The two exact image URLs and hashes are recorded in each public Level11 proof. Raw imports remain unchanged; the overlay is idempotent and exact-match guarded.

royaleapi.html SHA256: `72768d4b6632a92b1e7c898e47e07bfa7941f2ece63b7e936a2974c24026f673`.

s64-emergency.html SHA256: `f35f657d7acc38f0026e0f1411fba4cd3579b934d795ea7e665c2976b8b38da3`.

s64-pekka-2.jpg SHA256: `db31f5ff352c562caf0a1b24ec20eaaea34df7a964475ee7d5b42f245fa9209c`.

s64-zap-2.jpg SHA256: `3168dcdb0e7bf87b63689878bbc7e2f61c52dcb9dfb86face40aed6e974641a2`.

Season 65 audit: [RoyaleAPI's November report](https://royaleapi.com/blog/season-65-balance-november-2024) contains five cards / six stat rows. The existing official import has four cards / five rows; the missing fifth card is Cannon Evolution's pre-release Deploy Barrage Crown Tower damage adjustment. All six rows now appear, with scoped Level 11 evidence and the pre-release status visible. Raw imports and database observations remain unchanged.

| Card/form | Stat | Reviewed before → after | Change |
| --- | --- | --- | --- |
| Ram Rider | Ram damage | 266 → 250 | −6% |
| Ram Rider | Ram charge damage | 532 → 500 | −6% |
| Goblinstein | Monster HP | 2752 → 2598 | −6% |
| P.E.K.K.A Evolution | Heal per kill | 376 → 282 | −25% |
| Musketeer Evolution | Sniper damage per bullet | 326 → 392 | +20% |
| Cannon Evolution | Deploy Barrage Crown Tower damage | 320 → 79 | −75%, pre-release report |

P.E.K.K.A conflict: RoyaleAPI lists 281 after, while [Supercell's final November note](https://supercell.com/en/games/clashroyale/blog/release-notes/november-balance-changes/) explicitly lists 282. The reviewed display keeps the primary source's 282, which is exactly 25% below 376, and visibly identifies RoyaleAPI's 281. Both quotes/values are retained in sourceConflict and the original import is preserved. The label is “Heal per Kill”, consistent with the mechanic; the primary source calls it “Heal per death”.

Level 11 evidence: pinned March 2023 characters.csv Ram Damage220 and DamageSpecial440 at Legendary multiplier121% give 266 and532 after flooring. Both November reports match those starting values and supply250/500; the Rider's separate snare damage is unaffected. Goblinstein's release guide explicitly gives Monster2752HP at tournament standard, alongside independently established Level11 controls such as Knight1766HP; November gives2598. The Monster HP change maps to the Monster component panel, never Doctor HP. P.E.K.K.A376 was verified in the S64 Level11 comparison graphic; the primary November note supplies282. Musketeer's release comparison image explicitly shows Level11/Showing Challenge Levels and326 Sniper Damage; both final November sources give392. Snipe remains unable to target Crown Towers. Ram charge remains limited to buildings and Crown Towers, so newly visible values do not create incompatible troop matchups.

Cannon's [release guide](https://royaleapi.com/blog/cannon-evolution-new-card-2024-november) explicitly labels Deploy Barrage320 damage at tournament standard(Level11). The November report supplies Crown Tower320→79. This is a report before release, absent from the primary November balance note; its precise effective day is not established. The supplemental row retains reviewStatus:preview, a visible pre-release note, and no inferred playable date. It is excluded from automatic/manual damage comparisons, historical combat anchors, and current-card stat supplementation. No ordinary Cannon attack nerf is inferred. The main November date remains uncertain: RoyaleAPI says “tentatively Thursday (November14)”, and publication of the official article on November14 alone does not confirm an effective day. The season is labeled November2024 · Season65.

Source access improvement: every event header in month/season views now links directly to its primary source and any additional reviewed change sources, with publisher labels. Date view also exposes additional reviewed sources. The S64 October17 Goblinstein nerfs and Electro Dragon Evolution invisible-chain fix are sourced to [Supercell's maintenance note](https://supercell.com/en/games/clashroyale/blog/release-notes/maintenance-bug-fixes-and-balance-changes-2/), under BALANCE CHANGES and BUG FIXES respectively. They are separate from RoyaleAPI's October8 final-balance report. The Supercell page was freshly checked during this review and still contains both sections; no separate RoyaleAPI article is claimed.

Retained evidence: `.local/evidence/season-65-audit/royaleapi.html`, six extracted rows in `rows.json`, `s65-official.html` and the Musketeer Level11 screenshot. Exact-match overlays check original IDs, pairs, units and form IDs, and are idempotent. Source conflicts and preview status remain explicit.

royaleapi.html SHA256: `1f15ac7e94bbc3213b4b00e7977c6b825e6989fdfcd4f40b356e214754e95f03`.

s65-official.html SHA256: `08f723c8483d21369c7da9e859406e64b940045986274c39809a5c480d686fdc`.

s65-musketeer.jpg SHA256: `ab10af735c64c47ff586f1e9ec096083d45d9adb40163b9ba885c2fcd6b89cf2`.
