import { speak, onEnd, onBoundary, onProgress, cancelAllNarration } from './tts';
import { scrollToElement } from './scrollOffset';

let playing = false;
let currentIndex = 0;
let scenes: HTMLElement[] = [];
let jumpRequested = false;
let onIndexChange: ((i: number, total: number) => void) | null = null;

/**
 * Broadcast play-state transitions so every "Reproducir" button on the page
 * (PlayButton in TimelineNav, FullscreenControls' floating button, future
 * additions) can keep its UI in sync with the singleton play state. Without
 * this, switching to fullscreen mid-playback left the fullscreen button
 * stuck on "▶ Reproducir" even though the engine was actively reading.
 */
function setPlaying(next: boolean) {
  if (playing === next) return;
  playing = next;
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('timeline:play-state-changed', { detail: { playing: next } }));
    } catch {}
  }
}

/**
 * Tracks the last event id activated by sceneController. This is the source
 * of truth for "which scene is currently active" — works in both normal
 * mode (scroll-driven) and fullscreen mode (where `.scenes` are display:none
 * so viewport-based detection would always return index 0).
 */
let currentActiveEventId: string | null = null;
if (typeof window !== 'undefined') {
  window.addEventListener('timeline:scene-changed', (e: Event) => {
    const detail = (e as CustomEvent<{ eventId?: string }>).detail;
    if (detail && typeof detail.eventId === 'string') {
      currentActiveEventId = detail.eventId;
    }
  });
}

function scrollTo(el: HTMLElement) {
  scrollToElement(el);
}

function getNarrationText(scene: HTMLElement): string {
  const id = scene.dataset.eventId;
  if (!id) return '';
  const script = document.querySelector<HTMLScriptElement>(`script[data-narration-text][data-event-id="${id}"]`);
  if (!script) return '';
  try { return JSON.parse(script.textContent || '""'); } catch { return ''; }
}

function findAudioFor(scene: HTMLElement): HTMLAudioElement | null {
  const id = scene.dataset.eventId;
  if (!id) return null;
  // The narrator's <audio> lives inside the scene next to its [data-narrator] block.
  const audio = scene.querySelector<HTMLAudioElement>(
    `[data-narrator][data-event-id="${id}"] audio[data-narrator-audio]`
  );
  return audio && audio.getAttribute('src') ? audio : null;
}

/**
 * Monotonic playOne token — every call to playOne bumps it. The TTS
 * callbacks (which are GLOBAL singletons in tts.ts — only the last one
 * registered survives) capture their token in closure and bail when the
 * token no longer matches the live one. Prevents a stale `onEnd` callback
 * left over from the previous event's `speak()` from resolving the NEW
 * playOne's promise the instant Web Speech fires onend on its now-stale
 * utterance — that race was making the loop "double-advance" or, with
 * `currentIndex` not yet incremented, replay the same scene.
 */
let playOneToken = 0;

