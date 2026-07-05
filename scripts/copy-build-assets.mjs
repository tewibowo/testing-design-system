// Copies non-JS build assets (CSS, fonts, SVGs) from src/ into dist/,
// mirroring the source layout so relative paths (e.g. tokens.css's
// `../fonts/...`, PartnerLogo's `../../assets/partners/...`) keep resolving
// correctly after the Babel build. Skips dev-only trees (stories, examples,
// docs) that the package doesn't ship.
import { cp, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

async function copyDir(src, dest, options = {}) {
  await mkdir(path.dirname(dest), { recursive: true });
  await cp(src, dest, { recursive: true, ...options });
}

await copyDir(path.join(ROOT, "src/fonts"), path.join(ROOT, "dist/fonts"));
await copyDir(path.join(ROOT, "src/assets"), path.join(ROOT, "dist/assets"));
await copyDir(path.join(ROOT, "src/styles"), path.join(ROOT, "dist/styles"));

// Per-component CSS files live alongside their .jsx — copy just the .css.
await copyDir(path.join(ROOT, "src/components"), path.join(ROOT, "dist/components"), {
  filter: (source) => !source.endsWith(".jsx") && !source.endsWith(".js"),
});

console.log("Copied fonts/, assets/, styles/, and component CSS into dist/");
