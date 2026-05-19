import type { SceneObject } from './types';

/** Scene-objects for the ÉXODO era.
 *
 *  REGLA #4 — permanent figurative objects that persist while a scene is active.
 *  REGLA #1 — for every id declared here, the matching cue file MUST use
 *             fx:animate-scene-object instead of the parallel primitive.
 *
 *  Equivalence table (what the verify script checks):
 *    'zarza'       ↔  fx:burning-bush
 *    'tabletas'    ↔  fx:stone-tablets
 *    'becerro'     ↔  fx:golden-calf
 *    'tabernaculo' ↔  (no direct primitive — glow-pulse used)
 *    'cesta'       ↔  (no direct primitive)
 *    'piramide'    ↔  (no direct primitive)
 *    'serpiente-asta' ↔ fx:serpent
 *    'aguas-partidas' ↔ fx:parted-waters
 */

const SCENE_OBJECTS: Record<string, SceneObject[]> = {
  // ─── NACIMIENTO DE MOISÉS ──────────────────────────────────────────────────
  'nacimiento-moises': [
    {
      id: 'cesta',
      name: 'Cesta de papiro en el Nilo',
      offset: [0, 8],
      svg: `
        <!-- cesta de papiro flotando -->
        <ellipse cx="0" cy="0" rx="9" ry="4"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- brea sellando la cesta -->
        <ellipse cx="0" cy="-1" rx="7" ry="2.5"
                 fill="#3a261a" opacity="0.55"/>
        <!-- bebé (punto luminoso) -->
        <circle cx="0" cy="-1.5" r="2"
                fill="var(--era-accent)" opacity="0.85"/>
        <!-- juncos a los lados -->
        <line x1="-12" y1="-8" x2="-10" y2="4" stroke="var(--era-secondary)" stroke-width="1" opacity="0.7"/>
        <line x1="-9" y1="-10" x2="-8" y2="4" stroke="var(--era-secondary)" stroke-width="0.8" opacity="0.6"/>
        <line x1="10" y1="-9" x2="9" y2="4" stroke="var(--era-secondary)" stroke-width="1" opacity="0.7"/>
      `,
      animate: (el) => {
        /* idle gentle rock handled by fx:animate-scene-object {kind:'rock'} */
      },
    },
  ],

  // ─── ESCLAVITUD EN EGIPTO ──────────────────────────────────────────────────
  'esclavitud-en-egipto': [
    {
      id: 'piramide',
      name: 'Pirámide de Egipto',
      offset: [-14, -4],
      svg: `
        <!-- pirámide faraónica -->
        <polygon points="0,-22 20,8 -20,8"
                 fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.7"/>
        <!-- piedra base -->
        <rect x="-20" y="8" width="40" height="4"
              fill="var(--era-primary)" opacity="0.35"/>
        <!-- capitel dorado -->
        <polygon points="0,-22 3,-16 -3,-16"
                 fill="#ffd866" opacity="0.9"/>
      `,
    },
    {
      id: 'latigo',
      name: 'Látigo de capataz egipcio',
      offset: [10, -2],
      svg: `
        <!-- mango del látigo -->
        <line x1="0" y1="0" x2="6" y2="-6"
              stroke="var(--era-primary)" stroke-width="1.5" stroke-linecap="round"/>
        <!-- correa ondulante -->
        <path d="M6,-6 C10,-10 14,-6 12,-2"
              fill="none" stroke="#a01010" stroke-width="0.9" stroke-linecap="round"/>
      `,
    },
    {
      id: 'ladrillo',
      name: 'Ladrillo de adobe',
      offset: [2, 10],
      svg: `
        <!-- ladrillos apilados -->
        <rect x="-10" y="-3" width="20" height="6"
              rx="1" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="-8" y="-9" width="16" height="6"
              rx="1" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" opacity="0.85"/>
        <rect x="-6" y="-15" width="12" height="6"
              rx="1" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" opacity="0.7"/>
      `,
    },
  ],

  // ─── ZARZA ARDIENTE ────────────────────────────────────────────────────────
  'zarza-ardiente': [
    {
      id: 'zarza',
      name: 'Zarza ardiente',
      offset: [8, 0],
      svg: `
        <!-- tronco retorcido -->
        <path d="M0,10 C-4,4 -3,-2 0,-8 C2,-14 -2,-18 1,-22"
              fill="none" stroke="#3a261a" stroke-width="2.2" stroke-linecap="round"/>
        <!-- ramas -->
        <path d="M0,-8 C4,-12 10,-10 12,-6"
              fill="none" stroke="#3a261a" stroke-width="1.6"/>
        <path d="M0,-8 C-6,-13 -11,-11 -12,-7"
              fill="none" stroke="#3a261a" stroke-width="1.6"/>
        <!-- follaje ardiendo — naranja sobre verde -->
        <circle cx="6" cy="-12" r="6"
                fill="#ff8844" opacity="0.75"/>
        <circle cx="-6" cy="-13" r="5.5"
                fill="#ff8844" opacity="0.7"/>
        <circle cx="0" cy="-18" r="5"
                fill="#ffd866" opacity="0.8"/>
        <!-- centro brillante -->
        <circle cx="0" cy="-13" r="3"
                fill="#ffd866" opacity="0.95"/>
      `,
    },
  ],

  // ─── MOISÉS CONFRONTA A FARAÓN ────────────────────────────────────────────
  'moises-confronta-faraon': [
    {
      id: 'trono-faraon',
      name: 'Trono de Faraón',
      offset: [14, -2],
      svg: `
        <!-- silla del trono -->
        <rect x="-8" y="-18" width="16" height="20"
              rx="2" fill="var(--era-primary)" stroke="#ffd866" stroke-width="0.8"/>
        <!-- respaldo alto -->
        <rect x="-6" y="-28" width="12" height="12"
              rx="2" fill="var(--era-primary)" stroke="#ffd866" stroke-width="0.6"/>
        <!-- decoración solar en el respaldo -->
        <circle cx="0" cy="-24" r="3" fill="#ffd866" opacity="0.9"/>
        <!-- patas -->
        <rect x="-8" y="2" width="4" height="5" fill="#3a261a"/>
        <rect x="4" y="2" width="4" height="5" fill="#3a261a"/>
      `,
    },
  ],

  // ─── DIEZ PLAGAS ──────────────────────────────────────────────────────────
  'diez-plagas': [
    {
      id: 'nilo-sangre',
      name: 'Nilo teñido de sangre',
      offset: [0, 14],
      svg: `
        <!-- río ondulante rojo -->
        <path d="M-20,0 C-12,-4 -6,4 0,0 C6,-4 12,4 20,0"
              fill="none" stroke="#a01010" stroke-width="5" opacity="0.75"/>
        <path d="M-20,4 C-12,0 -6,8 0,4 C6,0 12,8 20,4"
              fill="none" stroke="#a01010" stroke-width="3.5" opacity="0.55"/>
      `,
    },
  ],

  // ─── CRUCE DEL MAR ROJO ───────────────────────────────────────────────────
  'cruce-del-mar-rojo': [
    {
      id: 'aguas-partidas',
      name: 'Aguas del Mar Rojo partidas',
      offset: [0, 8],
      svg: `
        <!-- muro de agua izquierdo -->
        <path d="M-22,-20 C-20,-14 -18,-8 -20,0 C-18,6 -16,12 -18,18"
              fill="none" stroke="var(--era-accent)" stroke-width="5" opacity="0.8"/>
        <path d="M-17,-18 C-15,-12 -14,-6 -16,0 C-14,6 -12,12 -14,18"
              fill="none" stroke="var(--era-accent)" stroke-width="3" opacity="0.55"/>
        <!-- muro de agua derecho -->
        <path d="M22,-20 C20,-14 18,-8 20,0 C18,6 16,12 18,18"
              fill="none" stroke="var(--era-accent)" stroke-width="5" opacity="0.8"/>
        <path d="M17,-18 C15,-12 14,-6 16,0 C14,6 12,12 14,18"
              fill="none" stroke="var(--era-accent)" stroke-width="3" opacity="0.55"/>
        <!-- tierra seca en el centro -->
        <ellipse cx="0" cy="0" rx="10" ry="5"
                 fill="var(--era-surface)" opacity="0.7"/>
      `,
    },
  ],

  // ─── DIEZ MANDAMIENTOS ────────────────────────────────────────────────────
  'diez-mandamientos': [
    {
      id: 'tabletas',
      name: 'Tabletas de la Ley',
      offset: [0, -6],
      svg: `
        <!-- tabla izquierda -->
        <rect x="-14" y="-16" width="12" height="18"
              rx="0" ry="5" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.7"/>
        <path d="M-14,-16 a6,6 0 0,1 12,0" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.7"/>
        <!-- inscripción izquierda (líneas) -->
        <line x1="-12" y1="-8" x2="-4" y2="-8" stroke="#3a261a" stroke-width="0.5" opacity="0.6"/>
        <line x1="-12" y1="-4" x2="-4" y2="-4" stroke="#3a261a" stroke-width="0.5" opacity="0.6"/>
        <line x1="-12" y1="0" x2="-4" y2="0" stroke="#3a261a" stroke-width="0.5" opacity="0.6"/>
        <!-- tabla derecha -->
        <rect x="2" y="-16" width="12" height="18"
              rx="0" ry="5" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.7"/>
        <path d="M2,-16 a6,6 0 0,1 12,0" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.7"/>
        <!-- inscripción derecha -->
        <line x1="4" y1="-8" x2="12" y2="-8" stroke="#3a261a" stroke-width="0.5" opacity="0.6"/>
        <line x1="4" y1="-4" x2="12" y2="-4" stroke="#3a261a" stroke-width="0.5" opacity="0.6"/>
        <line x1="4" y1="0" x2="12" y2="0" stroke="#3a261a" stroke-width="0.5" opacity="0.6"/>
        <!-- halo dorado -->
        <ellipse cx="0" cy="-8" rx="18" ry="14"
                 fill="none" stroke="#ffd866" stroke-width="1.2" opacity="0.5"/>
      `,
    },
  ],

  // ─── BECERRO DE ORO ───────────────────────────────────────────────────────
  'becerro-de-oro': [
    {
      id: 'becerro',
      name: 'Becerro de oro',
      offset: [0, 0],
      svg: `
        <!-- cuerpo del becerro -->
        <ellipse cx="0" cy="0" rx="10" ry="6"
                 fill="#ffd866" stroke="#5a4830" stroke-width="0.6"/>
        <!-- cabeza -->
        <circle cx="10" cy="-4" r="5"
                fill="#ffd866" stroke="#5a4830" stroke-width="0.6"/>
        <!-- cuernos -->
        <path d="M8,-8 C6,-14 10,-16 12,-12"
              fill="none" stroke="#5a4830" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M12,-8 C14,-14 18,-15 17,-11"
              fill="none" stroke="#5a4830" stroke-width="1.2" stroke-linecap="round"/>
        <!-- patas delanteras -->
        <line x1="4" y1="6" x2="4" y2="14" stroke="#5a4830" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="8" y1="6" x2="8" y2="14" stroke="#5a4830" stroke-width="1.5" stroke-linecap="round"/>
        <!-- patas traseras -->
        <line x1="-6" y1="6" x2="-6" y2="14" stroke="#5a4830" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="-2" y1="6" x2="-2" y2="14" stroke="#5a4830" stroke-width="1.5" stroke-linecap="round"/>
        <!-- cola -->
        <path d="M-10,0 C-14,-2 -14,4 -12,2"
              fill="none" stroke="#5a4830" stroke-width="1.2"/>
        <!-- brillo dorado -->
        <ellipse cx="-1" cy="-1" rx="7" ry="4"
                 fill="#ffffff" opacity="0.18"/>
      `,
    },
  ],

  // ─── TABERNÁCULO ──────────────────────────────────────────────────────────
  'tabernaculo': [
    {
      id: 'tabernaculo',
      name: 'Tabernáculo (Mishkán)',
      offset: [0, -4],
      svg: `
        <!-- estructura principal — tienda sagrada -->
        <rect x="-22" y="-10" width="44" height="20"
              rx="2" fill="var(--era-surface)" stroke="var(--era-accent)" stroke-width="0.8"/>
        <!-- techo -->
        <polygon points="-26,-10 26,-10 22,-22 -22,-22"
                 fill="var(--era-primary)" stroke="var(--era-accent)" stroke-width="0.7" opacity="0.8"/>
        <!-- velo de entrada (azul) -->
        <rect x="-6" y="-10" width="12" height="20"
              fill="var(--era-accent)" opacity="0.3"/>
        <!-- menorá dentro (silueta) -->
        <line x1="0" y1="4" x2="0" y2="-4" stroke="#ffd866" stroke-width="1.2"/>
        <line x1="-4" y1="-2" x2="4" y2="-2" stroke="#ffd866" stroke-width="1"/>
        <circle cx="-4" cy="-2" r="1.2" fill="#ffd866"/>
        <circle cx="0" cy="-4" r="1.2" fill="#ffd866"/>
        <circle cx="4" cy="-2" r="1.2" fill="#ffd866"/>
        <!-- gloria (nube) sobre el tabernáculo -->
        <ellipse cx="0" cy="-26" rx="14" ry="7"
                 fill="#ffd866" opacity="0.45"/>
        <!-- columnas laterales -->
        <line x1="-22" y1="-10" x2="-22" y2="10"
              stroke="var(--era-accent)" stroke-width="1.5"/>
        <line x1="22" y1="-10" x2="22" y2="10"
              stroke="var(--era-accent)" stroke-width="1.5"/>
      `,
    },
    {
      id: 'menora',
      name: 'Menorá (candelabro sagrado)',
      offset: [16, 4],
      svg: `
        <!-- base -->
        <rect x="-5" y="6" width="10" height="2.5"
              rx="1" fill="#ffd866" stroke="#5a4830" stroke-width="0.4"/>
        <!-- tronco central -->
        <line x1="0" y1="-12" x2="0" y2="6"
              stroke="#ffd866" stroke-width="1.8" stroke-linecap="round"/>
        <!-- brazos curvos (3 a cada lado) -->
        <path d="M0,-4 C-4,-8 -10,-8 -10,-2"
              fill="none" stroke="#ffd866" stroke-width="1.2"/>
        <path d="M0,-4 C4,-8 10,-8 10,-2"
              fill="none" stroke="#ffd866" stroke-width="1.2"/>
        <path d="M0,-4 C-2,-10 -6,-12 -6,-6"
              fill="none" stroke="#ffd866" stroke-width="1"/>
        <path d="M0,-4 C2,-10 6,-12 6,-6"
              fill="none" stroke="#ffd866" stroke-width="1"/>
        <!-- llamas -->
        <ellipse cx="0" cy="-13" rx="1.5" ry="2.2" fill="#ff8844" opacity="0.9"/>
        <ellipse cx="-10" cy="-3" rx="1.2" ry="1.8" fill="#ff8844" opacity="0.8"/>
        <ellipse cx="10" cy="-3" rx="1.2" ry="1.8" fill="#ff8844" opacity="0.8"/>
        <ellipse cx="-6" cy="-7" rx="1" ry="1.5" fill="#ffd866" opacity="0.85"/>
        <ellipse cx="6" cy="-7" rx="1" ry="1.5" fill="#ffd866" opacity="0.85"/>
      `,
    },
  ],

  // ─── SERPIENTE DE BRONCE ──────────────────────────────────────────────────
  'serpiente-de-bronce': [
    {
      id: 'serpiente-asta',
      name: 'Serpiente de bronce en el asta',
      offset: [0, -8],
      svg: `
        <!-- asta vertical -->
        <line x1="0" y1="-24" x2="0" y2="18"
              stroke="#3a261a" stroke-width="2.2" stroke-linecap="round"/>
        <!-- serpiente enroscada -->
        <path d="M0,-8 C6,-12 10,-6 6,0 C2,6 -4,8 0,4 C4,0 8,-2 6,4"
              fill="none" stroke="#ffd866" stroke-width="2.8" stroke-linecap="round"/>
        <!-- cabeza de la serpiente -->
        <ellipse cx="5" cy="4" rx="3" ry="2"
                 fill="#ffd866" stroke="#3a261a" stroke-width="0.5"/>
        <!-- ojo -->
        <circle cx="6.5" cy="3.5" r="0.8" fill="#3a261a"/>
        <!-- base del asta -->
        <rect x="-6" y="15" width="12" height="4"
              rx="1" fill="#3a261a" opacity="0.7"/>
      `,
    },
  ],
};

export default SCENE_OBJECTS;
