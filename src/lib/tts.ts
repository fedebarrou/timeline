let currentUtterance: SpeechSynthesisUtterance | null = null;
let onProgressCb: ((progress: number) => void) | null = null;
let onEndCb: (() => void) | null = null;
let chosenVoiceName: string | null = null;

const STORAGE_KEY = 'biblia-tts-voice';

if (typeof window !== 'undefined') {
  chosenVoiceName = localStorage.getItem(STORAGE_KEY);
}

export function getSpanishVoices(): SpeechSynthesisVoice[] {
  if (!('speechSynthesis' in window)) return [];
  return speechSynthesis.getVoices().filter((v) => v.lang.startsWith('es'));
}

function scoreVoice(v: SpeechSynthesisVoice): number {
  let score = 0;
  const name = v.name.toLowerCase();
  // Prefer neural / natural / online quality markers
  if (/neural|natural|online|premium|wavenet|enhanced|cloud/i.test(name)) score += 100;
  // Prefer male narrator names traditionally used for biblical reading
  if (/diego|jorge|enrique|carlos|pablo|miguel|alvaro|esteban/i.test(name)) score += 30;
  // Penalize very robotic-sounding default voices
  if (/microsoft david|microsoft mark|microsoft hazel|google.*female/i.test(name)) score -= 10;
  // Edge-specific neural voices
  if (/microsoft.*\(natural\)/i.test(name)) score += 50;
  // Slight preference for es-ES over Latin variants (more "classical narration" feel)
  if (v.lang === 'es-ES') score += 5;
  return score;
}

export function getPreferredVoice(): SpeechSynthesisVoice | null {
  const voices = getSpanishVoices();
  if (voices.length === 0) return null;
  if (chosenVoiceName) {
    const explicit = voices.find((v) => v.name === chosenVoiceName);
    if (explicit) return explicit;
  }
  const sorted = [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a));
  return sorted[0];
}

export function setVoice(name: string) {
  chosenVoiceName = name;
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, name);
}

export function getCurrentVoiceName(): string | null {
  const v = getPreferredVoice();
  return v?.name ?? null;
}

export function speak(text: string, opts: { rate?: number; pitch?: number; volume?: number } = {}) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis not supported');
    return;
  }
  cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voice = getPreferredVoice();
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? 'es-ES';
  u.rate = opts.rate ?? 0.9;
  u.pitch = opts.pitch ?? 1.0;
  u.volume = opts.volume ?? 1.0;

  u.onend = () => { currentUtterance = null; if (onEndCb) onEndCb(); };
  u.onerror = () => { currentUtterance = null; if (onEndCb) onEndCb(); };
  u.onboundary = (e) => {
    if (onProgressCb && u.text.length > 0) {
      onProgressCb(e.charIndex / u.text.length);
    }
  };

  currentUtterance = u;
  speechSynthesis.speak(u);
}

export function pause() { if ('speechSynthesis' in window) speechSynthesis.pause(); }
export function resume() { if ('speechSynthesis' in window) speechSynthesis.resume(); }
export function cancel() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  currentUtterance = null;
}
export function isSpeaking(): boolean {
  return 'speechSynthesis' in window && speechSynthesis.speaking;
}
export function onProgress(cb: (progress: number) => void) { onProgressCb = cb; }
export function onEnd(cb: () => void) { onEndCb = cb; }

// Voices load asynchronously in Chrome — caller can register for updates
export function onVoicesChanged(cb: () => void) {
  if ('speechSynthesis' in window) {
    speechSynthesis.addEventListener('voiceschanged', cb);
  }
}
