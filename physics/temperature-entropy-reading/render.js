const fs = require("node:fs");
const path = require("node:path");
const { createSvg, LANGUAGES } = require("./diagram.js");

function printUsage() {
  console.log(`Usage: node render.js [--language <${LANGUAGES.join("|")}>]

Options:
  -l, --language  Language for diagram text (default: en)
  -h, --help      Show this help message`);
}

function parseArguments(args) {
  let language = "en";

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === "-h" || argument === "--help") {
      printUsage();
      process.exit(0);
    }

    if (argument === "-l" || argument === "--language") {
      language = args[index + 1];
      index += 1;
    } else if (argument.startsWith("--language=")) {
      language = argument.slice("--language=".length);
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  if (!LANGUAGES.includes(language)) {
    throw new Error(`Unsupported language: ${language || "(missing)"}. Expected one of: ${LANGUAGES.join(", ")}`);
  }

  return { language };
}

let options;
try {
  options = parseArguments(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  printUsage();
  process.exit(1);
}

const outputDirectory = path.join(__dirname, "output");
fs.mkdirSync(outputDirectory, { recursive: true });

for (const view of ["clean", "annotated"]) {
  const languageSuffix = options.language === "en" ? "" : `-${options.language}`;
  const file = path.join(outputDirectory, `ts-reading-${view}${languageSuffix}.svg`);
  fs.writeFileSync(
    file,
    createSvg({ annotated: view === "annotated", language: options.language }),
    "utf8",
  );
  console.log(path.relative(process.cwd(), file));
}
