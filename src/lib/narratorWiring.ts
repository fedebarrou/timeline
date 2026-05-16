import { speak, cancel, onProgress, onEnd } from './tts';

export function initNarrators() {
  const controls = document.querySelectorAll<HTMLElement>('[data-narrator]');
  controls.forEach((ctrl) => {
    const id = ctrl.dataset.eventId!;
    const btn = ctrl.querySelector<HTMLButtonElement>('[data-narrator-play]');
    const icon = ctrl.querySelector<HTMLSpanElement>('.play-icon');
    const label = ctrl.querySelector<HTMLSpanElement>('.label');
    const progressWrap = ctrl.querySelector<HTMLElement>('[data-narrator-progress-wrap]');
    const progress = ctrl.querySelector<HTMLElement>('[data-narrator-progress]');
    const textScript = document.querySelector<HTMLScriptElement>(`script[data-narration-text][data-event-id="${id}"]`);
    if (!btn || !icon || !label || !textScript || !progress || !progressWrap) return;

    let text = '';
    try { text = JSON.parse(textScript.textContent || '""'); } catch {}

    btn.addEventListener('click', () => {
      if (icon.dataset.state === 'playing') {
        cancel();
        icon.textContent = '▶';
        icon.dataset.state = 'paused';
        label.textContent = 'Escuchar';
        progressWrap.classList.add('hidden');
        return;
      }
      progressWrap.classList.remove('hidden');
      onProgress((p) => { progress.style.width = `${(p * 100).toFixed(1)}%`; });
      onEnd(() => {
        icon.textContent = '▶';
        icon.dataset.state = 'paused';
        label.textContent = 'Escuchar';
        progress.style.width = '0%';
      });
      speak(text);
      icon.textContent = '■';
      icon.dataset.state = 'playing';
      label.textContent = 'Detener';
    });
  });
}
