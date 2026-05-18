import { speak, onProgress, onEnd, onBoundary, cancelAllNarration } from './tts';

/**
 * Wire up every `[data-narrator]` control on the page.
 *
 * Two playback modes are supported:
 *
 *  1) **Pre-generated audio** — when the narrator element has a non-empty
 *     `data-audio-src` and contains an `<audio data-narrator-audio>`,
 *     playback uses the high-quality MP3 produced by
 *     `scripts/generate-narrations.mjs`. Word highlight is approximated by
 *     mapping `audio.currentTime / audio.duration` to a character index
 *     within the narration text (linear estimation — good enough for the
 *     reading-along effect since duration scales roughly with text length).
 *
 *  2) **Web Speech fallback** — when no MP3 exists, falls back to the
 *     browser's `speechSynthesis` engine via `src/lib/tts.ts`.
 */
export function initNarrators() {
  const controls = document.querySelectorAll<HTMLElement>('[data-narrator]');
  controls.forEach((ctrl) => {
    const id = ctrl.dataset.eventId!;
    const audioSrc = ctrl.dataset.audioSrc || '';
    const btn = ctrl.querySelector<HTMLButtonElement>('[data-narrator-play]');
    const icon = ctrl.querySelector<HTMLSpanElement>('.play-icon');
    const label = ctrl.querySelector<HTMLSpanElement>('.label');
    const progressWrap = ctrl.querySelector<HTMLElement>('[data-narrator-progress-wrap]');
    const progress = ctrl.querySelector<HTMLElement>('[data-narrator-progress]');
    const display = ctrl.querySelector<HTMLElement>('[data-narration-display]');
    const audioEl = ctrl.querySelector<HTMLAudioElement>('[data-narrator-audio]');
    const wordEls = display ? Array.from(display.querySelectorAll<HTMLElement>('[data-word]')) : [];
    const textScript = document.querySelector<HTMLScriptElement>(`script[data-narration-text][data-event-id="${id}"]`);
    if (!btn || !icon || !label || !textScript || !progress || !progressWrap) return;

    let text = '';
    try { text = JSON.parse(textScript.textContent || '""'); } catch {}

    // True when we will use the pre-generated MP3.
    const useAudio = Boolean(audioSrc && audioEl);

    /* Session id — bumped on every play start AND every stop. Any deferred
       callback (audio.play() promise resolve/reject, fallback speak) checks
       that its captured session is still current before acting. This kills
       the race where a delayed audio fallback runs after the user already
       hit Stop, causing narration to start when they expected silence. */
    let session = 0;

    /* Pre-compute the cumulative reading-time weight of every char so we
       can map `audio.currentTime` to a faithful char index. Pure
       proportional mapping (charIdx = t/duration × textLength) drifts
       badly: punctuation creates real pauses, while letters within a
       word are spoken at near-constant cadence. We approximate each
       character's "duration weight" and map via the resulting CDF. */
    function weightOf(ch: string): number {
      if (ch === '.' || ch === '!' || ch === '?') return 10;
      if (ch === ';' || ch === ':') return 6;
      if (ch === ',') return 4;
      if (ch === ' ') return 0.6;
      if (ch === '\n') return 8;
      return 1; // regular letter / digit / accented char
    }
    const cumWeights: number[] = new Array(text.length + 1);
    cumWeights[0] = 0;
    for (let i = 0; i < text.length; i++) {
      cumWeights[i + 1] = cumWeights[i] + weightOf(text[i]);
    }
    const totalWeight = cumWeights[text.length] || 1;

    /** Given playback fraction (0..1) return the char idx whose
        cumulative reading weight matches that fraction. */
    function fractionToCharIdx(frac: number): number {
      const target = Math.max(0, Math.min(1, frac)) * totalWeight;
      // Binary search through the cumWeights array.
      let lo = 0, hi = cumWeights.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (cumWeights[mid] < target) lo = mid + 1;
        else hi = mid;
      }
      return Math.max(0, lo - 1);
    }

    function resetWords() {
      wordEls.forEach((w) => w.classList.remove('spoken-past', 'spoken-current'));
    }

    function highlightAt(charIndex: number) {
      if (wordEls.length === 0) return;
      let activeIdx = -1;
      for (let i = 0; i < wordEls.length; i++) {
        const start = parseInt(wordEls[i].dataset.start || '0', 10);
        const end = parseInt(wordEls[i].dataset.end || '0', 10);
        if (charIndex >= start && charIndex < end) { activeIdx = i; break; }
        if (start > charIndex) { activeIdx = Math.max(i - 1, 0); break; }
      }
      if (activeIdx === -1) activeIdx = wordEls.length - 1;
      wordEls.forEach((w, i) => {
        w.classList.toggle('spoken-past', i < activeIdx);
        w.classList.toggle('spoken-current', i === activeIdx);
      });
      // Auto-scroll active word into view if it leaves the visible band
      const active = wordEls[activeIdx];
      if (active) {
        const rect = active.getBoundingClientRect();
        if (rect.top < 80 || rect.bottom > window.innerHeight - 80) {
          active.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }

    function setIdleUi() {
      icon!.textContent = '▶';
      icon!.dataset.state = 'paused';
      label!.textContent = 'Escuchar';
      progressWrap!.classList.add('hidden');
      progress!.style.width = '0%';
      display?.classList.add('hidden');
      resetWords();
    }

    function setPlayingUi() {
      icon!.textContent = '■';
      icon!.dataset.state = 'playing';
      label!.textContent = 'Detener';
      progressWrap!.classList.remove('hidden');
      display?.classList.remove('hidden');
      resetWords();
    }

    // ----- Audio mode handlers ------------------------------------------
    let audioTickBound = false;
    function bindAudioOnce() {
      if (audioTickBound || !audioEl) return;
      audioTickBound = true;
      audioEl.addEventListener('timeupdate', () => {
        if (!audioEl.duration || !isFinite(audioEl.duration)) return;
        const p = Math.min(1, Math.max(0, audioEl.currentTime / audioEl.duration));
        progress!.style.width = `${(p * 100).toFixed(1)}%`;
        // Map playback fraction → char index via the punctuation-weighted
        // CDF, so the highlight slows on commas/periods like the voice does.
        highlightAt(fractionToCharIdx(p));
      });
      audioEl.addEventListener('ended', () => {
        progress!.style.width = '100%';
        wordEls.forEach((w) => { w.classList.remove('spoken-current'); w.classList.add('spoken-past'); });
        // Brief pause to let the user see the completed state, then reset.
        setTimeout(() => { setIdleUi(); }, 800);
      });
      audioEl.addEventListener('error', () => {
        console.warn('[narrator] audio failed to load, falling back to speechSynthesis');
        // Detach so subsequent clicks fall through to the Web Speech path.
        audioEl.removeAttribute('src');
        setIdleUi();
      });
    }

    function stop() {
      session++; // invalidate any in-flight play attempt / pending fallback
      cancelAllNarration();
      onBoundary(null);
      setIdleUi();
    }

    btn.addEventListener('click', () => {
      console.log('[narrator] click on event', id, { useAudio, audioSrc, audioElExists: !!audioEl });
      if (icon!.dataset.state === 'playing') {
        console.log('[narrator] state is playing → calling stop()');
        stop();
        return;
      }

      const mySession = ++session;

      // MUTEX: stop ONLY other narrations. Skipping the audio we're about
      // to play avoids a pause→play round-trip that some browsers swallow.
      cancelAllNarration(audioEl ?? null);
      document.querySelectorAll<HTMLElement>('[data-narrator]').forEach((other) => {
        if (other === ctrl) return;
        const otherIcon = other.querySelector<HTMLElement>('.play-icon');
        const otherLabel = other.querySelector<HTMLElement>('.label');
        const otherProg = other.querySelector<HTMLElement>('[data-narrator-progress-wrap]');
        const otherDisp = other.querySelector<HTMLElement>('[data-narration-display]');
        if (otherIcon) { otherIcon.textContent = '▶'; otherIcon.dataset.state = 'paused'; }
        if (otherLabel) otherLabel.textContent = 'Escuchar';
        otherProg?.classList.add('hidden');
        otherDisp?.classList.add('hidden');
        other.querySelectorAll<HTMLElement>('[data-word]').forEach((w) =>
          w.classList.remove('spoken-past', 'spoken-current'));
      });

      if (useAudio && audioEl && audioEl.getAttribute('src')) {
        console.log('[narrator] path: AUDIO MP3');
        bindAudioOnce();
        setPlayingUi();
        const promise = audioEl.play();
        if (promise && typeof promise.catch === 'function') {
          promise.catch((err) => {
            if (mySession !== session) return;
            console.warn('[narrator] audio.play() rejected, falling back to TTS:', err);
            speakFallback(mySession);
          });
        }
      } else {
        console.log('[narrator] path: WEB SPEECH (no MP3 or audioEl)');
        speakFallback(mySession);
      }
    });

    function speakFallback(mySession: number) {
      if (mySession !== session) return;        // user already cancelled
      setPlayingUi();
      onProgress((p) => {
        if (mySession !== session) return;
        progress!.style.width = `${(p * 100).toFixed(1)}%`;
      });
      onBoundary((charIndex) => {
        if (mySession !== session) return;
        highlightAt(charIndex);
      });
      onEnd(() => {
        if (mySession !== session) return;      // a newer play overrode us
        progress!.style.width = '100%';
        wordEls.forEach((w) => { w.classList.remove('spoken-current'); w.classList.add('spoken-past'); });
        onBoundary(null);
        setTimeout(() => {
          if (mySession === session) setIdleUi();
        }, 800);
      });
      speak(text);
    }
  });
}
