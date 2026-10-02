(function () {
  const diagram = document.querySelector("#diagram");
  const download = document.querySelector("#download");
  const svg = NeuronalNeurotransmission.createSvg();
  const currentUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));

  diagram.innerHTML = svg;
  download.href = currentUrl;
  download.download = "neuronal-neurotransmission.svg";

  window.addEventListener("pagehide", () => URL.revokeObjectURL(currentUrl), { once: true });
})();
