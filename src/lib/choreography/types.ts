/**
 * Shared types for per-era choreography modules.
 *
 * Each event in an era exports a Choreography keyed by its event id.
 * Pin indices are 0-based and follow the order of `characters:` in the
 * event's MDX frontmatter.
 */
export type ChoreoStep = {
  /** Character pin index (0-based, order from event MDX `characters:` array). */
  pinIdx: number;
  /** Relative offset from the pin's base position (SVG units). */
  offset?: [number, number];
  /** Opacity (0-1). */
  opacity?: number;
  /** Scale multiplier (1 = identity). */
  scale?: number;
  /** Duration in seconds. */
  duration: number;
  /** GSAP ease (e.g. 'sine.inOut', 'power2.out', 'expo.out'). */
  ease?: string;
};

export type Choreography = {
  /** Sequenced steps; interleaved across pin indices to create concurrent motion. */
  steps: ChoreoStep[];
  /** Optional total loop duration override. */
  total?: number;
};

/** Map of event-id → Choreography. */
export type ChoreographySet = Record<string, Choreography>;
