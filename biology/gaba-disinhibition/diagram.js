(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.GabaDisinhibition = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const WIDTH = 1200, HEIGHT = 650;
  const text = (x, y, value, cls = "label", extra = "") => `<text x="${x}" y="${y}" class="${cls}" ${extra}>${value}</text>`;
  function neuron(x, name, inhibitory, active) {
    const color = inhibitory ? "#78658b" : "#287568";
    return `<g transform="translate(${x} 190)">
      ${text(0, -72, `Neuron ${name}`, "heading", 'text-anchor="middle"')}
      ${text(0, -45, inhibitory ? "Inhibitory" : "Downstream target", "muted", 'text-anchor="middle"')}
      <g stroke="${color}" stroke-width="${active ? 4 : 2.5}" fill="none" opacity="${active ? 1 : 0.45}">
        <path d="M -26 -12 L -43 -30 M -38 -25 L -48 -21 M -24 13 L -43 31 M -37 26 L -47 23 M -7 -27 L -13 -43 M 8 27 L 14 41"/>
        <circle r="28" fill="${inhibitory ? '#e6e0ee' : '#e8f0ed'}"/>
        <circle r="7" fill="${color}" stroke="none"/>
      </g>
      ${text(0, 78, active ? (inhibitory ? "Active" : "Higher activity") : (inhibitory ? "Less active" : "Lower activity"), active ? "active" : "muted", 'text-anchor="middle"')}
    </g>`;
  }
  function inhibition(x1, x2, strong) {
    return `<g stroke="#78658b" fill="none" stroke-width="${strong ? 6 : 2}" opacity="${strong ? 1 : 0.4}">
      <path d="M ${x1} 190 H ${x2}" ${strong ? '' : 'stroke-dasharray="5 6"'}/>
      <path d="M ${x2} 176 V 204"/>
    </g>${text((x1 + x2) / 2, 226, strong ? "Strong" : "Weak", "small", 'text-anchor="middle"')}`;
  }
  function output(active) {
    const positions = active ? [460, 477, 494, 511, 528] : [494];
    return `<path d="M 444 190 H 540" stroke="#287568" stroke-width="2" opacity="0.4"/>
      <path d="${positions.map(x => `M ${x - 4} 190 L ${x} 165 L ${x + 4} 190`).join(' ')}" stroke="#287568" stroke-width="3" fill="none"/>
      ${text(494, 227, "Output", "small", 'text-anchor="middle"')}`;
  }
  function panel(dis) {
    return `<g transform="translate(${dis ? 612 : 32} 145)">
      <rect width="556" height="354" rx="16" fill="#fffdfa" stroke="#deded5"/>
      ${text(24, 40, dis ? "B. Disinhibition" : "A. Baseline inhibition", "heading")}
      ${text(24, 70, dis ? "A suppresses the neuron restraining C." : "B restrains C while A is less active.", "label")}
      ${inhibition(116, 193, dis)}${inhibition(276, 353, !dis)}
      ${neuron(76, "A", true, dis)}${neuron(236, "B", true, !dis)}${neuron(396, "C", false, dis)}
      ${output(dis)}
      <path d="M 24 293 H 532" stroke="#deded5"/>
      ${text(24, 329, dis ? "A inhibits B → B inhibits C less → C is more active" : "Strong inhibition from B keeps C less active.", "sequence")}
    </g>`;
  }
  function createSvg() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title description" lang="en" xml:lang="en">
<title id="title">How inhibition can increase activity: disinhibition</title>
<desc id="description">Two panels show the same circuit: inhibitory neuron A inhibits inhibitory neuron B, which inhibits downstream neuron C. At baseline, A is less active, B strongly inhibits C, and C has lower activity. When A becomes active, it suppresses B, reducing B’s inhibition of C and allowing C’s activity to increase. Flat bars denote inhibition; thicker solid connections denote stronger inhibition and thinner dashed connections weaker inhibition. More output spikes indicate greater C activity. The circuit and spikes are schematic, not measurements.</desc>
<defs><style>
text {font-family:"DejaVu Sans",Arial,sans-serif;fill:#283e38;}
.title {font-size:32px;font-weight:700;} .heading {font-size:23px;font-weight:700;}
.label {font-size:20px;} .muted {font-size:18px;fill:#64736d;}
.small {font-size:16px;fill:#64736d;} .active {font-size:18px;font-weight:700;}
.footer {font-size:18px;fill:#64736d;}
.sequence {font-size:18px;} .takeaway {font-size:23px;font-weight:700;}
</style></defs>
<rect width="${WIDTH}" height="${HEIGHT}" fill="#f8f6ef"/>
${text(32, 52, "How inhibition can increase activity: disinhibition", "title")}
${text(32, 87, "Inhibiting an inhibitory neuron can release a downstream target from restraint.", "label")}
<g stroke="#78658b" stroke-width="3"><path d="M 34 117 H 70 M 70 108 V 126"/></g>
${text(82, 124, "Inhibition", "small")}
${text(1168, 124, "Same circuit • two activity states", "small", 'text-anchor="end"')}
${panel(false)}${panel(true)}
<rect x="32" y="521" width="1136" height="91" rx="14" fill="#e8f0ed"/>
${text(56, 557, "Inhibition can increase activity indirectly", "takeaway")}
${text(56, 588, "when it suppresses another inhibitory neuron.", "takeaway")}
${text(32, 637, "Schematic circuit and output spikes. C’s increase comes from reduced inhibition by B.", "footer")}
</svg>`;
  }
  return { createSvg, WIDTH, HEIGHT };
});
