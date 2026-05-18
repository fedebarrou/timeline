let currentUtterance: SpeechSynthesisUtterance | null = null;
let onProgressCb: ((progress: number) => void) | null = null;
let onEndCb: (() => void) | null = null;
let onBoundaryCb: ((charIndex: number, charLength: number) => void) | null = null;
let chosenVoiceName: string | null = null;

const STORAGE_KEY = 'timeline-tts-voice';
const STORAGE_RATE = 'timeline-tts-rate';
const STORAGE_PITCH = 'timeline-tts-pitch';

if (typeof window !== 'undefined') {
  chosenVoiceName = localStorage.getItem(STORAGE_KEY);
}

/**
 * Pre-warm the voices list. Chromium loads `speechSynthesis.getVoices()`
 * asynchronously: the first synchronous call after page load may return
 * an empty array. If we let `speak()` create an utterance before voices
 * arrive, Chrome enqueues a "voice=null" utterance that NEVER fires
 * `onstart` — the user clicks Escuchar and hears nothing, then a second
 * click (which triggers `cancel()`) reboots the engine and the queued
 * utterance suddenly plays. To dodge that whole class of bug we kick the
 * async load on module import and re-trigger on the `voiceschanged`
 * event so the internal cache is populated by the time the user clicks.
 */
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    speechSynthesis.getVoices();
    speechSynthesis.addEventListener('voiceschanged', () => {
      // Just touching getVoices() here ensures the cache is hot.
      speechSynthesis.getVoices();
    });
  } catch {}
}

// Explicit allow-list of high-quality Spanish voices across browsers/platforms.
// Lower index = higher priority. Match is substring + case-insensitive.
const PREMIUM_VOICE_CANDIDATES: string[] = [
  // Microsoft Edge "Natural" neural voices (best quality available in browser)
  'Microsoft Pablo Online (Natural)',
  'Microsoft Dalia Online (Natural)',
  'Microsoft Jorge Online (Natural)',
  'Microsoft Elvira Online (Natural)',
  'Microsoft Alvaro Online (Natural)',
  'Microsoft Helena Online (Natural)',
  'Microsoft Laura Online (Natural)',
  'Microsoft Tomas Online (Natural)',
  'Microsoft Lia Online (Natural)',
  // Microsoft non-natural online (still much better than local SAPI)
  'Microsoft Helena Online',
  'Microsoft Sabina Online',
  'Microsoft Pablo Online',
  'Microsoft Raul Online',
  'Microsoft Laura Online',
  // Google Chrome (uses Google's cloud voices on desktop)
  'Google español de Estados Unidos',
  'Google español',
  // Apple (macOS / iOS — "enhanced" / "premium" variants)
  'Mónica (Premium)',
  'Paulina (Premium)',
  'Jorge (Premium)',
  'Diego (Premium)',
  'Mónica (Enhanced)',
  'Paulina (Enhanced)',
  'Jorge (Enhanced)',
  'Diego (Enhanced)',
  'Mónica',
  'Paulina',
  'Jorge',
  'Diego',
  'Tomás',
  'Lucía',
];

/**
 * Many browsers list "ghost" voices (Microsoft "Online" / "Cloud" proxies,
 * remote engines) that `getVoices()` reports but the engine cannot actually
 * speak — they fail silently or with an `onerror`. To avoid filling the
 * dropdown with broken entries, we keep ONLY:
 *  - Google-prefixed voices (Chrome's bundled cloud voices, reliable)
 *  - Voices flagged `localService: true` AND whose name does NOT contain
 *    "Online" or "Cloud" (i.e. genuinely local OS voices, not remote proxies
 *    that lie about `localService`)
 */
function isUsableVoice(v: SpeechSynthesisVoice): boolean {
  const name = v.name;
  if (/^Google /i.test(name)) return true;
  if (v.localService && !/online|cloud/i.test(name)) return true;
  return false;
}

export function getSpanishVoices(): SpeechSynthesisVoice[] {
  if (!('speechSynthesis' in window)) return [];
  return speechSynthesis
    .getVoices()
    .filter((v) => v.lang.startsWith('es'))
    .filter(isUsableVoice);
}

/** Returns true if the voice is in the explicit premium allow-list. */
export function isPremiumVoice(v: SpeechSynthesisVoice): boolean {
  const name = v.name.toLowerCase();
  return PREMIUM_VOICE_CANDIDATES.some((c) => name.includes(c.toLowerCase()));
}

/** Returns Spanish voices flagged as "premium" by our allow-list. */
export function getPremiumSpanishVoices(): SpeechSynthesisVoice[] {
  return getSpanishVoices().filter(isPremiumVoice);
}

