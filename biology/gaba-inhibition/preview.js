(function () {
  const diagram = document.querySelector("#diagram");
  const download = document.querySelector("#download");
  const svg = GabaInhibition.createSvg();
  const currentUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));

  diagram.innerHTML = svg;
  download.href = currentUrl;
  download.download = "gaba-inhibition.svg";

  window.addEventListener("pagehide", () => URL.revokeObjectURL(currentUrl), { once: true });
})();
