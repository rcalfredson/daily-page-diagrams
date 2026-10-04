# How GABA_A receptors can inhibit neurons in different ways

A single three-panel SVG for the Daily Page GABA explainer. The membrane geometry and voltage axes stay consistent across the three cases. Purple denotes GABA; dashed ochre traces show excitation alone; solid green traces show the same excitation with GABA.

## Generate and preview

```bash
node biology/gaba-inhibition/render.js
```

Generates `output/gaba-inhibition.svg` using built-in Node modules. Open `index.html` in a browser for a responsive preview and download link. On narrow screens the figure scrolls horizontally to preserve label readability.

Optional PNG export from this directory:

```bash
inkscape output/gaba-inhibition.svg --export-type=png --export-filename=output/gaba-inhibition.png --export-width=2400
```

## Scientific interpretation

- **A:** An illustrative chloride-dominated hyperpolarizing response: chloride enters and voltage moves farther from threshold. Shunting can occur here too; these panels are not mutually exclusive mechanisms.
- **B:** Near the GABA reversal potential, the direct voltage change is small. A shaded channel opening and “Channel open” label indicate increased conductance without assigning a direction to the small net ionic current before excitation. During excitation, the open conductance opposes the voltage rise and produces a smaller EPSP.
- **C:** An illustrative chloride-dominated depolarizing response: chloride initially leaves, raising voltage. The concurrent excitation is sufficiently shunted that its combined peak is lower than the excitation-only peak. Chloride flux can reverse during excitation; the arrow illustrates the initial response only.

GABA_A channels also pass bicarbonate, so their reversal potential is not exactly the chloride equilibrium potential. The figure depicts possible responses, not numerical simulations or experimental traces. All panels share a schematic voltage scale and resting baseline; ion gradients differ between cases. The opening interval continues to the edge of each graph. An excitation arrow marks input timing, not an action potential.

A subthreshold GABA reversal potential or a subthreshold combined trace alone does **not** prove inhibition. The relevant comparison is excitability with and without GABA: panel C explicitly shows a reduced peak for the same excitatory input. Timing, location, ion gradients, and other conductances can instead make depolarizing GABA excitatory. No spike probabilities are calculated here.

Primary research supporting the interpretation:

- [Morita et al., Bidirectional Modulation of Neuronal Responses by Depolarizing GABAergic Inputs (2006)](https://pmc.ncbi.nlm.nih.gov/articles/PMC1386773/): conductance-based modeling of the competing effects of depolarization and shunting, including input timing.
- [Gulledge and Stuart, Excitatory Actions of GABA in the Cortex (2003)](https://pubmed.ncbi.nlm.nih.gov/12546824/): experimental evidence that depolarizing GABA can facilitate firing in some conditions.
- [Grover et al., Role of HCO3− ions in depolarizing GABA_A receptor-mediated responses (1993)](https://pubmed.ncbi.nlm.nih.gov/8389828/): contribution of bicarbonate to depolarizing responses.

## Article use

Suggested caption:

> GABA_A signaling can inhibit through hyperpolarization, through shunting that weakens excitatory input, or through shunting strong enough to outweigh a depolarizing voltage shift. Its effect depends on ion gradients, membrane voltage, and conductance—not just the direction of the voltage change.

Suggested alt text:

> Three panels compare GABA_A responses. Hyperpolarizing GABA lowers voltage away from threshold. Shunting GABA barely changes baseline voltage but reduces the response to excitation. Depolarizing GABA raises baseline voltage, yet the combined response to excitation is smaller than excitation alone and remains below threshold.

The SVG uses live text, an accessible title and description, labeled panels, and distinct trace patterns as well as colors. Shapes and ion flows are schematic.
