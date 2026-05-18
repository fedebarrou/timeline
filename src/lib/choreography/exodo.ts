import type { ChoreographySet } from './types';

/**
 * Choreographies for events in the Éxodo era.
 *
 * Era cinematic priorities:
 *  - DIVINE presence (yhwh / dios) → opacity pulse + scale breathing (fire, glory).
 *  - FARAÓN-OPRESOR → resistance (defiant scale-up), then collapse (drop + fade).
 *  - PLAGUES → escalating sequence — each plague distinct in scale/offset to map progression.
 *  - DEATH / RAPTURE → upward drift + opacity decay (ascension to Pisgah, Aaron on Hor).
 *
 * Pin order is taken from each event's MDX `characters:` frontmatter (0-based).
 */
const EXODO: ChoreographySet = {
  // ─────────────────────────────────────────────────────────────
  // NACIMIENTO DE MOISÉS — [moises(0), miriam(1), aaron(2)]
  // Moisés appears tiny in the basket; Miriam watches over the river;
  // Aaron acknowledges his little brother from afar.
  // ─────────────────────────────────────────────────────────────
  'nacimiento-moises': {
    steps: [
      // Moisés barely existing (newborn floating in basket of bulrushes)
      { pinIdx: 0, scale: 0.25, opacity: 0.15, duration: 0.01 },
      // Miriam already vigilant (older sister, watching the river)
      { pinIdx: 1, opacity: 0.85, scale: 0.97, duration: 0.01 },
      // Basket rocks gently on the Nile — left
      { pinIdx: 0, offset: [-2, 0], duration: 1.2, ease: 'sine.inOut' },
      // Basket rocks right
      { pinIdx: 0, offset: [2, 0], duration: 1.2, ease: 'sine.inOut' },
      // Moisés grows into existence (rescued / acknowledged)
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out' },
      // Miriam swells — proud sister
      { pinIdx: 1, scale: 1.1, opacity: 1, duration: 1.5, ease: 'sine.inOut' },
      // Aaron appears at the side — older brother (not present at birth but acknowledged)
      { pinIdx: 2, offset: [18, 0], opacity: 0.4, scale: 0.95, duration: 1.8, ease: 'sine.out' },
      { pinIdx: 2, opacity: 0.8, duration: 1.0, ease: 'sine.inOut' },
      // Miriam settles
      { pinIdx: 1, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      // Hold — family complete
      { pinIdx: 0, duration: 1.0 },
      // Reset
      { pinIdx: 2, offset: [0, 0], opacity: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MOISÉS MATA AL EGIPCIO — [moises(0)]
  // Stalk → strike → recoil → flee toward Madián (far east).
  // ─────────────────────────────────────────────────────────────
  'moises-mata-egipcio': {
    steps: [
      // Approach (creeping toward the Egyptian taskmaster — left)
      { pinIdx: 0, offset: [-6, 0], duration: 1.5, ease: 'sine.in' },
      // Check both sides — micro shake (looking around)
      { pinIdx: 0, offset: [-7, 0], duration: 0.25, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-5, 0], duration: 0.25, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-6, 0], duration: 0.25, ease: 'power2.inOut' },
      // Strike — sudden lunge + scale spike (violence)
      { pinIdx: 0, offset: [-9, -2], scale: 1.18, duration: 0.35, ease: 'power3.out' },
      // Recoil — what have I done? (back to neutral but smaller, shame)
      { pinIdx: 0, offset: [-3, 2], scale: 0.93, opacity: 0.7, duration: 1.2, ease: 'power2.out' },
      // Bury the body (sink down briefly)
      { pinIdx: 0, offset: [-3, 5], duration: 1.0, ease: 'sine.inOut' },
      // Hold (looks around — discovered next day)
      { pinIdx: 0, duration: 0.8 },
      // Flee — far right, toward Madián (the desert)
      { pinIdx: 0, offset: [32, -4], opacity: 0.3, scale: 0.85, duration: 3.0, ease: 'power2.in' },
      // Hold in distant exile
      { pinIdx: 0, duration: 0.8 },
      // Reset (returns to scene)
      { pinIdx: 0, offset: [0, 0], opacity: 1, scale: 1, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ZARZA ARDIENTE — [moises(0), yhwh(1), aaron(2)]
  // YHWH flickers like fire (loop pulse), Moisés bows + removes sandals,
  // Aaron stands far away (not yet summoned).
  // ─────────────────────────────────────────────────────────────
  'zarza-ardiente': {
    steps: [
      // Moisés approaches cautiously (left toward bush)
      { pinIdx: 0, offset: [-4, 0], duration: 1.5, ease: 'sine.inOut' },
      // YHWH first flicker — fire kindled
      { pinIdx: 1, opacity: 0.4, scale: 0.8, duration: 0.01 },
      { pinIdx: 1, opacity: 1.0, scale: 1.2, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.55, scale: 0.95, duration: 0.5, ease: 'sine.inOut' },
      // Moisés removes sandals — bow (offset down + shrink)
      { pinIdx: 0, offset: [-4, 5], scale: 0.88, duration: 1.8, ease: 'sine.inOut' },
      // YHWH speaks — sustained brilliant pulse
      { pinIdx: 1, opacity: 1.0, scale: 1.3, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.7, scale: 1.0, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 1.0, scale: 1.25, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.6, scale: 1.0, duration: 0.6, ease: 'sine.inOut' },
      // Aaron appears in the distance (called by YHWH to meet Moisés)
      { pinIdx: 2, offset: [28, -2], opacity: 0.2, scale: 0.85, duration: 0.01 },
      { pinIdx: 2, offset: [22, -1], opacity: 0.55, duration: 2.5, ease: 'sine.inOut' },
      // YHWH final flame — calling "I AM"
      { pinIdx: 1, opacity: 1.0, scale: 1.35, duration: 0.8, ease: 'sine.inOut' },
      // Moisés rises — accepting mission
      { pinIdx: 0, offset: [0, 0], scale: 1.05, duration: 2.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.75, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], opacity: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MOISÉS CONFRONTA A FARAÓN — [moises(0), aaron(1), faraon-opresor(2)]
  // Moisés + Aaron advance (demand), Faraón defies (scale up), staff→serpent,
  // Faraón hardens (no recoil at first), three failed demands.
  // ─────────────────────────────────────────────────────────────
  'moises-confronta-faraon': {
    steps: [
      // Faraón sits enthroned — large, defiant
      { pinIdx: 2, scale: 1.18, duration: 1.5, ease: 'sine.inOut' },
      // Moisés steps forward boldly (right toward throne)
      { pinIdx: 0, offset: [10, 0], scale: 1.05, duration: 1.8, ease: 'power2.out' },
      // Aaron follows — speaker for Moisés
      { pinIdx: 1, offset: [8, 1], duration: 1.8, ease: 'power2.out' },
      // "Let my people go" — Moisés pulses
      { pinIdx: 0, scale: 1.12, duration: 0.6, ease: 'sine.inOut' },
      // Aaron casts staff — pulses (turns to serpent)
      { pinIdx: 1, scale: 1.15, duration: 0.5, ease: 'power2.out' },
      // Faraón scoffs — pulses bigger (his magicians do the same)
      { pinIdx: 2, scale: 1.25, duration: 0.8, ease: 'sine.inOut' },
      // Moisés/Aaron settle (heart hardened)
      { pinIdx: 0, scale: 1.0, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.0, duration: 0.8, ease: 'sine.inOut' },
      // Faraón leans forward defiant — "I do not know YHWH"
      { pinIdx: 2, offset: [-3, 0], scale: 1.22, duration: 1.2, ease: 'power2.out' },
      // Moisés steps back (warning delivered)
      { pinIdx: 0, offset: [4, 0], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [4, 1], duration: 1.5, ease: 'sine.inOut' },
      // Faraón returns to throne, still proud
      { pinIdx: 2, offset: [0, 0], scale: 1.15, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // DIEZ PLAGAS — [moises(0), aaron(1), faraon-opresor(2)]
  // Centerpiece of the era. 10 escalating beats. Each plague:
  //   - Moisés/Aaron raise staff (offset + scale up)
  //   - Faraón resists (defiant pulse)
  //   - After plague 10 (firstborn): Faraón COLLAPSES (drop + fade + shrink).
  // ─────────────────────────────────────────────────────────────
  'diez-plagas': {
    steps: [
      // Initial stance — Moisés/Aaron facing Faraón, Faraón large on throne
      { pinIdx: 2, scale: 1.2, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.05, duration: 0.5 },

      // ── PLAGA 1: SANGRE (river) — staff strikes water (down-left)
      { pinIdx: 1, offset: [-4, 4], scale: 1.1, duration: 0.6, ease: 'power2.out' },
      { pinIdx: 2, scale: 1.22, duration: 0.5, ease: 'sine.inOut' }, // Faraón resists
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 0.5, ease: 'sine.inOut' },

      // ── PLAGA 2: RANAS (croak — micro bounces)
      { pinIdx: 0, offset: [0, -2], duration: 0.3, ease: 'power2.out' },
      { pinIdx: 0, offset: [0, 0], duration: 0.3, ease: 'power2.in' },
      { pinIdx: 0, offset: [0, -2], duration: 0.3, ease: 'power2.out' },
      { pinIdx: 0, offset: [0, 0], duration: 0.3, ease: 'power2.in' },
      { pinIdx: 2, scale: 1.18, duration: 0.4, ease: 'sine.inOut' }, // Faraón still hardens

      // ── PLAGA 3: PIOJOS / mosquitos (rapid jitter on Moisés — staff dust)
      { pinIdx: 0, offset: [1, 0], duration: 0.12, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-1, 0], duration: 0.12, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [1, 0], duration: 0.12, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [-1, 0], duration: 0.12, ease: 'power2.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.2 },

      // ── PLAGA 4: MOSCAS / TÁBANOS (Aaron sweeps right)
      { pinIdx: 1, offset: [6, 0], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-6, 0], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 0.4 },
      { pinIdx: 2, scale: 1.15, duration: 0.4, ease: 'sine.inOut' }, // still defiant

      // ── PLAGA 5: PESTE EN GANADO (cattle die — Faraón unaffected, briefly worried)
      { pinIdx: 2, scale: 1.05, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.18, duration: 0.5, ease: 'sine.inOut' }, // re-hardens

      // ── PLAGA 6: ÚLCERAS (Aaron throws soot upward — scale spike)
      { pinIdx: 1, scale: 1.2, offset: [0, -4], duration: 0.5, ease: 'power2.out' },
      { pinIdx: 1, scale: 1, offset: [0, 0], duration: 0.5, ease: 'power2.in' },
      { pinIdx: 2, opacity: 0.85, duration: 0.4 }, // Faraón flinches (first sign of weakening)

      // ── PLAGA 7: GRANIZO (Moisés stretches staff to sky — offset up dramatic)
      { pinIdx: 0, offset: [0, -8], scale: 1.18, duration: 0.9, ease: 'power2.out' },
      { pinIdx: 2, scale: 1.0, opacity: 0.75, duration: 0.6, ease: 'sine.inOut' }, // Faraón yields briefly
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 0.7, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.15, opacity: 1, duration: 0.5, ease: 'sine.inOut' }, // hardens AGAIN

      // ── PLAGA 8: LANGOSTAS (locust swarm — Moisés sweeping motion)
      { pinIdx: 0, offset: [-5, -2], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [5, -2], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.4 },
      { pinIdx: 2, scale: 1.1, duration: 0.4, ease: 'sine.inOut' },

      // ── PLAGA 9: TINIEBLAS (3 days of darkness — opacity drop on Faraón, ALL dim)
      { pinIdx: 0, opacity: 0.4, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.4, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 0.35, scale: 1.0, duration: 1.0, ease: 'sine.inOut' },
      // Hold in darkness
      { pinIdx: 0, duration: 0.6 },
      // Light returns
      { pinIdx: 0, opacity: 1, duration: 0.7, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 1, duration: 0.7, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 1, scale: 1.1, duration: 0.7, ease: 'sine.inOut' }, // still defiant

      // ── PLAGA 10: PRIMOGÉNITOS (the breaking — definitive collapse)
      // Moisés raises staff one last time — climactic
      { pinIdx: 0, offset: [0, -6], scale: 1.25, duration: 0.8, ease: 'power3.out' },
      { pinIdx: 1, offset: [0, -4], scale: 1.18, duration: 0.8, ease: 'power3.out' },
      // Faraón's son dies — Faraón COLLAPSES
      { pinIdx: 2, offset: [-2, 14], scale: 0.55, opacity: 0.15, duration: 2.0, ease: 'power3.in' },
      // Moisés/Aaron settle, victorious
      { pinIdx: 0, offset: [0, 0], scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.05, duration: 1.5, ease: 'sine.inOut' },

      // Hold the broken Faraón
      { pinIdx: 0, duration: 1.2 },

      // Reset (loop ready)
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1.0, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PESAJ — PRIMERA PASCUA — [moises(0), aaron(1)]
  // Lamb's blood on doorposts. Moisés instructs (pulse), Aaron paints
  // (down-and-up sweeping motion). The death angel passes (Moisés dims briefly).
  // ─────────────────────────────────────────────────────────────
  'pesaj-primera-pascua': {
    steps: [
      // Moisés gives instruction — pulses (commanding)
      { pinIdx: 0, scale: 1.12, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.0, duration: 0.8, ease: 'sine.inOut' },
      // Aaron paints the lintel — sweeping motion right, then left (hyssop)
      { pinIdx: 1, offset: [4, -3], duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-4, -3], duration: 0.6, ease: 'sine.inOut' },
      // Down to the doorpost
      { pinIdx: 1, offset: [-4, 3], duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [4, 3], duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 0.5 },
      // The night arrives — both fade (gathered indoors, midnight)
      { pinIdx: 0, opacity: 0.5, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.5, duration: 1.5, ease: 'sine.inOut' },
      // Hold — the angel passes over
      { pinIdx: 0, duration: 1.0 },
      // Dawn — both return (preserved)
      { pinIdx: 0, opacity: 1, scale: 1.08, duration: 1.8, ease: 'sine.out' },
      { pinIdx: 1, opacity: 1, scale: 1.08, duration: 1.8, ease: 'sine.out' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // SALIDA DE EGIPTO — [moises(0), aaron(1), miriam(2)]
  // Massive exodus — all three drift right (toward the desert),
  // slight scale-down (distant horizon, multitude on the move).
  // ─────────────────────────────────────────────────────────────
  'salida-de-egipto': {
    steps: [
      // Stir — initial step (small adjustment, departing posture)
      { pinIdx: 0, scale: 1.06, duration: 0.8, ease: 'sine.out' },
      { pinIdx: 1, scale: 1.04, duration: 0.8, ease: 'sine.out' },
      { pinIdx: 2, scale: 1.04, duration: 0.8, ease: 'sine.out' },
      // March begins — leftmost steps (anticipation)
      { pinIdx: 0, offset: [3, 0], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [2, 0], duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [2, 1], duration: 1.5, ease: 'sine.inOut' },
      // Long drift right (Goshen → wilderness)
      { pinIdx: 0, offset: [22, -2], scale: 0.92, duration: 4.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [18, -1], scale: 0.92, duration: 4.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [20, 1], scale: 0.92, duration: 4.0, ease: 'sine.inOut' },
      // Hold at the horizon (distant procession)
      { pinIdx: 0, duration: 1.0 },
      // Miriam pulses — leads in song (later: "sing to YHWH")
      { pinIdx: 2, scale: 1.0, duration: 0.8, ease: 'sine.inOut' },
      // Reset (return to camp position)
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, duration: 3.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ESCLAVITUD EN EGIPTO — [faraon-opresor(0), sifra(1), fuva(2)]
  // Faraón looms massive (oppression), Sifra/Fuva tremble but resist
  // (they fear God, not the king). Cycle of fear → resistance.
  // ─────────────────────────────────────────────────────────────
  'esclavitud-en-egipto': {
    steps: [
      // Faraón looms — huge, dominant
      { pinIdx: 0, scale: 1.25, duration: 2.0, ease: 'sine.inOut' },
      // Sifra/Fuva shrink under the order (infanticide command)
      { pinIdx: 1, scale: 0.85, opacity: 0.6, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 0.85, opacity: 0.6, duration: 1.5, ease: 'sine.inOut' },
      // Faraón leans forward menacingly
      { pinIdx: 0, offset: [-3, 0], scale: 1.3, duration: 1.0, ease: 'power2.out' },
      // Sifra and Fuva tremble — micro shake
      { pinIdx: 1, offset: [1, 0], duration: 0.18, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [-1, 0], duration: 0.18, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [-1, 0], duration: 0.18, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [1, 0], duration: 0.18, ease: 'power2.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 0.2 },
      { pinIdx: 2, offset: [0, 0], duration: 0.2 },
      // RESISTANCE — Sifra and Fuva straighten up, defiant (fear God)
      { pinIdx: 1, scale: 1.05, opacity: 1, duration: 1.8, ease: 'sine.out' },
      { pinIdx: 2, scale: 1.05, opacity: 1, duration: 1.8, ease: 'sine.out' },
      // Faraón retracts — annoyed but not yet broken
      { pinIdx: 0, offset: [0, 0], scale: 1.2, duration: 1.2, ease: 'sine.inOut' },
      // Hold — tension
      { pinIdx: 0, duration: 0.8 },
      // Reset
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CRUCE DEL MAR ROJO — [moises(0), faraon-opresor(1), miriam(2)]
  // Moisés raises staff (waters part), Miriam guides the people across,
  // Faraón / chariots DROWN — drop + fade dramatic.
  // ─────────────────────────────────────────────────────────────
  'cruce-del-mar-rojo': {
    steps: [
      // Initial — Moisés at the shore, Faraón pursuing on right, Miriam in the rear
      { pinIdx: 1, offset: [-8, 0], scale: 1.15, duration: 0.01 },
      // Faraón advances aggressively (chariots roar)
      { pinIdx: 1, offset: [-4, 0], duration: 1.2, ease: 'power2.in' },
      // Moisés raises staff — dramatic offset up + scale spike
      { pinIdx: 0, offset: [0, -7], scale: 1.2, duration: 1.5, ease: 'power2.out' },
      // Hold — waters part (suspended moment)
      { pinIdx: 0, duration: 0.8 },
      // Miriam leads people across (right far — through the dry seabed)
      { pinIdx: 2, offset: [4, 0], duration: 0.5 },
      { pinIdx: 2, offset: [28, 2], scale: 0.95, duration: 4.0, ease: 'sine.inOut' },
      // Moisés holds staff up — sustaining the miracle
      { pinIdx: 0, offset: [0, -7], scale: 1.18, duration: 2.0 },
      // Hold while people pass
      { pinIdx: 0, duration: 0.5 },
      // Moisés sweeps staff down — waters return
      { pinIdx: 0, offset: [0, -2], scale: 1.1, duration: 0.6, ease: 'power3.in' },
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 0.4, ease: 'power2.in' },
      // FARAÓN DROWNS — drop + scale shrink + opacity collapse (drowning)
      { pinIdx: 1, offset: [-6, 22], scale: 0.55, opacity: 0.08, duration: 2.5, ease: 'power3.in' },
      // Hold the silence after the sea closes
      { pinIdx: 0, duration: 1.0 },
      // Miriam sings on the far shore (triumphant pulse)
      { pinIdx: 2, scale: 1.12, duration: 0.8, ease: 'sine.out' },
      { pinIdx: 2, scale: 0.95, duration: 0.8, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MANÁ Y CODORNICES — [moises(0), aaron(1)]
  // Hunger → Moisés prays (up) → manna falls (Aaron gathers — sweeping down).
  // Daily rhythm.
  // ─────────────────────────────────────────────────────────────
  'mana-y-codornices': {
    steps: [
      // Hungry — both shrink slightly (faint)
      { pinIdx: 0, scale: 0.93, opacity: 0.75, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 0.93, opacity: 0.75, duration: 1.5, ease: 'sine.inOut' },
      // Moisés prays upward
      { pinIdx: 0, offset: [0, -5], scale: 1.05, opacity: 1, duration: 1.5, ease: 'sine.out' },
      // Manna falls — Aaron sweeps to gather (down sweeping arc)
      { pinIdx: 1, offset: [-3, 4], opacity: 1, scale: 1, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [3, 4], duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-3, 4], duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [3, 4], duration: 0.6, ease: 'sine.inOut' },
      // Quails fly in — Aaron looks up briefly
      { pinIdx: 1, offset: [0, -2], scale: 1.08, duration: 0.7, ease: 'sine.out' },
      // Settle — fed
      { pinIdx: 0, offset: [0, 0], scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1.08, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // AGUA DE LA ROCA — [moises(0), aaron(1)]
  // Thirst → Moisés strikes the rock (downward jab) → water gushes (Aaron pulses).
  // First time (Refidim, commanded).
  // ─────────────────────────────────────────────────────────────
  'agua-de-la-roca': {
    steps: [
      // Thirsty — both slightly faded
      { pinIdx: 0, opacity: 0.85, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, opacity: 0.85, duration: 1.0, ease: 'sine.inOut' },
      // Moisés raises staff
      { pinIdx: 0, offset: [0, -6], scale: 1.15, opacity: 1, duration: 1.2, ease: 'power2.out' },
      // Strike! (sudden down-jab on the rock)
      { pinIdx: 0, offset: [0, 3], scale: 1.1, duration: 0.3, ease: 'power3.in' },
      // Water gushes — Aaron pulses (looking at the miracle)
      { pinIdx: 1, scale: 1.15, opacity: 1, duration: 0.8, ease: 'sine.out' },
      { pinIdx: 1, scale: 1.05, duration: 0.8, ease: 'sine.inOut' },
      // Aaron sweeps to drink (right then left)
      { pinIdx: 1, offset: [5, 2], duration: 0.7, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], duration: 0.7, ease: 'sine.inOut' },
      // Moisés returns to standing
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 1.5, ease: 'sine.inOut' },
      // Both refreshed (slight grow)
      { pinIdx: 0, scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // DIEZ MANDAMIENTOS — [moises(0), aaron(1), dios(2)]
  // Moisés ascends Sinai (offset up dramatic), Dios pulses (presence),
  // Aaron + people wait below, Moisés descends with tablets (scale up triumphant).
  // ─────────────────────────────────────────────────────────────
  'diez-mandamientos': {
    steps: [
      // All in starting position — Aaron waits below
      { pinIdx: 1, scale: 0.95, duration: 1.0, ease: 'sine.inOut' },
      // Moisés begins the ascent (up + slight fade — into the cloud)
      { pinIdx: 0, offset: [0, -10], scale: 0.95, duration: 2.5, ease: 'sine.in' },
      // Continue ascent — deeper into the cloud (dimmer)
      { pinIdx: 0, offset: [0, -22], opacity: 0.45, scale: 0.85, duration: 2.5, ease: 'power2.in' },
      // Dios manifests — first pulse (presence on the mountain)
      { pinIdx: 2, opacity: 0.4, scale: 0.9, duration: 0.01 },
      { pinIdx: 2, opacity: 1.0, scale: 1.3, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 0.7, scale: 1.0, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 1.0, scale: 1.3, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 0.65, scale: 1.0, duration: 1.0, ease: 'sine.inOut' },
      // Aaron + people anxious below (dim further, slight shake)
      { pinIdx: 1, scale: 0.9, opacity: 0.7, duration: 1.2, ease: 'sine.inOut' },
      // Dios's giving — third pulse (the law given)
      { pinIdx: 2, opacity: 1.0, scale: 1.4, duration: 1.2, ease: 'power2.out' },
      // Moisés receives — pause in radiance
      { pinIdx: 0, opacity: 0.7, scale: 1.0, duration: 0.8, ease: 'sine.inOut' },
      // Descent begins — Moisés brings the tablets
      { pinIdx: 0, offset: [0, -10], opacity: 0.9, scale: 1.05, duration: 2.5, ease: 'sine.inOut' },
      // Moisés reaches the base — radiant face (scale up)
      { pinIdx: 0, offset: [0, 0], opacity: 1, scale: 1.15, duration: 2.0, ease: 'sine.out' },
      // Aaron looks up — relieved (grows back)
      { pinIdx: 1, scale: 1.05, opacity: 1, duration: 1.2, ease: 'sine.inOut' },
      // Dios subsides (presence withdraws)
      { pinIdx: 2, opacity: 0.6, scale: 1.0, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 0.75, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // BECERRO DE ORO — [moises(0), aaron(1), samirí(2)]
  // Aaron + Samirí lead idolatry (pulse), Moisés bursts in from the side (entrance!),
  // Aaron retreats (shrink), Samirí flees (drift far + fade).
  // ─────────────────────────────────────────────────────────────
  'becerro-de-oro': {
    steps: [
      // Moisés starts OFF-SCENE (left, faded — he's still on the mountain)
      { pinIdx: 0, offset: [-22, -8], opacity: 0.0, scale: 0.85, duration: 0.01 },
      // Aaron and Samirí orchestrate the idolatry (pulse together)
      { pinIdx: 1, scale: 1.12, duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.12, duration: 1.2, ease: 'sine.inOut' },
      // Dancing around — orbit (right then left)
      { pinIdx: 1, offset: [4, -2], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [-4, -2], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [-4, 2], duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [4, 2], duration: 1.0, ease: 'sine.inOut' },
      // Climax of revelry
      { pinIdx: 1, scale: 1.15, duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.15, duration: 0.5, ease: 'sine.inOut' },
      // MOISÉS BURSTS IN — entrance from the left, fast and large
      { pinIdx: 0, offset: [0, 0], opacity: 1, scale: 1.2, duration: 0.8, ease: 'power3.out' },
      // Moisés smashes tablets — sudden down-jab
      { pinIdx: 0, offset: [0, 3], scale: 1.15, duration: 0.3, ease: 'power3.in' },
      // Aaron RETREATS — shrinks, backs off
      { pinIdx: 1, offset: [10, 4], scale: 0.85, opacity: 0.6, duration: 1.0, ease: 'power2.in' },
      // Samirí FLEES — drifts far right + fades
      { pinIdx: 2, offset: [28, -3], scale: 0.7, opacity: 0.2, duration: 2.0, ease: 'power3.in' },
      // Moisés stands in judgment — tall, terrible
      { pinIdx: 0, offset: [0, 0], scale: 1.15, duration: 1.0, ease: 'sine.inOut' },
      // Hold the silence
      { pinIdx: 0, duration: 1.0 },
      // Aaron creeps back (head down)
      { pinIdx: 1, offset: [5, 4], opacity: 0.7, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, opacity: 1, duration: 2.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // TABERNÁCULO — [moises(0), aaron(1), bezaleel(2)]
  // Bezaleel hammers (rhythmic craftsman), Aaron is consecrated (pulses), Moisés directs.
  // ─────────────────────────────────────────────────────────────
  'tabernaculo': {
    steps: [
      // Moisés directs — pulse (instructions)
      { pinIdx: 0, scale: 1.08, duration: 1.2, ease: 'sine.inOut' },
      // Bezaleel hammers (rhythmic — gold leaf, wood carving)
      { pinIdx: 2, offset: [2, 0], duration: 0.3, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [-2, 0], duration: 0.3, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [2, 0], duration: 0.3, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [-2, 0], duration: 0.3, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [2, 0], duration: 0.3, ease: 'power2.inOut' },
      { pinIdx: 2, offset: [0, 0], duration: 0.3 },
      // Aaron consecrated — anointing oil (rises, glows)
      { pinIdx: 1, offset: [0, -3], scale: 1.12, duration: 1.5, ease: 'sine.out' },
      // Moisés steady — directing
      { pinIdx: 0, scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      // Tabernacle rises (all three together — common purpose)
      { pinIdx: 0, offset: [0, -2], duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, -3], duration: 1.2, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, -2], duration: 1.2, ease: 'sine.inOut' },
      // Glory fills it — all three pulse together (Shekinah)
      { pinIdx: 0, scale: 1.1, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.15, duration: 0.8, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.1, duration: 0.8, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // DOCE ESPÍAS — [moises(0), caleb(1), josue(2)]
  // 10 cowardly spies (implied via no pin — Caleb/Josué scale up rises while the rest "retreats" via Moisés' nod). Caleb + Josué emerge confident; Moisés assents.
  // ─────────────────────────────────────────────────────────────
  'doce-espias': {
    steps: [
      // Initial — all three at center, awaiting report
      { pinIdx: 0, scale: 1.0, duration: 0.5 },
      // The 10 spies report fear — implied by Caleb/Josué shrinking briefly (drowned out)
      { pinIdx: 1, scale: 0.92, opacity: 0.75, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 0.92, opacity: 0.75, duration: 1.0, ease: 'sine.inOut' },
      // Moisés pulses worried (the people grumble)
      { pinIdx: 0, scale: 0.97, opacity: 0.85, duration: 1.0, ease: 'sine.inOut' },
      // Caleb steps forward — courage (offset up, scale up dramatic)
      { pinIdx: 1, offset: [0, -4], scale: 1.18, opacity: 1, duration: 1.5, ease: 'power2.out' },
      // Josué joins (the two faithful)
      { pinIdx: 2, offset: [0, -4], scale: 1.18, opacity: 1, duration: 1.5, ease: 'power2.out' },
      // They speak — pulse (decisively)
      { pinIdx: 1, scale: 1.22, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.22, duration: 0.6, ease: 'sine.inOut' },
      // Moisés assents — slight nod (offset down briefly)
      { pinIdx: 0, offset: [0, 2], scale: 1.05, opacity: 1, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.6, ease: 'sine.inOut' },
      // The people refuse — Caleb/Josué dim again (overruled)
      { pinIdx: 1, opacity: 0.7, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, opacity: 0.7, scale: 1.05, duration: 1.5, ease: 'sine.inOut' },
      // Moisés grieves — sinks slightly
      { pinIdx: 0, offset: [0, 3], scale: 0.95, duration: 1.5, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // REBELIÓN DE CORÉ — [moises(0), aaron(1), core(2)]
  // Coré challenges (pulses defiant), Moisés/Aaron stand firm,
  // EARTH OPENS — Coré PLUNGES DOWN catastrophically (devoured).
  // ─────────────────────────────────────────────────────────────
  'rebelion-core': {
    steps: [
      // Coré steps up defiantly — large, challenging
      { pinIdx: 2, scale: 1.2, duration: 1.0, ease: 'sine.inOut' },
      // Coré pulses (rallying his 250 men)
      { pinIdx: 2, scale: 1.25, duration: 0.6, ease: 'sine.inOut' },
      { pinIdx: 2, scale: 1.18, duration: 0.6, ease: 'sine.inOut' },
      // Coré advances toward Moisés
      { pinIdx: 2, offset: [-6, 0], duration: 1.5, ease: 'power2.in' },
      // Moisés stands firm — slight grow (authority of YHWH)
      { pinIdx: 0, scale: 1.08, duration: 1.2, ease: 'sine.inOut' },
      // Aaron beside Moisés — censer pulse
      { pinIdx: 1, scale: 1.08, duration: 1.2, ease: 'sine.inOut' },
      // The ground rumbles — Moisés points down (offset slight down)
      { pinIdx: 0, offset: [0, 2], scale: 1.1, duration: 0.5, ease: 'power2.out' },
      // Coré FROZEN for a beat (realization)
      { pinIdx: 2, scale: 1.15, duration: 0.4 },
      // EARTH OPENS — Coré plunges (massive drop + opacity collapse + shrink)
      { pinIdx: 2, offset: [-4, 28], scale: 0.45, opacity: 0.0, duration: 1.5, ease: 'power3.in' },
      // Moisés/Aaron settle — judgment complete
      { pinIdx: 0, offset: [0, 0], scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      // Hold silence over the abyss
      { pinIdx: 0, duration: 1.0 },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 2, offset: [0, 0], scale: 1, opacity: 1, duration: 3.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MOISÉS GOLPEA LA ROCA (segunda vez) — [moises(0), aaron(1)]
  // The disobedience: Moisés strikes (twice!) instead of speaking.
  // Water flows but a shadow remains — both shrink slightly (the sin).
  // ─────────────────────────────────────────────────────────────
  'moises-golpea-roca-segunda-vez': {
    steps: [
      // Moisés frustrated — pulse irritated
      { pinIdx: 0, scale: 1.1, duration: 0.8, ease: 'sine.inOut' },
      // Raises staff — angry
      { pinIdx: 0, offset: [0, -6], scale: 1.15, duration: 0.8, ease: 'power2.out' },
      // STRIKE 1 (should have only SPOKEN to the rock)
      { pinIdx: 0, offset: [0, 3], scale: 1.1, duration: 0.25, ease: 'power3.in' },
      { pinIdx: 0, offset: [0, -4], scale: 1.12, duration: 0.3, ease: 'power2.out' },
      // STRIKE 2 (the second blow that cost him the Promised Land)
      { pinIdx: 0, offset: [0, 3], scale: 1.1, duration: 0.25, ease: 'power3.in' },
      // Water flows — Aaron looks down (relieved AND troubled)
      { pinIdx: 1, scale: 1.08, duration: 1.0, ease: 'sine.inOut' },
      // YHWH speaks (implied) — both freeze
      { pinIdx: 0, offset: [0, 0], scale: 1, duration: 0.5 },
      { pinIdx: 1, scale: 1, duration: 0.5 },
      // The verdict — both shrink slightly (will not enter)
      { pinIdx: 0, scale: 0.93, opacity: 0.8, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 0.93, opacity: 0.8, duration: 2.0, ease: 'sine.inOut' },
      // Hold the grief
      { pinIdx: 0, duration: 1.0 },
      // Reset
      { pinIdx: 0, scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, scale: 1, opacity: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // SERPIENTE DE BRONCE — [moises(0)]
  // Moisés lifts the bronze serpent. Rhythmic pulse — looking → healed.
  // ─────────────────────────────────────────────────────────────
  'serpiente-de-bronce': {
    steps: [
      // Moisés lifts the bronze serpent on a pole (offset up + scale up)
      { pinIdx: 0, offset: [0, -5], scale: 1.15, duration: 1.5, ease: 'power2.out' },
      // Rhythmic pulse — people look and are healed (1)
      { pinIdx: 0, scale: 1.2, opacity: 1.0, duration: 0.7, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.1, opacity: 0.85, duration: 0.7, ease: 'sine.inOut' },
      // Pulse 2 — more healing
      { pinIdx: 0, scale: 1.2, opacity: 1.0, duration: 0.7, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.1, opacity: 0.85, duration: 0.7, ease: 'sine.inOut' },
      // Pulse 3
      { pinIdx: 0, scale: 1.22, opacity: 1.0, duration: 0.7, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.1, opacity: 0.85, duration: 0.7, ease: 'sine.inOut' },
      // Pulse 4 (final, sustained — a sign for generations)
      { pinIdx: 0, scale: 1.25, opacity: 1.0, duration: 1.0, ease: 'sine.inOut' },
      // Hold high
      { pinIdx: 0, duration: 0.8 },
      // Lower (the moment passes — but the symbol endures)
      { pinIdx: 0, offset: [0, 0], scale: 1.05, duration: 2.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 1.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MUERTE DE AARÓN — [aaron(0), moises(1)]
  // Aaron on Mt. Hor — ascends, his garments transferred (Eleazar implied),
  // Aaron fades (death), Moisés grieves.
  // ─────────────────────────────────────────────────────────────
  'muerte-de-aaron': {
    steps: [
      // Aaron and Moisés ascend Mt. Hor together (both offset up + slight fade)
      { pinIdx: 0, offset: [0, -8], scale: 0.95, opacity: 0.9, duration: 3.0, ease: 'power2.in' },
      { pinIdx: 1, offset: [0, -8], scale: 0.95, opacity: 0.9, duration: 3.0, ease: 'power2.in' },
      // At the summit — Aaron pulses (giving final blessing)
      { pinIdx: 0, scale: 1.05, opacity: 1, duration: 1.2, ease: 'sine.inOut' },
      // Garments transferred — Aaron shrinks (loses high-priestly mantle)
      { pinIdx: 0, scale: 0.88, opacity: 0.75, duration: 1.5, ease: 'sine.inOut' },
      // Aaron lies down — final descent (offset down + fade dramatic)
      { pinIdx: 0, offset: [0, -3], scale: 0.78, opacity: 0.35, duration: 2.5, ease: 'power2.in' },
      // Moisés stands vigil — slight pulse (mourning)
      { pinIdx: 1, scale: 1.0, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      // Aaron expires — final fade
      { pinIdx: 0, offset: [0, -2], scale: 0.7, opacity: 0.12, duration: 2.0, ease: 'power3.in' },
      // Moisés descends alone (sinks slightly, alone)
      { pinIdx: 1, offset: [0, -2], scale: 0.92, opacity: 0.85, duration: 2.0, ease: 'sine.inOut' },
      // Hold the silence
      { pinIdx: 1, duration: 1.2 },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 3.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, opacity: 1, duration: 3.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MUERTE DE MOISÉS — [moises(0)]
  // Moisés climbs Mt. Nebo, sees the Promised Land, dies in YHWH's kiss.
  // Solitary, ascending, final pulse, slow fade.
  // ─────────────────────────────────────────────────────────────
  'muerte-de-moises': {
    steps: [
      // Moisés begins to climb (up + slight fade — Nebo's summit)
      { pinIdx: 0, offset: [0, -8], scale: 0.97, duration: 2.5, ease: 'sine.in' },
      // Higher — Pisgah summit
      { pinIdx: 0, offset: [0, -16], scale: 0.95, opacity: 0.85, duration: 2.5, ease: 'power2.in' },
      // Highest point — looks across the Jordan (turns, pulses — beholds the land)
      { pinIdx: 0, offset: [3, -18], scale: 1.05, opacity: 1, duration: 1.2, ease: 'sine.out' },
      // Sweeps gaze — north (final survey of Canaán)
      { pinIdx: 0, offset: [-3, -18], duration: 1.5, ease: 'sine.inOut' },
      // Center — last view
      { pinIdx: 0, offset: [0, -18], scale: 1.0, duration: 1.2, ease: 'sine.inOut' },
      // Final pulse — "I will not pass over"
      { pinIdx: 0, scale: 1.08, opacity: 1, duration: 1.0, ease: 'sine.inOut' },
      // Death — the kiss of YHWH (slow fade + shrink, stays at summit)
      { pinIdx: 0, scale: 0.88, opacity: 0.4, duration: 3.0, ease: 'power2.in' },
      // Final breath — near vanishing
      { pinIdx: 0, scale: 0.82, opacity: 0.12, duration: 2.0, ease: 'power3.in' },
      // Hold the empty summit
      { pinIdx: 0, duration: 1.5 },
      // Reset
      { pinIdx: 0, offset: [0, 0], scale: 1, opacity: 1, duration: 3.5, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CONQUISTA DE JERICÓ — [josue(0), rahab(1)]
  // 7-day siege rhythm (7 micro-pulses for the trumpet circuits),
  // walls fall (Josué scale-up shout), Rahab pulses (saved by scarlet cord).
  // ─────────────────────────────────────────────────────────────
  'conquista-jerico': {
    steps: [
      // Josué advances — siege begins
      { pinIdx: 0, scale: 1.08, duration: 1.0, ease: 'sine.inOut' },
      // Rahab waits in her house on the wall — scarlet cord pulses faintly
      { pinIdx: 1, opacity: 0.7, scale: 0.95, duration: 1.0, ease: 'sine.inOut' },
      // Day 1 — circuit (Josué drifts in a small arc right)
      { pinIdx: 0, offset: [3, 0], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.5, ease: 'sine.inOut' },
      // Day 2
      { pinIdx: 0, offset: [-3, 0], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.5, ease: 'sine.inOut' },
      // Day 3
      { pinIdx: 0, offset: [3, 0], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.5, ease: 'sine.inOut' },
      // Day 4
      { pinIdx: 0, offset: [-3, 0], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.5, ease: 'sine.inOut' },
      // Day 5
      { pinIdx: 0, offset: [3, 0], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.5, ease: 'sine.inOut' },
      // Day 6
      { pinIdx: 0, offset: [-3, 0], duration: 0.5, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.5, ease: 'sine.inOut' },
      // Day 7 — 7 circuits (faster)
      { pinIdx: 0, offset: [3, 0], duration: 0.25, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-3, 0], duration: 0.25, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [3, 0], duration: 0.25, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [-3, 0], duration: 0.25, ease: 'sine.inOut' },
      { pinIdx: 0, offset: [0, 0], duration: 0.25 },
      // THE SHOUT — Josué erupts (massive scale spike)
      { pinIdx: 0, scale: 1.3, opacity: 1, duration: 0.5, ease: 'power3.out' },
      // Walls FALL — Rahab survives (pulse + slight rise)
      { pinIdx: 1, offset: [0, -3], scale: 1.12, opacity: 1, duration: 1.2, ease: 'sine.out' },
      // Hold (the city is taken)
      { pinIdx: 0, scale: 1.2, duration: 0.8 },
      // Reset
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
      { pinIdx: 1, offset: [0, 0], scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CONQUISTA DE CANAÁN — [josue(0)]
  // 3 campaigns (center / south / north) — Josué pulses + offsets in 3 directions.
  // Sun stands still (mid-sequence freeze). Final: tribal allocation pulse.
  // ─────────────────────────────────────────────────────────────
  'conquista-canaan': {
    steps: [
      // Initial stance — Josué as commander
      { pinIdx: 0, scale: 1.1, duration: 1.0, ease: 'sine.inOut' },
      // Campaign 1 — CENTRAL (Hai) — offset right (small)
      { pinIdx: 0, offset: [6, 0], scale: 1.12, duration: 1.5, ease: 'sine.inOut' },
      // Strike — pulse (Hai destroyed)
      { pinIdx: 0, scale: 1.18, duration: 0.4, ease: 'power2.out' },
      // Return to center
      { pinIdx: 0, offset: [0, 0], scale: 1.08, duration: 1.0, ease: 'sine.inOut' },
      // Campaign 2 — SOUTH (Adonisedec coalition) — offset down-right
      { pinIdx: 0, offset: [5, 5], scale: 1.12, duration: 1.5, ease: 'sine.inOut' },
      // BATTLE OF GIBEON — sun stands still (freeze + opacity peak)
      { pinIdx: 0, scale: 1.22, opacity: 1, duration: 0.6, ease: 'sine.inOut' },
      // HOLD — the sun stands still (long pause)
      { pinIdx: 0, duration: 1.8 },
      // Victory — slight relax
      { pinIdx: 0, scale: 1.15, duration: 0.8, ease: 'sine.inOut' },
      // Return
      { pinIdx: 0, offset: [0, 0], scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      // Campaign 3 — NORTH (Hazor / Jabín) — offset up
      { pinIdx: 0, offset: [-2, -6], scale: 1.12, duration: 1.5, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.2, duration: 0.5, ease: 'power2.out' },
      { pinIdx: 0, offset: [0, 0], scale: 1.05, duration: 1.2, ease: 'sine.inOut' },
      // Tribal allocation — Josué pulses in peace (Siquem assembly)
      { pinIdx: 0, scale: 1.12, duration: 1.0, ease: 'sine.inOut' },
      { pinIdx: 0, scale: 1.05, duration: 1.0, ease: 'sine.inOut' },
      // Reset
      { pinIdx: 0, scale: 1, duration: 2.0, ease: 'sine.inOut' },
    ],
  },
};

export default EXODO;
