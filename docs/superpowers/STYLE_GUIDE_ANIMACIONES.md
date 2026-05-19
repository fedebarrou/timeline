# Style Guide — Animaciones biblia

**Audiencia**: agentes-era (Fase 1) y Director (Fase 0/1.5).
**Spec maestro**: `docs/superpowers/specs/2026-05-19-animacion-paralela-todos-eventos-design.md`.

Este guide es **prescriptivo**: si lo violás, falla `npm run verify`.

---

## 1) Las 4 reglas duras anti-duplicación

```
REGLA #1   Un concepto, un render.
           Si un evento tiene scene-object 'arca' → la primitiva
           fx:ark-boat NO se dispara para ese evento. El cue dispara
           fx:animate-scene-object con id='arca' y el SVG existente
           se mueve/balancea/avanza.

REGLA #2   Lo estático puede animarse, no clonarse.
           Para "cobrar vida" un scene-object → se anima el SVG que
           YA está en escena, no se spawnea otro encima.

REGLA #3   Lo efímero es primitiva.
           Polvo, rayo, lluvia 2s, partículas, halos transitorios.
           NO scene-objects.

REGLA #4   Lo permanente es scene-object.
           Tabernáculo, templo, arca, becerro, altar, montañas,
           torre. Permanecen mientras la escena está activa,
           opcionalmente animados.
```

`scripts/verify-no-duplicate-fx.ts` impone REGLA #1 con una tabla de
equivalencias hardcoded (arca ↔ `fx:ark-boat`, becerro ↔ `fx:golden-calf`,
serpiente ↔ `fx:serpent`, tabletas ↔ `fx:stone-tablets`, zarza ↔
`fx:burning-bush`, etc.). Si tu scene-object tiene `id: 'arca'`, NO
podés disparar `fx:ark-boat` en el mismo evento. Usá:

```ts
{ match: /\barca\b|flota|sobre las aguas/i,
  cueId: 'fx:animate-scene-object',
  data: { id: 'arca', kind: 'rock', duration: 1.6 } }
```

---

## 2) Mood y paleta por era

| Era | Mood | Paleta de operación |
|---|---|---|
| `primordial` | Dorados y polvos, cuna del mundo. | `--era-accent` dorado, `--era-primary` ocre cálido, motes de luz. |
| `patriarcal` | Ocres y caravanas, desierto / tienda. | `--era-secondary` arena, beige, `--era-accent` ámbar. |
| `exodo` | Rojos faraónicos, agua, varas, fuego. | `--era-primary` rojo profundo, complementario con el fuego (`#ff8844`). |
| `reinos-y-exilio` | Púrpuras reales y ruinas. | `--era-primary` púrpura, `--era-accent` oro real, humos lejanos. |
| `evangelio` | Dorado mariano y rojo pasión. | `--era-accent` dorado mariano, `--era-primary` para rojo pasión. |
| `revelacion` | Verdes islámicos, caligrafía, geometría. | `--era-primary` verde profundo, `--era-accent` oro, geometría sutil. |

### Reglas de color (enforcement)

- **PROHIBIDO** hardcodear colores hex fuera de los universales:
  - Fuego: `#ff8844`
  - Sangre: `#a01010`
  - Oro divino: `#ffd866`
  - Texto/contornos oscuros: `#1a0f08`, `#3a261a`
  - Universales atmosféricos puntuales: blanco `#ffffff` para flash/destellos.
- Todo lo demás: `var(--era-primary)`, `var(--era-secondary)`, `var(--era-accent)`, `var(--era-surface)`, `var(--era-text)`, `var(--era-bg)`.

---

## 3) Catálogo completo de primitivas

Cada primitiva se invoca con un `Cue` registrado para un evento:

```ts
{ match: /regex/i, cueId: 'fx:xxx', data: { ... } }
```

### 3.1) Originales (40)

> Pre-existentes en `src/lib/narrationFx.ts`. Documentadas en el doc-block del archivo.

