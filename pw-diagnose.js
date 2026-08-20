const { chromium } = require("playwright");
const fs = require("fs");
const { PNG } = require("pngjs");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const logs = [];
  let glErrorCount = 0;
  page.on("console", (m) => {
    const t = m.text();
    if (t.includes("GL_INVALID_OPERATION") || t.includes("WebGL")) glErrorCount++;
    logs.push(`[console.${m.type()}] ${t}`);
  });
  page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));

  await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);

  const sec = page.locator(".infinite-menu-section");
  const secBox = await sec.boundingBox();
  await sec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  const info = await page.evaluate(() => {
    const canvas = document.querySelector("#infinite-grid-menu-canvas");
    let out = { hasCanvas: !!canvas };
    if (canvas) {
      out.cssSize = { w: canvas.clientWidth, h: canvas.clientHeight };
      out.bufferSize = { w: canvas.width, h: canvas.height };
      const gl = canvas.getContext("webgl2");
      out.gl2 = gl ? "ok" : "null";
      if (gl) {
        out.glError = gl.getError();
        out.contextLost = gl.isContextLost ? gl.isContextLost() : "n/a";
      }
    }
    return out;
  });

  // Screenshots: full page, section, and the canvas element alone
  await page.screenshot({ path: "pw-full.png", fullPage: true });
  await page.locator(".infinite-menu-section").screenshot({ path: "pw-menu.png" });
  await page.locator("#infinite-grid-menu-canvas").screenshot({ path: "pw-canvas.png" });
  await browser.close();

  function analyze(file) {
    const png = PNG.sync.read(fs.readFileSync(file));
    let nonBlack = 0;
    let light = 0;
    for (let i = 0; i < png.data.length; i += 4) {
      const r = png.data[i];
      const g = png.data[i + 1];
      const b = png.data[i + 2];
      if (r > 40 || g > 40 || b > 40) nonBlack++;
      if (r > 150 && g > 150 && b > 150) light++;
    }
    return { w: png.width, h: png.height, total: png.width * png.height, nonBlack, light };
  }

  // Deep analysis: bounding box + avg color of the non-black region
  function deep(file) {
    const png = PNG.sync.read(fs.readFileSync(file));
    let minX = png.width, minY = png.height, maxX = -1, maxY = -1;
    let rSum = 0, gSum = 0, bSum = 0, n = 0;
    for (let y = 0; y < png.height; y++) {
      for (let x = 0; x < png.width; x++) {
        const i = (y * png.width + x) * 4;
        const r = png.data[i], g = png.data[i + 1], b = png.data[i + 2];
        if (r > 40 || g > 40 || b > 40) {
          if (x < minX) minX = x; if (x > maxX) maxX = x;
          if (y < minY) minY = y; if (y > maxY) maxY = y;
          rSum += r; gSum += g; bSum += b; n++;
        }
      }
    }
    return {
      bbox: n ? { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY } : null,
      avgColor: n ? { r: Math.round(rSum / n), g: Math.round(gSum / n), b: Math.round(bSum / n), n } : null,
    };
  }

  console.log("=== SECTION BOX ===", JSON.stringify(secBox));
  console.log("=== PAGE INFO ===", JSON.stringify(info));
  console.log("=== GL WARNING COUNT ===", glErrorCount);
  console.log("=== CANVAS PNG ===", JSON.stringify(analyze("pw-canvas.png")));
  console.log("=== CANVAS DEEP ===", JSON.stringify(deep("pw-canvas.png")));
  console.log("=== SECTION PNG ===", JSON.stringify(analyze("pw-menu.png")));
  console.log("=== LOGS (filtered) ===");
  console.log(
    logs
      .filter((l) => !l.includes("React DevTools"))
      .slice(0, 12)
      .join("\n")
  );
  console.log(logs.join("\n"));
})().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
