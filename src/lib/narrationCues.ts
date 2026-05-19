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
 *   - `Cue`                  — cue descriptor
 *   - `registerEventCues`    — attach cues to a specific event id
 *   - `registerEventDialogs` — attach DialogCues to an event id
 *   - `initNarrationCues`    — install the global listeners (call once)
 *
 * This module is purely a router: it never touches the DOM beyond reading
 * the narration text JSON the page already embeds; whether anyone listens
 * to `timeline:cue` (or `timeline:dialog`) is the responsibility of the
 * FX / speech-bubble layers.
 */

import type { DialogCue, DialogEventDetail } from './dialogTypes';

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

/** Per-event registered DialogCues (parallel to cueRegistry). When a
 *  dialog cue's regex matches the narration window, we dispatch
 *  `timeline:dialog` instead of `timeline:cue`. */
const dialogRegistry: Map<string, DialogCue[]> = new Map();

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

/**
 * Register DialogCues for a specific event id. Multiple calls append.
 * Era loaders (`dialogs/{era}.ts`) call this for every event in their
 * era during page boot. When a DialogCue fires, `timeline:dialog` is
 * dispatched with `DialogEventDetail`.
 */
export function registerEventDialogs(eventId: string, dialogs: DialogCue[]): void {
  if (!eventId || !Array.isArray(dialogs) || dialogs.length === 0) return;
  const existing = dialogRegistry.get(eventId);
  if (existing) existing.push(...dialogs);
  else dialogRegistry.set(eventId, [...dialogs]);
}

/** Dialog firing state, scoped per eventId — symmetric with firedCues. */
const firedDialogs: Map<string, Set<number>> = new Map();
function getFiredDialogSet(eventId: string): Set<number> {
  let s = firedDialogs.get(eventId);
  if (!s) { s = new Set<number>(); firedDialogs.set(eventId, s); }
  return s;
}

function tryFireDialog(
  eventId: string,
  index: number,
  dialog: DialogCue,
  windowText: string,
  fired: Set<number>,
): void {
  const fireOnce = dialog.fireOnce !== false;
  if (fireOnce && fired.has(index)) return;
  if (!dialog.match.test(windowText)) return;
  if (fireOnce) fired.add(index);
  const detail: DialogEventDetail = {
    eventId,
    speakerCharId: dialog.speaker,
    addresseeCharId: dialog.addressee,
    text: dialog.text,
    holdMs: dialog.holdMs ?? 4500,
  };
  window.dispatchEvent(new CustomEvent('timeline:dialog', { detail }));
}

/** Idempotency guard — calling `initNarrationCues()` more than once on the
 *  same page would attach duplicate listeners and fire each cue twice. */
let initialized = false;

/* ─── Virtual narration scrubber ───────────────────────────────────────────
 * Plays a synthetic charIndex sweep when no real narration is running so the
 * map's narration FX still come alive on scene-activation. The user asked
 * for "que los efectos se muestren aunque no se esté narrando" — without
 * this, cues only fired during era-play or "Escuchar", leaving every other
 * navigation gesture (scroll, dot click, era nav) without animation payload.
 *
 * Mechanics:
 *  - On scene-changed (and ~1.6s grace to let a real narration's first tick
 *    win), we kick a setInterval that advances a fake charIndex linearly
 *    through the event's narration text.
 *  - Each step dispatches `timeline:narration-boundary` with `virtual: true`,
 *    so the cue listener below picks it up and fires every matching cue —
 *    exactly as it would for a real audio playback.
 *  - The fs-narration-panel listener ([id].astro) ignores `virtual: true`
 *    so the word highlight stays a TRUE narration affordance.
 *  - Any real `timeline:narration-tick` aborts the simulator: the user just
 *    pressed play, real narration is taking over.
 */
const VIRTUAL_TICK_MS = 80;        // dispatch cadence
const VIRTUAL_CHAR_STEP = 8;       // chars advanced per tick → ~100 cps
const VIRTUAL_DEFER_MS = 1600;     // delay after scene-changed before kicking in

let virtualTimer: ReturnType<typeof setInterval> | null = null;
let virtualDeferTimer: ReturnType<typeof setTimeout> | null = null;
let realNarrationLastSeenAt = 0;
const REAL_NARRATION_GRACE_MS = 1500;

function isRealNarrationActive(): boolean {
  return Date.now() - realNarrationLastSeenAt < REAL_NARRATION_GRACE_MS;
}