```
fx:dust-burst        fx:character-emerge   fx:character-recede   fx:glow-pulse
fx:water-wave        fx:fire-flicker       fx:lightning-strike   fx:tradition-badge
fx:rain              fx:smoke-rise         fx:earthquake-shake   fx:blood-stain
fx:journey-trace     fx:halo-divine        fx:dove-flight        fx:idol-shatter
fx:plague-swarm      fx:walls-fall         fx:burning-bush       fx:stone-tablets
fx:scroll-unfurl     fx:angel-descent      fx:serpent            fx:golden-calf
fx:ark-boat          fx:tower-babel        fx:sword-strike       fx:fish-multiply
fx:bread-multiply    fx:cross-rise         fx:lamp-glow          fx:well
fx:mountain-glow     fx:ladder             fx:ram                fx:star-bethlehem
fx:chalice           fx:manna-fall         fx:pillar-of-fire     fx:parted-waters
```

### 3.2) Keystone — `fx:animate-scene-object`

```
fx:animate-scene-object
  data: { id: string, kind: AnimateKind, duration?: number }

  kind ∈ 'drift' | 'pulse' | 'shake' | 'march' | 'sway' |
         'rock'  | 'burn'  | 'glow'  | 'wobble' | 'rise'
```

Cuándo SÍ usar:
- Cuando el evento ya declara un scene-object con `id='X'` y la narración
  menciona X. El cue dispara `fx:animate-scene-object` con `id: 'X'` y el
  `kind` apropiado.

Cuándo NO usar:
- Si no hay scene-object con ese id (el cue queda silencioso → bug).
- Si la mención es efímera (polvo, rayo) → usá primitiva atmosférica.

Ejemplo (Diluvio, el arca flota):
```ts
{ match: /flota|sobre las aguas/i,
  cueId: 'fx:animate-scene-object',
  data: { id: 'arca', kind: 'rock' } }
```

### 3.3) C.1 Figurativas adicionales

| cueId | Parámetros típicos | Cuándo usar | Cuándo NO |
|---|---|---|---|
| `fx:caravan` | `{ position? \| pinIdx? }` | Caravanas patriarcales (Abraham→Canaán), peregrinaciones. | Si el evento ya tiene scene-object de caravana. |
| `fx:throne` | `{ position?, pinIdx? }` | Coronaciones, sala del trono (Salomón, faraón). | Cuando hay scene-object `trono`. |
| `fx:crown-descent` | `{ position?, pinIdx? }` | Coronaciones (David, Salomón). | Si querés crown-of-thorns. |
| `fx:fire-from-heaven` | `{ position?, pinIdx? }` | Elías vs Baal, Sodoma. | Para fuego ambiente — usá `fx:fire-flicker`. |
| `fx:bowing-crowd` | `{ position?, pinIdx? }` | Adoración, derrota ante el rey. | Si la narración es íntima (1-2 personas). |
| `fx:trumpet-blast` | `{ position?, pinIdx? }` | Jericó, Pentecostés, shofar. | Música ambiente — esto es event-driven. |
| `fx:angel-formation` | `{ position?, pinIdx? }` | Anuncio a los pastores, ejércitos celestiales. | 1 solo ángel — usá `fx:angel-descent`. |
| `fx:tablets-shatter` | `{ position?, pinIdx? }` | Moisés rompe las tabletas. | Para la entrega — usá `fx:stone-tablets`. |
| `fx:moon-split` | sin params | Hadiz islámico de la luna partida. | Eclipse normal — usá `fx:eclipse-darken`. |
| `fx:kaaba-pulse` | `{ position?, pinIdx? }` | Conquista de Meca, peregrinación. | Otras construcciones — usá scene-object. |
| `fx:tongue-of-flame` | `{ positions: [...] }` o `{ position?, pinIdx? }` | Pentecostés (positions = posiciones de cada cabeza). | Una sola llama — usá `fx:fire-flicker`. |
| `fx:crown-of-thorns` | `{ position?, pinIdx? }` | Pasión de Jesús. | Corona real — usá `fx:crown-descent`. |
| `fx:fish-school` | `{ position?, pinIdx? }` | Pesca milagrosa, multiplicación. | Pez individual — usá `fx:whale-breach`. |
| `fx:plague-locust` | sin params | Plaga de langostas (Éxodo, Apocalipsis). | — |
| `fx:plague-frogs` | `{ position?, pinIdx? }` | Plaga de ranas. | — |
| `fx:plague-darkness` | sin params | Tinieblas (novena plaga). | — |
| `fx:rolling-stone` | `{ position?, pinIdx? }` | Resurrección, tumbas patriarcales. | — |
| `fx:tomb-empty` | `{ position?, pinIdx? }` | Resurrección. | — |
| `fx:resurrection-light` | `{ position?, pinIdx? }` | Resurrección de Jesús/Lázaro. | Cualquier luz divina — usá `fx:divine-light-beam`. |
| `fx:divine-hand` | `{ position?, pinIdx? }` | Intervención divina (escribiendo el muro). | Halo personal — usá `fx:halo-divine`. |
| `fx:sword-clash` | `{ from, to }` o `{ position }` | Combate (David vs Goliat, Badr). | Golpe simple — usá `fx:sword-strike`. |
| `fx:lion-roar` | `{ position?, pinIdx? }` | Daniel en el foso, Sansón. | — |
| `fx:wolf-prowl` | `{ position?, pinIdx? }` | Profecía mesiánica del lobo/cordero. | — |
| `fx:eagle-soar` | `{ position?, pinIdx? }` | Profecías, juicios. | — |
| `fx:raven-flight` | `{ from, to }` o `{ position }` | Cuervo de Noé, ravens de Elías. | — |
| `fx:horse-gallop` | `{ position?, pinIdx? }` | Jinetes apocalípticos, batallas. | — |
| `fx:camel-train` | igual que `fx:caravan` | Sinónimo. | — |
| `fx:goat-herd` | `{ position?, pinIdx? }` | Pastores, rebaños. | — |
| `fx:donkey-walk` | `{ position?, pinIdx? }` | Entrada triunfal, huida a Egipto. | — |
| `fx:locust-cloud` | igual que `fx:plague-locust` | Sinónimo. | — |
| `fx:frog-rain` | igual que `fx:plague-frogs` | Sinónimo. | — |
| `fx:scorpion-skitter` | `{ position?, pinIdx? }` | Desierto, plagas menores. | — |
| `fx:whale-breach` | `{ position?, pinIdx? }` | Jonás. | — |

