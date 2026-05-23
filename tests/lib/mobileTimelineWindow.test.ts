import { describe, it, expect } from 'vitest';
import { computeSlots, computeLinePct } from '../../src/lib/mobileTimelineWindow';

const evts = (n: number) => Array.from({ length: n }, (_, k) => ({ id: `e${k}`, biblicalYear: 1000 + k, title: `Event ${k}` }));

describe('computeSlots', () => {
  it('center case (N=10, i=5): shows events 3..7, active at slot 2', () => {
    const out = computeSlots(evts(10), 5);
    expect(out).toHaveLength(5);
    expect(out.map(s => s.kind)).toEqual(['dot','dot','dot','dot','dot']);
    expect(out.map(s => (s.kind === 'dot' ? s.eventId : null))).toEqual(['e3','e4','e5','e6','e7']);
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(2);
  });

  it('start case (N=10, i=0): cap "inicio" at slot 0, events 0..3 at slots 1..4, active at slot 1', () => {
    const out = computeSlots(evts(10), 0);
    expect(out[0]).toEqual({ kind: 'cap', side: 'start' });
    expect(out.slice(1).map(s => (s.kind === 'dot' ? s.eventId : null))).toEqual(['e0','e1','e2','e3']);
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(1);
  });

  it('start case (N=10, i=1): cap at slot 0, active at slot 2', () => {
    const out = computeSlots(evts(10), 1);
    expect(out[0].kind).toBe('cap');
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(2);
  });

  it('end case (N=10, i=9): cap "fin" at slot 4, events 6..9 at slots 0..3, active at slot 3', () => {
    const out = computeSlots(evts(10), 9);
    expect(out[4]).toEqual({ kind: 'cap', side: 'end' });
    expect(out.slice(0, 4).map(s => (s.kind === 'dot' ? s.eventId : null))).toEqual(['e6','e7','e8','e9']);
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(3);
  });

  it('small era (N=4): no start cap, one end cap, all 4 events visible, active at slot 0', () => {
    const out = computeSlots(evts(4), 0);
    expect(out[0].kind).toBe('dot');
    expect(out[4]).toEqual({ kind: 'cap', side: 'end' });
    expect(out.slice(0, 4).map(s => (s.kind === 'dot' ? s.eventId : null))).toEqual(['e0','e1','e2','e3']);
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(0);
  });

  it('small era (N=3): both caps + 3 events, active at the right slot', () => {
    const out = computeSlots(evts(3), 1);
    expect(out[0]).toEqual({ kind: 'cap', side: 'start' });
    expect(out[4]).toEqual({ kind: 'cap', side: 'end' });
    expect(out.slice(1, 4).map(s => (s.kind === 'dot' ? s.eventId : null))).toEqual(['e0','e1','e2']);
    expect(out.findIndex(s => s.kind === 'dot' && s.active)).toBe(2);
  });

  it('small era (N=1): cap, _, dot active, _, cap → render 5 slots, only one dot', () => {
    const out = computeSlots(evts(1), 0);
    expect(out).toHaveLength(5);
    expect(out[0]).toEqual({ kind: 'cap', side: 'start' });
    expect(out[4]).toEqual({ kind: 'cap', side: 'end' });
    expect(out.filter(s => s.kind === 'dot')).toHaveLength(1);
  });
});

describe('computeLinePct', () => {
  it('all 5 slots are dots: line from 10% to 90%', () => {
    const slots = computeSlots(evts(10), 5);
    expect(computeLinePct(slots)).toEqual([10, 90]);
  });

  it('start cap (first dot at slot 1): line from 30% to 90%', () => {
    const slots = computeSlots(evts(10), 0);
    expect(computeLinePct(slots)).toEqual([30, 90]);
  });

  it('end cap (last dot at slot 3): line from 10% to 70%', () => {
    const slots = computeSlots(evts(10), 9);
    expect(computeLinePct(slots)).toEqual([10, 70]);
  });

  it('N=3 (caps both sides, dots at slots 1..3): line from 30% to 70%', () => {
    const slots = computeSlots(evts(3), 1);
    expect(computeLinePct(slots)).toEqual([30, 70]);
  });

  it('N=1 (single centered dot): line collapses to 50% / 50%', () => {
    const slots = computeSlots(evts(1), 0);
    expect(computeLinePct(slots)).toEqual([50, 50]);
  });
});