function scoreVoice(v: SpeechSynthesisVoice): number {
  let score = 0;
  const name = v.name;
  const lower = name.toLowerCase();

  // Highest priority — explicit allow-list ranking
  const idx = PREMIUM_VOICE_CANDIDATES.findIndex(
    (c) => lower.includes(c.toLowerCase())
  );
  if (idx !== -1) score += 1000 - idx * 10;

  // Quality markers
  if (/neural|natural|online|premium|wavenet|enhanced|cloud/i.test(name)) score += 100;
  // Edge-specific neural voices
  if (/microsoft.*\(natural\)/i.test(name)) score += 200;
  // Prefer male narrator names traditionally used for biblical reading
  if (/diego|jorge|enrique|carlos|pablo|miguel|alvaro|esteban|tomás|tomas/i.test(name)) score += 20;
  // Penalize known robotic defaults
  if (/microsoft david|microsoft mark|microsoft hazel|google.*female/i.test(lower)) score -= 10;
  // Slight preference for es-ES (more "classical narration" feel)
  if (v.lang === 'es-ES') score += 5;
  // Local-only (offline) SAPI voices are usually low-quality
  if (v.localService && !/online|natural|enhanced|premium/i.test(name)) score -= 20;

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

function getStoredRate(): number {
  if (typeof window === 'undefined') return 0.95;
  const v = parseFloat(localStorage.getItem(STORAGE_RATE) || '');
  return Number.isFinite(v) && v > 0.4 && v < 2 ? v : 0.95;
}
function getStoredPitch(): number {
  if (typeof window === 'undefined') return 1.0;
  const v = parseFloat(localStorage.getItem(STORAGE_PITCH) || '');
  return Number.isFinite(v) && v > 0.5 && v < 2 ? v : 1.0;
}

export function setRate(rate: number) {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_RATE, String(rate));
}
export function setPitch(pitch: number) {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PITCH, String(pitch));
}
export function getRate(): number { return getStoredRate(); }
export function getPitch(): number { return getStoredPitch(); }

/**
 * Insert subtle pauses to make narration feel less rushed.
 * - After "." or "!" or "?" → add a short breath gap
 * - After ":" or ";" → add a small gap
 * - After "," → very small gap (most engines already pause)
 * We use extra whitespace (some engines respect it) plus a hairline of
 * commas which most engines treat as a comma-pause. We deliberately AVOID
 * SSML tags because most Web Speech engines don't parse SSML.
 *
 * Returns BOTH the processed text and a `originalForIndex` map: given a
 * char offset in the processed text, `originalForIndex[i]` is the
 * corresponding offset in the ORIGINAL text. The map is essential for
 * Web Speech `onboundary` events — `e.charIndex` is in the processed
 * text, but the fullscreen panel + cue dispatcher index against the
 * original (untokenized) text. Without the map, every inserted pause
 * shifts the highlighted word forward by N characters and the cue
 * regexes match the wrong window.
 */
function addNaturalPauses(text: string): { processed: string; originalForIndex: number[] } {
  // Walk the original text and emit either the same char or a replacement
  // (extra spaces) when we hit a sentence/clause boundary. Build the map
  // in lockstep so `originalForIndex[procIdx]` always points back to the
  // index in `text` that produced that processed character.
  let processed = '';
  const originalForIndex: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    processed += ch;
    originalForIndex.push(i);
    // Look ahead for whitespace runs after sentence/clause punctuation
    // and pad them. Only fire once per run, then skip the original spaces.
    if (
      (ch === '.' || ch === '!' || ch === '?' || ch === ':' || ch === ';') &&
      i + 1 < text.length && /\s/.test(text[i + 1])
    ) {
      // Find end of the whitespace run.
      let j = i + 1;
      while (j < text.length && /\s/.test(text[j])) j++;
      // Emit padded whitespace (extra spaces). All inserted spaces map
      // back to the position of the punctuation char so a boundary that
      // lands inside the pause still resolves to a sensible original idx.
      const pad = (ch === ':' || ch === ';') ? '  ' : '   ';
      processed += pad;
      for (let k = 0; k < pad.length; k++) originalForIndex.push(i);
      // Skip the original whitespace — we already emitted padded spaces.
      // We also DON'T emit the original spaces, so the lengths line up.
      i = j - 1;
    }
  }
  // Sentinel: an index equal to processed.length maps to text.length.
  originalForIndex.push(text.length);
  return { processed, originalForIndex };
}

export function speak(text: string, opts: { rate?: number; pitch?: number; volume?: number } = {}) {
  console.log('[tts] speak() called', { textLen: text.length, opts });
  if (!('speechSynthesis' in window)) {
    console.warn('[tts] Speech Synthesis not supported');
    return;
  }
  const voices = speechSynthesis.getVoices();
  console.log('[tts] voices.length =', voices.length);
  if (voices.length === 0) {
    console.log('[tts] voices not loaded yet — waiting for voiceschanged');
    let dispatched = false;
    const handler = () => {
      if (dispatched) return;
      dispatched = true;
      speechSynthesis.removeEventListener('voiceschanged', handler);
      console.log('[tts] voices arrived, calling _doSpeak');
      _doSpeak(text, opts);
    };
    speechSynthesis.addEventListener('voiceschanged', handler);
    speechSynthesis.getVoices();
    setTimeout(() => {
      if (dispatched) return;
      console.log('[tts] 600ms timeout fired — calling _doSpeak anyway');
      handler();
    }, 600);
    return;
  }
  _doSpeak(text, opts);
}

