# One-shot explorer

A Level 11 numerical breakpoint guide, derived in the browser from the same immutable screenshot observations as the card explorer. No canonical stats are changed. `one-shot-model.js` implements the calculation; `one-shot-ui.js` renders it. Run `npm test` in this directory.

## Ranking

Use one observation per form, preferring the imported Drive batch; do not combine observations across dates. Read HP and damage fields from ordinary, ability, component and alternate-deployment panels. Keep each context, form and special attack separate. Deduplicate repeated source-panel fields by stable form ID, panel kind, context, field and raw value. Retain source observation and panel references.

Rank descending by numeric value. Equal amounts put damage before HP (equality reaches the HP threshold), followed by card name, version, field label and stable entry ID. Original positions are assigned within the selected version scope before stat-type and search filters; filtered numbering assigns consecutive positions after those filters. Base is the default scope; Evolution, Hero and All are available.

- Scalar damage is one displayed hit. A `43-847` range becomes minimum and maximum entries.
- `122 x3` becomes a 122 per-hit entry labeled with three hits, not a claimed 366-damage single hit.
- Shield, maximum/minimum and component HP retain their own labels. HP is per unit, never multiplied by troop count.
- Damage/sec, percentages and ambiguous values are excluded and listed in Coverage. No tick intervals, totals, shield overflow or DPS conversions are invented.

## Matchups

Compare opposite-type entries within the selected version scope, independent of the list's search/type filters. Damage >= HP reaches the selected HP threshold; otherwise report HP minus damage. This assumes a hit connects, full starting HP in the displayed state, and no active defense/healing. It is not a simulation or a guarantee that an attacker can hit the target. Air/ground mobility, range, timing, active abilities and whole-swarm/death-spawn resolution are not fully modeled.

Explicit building-only targeting blocks ordinary troop targets. Crown Tower damage applies only to main Tower Troop HP entries. When a separate Crown Tower field exists, ordinary damage is not applied to tower HP. HP fields alongside shield/reduction stats are sent to a mechanic-check group. A separate shield HP row means shield break only, never a unit kill. Conditional attacks and states remain labeled.

Tests cover thresholds including equality, surviving HP, shields, Crown Tower targeting, building-only targeting, range endpoints, per-hit multipliers, DPS exclusions, deduplication, deterministic tie ordering, and original/filtered positions. Browser checks cover tab navigation, filters, both numbering modes, clickable reciprocal matchups, Escape, empty states, versions, and desktop/mobile layout.
