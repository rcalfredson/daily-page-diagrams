(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.DnaMethylationMaintenance = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const TOP = "ACGT", BOTTOM = "TGCA";
  const text = (x, y, content, cls = "body", anchor = "start") =>
    `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${content}</text>`;
  const line = (x1, y1, x2, y2, cls) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;

  // Coordinates increase left to right. Top is 5′-ACGT-3′, bottom
  // is 3′-TGCA-5′. The CpG cytosines are at DIFFERENT columns:
  // top index 1 and bottom index 2. Each pairs with G, never with C.
  function dna(cx, y, parent, marks, id) {
    const xs = [cx - 72, cx - 24, cx + 24, cx + 72];
    let svg = `<g id="${id}" aria-label="${parent === 'both' ? 'Both parental strands' : parent === 'top' ? 'Parental strand 1 above a new strand' : 'New strand above parental strand 2'}">`;
    xs.forEach(x => { svg += line(x, y + 23, x, y + 57, "pair"); });
    [TOP, BOTTOM].forEach((sequence, row) => {
      const cy = y + row * 80;
      const isNew = parent !== "both" && (parent === "top" ? row === 1 : row === 0);
      const methylIndex = row === 0 ? 1 : 2;
      svg += `<g data-strand="${isNew ? 'new' : 'parental'}" data-sequence="${sequence}" data-direction="${row === 0 ? '5-to-3' : '3-to-5'}">`;
      svg += line(cx - 113, cy, cx + 113, cy, isNew ? "backbone new" : "backbone parental");
      sequence.split("").forEach((base, i) => {
        const modified = i === methylIndex && marks[row];
        svg += `<g data-base="${base}" data-methylated="${!!modified}">`;
        svg += `<rect x="${xs[i]-20}" y="${cy-22}" width="40" height="44" rx="7" class="base ${isNew ? 'new-base' : 'parental-base'} ${modified ? 'modified' : ''}"/>`;
        svg += text(xs[i], cy + 11, base, "base-letter", "middle");
        if (modified) {
          const my = row === 0 ? cy - 35 : cy + 61;
          svg += line(xs[i], row === 0 ? cy - 22 : cy + 22, xs[i], row === 0 ? cy - 30 : cy + 39, "methyl-bond");
          svg += text(xs[i], my, isNew ? "new CH₃" : "CH₃", "methyl small", "middle");
        }
        svg += "</g>";
      });
      svg += text(cx - 132, cy + 9, row === 0 ? "5′" : "3′", "small", "middle");
      svg += text(cx + 132, cy + 9, row === 0 ? "3′" : "5′", "small", "middle");
      svg += "</g>";
    });
    return svg + "</g>";
  }
  const heading = (y, letter, label) => text(36, y, letter, "position") + text(72, y, label, "heading");
  const arrow = d => `<path d="${d}" class="flow" marker-end="url(#arrow)"/>`;

  function createSvg() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="700" height="1740" viewBox="0 0 700 1740" role="img" aria-labelledby="diagram-title diagram-description" lang="en" xml:lang="en">
<title id="diagram-title">How Does DNA Methylation Survive Replication?</title>
<desc id="diagram-description">Canonical mammalian CpG maintenance, simplified into three stages. A: parental strand 1, 5′-ACGT-3′, pairs with parental strand 2, 3′-TGCA-5′. The top C and the bottom C in the neighboring column each carry CH3 and each pair with G. CpG runs in opposite physical directions on the two strands. B: semiconservative replication produces two daughters. Daughter 1 retains parental strand 1 on top and has a new lower strand. Daughter 2 has a new top strand and retains parental strand 2 below. Dark solid backbones identify parental strands; lighter dashed backbones identify new strands. Each daughter retains one original methyl group, while its new strand is initially unmethylated: hemimethylated DNA. C: UHRF1 helps recognize hemimethylated CpGs and recruit DNMT1. DNMT1 adds new methyl groups from a donor to cytosines on the new strands. Original marks stay on the parental strands; they are not transferred. Both daughter CpGs are now methylated on both strands. This illustrates how a pattern can be maintained, not perfect copying of every mark or all forms of DNA methylation.</desc>
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#263746"/></marker>
  <style>
    text { font-family: Arial, Helvetica, sans-serif; fill: #263746; }
    .title { font-family: Georgia, 'Times New Roman', serif; font-size: 36px; }
    .heading { font-size: 28px; font-weight: 700; }
    .body { font-size: 26px; }
    .small { font-size: 24px; fill: #52646d; }
    .position { font-size: 23px; fill: #28758a; font-weight: 700; }
    .base-letter { font-size: 30px; font-weight: 700; }
    .methyl { fill: #a94829; font-weight: 700; }
    .methyl-bond { stroke: #a94829; stroke-width: 3; stroke-linecap: round; }
    .backbone { stroke-width: 4; }
    .parental { stroke: #263746; }
    .new { stroke: #83999e; stroke-dasharray: 7 5; }
    .pair { stroke: #73878b; stroke-width: 2.5; stroke-dasharray: 3 5; }
    .base { fill: #fbf8f1; stroke-width: 2; }
    .parental-base { stroke: #263746; }
    .new-base { stroke: #83999e; fill: #edf1ef; }
    .modified { fill: #f9e5dc; stroke: #a94829; stroke-width: 3; }
    .rule { stroke: #c4cdc9; stroke-width: 1.5; }
    .flow { fill: none; stroke: #263746; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
    .cpg { fill: none; stroke: #28758a; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .strong { font-weight: 700; }
  </style>
</defs>
<rect width="700" height="1740" fill="#fbf8f1"/>
${text(36,57,"How Does DNA Methylation","title")}
${text(36,100,"Survive Replication?","title")}
${line(36,128,664,128,"rule")}
<g aria-label="Legend">
  ${line(36,166,85,166,"backbone parental")}${text(98,174,"Parental strand","small")}
  ${line(366,166,415,166,"backbone new")}${text(428,174,"New strand","small")}
  ${text(36,212,"CH₃","methyl small")}${text(98,212,"Methyl group","small")}
</g>
<g aria-label="A. Before DNA replication">
  ${heading(262,"A","Before DNA replication")}
  ${text(350,302,"Fully methylated CpG","body strong","middle")}
  ${text(36,381,"Parent 1","small")}${text(36,461,"Parent 2","small")}
  ${dna(350,370,"both",[true,true],"parent-dna")}
  <path d="M319 402H381L376 397M381 402L376 407 M381 420H319L324 415M319 420L324 425" class="cpg"/>
  ${text(350,548,"CpG runs 5′ → 3′ on each strand.","small","middle")}
  ${text(350,582,"Each marked C pairs with G.","small","middle")}
</g>
<g aria-label="Replication produces two daughter molecules">
  ${arrow("M350 602V619L190 649V659")}
  ${arrow("M350 619L510 649V659")}
</g>
<g aria-label="B. Immediately after replication">
  ${heading(706,"B","Immediately after replication")}
  ${text(350,747,"Hemimethylated DNA","body strong","middle")}
  ${text(190,789,"Parent 1 + new","small","middle")}
  ${text(510,789,"New + parent 2","small","middle")}
  ${dna(190,860,"top",[true,false],"daughter-1-hemi")}
  ${dna(510,860,"bottom",[false,true],"daughter-2-hemi")}
  ${text(350,1040,"Each daughter has one parental strand","small","middle")}
  ${text(350,1074,"and one initially unmethylated new strand.","small","middle")}
</g>
${line(36,1101,664,1101,"rule")}
<g aria-label="C. Maintenance methylation">
  ${heading(1147,"C","Maintenance methylation")}
  ${text(36,1192,"UHRF1","body strong")}${text(135,1192,"helps recognize these CpGs","small")}
  ${text(135,1226,"and recruit DNMT1.","small")}
  ${text(36,1270,"DNMT1","body strong")}${text(135,1270,"adds CH₃ to new-strand cytosines.","small")}
  ${text(135,1304,"New methyl groups come from a donor.","small")}
  ${arrow("M190 1326V1352")}${arrow("M510 1326V1352")}
  ${dna(190,1420,"top",[true,true],"daughter-1-restored")}
  ${dna(510,1420,"bottom",[true,true],"daughter-2-restored")}
  ${text(350,1610,"Methylation pattern restored","body strong","middle")}
</g>
${line(36,1637,664,1637,"rule")}
${text(350,1679,"The DNA sequence is copied.","body","middle")}
${text(350,1714,"Maintenance helps preserve the pattern.","body","middle")}
</svg>`;
  }
  return { createSvg };
});
