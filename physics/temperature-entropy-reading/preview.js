(function () {
  const diagram = document.querySelector("#diagram");
  const download = document.querySelector("#download");
  const viewButtons = [...document.querySelectorAll("[data-view]")];
  const languageButtons = [...document.querySelectorAll("[data-language]")];
  let currentView = "clean";
  let currentLanguage = "en";
  let currentUrl;

  function render() {
    const annotated = currentView === "annotated";
    const svg = TsReadingDiagram.createSvg({ annotated, language: currentLanguage });
    diagram.innerHTML = svg;

    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    download.href = currentUrl;
    const languageSuffix = currentLanguage === "en" ? "" : `-${currentLanguage}`;
    download.download = `ts-reading-${currentView}${languageSuffix}.svg`;

    for (const button of viewButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.view === currentView));
    }

    for (const button of languageButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
    }
  }

  for (const button of viewButtons) {
    button.addEventListener("click", () => {
      currentView = button.dataset.view;
      render();
    });
  }

  for (const button of languageButtons) {
    button.addEventListener("click", () => {
      currentLanguage = button.dataset.language;
      render();
    });
  }

  render();
})();
