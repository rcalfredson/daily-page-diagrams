const fs = require("node:fs");
const path = require("node:path");
const { createSvg } = require("./diagram.js");

if (process.argv.includes("-h") || process.argv.includes("--help")) {
  console.log("Usage: node render.js\n\nWrites output/neuronal-neurotransmission.svg");
  process.exit(0);
}

if (process.argv.length > 2) {
  console.error(`Unknown argument: ${process.argv[2]}`);
  process.exit(1);
}

const outputDirectory = path.join(__dirname, "output");
fs.mkdirSync(outputDirectory, { recursive: true });
const file = path.join(outputDirectory, "neuronal-neurotransmission.svg");
fs.writeFileSync(file, createSvg(), "utf8");
console.log(path.relative(process.cwd(), file));
