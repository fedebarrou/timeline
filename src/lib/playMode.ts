import { speak, cancel as cancelTTS, onEnd } from './tts';

let playing = false;
let currentIndex = 0;
let scenes: HTMLElement[] = [];
let jumpRequested = false;
let onIndexChange: ((i: number, total: number) => void) | null = null;

function scrollTo(el: HTMLElement) {
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getNarrationText(scene: HTMLElement): string {
  const id = scene.dataset.eventId;
  if (!id) return '';
  const script = document.querySelector<HTMLScriptElement>(`script[data-narration-text][data-event-id="${id}"]`);
  if (!script) return '';
  try { return JSON.parse(script.textContent || '""'); } catch { return ''; }
}

async function playOne(scene: HTMLElement): Promise<void> {
  scrollTo(scene);
  await new Promise((r) => setTimeout(r, 1500));
  if (!playing) return;
  const text = getNarrationText(scene);
  if (!text) return;
  return new Promise((resolve) => {
    onEnd(() => resolve());
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
  playing = true;
  onIndexChange = updateUI ?? null;
  currentIndex = findClosestSceneIndex();
  while (playing && currentIndex < scenes.length) {
    if (onIndexChange) onIndexChange(currentIndex + 1, scenes.length);
    await playOne(scenes[currentIndex]);
    if (!playing) break;

    if (jumpRequested) {
      // currentIndex was set by jumpToEventId; don't increment, just loop
      jumpRequested = false;
      continue;
    }

    await new Promise((r) => setTimeout(r, 1500));
    if (!playing) break;
    if (jumpRequested) {
      jumpRequested = false;
      continue;
    }
    currentIndex++;
  }
  playing = false;
  onIndexChange = null;
}

export function stopPlay() {
  playing = false;
  jumpRequested = false;
  cancelTTS();
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
    cancelTTS();
    return;
  }

  // Not playing — start from this event
  playing = true;
  currentIndex = idx;
  onIndexChange = updateUI ?? null;
  (async () => {
    while (playing && currentIndex < scenes.length) {
      if (onIndexChange) onIndexChange(currentIndex + 1, scenes.length);
      await playOne(scenes[currentIndex]);
      if (!playing) break;
      if (jumpRequested) { jumpRequested = false; continue; }
      await new Promise((r) => setTimeout(r, 1500));
      if (!playing) break;
      if (jumpRequested) { jumpRequested = false; continue; }
      currentIndex++;
    }
    playing = false;
    onIndexChange = null;
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
