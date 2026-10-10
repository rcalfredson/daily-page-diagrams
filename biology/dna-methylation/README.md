# What Changes When DNA Is Methylated?

An original two-panel illustration for Daily Page's foundational article **What Is DNA Methylation, and How Does It Affect Gene Expression?**

## Generate and preview

```bash
node biology/dna-methylation/render.js
```

Uses built-in Node modules only. If Node is not on the path, load Robert's nvm installation first:

```bash
source /home/robert/.nvm/nvm.sh
nvm use 24
```

The canonical asset is `output/dna-methylation.svg`. Open `index.html` directly in a browser for a responsive preview and SVG download link. The browser and command-line generator use the same `diagram.js` source.

Render publication and mobile inspection previews from the repository root:

```bash
inkscape biology/dna-methylation/output/dna-methylation.svg --export-type=png --export-filename=biology/dna-methylation/output/dna-methylation.png --export-width=1400
inkscape biology/dna-methylation/output/dna-methylation.svg --export-type=png --export-filename=biology/dna-methylation/output/dna-methylation-mobile.png --export-width=350
```

PNG exports are local generated artifacts, ignored by Git under the repository's existing policy.

## Design and interpretation

The 700 × 1140 viewBox stacks panels A and B for article embedding without horizontal scrolling. Labels are live SVG text using local Arial/Helvetica/sans-serif fonts; the title uses Georgia/Times/serif. Warm paper, dark slate, teal position markers, and a rust methyl accent follow the existing biology palette. Shape, labels, and placement explain the modification independently of color. Supporting labels render at 12 px at a 350-pixel display width; main explanatory text renders at 13 px.

- **A:** Chemically explicit skeletal drawings show cytosine and 5-methylcytosine **as bases attached to DNA**, with their sugar connections indicated at N1. They are not drawings of isolated free bases: there is no N1–H bond. The same amino/keto tautomer is used for both. Ring positions are N1, C2, N3, C4, C5, C6; oxygen is double-bonded to C2, NH₂ is attached to C4, and the internal double bonds are N3=C4 and C5=C6. The only change is substitution of the implicit hydrogen at C5 by CH₃. The numeral 5 identifies the carbon position, not an extra atom. DNMT labels the catalyzing enzyme; the methyl donor and reaction byproducts are omitted.
- **B:** A schematic ladder pairs top `5′-ATCGAT-3′` with bottom `3′-TAGCTA-5′`. The bracket spans C then G along the top strand. The methylated top C still pairs with bottom G; no nucleotide letter changes. The connecting backbone strokes abstract the sugar–phosphate backbone and the dotted rungs indicate pairing, without encoding individual atoms or hydrogen-bond counts. Only one strand is methylated in this illustration.

Most mammalian cytosine methylation occurs in a CpG context; non-CpG methylation also exists. This figure introduces the common context without claiming it is universal. It makes no claim about gene silencing or other regulatory outcomes.

## Scientific verification

References checked for the molecular connectivity and interpretation:

- [PubChem: cytosine, CID 597](https://pubchem.ncbi.nlm.nih.gov/compound/597) and [5-methylcytosine, CID 65040](https://pubchem.ncbi.nlm.nih.gov/compound/65040): standard molecular identities and connectivity, amino/oxo substituents, and methyl substitution at position 5. The drawings use the conventional DNA amino/keto tautomer and replace the free base's N1 hydrogen with the indicated sugar connection.
- [UCSC Genome Browser: DNA methylation](https://www.genome.ucsc.edu/training/education/methylation.html): methyl groups attach to cytosine carbon 5 while the nucleotide sequence remains unchanged.
- [NCBI Bookshelf: Accessing the Genome](https://www.ncbi.nlm.nih.gov/books/NBK21137/): the 5′–CG–3′ methylation context and maintenance methylation after replication.
- [NHGRI: DNA](https://www.genome.gov/genetics-glossary/Deoxyribonucleic-Acid-DNA): complementary A–T and C–G pairing.
- [Modified Nucleotides for Discrimination between Cytosine and the Epigenetic Marker 5-Methylcytosine (2016)](https://pubmed.ncbi.nlm.nih.gov/26835661/): cytosine methylation does not directly interfere with Watson–Crick pairing.

The generated SVG was parsed as XML, checked for matching accessibility IDs, live text, lack of external assets, and complementary sequence letters. Regeneration was checked for byte-for-byte determinism. Inkscape previews were inspected at 1400 and 350 pixels wide for ring connectivity, correct methyl attachment, pairing, label spacing, and layout balance.

## Article use

Suggested caption:

> DNA methylation adds a methyl group to cytosine without changing the underlying DNA sequence.

Suggested alt text:

> Two panels show how DNA methylation modifies an existing cytosine. A CH₃ group is added at carbon 5 of the cytosine ring to form 5-methylcytosine. In a short double-stranded DNA segment, the modified cytosine still pairs with guanine. CpG marks cytosine followed by guanine along the same strand. The DNA sequence stays the same.

The SVG includes an accessible title and detailed description. For an HTML image, supply the suggested alt text; the caption can also explain that only one strand is shown methylated.