### 3.4) C.2 Atmosféricos one-shot

| cueId | Parámetros | Cuándo SÍ | Cuándo NO |
|---|---|---|---|
| `fx:dawn-break` | — | "Amaneció", "al alba", inicio de era. | Eventos meridianos. |
| `fx:dusk-fall` | — | "Cayó la tarde", "anocheció". | — |
| `fx:night-fall` | — | "Era de noche", visión nocturna. | — |
| `fx:starfield-shimmer` | — | Estrellas mencionadas, profecía. | Una sola estrella — usá `fx:star-bethlehem`. |
| `fx:starfield-rotate` | — | Visiones épicas, Apocalipsis. | — |
| `fx:eclipse-darken` | — | Crucifixión, día del Señor. | — |
| `fx:moon-bloodred` | — | Apocalipsis, profecías de Joel. | — |
| `fx:storm-clouds` | — | "Vinieron nubes", tormenta inminente. | — |
| `fx:hailstorm` | — | Séptima plaga, juicios. | — |
| `fx:rain-sheet` | — | Lluvia intensa (versión más densa de `fx:rain`). | — |
| `fx:fog-roll` | — | Niebla en el monte. | — |
| `fx:mist-rise` | `{ position?, pinIdx? }` | Mañana en el lago, vapores. | — |
| `fx:wind-streaks` | — | "Vino un viento", Pentecostés. | — |
| `fx:sandstorm-major` | `{ position?, pinIdx? }` | Eventos cumbre de desierto (Hégira, etc.). | Tormentas chicas — usá la primitiva original. |
| `fx:heat-shimmer` | — | Calor del desierto, mediodía. | — |
| `fx:meteor-strike` | — | Profecías (estrella cayendo). | — |
| `fx:meteor-shower` | — | Visiones apocalípticas. | — |
| `fx:lightning-storm` | — | Sinaí, batallas divinas. | Un solo rayo — usá `fx:lightning-strike`. |
| `fx:thunder-flash` | — | Truenos en escenas dramáticas. | — |
| `fx:earthquake-major` | — | Sismo grande (terremoto del Sinaí, resurrección). | Tembleque menor — usá `fx:earthquake-shake`. |
| `fx:divine-light-beam` | `{ position?, pinIdx? }` | Voz del cielo, gloria descendiendo. | Halo personal — usá `fx:halo-divine`. |
| `fx:incense-spiral` | `{ position?, pinIdx? }` | Templo, sacerdocio, oración. | — |
| `fx:smoke-column` | `{ position?, pinIdx? }` | Sacrificios, ruinas. | — |
| `fx:dust-pillar` | `{ position?, pinIdx? }` | Columna divina por el día (Éxodo). | — |
| `fx:cloud-pillar` | `{ position?, pinIdx? }` | Columna divina por la noche. | — |

