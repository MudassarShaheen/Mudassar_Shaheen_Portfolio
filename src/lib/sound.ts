/**
 * Tiny procedural UI sound-effect layer built on the Web Audio API —
 * no external audio files, so there's nothing to license. Sounds only
 * ever fire from a real user gesture (click/hover), which satisfies
 * browser autoplay policies automatically.
 *
 * Muted by default — a visitor has to opt in via the audio toggle.
 */

let ctx: AudioContext | null = null;
let enabled = false;

const STORAGE_KEY = "ms-portfolio-sound-enabled";

const getContext = () => {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

export const isSoundEnabled = () => enabled;

export const initSound = () => {
  try {
    enabled = localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    enabled = false;
  }
  return enabled;
};

export const setSoundEnabled = (value: boolean) => {
  enabled = value;
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // ignore — sound preference just won't persist this session
  }
};

/** Short, soft blip. freq/duration tuned per interaction type. */
const playTone = (freq: number, duration: number, gain: number, type: OscillatorType = "sine") => {
  if (!enabled) return;
  const audio = getContext();
  if (!audio) return;

  const osc = audio.createOscillator();
  const gainNode = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audio.currentTime);
  gainNode.gain.setValueAtTime(0, audio.currentTime);
  gainNode.gain.linearRampToValueAtTime(gain, audio.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);

  osc.connect(gainNode);
  gainNode.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + duration);
};

export const playHoverSound = () => playTone(880, 0.08, 0.03, "sine");
export const playClickSound = () => playTone(520, 0.12, 0.05, "triangle");
export const playToggleSound = () => playTone(660, 0.1, 0.04, "sine");
