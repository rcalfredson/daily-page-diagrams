# How inhibition can increase activity: disinhibition

A two-panel SVG for the Daily Page GABA explainer, matching the palette and vector style of the GABA_A inhibition figure.

## Generate and preview

```bash
node biology/gaba-disinhibition/render.js
```

Generates `output/gaba-disinhibition.svg` using built-in Node modules. Open `index.html` for a responsive preview and SVG download. Narrow screens scroll horizontally to preserve readable text.

## Interpretation

Both panels show A inhibiting B and B inhibiting C. A and B are inhibitory neurons; C is a generic downstream target. Activating A suppresses B, reducing the inhibition reaching C and allowing C to become more active. The comparison assumes other inputs and conditions stay the same, with sufficient drive for C to fire when inhibition is reduced. Inhibition remains inhibitory at both connections.

Solid, thicker lines show stronger inhibition; thinner dashed lines show weaker inhibition. Explicit activity labels and output spike counts reinforce the color cues. Spikes and neuron shapes are schematic, not measured firing rates. The figure does not assign cell classes or depict a specific receptor mechanism.

## Article use

Suggested caption:

> Disinhibition occurs when one inhibitory neuron suppresses another. By reducing the inhibition reaching a downstream neuron, the circuit can produce a net increase in that neuron's activity.

Suggested alt text:

> Two panels show inhibitory neuron A inhibiting inhibitory neuron B, which inhibits neuron C. At baseline, A is less active, B strongly restrains C, and C has lower activity. When A becomes active, B becomes less active, its inhibition of C weakens, and C has higher activity.

The SVG contains live text, an accessible title and description, and a viewBox for responsive embedding.
