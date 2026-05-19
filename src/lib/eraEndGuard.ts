/**
 * eraEndGuard.ts
 *
 * Coordinates a "quiescence wait" before the era-closing parchment opens.
 * After `playOne` resolves for the last scene, multiple async effects may
 * still be in flight:
 *   - Web Speech / audio TTS narrating the last sentence
 *   - Narration cues dispatching animations at boundary events
 *   - Speech / dialog bubbles with their own SHOW_MS timers
 *   - GSAP choreography running a repeat:-1 loop mid-cycle
 *
 * `awaitEraQuiescence` fans out four parallel checks and resolves when
 * ALL of them have cleared (or a hard deadline is hit), then adds a short
 * grace period so the UI has fully settled before the parchment opens.
 */

const GRACE_MS              = 2200;
const TTS_POLL_MS           = 200;
const CHOREO_CYCLE_TIMEOUT  = 6000;
const QUIESCENCE_TIMEOUT_MS = 12000;

// ─── Utility ────────────────────────────────────────────────────────────────

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function deadlineSleep(deadline: number): Promise<void> {
  const remaining = deadline - Date.now();
  return wait(Math.max(0, remaining));
}

// ─── Individual waiters ──────────────────────────────────────────────────────

/**
 * Poll until both Web Speech is silent AND every narrator <audio> is paused.
 * Resolves at deadline if not yet quiet by then.
 */
export function waitForTtsSilence(deadlineOrMs?: number): Promise<void> {
  // Accept either a deadline timestamp or a max-duration in ms.
  const deadline =
    deadlineOrMs !== undefined
      ? deadlineOrMs > Date.now()
        ? deadlineOrMs           // already a timestamp
        : Date.now() + deadlineOrMs  // treat as duration
      : Date.now() + QUIESCENCE_TIMEOUT_MS;

  return new Promise<void>((resolve) => {
    function check() {
      if (Date.now() >= deadline) { resolve(); return; }

      const speechBusy =
        typeof window !== 'undefined' &&
        'speechSynthesis' in window &&
        (speechSynthesis.speaking || speechSynthesis.pending);

      const audioBusy =
        typeof document !== 'undefined' &&
        Array.from(
          document.querySelectorAll<HTMLAudioElement>('audio[data-narrator-audio]')
        ).some((a) => !a.paused);

      if (!speechBusy && !audioBusy) {
        resolve();
        return;
      }
      setTimeout(check, TTS_POLL_MS);
    }
    check();
  });
}

/**
 * Listen for `timeline:cue-pulse { eventId, isLast: true }` from the last
 * event's cue dispatcher. If it arrives → resolve. If 3 s elapse without it,
 * resolve anyway (event may have no cues or already fired them all).
 */
function waitForLastCueToFire(eventId: string, deadline: number): Promise<void> {
  const CUE_TIMEOUT_MS = 3000;
  const cutoff = Math.min(deadline, Date.now() + CUE_TIMEOUT_MS);

  return new Promise<void>((resolve) => {
    let done = false;
    function finish() {
      if (done) return;
      done = true;
      if (typeof window !== 'undefined') {
        window.removeEventListener('timeline:cue-pulse', onPulse as EventListener);
      }
      resolve();
    }

    const onPulse = (ev: CustomEvent<{ eventId: string; isLast: boolean }>) => {
      if (ev.detail?.eventId === eventId && ev.detail?.isLast) {
        finish();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('timeline:cue-pulse', onPulse as EventListener);
    }

    // Timeout fallback — the event may have no cues.
    const remaining = cutoff - Date.now();
    setTimeout(finish, Math.max(0, remaining));
  });
}

/**
 * Poll every 200 ms until no `[data-speech-bubble].is-visible` or
 * `[data-dialog-bubble].is-visible` elements remain in the DOM.
 * Resolves at deadline regardless.
 */
export function waitForBubblesToClose(deadlineOrMs?: number): Promise<void> {
  const deadline =
    deadlineOrMs !== undefined
      ? deadlineOrMs > Date.now()
        ? deadlineOrMs
        : Date.now() + deadlineOrMs
      : Date.now() + QUIESCENCE_TIMEOUT_MS;

  const POLL = 200;
  return new Promise<void>((resolve) => {
    function check() {
      if (Date.now() >= deadline) { resolve(); return; }
      const hasVisible =
        typeof document !== 'undefined' &&
        (!!document.querySelector('[data-speech-bubble].is-visible') ||
         !!document.querySelector('[data-dialog-bubble].is-visible'));
      if (!hasVisible) { resolve(); return; }
      setTimeout(check, POLL);
    }
    check();
  });
}

/**
 * Listen for `timeline:choreo-cycle` (emitted at the end of each GSAP loop
 * cycle if the choreography runner decides to emit it). Falls back to a
 * CHOREO_CYCLE_TIMEOUT-ms timeout if the event never arrives — which is the
 * normal case today, since characterChoreography.ts uses `repeat: -1` without
 * emitting an event (too invasive to change). The timeout is deliberately
 * short enough that this waiter doesn't dominate the 12 s hard ceiling.
 */
function waitForChoreographyCycle(_eventId: string, deadline: number): Promise<void> {
  const cutoff = Math.min(deadline, Date.now() + CHOREO_CYCLE_TIMEOUT);

  return new Promise<void>((resolve) => {
    let done = false;
    function finish() {
      if (done) return;
      done = true;
      if (typeof window !== 'undefined') {
        window.removeEventListener('timeline:choreo-cycle', onCycle);
      }
      resolve();
    }

    const onCycle = () => finish();

    if (typeof window !== 'undefined') {
      window.addEventListener('timeline:choreo-cycle', onCycle);
    }

    // Primary path: just wait out the timeout (choreo doesn't emit the event yet).
    const remaining = cutoff - Date.now();
    setTimeout(finish, Math.max(0, remaining));
  });
}

// ─── Main export ─────────────────────────────────────────────────────────────

/**
 * Wait for all in-flight era effects to settle before the closing parchment
 * can open. Resolves after ALL four checks clear (or the hard ceiling hits),
 * then adds a GRACE_MS pause to let the UI breathe.
 */
export async function awaitEraQuiescence(eventId: string): Promise<void> {
  const deadline = Date.now() + QUIESCENCE_TIMEOUT_MS;

  await Promise.race([
    Promise.all([
      waitForTtsSilence(deadline),
      waitForLastCueToFire(eventId, deadline),
      waitForBubblesToClose(deadline),
      waitForChoreographyCycle(eventId, deadline),
    ]),
    deadlineSleep(deadline),
  ]);

  // Grace period — let final fade-outs and last CSS transitions settle.
  await wait(GRACE_MS);
}
