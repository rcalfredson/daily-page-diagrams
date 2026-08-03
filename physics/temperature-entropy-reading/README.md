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

English is the default, so the existing command and filenames remain unchanged:

```bash
node render.js
```

This writes `ts-reading-clean.svg` and `ts-reading-annotated.svg` into `output/` from the single source in `diagram.js`.

Pass the language flag to generate the Spanish versions:

```bash
node render.js --language es
```

This writes `ts-reading-clean-es.svg` and `ts-reading-annotated-es.svg`, allowing the English and Spanish files to coexist. The short form `-l es` and the form `--language=es` are also supported. Run `node render.js --help` for usage information.

Portuguese is available with the same flag:

```bash
node render.js --language pt
```

This writes `ts-reading-clean-pt.svg` and `ts-reading-annotated-pt.svg`. The short form `-l pt` and the form `--language=pt` are also supported. Run `node render.js --help` for usage information.

The browser preview includes English, Spanish, and Portuguese controls. If calling the generator directly from JavaScript, pass `language: "en"`, `language: "es"`, or `language: "pt"` to `createSvg`; an omitted language defaults to English.

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

Open `index.html` to switch between the two views and languages and download any SVG directly. No build step or package installation is required.

## Suggested article use

- Use the clean version when the unfamiliar diagram is first introduced.
- Return to the annotated version after the reading method has been explained.
- Publish a PNG in the article if that best fits the content pipeline, while linking this source as the reproducible original.

## Accessibility

Each generated SVG contains a localized `<title>` and `<desc>` and declares its language. The state labels and annotations remain live SVG text rather than outlines.
