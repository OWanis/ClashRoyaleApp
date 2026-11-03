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