async function playOne(scene: HTMLElement): Promise<void> {
  scrollTo(scene);
  // In fullscreen mode the .scenes container is `display:none`, so the
  // ScrollTrigger that normally fires sceneController.activate() never
  // triggers — the timeline dot, marker, and choreography would stay
  // frozen on the previous event. We dispatch `timeline:scene-changed`
  // ourselves so TimelineNav and FullscreenNarrationPanel sync, and
  // we also explicitly request a re-activation via the map root if
  // sceneController is listening.
  const eventId = scene.dataset.eventId;
  if (eventId) {
    try {
      window.dispatchEvent(new CustomEvent('timeline:scene-changed', { detail: { eventId } }));
      window.dispatchEvent(new CustomEvent('timeline:request-activate', { detail: { eventId } }));
    } catch {}
  }
  await new Promise((r) => setTimeout(r, 1500));
  if (!playing) return;
  const text = getNarrationText(scene);
  if (!text) return;

  // MUTEX: stop other narration, but spare the audio we're about to play
  // so we don't pause-then-play the same element (some browsers swallow it).
  const audio = findAudioFor(scene);
  cancelAllNarration(audio);

  const myToken = ++playOneToken;

  // Prefer pre-generated neural MP3 when available — never duplicate voices.
  if (audio) {
    return new Promise((resolve) => {
      let resolved = false;
      const safeResolve = () => { if (!resolved) { resolved = true; resolve(); } };
      const onAudioEnd = () => { audio.removeEventListener('ended', onAudioEnd); safeResolve(); };
      audio.addEventListener('ended', onAudioEnd);
      try { audio.currentTime = 0; } catch {}
      const p = audio.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          // Audio failed — fall back to Web Speech.
          audio.removeEventListener('ended', onAudioEnd);
          onEnd(() => { if (myToken === playOneToken) safeResolve(); });
          speak(text);
        });
      }
    });
  }

  return new Promise((resolve) => {
    let resolved = false;
    const safeResolve = () => { if (!resolved) { resolved = true; resolve(); } };
    // Wire the boundary + progress events so the fullscreen panel
    // highlights words and the narration-cue dispatcher fires animations.
    // (NarratorButton normally owns these callbacks, but when playMode
    // drives the TTS path directly we have to set them ourselves.)
    // Token-guard each callback so an `onend` fired by a stale utterance
    // (a cancel() race) can NOT resolve this promise once a newer
    // playOne has started.
    const wordCount = Math.max(1, text.split(/\s+/).filter(Boolean).length);
    const estimatedDuration = Math.max(2, wordCount / 2.5);
    const eventId = scene.dataset.eventId ?? '';
    onBoundary((charIndex: number) => {
      if (myToken !== playOneToken) return;
      try {
        window.dispatchEvent(new CustomEvent('timeline:narration-boundary', {
          detail: { eventId, charIndex },
        }));
      } catch {}
    });
    onProgress((p: number) => {
      if (myToken !== playOneToken) return;
      try {
        window.dispatchEvent(new CustomEvent('timeline:narration-tick', {
          detail: { eventId, current: p * estimatedDuration, duration: estimatedDuration },
        }));
      } catch {}
    });
    onEnd(() => {
      if (myToken !== playOneToken) return;
      onBoundary(null);
      try {
        window.dispatchEvent(new CustomEvent('timeline:narration-ended', { detail: { eventId } }));
      } catch {}
      safeResolve();
    });
    speak(text);
  });
}

function refreshScenes() {
  scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-event-scene]'));
}

export async function startPlay(updateUI?: (i: number, total: number) => void) {
  if (playing) return;
  refreshScenes();
  if (scenes.length === 0) return;
  setPlaying(true);
  onIndexChange = updateUI ?? null;
  // Prefer the event-driven active id (works in fullscreen too, where
  // `.scenes` are display:none and viewport detection collapses to 0).
  // Fall back to viewport-based detection when no scene-changed has fired yet.
  currentIndex = resolveStartIndex();
  let reachedEnd = false;
  while (playing && currentIndex < scenes.length) {
    if (onIndexChange) onIndexChange(currentIndex + 1, scenes.length);
    await playOne(scenes[currentIndex]);
    if (!playing) break;

    if (jumpRequested) {
      // currentIndex was set by jumpToEventId; don't increment, just loop
      jumpRequested = false;
      continue;
    }

    if (currentIndex >= scenes.length - 1) {
      reachedEnd = true;
      break;
    }

    await new Promise((r) => setTimeout(r, 1500));
    if (!playing) break;
    if (jumpRequested) {
      jumpRequested = false;
      continue;
    }
    currentIndex++;
  }
  setPlaying(false);
  onIndexChange = null;
  if (reachedEnd) emitEraEnded();
}

/**
 * Fire `timeline:era-ended` so the era-closing parchment can take over.
 * Carries the current era id read off the active scene's `data-era`.
 */
