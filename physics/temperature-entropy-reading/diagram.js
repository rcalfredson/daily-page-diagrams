(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.TsReadingDiagram = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const WIDTH = 1440;
  const HEIGHT = 960;

  const COPY = {
    en: {
      title: {
        clean: "Schematic temperature-entropy cycle",
        annotated: "Annotated schematic temperature-entropy cycle",
      },
      description: {
        clean:
          "A temperature-entropy diagram with four states A through D. A to B is vertical, B to C curves upward and right, C to D is horizontal, and D curves back to A. Arrows show the cycle direction.",
        annotated:
          "A temperature-entropy diagram with four states A through D. A to B is vertical and labeled constant specific entropy. B to C curves upward and right. C to D is horizontal and labeled constant temperature. D curves back to A. Arrows show the cycle direction. A note inside the loop says that the physical meaning of the enclosed geometry depends on assumptions.",
      },
      axes: "Axes",
      entropyAxis: "Specific entropy,",
      temperatureAxis: "Absolute temperature,",
      processPath: "Closed process path",
      annotations: "Process annotations",
      constantBeforeSymbol: "constant ",
      constantAfterSymbol: "",
      verticalSegment: "vertical segment",
      horizontalSegment: "horizontal segment",
      areaLineOne: "Enclosed geometry is visible.",
      areaLineTwo: "Its meaning requires assumptions.",
      states: "States",
    },
    es: {
      title: {
        clean: "Ciclo esquemático de temperatura y entropía",
        annotated: "Ciclo esquemático de temperatura y entropía con anotaciones",
      },
      description: {
        clean:
          "Un diagrama de temperatura y entropía con cuatro estados, de A a D. De A a B el tramo es vertical, de B a C se curva hacia arriba y a la derecha, de C a D es horizontal y de D regresa a A. Las flechas indican la dirección del ciclo.",
        annotated:
          "Un diagrama de temperatura y entropía con cuatro estados, de A a D. De A a B el tramo es vertical y está rotulado como entropía específica constante. De B a C se curva hacia arriba y a la derecha. De C a D es horizontal y está rotulado como temperatura constante. De D regresa a A. Las flechas indican la dirección del ciclo. Una nota dentro del ciclo indica que el significado físico de la geometría encerrada depende de los supuestos.",
      },
      axes: "Ejes",
      entropyAxis: "Entropía específica,",
      temperatureAxis: "Temperatura absoluta,",
      processPath: "Trayectoria cerrada del proceso",
      annotations: "Anotaciones del proceso",
      constantBeforeSymbol: "",
      constantAfterSymbol: " constante",
      verticalSegment: "segmento vertical",
      horizontalSegment: "segmento horizontal",
      areaLineOne: "La geometría encerrada es visible.",
      areaLineTwo: "Su significado requiere supuestos.",
      states: "Estados",
    },
    pt: {
      title: {
        clean: "Ciclo esquemático de temperatura e entropia",
        annotated: "Ciclo esquemático de temperatura e entropia com anotações",
      },
      description: {
        clean:
          "Um diagrama de temperatura e entropia com quatro estados, de A a D. De A a B, o trecho é vertical; de B a C, curva-se para cima e para a direita; de C a D, é horizontal; e de D, retorna a A. As setas indicam a direção do ciclo.",
        annotated:
          "Um diagrama de temperatura e entropia com quatro estados, de A a D. De A a B, o trecho é vertical e está rotulado como entropia específica constante. De B a C, curva-se para cima e para a direita. De C a D, é horizontal e está rotulado como temperatura constante. De D, retorna a A. As setas indicam a direção do ciclo. Uma nota dentro do ciclo indica que o significado físico da geometria delimitada depende das hipóteses.",
      },
      axes: "Eixos",
      entropyAxis: "Entropia específica,",
      temperatureAxis: "Temperatura absoluta,",
      processPath: "Trajetória fechada do processo",
      annotations: "Anotações do processo",
      constantBeforeSymbol: "",
      constantAfterSymbol: " constante",
      verticalSegment: "segmento vertical",
      horizontalSegment: "segmento horizontal",
      areaLineOne: "A geometria delimitada é visível.",
      areaLineTwo: "Seu significado exige hipóteses.",
      states: "Estados",
    },
    ja: {
      title: {
        clean: "模式的な温度–エントロピーサイクル",
        annotated: "注釈付きの模式的な温度–エントロピーサイクル",
      },
      description: {
        clean:
          "4つの状態AからDを示す温度–エントロピー線図。AからBは鉛直、BからCは右上がりの曲線、CからDは水平で、DからAへ戻る。矢印はサイクルの進行方向を示す。",
        annotated:
          "4つの状態AからDを示す温度–エントロピー線図。AからBは鉛直で、比エントロピー一定と注記されている。BからCは右上がりの曲線である。CからDは水平で、温度一定と注記されている。DからAへ戻る。矢印はサイクルの進行方向を示す。サイクル内の注記は、囲まれた領域の物理的意味が仮定に依存することを示す。",
      },
      axes: "軸",
      entropyAxis: "比エントロピー",
      temperatureAxis: "絶対温度",
      processPath: "閉じたプロセス経路",
      annotations: "プロセスの注釈",
      constantBeforeSymbol: "",
      constantAfterSymbol: " 一定",
      verticalSegment: "鉛直区間",
      horizontalSegment: "水平区間",
      areaLineOne: "囲まれた領域を確認できます。",
      areaLineTwo: "その意味には仮定が必要です。",
      states: "状態",
    },
    vi: {
      title: {
        clean: "Chu trình nhiệt độ–entropy minh họa",
        annotated: "Chu trình nhiệt độ–entropy minh họa có chú thích",
      },
      description: {
        clean:
          "Đồ thị nhiệt độ–entropy với bốn trạng thái từ A đến D. Đoạn từ A đến B thẳng đứng; từ B đến C cong lên trên và sang phải; từ C đến D nằm ngang; và từ D cong trở lại A. Các mũi tên chỉ chiều của chu trình.",
        annotated:
          "Đồ thị nhiệt độ–entropy với bốn trạng thái từ A đến D. Đoạn từ A đến B thẳng đứng và được ghi là entropy riêng không đổi. Từ B đến C cong lên trên và sang phải. Từ C đến D nằm ngang và được ghi là nhiệt độ không đổi. Từ D cong trở lại A. Các mũi tên chỉ chiều của chu trình. Một ghi chú bên trong chu trình cho biết ý nghĩa vật lý của phần hình học khép kín phụ thuộc vào các giả định.",
      },
      axes: "Các trục",
      entropyAxis: "Entropy riêng,",
      temperatureAxis: "Nhiệt độ tuyệt đối,",
      processPath: "Đường quá trình khép kín",
      annotations: "Chú thích quá trình",
      constantBeforeSymbol: "",
      constantAfterSymbol: " không đổi",
      verticalSegment: "đoạn thẳng đứng",
      horizontalSegment: "đoạn nằm ngang",
      areaLineOne: "Có thể thấy hình học khép kín.",
      areaLineTwo: "Ý nghĩa của nó cần có các giả định.",
      states: "Các trạng thái",
    },
  };
  const LANGUAGES = Object.freeze(Object.keys(COPY));

  function escapeXml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function createSvg(options = {}) {
    const annotated = Boolean(options.annotated);
    const language = options.language || "en";
    const copy = COPY[language];

    if (!copy) {
      throw new RangeError(`Unsupported language: ${language}. Expected one of: ${LANGUAGES.join(", ")}`);
    }

    const view = annotated ? "annotated" : "clean";
    const title = copy.title[view];
    const description = copy.description[view];

    const annotations = annotated
      ? `
      <g class="annotations" aria-label="${copy.annotations}">
        <g class="callout constant-s">
          <path d="M 390 500 L 438 500" />
          <text x="456" y="489">${copy.constantBeforeSymbol}<tspan font-style="italic">s</tspan>${copy.constantAfterSymbol}</text>
          <text x="456" y="516" class="annotation-detail">${copy.verticalSegment}</text>
        </g>
        <g class="callout constant-t">
          <path d="M 700 170 L 700 145" />
          <text x="700" y="101" text-anchor="middle">${copy.constantBeforeSymbol}<tspan font-style="italic">T</tspan>${copy.constantAfterSymbol}</text>
          <text x="700" y="128" text-anchor="middle" class="annotation-detail">${copy.horizontalSegment}</text>
        </g>
        <g class="area-note">
          <path d="M 340 420 C 460 420 580 468 700 468" />
          <rect x="700" y="412" width="420" height="112" rx="18" />
          <text x="910" y="454" text-anchor="middle">${copy.areaLineOne}</text>
          <text x="910" y="489" text-anchor="middle" class="annotation-detail">${copy.areaLineTwo}</text>
        </g>
      </g>`
      : "";

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="diagram-title diagram-description" lang="${language}">
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

  <g aria-label="${copy.axes}">
    <path class="axis" d="M 165 790 L 1320 790" marker-end="url(#axis-arrow)" />
    <path class="axis" d="M 165 790 L 165 85" marker-end="url(#axis-arrow)" />
    <text class="axis-label" x="742" y="882" text-anchor="middle">
      ${copy.entropyAxis} <tspan class="axis-symbol">s</tspan> (kJ·kg⁻¹·K⁻¹)
    </text>
    <text class="axis-label" x="59" y="438" text-anchor="middle" transform="rotate(-90 59 438)">
      ${copy.temperatureAxis} <tspan class="axis-symbol">T</tspan> (K)
    </text>
  </g>

  <g aria-label="${copy.processPath}">
    <path class="cycle-fill" d="M 370 680 L 370 330 C 560 310 850 250 1070 190 L 280 190 C 255 330 300 575 370 680 Z" />
    <path class="process process-with-arrow" d="M 370 680 L 370 505 L 370 330" />
    <path class="process process-with-arrow" d="M 370 330 C 484 318 634 291.6 783.28 259.44 C 882.8 238 982 214 1070 190" />
    <path class="process process-with-arrow" d="M 1070 190 L 730 190 L 280 190" />
    <path class="process process-with-arrow" d="M 280 190 C 265 274 275.2 395.8 300.88 502.48 C 318 573.6 342 638 370 680" />
  </g>

  ${annotations}

  <g aria-label="${copy.states}">
    <g class="state" transform="translate(370 680)"><circle r="25" /><text x="-45" y="53" text-anchor="middle">A</text></g>
    <g class="state" transform="translate(370 330)"><circle r="25" /><text x="-43" y="-34" text-anchor="middle">B</text></g>
    <g class="state" transform="translate(1070 190)"><circle r="25" /><text x="43" y="-26" text-anchor="middle">C</text></g>
    <g class="state" transform="translate(280 190)"><circle r="25" /><text x="-7" y="-42" text-anchor="middle">D</text></g>
  </g>
</svg>`;
  }

  return { createSvg, LANGUAGES, WIDTH, HEIGHT };
});
