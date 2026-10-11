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

### Biology

- [What changes when DNA is methylated?](biology/dna-methylation/)
  - Compares cytosine with 5-methylcytosine and locates the added methyl group at carbon 5.
  - Shows a CpG site on one DNA strand, preserved C–G pairing, and an unchanged nucleotide sequence.

- [How does DNA methylation survive replication?](biology/dna-methylation-maintenance/)
  - Follows a fully methylated CpG into two hemimethylated daughter molecules after semiconservative replication.
  - Shows how UHRF1 and DNMT1 help restore methylation on new strands while parental marks remain in place.

- [How GABA_A receptors inhibit neurons](biology/gaba-inhibition/)
  - Compares hyperpolarizing, shunting, and depolarizing but still inhibitory responses in a three-panel figure.
  - Shows how opening channels can blunt excitation even when membrane voltage rises.

- [GABAergic disinhibition](biology/gaba-disinhibition/)
  - Shows how inhibiting an inhibitory neuron reduces restraint on a downstream target and can increase its activity.

- [Neuronal neurotransmission](biology/neuronal-neurotransmission/)
  - A schematic chemical-to-electrical-to-chemical-to-electrical path through two neurons and a chemical synapse.
  - Distinguishes an action potential within a neuron from neurotransmitter signaling between neurons.

## Repository principles

- Diagrams should be reproducible from source.
- Geometry should remain schematic unless numerical data are explicitly provided.
- Visual choices should not imply physical claims beyond those justified by the accompanying article.
- SVG is the canonical format; PNG exports are provided for convenient publication.
