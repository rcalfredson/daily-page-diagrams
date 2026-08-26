(function () {
  const diagram = document.querySelector("#diagram");
  const download = document.querySelector("#download");
  const svg = LightConeCausalMap.createSvg({ language: "en" });
  let currentUrl;

  diagram.innerHTML = svg;
  currentUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  download.href = currentUrl;

  window.addEventListener("pagehide", () => URL.revokeObjectURL(currentUrl), { once: true });
})();
