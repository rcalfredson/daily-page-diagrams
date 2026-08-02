# Temperature–entropy reading diagram

A small, code-authored SVG figure for the Daily Page pillar article **How to Read a Temperature–Entropy Diagram**.

The figure is deliberately schematic. It teaches a reading sequence without implying a named cycle, phase region, numerical dataset, or universal area-equals-heat rule.

## What the geometry establishes

- A → B is vertical, so specific entropy is constant.
- B → C changes both temperature and specific entropy.
- C → D is horizontal, so temperature is constant.
- D → A changes both coordinates and closes the cycle.
- Arrows establish the order A → B → C → D → A.

The light interior fill makes the closed geometry legible. The annotated view explicitly warns that assigning physical meaning to that area requires additional assumptions.

Arrowheads are attached directly to the process paths with SVG `marker-mid`. The curved paths are split at exact points calculated from their cubic Bézier geometry, so each arrowhead inherits the true local tangent instead of approximating the contour with a separate overlay stroke.

## Generate the SVG files

```bash
node render.js
```

This writes clean and annotated SVGs into `output/` from the single source in `diagram.js`.

## Render PNGs

With Inkscape installed:

```bash
inkscape output/ts-reading-clean.svg \
  --export-type=png \
  --export-width=1800 \
  --export-filename=output/ts-reading-clean.png

inkscape output/ts-reading-annotated.svg \
  --export-type=png \
  --export-width=1800 \
  --export-filename=output/ts-reading-annotated.png
```

Open `index.html` to switch between the two views and download either SVG directly. No build step or package installation is required.

## Suggested article use

- Use the clean version when the unfamiliar diagram is first introduced.
- Return to the annotated version after the reading method has been explained.
- Publish a PNG in the article if that best fits the content pipeline, while linking this source as the reproducible original.

## Accessibility

Each generated SVG contains a `<title>` and `<desc>`. The state labels and annotations remain live SVG text rather than outlines.
