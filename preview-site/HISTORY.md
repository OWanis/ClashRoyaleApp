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
