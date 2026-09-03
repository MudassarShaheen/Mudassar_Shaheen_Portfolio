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

/**
 * Procedural ambient background drone — a few detuned, slowly-modulated
 * oscillators through a lowpass filter. No external audio file, so there
 * is nothing to license or fail to load. Independent of the UI-blip
 * `enabled` flag above; the ambient toggle controls this on its own.
 */
let droneNodes: { stop: () => void } | null = null;

export const isAmbientPlaying = () => droneNodes !== null;

export const startAmbientDrone = () => {
  if (droneNodes) return;
  const audio = getContext();
  if (!audio) return;

  const master = audio.createGain();
  master.gain.setValueAtTime(0, audio.currentTime);
  master.gain.linearRampToValueAtTime(0.05, audio.currentTime + 2.5);
  master.connect(audio.destination);

  const filter = audio.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 420;
  filter.connect(master);

  // A soft, detuned stack — root, fifth, and an octave-up shimmer.
  const oscillators = [
    { freq: 55, gain: 0.5, type: "sine" as OscillatorType },
    { freq: 82.41, gain: 0.35, type: "sine" as OscillatorType },
    { freq: 110, gain: 0.2, type: "triangle" as OscillatorType },
  ].map(({ freq, gain, type }) => {
    const osc = audio.createOscillator();
    const gainNode = audio.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = (Math.random() - 0.5) * 6;
    gainNode.gain.value = gain;
    osc.connect(gainNode);
    gainNode.connect(filter);
    osc.start();
    return osc;
  });

  // Slow LFO breathing the filter cutoff for gentle, evolving movement.
  const lfo = audio.createOscillator();
  const lfoGain = audio.createGain();
  lfo.frequency.value = 0.05;
  lfoGain.gain.value = 160;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  droneNodes = {
    stop: () => {
      const now = audio.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 1);
      setTimeout(() => {
        oscillators.forEach((o) => o.stop());
        lfo.stop();
      }, 1100);
    },
  };
};

export const stopAmbientDrone = () => {
  droneNodes?.stop();
  droneNodes = null;
};
