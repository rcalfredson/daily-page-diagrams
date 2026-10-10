(function () {
  const svg = DnaMethylation.createSvg();
  document.querySelector("#diagram").innerHTML = svg;
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  document.querySelector("#download").href = url;
  window.addEventListener("pagehide", () => URL.revokeObjectURL(url), { once: true });
})();
