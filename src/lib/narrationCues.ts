/**
 * Narration cue dispatcher.
 *
 * Listens to the global `timeline:narration-boundary` events that
 * `NarratorButton` dispatches (both audio + TTS modes) and, for every cue
 * whose regex matches a small window of narration text around the current
 * `charIndex`, fires a `timeline:cue` CustomEvent that the animation
 * primitives layer can consume to trigger map FX.
 *
 * Public surface:
 *   - `Cue`                — cue descriptor
 *   - `registerEventCues`  — attach cues to a specific event id
 *   - `initNarrationCues`  — install the global listeners (call once)
 *
 * This module is purely a router: it never touches the DOM beyond reading
 * the narration text JSON the page already embeds; whether anyone listens
 * to `timeline:cue` is the responsibility of the FX layer.
 */

export type Cue = {
  /** Regex tested against the substring [charIndex-4 .. charIndex+24] of narration text.
   *  The cue fires the first time the substring contains a match. */
  match: RegExp;
  /** Cue id consumed by the animation primitives layer. */
  cueId: string;
  /** Optional payload data merged into the dispatched event. */
  data?: any;
  /** When true (default), only fires once per scene. */
  fireOnce?: boolean;
};

/** Window radius on either side of the current charIndex. The asymmetric
 *  shape (-2 .. +12) leans forward because the boundary's `charIndex` from
 *  Web Speech sits at the start of the upcoming word — matching slightly
 *  ahead of where the listener actually hears the keyword catches it just
 *  before the human ear does. */
const WINDOW_BEFORE = 4;
const WINDOW_AFTER = 24;

/** Per-event registered cues. */
const cueRegistry: Map<string, Cue[]> = new Map();

/** Per-event firing state — `Set<cueIndex>` of cues that have already
 *  fired in the current scene run. Cleared on scene change. The index is
 *  `${scope}:${i}` where scope is `'global'` or the eventId, so global
 *  cues can be tracked independently of per-event cues. */
const firedCues: Map<string, Set<string>> = new Map();

/** Tracks the currently active eventId so scene-change resets know which
 *  bucket to clear. Updated on every boundary + scene-change event. */
let activeEventId: string | null = null;

/** Built-in tradition cues — fire on EVERY event (not registered per id).
 *  `fireOnce: false` so each "según la …" mention re-fires the badge. */
const GLOBAL_CUES: Cue[] = [
  {
    match: /seg[uú]n la Tor[áa]|la Tor[áa] narra|en la Tor[áa]|tradici[oó]n jud[ií]a|relato hebreo/i,
    cueId: 'fx:tradition-badge',
    data: { tradition: 'tora' },
    fireOnce: false,
  },
  {
    match: /seg[uú]n la Biblia|la Biblia|tradici[oó]n cristiana|relato cristiano|evangelio/i,
    cueId: 'fx:tradition-badge',
    data: { tradition: 'biblia' },
    fireOnce: false,
  },
  {
    match: /seg[uú]n el Cor[áa]n|en el Cor[áa]n|tradici[oó]n isl[áa]mica|relato musulm[áa]n/i,
    cueId: 'fx:tradition-badge',
    data: { tradition: 'coran' },
    fireOnce: false,
  },
];

/** Read the embedded narration text for an event from the JSON script tag
 *  the page mounts (`<script type="application/json" data-narration-text
 *  data-event-id="...">"…full text…"</script>`). */
function readNarrationText(eventId: string): string {
  if (typeof document === 'undefined') return '';
  const s = document.querySelector<HTMLScriptElement>(
    `script[data-narration-text][data-event-id="${eventId}"]`,
  );
  if (!s) return '';
  try {
    return JSON.parse(s.textContent || '""');
  } catch {
    return '';
  }
}

/** Build the key for the `firedCues` set. Per-event cues are scoped by
 *  eventId so re-visiting an event after a sibling scene-change starts
 *  fresh; global cues are scoped by eventId too, so the same `según la
 *  Torá` line can fire in every event independently. */
function firedKey(scope: 'global' | 'event', index: number): string {
  return `${scope}:${index}`;
}

function getFiredSet(eventId: string): Set<string> {
  let s = firedCues.get(eventId);
  if (!s) {
    s = new Set<string>();
    firedCues.set(eventId, s);
  }
  return s;
}

/** Test a single cue against the window and, if it matches and hasn't
 *  fired, dispatch `timeline:cue` and mark it fired. */
function tryFireCue(
  eventId: string,
  scope: 'global' | 'event',
  index: number,
  cue: Cue,
  windowText: string,
  fired: Set<string>,
): void {
  const key = firedKey(scope, index);
  const fireOnce = cue.fireOnce !== false; // default true
  if (fireOnce && fired.has(key)) return;
  if (!cue.match.test(windowText)) return;
  if (fireOnce) fired.add(key);
  window.dispatchEvent(
    new CustomEvent('timeline:cue', {
      detail: { eventId, cueId: cue.cueId, data: cue.data ?? null },
    }),
  );
}

/**
 * Register cues for a specific event id. Multiple calls append; cues are
 * matched in registration order.
 */
export function registerEventCues(eventId: string, cues: Cue[]): void {
  if (!eventId || !Array.isArray(cues) || cues.length === 0) return;
  const existing = cueRegistry.get(eventId);
  if (existing) existing.push(...cues);
  else cueRegistry.set(eventId, [...cues]);
}

/** Idempotency guard — calling `initNarrationCues()` more than once on the
 *  same page would attach duplicate listeners and fire each cue twice. */
let initialized = false;

/**
 * Install the global listeners. Call once per page load.
 */
export function initNarrationCues(): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  window.addEventListener('timeline:narration-boundary', (ev) => {
    const detail = (ev as CustomEvent).detail || {};
    const eventId: string | undefined = detail.eventId;
    const charIndex: number | undefined = detail.charIndex;
    if (!eventId || typeof charIndex !== 'number') return;

    activeEventId = eventId;

    const text = readNarrationText(eventId);
    if (!text) return;

    const start = Math.max(0, charIndex - WINDOW_BEFORE);
    const end = charIndex + WINDOW_AFTER;
    const windowText = text.slice(start, end);
    if (!windowText) return;

    const fired = getFiredSet(eventId);

    // Per-event cues first, then global tradition cues.
    const perEvent = cueRegistry.get(eventId);
    if (perEvent) {
      for (let i = 0; i < perEvent.length; i++) {
        tryFireCue(eventId, 'event', i, perEvent[i], windowText, fired);
      }
    }
    for (let i = 0; i < GLOBAL_CUES.length; i++) {
      tryFireCue(eventId, 'global', i, GLOBAL_CUES[i], windowText, fired);
    }
  });

  window.addEventListener('timeline:scene-changed', (ev) => {
    const detail = (ev as CustomEvent).detail || {};
    const newId: string | undefined = detail.eventId;
    // Reset firing state for the previously-active event (so revisits
    // start clean) AND for the new event (in case it was visited before
    // this scene change in the same page session).
    if (activeEventId) firedCues.delete(activeEventId);
    if (newId) firedCues.delete(newId);
    activeEventId = newId ?? null;
  });
}
