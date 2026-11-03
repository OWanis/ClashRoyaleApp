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
