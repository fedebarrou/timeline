import type { SceneObject } from './types';

/** Scene-objects for the REINOS-Y-EXILIO era.
 *
 *  Mood: Púrpuras reales y ruinas. Tronos, coronas, arpas (David), templo,
 *  ruinas tras destrucción. Era de gloria que se desmorona en exilio.
 *
 *  Color rules:
 *    - All fills use var(--era-primary), var(--era-secondary), var(--era-accent),
 *      var(--era-surface), var(--era-text) exclusively.
 *    - Permitted universal hex: #ffd866 (oro divino), #ff8844 (fuego),
 *      #a01010 (sangre), #1a0f08 / #3a261a (tinta oscura), #ffffff (flash).
 *
 *  REGLA #1 enforcement: every id declared here means the cue file for that
 *  event MUST NOT dispatch the equivalent primitive; instead it dispatches
 *  fx:animate-scene-object with that id. */
const SCENE_OBJECTS: Record<string, SceneObject[]> = {

  // ──────────────────────────────────────────────────────────────────────────
  // conquista-jerico
  // ──────────────────────────────────────────────────────────────────────────
  'conquista-jerico': [
    {
      id: 'muralla-jerico',
      name: 'Murallas de Jericó',
      offset: [10, -8],
      svg: `
        <!-- Murallas de Jericó — cuatro bloques apilados de adobe -->
        <rect x="-14" y="-12" width="28" height="4"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <rect x="-12" y="-8" width="24" height="4"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <rect x="-10" y="-4" width="20" height="4"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <!-- Almenas superiores -->
        <rect x="-12" y="-16" width="4" height="4"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="-5" y="-16" width="4" height="4"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="2" y="-16" width="4" height="4"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="8" y="-16" width="4" height="4"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Puerta central -->
        <rect x="-3" y="-4" width="6" height="4"
              fill="#1a0f08" rx="0.5"/>
      `,
    },
    {
      id: 'cordon-rojo-rahab',
      name: 'Cordón rojo de Rahab',
      offset: [18, 4],
      svg: `
        <!-- Ventana con el cordón escarlata -->
        <rect x="-3" y="-8" width="6" height="8"
              fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.5" rx="0.4"/>
        <!-- Cordón rojo colgante -->
        <line x1="0" y1="0" x2="0" y2="8" stroke="#a01010" stroke-width="1.4"/>
        <circle cx="0" cy="8" r="1" fill="#a01010"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // conquista-canaan
  // ──────────────────────────────────────────────────────────────────────────
  'conquista-canaan': [
    {
      id: 'campamento-israel',
      name: 'Campamento de Israel',
      offset: [-14, 6],
      svg: `
        <!-- Tiendas tribales -->
        <polygon points="-10,0 0,-10 10,0" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6"/>
        <polygon points="-7,0 0,-7 7,0" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"
                 transform="translate(12,0)"/>
        <line x1="-12" y1="0" x2="22" y2="0" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Estandarte central -->
        <line x1="0" y1="-10" x2="0" y2="-18" stroke="#3a261a" stroke-width="0.6"/>
        <polygon points="0,-18 7,-14 0,-10" fill="var(--era-accent)"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // periodo-jueces
  // ──────────────────────────────────────────────────────────────────────────
  'periodo-jueces': [
    {
      id: 'altar-baal',
      name: 'Altar de Baal',
      offset: [12, 4],
      svg: `
        <!-- Mesa de piedra con ídolo -->
        <rect x="-8" y="-4" width="16" height="6"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <!-- Patas -->
        <rect x="-6" y="2" width="3" height="4" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <rect x="3" y="2" width="3" height="4" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Ídolo encima -->
        <ellipse cx="0" cy="-8" rx="4" ry="5"
                 fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Cuernos de toro -->
        <path d="M-4,-10 Q-8,-14 -6,-11" stroke="var(--era-accent)" stroke-width="1.2" fill="none"/>
        <path d="M4,-10 Q8,-14 6,-11" stroke="var(--era-accent)" stroke-width="1.2" fill="none"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // debora-profetisa
  // ──────────────────────────────────────────────────────────────────────────
  'debora-profetisa': [
    {
      id: 'palmera-debora',
      name: 'Palmera de Débora',
      offset: [-12, -4],
      svg: `
        <!-- Tronco -->
        <rect x="-2" y="-2" width="4" height="18"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" rx="1"/>
        <!-- Hojas de palma en estrella -->
        <ellipse cx="-12" cy="-6" rx="10" ry="2.5" fill="var(--era-primary)"
                 transform="rotate(-25,-12,-6)"/>
        <ellipse cx="12" cy="-6" rx="10" ry="2.5" fill="var(--era-primary)"
                 transform="rotate(25,12,-6)"/>
        <ellipse cx="0" cy="-14" rx="10" ry="2.5" fill="var(--era-primary)"
                 transform="rotate(-5,0,-14)"/>
        <ellipse cx="-8" cy="-18" rx="8" ry="2" fill="var(--era-primary)"
                 transform="rotate(-45,-8,-18)"/>
        <ellipse cx="8" cy="-18" rx="8" ry="2" fill="var(--era-primary)"
                 transform="rotate(45,8,-18)"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // gedeon
  // ──────────────────────────────────────────────────────────────────────────
  'gedeon': [
    {
      id: 'vellon-gedeon',
      name: 'Vellón de Gedeón',
      offset: [12, 6],
      svg: `
        <!-- Vellón — masa de lana sobre el suelo -->
        <ellipse cx="0" cy="0" rx="9" ry="5"
                 fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Gotas de rocío -->
        <circle cx="-4" cy="-1" r="1.2" fill="var(--era-accent)" opacity="0.7"/>
        <circle cx="0" cy="1" r="1" fill="var(--era-accent)" opacity="0.7"/>
        <circle cx="4" cy="-1" r="1.2" fill="var(--era-accent)" opacity="0.7"/>
      `,
    },
    {
      id: 'antorcha-gedeon',
      name: 'Antorcha y cántaro de Gedeón',
      offset: [-14, 4],
      svg: `
        <!-- Cántaro roto -->
        <path d="M-6,4 Q-8,0 -6,-4 Q-4,-8 0,-8 Q4,-8 6,-4 Q8,0 6,4 Z"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Grieta del cántaro roto -->
        <path d="M0,-8 L1,-2 L-1,2 L0,4" stroke="#3a261a" stroke-width="0.8" fill="none"/>
        <!-- Llama emergiendo -->
        <ellipse cx="0" cy="-12" rx="3" ry="5" fill="#ff8844" opacity="0.85"/>
        <ellipse cx="0" cy="-14" rx="2" ry="3" fill="#ffd866" opacity="0.9"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // sanson
  // ──────────────────────────────────────────────────────────────────────────
  'sanson': [
    {
      id: 'columna-dagon',
      name: 'Columna del Templo de Dagón',
      offset: [14, -6],
      svg: `
        <!-- Columna jónica -->
        <rect x="-4" y="-20" width="8" height="22"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" rx="1"/>
        <!-- Capitel superior -->
        <ellipse cx="0" cy="-20" rx="7" ry="3"
                 fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Estría vertical (3) -->
        <line x1="-2" y1="-18" x2="-2" y2="2" stroke="#3a261a" stroke-width="0.3" opacity="0.6"/>
        <line x1="2" y1="-18" x2="2" y2="2" stroke="#3a261a" stroke-width="0.3" opacity="0.6"/>
        <!-- Base del capitel -->
        <rect x="-5" y="2" width="10" height="3"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // samuel-ultimo-juez
  // ──────────────────────────────────────────────────────────────────────────
  'samuel-ultimo-juez': [
    {
      id: 'vasija-aceite-samuel',
      name: 'Vasija de aceite de unción',
      offset: [14, 4],
      svg: `
        <!-- Jarra de cuello estrecho -->
        <path d="M-5,6 Q-8,4 -8,-2 Q-8,-10 0,-12 Q8,-10 8,-2 Q8,4 5,6 Z"
              fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Cuello -->
        <rect x="-3" y="-16" width="6" height="5"
              fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.5" rx="1"/>
        <!-- Gotas de aceite dorado -->
        <path d="M0,-12 Q1,-9 0,-7" stroke="#ffd866" stroke-width="1.5" fill="none"/>
        <circle cx="0" cy="-7" r="1.2" fill="#ffd866" opacity="0.85"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // reinado-saul
  // ──────────────────────────────────────────────────────────────────────────
  'reinado-saul': [
    {
      id: 'corona-saul',
      name: 'Corona de Saúl',
      offset: [0, -16],
      svg: `
        <!-- Corona real con puntas -->
        <path d="M-10,0 L-10,-8 L-6,-14 L0,-8 L6,-14 L10,-8 L10,0 Z"
              fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- Banda de la corona -->
        <rect x="-10" y="-4" width="20" height="4"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Gemas incrustadas -->
        <circle cx="-5" cy="-2" r="1.5" fill="#ffd866"/>
        <circle cx="0" cy="-2" r="1.5" fill="var(--era-secondary)"/>
        <circle cx="5" cy="-2" r="1.5" fill="#ffd866"/>
      `,
    },
    {
      id: 'jabalina-saul',
      name: 'Jabalina de Saúl',
      offset: [14, 2],
      svg: `
        <!-- Asta -->
        <line x1="0" y1="-20" x2="0" y2="8" stroke="var(--era-secondary)" stroke-width="2"/>
        <!-- Punta de bronce -->
        <polygon points="0,-24 -3,-18 3,-18"
                 fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.4"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // david-vs-goliat — CUMBRE (≥20 cues)
  // ──────────────────────────────────────────────────────────────────────────
  'david-vs-goliat': [
    {
      id: 'honda-david',
      name: 'Honda de David',
      offset: [-10, 2],
      svg: `
        <!-- Bolsa de cuero de la honda -->
        <ellipse cx="0" cy="0" rx="4" ry="2.5"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Cuerdas de la honda -->
        <line x1="-4" y1="0" x2="-10" y2="-8" stroke="#3a261a" stroke-width="0.8"/>
        <line x1="4" y1="0" x2="10" y2="-8" stroke="#3a261a" stroke-width="0.8"/>
        <!-- Piedra lisa cargada -->
        <circle cx="0" cy="0" r="2" fill="var(--era-text)" opacity="0.6"/>
      `,
    },
    {
      id: 'armadura-goliat',
      name: 'Armadura de Goliat',
      offset: [16, 0],
      svg: `
        <!-- Coraza escamada de bronce de Goliat -->
        <rect x="-10" y="-14" width="20" height="18"
              fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.6" rx="1"/>
        <!-- Escamas decorativas -->
        <path d="M-8,-10 Q-4,-8 0,-10 Q4,-8 8,-10" stroke="#3a261a" stroke-width="0.4" fill="none"/>
        <path d="M-8,-6 Q-4,-4 0,-6 Q4,-4 8,-6" stroke="#3a261a" stroke-width="0.4" fill="none"/>
        <path d="M-8,-2 Q-4,0 0,-2 Q4,0 8,-2" stroke="#3a261a" stroke-width="0.4" fill="none"/>
        <!-- Casco -->
        <ellipse cx="0" cy="-18" rx="8" ry="6"
                 fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- Penacho del casco -->
        <path d="M-2,-24 Q0,-28 2,-24 Q4,-22 2,-20 Q0,-19 -2,-20 Q-4,-22 -2,-24Z"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.4"/>
      `,
    },
    {
      id: 'lanza-goliat',
      name: 'Lanza de Goliat',
      offset: [24, -10],
      svg: `
        <!-- Asta de la lanza -->
        <line x1="0" y1="-24" x2="0" y2="12" stroke="var(--era-secondary)" stroke-width="2.5"/>
        <!-- Punta hierro -->
        <polygon points="0,-28 -4,-20 4,-20"
                 fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Contrapeso de madera -->
        <ellipse cx="0" cy="12" rx="3" ry="2"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // david-rey
  // ──────────────────────────────────────────────────────────────────────────
  'david-rey': [
    {
      id: 'arpa-david',
      name: 'Arpa de David',
      offset: [-14, 4],
      svg: `
        <!-- Cuerpo del arpa en forma de ángulo -->
        <path d="M0,8 Q-8,0 -8,-12 Q-4,-20 0,-20 L0,8Z"
              fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.7"/>
        <!-- Columna curva superior -->
        <path d="M0,-20 Q8,-16 8,-4 Q8,4 0,8"
              fill="none" stroke="var(--era-accent)" stroke-width="1.2"/>
        <!-- Cuerdas (6) -->
        <line x1="-8" y1="-10" x2="8" y2="-6" stroke="#ffd866" stroke-width="0.5" opacity="0.9"/>
        <line x1="-8" y1="-7" x2="8" y2="-2" stroke="#ffd866" stroke-width="0.5" opacity="0.9"/>
        <line x1="-8" y1="-4" x2="8" y2="2" stroke="#ffd866" stroke-width="0.5" opacity="0.9"/>
        <line x1="-8" y1="-1" x2="6" y2="5" stroke="#ffd866" stroke-width="0.5" opacity="0.9"/>
        <line x1="-8" y1="2" x2="4" y2="7" stroke="#ffd866" stroke-width="0.5" opacity="0.9"/>
      `,
    },
    {
      id: 'trono-david',
      name: 'Trono de David',
      offset: [12, 0],
      svg: `
        <!-- Asiento del trono -->
        <rect x="-9" y="-2" width="18" height="5"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <!-- Respaldo alto -->
        <rect x="-8" y="-18" width="16" height="16"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <!-- Patas del trono -->
        <rect x="-8" y="3" width="3" height="5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <rect x="5" y="3" width="3" height="5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Símbolo estrella de David en el respaldo -->
        <polygon points="0,-15 2,-11 6,-11 3,-8 4,-4 0,-7 -4,-4 -3,-8 -6,-11 -2,-11"
                 fill="#ffd866" stroke="#3a261a" stroke-width="0.3"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // batsabe-y-natan
  // ──────────────────────────────────────────────────────────────────────────
  'batsabe-y-natan': [
    {
      id: 'pergamino-natan',
      name: 'Pergamino de la parábola de Natán',
      offset: [12, 4],
      svg: `
        <!-- Rollo desplegado parcialmente -->
        <rect x="-10" y="-6" width="20" height="14"
              fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <!-- Rodillos -->
        <ellipse cx="-10" cy="1" rx="2" ry="7" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <ellipse cx="10" cy="1" rx="2" ry="7" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Líneas de escritura -->
        <line x1="-7" y1="-3" x2="7" y2="-3" stroke="#3a261a" stroke-width="0.4" opacity="0.5"/>
        <line x1="-7" y1="0" x2="7" y2="0" stroke="#3a261a" stroke-width="0.4" opacity="0.5"/>
        <line x1="-7" y1="3" x2="5" y2="3" stroke="#3a261a" stroke-width="0.4" opacity="0.5"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // rebelion-de-absalon
  // ──────────────────────────────────────────────────────────────────────────
  'rebelion-de-absalon': [
    {
      id: 'encina-absalon',
      name: 'Encina donde quedó Absalón',
      offset: [16, -4],
      svg: `
        <!-- Tronco -->
        <rect x="-3" y="0" width="6" height="14"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" rx="1"/>
        <!-- Copa densa de encina -->
        <ellipse cx="0" cy="-8" rx="12" ry="10"
                 fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.5" opacity="0.85"/>
        <ellipse cx="-5" cy="-4" rx="7" ry="6"
                 fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.4" opacity="0.7"/>
        <!-- Cabellera atrapada — línea dorada entrelazada -->
        <path d="M0,-6 Q2,-2 0,2" stroke="#ffd866" stroke-width="1.5" fill="none"/>
        <path d="M2,-5 Q0,-1 2,3" stroke="#ffd866" stroke-width="1" fill="none" opacity="0.7"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // salomon-rey — CUMBRE
  // ──────────────────────────────────────────────────────────────────────────
  'salomon-rey': [
    {
      id: 'trono-salomon',
      name: 'Trono de marfil de Salomón',
      offset: [14, -2],
      svg: `
        <!-- Trono de marfil con leones flanqueantes -->
        <rect x="-10" y="-2" width="20" height="6"
              fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <!-- Respaldo -->
        <rect x="-9" y="-20" width="18" height="18"
              fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6" rx="1"/>
        <!-- Arco superior -->
        <path d="M-9,-20 Q0,-28 9,-20" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Patas -->
        <rect x="-9" y="4" width="3" height="6" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <rect x="6" y="4" width="3" height="6" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- León izquierdo -->
        <ellipse cx="-14" cy="5" rx="5" ry="3"
                 fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5"/>
        <circle cx="-17" cy="3" r="3" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- León derecho -->
        <ellipse cx="14" cy="5" rx="5" ry="3"
                 fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5"/>
        <circle cx="17" cy="3" r="3" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Símbolo de sabiduría en el respaldo -->
        <text x="0" y="-10" text-anchor="middle" font-size="7"
              fill="#ffd866" opacity="0.7">✦</text>
      `,
    },
    {
      id: 'corona-salomon',
      name: 'Corona de Salomón',
      offset: [-2, -24],
      svg: `
        <!-- Corona real con cinco puntas -->
        <path d="M-12,0 L-12,-8 L-8,-14 L-4,-8 L0,-16 L4,-8 L8,-14 L12,-8 L12,0 Z"
              fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.6"/>
        <rect x="-12" y="-5" width="24" height="5"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Gemas -->
        <circle cx="-6" cy="-3" r="1.8" fill="#ffd866"/>
        <circle cx="0" cy="-3" r="1.8" fill="var(--era-secondary)"/>
        <circle cx="6" cy="-3" r="1.8" fill="#ffd866"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // templo-de-salomon — CUMBRE
  // ──────────────────────────────────────────────────────────────────────────
  'templo-de-salomon': [
    {
      id: 'templo-salomon',
      name: 'Templo de Salomón',
      offset: [0, -10],
      svg: `
        <!-- Ulam / pórtico frontal -->
        <rect x="-18" y="-8" width="36" height="6"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <!-- Hejal / nave principal -->
        <rect x="-16" y="-20" width="32" height="12"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.7" rx="0.5"/>
        <!-- Debir / sanctasanctórum -->
        <rect x="-10" y="-30" width="20" height="10"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.8" rx="0.5"/>
        <!-- Tejado escalonado -->
        <polygon points="-14,-30 0,-38 14,-30"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Columnas Jaquín y Boaz -->
        <rect x="-18" y="-26" width="4" height="18"
              fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5" rx="0.5"/>
        <rect x="14" y="-26" width="4" height="18"
              fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5" rx="0.5"/>
        <!-- Capiteles de las columnas -->
        <ellipse cx="-16" cy="-26" rx="3.5" ry="2"
                 fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.4"/>
        <ellipse cx="16" cy="-26" rx="3.5" ry="2"
                 fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Puerta central -->
        <rect x="-5" y="-8" width="10" height="8"
              fill="#1a0f08" rx="1"/>
        <!-- Menorá en el hejal -->
        <line x1="0" y1="-20" x2="0" y2="-12" stroke="#ffd866" stroke-width="0.8"/>
        <line x1="-5" y1="-17" x2="5" y2="-17" stroke="#ffd866" stroke-width="0.6"/>
        <line x1="-5" y1="-17" x2="-5" y2="-14" stroke="#ffd866" stroke-width="0.6"/>
        <line x1="5" y1="-17" x2="5" y2="-14" stroke="#ffd866" stroke-width="0.6"/>
        <circle cx="-5" cy="-14" r="1" fill="#ffd866"/>
        <circle cx="0" cy="-12" r="1" fill="#ffd866"/>
        <circle cx="5" cy="-14" r="1" fill="#ffd866"/>
        <!-- Halo de gloria sobre el templo -->
        <ellipse cx="0" cy="-34" rx="16" ry="4"
                 fill="#ffd866" opacity="0.2" stroke="#ffd866" stroke-width="0.3"/>
      `,
    },
    {
      id: 'menora-templo',
      name: 'Menorá del Templo',
      offset: [24, -6],
      svg: `
        <!-- Candelabro de siete brazos -->
        <line x1="0" y1="0" x2="0" y2="-16" stroke="#ffd866" stroke-width="1.2"/>
        <!-- Base -->
        <path d="M-8,0 Q0,-2 8,0" stroke="#ffd866" stroke-width="1.2" fill="none"/>
        <line x1="-8" y1="0" x2="-8" y2="4" stroke="#ffd866" stroke-width="1"/>
        <line x1="8" y1="0" x2="8" y2="4" stroke="#ffd866" stroke-width="1"/>
        <!-- Brazos izquierda -->
        <path d="M0,-8 Q-5,-8 -6,-12" stroke="#ffd866" stroke-width="1" fill="none"/>
        <path d="M0,-6 Q-9,-6 -10,-12" stroke="#ffd866" stroke-width="1" fill="none"/>
        <!-- Brazos derecha -->
        <path d="M0,-8 Q5,-8 6,-12" stroke="#ffd866" stroke-width="1" fill="none"/>
        <path d="M0,-6 Q9,-6 10,-12" stroke="#ffd866" stroke-width="1" fill="none"/>
        <!-- Llamas en las 7 puntas -->
        <ellipse cx="-10" cy="-14" rx="1.5" ry="2.5" fill="#ff8844"/>
        <ellipse cx="-6" cy="-14" rx="1.5" ry="2.5" fill="#ff8844"/>
        <ellipse cx="0" cy="-18" rx="1.5" ry="2.5" fill="#ffd866"/>
        <ellipse cx="6" cy="-14" rx="1.5" ry="2.5" fill="#ff8844"/>
        <ellipse cx="10" cy="-14" rx="1.5" ry="2.5" fill="#ff8844"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // reina-de-saba
  // ──────────────────────────────────────────────────────────────────────────
  'reina-de-saba': [
    {
      id: 'camello-saba',
      name: 'Camello de la caravana de Saba',
      offset: [-16, 4],
      svg: `
        <!-- Cuerpo del camello — silueta estilizada -->
        <ellipse cx="0" cy="0" rx="12" ry="6"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- Joroba -->
        <ellipse cx="3" cy="-7" rx="5" ry="4"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Cuello -->
        <rect x="-10" y="-8" width="4" height="10"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" rx="1"
              transform="rotate(-20,-10,-8)"/>
        <!-- Cabeza -->
        <ellipse cx="-16" cy="-12" rx="5" ry="3.5"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Patas -->
        <line x1="-6" y1="6" x2="-6" y2="14" stroke="var(--era-secondary)" stroke-width="2"/>
        <line x1="0" y1="6" x2="0" y2="14" stroke="var(--era-secondary)" stroke-width="2"/>
        <line x1="6" y1="6" x2="6" y2="14" stroke="var(--era-secondary)" stroke-width="2"/>
        <!-- Carga preciosa encima -->
        <rect x="-4" y="-10" width="8" height="5"
              fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.4" rx="0.5"/>
      `,
    },
    {
      id: 'regalo-saba',
      name: 'Tesoros de la Reina de Saba',
      offset: [16, 4],
      svg: `
        <!-- Cofre de tesoros -->
        <rect x="-10" y="-4" width="20" height="12"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <!-- Tapa curvada -->
        <path d="M-10,-4 Q0,-10 10,-4"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Herraje dorado -->
        <rect x="-1" y="-4" width="2" height="4"
              fill="#ffd866" stroke="#3a261a" stroke-width="0.3"/>
        <line x1="-10" y1="-4" x2="10" y2="-4" stroke="#ffd866" stroke-width="0.8"/>
        <line x1="-10" y1="4" x2="10" y2="4" stroke="#ffd866" stroke-width="0.4" opacity="0.6"/>
        <!-- Brillo de joyas visible -->
        <circle cx="-5" cy="2" r="1.5" fill="#ffd866" opacity="0.8"/>
        <circle cx="5" cy="2" r="1.5" fill="var(--era-accent)" opacity="0.8"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // division-del-reino — CUMBRE
  // ──────────────────────────────────────────────────────────────────────────
  'division-del-reino': [
    {
      id: 'manto-rasgado',
      name: 'Manto rasgado en doce pedazos',
      offset: [0, 8],
      svg: `
        <!-- Manto real rasgado en dos mitades -->
        <path d="M-14,-8 Q-12,0 -14,8 L-2,8 Q0,4 0,0 Q0,-4 -2,-8Z"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.6" opacity="0.85"/>
        <path d="M14,-8 Q12,0 14,8 L2,8 Q0,4 0,0 Q0,-4 2,-8Z"
              fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.6" opacity="0.85"/>
        <!-- Desgarro central -->
        <path d="M0,-8 L1,-4 L-1,0 L1,4 L0,8" stroke="#3a261a" stroke-width="0.8" fill="none"/>
        <!-- Líneas de tela rasgada -->
        <line x1="0" y1="-2" x2="-3" y2="0" stroke="#3a261a" stroke-width="0.4" opacity="0.6"/>
        <line x1="0" y1="2" x2="3" y2="4" stroke="#3a261a" stroke-width="0.4" opacity="0.6"/>
      `,
    },
    {
      id: 'becerro-oro-dan',
      name: 'Becerro de oro de Dan',
      offset: [18, 2],
      svg: `
        <!-- Becerro áureo sobre pedestal -->
        <rect x="-8" y="4" width="16" height="4"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" rx="0.3"/>
        <!-- Cuerpo del becerro -->
        <ellipse cx="0" cy="-2" rx="8" ry="5"
                 fill="#ffd866" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Cabeza -->
        <ellipse cx="-8" cy="-5" rx="5" ry="4"
                 fill="#ffd866" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Cuernos -->
        <path d="M-11,-8 Q-13,-12 -10,-11" stroke="#3a261a" stroke-width="0.8" fill="none"/>
        <path d="M-6,-8 Q-4,-12 -7,-11" stroke="#3a261a" stroke-width="0.8" fill="none"/>
        <!-- Patas -->
        <line x1="-4" y1="3" x2="-4" y2="8" stroke="#ffd866" stroke-width="1.5"/>
        <line x1="4" y1="3" x2="4" y2="8" stroke="#ffd866" stroke-width="1.5"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // elias-y-baal — CUMBRE
  // ──────────────────────────────────────────────────────────────────────────
  'elias-y-baal': [
    {
      id: 'altar-yahve',
      name: 'Altar de Yahvé reparado por Elías',
      offset: [-14, 4],
      svg: `
        <!-- Doce piedras del altar -->
        <rect x="-14" y="-4" width="28" height="8"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <!-- Juntas entre piedras -->
        <line x1="-7" y1="-4" x2="-7" y2="4" stroke="#3a261a" stroke-width="0.4"/>
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#3a261a" stroke-width="0.4"/>
        <line x1="7" y1="-4" x2="7" y2="4" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Holocausto con leña -->
        <rect x="-10" y="-10" width="20" height="6"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4" rx="0.3" opacity="0.7"/>
        <!-- Llamas del fuego del cielo -->
        <ellipse cx="0" cy="-16" rx="10" ry="8" fill="#ff8844" opacity="0.8"/>
        <ellipse cx="0" cy="-20" rx="7" ry="6" fill="#ffd866" opacity="0.85"/>
        <ellipse cx="0" cy="-23" rx="4" ry="4" fill="#ffffff" opacity="0.6"/>
        <!-- Zanja con agua -->
        <rect x="-14" y="4" width="28" height="4"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.4" rx="0.3" opacity="0.5"/>
      `,
    },
    {
      id: 'altar-baal-carmelo',
      name: 'Altar de Baal en el Carmelo',
      offset: [16, 4],
      svg: `
        <!-- Altar de Baal -->
        <rect x="-10" y="-2" width="20" height="8"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" rx="0.5"/>
        <!-- Imagen de Baal encima -->
        <ellipse cx="0" cy="-8" rx="6" ry="8"
                 fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.5" opacity="0.7"/>
        <!-- Cuernos de toro — Baal señor de la lluvia -->
        <path d="M-6,-10 Q-9,-14 -7,-12" stroke="#3a261a" stroke-width="1" fill="none"/>
        <path d="M6,-10 Q9,-14 7,-12" stroke="#3a261a" stroke-width="1" fill="none"/>
        <!-- Sin fuego — altar vacío y frío -->
        <rect x="-8" y="-2" width="16" height="4"
              fill="var(--era-text)" opacity="0.15" rx="0.3"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // ascenso-elias — CUMBRE
  // ──────────────────────────────────────────────────────────────────────────
  'ascenso-elias': [
    {
      id: 'manto-elias',
      name: 'Manto de Elías',
      offset: [12, 6],
      svg: `
        <!-- Manto cayendo como ola desde el cielo -->
        <path d="M-8,-14 Q-4,-10 0,-12 Q4,-10 8,-14 L8,4 Q4,8 0,6 Q-4,8 -8,4 Z"
              fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- Franjas del manto -->
        <line x1="-8" y1="-6" x2="8" y2="-6" stroke="var(--era-accent)" stroke-width="0.6" opacity="0.6"/>
        <line x1="-8" y1="0" x2="8" y2="0" stroke="var(--era-accent)" stroke-width="0.6" opacity="0.6"/>
      `,
    },
    {
      id: 'carro-fuego',
      name: 'Carro de fuego de Elías',
      offset: [0, -18],
      svg: `
        <!-- Carro / ruedas de fuego -->
        <!-- Ruedas -->
        <circle cx="-10" cy="4" r="5" fill="none" stroke="#ff8844" stroke-width="1.5"/>
        <circle cx="10" cy="4" r="5" fill="none" stroke="#ff8844" stroke-width="1.5"/>
        <!-- Radios -->
        <line x1="-10" y1="-1" x2="-10" y2="9" stroke="#ffd866" stroke-width="0.8"/>
        <line x1="-15" y1="4" x2="-5" y2="4" stroke="#ffd866" stroke-width="0.8"/>
        <line x1="10" y1="-1" x2="10" y2="9" stroke="#ffd866" stroke-width="0.8"/>
        <line x1="5" y1="4" x2="15" y2="4" stroke="#ffd866" stroke-width="0.8"/>
        <!-- Plataforma del carro -->
        <rect x="-12" y="-4" width="24" height="8"
              fill="#ff8844" stroke="#ffd866" stroke-width="0.6" rx="1" opacity="0.7"/>
        <!-- Llamas propulsoras abajo -->
        <ellipse cx="-5" cy="9" rx="2.5" ry="4" fill="#ffd866" opacity="0.8"/>
        <ellipse cx="5" cy="9" rx="2.5" ry="4" fill="#ffd866" opacity="0.8"/>
        <ellipse cx="0" cy="9" rx="3" ry="5" fill="#ff8844" opacity="0.9"/>
        <!-- Halo de gloria -->
        <ellipse cx="0" cy="0" rx="16" ry="8"
                 fill="#ffd866" opacity="0.12" stroke="#ffd866" stroke-width="0.3"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // exilio-babilonico — CUMBRE
  // ──────────────────────────────────────────────────────────────────────────
  'exilio-babilonico': [
    {
      id: 'templo-ruinas',
      name: 'Ruinas del Templo de Salomón',
      offset: [0, -6],
      svg: `
        <!-- Base en ruinas -->
        <rect x="-18" y="0" width="36" height="5"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" opacity="0.7"/>
        <!-- Muro parcialmente en pie -->
        <rect x="-16" y="-12" width="12" height="12"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" opacity="0.8"/>
        <!-- Grieta en el muro -->
        <path d="M-10,-12 L-9,-6 L-11,-2 L-9,0" stroke="#3a261a" stroke-width="0.8" fill="none"/>
        <!-- Escombros caídos -->
        <rect x="0" y="-6" width="8" height="4"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"
              transform="rotate(30,4,-4)" opacity="0.7"/>
        <rect x="6" y="-2" width="10" height="3"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"
              transform="rotate(-15,11,-1)" opacity="0.6"/>
        <!-- Columna Jaquín — semiintacta -->
        <rect x="-2" y="-20" width="4" height="20"
              fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.4" opacity="0.5"/>
        <!-- Humo sobre las ruinas -->
        <ellipse cx="-8" cy="-20" rx="6" ry="4" fill="var(--era-text)" opacity="0.25"/>
        <ellipse cx="5" cy="-16" rx="5" ry="3" fill="var(--era-text)" opacity="0.2"/>
        <ellipse cx="-3" cy="-24" rx="4" ry="3" fill="var(--era-text)" opacity="0.15"/>
      `,
    },
    {
      id: 'arpa-colgada',
      name: 'Arpas colgadas en los sauces',
      offset: [20, -8],
      svg: `
        <!-- Sauce llorón -->
        <line x1="0" y1="0" x2="0" y2="-20" stroke="var(--era-secondary)" stroke-width="1.5"/>
        <!-- Ramas lloronas -->
        <path d="M0,-18 Q6,-12 4,-4" stroke="var(--era-primary)" stroke-width="0.8" fill="none"/>
        <path d="M0,-16 Q8,-10 6,-2" stroke="var(--era-primary)" stroke-width="0.8" fill="none"/>
        <path d="M0,-18 Q-6,-12 -4,-4" stroke="var(--era-primary)" stroke-width="0.8" fill="none"/>
        <!-- Arpa colgada -->
        <path d="M3,-14 Q3,-8 6,-4" fill="none" stroke="var(--era-accent)" stroke-width="1.2"/>
        <path d="M3,-14 Q8,-14 6,-4" fill="none" stroke="var(--era-accent)" stroke-width="0.8"/>
        <!-- Cuerdas del arpa (silenciadas) -->
        <line x1="4" y1="-11" x2="5.5" y2="-7" stroke="#ffd866" stroke-width="0.4" opacity="0.5"/>
        <line x1="4.5" y1="-9" x2="5.8" y2="-5" stroke="#ffd866" stroke-width="0.4" opacity="0.5"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // daniel-en-babilonia
  // ──────────────────────────────────────────────────────────────────────────
  'daniel-en-babilonia': [
    {
      id: 'foso-leones',
      name: 'Foso de los leones',
      offset: [14, 6],
      svg: `
        <!-- Borde del foso -->
        <ellipse cx="0" cy="0" rx="14" ry="8"
                 fill="#1a0f08" stroke="var(--era-secondary)" stroke-width="0.7"/>
        <!-- Reja de piedra -->
        <line x1="-12" y1="0" x2="12" y2="0" stroke="var(--era-secondary)" stroke-width="0.6"/>
        <line x1="-8" y1="-6" x2="-8" y2="6" stroke="var(--era-secondary)" stroke-width="0.6"/>
        <line x1="0" y1="-7" x2="0" y2="7" stroke="var(--era-secondary)" stroke-width="0.6"/>
        <line x1="8" y1="-6" x2="8" y2="6" stroke="var(--era-secondary)" stroke-width="0.6"/>
        <!-- Ojos de leones brillando en la oscuridad -->
        <circle cx="-4" cy="-2" r="1.2" fill="var(--era-accent)" opacity="0.8"/>
        <circle cx="-2" cy="-2" r="1.2" fill="var(--era-accent)" opacity="0.8"/>
        <circle cx="3" cy="2" r="1.2" fill="var(--era-accent)" opacity="0.7"/>
        <circle cx="5" cy="2" r="1.2" fill="var(--era-accent)" opacity="0.7"/>
        <!-- Piedra de cierre -->
        <ellipse cx="0" cy="-9" rx="7" ry="2.5"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
      `,
    },
    {
      id: 'horno-ardiente',
      name: 'Horno ardiente de Nabucodonosor',
      offset: [-14, 2],
      svg: `
        <!-- Cuerpo del horno — horno de cal babilónico -->
        <rect x="-10" y="-14" width="20" height="18"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.7" rx="1"/>
        <!-- Abertura inferior del horno -->
        <path d="M-7,-14 Q0,-18 7,-14" fill="#ff8844" stroke="#ffd866" stroke-width="0.4"/>
        <!-- Llamas visibles -->
        <ellipse cx="0" cy="-18" rx="8" ry="6" fill="#ff8844" opacity="0.85"/>
        <ellipse cx="-3" cy="-21" rx="4" ry="4" fill="#ffd866" opacity="0.9"/>
        <ellipse cx="3" cy="-20" rx="4" ry="4" fill="#ffd866" opacity="0.85"/>
        <!-- Halo de la cuarta figura dentro del horno -->
        <ellipse cx="0" cy="-16" rx="5" ry="4"
                 fill="#ffd866" opacity="0.2" stroke="#ffd866" stroke-width="0.4"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // regreso-del-exilio
  // ──────────────────────────────────────────────────────────────────────────
  'regreso-del-exilio': [
    {
      id: 'cilindro-ciro',
      name: 'Cilindro de Ciro',
      offset: [-14, 4],
      svg: `
        <!-- Cilindro babilónico de arcilla con inscripción cuneiforme -->
        <ellipse cx="0" cy="-10" rx="7" ry="3"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="-7" y="-10" width="14" height="16"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <ellipse cx="0" cy="6" rx="7" ry="3"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- Marcas cuneiformes -->
        <line x1="-5" y1="-6" x2="5" y2="-6" stroke="#3a261a" stroke-width="0.4" opacity="0.5"/>
        <line x1="-5" y1="-3" x2="5" y2="-3" stroke="#3a261a" stroke-width="0.4" opacity="0.5"/>
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#3a261a" stroke-width="0.4" opacity="0.5"/>
        <line x1="-5" y1="3" x2="5" y2="3" stroke="#3a261a" stroke-width="0.4" opacity="0.5"/>
        <!-- Sello real de Ciro -->
        <circle cx="0" cy="6" r="3" fill="var(--era-accent)" opacity="0.6"/>
      `,
    },
    {
      id: 'altar-segundo-templo',
      name: 'Altar del Segundo Templo',
      offset: [14, 2],
      svg: `
        <!-- Altar reconstituido de piedra sin tallar -->
        <rect x="-12" y="-4" width="24" height="8"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <!-- Cuernos del altar — cuatro esquinas -->
        <rect x="-14" y="-8" width="4" height="4"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4" rx="0.3"/>
        <rect x="10" y="-8" width="4" height="4"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4" rx="0.3"/>
        <!-- Fuego restaurado -->
        <ellipse cx="0" cy="-10" rx="7" ry="5" fill="#ff8844" opacity="0.75"/>
        <ellipse cx="0" cy="-13" rx="5" ry="4" fill="#ffd866" opacity="0.8"/>
      `,
    },
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // profetas-mayores
  // ──────────────────────────────────────────────────────────────────────────
  'profetas-mayores': [
    {
      id: 'rollo-profetico',
      name: 'Rollo de profecía',
      offset: [0, -12],
      svg: `
        <!-- Rollo de pergamino parcialmente abierto -->
        <rect x="-12" y="-6" width="24" height="14"
              fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6" rx="0.5"/>
        <ellipse cx="-12" cy="1" rx="2.5" ry="8" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <ellipse cx="12" cy="1" rx="2.5" ry="8" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Texto profético -->
        <line x1="-9" y1="-3" x2="9" y2="-3" stroke="#3a261a" stroke-width="0.4" opacity="0.55"/>
        <line x1="-9" y1="0" x2="9" y2="0" stroke="#3a261a" stroke-width="0.4" opacity="0.55"/>
        <line x1="-9" y1="3" x2="7" y2="3" stroke="#3a261a" stroke-width="0.4" opacity="0.55"/>
        <line x1="-9" y1="6" x2="5" y2="6" stroke="#3a261a" stroke-width="0.4" opacity="0.4"/>
        <!-- Sello de cera -->
        <circle cx="9" cy="7" r="2.5" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.4"/>
      `,
    },
  ],
};

export default SCENE_OBJECTS;
