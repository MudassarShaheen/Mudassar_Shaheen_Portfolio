/**
 * Run this LOCALLY on your own machine to generate the voice intro.
 * Your API key never leaves your terminal — it is not sent to, stored by,
 * or seen by anyone else.
 *
 * Usage (PowerShell):
 *   $env:ELEVENLABS_API_KEY="paste-your-key-here"
 *   node scripts/generate-intro.mjs
 *
 * Usage (Git Bash / macOS / Linux):
 *   ELEVENLABS_API_KEY="paste-your-key-here" node scripts/generate-intro.mjs
 *
 * Output: public/intro.mp3 — the site's audio-intro button auto-detects
 * this file and appears once it exists.
 */

const VOICE_ID = "dRfCwSe7YhgAiw3FyPbz";
const OUT_PATH = new URL("../public/intro.mp3", import.meta.url);

const SCRIPT_TEXT =
  "Hey, I'm Mudassar Shaheen — a Senior Unity Developer and Technical Project Manager. " +
  "I build interactive games and immersive experiences across VR, XR, and mobile — " +
  "from gameplay systems to AI-powered worlds. Welcome to my portfolio.";

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error("Set ELEVENLABS_API_KEY in your shell before running this script.");
  process.exit(1);
}

const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
  method: "POST",
  headers: {
    "xi-api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "audio/mpeg",
  },
  body: JSON.stringify({
    text: SCRIPT_TEXT,
    model_id: "eleven_multilingual_v2",
    voice_settings: { stability: 0.5, similarity_boost: 0.8 },
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
