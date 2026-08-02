(function () {
  const diagram = document.querySelector("#diagram");
  const download = document.querySelector("#download");
  const buttons = [...document.querySelectorAll("[data-view]")];
  let currentUrl;

  function render(view) {
    const annotated = view === "annotated";
    const svg = TsReadingDiagram.createSvg({ annotated });
    diagram.innerHTML = svg;

    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    download.href = currentUrl;
    download.download = `ts-reading-${view}.svg`;

    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.view === view));
    }
  }

  for (const button of buttons) {
    button.addEventListener("click", () => render(button.dataset.view));
  }

  render("clean");
})();
