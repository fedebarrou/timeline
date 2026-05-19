import type { SceneObject } from './types';

/** Scene-objects for the REVELACIÓN era (vida del Profeta).
 *
 *  REGLA #4 — permanent figurative objects.
 *  REGLA #1 — for every id, the matching cue should use fx:animate-scene-object.
 *
 *  Ids estables:
 *    'cueva-hira', 'kaaba', 'media-luna-creciente', 'monte-uhud',
 *    'espadas-cruzadas', 'camello-hegira', 'mihrab', 'palmera-medina',
 *    'foso-khandaq', 'estrella-ocho-puntas'.
 */

const SCENE_OBJECTS: Record<string, SceneObject[]> = {
  // ─── NACIMIENTO DE MAHOMA ──────────────────────────────────────────────────
  'nacimiento-mahoma': [
    {
      id: 'estrella-ocho-puntas',
      name: 'Estrella islámica de 8 puntas',
      offset: [0, -20],
      svg: `
        <!-- dos cuadrados rotados formando estrella -->
        <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="#ffd866" stroke-width="0.7"/>
        <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="#ffd866" stroke-width="0.7" transform="rotate(45)"/>
        <!-- núcleo dorado -->
        <circle cx="0" cy="0" r="2" fill="#ffd866" opacity="0.95">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
        </circle>
      `,
    },
  ],

  // ─── INFANCIA CON HALIMA ───────────────────────────────────────────────────
  'infancia-amina-y-halima': [
    {
      id: 'tienda-beduina',
      name: 'Tienda beduina del desierto',
      offset: [8, 4],
      svg: `
        <!-- tienda triangular de lana negra -->
        <polygon points="-10,4 0,-8 10,4" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- entrada -->
        <path d="M -3 4 L 0 -4 L 3 4 Z" fill="#1a0f08"/>
        <!-- estaca lateral -->
        <line x1="-10" y1="4" x2="-12" y2="6" stroke="var(--era-secondary)" stroke-width="0.5"/>
        <line x1="10" y1="4" x2="12" y2="6" stroke="var(--era-secondary)" stroke-width="0.5"/>
      `,
    },
  ],

  // ─── REVELACIÓN EN HIRA ────────────────────────────────────────────────────
  'revelacion-en-hira': [
    {
      id: 'cueva-hira',
      name: 'Cueva del Monte Hira',
      offset: [0, 0],
      svg: `
        <!-- silueta del monte -->
        <polygon points="-18,10 -6,-10 6,-12 18,8" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- boca de la cueva oscura -->
        <ellipse cx="0" cy="0" rx="4" ry="6" fill="#1a0f08"/>
        <!-- luz dorada saliendo de la cueva -->
        <ellipse cx="0" cy="0" rx="2.5" ry="4" fill="#ffd866" opacity="0.7">
          <animate attributeName="opacity" values="0.5;0.95;0.5" dur="2.6s" repeatCount="indefinite"/>
        </ellipse>
      `,
    },
  ],

  // ─── VIAJE NOCTURNO Y MI'RAJ ───────────────────────────────────────────────
  'viaje-nocturno-mi-raj': [
    {
      id: 'media-luna-creciente',
      name: 'Luna creciente y estrella',
      offset: [-12, -18],
      svg: `
        <!-- luna creciente (símbolo islámico) -->
        <path d="M 0 0 A 8 8 0 1 0 0 -0.1 A 5 5 0 1 1 0 0 Z"
              fill="#ffd866" opacity="0.92"/>
        <!-- estrella pequeña -->
        <polygon points="6,-2 7,0 9,0.5 7,1 6,3 5,1 3,0.5 5,0"
                 fill="#ffd866" opacity="0.9"/>
      `,
    },
  ],

  // ─── HÉGIRA — caravana a Medina ────────────────────────────────────────────
  'hegira-migracion-a-medina': [
    {
      id: 'camello-hegira',
      name: 'Camello de la Hégira',
      offset: [4, 4],
      svg: `
        <!-- cuerpo -->
        <ellipse cx="0" cy="0" rx="9" ry="3.5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- joroba -->
        <path d="M -2 -2 Q 0 -7 2 -2 Z" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- cuello y cabeza -->
        <path d="M 8 -1 L 12 -6 L 13.5 -7 L 14 -5 L 12.5 -4 L 11 -1 Z"
              fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- patas -->
        <line x1="-6" y1="3" x2="-6" y2="8" stroke="#3a261a" stroke-width="0.8"/>
        <line x1="-3" y1="3" x2="-3" y2="8" stroke="#3a261a" stroke-width="0.8"/>
        <line x1="4"  y1="3" x2="4"  y2="8" stroke="#3a261a" stroke-width="0.8"/>
        <line x1="7"  y1="3" x2="7"  y2="8" stroke="#3a261a" stroke-width="0.8"/>
      `,
    },
  ],

  // ─── FUNDACIÓN DE LA COMUNIDAD DE MEDINA ───────────────────────────────────
  'fundacion-comunidad-medina': [
    {
      id: 'palmera-medina',
      name: 'Palmera del oasis',
      offset: [-10, 2],
      svg: `
        <!-- tronco -->
        <line x1="0" y1="8" x2="0" y2="-6" stroke="var(--era-secondary)" stroke-width="1.6"/>
        <!-- segmentos del tronco -->
        <line x1="-1.5" y1="5"  x2="1.5" y2="5"  stroke="#3a261a" stroke-width="0.3"/>
        <line x1="-1.5" y1="2"  x2="1.5" y2="2"  stroke="#3a261a" stroke-width="0.3"/>
        <line x1="-1.5" y1="-1" x2="1.5" y2="-1" stroke="#3a261a" stroke-width="0.3"/>
        <!-- hojas radiales -->
        <path d="M 0 -6 Q -8 -10 -12 -8" fill="none" stroke="var(--era-accent)" stroke-width="1"/>
        <path d="M 0 -6 Q 8 -10 12 -8"  fill="none" stroke="var(--era-accent)" stroke-width="1"/>
        <path d="M 0 -6 Q -6 -13 -8 -14" fill="none" stroke="var(--era-accent)" stroke-width="1"/>
        <path d="M 0 -6 Q 6 -13 8 -14"  fill="none" stroke="var(--era-accent)" stroke-width="1"/>
        <path d="M 0 -6 Q 0 -14 -2 -16" fill="none" stroke="var(--era-accent)" stroke-width="1"/>
        <path d="M 0 -6 Q 0 -14 2 -16"  fill="none" stroke="var(--era-accent)" stroke-width="1"/>
        <!-- dátiles -->
        <circle cx="-1" cy="-5" r="0.5" fill="#a01010" opacity="0.8"/>
        <circle cx="1"  cy="-5" r="0.5" fill="#a01010" opacity="0.8"/>
      `,
    },
  ],

  // ─── BATALLA DE BADR ───────────────────────────────────────────────────────
  'batalla-de-badr': [
    {
      id: 'espadas-cruzadas',
      name: 'Espadas cruzadas (Badr)',
      offset: [4, -2],
      svg: `
        <!-- espada 1 -->
        <line x1="-7" y1="6" x2="7" y2="-8" stroke="var(--era-surface)" stroke-width="1.4"/>
        <line x1="-7" y1="6" x2="-9" y2="8" stroke="var(--era-accent)" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="-8" y1="5" x2="-6" y2="3" stroke="var(--era-primary)" stroke-width="0.8"/>
        <!-- espada 2 -->
        <line x1="7" y1="6" x2="-7" y2="-8" stroke="var(--era-surface)" stroke-width="1.4"/>
        <line x1="7" y1="6" x2="9" y2="8" stroke="var(--era-accent)" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="6" y1="5" x2="8" y2="3" stroke="var(--era-primary)" stroke-width="0.8"/>
      `,
    },
  ],

  // ─── BATALLA DE UHUD ───────────────────────────────────────────────────────
  'batalla-de-uhud': [
    {
      id: 'monte-uhud',
      name: 'Monte Uhud',
      offset: [0, 4],
      svg: `
        <!-- silueta del monte rojo característico de Uhud -->
        <polygon points="-16,8 -8,-6 -2,-10 4,-8 12,-4 18,8"
                 fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6"/>
        <!-- contraste de luz -->
        <polygon points="-2,-10 4,-8 12,-4 0,-4"
                 fill="var(--era-accent)" opacity="0.55"/>
      `,
    },
  ],

  // ─── BATALLA DEL FOSO ──────────────────────────────────────────────────────
  'batalla-del-foso': [
    {
      id: 'foso-khandaq',
      name: 'Foso de Khandaq',
      offset: [0, 6],
      svg: `
        <!-- foso en V -->
        <path d="M -14 -2 L 0 8 L 14 -2 L 14 0 L 0 10 L -14 0 Z"
              fill="#1a0f08" stroke="#3a261a" stroke-width="0.5"/>
        <!-- pala de excavación clavada al lado -->
        <line x1="-12" y1="-2" x2="-14" y2="-8" stroke="var(--era-secondary)" stroke-width="0.8"/>
        <path d="M -14 -8 L -12.5 -10 L -15.5 -10 Z" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.3"/>
      `,
    },
  ],

  // ─── CONQUISTA DE LA MECA ──────────────────────────────────────────────────
  'conquista-de-meca': [
    {
      id: 'kaaba',
      name: 'La Kaaba',
      offset: [0, 0],
      svg: `
        <!-- cuboide negro central -->
        <rect x="-7" y="-9" width="14" height="14" fill="#1a0f08" stroke="#3a261a" stroke-width="0.7"/>
        <!-- bandas doradas (kiswa) -->
        <line x1="-7" y1="-5" x2="7" y2="-5" stroke="#ffd866" stroke-width="0.6"/>
        <line x1="-7" y1="-3" x2="7" y2="-3" stroke="#ffd866" stroke-width="0.4"/>
        <!-- puerta dorada -->
        <rect x="-1.5" y="-2" width="3" height="6" fill="var(--era-accent)" stroke="#ffd866" stroke-width="0.4"/>
        <!-- techo -->
        <line x1="-7" y1="-9" x2="7" y2="-9" stroke="#ffd866" stroke-width="0.8"/>
        <!-- halo del santuario -->
        <ellipse cx="0" cy="-2" rx="14" ry="3" fill="#ffd866" opacity="0.15">
          <animate attributeName="opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite"/>
        </ellipse>
      `,
    },
  ],

  // ─── PEREGRINACIÓN DE DESPEDIDA (reusa la Kaaba) ───────────────────────────
  'peregrinacion-de-despedida': [
    {
      id: 'kaaba',
      name: 'La Kaaba (Hajj)',
      offset: [0, 0],
      svg: `
        <rect x="-7" y="-9" width="14" height="14" fill="#1a0f08" stroke="#3a261a" stroke-width="0.7"/>
        <line x1="-7" y1="-5" x2="7" y2="-5" stroke="#ffd866" stroke-width="0.6"/>
        <line x1="-7" y1="-3" x2="7" y2="-3" stroke="#ffd866" stroke-width="0.4"/>
        <rect x="-1.5" y="-2" width="3" height="6" fill="var(--era-accent)" stroke="#ffd866" stroke-width="0.4"/>
        <line x1="-7" y1="-9" x2="7" y2="-9" stroke="#ffd866" stroke-width="0.8"/>
        <ellipse cx="0" cy="-2" rx="14" ry="3" fill="#ffd866" opacity="0.18">
          <animate attributeName="opacity" values="0.12;0.3;0.12" dur="3.5s" repeatCount="indefinite"/>
        </ellipse>
      `,
    },
  ],
};

export default SCENE_OBJECTS;
