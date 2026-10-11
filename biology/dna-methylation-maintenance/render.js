const fs = require("node:fs");
const path = require("node:path");
const { createSvg } = require("./diagram.js");

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log("Usage: node render.js\n\nWrites output/dna-methylation-maintenance.svg");
  process.exit(0);
}
if (process.argv.length > 2) {
  console.error(`Unknown argument: ${process.argv[2]}`);
  process.exit(1);
}
const directory = path.join(__dirname, "output");
fs.mkdirSync(directory, { recursive: true });
const file = path.join(directory, "dna-methylation-maintenance.svg");
fs.writeFileSync(file, createSvg(), "utf8");
console.log(path.relative(process.cwd(), file));
