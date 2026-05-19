/**
 * Dialog cue types — char-to-char speech bubbles fired by narrationCues.
 *
 * A DialogCue is shaped like a Cue (regex match window) but instead of
 * dispatching `timeline:cue` with an FX id it dispatches a
 * `timeline:dialog` event consumed by mapSpeechBubble.ts:
 *
 *   window.dispatchEvent(new CustomEvent('timeline:dialog', {
 *     detail: {
 *       eventId: 'akedah-sacrificio-isaac',
 *       speakerCharId: 'abraham',
 *       addresseeCharId: 'isaac',  // or null
 *       text: 'Dios se proveerá el cordero, hijo mío.',
 *       holdMs: 4500,
 *     }
 *   }));
 *
 * Speakers can be either a real character id (matching a pin in the
 * marker's [data-char-pin-wrap][data-char-id="..."]) OR a virtual
 * speaker without a physical pin (deity, anonymous angel, crowd).
 * Virtual speakers anchor the bubble to a fixed map region with a
 * distinct style — see VIRTUAL_SPEAKERS below.
 */

/** A speaker id. Strings that match `VIRTUAL_SPEAKERS` render as a
 *  fixed-position bubble without a pin; any other string is treated as
 *  a real `charId` and anchored to the corresponding pin. */
export type SpeakerId =
  | 'yahve'
  | 'allah'
  | 'dios-padre'
  | 'angel-anonimo'
  | 'voz-multitud'
  | string;

/** A DialogCue is matched against the same narration window as a
 *  regular Cue but emits `timeline:dialog` instead of `timeline:cue`. */
export type DialogCue = {
  /** Regex tested against the narration window around the current charIndex. */
  match: RegExp;
  /** Speaker — real charId or virtual speaker label. */
  speaker: SpeakerId;
  /** Addressee — real charId, virtual label, or null when speech is
   *  addressed to no one in particular (proclamations, monologues). */
  addressee: SpeakerId | null;
  /** Text rendered inside the bubble (the actual quote). */
  text: string;
  /** How long (ms) the bubble stays fully visible. Defaults to 4500. */
  holdMs?: number;
  /** Defaults to true. When true, only fires once per scene run. */
  fireOnce?: boolean;
};

/** Set of virtual speaker ids — no pin lookup is attempted for these
 *  and the bubble is rendered with a distinct visual treatment. */
export const VIRTUAL_SPEAKERS: Set<string> = new Set([
  'yahve',
  'allah',
  'dios-padre',
  'angel-anonimo',
  'voz-multitud',
]);

/** Detail payload of the `timeline:dialog` CustomEvent. */
export interface DialogEventDetail {
  eventId: string;
  speakerCharId: SpeakerId;
  addresseeCharId: SpeakerId | null;
  text: string;
  holdMs: number;
}