function emitEraEnded() {
  try {
    const lastScene = scenes[scenes.length - 1];
    const eraId = lastScene?.dataset.era || '';
    window.dispatchEvent(new CustomEvent('timeline:era-ended', { detail: { eraId } }));
  } catch {}
}

export function stopPlay() {
  setPlaying(false);
  jumpRequested = false;
  // Invalidate any in-flight playOne callbacks — they capture this
  // token in closure and bail when it changes.
  playOneToken++;
  cancelAllNarration();
}

export function isPlaying(): boolean { return playing; }

/**
 * Jump play head to a specific event id.
 * - If play mode is active: cancels current TTS, scrolls + reads that event.
 * - If not playing: starts play mode from that event.
 */
export function jumpToEventId(eventId: string, updateUI?: (i: number, total: number) => void) {
  refreshScenes();
  const idx = scenes.findIndex((s) => s.dataset.eventId === eventId);
  if (idx === -1) return;

  if (playing) {
    currentIndex = idx;
    jumpRequested = true;
    if (onIndexChange) onIndexChange(currentIndex + 1, scenes.length);
    cancelAllNarration();
    return;
  }

  // Not playing — start from this event
  setPlaying(true);
  currentIndex = idx;
  onIndexChange = updateUI ?? null;
  (async () => {
    let reachedEnd = false;
    while (playing && currentIndex < scenes.length) {
      if (onIndexChange) onIndexChange(currentIndex + 1, scenes.length);
      await playOne(scenes[currentIndex]);
      if (!playing) break;
      if (jumpRequested) { jumpRequested = false; continue; }
      if (currentIndex >= scenes.length - 1) { reachedEnd = true; break; }
      await new Promise((r) => setTimeout(r, 1500));
      if (!playing) break;
      if (jumpRequested) { jumpRequested = false; continue; }
      currentIndex++;
    }
    setPlaying(false);
    onIndexChange = null;
    if (reachedEnd) emitEraEnded();
  })();
}

function findClosestSceneIndex(): number {
  const viewportTop = window.scrollY + 100;
  let best = 0;
  let bestDist = Infinity;
  scenes.forEach((s, i) => {
    const top = s.getBoundingClientRect().top + window.scrollY;
    const dist = Math.abs(top - viewportTop);
    if (dist < bestDist) { bestDist = dist; best = i; }
  });
  return best;
}

/**
 * Resolve where startPlay should begin. Priority:
 *  1. The event id last broadcast by sceneController (works in fullscreen).
 *  2. The scene whose top is closest to the viewport (normal scrolling).
 *  3. Index 0.
 */
function resolveStartIndex(): number {
  if (currentActiveEventId) {
    const idx = scenes.findIndex((s) => s.dataset.eventId === currentActiveEventId);
    if (idx !== -1) return idx;
  }
  return findClosestSceneIndex();
}

/**
 * Restart play from the very first scene, regardless of where the user is.
 * Stops any in-flight playback first so the new run starts clean.
 */
export async function restartPlay(updateUI?: (i: number, total: number) => void) {
  if (playing) {
    stopPlay();
    // Give the in-flight playOne() a tick to observe playing=false and exit
    // so we don't race with its scrollTo + setTimeout.
    await new Promise((r) => setTimeout(r, 50));
  }
  refreshScenes();
  if (scenes.length === 0) return;
  setPlaying(true);
  onIndexChange = updateUI ?? null;
  currentIndex = 0;
  let reachedEnd = false;
  while (playing && currentIndex < scenes.length) {
    if (onIndexChange) onIndexChange(currentIndex + 1, scenes.length);
    await playOne(scenes[currentIndex]);
    if (!playing) break;
    if (jumpRequested) { jumpRequested = false; continue; }
    if (currentIndex >= scenes.length - 1) { reachedEnd = true; break; }
    await new Promise((r) => setTimeout(r, 1500));
    if (!playing) break;
    if (jumpRequested) { jumpRequested = false; continue; }
    currentIndex++;
  }
  setPlaying(false);
  onIndexChange = null;
  if (reachedEnd) emitEraEnded();
}