### 3.5) C.4 Cinematográficos (solo en cumbres, 1-3 por evento máximo)

| cueId | Parámetros | Cuándo SÍ | Cuándo NO |
|---|---|---|---|
| `fx:vignette-pulse` | — | Enfocar el evento cumbre. | Cada evento — corromper la economía visual. |
| `fx:flash-white` | — | Milagros, revelaciones súbitas. | Más de 1 por minuto narrado. |
| `fx:fade-to-black` | — | Muerte, fin de era. | Mitad de escena. |
| `fx:fade-from-black` | — | Nacimientos, despertares, post-fade-to-black. | Cada nacimiento — solo cumbres. |
| `fx:zoom-pulse` | — | Énfasis sobre el marker activo. | — |
| `fx:slow-motion` | `{ duration?: number }` | Momentos clave (akedá). | Excesivo. |
| `fx:silhouette-horizon` | — | Llegada distante (Mesías inminente). | — |
| `fx:radial-bloom` | `{ position?, pinIdx? }` | Epifanías, transfiguración. | — |
| `fx:shockwave` | `{ position?, pinIdx? }` | Terremoto, explosión simbólica. | — |

### 3.6) Política de cobertura

- **Eventos estándar**: 8-15 cues en `cues/{event}.ts`.
- **Eventos cumbre** (Diluvio, Mar Rojo, Crucifixión, Hégira, etc.): 20-30 cues.
- **Cinematográficos**: 0 en eventos menores, 1-3 en cumbres.

---

## 4) Cómo escribir un `cues/{evento}.ts`

```ts
import type { Cue } from '../narrationCues';

/**
 * Cues for "<Título del evento>".
 * Pins: nombre(0), otro(1), ...
 */
const CUES: Cue[] = [
  // ── Pasada 1: sustantivos (usá nounDictionary como base) ─────────────
  // 'paloma' aparece — y el evento NO tiene scene-object 'paloma':
  { match: /\bpaloma\b/i,
    cueId: 'fx:dove-flight',
    data: { from: [620, 280], to: [640, 290] } },

  // 'arca' aparece — el evento SÍ tiene scene-object 'arca' (REGLA #1):
  { match: /\barca\b|flota|sobre las aguas/i,
    cueId: 'fx:animate-scene-object',
    data: { id: 'arca', kind: 'rock' } },

  // ── Pasada 2: narrativa (personajes, momentos cumbre) ────────────────
  { match: /Mois[ée]s recibe|sube al monte/i,
    cueId: 'fx:character-emerge', data: { pinIdx: 0 } },

  // ── Pasada 3: cumbres cinematográficas (eventos cumbre) ──────────────
  { match: /expir[óo]|entreg[óo] el esp[íi]ritu/i,
    cueId: 'fx:fade-to-black' },
];

export default CUES;
```

Notas:
- El regex se testea contra una ventana asimétrica del texto narrado (`charIndex-4 .. charIndex+24`). Usá `\b` para anclar palabras.
- Por defecto, cada cue dispara UNA VEZ por scene-run. Si querés re-disparar, agregá `fireOnce: false`.
- Los `data.position` están en coords del SVG (mismo sistema que `svgPosition` del MDX).

---

## 5) Cómo escribir un scene-object con `id` estable

```ts
// src/lib/sceneObjects/exodo.ts
import { gsap } from '../scrollytelling';
import type { SceneObject } from './types';

const SCENE_OBJECTS: Record<string, SceneObject[]> = {
  'becerro-de-oro': [
    {
      id: 'becerro',                                  // ← obligatorio
      name: 'Becerro de oro',                         // ← visible al hover
      offset: [0, -8],                                // ← desde el marker
      svg: `
        <ellipse cx="0" cy="0" rx="6" ry="3.5"
                 fill="#ffd866" stroke="#5a4830" stroke-width="0.4"/>
        <!-- patas, cuernos, etc. -->
      `,
      animate: (el) => {
        // opcional: GSAP idle loop. Pero recordá: prefiero animaciones
        // disparadas por fx:animate-scene-object {kind: 'sway'} desde
        // un cue, para mantener cohesión narrativa.
      },
    },
  ],
};
export default SCENE_OBJECTS;
```

