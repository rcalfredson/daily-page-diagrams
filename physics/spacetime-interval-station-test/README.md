# Spacetime interval: station test

A reproducible, code-authored SVG for the Daily Page article **The Spacetime Interval: Timelike, Lightlike, and Spacelike Separation.** Its single purpose is to connect the sign of the spacetime interval to an alarm event lying outside, on, or inside the future light cone.

## Physical geometry and calculations

A signal is emitted at `(x, t) = (0 km, 0 s)`. The station is stationary, so its worldline is vertical at `x = 900,000 km`. The figure uses the sign convention

```text
Δs² = c²Δt² − Δx²
```

with `c ≈ 300,000 km/s`. The three possible alarm events are therefore:

- At `(900,000 km, 2 s)`, `Δs² = (300,000 km/s)²(2 s)² − (900,000 km)² = −4.5 × 10¹¹ km²`. The event is spacelike-separated and outside the future cone.
- At `(900,000 km, 3 s)`, `Δs² = (300,000 km/s)²(3 s)² − (900,000 km)² = 0`. The event is lightlike and exactly on the boundary.
- At `(900,000 km, 4 s)`, `Δs² = (300,000 km/s)²(4 s)² − (900,000 km)² = +6.3 × 10¹¹ km²`. The event is timelike-separated and inside the future cone.

The geometry is numerical, not merely schematic. One horizontal step represents `300,000 km`, and the same SVG distance vertically represents `1 s`. Consequently light travels at 45 degrees and reaches the station, three horizontal steps away, at exactly three seconds.

## Generate and preview

From this directory, generate the canonical English SVG with:

```bash
node render.js
```

The equivalent explicit form is `node render.js --language en`. Both write `output/spacetime-interval-station-test.svg`. To generate the Russian version at `output/spacetime-interval-station-test-ru.svg`, run:

```bash
node render.js --language ru
```

The renderer also supports the reference diagrams' short (`-l ru`) and equals-sign (`--language=ru`) forms. All reader-facing SVG text is centralized in the `COPY` object in `diagram.js`, so both languages use identical geometry.

Open `index.html` in a browser for a responsive article-width preview and an SVG download link. No package installation or external JavaScript dependency is required.

## Local PNG export

SVG is canonical; PNG is a publication derivative. With Inkscape installed, make an approximately 1800-pixel-wide export using:

```bash
inkscape output/spacetime-interval-station-test.svg \
  --export-type=png \
  --export-width=1800 \
  --export-filename=output/spacetime-interval-station-test.png
```

Generated PNGs under `output/` are ignored by Git and should not be committed.

## Article use and accessibility

Intended caption:

> A station 900,000 kilometers from a signal source records three possible alarm times. At two seconds the alarm is spacelike-separated from the emission, at three seconds it lies on the lightlike boundary, and at four seconds it is timelike-separated.

Suggested alt text:

> A station at 900,000 kilometers has alarms at two, three, and four seconds: the two-second event is outside the future light cone and spacelike, the three-second event is on the boundary and lightlike, and the four-second event is inside and timelike.

Each generated SVG has `role="img"`, links a localized `<title>` and detailed `<desc>` with `aria-labelledby`, and declares its language using both `lang` and `xml:lang`. Labels remain live SVG text. Shape as well as color communicates the classifications: square for spacelike, diamond for lightlike, and circle for timelike.
