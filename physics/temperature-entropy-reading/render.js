const fs = require("node:fs");
const path = require("node:path");
const { createSvg } = require("./diagram.js");

const outputDirectory = path.join(__dirname, "output");
fs.mkdirSync(outputDirectory, { recursive: true });

for (const view of ["clean", "annotated"]) {
  const file = path.join(outputDirectory, `ts-reading-${view}.svg`);
  fs.writeFileSync(file, createSvg({ annotated: view === "annotated" }), "utf8");
  console.log(path.relative(process.cwd(), file));
}
