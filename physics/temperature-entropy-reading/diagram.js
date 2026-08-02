(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.TsReadingDiagram = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const WIDTH = 1440;
  const HEIGHT = 960;

  function escapeXml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function createSvg(options = {}) {
    const annotated = Boolean(options.annotated);
    const title = annotated
      ? "Annotated schematic temperature-entropy cycle"
      : "Schematic temperature-entropy cycle";
    const description = annotated
      ? "A temperature-entropy diagram with four states A through D. A to B is vertical and labeled constant specific entropy. B to C curves upward and right. C to D is horizontal and labeled constant temperature. D curves back to A. Arrows show the cycle direction. A note inside the loop says that the physical meaning of the enclosed geometry depends on assumptions."
      : "A temperature-entropy diagram with four states A through D. A to B is vertical, B to C curves upward and right, C to D is horizontal, and D curves back to A. Arrows show the cycle direction.";

    const annotations = annotated
      ? `
      <g class="annotations" aria-label="Process annotations">
        <g class="callout constant-s">
          <path d="M 390 500 L 438 500" />
          <text x="456" y="489">constant <tspan font-style="italic">s</tspan></text>
          <text x="456" y="516" class="annotation-detail">vertical segment</text>
        </g>
        <g class="callout constant-t">
          <path d="M 700 170 L 700 145" />
          <text x="700" y="101" text-anchor="middle">constant <tspan font-style="italic">T</tspan></text>
          <text x="700" y="128" text-anchor="middle" class="annotation-detail">horizontal segment</text>
        </g>
        <g class="area-note">
          <path d="M 340 420 C 460 420 580 468 700 468" />
          <rect x="700" y="412" width="420" height="112" rx="18" />
          <text x="910" y="454" text-anchor="middle">Enclosed geometry is visible.</text>
          <text x="910" y="489" text-anchor="middle" class="annotation-detail">Its meaning requires assumptions.</text>
        </g>
      </g>`
      : "";

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="diagram-title diagram-description">
  <title id="diagram-title">${escapeXml(title)}</title>
  <desc id="diagram-description">${escapeXml(description)}</desc>
  <defs>
    <marker id="axis-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="24" markerHeight="24" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 Z" fill="#263746" />
    </marker>
    <marker id="process-arrow" viewBox="0 0 10 10" refX="8.7" refY="5" markerUnits="userSpaceOnUse" markerWidth="24" markerHeight="24" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 Z" fill="#176b87" />
    </marker>
    <style>
      .axis { fill: none; stroke: #263746; stroke-width: 4; stroke-linecap: round; }
      .axis-label { fill: #263746; font: 500 29px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .axis-symbol { font-size: 34px; font-style: italic; }
      .cycle-fill { fill: #5fa8c3; fill-opacity: 0.09; stroke: none; }
      .process { fill: none; stroke: #176b87; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; }
      .process-with-arrow { marker-mid: url(#process-arrow); }
      .state circle { fill: #fffdfa; stroke: #176b87; stroke-width: 6; }
      .state text { fill: #173543; font: 700 29px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .callout path { fill: none; stroke: #788891; stroke-width: 2.5; stroke-linecap: round; }
      .callout text, .area-note text { fill: #354c59; font: 650 24px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .callout .annotation-detail, .area-note .annotation-detail { fill: #627680; font-size: 20px; font-weight: 450; }
      .area-note path { fill: none; stroke: #9cb6c1; stroke-width: 2.5; }
      .area-note rect { fill: #fffdfa; fill-opacity: 0.96; stroke: #9cb6c1; stroke-width: 2; }
    </style>
  </defs>

  <rect width="1440" height="960" fill="#fbf8f1" />

  <g aria-label="Axes">
    <path class="axis" d="M 165 790 L 1320 790" marker-end="url(#axis-arrow)" />
    <path class="axis" d="M 165 790 L 165 85" marker-end="url(#axis-arrow)" />
    <text class="axis-label" x="742" y="882" text-anchor="middle">
      Specific entropy, <tspan class="axis-symbol">s</tspan> (kJ·kg⁻¹·K⁻¹)
    </text>
    <text class="axis-label" x="59" y="438" text-anchor="middle" transform="rotate(-90 59 438)">
      Absolute temperature, <tspan class="axis-symbol">T</tspan> (K)
    </text>
  </g>

  <g aria-label="Closed process path">
    <path class="cycle-fill" d="M 370 680 L 370 330 C 560 310 850 250 1070 190 L 280 190 C 255 330 300 575 370 680 Z" />
    <path class="process process-with-arrow" d="M 370 680 L 370 505 L 370 330" />
    <path class="process process-with-arrow" d="M 370 330 C 484 318 634 291.6 783.28 259.44 C 882.8 238 982 214 1070 190" />
    <path class="process process-with-arrow" d="M 1070 190 L 730 190 L 280 190" />
    <path class="process process-with-arrow" d="M 280 190 C 265 274 275.2 395.8 300.88 502.48 C 318 573.6 342 638 370 680" />
  </g>

  ${annotations}

  <g aria-label="States">
    <g class="state" transform="translate(370 680)"><circle r="25" /><text x="-45" y="53" text-anchor="middle">A</text></g>
    <g class="state" transform="translate(370 330)"><circle r="25" /><text x="-43" y="-34" text-anchor="middle">B</text></g>
    <g class="state" transform="translate(1070 190)"><circle r="25" /><text x="43" y="-26" text-anchor="middle">C</text></g>
    <g class="state" transform="translate(280 190)"><circle r="25" /><text x="-7" y="-42" text-anchor="middle">D</text></g>
  </g>
</svg>`;
  }

  return { createSvg, WIDTH, HEIGHT };
});
