import { speak, cancel as cancelTTS, onEnd } from './tts';

let playing = false;
let currentIndex = 0;
let scenes: HTMLElement[] = [];

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
  await new Promise((r) => setTimeout(r, 1500)); // wait for scroll
  const text = getNarrationText(scene);
  if (!text) return;
  return new Promise((resolve) => {
    onEnd(() => resolve());
    speak(text);
  });
}

export async function startPlay(updateUI?: (i: number, total: number) => void) {
  if (playing) return;
  scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-event-scene]'));
  if (scenes.length === 0) return;
  playing = true;
  currentIndex = findClosestSceneIndex();
  while (playing && currentIndex < scenes.length) {
    if (updateUI) updateUI(currentIndex + 1, scenes.length);
    await playOne(scenes[currentIndex]);
    if (!playing) break;
    await new Promise((r) => setTimeout(r, 1500)); // pause between events
    currentIndex++;
  }
  playing = false;
}

export function stopPlay() {
  playing = false;
  cancelTTS();
}

export function isPlaying(): boolean { return playing; }

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
