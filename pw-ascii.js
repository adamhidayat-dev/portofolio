const fs = require("fs");
const { PNG } = require("pngjs");

const file = process.argv[2] || "pw-canvas.png";
const png = PNG.sync.read(fs.readFileSync(file));

const COLS = 72;
const ROWS = 24;
const cellW = Math.max(1, Math.floor(png.width / COLS));
const cellH = Math.max(1, Math.floor(png.height / ROWS));

const ramp = " .:-=+*#%@";
let out = "";
for (let ry = 0; ry < ROWS; ry++) {
  let line = "";
  for (let rx = 0; rx < COLS; rx++) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = ry * cellH; y < (ry + 1) * cellH && y < png.height; y++) {
      for (let x = rx * cellW; x < (rx + 1) * cellW && x < png.width; x++) {
        const i = (y * png.width + x) * 4;
        r += png.data[i]; g += png.data[i + 1]; b += png.data[i + 2]; n++;
      }
    }
    if (!n) continue;
    r /= n; g /= n; b /= n;
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    let ch = ramp[Math.min(ramp.length - 1, Math.floor(lum * ramp.length))];
    // mark anything warm/colored distinctly
    if (r > 60 && g > 60 && b > 60 && (r - b) > 20) ch = "c";
    line += ch;
  }
  out += line + "\n";
}
console.log(out);
console.log(`cell=${cellW}x${cellH}px, canvas=${png.width}x${png.height}`);
