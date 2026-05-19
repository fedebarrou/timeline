import { gsap } from '../scrollytelling';
import type { SceneObject } from './types';

/**
 * Scene-objects for the PRIMORDIAL era.
 *
 * Migrated from the legacy monolith `mapSceneObjects.ts` during Phase 0.
 * Each entry now carries a stable `id` so cues can target it with
 * `fx:animate-scene-object` (REGLA #1, see STYLE_GUIDE_ANIMACIONES.md).
 *
 * Color palette: var(--era-*) only, plus the universal exceptions
 * (fire #ff8844, blood #a01010, divine gold #ffd866, dark ink #1a0f08).
 */
const SCENE_OBJECTS: Record<string, SceneObject[]> = {
  'expulsion-eden': [
    {
      id: 'arbol-del-conocimiento',
      name: 'Árbol del conocimiento',
      offset: [-30, -10],
      svg: `
        <!-- Trunk -->
        <path d="M 0 10 L 0 -4" stroke="var(--era-secondary)" stroke-width="1.6" stroke-linecap="round" fill="none" />
        <!-- Roots hint -->
        <path d="M -3 11 L 0 9 L 3 11" stroke="var(--era-secondary)" stroke-width="0.6" fill="none" />
        <!-- Branches reaching outward -->
        <path d="M 0 -4 Q -4 -7 -7 -10 M 0 -4 Q 4 -7 7 -10 M 0 -4 Q -2 -10 -1 -14 M 0 -4 Q 2 -10 1 -14"
              stroke="var(--era-secondary)" stroke-width="0.8" fill="none" stroke-linecap="round" />
        <!-- Leafy crown — overlapping organic shapes -->
        <ellipse cx="-5" cy="-11" rx="5" ry="4" fill="var(--era-primary)" opacity="0.35" />
        <ellipse cx="5" cy="-11" rx="5" ry="4" fill="var(--era-primary)" opacity="0.35" />
        <ellipse cx="0" cy="-14" rx="4.5" ry="3.5" fill="var(--era-primary)" opacity="0.45" />
        <ellipse cx="-2" cy="-9" rx="3.5" ry="3" fill="var(--era-accent)" opacity="0.3" />
        <ellipse cx="3" cy="-9" rx="3.5" ry="3" fill="var(--era-accent)" opacity="0.3" />
        <!-- Forbidden fruit (red apple with stem) -->
        <circle cx="2" cy="-8" r="1.4" fill="#a01010" stroke="#7a1f15" stroke-width="0.3" />
        <path d="M 2 -9.3 L 2 -10" stroke="var(--era-secondary)" stroke-width="0.3" />
        <!-- Subtle inner highlight on fruit -->
        <circle cx="1.6" cy="-8.3" r="0.4" fill="#ff8844" opacity="0.7" />
      `,
    },
    {
      id: 'espada-flameante',
      name: 'Espada flameante',
      offset: [-20, -28],
      svg: `
        <!-- Sword blade -->
        <path d="M 0 8 L 0 -10 L -2 -12 L 0 -14 L 2 -12 L 0 -10" stroke="var(--era-accent)" stroke-width="0.7" fill="var(--era-surface)" />
        <!-- Cross guard -->
        <path d="M -4 -8 L 4 -8" stroke="var(--era-primary)" stroke-width="1" stroke-linecap="round" />
        <!-- Hilt grip -->
        <rect x="-1" y="6" width="2" height="4" fill="var(--era-secondary)" stroke="var(--era-primary)" stroke-width="0.3" />
        <!-- Pommel -->
        <circle cx="0" cy="10" r="1.2" fill="var(--era-accent)" stroke="var(--era-primary)" stroke-width="0.3" />
        <!-- Flame around the blade -->
        <path d="M -3 -8 Q -1 -13 0 -16 Q 1 -13 3 -8 Q 1 -6 0 -7 Q -1 -6 -3 -8 Z"
              fill="#ff8844" opacity="0.55">
          <animate attributeName="opacity" values="0.4;0.85;0.4" dur="1.3s" repeatCount="indefinite" />
        </path>
        <!-- Inner flame -->
        <path d="M -1.5 -9 Q 0 -13 1.5 -9 Q 0 -8 -1.5 -9 Z" fill="#ffd866" opacity="0.7">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="0.9s" repeatCount="indefinite" />
        </path>
      `,
      animate: (el) => {
        gsap.to(el, { opacity: 0.9, duration: 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut', startAt: { opacity: 0.5 } });
      },
    },
  ],

  'cain-mata-abel': [
    {
      id: 'altar-primera-ofrenda',
      name: 'Altar (primera ofrenda)',
      offset: [22, -5],
      svg: `
        <!-- Altar base (stones layered) -->
        <rect x="-6" y="3" width="12" height="3" fill="var(--era-secondary)" stroke="var(--era-primary)" stroke-width="0.4" />
        <rect x="-5" y="0" width="10" height="3" fill="var(--era-secondary)" stroke="var(--era-primary)" stroke-width="0.4" />
        <rect x="-4" y="-3" width="8" height="3" fill="var(--era-secondary)" stroke="var(--era-primary)" stroke-width="0.4" />
        <!-- Mortar lines -->
        <line x1="-3" y1="3" x2="-3" y2="6" stroke="var(--era-primary)" stroke-width="0.2" opacity="0.5" />
        <line x1="3" y1="3" x2="3" y2="6" stroke="var(--era-primary)" stroke-width="0.2" opacity="0.5" />
        <!-- Sacrificial fire on top -->
        <path d="M -2 -4 Q -1 -7 0 -4 Q 1 -7 2 -4 Z" fill="#ff8844" opacity="0.7">
          <animate attributeName="d"
                   values="M -2 -4 Q -1 -7 0 -4 Q 1 -7 2 -4 Z;
                           M -2 -4 Q -1 -8 0 -4 Q 1 -8 2 -4 Z;
                           M -2 -4 Q -1 -7 0 -4 Q 1 -7 2 -4 Z"
                   dur="1.2s" repeatCount="indefinite" />
        </path>
        <path d="M -1 -5 Q 0 -7 1 -5 Z" fill="#ffd866" opacity="0.85" />
        <!-- Smoke rising -->
        <path d="M 0 -6 Q -2 -10 0 -14 Q 2 -18 0 -22"
              stroke="var(--era-text)" stroke-width="0.7" fill="none" opacity="0.5" stroke-linecap="round" />
        <path d="M -1 -8 Q 1 -12 -1 -16"
              stroke="var(--era-text)" stroke-width="0.5" fill="none" opacity="0.35" />
        <!-- Drop of blood beneath altar -->
        <path d="M -7 7 Q -7.5 8 -7 9 Q -6.5 8 -7 7 Z" fill="#a01010" />
        <circle cx="-7" cy="8.5" r="0.4" fill="#a01010" opacity="0.6" />
      `,
      animate: (el) => {
        const path = el.querySelector('path');
        if (path) gsap.to(path, { y: -3, opacity: 0.4, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      },
    },
  ],

  'orden-construir-arca': [
    {
      id: 'arca-en-construccion',
      name: 'El arca en construcción',
      offset: [18, -8],
      svg: `
        <!-- Hull base curve -->
        <path d="M -12 2 Q -10 -3 -8 -5 L 8 -5 Q 10 -3 12 2 Z"
              fill="none" stroke="var(--era-primary)" stroke-width="0.8" />
        <!-- Internal ribs (under construction) -->
        <line x1="-8" y1="-5" x2="-8" y2="2" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.7" />
        <line x1="-4" y1="-5" x2="-4" y2="2" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.7" />
        <line x1="0" y1="-5" x2="0" y2="2" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.7" />
        <line x1="4" y1="-5" x2="4" y2="2" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.7" />
        <line x1="8" y1="-5" x2="8" y2="2" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.7" />
        <!-- Top deck plank (partial) -->
        <line x1="-10" y1="-5" x2="2" y2="-5" stroke="var(--era-accent)" stroke-width="0.6" />
        <!-- Hammer / saw next to it -->
        <line x1="14" y1="-2" x2="15" y2="2" stroke="var(--era-secondary)" stroke-width="0.6" />
        <rect x="13.5" y="-3" width="2" height="1.5" fill="var(--era-secondary)" />
        <!-- Wood shavings on ground -->
        <path d="M -14 4 Q -13 3.5 -12 4 M 12 4 Q 13 3.5 14 4"
              stroke="var(--era-secondary)" stroke-width="0.3" fill="none" opacity="0.6" />
      `,
    },
  ],

  'diluvio': [
    {
      id: 'arca',
      name: 'El arca',
      offset: [18, -3],
      svg: `
        <!-- Water reflection underneath -->
        <ellipse cx="0" cy="3" rx="14" ry="1.2" fill="var(--era-accent)" opacity="0.2" />
        <!-- Hull (curved, more pronounced) -->
        <path d="M -13 0 Q -10 5 -3 5 L 3 5 Q 10 5 13 0 L 11 -3 L -11 -3 Z"
              fill="var(--era-secondary)" stroke="var(--era-primary)" stroke-width="0.7" />
        <!-- Hull planks -->
        <line x1="-12" y1="-1" x2="12" y2="-1" stroke="var(--era-primary)" stroke-width="0.3" opacity="0.5" />
        <line x1="-11" y1="-3" x2="11" y2="-3" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.6" />
        <!-- Cabin -->
        <rect x="-7" y="-9" width="14" height="6" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.6" />
        <!-- Cabin roof -->
        <path d="M -8 -9 L 0 -12 L 8 -9 Z" fill="var(--era-secondary)" stroke="var(--era-primary)" stroke-width="0.5" />
        <!-- Cabin windows -->
        <rect x="-5" y="-7" width="2" height="2" fill="var(--era-accent)" opacity="0.7" />
        <rect x="-1" y="-7" width="2" height="2" fill="var(--era-accent)" opacity="0.7" />
        <rect x="3" y="-7" width="2" height="2" fill="var(--era-accent)" opacity="0.7" />
        <!-- Dove on top (small) -->
        <path d="M 0 -13 L 1 -14 L 2 -13 L 1 -12.5 Z" fill="var(--era-text)" opacity="0.9" />
      `,
      animate: (el) => {
        gsap.to(el, { y: '+=1.2', duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      },
    },
    {
      id: 'lluvia-cuarenta-dias',
      name: 'Lluvia de 40 días',
      offset: [0, -25],
      svg: `
        <!-- 12 rain drops at various positions and angles -->
        <g stroke="var(--era-accent)" stroke-width="0.5" stroke-linecap="round">
          <line x1="-16" y1="-2" x2="-14" y2="3" />
          <line x1="-12" y1="-4" x2="-10" y2="1" />
          <line x1="-8" y1="0" x2="-6" y2="5" />
          <line x1="-4" y1="-3" x2="-2" y2="2" />
          <line x1="0" y1="-1" x2="2" y2="4" />
          <line x1="4" y1="-4" x2="6" y2="1" />
          <line x1="8" y1="-2" x2="10" y2="3" />
          <line x1="12" y1="0" x2="14" y2="5" />
          <line x1="16" y1="-3" x2="18" y2="2" />
          <line x1="-10" y1="-7" x2="-8" y2="-2" opacity="0.7" />
          <line x1="-2" y1="-8" x2="0" y2="-3" opacity="0.7" />
          <line x1="6" y1="-7" x2="8" y2="-2" opacity="0.7" />
        </g>
        <!-- Splash drops at bottom -->
        <circle cx="-10" cy="6" r="0.4" fill="var(--era-accent)" opacity="0.6" />
        <circle cx="-2" cy="6" r="0.4" fill="var(--era-accent)" opacity="0.6" />
        <circle cx="6" cy="6" r="0.4" fill="var(--era-accent)" opacity="0.6" />
        <circle cx="14" cy="6" r="0.4" fill="var(--era-accent)" opacity="0.6" />
      `,
      animate: (el) => {
        gsap.fromTo(el, { y: -3 }, { y: 6, duration: 0.8, repeat: -1, ease: 'none' });
      },
    },
  ],

  'alianza-arcoiris': [
    {
      id: 'arcoiris',
      name: 'Arcoíris — señal de la alianza',
      offset: [0, -20],
      svg: `
        <!-- Cloud anchor under -->
        <ellipse cx="-22" cy="3" rx="6" ry="2" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.3" opacity="0.6" />
        <ellipse cx="22" cy="3" rx="6" ry="2" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.3" opacity="0.6" />
        <!-- 7 rainbow arcs (universal palette — rainbow is the canonical icon) -->
        <path d="M -25 3 A 25 25 0 0 1 25 3" stroke="#a01010" stroke-width="1.6" fill="none" stroke-linecap="round" />
        <path d="M -23 3 A 23 23 0 0 1 23 3" stroke="#ff8844" stroke-width="1.6" fill="none" stroke-linecap="round" />
        <path d="M -21 3 A 21 21 0 0 1 21 3" stroke="#ffd866" stroke-width="1.6" fill="none" stroke-linecap="round" />
        <path d="M -19 3 A 19 19 0 0 1 19 3" stroke="var(--era-primary)" stroke-width="1.6" fill="none" stroke-linecap="round" />
        <path d="M -17 3 A 17 17 0 0 1 17 3" stroke="var(--era-secondary)" stroke-width="1.6" fill="none" stroke-linecap="round" />
        <path d="M -15 3 A 15 15 0 0 1 15 3" stroke="var(--era-accent)" stroke-width="1.6" fill="none" stroke-linecap="round" />
        <path d="M -13 3 A 13 13 0 0 1 13 3" stroke="var(--era-text)" stroke-width="1.6" fill="none" stroke-linecap="round" />
        <!-- Soft glow halo -->
        <path d="M -26 3 A 26 26 0 0 1 26 3" stroke="white" stroke-width="0.6" fill="none" opacity="0.25" />
      `,
    },
  ],

  'asuncion-enoc': [
    {
      id: 'asuncion-enoc-luz',
      name: 'Asunción de Enoc',
      offset: [0, -25],
      svg: `
        <!-- Three connected puffy clouds at bottom -->
        <ellipse cx="-7" cy="2" rx="4.5" ry="2.2" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.75" />
        <ellipse cx="0" cy="3" rx="5" ry="2.5" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.85" />
        <ellipse cx="7" cy="2" rx="4.5" ry="2.2" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.75" />
        <!-- Light beam up -->
        <path d="M -2 0 L -1.5 -14 L 1.5 -14 L 2 0 Z" fill="var(--era-accent)" opacity="0.35">
          <animate attributeName="opacity" values="0.2;0.55;0.2" dur="2.4s" repeatCount="indefinite" />
        </path>
        <!-- Inner intense ray -->
        <path d="M -0.6 -1 L -0.4 -14 L 0.4 -14 L 0.6 -1 Z" fill="#ffd866" opacity="0.6" />
        <!-- Sparkles -->
        <circle cx="-3" cy="-6" r="0.5" fill="#ffd866" opacity="0.7">
          <animate attributeName="cy" values="-3;-12;-3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="3" cy="-8" r="0.5" fill="#ffd866" opacity="0.7">
          <animate attributeName="cy" values="-2;-13;-2" dur="3.5s" repeatCount="indefinite" />
        </circle>
      `,
      animate: (el) => {
        gsap.to(el, { y: -4, opacity: 0.6, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      },
    },
  ],

  'nacimiento-adan-eva': [
    {
      id: 'aliento-de-vida',
      name: 'Aliento de vida',
      offset: [-22, -15],
      svg: `
        <!-- Sun disk -->
        <circle cx="0" cy="0" r="7" fill="var(--era-accent)" opacity="0.5">
          <animate attributeName="r" values="6.5;7.5;6.5" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="4" fill="#ffd866" opacity="0.85" />
        <!-- Sun rays (8 directions) -->
        <g stroke="var(--era-accent)" stroke-width="0.7" stroke-linecap="round">
          <line x1="-12" y1="0" x2="-9" y2="0" />
          <line x1="9" y1="0" x2="12" y2="0" />
          <line x1="0" y1="-12" x2="0" y2="-9" />
          <line x1="0" y1="9" x2="0" y2="12" />
          <line x1="-8.5" y1="-8.5" x2="-6.5" y2="-6.5" />
          <line x1="8.5" y1="-8.5" x2="6.5" y2="-6.5" />
          <line x1="-8.5" y1="8.5" x2="-6.5" y2="6.5" />
          <line x1="8.5" y1="8.5" x2="6.5" y2="6.5" />
        </g>
        <!-- Horizon line -->
        <line x1="-15" y1="8" x2="15" y2="8" stroke="var(--era-secondary)" stroke-width="0.5" opacity="0.6" />
        <!-- Small wave -->
        <path d="M -12 9 Q -8 8 -4 9 M 4 9 Q 8 8 12 9" stroke="var(--era-accent)" stroke-width="0.4" fill="none" opacity="0.5" />
      `,
      animate: (el) => {
        const c = el.querySelector('circle');
        if (c) gsap.to(c, { r: 7, opacity: 0.8, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      },
    },
  ],
};

export default SCENE_OBJECTS;
