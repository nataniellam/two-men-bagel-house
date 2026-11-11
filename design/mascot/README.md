# Bagel boys mascot — layered for animation

Traced from `public/img/tmbh-bagel-boys-cap.png` (original in `two-men-bagels-landing/assets/source/`) with potrace 1.16. The outlines are the original art, not redrawn; the layered files match the PNG to within about 0.05% of pixels.

| File | What it is |
| --- | --- |
| `bagel-boys-trace.svg` | The whole artwork as one trace |
| `bagel-boys-parts.svg` | Both characters, split into animatable parts |
| `bagel-boy-left.svg` | Left character only (coffee, cigarette, smoke) |
| `bagel-boy-right.svg` | Right character only (cap backwards, free waving arm) |
| `parts-map.png` | Parts in colour, with pivots marked as red crosses |
| `pose-test.png` | Stride and wave test poses |

## Parts (SVG classes)

Each part appears twice with the same class: a white backing (the shape with its holes filled, grown by 16px) inside `.bb-back`, and the black art inside `.bb-art`. All backings sit behind all the art, so the characters read on black sections without a white edge crossing any joint. Each part's `transform-origin` is already set to its pivot, so `transform: rotate(…)` on the class swings both copies from the right place. The characters' outer groups keep the ids `left` and `right`.

- **Left:** `left-leg-back`, `left-leg-front` (each with its shoe, pivot at the hip), `left-body` (with cap), `left-arm-cigarette` (shoulder), `left-smoke` (base of the wisp), `left-arm-coffee` (shoulder)
- **Right:** `right-leg-back`, `right-leg-front` (hip), `right-body` (with cap and the cigarette arm, which stays put), `right-arm-wave` (shoulder)

Each leg reaches up behind the body by about 30px, so no gap opens at the hip when it moves.

## Movement notes from the pose test

- Legs: a waddle (each leg lifting in turn) reads better than alternating swings, which cross the feet on these front-facing characters.
- Right wave: rotate `right-arm-wave` to about 150–160deg, then wiggle ±15deg.
- Left cheers: keep `left-arm-coffee` within about −20deg, or the arm starts to look as if it grows out of the cap brim.

## Regenerating

1. `tools/analyse.py` labels the separate black shapes of the flattened mascot.
2. `tools/split.py` groups them into parts, cuts the legs, traces each part and its backing with potrace, and writes `bagel-boys-parts.svg`. Both need numpy and scipy.
3. `python3 design/mascot/tools/build-art.py` (from the project root) writes the two per-character SVGs and `components/bagel-boys/art.ts`, which the site uses.
