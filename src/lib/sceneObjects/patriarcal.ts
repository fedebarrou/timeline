import type { SceneObject } from './types';

/** Scene-objects for the PATRIARCAL era.
 *  Paleta: var(--era-secondary) arena/ocre, var(--era-accent) ámbar/dorado,
 *  var(--era-surface) crema, var(--era-primary) tierra oscura.
 *  Excepciones universales permitidas: #ff8844 (fuego), #ffd866 (oro divino),
 *  #1a0f08 / #3a261a (contornos oscuros). */

const SCENE_OBJECTS: Record<string, SceneObject[]> = {

  // ────────────────────────────────────────────────────────────
  // LLAMADO DE ABRAHAM — caravana en marcha + altar de Siquem
  // ────────────────────────────────────────────────────────────
  'llamado-de-abraham': [
    {
      id: 'caravana-abraham',
      name: 'Caravana de Abraham',
      offset: [12, -4],
      svg: `
        <!-- Camello cargado rumbo a Canaán -->
        <ellipse cx="0" cy="0" rx="8" ry="4" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <ellipse cx="-2" cy="-7" rx="3" ry="4" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- joroba -->
        <ellipse cx="2" cy="-5" rx="2.5" ry="2" fill="var(--era-accent)"/>
        <!-- patas -->
        <line x1="-4" y1="3" x2="-4" y2="7" stroke="#3a261a" stroke-width="0.7"/>
        <line x1="-1" y1="3" x2="-1" y2="7" stroke="#3a261a" stroke-width="0.7"/>
        <line x1="2" y1="3" x2="2" y2="7" stroke="#3a261a" stroke-width="0.7"/>
        <line x1="5" y1="3" x2="5" y2="7" stroke="#3a261a" stroke-width="0.7"/>
        <!-- bultos de carga -->
        <rect x="-3" y="-4" width="5" height="3" rx="1" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.3"/>
      `,
    },
    {
      id: 'altar-siquem',
      name: 'Altar de Siquem',
      offset: [-10, 6],
      svg: `
        <!-- Altar de piedras apiladas -->
        <rect x="-6" y="-2" width="12" height="4" rx="1" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="-4" y="-5" width="8" height="3" rx="1" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- llama pequeña sobre el altar -->
        <ellipse cx="0" cy="-7" rx="2" ry="2.5" fill="#ff8844" opacity="0.85"/>
        <ellipse cx="0" cy="-8.5" rx="1" ry="1.5" fill="#ffd866" opacity="0.7"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // NACIMIENTO DE ABRAHAM — zigurat de Ur + ídolos de Taré
  // ────────────────────────────────────────────────────────────
  'nacimiento-abraham': [
    {
      id: 'zigurat-ur',
      name: 'Zigurat de Ur (Nanna)',
      offset: [15, 8],
      svg: `
        <!-- Zigurat escalonado de Ur -->
        <rect x="-10" y="0" width="20" height="5" rx="0.5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="-7"  y="-5" width="14" height="5" rx="0.5" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.4"/>
        <rect x="-4"  y="-9" width="8"  height="4" rx="0.5" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.3"/>
        <!-- estela en la cima -->
        <rect x="-1" y="-13" width="2" height="4" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.3"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // ABRAHAM ROMPE LOS ÍDOLOS — ídolos rotos + hacha
  // ────────────────────────────────────────────────────────────
  'abraham-rompe-idolos': [
    {
      id: 'idolos-rotos',
      name: 'Ídolos de Ur',
      offset: [8, 4],
      svg: `
        <!-- Ídolo central (entero) -->
        <rect x="-3" y="-8" width="6" height="8" rx="1" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <ellipse cx="0" cy="-9" rx="3" ry="2.5" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Fragmento roto 1 -->
        <polygon points="-8,-4 -5,-6 -4,-2 -9,-2" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- Fragmento roto 2 -->
        <polygon points="6,-3 9,-6 10,-1 7,0" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- hacha de Abraham -->
        <rect x="-1" y="1" width="1.5" height="6" fill="#3a261a"/>
        <polygon points="-3,-1 2,-1 0,3" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // PACTO DE ABRAHAM — antorcha de fuego + animales partidos
  // ────────────────────────────────────────────────────────────
  'pacto-de-abraham': [
    {
      id: 'antorcha-pacto',
      name: 'Antorcha del pacto',
      offset: [0, -10],
      svg: `
        <!-- horno humeante / antorcha de fuego del pacto -->
        <rect x="-2" y="2" width="4" height="6" rx="1" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- llama principal -->
        <ellipse cx="0" cy="-1" rx="3" ry="4" fill="#ff8844" opacity="0.9"/>
        <ellipse cx="0" cy="-3" rx="2" ry="3" fill="#ffd866" opacity="0.8"/>
        <!-- humo -->
        <ellipse cx="1" cy="-8" rx="1.5" ry="2" fill="var(--era-surface)" opacity="0.5"/>
        <ellipse cx="-1" cy="-11" rx="1.2" ry="1.8" fill="var(--era-surface)" opacity="0.3"/>
      `,
      animate: (el) => {
        // llama suave — en reposo, se anima con cue fx:animate-scene-object {kind:'burn'}
      },
    },
    {
      id: 'estrellas-promesa',
      name: 'Campo de estrellas (promesa)',
      offset: [0, -18],
      svg: `
        <!-- Constelación simbólica: estrellas de la promesa -->
        <circle cx="-8"  cy="0"  r="1.2" fill="#ffd866" opacity="0.9"/>
        <circle cx="-4"  cy="-4" r="0.9" fill="#ffd866" opacity="0.7"/>
        <circle cx="0"   cy="-2" r="1.4" fill="#ffd866" opacity="1"/>
        <circle cx="5"   cy="-5" r="0.9" fill="#ffd866" opacity="0.7"/>
        <circle cx="8"   cy="1"  r="1"   fill="#ffd866" opacity="0.8"/>
        <circle cx="3"   cy="3"  r="0.8" fill="#ffd866" opacity="0.6"/>
        <circle cx="-5"  cy="4"  r="1"   fill="#ffd866" opacity="0.7"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // NACIMIENTO DE ISMAEL — tienda del desierto + pozo de Zamzam
  // ────────────────────────────────────────────────────────────
  'nacimiento-ismael': [
    {
      id: 'tienda-desierto',
      name: 'Tienda patriarcal',
      offset: [-10, 4],
      svg: `
        <!-- Tienda beduína negra de cabra -->
        <polygon points="-12,4 0,-6 12,4" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="-12" y="2" width="24" height="4" rx="0" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- apertura de la tienda -->
        <polygon points="-3,6 0,-1 3,6" fill="var(--era-surface)" opacity="0.6"/>
        <!-- poste central -->
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#3a261a" stroke-width="0.6"/>
      `,
    },
    {
      id: 'pozo-zamzam',
      name: 'Pozo de Zamzam',
      offset: [14, 6],
      svg: `
        <!-- Pozo circular con brocal de piedra -->
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6"/>
        <ellipse cx="0" cy="-1" rx="4" ry="2" fill="#1a0f08" opacity="0.4"/>
        <!-- agua -->
        <ellipse cx="0" cy="-1" rx="3" ry="1.5" fill="var(--era-accent)" opacity="0.5"/>
        <!-- borde del brocal -->
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="none" stroke="var(--era-secondary)" stroke-width="1.2"/>
        <!-- cubo y cuerda -->
        <line x1="0" y1="-2" x2="0" y2="-9" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="-1.5" y="-12" width="3" height="3" rx="0.5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.3"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // NACIMIENTO DE ISAAC — tienda del nacimiento + vasija de leche
  // ────────────────────────────────────────────────────────────
  'nacimiento-isaac': [
    {
      id: 'tienda-isaac',
      name: 'Tienda del nacimiento de Isaac',
      offset: [-8, 4],
      svg: `
        <!-- Tienda festiva del nacimiento (más clara, uso ocre) -->
        <polygon points="-10,5 0,-7 10,5" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5" opacity="0.85"/>
        <rect x="-10" y="3" width="20" height="3.5" rx="0" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <polygon points="-2.5,6.5 0,-0.5 2.5,6.5" fill="var(--era-surface)" opacity="0.7"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // DESTRUCCIÓN DE SODOMA Y GOMORRA — ciudad ardiendo + columna de sal
  // ────────────────────────────────────────────────────────────
  'destruccion-sodoma-gomorra': [
    {
      id: 'ciudad-sodoma',
      name: 'Sodoma en llamas',
      offset: [0, 6],
      svg: `
        <!-- Ciudad amurallada destruida -->
        <rect x="-14" y="-2" width="28" height="8" rx="1" fill="var(--era-primary)" stroke="#1a0f08" stroke-width="0.6" opacity="0.8"/>
        <!-- Murallas rotas -->
        <polygon points="-14,-2 -10,-8 -7,-2" fill="var(--era-secondary)" stroke="#1a0f08" stroke-width="0.4"/>
        <polygon points="-5,-2 -2,-9 2,-2"   fill="var(--era-secondary)" stroke="#1a0f08" stroke-width="0.4"/>
        <polygon points="5,-2  8,-7  11,-2"   fill="var(--era-secondary)" stroke="#1a0f08" stroke-width="0.4"/>
        <!-- Llamas principales sobre la ciudad -->
        <ellipse cx="-8" cy="-9"  rx="4" ry="5" fill="#ff8844" opacity="0.9"/>
        <ellipse cx="-8" cy="-11" rx="2.5" ry="3.5" fill="#ffd866" opacity="0.7"/>
        <ellipse cx="4"  cy="-8"  rx="3.5" ry="4.5" fill="#ff8844" opacity="0.85"/>
        <ellipse cx="4"  cy="-10" rx="2" ry="3" fill="#ffd866" opacity="0.6"/>
        <ellipse cx="10" cy="-6"  rx="2.5" ry="3.5" fill="#ff8844" opacity="0.8"/>
      `,
    },
    {
      id: 'columna-sal',
      name: 'Estatua de sal (mujer de Lot)',
      offset: [-18, 2],
      svg: `
        <!-- Pilar de sal: silueta femenina petrificada -->
        <ellipse cx="0" cy="-10" rx="2.5" ry="2.5" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.5" opacity="0.9"/>
        <rect x="-2" y="-8" width="4" height="10" rx="1" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.4" opacity="0.9"/>
        <!-- cristales de sal incrustados -->
        <polygon points="0,-14 1,-11 -1,-11" fill="#ffd866" opacity="0.6"/>
        <polygon points="-3,-5 -4,-3 -2,-3" fill="#ffd866" opacity="0.5"/>
        <polygon points="3,-6 4,-4 2,-4" fill="#ffd866" opacity="0.5"/>
      `,
    },
    {
      id: 'lluvia-azufre',
      name: 'Lluvia de azufre',
      offset: [10, -14],
      svg: `
        <!-- Piedras ardientes cayendo del cielo -->
        <circle cx="-6"  cy="0"  r="2"   fill="#ff8844" opacity="0.85"/>
        <line   x1="-6"  y1="-2" x2="-8"  y2="-8"  stroke="#ffd866" stroke-width="0.8" opacity="0.7"/>
        <circle cx="0"   cy="4"  r="1.5" fill="#ff8844" opacity="0.8"/>
        <line   x1="0"   y1="3"  x2="-1"  y2="-4"  stroke="#ffd866" stroke-width="0.7" opacity="0.6"/>
        <circle cx="7"   cy="1"  r="2.2" fill="#ff8844" opacity="0.9"/>
        <line   x1="7"   y1="-1" x2="8"   y2="-8"  stroke="#ffd866" stroke-width="0.9" opacity="0.75"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // AKEDAH — altar con cuchillo + carnero + zarza ardiente
  // ────────────────────────────────────────────────────────────
  'akedah-sacrificio-isaac': [
    {
      id: 'altar-moriah',
      name: 'Altar del Monte Moriah',
      offset: [-6, 6],
      svg: `
        <!-- Altar de piedra apilada -->
        <rect x="-8" y="-2" width="16" height="5" rx="1" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6"/>
        <rect x="-6" y="-6" width="12" height="4" rx="1" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- leña apilada -->
        <line x1="-5" y1="-6" x2="5" y2="-6" stroke="#3a261a" stroke-width="1.2"/>
        <line x1="-5" y1="-7.5" x2="5" y2="-7.5" stroke="#3a261a" stroke-width="1"/>
        <!-- cuchillo sobre el altar -->
        <rect x="-0.5" y="-12" width="1.5" height="6" rx="0.4" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.4"/>
        <polygon points="-2,-12 2,-12 0.5,-15" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.3"/>
      `,
    },
    {
      id: 'carnero-zarza',
      name: 'Carnero trabado en el zarzal',
      offset: [12, 4],
      svg: `
        <!-- Carnero (la víctima sustituta) -->
        <ellipse cx="0"  cy="0"   rx="5"   ry="3"   fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.5"/>
        <ellipse cx="-3" cy="-4"  rx="2.5" ry="3"   fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- cuernos enredados en zarza -->
        <path d="M-5,-5 Q-9,-9 -6,-11" fill="none" stroke="#3a261a" stroke-width="0.8"/>
        <path d="M-1,-5 Q-2,-9  1,-10" fill="none" stroke="#3a261a" stroke-width="0.7"/>
        <!-- patas -->
        <line x1="-3" y1="2" x2="-3" y2="6" stroke="#3a261a" stroke-width="0.7"/>
        <line x1="-1" y1="2" x2="-1" y2="6" stroke="#3a261a" stroke-width="0.7"/>
        <line x1="2"  y1="2" x2="2"  y2="6" stroke="#3a261a" stroke-width="0.7"/>
        <line x1="4"  y1="2" x2="4"  y2="6" stroke="#3a261a" stroke-width="0.7"/>
        <!-- zarza espinosa -->
        <circle cx="-8" cy="-9" r="3" fill="none" stroke="#3a261a" stroke-width="0.6" stroke-dasharray="1.5,0.5"/>
        <line x1="-8" y1="-9" x2="-11" y2="-12" stroke="#3a261a" stroke-width="0.5"/>
        <line x1="-8" y1="-9" x2="-5" y2="-13" stroke="#3a261a" stroke-width="0.5"/>
      `,
    },
    {
      id: 'monte-moriah',
      name: 'Monte Moriah',
      offset: [0, -8],
      svg: `
        <!-- Perfil del monte con halo divino -->
        <polygon points="-16,6 0,-12 16,6" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5" opacity="0.75"/>
        <!-- halo dorado en la cima -->
        <circle cx="0" cy="-12" r="4" fill="#ffd866" opacity="0.35"/>
        <circle cx="0" cy="-12" r="2.5" fill="#ffd866" opacity="0.55"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // NACIMIENTO DE JACOB Y ESAÚ — tienda del parto con cunas
  // ────────────────────────────────────────────────────────────
  'nacimiento-jacob-esau': [
    {
      id: 'tienda-parto',
      name: 'Tienda del parto (mellizos)',
      offset: [-4, 4],
      svg: `
        <!-- Tienda oscura del parto -->
        <polygon points="-11,4 0,-6 11,4" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="-11" y="2" width="22" height="4" rx="0" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- dos bultos de bebés -->
        <ellipse cx="-3" cy="5" rx="2" ry="1.5" fill="#ffd866" opacity="0.8"/>
        <ellipse cx="3"  cy="5" rx="2" ry="1.5" fill="#ff8844" opacity="0.7"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // ESCALERA DE JACOB — escalera luminosa cielo↔tierra
  // ────────────────────────────────────────────────────────────
  'escalera-de-jacob': [
    {
      id: 'escalera-betel',
      name: 'Escalera de Jacob (Betel)',
      offset: [0, -20],
      svg: `
        <!-- Escalera entre tierra y cielo -->
        <!-- postes verticales -->
        <line x1="-4" y1="20" x2="-4" y2="-30" stroke="#ffd866" stroke-width="1.5" opacity="0.85"/>
        <line x1="4"  y1="20" x2="4"  y2="-30" stroke="#ffd866" stroke-width="1.5" opacity="0.85"/>
        <!-- peldaños luminosos -->
        <line x1="-4" y1="18" x2="4" y2="18" stroke="#ffd866" stroke-width="1.2" opacity="0.9"/>
        <line x1="-4" y1="12" x2="4" y2="12" stroke="#ffd866" stroke-width="1.2" opacity="0.85"/>
        <line x1="-4" y1="6"  x2="4" y2="6"  stroke="#ffd866" stroke-width="1.1" opacity="0.8"/>
        <line x1="-4" y1="0"  x2="4" y2="0"  stroke="#ffd866" stroke-width="1"   opacity="0.75"/>
        <line x1="-4" y1="-6" x2="4" y2="-6" stroke="#ffd866" stroke-width="1"   opacity="0.7"/>
        <line x1="-4" y1="-12" x2="4" y2="-12" stroke="#ffd866" stroke-width="0.9" opacity="0.6"/>
        <line x1="-4" y1="-18" x2="4" y2="-18" stroke="#ffd866" stroke-width="0.8" opacity="0.5"/>
        <!-- destello en la cima -->
        <circle cx="0" cy="-30" r="3" fill="#ffd866" opacity="0.7"/>
        <!-- piedra en la base -->
        <ellipse cx="0" cy="22" rx="5" ry="2.5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // JACOB ROBA LA PRIMOGENITURA — plato de lentejas + pieles de cabrito
  // ────────────────────────────────────────────────────────────
  'jacob-roba-primogenitura': [
    {
      id: 'plato-lentejas',
      name: 'Plato de lentejas rojas',
      offset: [6, 8],
      svg: `
        <!-- Cuenco de barro con guiso rojo -->
        <ellipse cx="0" cy="0" rx="7" ry="3.5" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.6"/>
        <ellipse cx="0" cy="-1" rx="5.5" ry="2.5" fill="#a01010" opacity="0.75"/>
        <!-- vapor -->
        <path d="M-2,-4 Q-1,-7 -2,-9" fill="none" stroke="var(--era-surface)" stroke-width="0.6" opacity="0.5"/>
        <path d="M2,-4 Q3,-7 2,-9"   fill="none" stroke="var(--era-surface)" stroke-width="0.6" opacity="0.5"/>
      `,
    },
    {
      id: 'pieles-cabrito',
      name: 'Pieles de cabrito (disfraz de Jacob)',
      offset: [-10, 6],
      svg: `
        <!-- Pellejo peludo (símbolo del engaño) -->
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- mechones de pelo -->
        <line x1="-5" y1="-1" x2="-7" y2="-4" stroke="#3a261a" stroke-width="0.5"/>
        <line x1="-3" y1="-2" x2="-4" y2="-5" stroke="#3a261a" stroke-width="0.5"/>
        <line x1="0"  y1="-2" x2="0"  y2="-5" stroke="#3a261a" stroke-width="0.5"/>
        <line x1="3"  y1="-2" x2="4"  y2="-5" stroke="#3a261a" stroke-width="0.5"/>
        <line x1="5"  y1="-1" x2="7"  y2="-4" stroke="#3a261a" stroke-width="0.5"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // JACOB LUCHA CON EL ÁNGEL — vado del Jaboc + silueta del ángel
  // ────────────────────────────────────────────────────────────
  'jacob-lucha-con-angel': [
    {
      id: 'vado-jaboc',
      name: 'Vado del Jaboc',
      offset: [0, 8],
      svg: `
        <!-- Río con corriente -->
        <path d="M-16,0 Q-8,-3 0,0 Q8,3 16,0" fill="none" stroke="var(--era-accent)" stroke-width="2.5" opacity="0.7"/>
        <path d="M-16,3 Q-8, 0 0,3 Q8,6 16,3" fill="none" stroke="var(--era-accent)" stroke-width="2" opacity="0.5"/>
        <!-- piedras del vado -->
        <ellipse cx="-6" cy="1"  rx="2.5" ry="1.2" fill="var(--era-secondary)"/>
        <ellipse cx="0"  cy="2"  rx="2"   ry="1"   fill="var(--era-secondary)"/>
        <ellipse cx="7"  cy="0"  rx="2.2" ry="1.1" fill="var(--era-secondary)"/>
      `,
    },
    {
      id: 'silueta-angel-lucha',
      name: 'Ángel de Peniel',
      offset: [6, -6],
      svg: `
        <!-- Silueta luminosa del ángel -->
        <ellipse cx="0" cy="-8" rx="3" ry="3.5" fill="#ffd866" opacity="0.6"/>
        <rect x="-2" y="-5" width="4" height="8" rx="1.5" fill="#ffd866" opacity="0.5"/>
        <!-- alas -->
        <path d="M-2,-4 Q-10,-2 -8,4" fill="none" stroke="#ffd866" stroke-width="1.2" opacity="0.7"/>
        <path d="M2,-4  Q10,-2 8,4"   fill="none" stroke="#ffd866" stroke-width="1.2" opacity="0.7"/>
        <!-- halo -->
        <circle cx="0" cy="-8" r="5" fill="none" stroke="#ffd866" stroke-width="0.8" opacity="0.4"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // JOSÉ VENDIDO POR SUS HERMANOS — pozo de Dotán + caravana ismaelita
  // ────────────────────────────────────────────────────────────
  'jose-vendido-por-hermanos': [
    {
      id: 'pozo-dotan',
      name: 'Pozo de Dotán (cisterna)',
      offset: [0, 6],
      svg: `
        <!-- Cisterna seca donde José fue arrojado -->
        <ellipse cx="0" cy="0" rx="7" ry="3.5" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.7"/>
        <!-- interior oscuro vacío -->
        <ellipse cx="0" cy="-0.5" rx="5" ry="2.5" fill="#1a0f08" opacity="0.75"/>
        <!-- borde de piedras -->
        <ellipse cx="0" cy="0" rx="7" ry="3.5" fill="none" stroke="var(--era-secondary)" stroke-width="1.5"/>
        <!-- José pequeño dentro del pozo -->
        <circle cx="0" cy="-0.5" r="1.5" fill="var(--era-accent)" opacity="0.6"/>
      `,
    },
    {
      id: 'caravana-ismaelita',
      name: 'Caravana ismaelita hacia Egipto',
      offset: [-14, -2],
      svg: `
        <!-- Dos camellos cargados en marcha -->
        <ellipse cx="-8" cy="0" rx="6" ry="3" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <ellipse cx="-11" cy="-5" rx="2" ry="3" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <ellipse cx="-6" cy="-3" rx="2" ry="1.6" fill="var(--era-accent)"/>
        <line x1="-10" y1="2" x2="-10" y2="6" stroke="#3a261a" stroke-width="0.7"/>
        <line x1="-7"  y1="2" x2="-7"  y2="6" stroke="#3a261a" stroke-width="0.7"/>
        <line x1="-4"  y1="2" x2="-4"  y2="6" stroke="#3a261a" stroke-width="0.7"/>
        <!-- aromas y mirra (bulto) -->
        <rect x="-9" y="-2" width="4" height="2.5" rx="0.7" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.3"/>
        <!-- segundo camello -->
        <ellipse cx="6" cy="0" rx="6" ry="3" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.5" opacity="0.7"/>
        <ellipse cx="3"  cy="-5" rx="2" ry="3" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.4" opacity="0.7"/>
        <ellipse cx="8"  cy="-3" rx="2" ry="1.6" fill="var(--era-secondary)" opacity="0.7"/>
        <line x1="4" y1="2" x2="4" y2="6" stroke="#3a261a" stroke-width="0.7" opacity="0.7"/>
        <line x1="7" y1="2" x2="7" y2="6" stroke="#3a261a" stroke-width="0.7" opacity="0.7"/>
        <line x1="10" y1="2" x2="10" y2="6" stroke="#3a261a" stroke-width="0.7" opacity="0.7"/>
      `,
    },
    {
      id: 'tunica-jose',
      name: 'Túnica de colores de José (ensangrentada)',
      offset: [12, 4],
      svg: `
        <!-- Túnica decorada manchada de sangre de cabrito -->
        <polygon points="-5,8 -6,-6 0,-8 6,-6 5,8" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.5" opacity="0.85"/>
        <!-- colores de la túnica (franjas) -->
        <rect x="-5" y="-2" width="10" height="2" fill="var(--era-surface)" opacity="0.5"/>
        <rect x="-5" y="2"  width="10" height="2" fill="var(--era-secondary)" opacity="0.6"/>
        <rect x="-5" y="6"  width="10" height="2" fill="var(--era-primary)" opacity="0.4"/>
        <!-- mancha de sangre -->
        <ellipse cx="2"  cy="-1" rx="2.5" ry="2" fill="#a01010" opacity="0.7"/>
        <ellipse cx="-2" cy="3"  rx="1.5" ry="1" fill="#a01010" opacity="0.5"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // JOSÉ EN EGIPTO — trono de visir + granero piramidal
  // ────────────────────────────────────────────────────────────
  'jose-en-egipto': [
    {
      id: 'trono-visir',
      name: 'Trono del visir (José)',
      offset: [-8, 2],
      svg: `
        <!-- Trono de estilo egipcio -->
        <rect x="-6" y="-10" width="12" height="12" rx="1" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.6" opacity="0.85"/>
        <!-- respaldo -->
        <rect x="-5" y="-10" width="10" height="1" rx="0.3" fill="#ffd866"/>
        <!-- asiento -->
        <rect x="-6" y="1" width="12" height="2" rx="0.5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- patas -->
        <line x1="-5" y1="3" x2="-5" y2="8" stroke="#3a261a" stroke-width="0.8"/>
        <line x1="5"  y1="3" x2="5"  y2="8" stroke="#3a261a" stroke-width="0.8"/>
        <!-- sello de Faraón / anillo -->
        <circle cx="0" cy="-3" r="2" fill="#ffd866" opacity="0.9"/>
        <circle cx="0" cy="-3" r="1.2" fill="var(--era-surface)" opacity="0.7"/>
      `,
    },
    {
      id: 'granero-egipcio',
      name: 'Granero piramidal de José',
      offset: [12, 4],
      svg: `
        <!-- Pirámide / silo de grano egipcio -->
        <polygon points="-10,6 0,-10 10,6" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.6"/>
        <rect x="-10" y="5" width="20" height="3" rx="0.3" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- puerta del granero -->
        <rect x="-2" y="2" width="4" height="4" rx="0.5" fill="#1a0f08" opacity="0.7"/>
        <!-- gavillas de trigo (icono de abundancia) -->
        <line x1="-6" y1="4" x2="-4" y2="-1" stroke="var(--era-accent)" stroke-width="0.8"/>
        <line x1="-5" y1="4" x2="-3" y2="-1" stroke="var(--era-accent)" stroke-width="0.8"/>
        <line x1="5"  y1="4" x2="3"  y2="-1" stroke="var(--era-accent)" stroke-width="0.8"/>
        <line x1="6"  y1="4" x2="4"  y2="-1" stroke="var(--era-accent)" stroke-width="0.8"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // REENCUENTRO DE JOSÉ CON SUS HERMANOS — mesa de reconocimiento + copa
  // ────────────────────────────────────────────────────────────
  'reencuentro-jose-hermanos': [
    {
      id: 'copa-plata-jose',
      name: 'Copa de plata de José',
      offset: [8, 4],
      svg: `
        <!-- Copa / cáliz de plata (usada en la prueba de Benjamín) -->
        <path d="M-3,6 Q-4,-4 0,-8 Q4,-4 3,6 Z" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.5"/>
        <ellipse cx="0" cy="6" rx="4" ry="1.5" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.5"/>
        <ellipse cx="0" cy="-8" rx="3" ry="1.2" fill="var(--era-accent)" opacity="0.7"/>
        <!-- brillo de plata -->
        <line x1="-2" y1="0" x2="-1" y2="-5" stroke="#ffd866" stroke-width="0.4" opacity="0.6"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // MUERTE DE SARA — cueva de Macpela
  // ────────────────────────────────────────────────────────────
  'muerte-sara': [
    {
      id: 'cueva-macpela',
      name: 'Cueva de Macpela (sepulcro patriarcal)',
      offset: [10, 6],
      svg: `
        <!-- Apertura de la cueva en la roca -->
        <ellipse cx="0" cy="0" rx="10" ry="6" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.6"/>
        <ellipse cx="0" cy="1" rx="7" ry="4" fill="#1a0f08" opacity="0.85"/>
        <!-- piedra de cierre -->
        <ellipse cx="7" cy="0" rx="4" ry="5.5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- texto hebreo simbólico (guión) -->
        <line x1="-3" y1="-3" x2="3" y2="-3" stroke="var(--era-surface)" stroke-width="0.4" opacity="0.4"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // MUERTE DE JACOB — lecho patriarcal + sarcófago
  // ────────────────────────────────────────────────────────────
  'muerte-de-jacob': [
    {
      id: 'lecho-jacob',
      name: 'Lecho de muerte de Jacob',
      offset: [-4, 6],
      svg: `
        <!-- Lecho patriarcal sencillo -->
        <rect x="-10" y="-2" width="20" height="5" rx="1.5" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- almohada -->
        <ellipse cx="-7" cy="-2.5" rx="3" ry="1.5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <!-- silueta del anciano -->
        <ellipse cx="-7" cy="-3.5" rx="2" ry="2" fill="var(--era-primary)" opacity="0.7"/>
        <rect x="-10" y="-1.5" width="12" height="3.5" rx="1" fill="var(--era-accent)" opacity="0.5"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // MUERTE DE JOSÉ — sarcófago egipcio
  // ────────────────────────────────────────────────────────────
  'muerte-de-jose': [
    {
      id: 'sarcofago-jose',
      name: 'Sarcófago de José (aron)',
      offset: [6, 4],
      svg: `
        <!-- Sarcófago estilo egipcio con tapa antropoide -->
        <rect x="-6" y="-4" width="12" height="16" rx="2" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.6" opacity="0.85"/>
        <!-- tapa con cara -->
        <ellipse cx="0" cy="-2" rx="4" ry="4" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <!-- decoración jeroglífica -->
        <line x1="-4" y1="4" x2="4" y2="4" stroke="#ffd866" stroke-width="0.5" opacity="0.7"/>
        <line x1="-4" y1="8" x2="4" y2="8" stroke="#ffd866" stroke-width="0.5" opacity="0.7"/>
        <!-- cruz ankh simbólica -->
        <line x1="0" y1="4" x2="0" y2="10" stroke="#ffd866" stroke-width="0.6" opacity="0.7"/>
        <line x1="-2" y1="6" x2="2" y2="6" stroke="#ffd866" stroke-width="0.6" opacity="0.7"/>
        <circle cx="0" cy="5" r="1.2" fill="none" stroke="#ffd866" stroke-width="0.5" opacity="0.7"/>
      `,
    },
  ],

  // ────────────────────────────────────────────────────────────
  // TORRE DE BABEL — torre escalonada + dispersión (decorativos)
  // ────────────────────────────────────────────────────────────
  'torre-de-babel': [
    {
      id: 'torre-babel',
      name: 'Torre de Babel',
      offset: [0, -6],
      svg: `
        <!-- Torre escalonada tipo zigurat babilónico -->
        <rect x="-14" y="4"   width="28" height="6"  rx="0.5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.5"/>
        <rect x="-11" y="-2"  width="22" height="6"  rx="0.5" fill="var(--era-primary)" stroke="#3a261a" stroke-width="0.4"/>
        <rect x="-8"  y="-8"  width="16" height="6"  rx="0.5" fill="var(--era-secondary)" stroke="#3a261a" stroke-width="0.4"/>
        <rect x="-5"  y="-13" width="10" height="5"  rx="0.5" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.3" opacity="0.85"/>
        <rect x="-3"  y="-18" width="6"  height="5"  rx="0.5" fill="var(--era-surface)" stroke="#3a261a" stroke-width="0.3"/>
        <!-- cima (templo en la cima) -->
        <polygon points="-3,-18 0,-22 3,-18" fill="var(--era-accent)" stroke="#3a261a" stroke-width="0.3"/>
        <!-- nubes de confusión rodeando la cúspide -->
        <ellipse cx="-8" cy="-16" rx="5" ry="2.5" fill="var(--era-surface)" opacity="0.45"/>
        <ellipse cx="9"  cy="-14" rx="5" ry="2.5" fill="var(--era-surface)" opacity="0.45"/>
      `,
    },
  ],

};

export default SCENE_OBJECTS;
