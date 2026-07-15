/**
 * One-off generator: derives favicon/app-icon assets from public/brand/icon.png
 * (the icon-only, no-wordmark mark). Run again if the source logo changes.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const SOURCE = path.join(process.cwd(), "public", "brand", "icon.png");
const APP_DIR = path.join(process.cwd(), "src", "app");
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function main() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`Source introuvable: ${SOURCE}`);
  }

  const sizes = [16, 32, 48, 180, 192, 512] as const;
  const buffers = new Map<(typeof sizes)[number], Buffer>();

  for (const size of sizes) {
    buffers.set(size, await sharp(SOURCE).resize(size, size).png().toBuffer());
  }

  function get(size: (typeof sizes)[number]): Buffer {
    const buffer = buffers.get(size);
    if (!buffer) throw new Error(`Buffer manquant pour la taille ${size}`);
    return buffer;
  }

  // Next.js file-convention icon: auto-generates <link rel="icon"> with correct sizes/type.
  fs.writeFileSync(path.join(APP_DIR, "icon.png"), get(192));
  fs.writeFileSync(path.join(APP_DIR, "apple-icon.png"), get(180));

  // Explicit PNG sizes for the manifest and any direct references.
  fs.writeFileSync(path.join(PUBLIC_DIR, "icon-512.png"), get(512));
  fs.writeFileSync(path.join(PUBLIC_DIR, "icon-192.png"), get(192));

  // Legacy .ico fallback (multi-size container) for older browsers/crawlers.
  const icoBuffer = await pngToIco([get(16), get(32), get(48)]);
  fs.writeFileSync(path.join(APP_DIR, "favicon.ico"), icoBuffer);

  console.log("✅  Favicons générés à partir de public/brand/icon.png");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
