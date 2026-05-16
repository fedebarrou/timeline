let currentUtterance: SpeechSynthesisUtterance | null = null;
let onProgressCb: ((progress: number) => void) | null = null;
let onEndCb: (() => void) | null = null;

export function getSpanishVoices(): SpeechSynthesisVoice[] {
  if (!('speechSynthesis' in window)) return [];
  return speechSynthesis.getVoices().filter((v) => v.lang.startsWith('es'));
}

export function getPreferredVoice(): SpeechSynthesisVoice | null {
  const voices = getSpanishVoices();
  if (voices.length === 0) return null;
  // Prefer male voices for a biblical narrator feel
  const malePref = voices.find((v) =>
    /diego|jorge|enrique|carlos|google.*masculino|microsoft.*pablo|microsoft.*helena/i.test(v.name)
  );
  return malePref ?? voices[0];
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
  u.lang = 'es-ES';
  u.rate = opts.rate ?? 0.85;     // slightly slower for solemn feel
  u.pitch = opts.pitch ?? 0.95;
  u.volume = opts.volume ?? 1.0;

  u.onend = () => {
    currentUtterance = null;
    if (onEndCb) onEndCb();
  };
  u.onerror = () => {
    currentUtterance = null;
    if (onEndCb) onEndCb();
  };
  u.onboundary = (e) => {
    if (onProgressCb && u.text.length > 0) {
      onProgressCb(e.charIndex / u.text.length);
    }
  };

  currentUtterance = u;
  speechSynthesis.speak(u);
}

export function pause() {
  if ('speechSynthesis' in window) speechSynthesis.pause();
}

export function resume() {
  if ('speechSynthesis' in window) speechSynthesis.resume();
}

export function cancel() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  currentUtterance = null;
}

export function isSpeaking(): boolean {
  return 'speechSynthesis' in window && speechSynthesis.speaking;
}

export function onProgress(cb: (progress: number) => void) {
  onProgressCb = cb;
}

export function onEnd(cb: () => void) {
  onEndCb = cb;
}

export function setVoiceByName(name: string) {
  const voices = getSpanishVoices();
  const v = voices.find((x) => x.name === name);
  if (v && currentUtterance) currentUtterance.voice = v;
}
