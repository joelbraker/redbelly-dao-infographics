# Redbelly Explained

An 11-part explainer series on Redbelly's core ideas. Each topic is supplied in three formats.

## What is here

- `png/`: the 33 final images, exported at 2x the minimum size
  - Landscape 16:9: 3840 × 2160 (`*_16x9.png`)
  - Portrait 4:5: 2160 × 2700 (`*_4x5.png`)
  - Square 1:1: 2160 × 2160 (`*_1x1.png`)
- `SOURCES.md`: where each infographic's facts come from.
- `index.html`: the showcase site. It has live animated plates, a format switcher and links to every PNG.
- Editable source:
  - `src/content.js`: all copy (titles, ledes, notes, source lines)
  - `src/diagrams.js`: the 11 hand-drawn SVG diagrams
  - `src/plate.css`: layout for the three formats, brand colours and motion
  - `src/plate.js`: builds a plate from content and diagram
  - `src/sources.js`: the full source map
  - `src/glossary.js`: every short form used on the plates, its full form and the plate numbers it appears on
  - `plate.html?id=04&f=45`: a single plate in the browser. `f` is `169`, `45` or `11`; add `&anim=1` for motion.
- `assets/`: the brand logo vectors from the guidelines PDF, plus the two brand fonts (both OFL): Readex Pro for headers and Be Vietnam Pro for text.

## Re-exporting after edits

Requires Node and Playwright.

    node export.js --scale=2 --out=png        # all 33
    node export.js 04 10 --scale=2 --out=png  # only some plates

The exporter warns if any text overflows a frame.