function _doSpeak(text: string, opts: { rate?: number; pitch?: number; volume?: number } = {}) {
  console.log('[tts] _doSpeak() entered');
  if (speechSynthesis.speaking || speechSynthesis.pending) {
    console.log('[tts] engine speaking/pending — calling cancel');
    speechSynthesis.cancel();
  }
  currentUtterance = null;
  const { processed, originalForIndex } = addNaturalPauses(text);
  const u = new SpeechSynthesisUtterance(processed);
  const voice = getPreferredVoice();
  console.log('[tts] preferred voice =', voice ? `${voice.name} (${voice.lang})` : 'null');
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? 'es-ES';
  u.rate = opts.rate ?? getStoredRate();
  u.pitch = opts.pitch ?? getStoredPitch();
  u.volume = opts.volume ?? 1.0;
  console.log('[tts] utterance', { lang: u.lang, rate: u.rate, pitch: u.pitch, volume: u.volume });

  // Capture the callback refs at speak-time so a STALE utterance that
  // fires `onend` late (Chromium queue weirdness during cancel/speak
  // races) does NOT invoke a NEWER caller's callback and resolve their
  // promise prematurely. Each utterance owns its own callback snapshot.
  const myProgressCb = onProgressCb;
  const myEndCb = onEndCb;
  const myBoundaryCb = onBoundaryCb;

  u.onstart = () => console.log('[tts] utterance onstart fired');
  u.onend = () => {
    console.log('[tts] utterance onend fired');
    // Only clear `currentUtterance` if it's still us — a newer speak()
    // may have replaced it already.
    if (currentUtterance === u) currentUtterance = null;
    if (myEndCb) myEndCb();
  };
  u.onerror = (e) => {
    console.warn('[tts] utterance onerror', e);
    if (currentUtterance === u) currentUtterance = null;
    if (myEndCb) myEndCb();
  };
  u.onboundary = (e) => {
    if (myProgressCb && u.text.length > 0) {
      myProgressCb(e.charIndex / u.text.length);
    }
    // Web Speech `e.charIndex` is in PROCESSED text (with inserted pause
    // whitespace). Map it back to the ORIGINAL text so panel highlighting
    // + cue regex windows index against the same string the panel
    // tokenized from. Without this, every pause shifts everything by N.
    if (myBoundaryCb) {
      const procIdx = Math.min(e.charIndex, originalForIndex.length - 1);
      const origIdx = originalForIndex[procIdx] ?? e.charIndex;
      myBoundaryCb(origIdx, (e as any).charLength ?? 0);
    }
  };

  currentUtterance = u;
  speechSynthesis.speak(u);
  console.log('[tts] speechSynthesis.speak() invoked');
}

export function pause() { if ('speechSynthesis' in window) speechSynthesis.pause(); }
export function resume() { if ('speechSynthesis' in window) speechSynthesis.resume(); }
export function cancel() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
    }
  }
  currentUtterance = null;
}

/**
 * Hard-stops EVERY narration source that is *actually* playing: only
 * cancels Web Speech if speaking/pending, only pauses audio elements
 * that aren't already paused.
 *
 * Why the guard matters: calling `speechSynthesis.cancel()` when idle
 * triggers a Chromium bug (crbug.com/335907 and friends) where the NEXT
 * `speak()` silently fails to dispatch `onstart`, requiring a second
 * user click to actually begin speaking. Same idea for audio elements
 * — pausing an already-paused HTMLAudioElement isn't harmful, but
 * skipping the no-op keeps state predictable.
 *
 * Pass `exceptAudio` to skip a specific audio element (useful when
 * you're about to play it immediately afterwards).
 */
export function cancelAllNarration(exceptAudio?: HTMLAudioElement | null) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
    }
  }
  currentUtterance = null;
  if (typeof document === 'undefined') return;
  document.querySelectorAll<HTMLAudioElement>('audio[data-narrator-audio]').forEach((a) => {
    if (a === exceptAudio) return;
    if (a.paused) return;
    try { a.pause(); a.currentTime = 0; } catch {}
  });
}
export function isSpeaking(): boolean {
  return 'speechSynthesis' in window && speechSynthesis.speaking;
}
export function onProgress(cb: (progress: number) => void) { onProgressCb = cb; }
export function onEnd(cb: () => void) { onEndCb = cb; }
export function onBoundary(cb: ((charIndex: number, charLength: number) => void) | null) { onBoundaryCb = cb; }

// Voices load asynchronously in Chrome — caller can register for updates
export function onVoicesChanged(cb: () => void) {
  if ('speechSynthesis' in window) {
    speechSynthesis.addEventListener('voiceschanged', cb);
  }
}
