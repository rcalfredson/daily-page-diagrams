(function () {
  const diagram = document.querySelector("#diagram");
  const download = document.querySelector("#download");
  let currentUrl;

  const svg = SpacetimeIntervalStationTest.createSvg({ language: "en" });
  diagram.innerHTML = svg;
  currentUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  download.href = currentUrl;
  download.download = "spacetime-interval-station-test.svg";

  window.addEventListener("pagehide", () => URL.revokeObjectURL(currentUrl), { once: true });
})();
