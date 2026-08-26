(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.LightConeCausalMap = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const WIDTH = 1440;
  const HEIGHT = 960;

  // Reader-facing text is kept separate from geometry so future languages can
  // be added without changing any coordinates or paths.
  const COPY = {
    en: {
      title: "Light cone causal map centered on event O",
      description:
        "A flat-spacetime diagram with time vertical and one spatial dimension horizontal, centered on chosen event O. The shaded upper cone is O's causal future and contains F, which is timelike-separated and could be affected by O. The shaded lower cone is O's causal past and contains P, which is timelike-separated and could have affected O. Four diagonal light rays form the lightlike boundaries; L lies exactly on the upper-right boundary. S lies in the right spacelike exterior, outside the cone, and is spacelike-separated from O. The axes are equally scaled so light travels at 45 degrees, using units where c equals 1.",
      axes: "Spacetime axes",
      regions: "Causal regions relative to event O",
      examples: "Example events and their separation from O",
      position: "Position,",
      time: "Time,",
      future: "CAUSAL FUTURE",
      futureDetail: "O could affect events here",
      past: "CAUSAL PAST",
      pastDetail: "Events here could affect O",
      exterior: "SPACELIKE EXTERIOR",
      exteriorDetail: "No causal connection with O",
      boundary: "Light rays and light-cone boundary",
      boundaryTitle: "Light rays",
      boundaryDetail: "light-cone boundary",
      chosen: "Chosen event",
      eventO: "O",
      eventF: "F",
      eventP: "P",
      eventL: "L",
      eventS: "S",
      timelike: "timelike separation",
      futureRelation: "could be affected by O",
      pastRelation: "could have affected O",
      lightlike: "lightlike separation",
      onBoundary: "on the boundary",
      spacelike: "spacelike separation",
      outsideCone: "outside the cone",
      scaleNote: "Axes use equal scales with c = 1, so light rays appear at 45°.",
      dimensionNote: "One spatial dimension is shown; omitted directions are compressed.",
    },
    es: {
      title: "Mapa causal del cono de luz centrado en el evento O",
      description:
        "Diagrama de espaciotiempo plano con el tiempo en el eje vertical y una dimensión espacial en el horizontal, centrado en el evento elegido O. El cono superior sombreado es el futuro causal de O y contiene F, que tiene separación temporal y podría verse afectado por O. El cono inferior sombreado es el pasado causal de O y contiene P, que tiene separación temporal y podría haber afectado a O. Cuatro rayos de luz diagonales forman las fronteras de tipo luz; L está exactamente sobre la frontera superior derecha. S está en el exterior espacial derecho, fuera del cono, y tiene separación espacial respecto de O. Los ejes usan la misma escala para que la luz viaje a 45 grados, en unidades donde c es igual a 1.",
      axes: "Ejes del espaciotiempo",
      regions: "Regiones causales respecto del evento O",
      examples: "Eventos de ejemplo y su separación respecto de O",
      position: "Posición,",
      time: "Tiempo,",
      future: "FUTURO CAUSAL",
      futureDetail: "O podría afectar aquí",
      past: "PASADO CAUSAL",
      pastDetail: "Aquí podrían afectar a O",
      exterior: "EXTERIOR DE TIPO ESPACIO",
      exteriorDetail: "Sin conexión causal con O",
      boundary: "Rayos de luz y frontera del cono de luz",
      boundaryTitle: "Rayos de luz",
      boundaryDetail: "frontera del cono",
      chosen: "Evento elegido",
      eventO: "O",
      eventF: "F",
      eventP: "P",
      eventL: "L",
      eventS: "S",
      timelike: "separación temporal",
      futureRelation: "O podría afectarlo",
      pastRelation: "podría haber afectado a O",
      lightlike: "separación de tipo luz",
      onBoundary: "sobre la frontera",
      spacelike: "separación espacial",
      outsideCone: "fuera del cono",
      scaleNote: "Escalas iguales y c = 1 hacen que la luz forme 45°.",
      dimensionNote: "Se muestra una dimensión espacial; las demás se comprimen.",
    },
  };
  const LANGUAGES = Object.freeze(Object.keys(COPY));
  const LAYOUT = {
    en: { boundaryLabelX: 165 },
    es: { boundaryLabelX: 185 },
  };

  function escapeXml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function createSvg(options = {}) {
    const language = options.language || "en";
    const copy = COPY[language];
    const layout = LAYOUT[language];

    if (!copy) {
      throw new RangeError(`Unsupported language: ${language}. Expected one of: ${LANGUAGES.join(", ")}`);
    }

    const text = (key) => escapeXml(copy[key]);

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="diagram-title diagram-description" lang="${language}" xml:lang="${language}">
  <title id="diagram-title">${text("title")}</title>
  <desc id="diagram-description">${text("description")}</desc>
  <defs>
    <marker id="axis-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 Z" fill="#304452" />
    </marker>
    <style>
      text { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .axis { fill: none; stroke: #304452; stroke-width: 3; stroke-linecap: round; }
      .axis-label { fill: #263946; font-size: 27px; font-weight: 600; }
      .axis-symbol { font-size: 31px; font-style: italic; }
      .exterior-fill { fill: #e4ded3; fill-opacity: 0.68; }
      .cone-fill { fill: #78b5c5; fill-opacity: 0.22; }
      .cone-boundary { fill: none; stroke: #28758a; stroke-width: 6; stroke-linecap: round; }
      .region-title { fill: #2b6171; font-size: 24px; font-weight: 760; letter-spacing: 0.075em; }
      .region-detail { fill: #4f6f79; font-size: 20px; font-weight: 500; }
      .exterior-title { fill: #647573; font-size: 18px; font-weight: 750; letter-spacing: 0.07em; }
      .exterior-detail { fill: #6f7e7b; font-size: 17px; font-weight: 500; }
      .boundary-label { fill: #245f72; font-size: 19px; font-weight: 650; }
      .boundary-detail { fill: #58747c; font-size: 17px; font-weight: 500; }
      .boundary-leader { fill: none; stroke: #6f929b; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
      .event-example circle { fill: #fffdfa; stroke: #2c6f82; stroke-width: 4; }
      .event-letter { fill: #173b48; font-size: 23px; font-weight: 800; }
      .event-label { fill: #263f4b; font-size: 20px; font-weight: 700; }
      .event-detail { fill: #62747c; font-size: 17px; font-weight: 500; }
      .event-o .halo { fill: #fbf8f1; stroke: #263946; stroke-width: 2.5; }
      .event-o .core { fill: #c76543; }
      .o-letter { fill: #fff; font-size: 23px; font-weight: 800; }
      .chosen-label { fill: #7c3f2c; font-size: 19px; font-weight: 750; }
      .note { fill: #62727a; font-size: 17px; font-weight: 500; }
      .note-rule { stroke: #aeb9b7; stroke-width: 2; }
    </style>
  </defs>

  <rect width="1440" height="960" fill="#fbf8f1" />

  <g aria-label="${text("regions")}">
    <path class="exterior-fill" d="M 110 90 L 330 90 L 720 480 L 330 870 L 110 870 Z" />
    <path class="exterior-fill" d="M 1330 90 L 1110 90 L 720 480 L 1110 870 L 1330 870 Z" />
    <path class="cone-fill" d="M 330 90 L 720 480 L 1110 90 Z" />
    <path class="cone-fill" d="M 720 480 L 330 870 L 1110 870 Z" />
  </g>

  <g aria-label="${text("axes")}">
    <path class="axis" d="M 110 480 L 1330 480" marker-end="url(#axis-arrow)" />
    <path class="axis" d="M 720 885 L 720 70" marker-end="url(#axis-arrow)" />
    <text class="axis-label" x="1305" y="528" text-anchor="end">${text("position")} <tspan class="axis-symbol">x</tspan></text>
    <text class="axis-label" x="750" y="82">${text("time")} <tspan class="axis-symbol">t</tspan></text>
  </g>

  <g aria-label="${text("boundary")}">
    <path class="cone-boundary" d="M 330 90 L 720 480 L 1110 90" />
    <path class="cone-boundary" d="M 330 870 L 720 480 L 1110 870" />
    <path class="boundary-leader" d="M 340 218 L 405 218 L 444 204" />
    <text class="boundary-label" x="${layout.boundaryLabelX}" y="184">${text("boundaryTitle")}</text>
    <text class="boundary-detail" x="${layout.boundaryLabelX}" y="212">${text("boundaryDetail")}</text>
  </g>

  <g>
    <text class="region-title" x="570" y="160" text-anchor="middle">${text("future")}</text>
    <text class="region-detail" x="570" y="191" text-anchor="middle">${text("futureDetail")}</text>
    <text class="region-title" x="850" y="744" text-anchor="middle">${text("past")}</text>
    <text class="region-detail" x="850" y="775" text-anchor="middle">${text("pastDetail")}</text>

    <text class="exterior-title" x="165" y="356">${text("exterior")}</text>
    <text class="exterior-detail" x="165" y="384">${text("exteriorDetail")}</text>
    <text class="exterior-title" x="1035" y="356">${text("exterior")}</text>
    <text class="exterior-detail" x="1035" y="384">${text("exteriorDetail")}</text>
  </g>

  <g aria-label="${text("examples")}">
    <g class="event-example" transform="translate(755 195)">
      <circle r="13" />
      <text class="event-letter" x="0" y="8" text-anchor="middle">${text("eventF")}</text>
      <text class="event-label" x="33" y="-6">${text("timelike")}</text>
      <text class="event-detail" x="33" y="19">${text("futureRelation")}</text>
    </g>

    <g class="event-example" transform="translate(660 790)">
      <circle r="13" />
      <text class="event-letter" x="0" y="8" text-anchor="middle">${text("eventP")}</text>
      <text class="event-label" x="-30" y="-7" text-anchor="end">${text("timelike")}</text>
      <text class="event-detail" x="-30" y="18" text-anchor="end">${text("pastRelation")}</text>
    </g>

    <g class="event-example" transform="translate(1040 160)">
      <circle r="13" />
      <text class="event-letter" x="0" y="8" text-anchor="middle">${text("eventL")}</text>
      <text class="event-label" x="38" y="-6">${text("lightlike")}</text>
      <text class="event-detail" x="38" y="19">${text("onBoundary")}</text>
    </g>

    <g class="event-example" transform="translate(1080 600)">
      <circle r="13" />
      <text class="event-letter" x="0" y="8" text-anchor="middle">${text("eventS")}</text>
      <text class="event-label" x="30" y="-6">${text("spacelike")}</text>
      <text class="event-detail" x="30" y="19">${text("outsideCone")}</text>
    </g>

    <g class="event-o" transform="translate(720 480)">
      <circle class="halo" r="25" />
      <circle class="core" r="19" />
      <text class="o-letter" x="0" y="8" text-anchor="middle">${text("eventO")}</text>
    </g>
    <path class="boundary-leader" d="M 645 439 L 669 439 L 688 457" />
    <text class="chosen-label" x="625" y="445" text-anchor="end">${text("chosen")}</text>
  </g>

  <g>
    <path class="note-rule" d="M 275 912 L 1165 912" />
    <text class="note" x="720" y="938" text-anchor="middle">${text("scaleNote")} ${text("dimensionNote")}</text>
  </g>
</svg>`;
  }

  return { createSvg, COPY, LANGUAGES, WIDTH, HEIGHT };
});