function stopVirtualScrubber(): void {
  if (virtualTimer != null) { clearInterval(virtualTimer); virtualTimer = null; }
  if (virtualDeferTimer != null) { clearTimeout(virtualDeferTimer); virtualDeferTimer = null; }
}

function startVirtualScrubberFor(eventId: string): void {
  stopVirtualScrubber();
  const text = readNarrationText(eventId);
  if (!text) return;
  let charIndex = 0;
  virtualTimer = setInterval(() => {
    // A real boundary/tick reasserts itself? Bail — the user pressed play.
    if (isRealNarrationActive()) { stopVirtualScrubber(); return; }
    charIndex += VIRTUAL_CHAR_STEP;
    window.dispatchEvent(
      new CustomEvent('timeline:narration-boundary', {
        detail: { eventId, charIndex, virtual: true },
      }),
    );
    if (charIndex >= text.length) stopVirtualScrubber();
  }, VIRTUAL_TICK_MS);
}

/** Auto-load all era dialog shards and register them. Falls back
 *  gracefully if a shard exports nothing or doesn't exist yet. */
async function loadEraDialogs(): Promise<void> {
  const eraIds = [
    'primordial',
    'patriarcal',
    'exodo',
    'reinos-y-exilio',
    'evangelio',
    'revelacion',
  ] as const;
  await Promise.all(
    eraIds.map(async (era) => {
      try {
        const mod = await import(`./dialogs/${era}.ts`);
        const data: Record<string, DialogCue[]> | undefined =
          (mod && (mod.default ?? mod.DIALOGS)) as any;
        if (!data) return;
        for (const eventId of Object.keys(data)) {
          const list = data[eventId];
          if (Array.isArray(list) && list.length > 0) {
            registerEventDialogs(eventId, list);
          }
        }
      } catch {
        // Shard not present or failed — silent skip; Phase 1 agents fill it.
      }
    }),
  );
}

/**
 * Install the global listeners. Call once per page load.
 */
export function initNarrationCues(): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  // Best-effort dialog loader (era shards live in ./dialogs/{era}.ts).
  void loadEraDialogs();

  // A real `narration-tick` is the unambiguous "audio is playing" signal —
  // NarratorButton dispatches it on every `timeupdate`. Use it to gate the
  // virtual scrubber so the two never run in parallel.
  window.addEventListener('timeline:narration-tick', () => {
    realNarrationLastSeenAt = Date.now();
    if (virtualTimer || virtualDeferTimer) stopVirtualScrubber();
  });

  window.addEventListener('timeline:narration-boundary', (ev) => {
    const detail = (ev as CustomEvent).detail || {};
    const eventId: string | undefined = detail.eventId;
    const charIndex: number | undefined = detail.charIndex;
    if (!eventId || typeof charIndex !== 'number') return;

    // Real boundaries also count as "narration alive" — they fire from
    // audio.timeupdate AND from the TTS onboundary handler. Virtual ones
    // do NOT update the timestamp; otherwise the scrubber would keep
    // itself alive forever.
    if (!detail.virtual) realNarrationLastSeenAt = Date.now();

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

    // DialogCues: dispatch `timeline:dialog` for any matching speech.
    const dialogs = dialogRegistry.get(eventId);
    if (dialogs && dialogs.length > 0) {
      const firedD = getFiredDialogSet(eventId);
      for (let i = 0; i < dialogs.length; i++) {
        tryFireDialog(eventId, i, dialogs[i], windowText, firedD);
      }
    }
  });

  window.addEventListener('timeline:scene-changed', (ev) => {
    const detail = (ev as CustomEvent).detail || {};
    const newId: string | undefined = detail.eventId;
    // Reset firing state for the previously-active event (so revisits
    // start clean) AND for the new event (in case it was visited before
    // this scene change in the same page session).
    if (activeEventId) { firedCues.delete(activeEventId); firedDialogs.delete(activeEventId); }
    if (newId) { firedCues.delete(newId); firedDialogs.delete(newId); }
    activeEventId = newId ?? null;

    // Kick the virtual scrubber unless real narration is already running.
    // The defer-timer gives real narration (which may be about to start —
    // playMode dispatches scene-changed BEFORE audio.play) a chance to win.
    stopVirtualScrubber();
    if (!newId) return;
    virtualDeferTimer = setTimeout(() => {
      virtualDeferTimer = null;
      if (isRealNarrationActive()) return;
      startVirtualScrubberFor(newId);
    }, VIRTUAL_DEFER_MS);
  });
}