Reglas duras:
- Cada scene-object MUST tener `id` (REGLA #1 enforcement).
- Colores: SOLO `var(--era-*)` o los universales permitidos.
- Si tu scene-object iconográficamente coincide con una primitiva (ej. `arca` ↔ `fx:ark-boat`), el cue de `arca` debe usar `fx:animate-scene-object`. El verify script lo enforza.

---

## 6) Cómo declarar un `DialogCue`

```ts
// src/lib/dialogs/patriarcal.ts
import type { DialogCue } from '../dialogTypes';

const DIALOGS: Record<string, DialogCue[]> = {
  'akedah-sacrificio-isaac': [
    { match: /padre m[íi]o.*el cordero|hijo m[íi]o.*holocausto/i,
      speaker: 'isaac', addressee: 'abraham',
      text: '¿Dónde está el cordero para el holocausto?',
      holdMs: 4200 },
    { match: /Dios se proveer[áa]/i,
      speaker: 'abraham', addressee: 'isaac',
      text: 'Dios se proveerá el cordero, hijo mío.',
      holdMs: 4500 },
    // Voz divina = speaker virtual; sin pin → burbuja superior-centro,
    // halo dorado, sin tail.
    { match: /no extiendas tu mano|no le hagas nada/i,
      speaker: 'yahve', addressee: 'abraham',
      text: '¡Abraham, Abraham! No extiendas tu mano sobre el muchacho.',
      holdMs: 5000 },
  ],
};
export default DIALOGS;
```

Speakers virtuales soportados (sin pin físico):
- `yahve` / `allah` / `dios-padre` → top-center, halo dorado, cursiva.
- `angel-anonimo` → lateral superior, halo blanco.
- `voz-multitud` → bottom-center, smallcaps, sin tail.

`addressee` puede ser:
- Un `charId` real → se dibuja una curva sutil punteada del speaker al addressee mientras la burbuja vive.
- `null` → monólogo, proclamación pública.
- Un speaker virtual → ancla mismo lado del speaker.

El renderer permite **2 burbujas simultáneas máximo**. Si llegan 3, las extras se encolan FIFO y se montan cuando se libere un slot.

---

## 7) Densidad objetivo (sumario)

- **Eventos estándar**: 8-15 cues. ≥1 scene-object decorativo. Coreografía ≥6 pasos.
- **Eventos cumbre**: 20-30 cues. 3-6 scene-objects. Coreografía con interacción explícita.
- **Cinematográficos**: 0 en menores, 1-3 en cumbres.

---

## 8) Anti-patrones (cosas que NO hagas)

1. **Inventar primitivas nuevas en `cues/{evento}.ts`.** Si una iconografía no está cubierta, dejá `// TODO[primitive]: nombre — caso de uso` y dispatch genérico `fx:glow-pulse`. El Director hace pasada final (Fase 1.5).

2. **Hardcodear colores hex que no sean los universales permitidos.** `verify-era-coherence.ts` (futuro) lo enforzará; los review humanos ya lo enforzan ahora.

3. **Crear scene-objects sin `id`.** El verify script asume que todo scene-object útil tiene id estable; sin él, REGLA #1 no se puede enforce.

4. **Duplicar iconografía** (REGLA #1). Si tu scene-object es 'arca' y disparás `fx:ark-boat` en el cue, el verify script falla con error. La solución es `fx:animate-scene-object` con `kind` apropiado.

5. **Coreografías con ciclo > 8s o que no cierran en estado base.** El `repeat: -1` queda visible feo.

6. **Burbujas char-to-char en cada evento.** Reservalas a parlamentos directos textuales (`«…»`, `"…"`, `dijo|exclamó|preguntó|respondió`). Si la narración es indirecta ("y le dijo que…"), no hay DialogCue.

7. **Cinematográficos en eventos menores.** Romper la economía visual hace que las cumbres pierdan peso.

8. **Tocar archivos fuera de tu lista blanca de era.** El plan paralelo asume cero overlap; ignorar esto rompe el merge.

---

© 2026 Federico Barroumeres · All Rights Reserved.
