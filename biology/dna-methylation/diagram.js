(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.DnaMethylation = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const INK = "#263746", ACCENT = "#a94829", TEAL = "#28758a";
  function text(x, y, content, cls = "body", anchor = "start") {
    return `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${content}</text>`;
  }
  function line(x1, y1, x2, y2, cls = "bond") {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
  }

  // Conventional amino/keto cytosine tautomer. Local ring vertices:
  // N1 (0,70), C2 (-61,35), N3 (-61,-35), C4 (0,-70),
  // C5 (61,-35), C6 (61,35). N1 is bonded to DNA sugar, not H.
  // Double bonds: C2=O, N3=C4, C5=C6. Unlabeled vertices are carbon.
  function molecule(cx, methylated) {
    return `<g transform="translate(${cx} 335)" aria-label="${methylated ? "5-methylcytosine" : "Cytosine"} base attached to DNA sugar">
      ${line(-14, 62, -61, 35)}${line(-61,35,-61,-18)}
      ${line(-48,-43,0,-70)}${line(-43,-34,-1,-58)}
      ${line(0,-70,61,-35)}${line(61,-35,61,35)}${line(50,-28,50,28)}
      ${line(61,35,14,62)}
      ${line(-63,31,-102,54)}${line(-57,41,-96,64)}
      ${line(0,-70,0,-104)}${line(0,85,0,110)}
      ${text(-61,-25,"N","atom","middle")}
      ${text(0,80,"N","atom","middle")}
      ${text(-116,77,"O","atom","middle")}
      ${text(0,-116,"NH₂","atom","middle")}
      ${text(0,139,"to DNA sugar","small","middle")}
      ${text(39,-14,"5","position","middle")}
      ${methylated ? `${line(61,-35,111,-64,"methyl-bond")}${text(139,-68,"CH₃","methyl atom","middle")}` : ""}
    </g>`;
  }

  const TOP = "ATCGAT", BOTTOM = "TAGCTA";
  function dna() {
    return TOP.split("").map((base, i) => {
      const x = 150 + i * 80;
      return `${line(x,845,x,879,"pair")}
      <rect x="${x-26}" y="790" width="52" height="52" rx="8" class="base ${i===2 ? "modified" : ""}"/>
      <rect x="${x-26}" y="882" width="52" height="52" rx="8" class="base"/>
      ${text(x,828,base,"base-letter","middle")}${text(x,920,BOTTOM[i],"base-letter","middle")}`;
    }).join("");
  }

  function createSvg() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="700" height="1140" viewBox="0 0 700 1140" role="img" aria-labelledby="diagram-title diagram-description" lang="en" xml:lang="en">
<title id="diagram-title">What changes when DNA is methylated?</title>
<desc id="diagram-description">Panel A compares the cytosine and 5-methylcytosine bases in DNA. Both have oxygen at carbon 2, an amino group at carbon 4, and a connection from nitrogen 1 to DNA sugar. Only 5-methylcytosine has a CH3 group at carbon 5. Panel B shows the top strand 5′-ATCGAT-3′ paired with the bottom strand 3′-TAGCTA-5′. The top cytosine has a methyl group and still pairs with guanine. CpG marks adjacent cytosine and guanine on the same strand, linked by phosphate. Only one strand is shown methylated. The nucleotide sequence remains unchanged.</desc>
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${INK}"/></marker>
  <style>
    text { font-family: Arial, Helvetica, sans-serif; fill: ${INK}; }
    .title { font-family: Georgia, 'Times New Roman', serif; font-size: 36px; }
    .heading { font-size: 28px; font-weight: 700; }
    .body { font-size: 26px; }
    .small { font-size: 24px; fill: #52646d; }
    .atom { font-size: 32px; }
    .methyl { fill: ${ACCENT}; font-weight: 700; }
    .position { font-size: 23px; fill: ${TEAL}; font-weight: 700; }
    .bond { stroke: ${INK}; stroke-width: 3; stroke-linecap: round; }
    .methyl-bond { stroke: ${ACCENT}; stroke-width: 3; stroke-linecap: round; }
    .rule { stroke: #c4cdc9; stroke-width: 1.5; }
    .backbone { stroke: #73878b; stroke-width: 4; }
    .pair { stroke: #73878b; stroke-width: 2.5; stroke-dasharray: 3 5; }
    .base { fill: #fbf8f1; stroke: #73878b; stroke-width: 2; }
    .modified { fill: #f9e5dc; stroke: ${ACCENT}; stroke-width: 3; }
    .base-letter { font-size: 34px; font-weight: 700; }
    .bracket { fill: none; stroke: ${TEAL}; stroke-width: 2.5; }
  </style>
</defs>
<rect width="700" height="1140" fill="#fbf8f1"/>
${text(36,57,"What Changes When","title")}
${text(36,100,"DNA Is Methylated?","title")}
${line(36,128,664,128,"rule")}
<g aria-label="A. The molecular modification">
  ${text(36,174,"A","position")}${text(72,174,"A small chemical addition","heading")}
  ${molecule(185,false)}${molecule(480,true)}
  <path d="M285 335H372" class="bond" marker-end="url(#arrow)"/>
  ${text(329,304,"DNMT","small","middle")}
  ${text(185,517,"Cytosine","body","middle")}
  ${text(480,517,"5-methylcytosine","body","middle")}
  ${text(36,558,"5 = carbon 5 of the ring","small")}
  ${text(36,591,"DNMT = DNA methyltransferase enzyme","small")}
</g>
${line(36,619,664,619,"rule")}
<g aria-label="B. Methylation within DNA, schematic">
  ${text(36,664,"B","position")}${text(72,664,"The same DNA sequence","heading")}
  ${text(350,706,"CpG: C followed by G on one strand","small","middle")}
  <path d="M310 738V724H390V738" class="bracket"/>
  ${text(310,773,"CH₃","methyl atom","middle")}
  ${line(310,778,310,790,"methyl-bond")}
  ${line(105,816,595,816,"backbone")}${line(105,908,595,908,"backbone")}
  ${dna()}
  ${text(64,827,"5′","body","middle")}${text(632,827,"3′","body","middle")}
  ${text(64,919,"3′","body","middle")}${text(632,919,"5′","body","middle")}
  ${text(350,977,"Modified C still pairs with G.","body","middle")}
  ${text(350,1013,"p = phosphate linking neighboring bases","small","middle")}
</g>
${line(36,1042,664,1042,"rule")}
${text(350,1082,"A methyl group is added.","body","middle")}
${text(350,1117,"The DNA sequence stays the same.","body","middle")}
</svg>`;
  }
  return { createSvg };
});
