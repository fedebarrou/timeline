import type { SceneObject } from './types';

/** Scene-objects for the EVANGELIO era.
 *
 *  REGLA #4 — permanent figurative objects that persist while a scene is active.
 *  REGLA #1 — for every id declared here, the matching cue file SHOULD use
 *             fx:animate-scene-object instead of the parallel primitive.
 *
 *  Ids estables (no chocan con tabla de equivalencias del verify):
 *    'lirio-anunciacion', 'estrella-belen', 'pesebre', 'cordero-mistico',
 *    'monte-tabor', 'caliz', 'pan-eucaristia', 'cruz', 'sepulcro',
 *    'aposento-pentecostal', 'pez-cristiano', 'corona-espinas'.
 */

const SCENE_OBJECTS: Record<string, SceneObject[]> = {
  // ─── ANUNCIACIÓN ───────────────────────────────────────────────────────────
  'anunciacion': [
    {
      id: 'lirio-anunciacion',
      name: 'Lirio de la pureza',
      offset: [-14, -2],
      svg: `
        <!-- tallo verde-dorado -->
        <line x1="0" y1="10" x2="0" y2="-6" stroke="var(--era-secondary)" stroke-width="0.8"/>
        <!-- hoja -->
        <path d="M 0 4 Q -6 0 -8 -4" fill="none" stroke="var(--era-secondary)" stroke-width="0.7"/>
        <!-- pétalos del lirio (blanco mariano) -->
        <ellipse cx="-3" cy="-8" rx="3" ry="5" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.4" transform="rotate(-30 -3 -8)"/>
        <ellipse cx="3"  cy="-8" rx="3" ry="5" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.4" transform="rotate(30 3 -8)"/>
        <ellipse cx="0"  cy="-10" rx="2.5" ry="5.5" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.4"/>
        <!-- estambres dorados -->
        <circle cx="0" cy="-9" r="0.6" fill="#ffd866"/>
        <circle cx="-1" cy="-7.5" r="0.4" fill="#ffd866"/>
        <circle cx="1" cy="-7.5" r="0.4" fill="#ffd866"/>
      `,
    },
  ],

  // ─── NACIMIENTO DE JESÚS ───────────────────────────────────────────────────
  'nacimiento-jesus': [
    {
      id: 'pesebre',
      name: 'Pesebre de Belén',
      offset: [4, 4],
      svg: `
        <!-- tablones del pesebre -->
        <path d="M -10 4 L 10 4 L 7 -4 L -7 -4 Z" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- paja -->
        <path d="M -6 -3 L -4 -1 M -3 -3 L -1 -1 M 0 -3 L 2 -1 M 3 -3 L 5 -1" stroke="#ffd866" stroke-width="0.4" opacity="0.85"/>
        <!-- niño envuelto (silueta dorada) -->
        <ellipse cx="0" cy="-1" rx="4" ry="2" fill="var(--era-accent)" opacity="0.9"/>
        <circle cx="0" cy="-2.2" r="1.2" fill="var(--era-text)" opacity="0.7"/>
      `,
    },
    {
      id: 'estrella-belen',
      name: 'Estrella de Belén',
      offset: [0, -22],
      svg: `
        <!-- destello dorado del centro -->
        <circle cx="0" cy="0" r="2.5" fill="#ffd866" opacity="0.9">
          <animate attributeName="r" values="2.2;3.2;2.2" dur="3.5s" repeatCount="indefinite"/>
        </circle>
        <!-- rayos en cruz larga (estilo Estrella de Belén) -->
        <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffd866" stroke-width="0.7" opacity="0.85"/>
        <line x1="-9" y1="0" x2="9" y2="0" stroke="#ffd866" stroke-width="0.6" opacity="0.75"/>
        <line x1="-6" y1="-6" x2="6" y2="6" stroke="#ffd866" stroke-width="0.4" opacity="0.55"/>
        <line x1="-6" y1="6"  x2="6" y2="-6" stroke="#ffd866" stroke-width="0.4" opacity="0.55"/>
      `,
      animate: (el) => {
        // pulso lento gestionado por el animate del circle inline.
      },
    },
  ],

  // ─── BAUTISMO DE JESÚS ─────────────────────────────────────────────────────
  'bautismo-de-jesus': [
    {
      id: 'jordan-ondas',
      name: 'Aguas del Jordán',
      offset: [0, 8],
      svg: `
        <!-- 3 ondas del río -->
        <path d="M -14 0 Q -10 -2 -6 0 T 2 0 T 10 0 T 14 0" fill="none" stroke="var(--era-accent)" stroke-width="0.9" opacity="0.85"/>
        <path d="M -14 3 Q -10 1 -6 3 T 2 3 T 10 3 T 14 3" fill="none" stroke="var(--era-accent)" stroke-width="0.6" opacity="0.6"/>
        <path d="M -14 6 Q -10 4 -6 6 T 2 6 T 10 6 T 14 6" fill="none" stroke="var(--era-accent)" stroke-width="0.5" opacity="0.4"/>
      `,
    },
  ],

  // ─── TRANSFIGURACIÓN ───────────────────────────────────────────────────────
  'transfiguracion': [
    {
      id: 'monte-tabor',
      name: 'Monte Tabor en gloria',
      offset: [0, 4],
      svg: `
        <!-- triángulo del monte con luz en la cima -->
        <polygon points="-14,10 0,-14 14,10" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- halo de luz sobre la cima -->
        <circle cx="0" cy="-14" r="6" fill="#ffd866" opacity="0.45">
          <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.35;0.7;0.35" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="0" cy="-14" r="2.5" fill="#fff5c8" opacity="0.95"/>
      `,
    },
  ],

  // ─── ÚLTIMA CENA ───────────────────────────────────────────────────────────
  'ultima-cena': [
    {
      id: 'caliz',
      name: 'Cáliz eucarístico',
      offset: [-10, 0],
      svg: `
        <!-- copa abierta con vino dentro -->
        <path d="M -5 -6 Q 0 0 5 -6 Z" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.6"/>
        <ellipse cx="0" cy="-6" rx="5" ry="1.2" fill="#a01010" opacity="0.85"/>
        <!-- tallo -->
        <line x1="0" y1="-1" x2="0" y2="5" stroke="var(--era-accent)" stroke-width="1.4"/>
        <!-- base -->
        <ellipse cx="0" cy="6" rx="4" ry="1" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5"/>
      `,
    },
    {
      id: 'pan-eucaristia',
      name: 'Pan partido',
      offset: [10, 0],
      svg: `
        <!-- pan redondo partido en dos -->
        <path d="M -8 0 A 8 4 0 0 1 -1 0" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6"/>
        <path d="M 1 0 A 8 4 0 0 1 8 0" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- migas -->
        <circle cx="0" cy="2" r="0.5" fill="var(--era-secondary)"/>
        <circle cx="-2" cy="3" r="0.4" fill="var(--era-secondary)"/>
        <circle cx="2" cy="3" r="0.4" fill="var(--era-secondary)"/>
      `,
    },
  ],

  // ─── CRUCIFIXIÓN ───────────────────────────────────────────────────────────
  'crucifixion': [
    {
      id: 'cruz',
      name: 'Cruz del Gólgota',
      offset: [0, -8],
      svg: `
        <!-- madero vertical -->
        <rect x="-1.2" y="-14" width="2.4" height="22" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- travesaño -->
        <rect x="-7" y="-8" width="14" height="2.2" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- INRI cartel -->
        <rect x="-3" y="-13" width="6" height="2" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.3"/>
        <text x="0" y="-11.5" text-anchor="middle" font-size="2" fill="#3a261a" font-family="serif">INRI</text>
        <!-- gotas de sangre -->
        <path d="M 0 -6 Q -1 -3 0 -2 Q 1 -3 0 -6 Z" fill="#a01010" opacity="0.85"/>
      `,
    },
    {
      id: 'corona-espinas',
      name: 'Corona de espinas',
      offset: [0, -18],
      svg: `
        <!-- aro trenzado -->
        <ellipse cx="0" cy="0" rx="6" ry="2" fill="none" stroke="var(--era-secondary)" stroke-width="1.4"/>
        <!-- espinas -->
        <line x1="-5" y1="-1.5" x2="-5.5" y2="-3" stroke="#3a261a" stroke-width="0.5"/>
        <line x1="-2" y1="-2" x2="-1.5" y2="-3.5" stroke="#3a261a" stroke-width="0.5"/>
        <line x1="2" y1="-2" x2="2.5" y2="-3.5" stroke="#3a261a" stroke-width="0.5"/>
        <line x1="5" y1="-1.5" x2="5.5" y2="-3" stroke="#3a261a" stroke-width="0.5"/>
        <line x1="0" y1="-2.2" x2="0" y2="-4" stroke="#3a261a" stroke-width="0.5"/>
      `,
    },
  ],

  // ─── RESURRECCIÓN ──────────────────────────────────────────────────────────
  'resurreccion': [
    {
      id: 'sepulcro',
      name: 'Sepulcro vacío',
      offset: [0, 4],
      svg: `
        <!-- arco de piedra del sepulcro -->
        <path d="M -10 6 L -10 -4 Q -10 -10 0 -10 Q 10 -10 10 -4 L 10 6 Z"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.7"/>
        <!-- interior oscuro (cueva vacía) -->
        <path d="M -7 6 L -7 -4 Q -7 -7 0 -7 Q 7 -7 7 -4 L 7 6 Z"
              fill="#1a0f08" opacity="0.92"/>
        <!-- piedra rodada al costado -->
        <circle cx="14" cy="4" r="4" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- luz que escapa del sepulcro -->
        <circle cx="0" cy="-2" r="2.5" fill="#ffd866" opacity="0.55">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.4s" repeatCount="indefinite"/>
        </circle>
      `,
    },
  ],

  // ─── PENTECOSTÉS ───────────────────────────────────────────────────────────
  'pentecostes': [
    {
      id: 'aposento-pentecostal',
      name: 'Aposento alto',
      offset: [0, 6],
      svg: `
        <!-- casa cuadrada con techo plano -->
        <rect x="-12" y="-8" width="24" height="14" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- techo -->
        <line x1="-12" y1="-8" x2="12" y2="-8" stroke="#3a261a" stroke-width="1"/>
        <!-- puerta -->
        <rect x="-3" y="-2" width="6" height="8" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- ventanas -->
        <rect x="-9" y="-5" width="3" height="3" fill="#ffd866" opacity="0.8"/>
        <rect x="6"  y="-5" width="3" height="3" fill="#ffd866" opacity="0.8"/>
        <!-- llamitas sobre el techo (tongues of flame) -->
        <path d="M -6 -10 Q -5 -13 -4 -10 Z" fill="#ff8844">
          <animate attributeName="opacity" values="0.55;1;0.55" dur="0.9s" repeatCount="indefinite"/>
        </path>
        <path d="M 0 -10 Q 1 -13 2 -10 Z" fill="#ff8844">
          <animate attributeName="opacity" values="1;0.55;1" dur="1s" repeatCount="indefinite"/>
        </path>
        <path d="M 5 -10 Q 6 -13 7 -10 Z" fill="#ff8844">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.1s" repeatCount="indefinite"/>
        </path>
      `,
    },
  ],

  // ─── MILAGROS DE JESÚS — peces y panes ─────────────────────────────────────
  'milagros-de-jesus': [
    {
      id: 'pez-cristiano',
      name: 'Pez (ichthys)',
      offset: [12, 4],
      svg: `
        <!-- cuerpo del pez -->
        <path d="M -6 0 Q 0 -4 6 0 Q 0 4 -6 0 Z"
              fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- cola -->
        <path d="M 6 0 L 10 -3 L 9 0 L 10 3 Z"
              fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- ojo -->
        <circle cx="-3" cy="-0.5" r="0.5" fill="#3a261a"/>
      `,
    },
  ],
};

export default SCENE_OBJECTS;
