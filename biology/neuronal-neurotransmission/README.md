# Neuronal neurotransmission

A reproducible, code-authored SVG showing how a signal changes form as it passes through a simplified chemical synapse. The explanatory sequence is **chemical input → electrical signal → chemical synaptic transmission → electrical response**.

## What the figure shows

- Neurotransmitter input changes ion flow and membrane voltage in Neuron A.
- An action potential propagates along the axon as a change in membrane voltage, not as a stream of electrons.
- At the axon terminal, calcium entry triggers vesicle release of neurotransmitter.
- Neurotransmitter crosses the synaptic cleft and binds receptors on Neuron B.
- Receptor activation changes ion flow and membrane voltage in Neuron B; this may contribute to a new action potential but does not guarantee one.

The anatomy, molecular shapes, quantities, and distances are deliberately schematic. The cleft is enlarged enough to make the chemical handoff legible at article width.

## Generate and preview

From this directory, generate the SVG with:

```bash
node render.js
```

This writes `output/neuronal-neurotransmission.svg`. Open `index.html` in a browser for a responsive preview and an SVG download link. No package installation or external JavaScript dependency is required.

## Article use and accessibility

Suggested alt text:

> A chemical signal changes ion flow in Neuron A, an electrical action potential travels down its axon, calcium triggers neurotransmitter release across a synapse, and receptor activation changes the membrane voltage in Neuron B.

The SVG has `role="img"`, connects a `<title>` and detailed `<desc>` with `aria-labelledby`, and keeps all labels as live SVG text. Meaning is conveyed with labels and shapes as well as color.
