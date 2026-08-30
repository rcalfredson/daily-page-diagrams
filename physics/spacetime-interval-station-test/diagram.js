(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.SpacetimeIntervalStationTest = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const WIDTH = 1440;
  const HEIGHT = 960;

  // Reader-facing text is isolated from geometry so translations can reuse
  // the same numerical construction.
  const COPY = {
    en: {
      title: "Spacetime interval station test",
      description:
        "A numerical spacetime diagram with position horizontal and time increasing upward. A signal is emitted at zero kilometers and zero seconds. A stationary station has a vertical worldline at 900,000 kilometers. Its square alarm event at two seconds is outside the future light cone and spacelike, with interval minus 4.5 times 10 to the 11th square kilometers. Its diamond alarm at three seconds lies exactly on the lightlike boundary, with interval zero. Its circular alarm at four seconds is inside the cone and timelike, with interval plus 6.3 times 10 to the 11th square kilometers. The light boundary reaches the station at exactly three seconds.",
      axes: "Position and time axes",
      cone: "Future light cone from the signal emission",
      stationGroup: "Station worldline and three possible alarm events",
      position: "Position x (km)",
      time: "Time t (s)",
      futureCone: "FUTURE LIGHT CONE",
      coneDetail: "signals from the emission can arrive here",
      lightBoundary: "lightlike boundary",
      station: "STATION · x = 900,000 km",
      alarm2: "Alarm at 2 s",
      alarm3: "Alarm at 3 s",
      alarm4: "Alarm at 4 s",
      spacelike: "SPACELIKE · outside cone",
      lightlike: "LIGHTLIKE · on boundary",
      timelike: "TIMELIKE · inside cone",
      interval2: "Δs² = −4.5 × 10¹¹ km²",
      interval3: "Δs² = 0",
      interval4: "Δs² = +6.3 × 10¹¹ km²",
      emission: "Signal emission",
      origin: "x = 0, t = 0",
      arrival: "Light arrives: 3 s",
      scale: "c ≈ 300,000 km/s  ·  300,000 km horizontally = 1 s vertically",
      tick0: "0",
      tick1: "1",
      tick2: "2",
      tick3: "3",
      tick4: "4",
      tick300: "300,000",
      tick600: "600,000",
      tick900: "900,000",
      tickMinus300: "−300,000",
    },
  };
  const LANGUAGES = Object.freeze(Object.keys(COPY));

  function escapeXml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  }

  function createSvg(options = {}) {
    const language = options.language || "en";
    const copy = COPY[language];

    if (!copy) {
      throw new RangeError(`Unsupported language: ${language}. Expected one of: ${LANGUAGES.join(", ")}`);
    }

    const text = (key) => escapeXml(copy[key]);

    // Numerical geometry: one SCALE step is both one second vertically and
    // 300,000 km horizontally. The station is exactly three steps from O.
    const originX = 590;
    const originY = 750;
    const scale = 145;
    const stationX = originX + 3 * scale;
    const eventY = (seconds) => originY - seconds * scale;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="diagram-title diagram-description" lang="${language}" xml:lang="${language}">
  <title id="diagram-title">${text("title")}</title>
  <desc id="diagram-description">${text("description")}</desc>
  <defs>
    <marker id="axis-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 Z" fill="#304452" />
    </marker>
    <style>
      text { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .axis { fill: none; stroke: #304452; stroke-width: 3; stroke-linecap: round; }
      .grid { stroke: #b8c1be; stroke-width: 1.5; stroke-dasharray: 4 9; }
      .tick { stroke: #304452; stroke-width: 2; }
      .axis-label { fill: #263946; font-size: 24px; font-weight: 650; }
      .tick-label { fill: #66767b; font-size: 17px; font-weight: 520; }
      .cone-fill { fill: #78b5c5; fill-opacity: 0.20; }
      .cone-boundary { fill: none; stroke: #28758a; stroke-width: 5; stroke-linecap: round; }
      .cone-title { fill: #2c6575; font-size: 20px; font-weight: 780; letter-spacing: 0.07em; }
      .cone-detail { fill: #587983; font-size: 17px; font-weight: 520; }
      .boundary-label { fill: #286d80; font-size: 17px; font-weight: 650; }
      .label-halo { paint-order: stroke fill; stroke: #e1ebe8; stroke-width: 9px; stroke-linejoin: round; }
      .station-line { stroke: #68787c; stroke-width: 4; }
      .station-title { fill: #4b6066; font-size: 18px; font-weight: 780; letter-spacing: 0.06em; }
      .event-title { fill: #263c47; font-size: 21px; font-weight: 760; }
      .event-kind { font-size: 17px; font-weight: 780; letter-spacing: 0.035em; }
      .event-interval { fill: #52676e; font-size: 18px; font-weight: 570; }
      .spacelike-text { fill: #75633a; }
      .lightlike-text { fill: #256e82; }
      .timelike-text { fill: #356b62; }
      .spacelike-mark { fill: #fffdfa; stroke: #9a7837; stroke-width: 4; }
      .lightlike-mark { fill: #fffdfa; stroke: #28758a; stroke-width: 4; }
      .timelike-mark { fill: #fffdfa; stroke: #39766c; stroke-width: 4; }
      .emission-halo { fill: #fbf8f1; stroke: #263946; stroke-width: 2.5; }
      .emission-core { fill: #c76543; }
      .emission-label { fill: #743e2e; font-size: 19px; font-weight: 750; }
      .emission-detail { fill: #68767a; font-size: 17px; font-weight: 520; }
      .leader { fill: none; stroke: #89989a; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .arrival { fill: #245f72; font-size: 17px; font-weight: 720; }
      .scale-note { fill: #5f7076; font-size: 17px; font-weight: 550; }
      .note-rule { stroke: #aeb9b7; stroke-width: 2; }
    </style>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#fbf8f1" />

  <g aria-label="${text("cone")}">
    <path class="cone-fill" d="M -60 100 L ${originX} ${originY} L 1240 100 Z" />
    <path class="cone-boundary" d="M -60 100 L ${originX} ${originY} L 1240 100" />
    <text class="cone-title" x="405" y="128" text-anchor="middle">${text("futureCone")}</text>
    <text class="cone-detail" x="405" y="155" text-anchor="middle">${text("coneDetail")}</text>
    <text class="boundary-label label-halo" x="252" y="346" transform="rotate(-45 252 346)">${text("lightBoundary")}</text>
  </g>

  <g aria-label="${text("axes")}">
    <path class="grid" d="M 70 ${eventY(1)} L ${stationX - 24} ${eventY(1)} M 70 ${eventY(2)} L ${stationX - 24} ${eventY(2)} M 70 ${eventY(3)} L ${stationX - 24} ${eventY(3)} M 70 ${eventY(4)} L ${stationX - 24} ${eventY(4)}" />
    <path class="axis" d="M 70 ${originY} L 1360 ${originY}" marker-end="url(#axis-arrow)" />
    <path class="axis" d="M ${originX} 820 L ${originX} 72" marker-end="url(#axis-arrow)" />
    <text class="axis-label" x="1350" y="798" text-anchor="end">${text("position")}</text>
    <text class="axis-label" x="618" y="87">${text("time")}</text>

    <path class="tick" d="M ${originX - scale} 742 L ${originX - scale} 758 M ${originX + scale} 742 L ${originX + scale} 758 M ${originX + 2 * scale} 742 L ${originX + 2 * scale} 758 M ${stationX} 742 L ${stationX} 758" />
    <text class="tick-label" x="${originX - scale}" y="783" text-anchor="middle">${text("tickMinus300")}</text>
    <text class="tick-label" x="${originX + scale}" y="783" text-anchor="middle">${text("tick300")}</text>
    <text class="tick-label" x="${originX + 2 * scale}" y="783" text-anchor="middle">${text("tick600")}</text>
    <text class="tick-label" x="${stationX}" y="783" text-anchor="middle">${text("tick900")}</text>

    <path class="tick" d="M 582 ${eventY(1)} L 598 ${eventY(1)} M 582 ${eventY(2)} L 598 ${eventY(2)} M 582 ${eventY(3)} L 598 ${eventY(3)} M 582 ${eventY(4)} L 598 ${eventY(4)}" />
    <text class="tick-label" x="570" y="${eventY(1) + 6}" text-anchor="end">${text("tick1")}</text>
    <text class="tick-label" x="570" y="${eventY(2) + 6}" text-anchor="end">${text("tick2")}</text>
    <text class="tick-label" x="570" y="${eventY(3) + 6}" text-anchor="end">${text("tick3")}</text>
    <text class="tick-label" x="570" y="${eventY(4) + 6}" text-anchor="end">${text("tick4")}</text>
  </g>

  <g aria-label="${text("stationGroup")}">
    <path class="station-line" d="M ${stationX} 104 L ${stationX} 718" />
    <text class="station-title" x="${stationX - 24}" y="139" text-anchor="end">${text("station")}</text>

    <rect class="spacelike-mark" x="${stationX - 12}" y="${eventY(2) - 12}" width="24" height="24" rx="2" />
    <text class="event-title" x="${stationX + 34}" y="${eventY(2) - 24}">${text("alarm2")}</text>
    <text class="event-kind spacelike-text" x="${stationX + 34}" y="${eventY(2) + 2}">${text("spacelike")}</text>
    <text class="event-interval" x="${stationX + 34}" y="${eventY(2) + 29}">${text("interval2")}</text>

    <path class="lightlike-mark" d="M ${stationX} ${eventY(3) - 15} L ${stationX + 15} ${eventY(3)} L ${stationX} ${eventY(3) + 15} L ${stationX - 15} ${eventY(3)} Z" />
    <text class="event-title" x="${stationX + 66}" y="${eventY(3) - 24}">${text("alarm3")}</text>
    <text class="event-kind lightlike-text" x="${stationX + 66}" y="${eventY(3) + 2}">${text("lightlike")}</text>
    <text class="event-interval" x="${stationX + 66}" y="${eventY(3) + 29}">${text("interval3")}</text>

    <circle class="timelike-mark" cx="${stationX}" cy="${eventY(4)}" r="13" />
    <text class="event-title" x="${stationX - 34}" y="${eventY(4) + 15}" text-anchor="end">${text("alarm4")}</text>
    <text class="event-kind timelike-text" x="${stationX - 34}" y="${eventY(4) + 41}" text-anchor="end">${text("timelike")}</text>
    <text class="event-interval" x="${stationX - 34}" y="${eventY(4) + 68}" text-anchor="end">${text("interval4")}</text>

    <path class="leader" d="M ${stationX - 22} ${eventY(3) + 10} L ${stationX - 74} ${eventY(3) + 48} L ${stationX - 85} ${eventY(3) + 48}" />
    <text class="arrival" x="${stationX - 95}" y="${eventY(3) + 54}" text-anchor="end">${text("arrival")}</text>
  </g>

  <g transform="translate(${originX} ${originY})">
    <circle class="emission-halo" r="23" />
    <circle class="emission-core" r="16" />
    <path class="leader" d="M -23 -18 L -48 -40 L -134 -40" />
    <text class="emission-label" x="-145" y="-46" text-anchor="end">${text("emission")}</text>
    <text class="emission-detail" x="-145" y="-21" text-anchor="end">${text("origin")}</text>
  </g>

  <g>
    <path class="note-rule" d="M 220 880 L 1220 880" />
    <text class="scale-note" x="720" y="913" text-anchor="middle">${text("scale")}</text>
  </g>
</svg>`;
  }

  return { createSvg, COPY, LANGUAGES, WIDTH, HEIGHT };
});
