(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.GabaInhibition = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const WIDTH = 1500, HEIGHT = 980;
  const gaba = 'GABA<tspan baseline-shift="sub" font-size="70%">A</tspan>';
  const text = (x, y, value, cls = "label", extra = "") => `<text x="${x}" y="${y}" class="${cls}" ${extra}>${value}</text>`;
  function panel(i, heading, subheading, lines) {
    const x = 36 + i * 484;
    const excitation = i > 0;
    const voltage = ["M 50 540 H 105 C 125 540 125 575 155 575 H 370", "M 50 540 H 370", "M 50 540 H 105 C 125 540 125 513 155 513 H 370"][i];
    const response = ["", "M 50 540 H 185 C 207 540 213 513 230 513 C 252 513 264 540 290 540 H 370", "M 50 540 H 105 C 125 540 125 513 155 513 H 185 C 207 513 213 489 230 489 C 252 489 264 513 290 513 H 370"][i];
    return `<g transform="translate(${x} 156)" aria-label="${heading}">
      <rect width="460" height="668" rx="16" fill="#fffdfa" stroke="#deded5"/>
      ${text(24, 38, heading, "heading")}
      ${text(24, 67, subheading, "muted")}
      <!-- A shared membrane geometry keeps the electrical cases comparable. -->
      <path d="M 150 106 V 128 C 150 157 180 168 205 168 C 230 168 260 157 260 128 V 106" fill="#e6e0ee" stroke="#78658b" stroke-width="3"/>
      ${text(205, 136, "GABA", "synapse", 'text-anchor="middle"')}
      <g fill="#78658b"><circle cx="193" cy="186" r="4"/><circle cx="211" cy="194" r="4"/><circle cx="224" cy="181" r="4"/></g>
      <path d="M 32 239 H 428 V 328 H 32 Z" fill="#e8f0ed"/>
      <path d="M 32 239 H 188 M 222 239 H 428" stroke="#72978d" stroke-width="5"/>
      <path d="M 188 223 H 198 V 257 H 188 Z M 212 223 H 222 V 257 H 212 Z" fill="#fffdfa" stroke="#78658b" stroke-width="3"/>
      ${text(33, 313, "Postsynaptic neuron", "muted")}
      ${text(248, 285, `${gaba} receptor`, "label")}
      <path d="M 244 279 L 224 250" class="leader"/>
      ${i === 0 ? '<path d="M 205 202 V 282" class="ion-flow" marker-end="url(#purple-arrow)"/>' : i === 2 ? '<path d="M 205 280 V 204" class="ion-flow" marker-end="url(#purple-arrow)"/>' : '<rect x="200" y="223" width="10" height="34" rx="3" fill="#78658b" fill-opacity="0.18"/>'}
      ${i === 1 ? text(75, 281, "Channel open", "synapse") : text(151, 281, "Cl⁻", "synapse")}
      ${excitation ? `<path d="M 361 182 V 272" stroke="#c47a34" stroke-width="3" marker-end="url(#gold-arrow)"/>${text(290, 165, "Excitatory input", "excitation")}<path d="M 343 230 V 250 M 379 230 V 250" stroke="#c47a34" stroke-width="5"/>` : ""}
      ${text(24, 364, ["Voltage moves more negative", "Open channels weaken excitation", "Voltage rises; excitation is blunted"][i], "strong")}
      ${text(24, 399, "Membrane voltage", "muted")}
      <rect x="105" y="420" width="265" height="163" fill="#f0ecf5"/>
      ${text(114, 441, "GABA channels open", "small")}
      <path d="M 50 455 H 370" stroke="#8e6861" stroke-width="2" stroke-dasharray="5 5"/>
      ${text(377, 461, "Threshold", "small")}
      <path d="M 50 540 H 370" stroke="#c4cdc8" stroke-width="1.5" stroke-dasharray="3 5"/>
      ${excitation ? '<path d="M 50 540 H 185 C 207 540 213 468 230 468 C 252 468 264 540 290 540 H 370" fill="none" stroke="#ba884d" stroke-width="3" stroke-dasharray="7 5"/>' : ""}
      <path d="${voltage}" fill="none" stroke="#78658b" stroke-width="3" stroke-dasharray="2 5"/>
      ${excitation ? `<path d="${response}" fill="none" stroke="#287568" stroke-width="4"/>` : ''}
      ${excitation ? '<path d="M 230 462 V 447" stroke="#c47a34" stroke-width="2" marker-end="url(#gold-arrow)"/>' : ''}
      <path d="M 50 420 V 590 H 370" fill="none" stroke="#92a09a" stroke-width="1.5"/>
      ${text(370, 610, "Time →", "small", 'text-anchor="end"')}
      ${text(24, 644, "Less likely to fire", "outcome")}
    </g>
    <g transform="translate(${x + 24} 858)">${lines.map((line, j) => text(0, j * 25, line, "body")).join("")}</g>`;
  }
  function createSvg() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title description" lang="en" xml:lang="en">
<title id="title">How GABA_A receptors can inhibit neurons in different ways</title>
<desc id="description">Three schematic cases compare GABA_A inhibition. A: chloride enters and membrane voltage becomes more negative, farther from threshold. B: GABA alone barely changes voltage, but opening channels reduces the voltage response to the same excitatory input. C: an illustrative chloride-dominated depolarizing response raises voltage, while the added conductance blunts excitation enough that the combined response stays below threshold and below the excitation-only peak. Depolarizing GABA is not always inhibitory. Traces are illustrative, not measurements; GABA_A channels also pass bicarbonate.</desc>
<defs>
<marker id="purple-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 Z" fill="#78658b"/></marker>
<marker id="gold-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M 0 0 L 10 5 L 0 10 Z" fill="#c47a34"/></marker>
<style>
text {font-family: "DejaVu Sans", Arial, sans-serif; fill:#283e38;}
.title {font-size:32px;font-weight:700;} .heading {font-size:20px;font-weight:700;}
.label,.body {font-size:17px;} .muted {font-size:16px;fill:#64736d;}
.synapse {font-size:17px;fill:#6c567f;font-weight:700;}
.strong {font-size:17px;font-weight:700;} .small {font-size:13px;fill:#67736e;}
.excitation {font-size:15px;fill:#9a5e26;} .outcome {font-size:21px;font-weight:700;fill:#287568;}
.leader {fill:none;stroke:#8c9490;stroke-width:1.5;} .ion-flow {fill:none;stroke:#78658b;stroke-width:3;}
</style></defs>
<rect width="1500" height="980" fill="#f8f6ef"/>
${text(36, 52, `How ${gaba} receptors can inhibit neurons in different ways`, "title")}
${text(36, 84, "Opening an ion channel can change both membrane voltage and the response to other inputs.", "body")}
<g aria-label="Voltage trace legend">
<path d="M 38 119 H 78" stroke="#78658b" stroke-width="3" stroke-dasharray="2 5"/>${text(89, 125, "GABA alone", "muted")}
<path d="M 265 119 H 305" stroke="#ba884d" stroke-width="3" stroke-dasharray="7 5"/>${text(316, 125, "Excitation alone", "muted")}
<path d="M 539 119 H 579" stroke="#287568" stroke-width="4"/>${text(590, 125, "Same excitation + GABA", "muted")}
${text(1462, 125, "Schematic • shared voltage scale", "muted", 'text-anchor="end"')}
</g>
${panel(0, "A. Hyperpolarizing inhibition", "Farther from spike threshold", ["Opening channels shifts voltage", "more negative, away from threshold."])}
${panel(1, "B. Shunting inhibition", "Little voltage change; excitation is shunted", ["Higher conductance gives current another", "path, making the voltage rise smaller."])}
${panel(2, "C. Depolarizing but still inhibitory", "Voltage rises; excitation is still shunted", ["The voltage rises, but shunting blunts", "excitation enough to reduce firing."])}
<path d="M 36 905 H 1464" stroke="#ccd1c8"/>
${text(36, 933, `${gaba} effects depend on ion gradients, membrane voltage, and conductance—not voltage direction alone.`, "strong")}
${text(36, 961, "Illustrative cases, not measurements. Cl⁻ flow is schematic; channels also pass HCO₃⁻. Depolarizing GABA can be excitatory in other conditions.", "small")}
</svg>`;
  }
  return { createSvg, WIDTH, HEIGHT };
});
