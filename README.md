# Daily Page Diagrams

Reproducible diagrams created for physics, mathematics, and other explanatory content published on [Daily Page](https://dailypage.org).

Each diagram lives in its own directory with its source code, generated SVG files, raster exports when appropriate, and notes about its intended interpretation.

## Diagrams

### Physics

- [Reading a temperature–entropy diagram](physics/temperature-entropy-reading/)
  - A schematic T–s cycle designed to teach how to inspect axes, states, process directions, vertical and horizontal segments, and assumption-sensitive area interpretations.
  - Generates English, Spanish, Portuguese, Japanese, and Vietnamese SVGs through a command-line language flag.
- [Light cones: a causal map](physics/light-cones-causal-map/)
  - A flat-spacetime map of the causal future, causal past, lightlike boundaries, and spacelike exterior relative to a chosen event.
  - Generates English, Spanish, and French SVGs through a command-line language flag.
- [The spacetime interval: station test](physics/spacetime-interval-station-test/)
  - A numerical light-cone comparison of spacelike, lightlike, and timelike alarm events on one stationary station worldline.
  - Generates an English SVG and preserves the shared command-line language interface for future translations.

## Repository principles

- Diagrams should be reproducible from source.
- Geometry should remain schematic unless numerical data are explicitly provided.
- Visual choices should not imply physical claims beyond those justified by the accompanying article.
- SVG is the canonical format; PNG exports are provided for convenient publication.
