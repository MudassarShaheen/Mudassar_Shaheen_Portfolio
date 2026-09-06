/**
 * Downloads a real thumbnail for every video referenced in
 * src/data/projects.ts into public/thumbs/<videoId>.jpg.
 *
 * Run after adding or swapping a video:
 *   npm run thumbs
 *
 * Why local copies instead of hotlinking: Google Drive answers with HTTP
 * 429 once a page requests a dozen thumbnails at once, which left tiles
 * blank. Serving them from our own origin removes that dependency and
 * skips a third-party round-trip on every page view.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";

const DATA = new URL("../src/data/projects.ts", import.meta.url);
const OUT_DIR = new URL("../public/thumbs/", import.meta.url);

const source = await readFile(DATA, "utf8");

const targets = new Map();
for (const m of source.matchAll(/youtube\.com\/embed\/([A-Za-z0-9_-]+)/g)) {
  targets.set(m[1], `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`);
}
for (const m of source.matchAll(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/g)) {
  targets.set(m[1], `https://drive.google.com/thumbnail?id=${m[1]}&sz=w800`);
}

await mkdir(OUT_DIR, { recursive: true });

let ok = 0;
const failed = [];

for (const [id, url] of targets) {
  try {
    const res = await fetch(url);
    const buffer = Buffer.from(await res.arrayBuffer());
    // Drive returns a small HTML error page instead of an image when it
    // throttles or the file isn't shared publicly.
    if (!res.ok || buffer.length < 2000) throw new Error(`${res.status}, ${buffer.length} bytes`);
    await writeFile(new URL(`${id}.jpg`, OUT_DIR), buffer);
    ok++;
  } catch (err) {
    failed.push(`${id} (${err.message})`);
  }
  // Stay well under Drive's rate limit.
  await new Promise((r) => setTimeout(r, 400));
}

console.log(`Saved ${ok}/${targets.size} thumbnails to public/thumbs/`);
if (failed.length) {
  console.log("Failed — check these videos are shared publicly:");
  failed.forEach((f) => console.log(`  ${f}`));
}
