(function () {
  const diagram = document.querySelector("#diagram");
  const download = document.querySelector("#download");
  const languageButtons = [...document.querySelectorAll("[data-language]")];
  let currentLanguage = "en";
  let currentUrl;

  function render() {
    const svg = LightConeCausalMap.createSvg({ language: currentLanguage });
    diagram.innerHTML = svg;

    if (currentUrl) URL.revokeObjectURL(currentUrl);
    currentUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    download.href = currentUrl;
    const languageSuffix = currentLanguage === "en" ? "" : `-${currentLanguage}`;
    download.download = `light-cone-causal-map${languageSuffix}.svg`;

    for (const button of languageButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
    }
  }

  for (const button of languageButtons) {
    button.addEventListener("click", () => {
      currentLanguage = button.dataset.language;
      render();
    });
  }

  render();

  window.addEventListener("pagehide", () => URL.revokeObjectURL(currentUrl), { once: true });
})();
