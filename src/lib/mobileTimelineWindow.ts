export type Slot =
  | { kind: 'dot'; eventId: string; year: number; title: string; active: boolean }
  | { kind: 'cap'; side: 'start' | 'end' };

export interface SlotEvent {
  id: string;
  biblicalYear: number;
  title: string;
}

/**
 * Computes the 5-slot window for the mobile timeline header.
 *
 * Rules (see spec 2026-05-23-mobile-timeline-design.md):
 * - Always returns exactly 5 slots.
 * - N >= 5, 2 <= i <= N-3 (center): slots = events [i-2..i+2], active at slot 2.
 * - N >= 5, i < 2 (start): slot 0 = cap 'start'; slots 1..4 = events [0..3]; active at slot 1 + i.
 * - N >= 5, i > N-3 (end): slots 0..3 = events [N-4..N-1]; slot 4 = cap 'end'; active at slot i - (N-5).
 * - N < 5 (small): center the N real events; caps fill the remaining slots on both sides.
 */
export function computeSlots(events: SlotEvent[], currentIndex: number): Slot[] {
  const N = events.length;
  if (N === 0) {
    return Array.from({ length: 5 }, (_, s) => ({ kind: 'cap', side: s < 2 ? 'start' : 'end' } as Slot));
  }

  if (N >= 5) {
    if (currentIndex >= 2 && currentIndex <= N - 3) {
      return [-2, -1, 0, 1, 2].map((offset, slotIdx) => {
        const e = events[currentIndex + offset];
        return { kind: 'dot', eventId: e.id, year: e.biblicalYear, title: e.title, active: slotIdx === 2 } as Slot;
      });
    }
    if (currentIndex < 2) {
      const slots: Slot[] = [{ kind: 'cap', side: 'start' }];
      for (let j = 0; j < 4; j++) {
        const e = events[j];
        slots.push({ kind: 'dot', eventId: e.id, year: e.biblicalYear, title: e.title, active: j === currentIndex });
      }
      return slots;
    }
    // i > N - 3
    const slots: Slot[] = [];
    for (let j = N - 4; j < N; j++) {
      const e = events[j];
      slots.push({ kind: 'dot', eventId: e.id, year: e.biblicalYear, title: e.title, active: j === currentIndex });
    }
    slots.push({ kind: 'cap', side: 'end' });
    return slots;
  }

  // Small era: center N events, fill the rest with caps on both sides.
  const leftCaps = Math.floor((5 - N) / 2);
  const rightCaps = 5 - N - leftCaps;
  const slots: Slot[] = [];
  for (let k = 0; k < leftCaps; k++) slots.push({ kind: 'cap', side: 'start' });
  for (let j = 0; j < N; j++) {
    const e = events[j];
    slots.push({ kind: 'dot', eventId: e.id, year: e.biblicalYear, title: e.title, active: j === currentIndex });
  }
  for (let k = 0; k < rightCaps; k++) slots.push({ kind: 'cap', side: 'end' });
  return slots;
}

/**
 * Returns the [leftPct, rightPct] tuple for the horizontal base line, where
 * each value is the percentage offset (0..100) of the line endpoint along
 * the 5-slot track. The line spans from the center of the first dot-slot
 * to the center of the last dot-slot.
 *
 * Slot s center = (s + 0.5) * 20%.
 */
export function computeLinePct(slots: Slot[]): [number, number] {
  const firstDot = slots.findIndex(s => s.kind === 'dot');
  const lastDot = slots.length - 1 - [...slots].reverse().findIndex(s => s.kind === 'dot');
  if (firstDot < 0) return [50, 50];
  return [(firstDot + 0.5) * 20, (lastDot + 0.5) * 20];
}
