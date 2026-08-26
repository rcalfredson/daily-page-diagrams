# Light-cone causal map

A reproducible, code-authored SVG for the Daily Page physics pillar article **Light Cones: What Can Affect What in Spacetime?** Its purpose is to answer a causal question: given event O and another event, could either event possibly affect the other?

## What the geometry establishes

The figure represents flat spacetime with time on the vertical axis and one displayed spatial dimension on the horizontal axis. The omitted spatial directions are compressed for readability; the geometry is a two-dimensional causal map, not a literal cone traveling through space.

- The upper interior is O's causal future: event F is timelike-separated from O and could be affected by O.
- The lower interior is O's causal past: event P is timelike-separated from O and could have affected O.
- The four diagonal rays are lightlike boundaries. Event L lies exactly on one boundary and is lightlike-separated from O.
- The left and right exteriors are spacelike relative to O. Event S is outside the cone and cannot exchange causal influence with O in the depicted relationship.

Coordinates use equal horizontal and vertical scales with units in which `c = 1`, so the light rays have slopes of ±1 and appear at 45 degrees. Relative to O at `(720, 480)`, the event offsets are F `(35, 285)`, P `(-60, -310)`, L `(320, 320)`, and S `(360, -120)`, where positive time points upward. These exact offsets make F and P timelike, L lightlike, and S spacelike.

## Generate and preview

From this directory, generate the canonical English SVG with:

```bash
node render.js
```

The equivalent explicit form is `node render.js --language en`. Both write `output/light-cone-causal-map.svg`. Open `index.html` in a browser for a responsive article-width preview and an SVG download link. No package installation or external JavaScript dependency is required.

Reader-facing SVG text is centralized in the `COPY` object in `diagram.js`. English is the only current entry, but another language can be added there without modifying geometry.

## Local PNG export

SVG is the canonical source and the PNG is only a publication derivative. With Inkscape installed, make an approximately 1800-pixel-wide local export using:

```bash
inkscape output/light-cone-causal-map.svg \
  --export-type=png \
  --export-width=1800 \
  --export-filename=output/light-cone-causal-map.png
```

Generated PNGs under `output/` are ignored by Git and should not be committed.

## Article use and accessibility

Intended caption:

> The light cone around event O. Time runs vertically and one spatial dimension runs horizontally; the omitted spatial directions are compressed for readability.

Suggested alt text:

> A spacetime diagram centered on event O, with causal past and causal future inside the light cone, light rays on its boundaries, and spacelike regions outside.

The generated SVG has `role="img"`, connects a meaningful `<title>` and detailed `<desc>` through `aria-labelledby`, and declares English with both `lang` and `xml:lang`. All labels remain live SVG text rather than outlined paths.
