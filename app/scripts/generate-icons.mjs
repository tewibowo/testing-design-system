// Generates PWA icons from the StraitsX logomark: vibrant green mark
// centered on deep ivy. Run once: npm run generate-icons
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, "../public/icons");
const logoPath = path.resolve(here, "../../src/assets/logomark-full.svg");
const IVY = { r: 0, g: 43, b: 42, alpha: 1 };

await mkdir(outDir, { recursive: true });
const logoSvg = await readFile(logoPath);

async function makeIcon(size, logoRatio, file) {
  const logoW = Math.round(size * logoRatio);
  const logo = await sharp(logoSvg).resize({ width: logoW }).png().toBuffer();
  const meta = await sharp(logo).metadata();
  await sharp({
    create: { width: size, height: size, channels: 4, background: IVY }
  })
    .composite([
      {
        input: logo,
        left: Math.round((size - meta.width) / 2),
        top: Math.round((size - meta.height) / 2)
      }
    ])
    .png()
    .toFile(path.join(outDir, file));
  console.log("wrote", file);
}

await makeIcon(512, 0.56, "icon-512.png");
await makeIcon(192, 0.56, "icon-192.png");
await makeIcon(512, 0.42, "icon-maskable-512.png"); // safe zone for maskable
await makeIcon(180, 0.56, "apple-touch-icon.png");
