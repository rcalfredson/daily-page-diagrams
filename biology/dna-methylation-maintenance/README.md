# How Does DNA Methylation Survive Replication?

An original companion to [What Changes When DNA Is Methylated?](../dna-methylation/) for Daily Page's article **What Is DNA Methylation, and How Does It Affect Gene Expression?**

## Generate and preview

From the repository root:

```bash
source /home/robert/.nvm/nvm.sh
nvm use 24
node biology/dna-methylation-maintenance/render.js
```

The canonical asset is `output/dna-methylation-maintenance.svg`. The generator uses built-in Node modules only. Open `index.html` in a browser for a responsive preview and SVG download; the browser and command-line renderer share `diagram.js`.

```bash
inkscape biology/dna-methylation-maintenance/output/dna-methylation-maintenance.svg --export-type=png --export-filename=biology/dna-methylation-maintenance/output/dna-methylation-maintenance.png --export-width=1400
inkscape biology/dna-methylation-maintenance/output/dna-methylation-maintenance.svg --export-type=png --export-filename=biology/dna-methylation-maintenance/output/dna-methylation-maintenance-mobile.png --export-width=350
```

PNG previews are local generated artifacts, ignored by Git under the existing repository policy.

## Design and interpretation

The 700 × 1740 viewBox stacks three stages and keeps both daughter molecules side by side. The warm paper (#fbf8f1), slate (#263746), rust methyl accent (#a94829), teal annotations (#28758a), Georgia title, and Arial/Helvetica text match the first diagram. Supporting labels display at 12 px at a 350-pixel article width; bases display at 15 px. All graphics are editable SVG elements, with live text and no external images or font dependencies.

- **A — Before replication:** `5′-ACGT-3′` pairs with `3′-TGCA-5′`. The methylated top C is at column 2, the methylated lower C at column 3. Each C pairs with G. Small teal arrows show the opposite directions of the two CpG dinucleotides. Backbone lines abstract sugar–phosphate connections; dotted rungs indicate pairing without specifying hydrogen-bond counts.
- **B — Immediately after replication:** A fork leads to two daughters. Parent 1 stays on the upper strand of the left daughter; parent 2 stays on the lower strand of the right daughter. Dark solid backbones identify parental DNA, while lighter dashed backbones identify new DNA. Each daughter has one original methyl group and an initially unmodified corresponding cytosine on its new strand: a hemimethylated CpG dyad. Repeated parent labels and preserved strand positions make inheritance traceable independently of color.
- **C — Maintenance:** UHRF1 helps recognize these hemimethylated sites and recruit DNMT1. DNMT1 catalyzes new methyl-group addition to the new-strand cytosines. Both daughter CpGs end methylated on both strands. The new marks are explicitly labeled `new CH₃`; original marks remain in their original positions. New backbones remain light and dashed after methylation to preserve their identity.

The donor is acknowledged in one line but not drawn; it is SAM (S-adenosylmethionine), introduced in the article. No methyl group moves from parental DNA to new DNA, and UHRF1 is not shown catalyzing methyl addition. Enzyme shapes and detailed chromatin interactions are omitted to keep the molecular logic clear.

This is a simplified example of canonical mammalian CpG maintenance, not a claim that all marks are copied perfectly, that all methylation occurs at CpG, or that this is the only pathway affecting methylation. The three stages explain a logical sequence, not a measured delay: maintenance can be closely coupled to replication. A single methylated CpG dyad is shown, rather than a larger pattern with unmethylated sites.

## Scientific verification

References checked:

- [Cooper, The Cell: DNA Replication (NCBI Bookshelf)](https://www.ncbi.nlm.nih.gov/books/NBK9940/): semiconservative replication creates a complementary new strand using each parental strand as a template.
- [Pradhan et al., 1999](https://pubmed.ncbi.nlm.nih.gov/10551868/): biochemical evidence that human DNMT1 preferentially methylates hemimethylated DNA. Preference does not mean exclusive activity.
- [Song et al., 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC4693633/): productive DNMT1 binding to a hemimethylated CpG dyad, recognition of the parental methylcytosine, and catalysis at the distinct target cytosine. The complementary dyad and Watson–Crick methylcytosine–guanine pairing support the depicted CpG geometry.
- [Bostick et al., 2007](https://pubmed.ncbi.nlm.nih.gov/17673620/): UHRF1 preferentially binds hemimethylated CpG and interacts with DNMT1, supporting recruitment during maintenance in mammalian cells.
- [Hashimoto et al., 2008](https://pubmed.ncbi.nlm.nih.gov/18772888/): structural evidence for hemimethylated CpG recognition by the UHRF1 SRA domain.
- [Pradhan et al., 1999, kinetic study](https://pubmed.ncbi.nlm.nih.gov/10551869/): DNMT1 catalysis uses AdoMet (SAM), supporting donor-derived addition rather than transfer of the parental methyl group.

## Validation and inspection

JavaScript syntax checks passed for all three scripts. The generated SVG was parsed as XML and checked for unique IDs, a valid accessible title and description, live text, and absence of external dependencies. Molecular checks confirmed complementary sequences and antiparallel directions in all five duplexes, correct CpG cytosine columns, C–G pairing of every methylated base, one retained parental strand per daughter, and methyl counts of 2 → (1, 1) → (2, 2). Repeated generation was byte-for-byte identical; browser and Node generation also produced identical SVG text.

Inkscape rendered the 1400- and 350-pixel previews successfully. Both actual raster outputs were visually inspected for strand identity, mark placement, CpG directions, legibility, and label spacing. The local Inkscape installation emitted GTK/Pango initialization and unwritable preferences-log warnings; they did not prevent export.

## Article use

Suggested caption:

> After DNA replication, each daughter retains one methylated parental strand. UHRF1 and DNMT1 help restore CpG methylation on the newly synthesized strands. This simplified mammalian pathway shows how a pattern can be maintained; individual marks are not always preserved.

Suggested alt text:

> A methylated CpG on both parental DNA strands branches into two daughter molecules after replication. Each daughter retains one parental strand and its methyl group, paired with an initially unmethylated new strand. UHRF1 helps recognize these hemimethylated sites and recruit DNMT1. DNMT1 adds new methyl groups to the appropriate cytosines on the new strands, restoring methylation on both strands while the original marks stay in place.

The SVG embeds a title and detailed description. Supply alt text when embedding it through an HTML image element.
