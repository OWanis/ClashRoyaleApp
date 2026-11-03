# One-shot explorer

A Level 11 numerical breakpoint guide, derived in the browser from the same immutable screenshot observations as the card explorer. No canonical stats are changed. `one-shot-model.js` implements the calculation; `one-shot-ui.js` renders it. Run `npm test` in this directory.

## Ranking

Use one observation per form, preferring the imported Drive batch; do not combine observations across dates. Read HP and damage fields from ordinary, ability, component and alternate-deployment panels. Keep each context, form and special attack separate. Deduplicate repeated source-panel fields by stable form ID, panel kind, context, field and raw value. Retain source observation and panel references.

Rank descending by numeric value. Equal amounts put damage before HP (equality reaches the HP threshold), followed by card name, version, field label and stable entry ID. Original positions are assigned within the selected version scope before stat-type and search filters; filtered numbering assigns consecutive positions after those filters. Base is the default scope; Evolution, Hero and All are available.

- Scalar damage is one displayed hit. A `43-847` range becomes minimum and maximum entries.
- Reviewed multiplier profiles create separate individual-hit and attack/cast-total entries. Totals retain the raw screenshot value, formula, source observation, and mechanic conditions. Unknown multiplier profiles remain individual-hit only.
- Shield, maximum/minimum and component HP retain their own labels. HP is per unit, never multiplied by troop count.
- Damage/sec, percentages and ambiguous values are excluded and listed in Coverage. No tick intervals, shield overflow or DPS conversions are inferred. Totals use only the displayed damage and count with explicit mechanic profiles.

## Matchups

Compare opposite-type entries across all Base, Evolution and Hero versions, independent of the ranking's version, search and type filters. Damage >= HP reaches the selected HP threshold; otherwise report HP minus damage. This assumes all hits required by the selected entry connect, full starting HP in the displayed state, and no active defense/healing. It is not a simulation or a guarantee that an attacker can hit the target. Air/ground mobility, range, timing, active abilities and whole-swarm/death-spawn resolution are not fully modeled.

Explicit building-only targeting blocks ordinary troop targets. Crown Tower damage applies only to main Tower Troop HP entries. When a separate Crown Tower field exists, ordinary damage is not applied to tower HP. HP fields alongside shield/reduction stats are sent to a mechanic-check group. A separate shield HP row means shield break only, never a unit kill. Conditional attacks and states remain labeled.

Tests cover thresholds including equality, surviving HP, shields, Crown Tower targeting, building-only targeting, range endpoints, per-hit multipliers, DPS exclusions, deduplication, deterministic tie ordering, and original/filtered positions. Browser checks cover tab navigation, filters, both numbering modes, clickable reciprocal matchups, Escape, empty states, versions, and desktop/mobile layout.

## Matchup views

Icons (default) and Details share exactly the same comparisons. View choice persists while browsing entries in the current page session. Matching stats are grouped by the parent Base form ID, panel kind, component/ability context and exact stat label within each outcome section. Each version retains its own value, source and clickable icon; different outcomes never collapse into the same group. Special attacks and HP states remain separate. Groups order versions Base, Evolution, Hero. The selected stat also has version buttons where an equivalent displayed stat exists; missing values are never inherited from Base.

Regression coverage includes Bats 81 Base / 122 Evolution HP against a 99-damage hit, Tesla 220 Base / 351 Evolution damage against 304 HP, and grouped Knight Base/Evolution/Hero damage icons.

## Multiplier corrections — November 3

Owner authorized replacing the blanket per-hit-only rule after confirming Firecracker's direct-impact versus spread mechanic. Profiles bind to canonical parent IDs and exact stat fields, covering all available versions without copying Base stats into other forms. The immutable screenshot data is unchanged.

| Card | Individual | Calculated total | Condition |
| --- | --- | --- | --- |
| Firecracker | 64 spread fragment | 320 direct hit | All five at direct impact; do not add spread again |
| Hunter | 84 pellet | 840 volley | All ten pellets connect on the same target |
| Electro Wizard | 117 bolt | 234 attack | Both bolts on one target |
| Executioner | 179 pass | 358 attack | Outgoing and return both connect |
| Executioner Evolution close quarters | 240 pass | 480 attack | Both passes connect |
| Arrows | 122 wave | 366 cast | All three waves connect |
| Arrows Crown Tower | 25 wave | 75 cast | All three waves connect |
| Magic Archer Hero Triple Threat | 46 projectile | 138 potential total | Same-target behavior unverified; mechanic-check results only |

Profiles encode the owner-approved mechanic interpretation, not an additional official source. Calculation and conditions are visible in both compact and detailed matchup views. Attack/cast totals are not labeled single-hit kills. Shielded body comparisons remain mechanic checks, because the total alone cannot resolve hit-by-hit shield behavior. Electro Wizard Hero ability DPS remains excluded.

## Isolate a card

The exact-card selector filters by canonical Base form ID after global rank assignment. Selecting a card switches to all versions, both stat types and an empty text search, preserving the numbering preference. Its HP, shield, attack states and component entries remain separate. Search and stat/version filters can then narrow the isolated list. Original numbers stay global to the selected version scope; filtered numbering is consecutive within the visible isolated rows. Full-stats buttons open each documented form in the card explorer. Matchups still include all cards/forms. Show all cards clears only isolation; Reset returns every ranking filter to its default.
