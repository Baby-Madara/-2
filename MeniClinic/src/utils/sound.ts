// Web Audio API gentle clinical notification chime (zero external audio file dependencies)

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * Plays a soft, calm two-note clinical reception chime (D5 -> A5)
 * when a new patient is added to the waiting list in the Patients Lounge.
 */
export function playGentleWaitingChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // First note: D5 (587.33 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);

    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.exponentialRampToValueAtTime(0.11, now + 0.025);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.29);

    // Second note: A5 (880 Hz) - warm fifth interval
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.12);

    gain2.gain.setValueAtTime(0.0001, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.13, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.56);
  } catch {
    // Ignore audio autoplay block if no user gesture yet
  }
}

/**
 * Plays a distinctive, bright 3-note ascending chime (C5 -> E5 -> G5 -> C6)
 * for Reception when the Doctor finishes break and presses "العودة للعمل".
 */
export function playDoctorBackToWorkChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, start: 0, duration: 0.22, peak: 0.13 }, // C5
      { freq: 659.25, start: 0.11, duration: 0.24, peak: 0.14 }, // E5
      { freq: 783.99, start: 0.22, duration: 0.28, peak: 0.15 }, // G5
      { freq: 1046.5, start: 0.34, duration: 0.52, peak: 0.16 }, // C6
    ];

    notes.forEach(({ freq, start, duration, peak }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + start);

      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(peak, now + start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.02);
    });
  } catch {
    // Ignore audio autoplay block
  }
}

/**
 * Plays a gentle two-pulse refusal tone when Reception attempts to send a patient
 * into the Doctor's room while the Doctor is on break ("استراحة").
 */
export function playBreakBlockedAlertSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const pulses = [
      { freq: 349.23, start: 0, duration: 0.16 }, // F4
      { freq: 293.66, start: 0.18, duration: 0.24 }, // D4
    ];

    pulses.forEach(({ freq, start, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + start);

      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(0.12, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.02);
    });
  } catch {
    // Ignore audio autoplay block
  }
}

/**
 * Plays an attention-calling two-chime pager tone (G5 -> C6, repeated)
 * when the Doctor presses "استدعاء" to summon the Receptionist to the office.
 */
export function playSummonReceptionistChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { freq: 783.99, start: 0, duration: 0.18, peak: 0.14 }, // G5
      { freq: 1046.5, start: 0.15, duration: 0.25, peak: 0.16 }, // C6
      { freq: 783.99, start: 0.42, duration: 0.18, peak: 0.14 }, // G5
      { freq: 1046.5, start: 0.57, duration: 0.35, peak: 0.16 }, // C6
    ];

    notes.forEach(({ freq, start, duration, peak }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + start);

      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(peak, now + start + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.02);
    });
  } catch {
    // Ignore audio autoplay block
  }
}


