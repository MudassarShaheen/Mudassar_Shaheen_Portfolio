/**
 * Run this LOCALLY to generate a looping ambient background track via
 * ElevenLabs' sound-generation API. Same rule as generate-intro.mjs — the
 * key stays in your own terminal.
 *
 * Usage (PowerShell):
 *   $env:ELEVENLABS_API_KEY="paste-your-key-here"
 *   node scripts/generate-ambient.mjs
 *
 * Usage (Git Bash / macOS / Linux):
 *   ELEVENLABS_API_KEY="paste-your-key-here" node scripts/generate-ambient.mjs
 *
 * Output: public/ambient.mp3 — the site's music toggle auto-detects this
 * file and appears once it exists. ElevenLabs generates up to ~22s per
 * call; the site loops it automatically, so a short atmospheric loop is
 * exactly what you want here.
 */

const OUT_PATH = new URL("../public/ambient.mp3", import.meta.url);

// Tweak this prompt to taste — futuristic/game-dev ambience to match the
// portal/hero visuals.
const PROMPT =
  "Soft, low, futuristic sci-fi ambient drone with subtle synth pads and a gentle pulsing " +
  "undertone, looping, cinematic, calm background atmosphere, no melody, no percussion";

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error("Set ELEVENLABS_API_KEY in your shell before running this script.");
  process.exit(1);
}

const res = await fetch("https://api.elevenlabs.io/v1/sound-generation", {
  method: "POST",
  headers: {
    "xi-api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "audio/mpeg",
  },
  body: JSON.stringify({
    text: PROMPT,
    duration_seconds: 20,
    prompt_influence: 0.4,
  }),
});

if (!res.ok) {
  console.error(`ElevenLabs request failed: ${res.status} ${await res.text()}`);
  process.exit(1);
}

const buffer = Buffer.from(await res.arrayBuffer());
const fs = await import("node:fs/promises");
await fs.writeFile(OUT_PATH, buffer);
console.log(`Saved ${buffer.length} bytes to ${OUT_PATH.pathname}`);
