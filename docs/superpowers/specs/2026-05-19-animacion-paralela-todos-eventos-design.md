# Animación explícita en mapa para los 121 eventos — Diseño

**Fecha**: 2026-05-19
**Estado**: Aprobado por el usuario, listo para plan de implementación
**Working dir**: `C:\Users\Federiking\Desktop\biblia`

---

## 1. Propósito

Llevar los 121 eventos del timeline bíblico a un estado de animación **recontra explícita** en el mapa: cada sustantivo concreto que la narración menciona (animal, objeto bíblico, fenómeno natural, construcción) debe tener una contraparte visual figurativa en el mapa SVG, dentro del mood y paleta de cada era.

Hoy el sistema tiene 40 primitivas FX, ~700 cues distribuidas y choreography per-evento de profundidad desigual: algunos eventos son ricos (escena de Eva), la mayoría son básicos. El trabajo de este spec es subir el piso de todos los eventos al techo actual.

Adicionalmente se arregla un bug del cierre de era: el pergamino final entra encima de animaciones y narración del último evento aún en vuelo.

### Material existente que se reutiliza

- `src/lib/narrationFx.ts` — 40 primitivas figurativas + atmosféricas, dispatcher por `timeline:cue`.
- `src/lib/cues/*.ts` — 121 archivos uno por evento, regex → cueId.
- `src/lib/choreography/{era}.ts` — choreography GSAP por evento, mueve los pins.
- `src/lib/mapSceneObjects.ts` — scene-objects estáticos SVG (~7 eventos cubiertos).
- `src/lib/mapSpeechBubble.ts` — burbujas de personaje, hoy solo disparadas por `timeline:character-active`.
- `src/lib/playMode.ts` — orquesta TTS + scene advance + emite `timeline:era-ended`.

### Objetivos

1. Cada uno de los 121 eventos cumple criterios de "bien animado" (Sección 7).
2. Cero duplicación de render: si un objeto está como scene-object, su primitiva FX paralela no se dispara.
3. Cada era mantiene coherencia visual (paleta, mood, formas).
4. Diálogos bíblicos directos (Caín↔Yahvé, Faraón↔Moisés, Gabriel↔María, etc.) se renderizan como burbujas char-to-char durante la narración.
5. El pergamino de cierre de era NO aparece mientras quede narración, cue, choreography o burbuja activa del último evento.

### Fuera de alcance

- Cambios en el contenido narrativo (`src/content/events/*.mdx`).
- Cambios en el TTS, en la generación de voz o en los MP3 pre-generados.
- Cambios en el mapa moderno (Maplibre GL) o en los marcadores base.
- Estilos del sitio en general, navegación, sidebar de personajes.

---

## 2. Arquitectura — topología de agentes

El trabajo se descompone en 8 unidades atómicas con propiedad estricta de archivos para garantizar cero conflictos de merge entre agentes paralelos.

### Fase 0 — Director de FX (serial, 1 agente)

Corre antes que todos. Produce los artefactos compartidos que el resto consume.

```
DIRECTOR (Fase 0)
  ├─ src/lib/narrationFx.ts                       (extiende: nuevas primitivas)
  ├─ src/lib/cues/nounDictionary.ts               (nuevo)
  ├─ src/lib/sceneObjects/index.ts                (nuevo, refactor del antiguo)
  ├─ src/lib/sceneObjects/animator.ts             (nuevo)
  ├─ src/lib/dialogTypes.ts                       (nuevo)
  ├─ src/lib/narrationCues.ts                     (extiende loader con dialogs)
  ├─ src/lib/mapSpeechBubble.ts                   (extiende con dialog listener)
  ├─ docs/superpowers/STYLE_GUIDE_ANIMACIONES.md  (nuevo)
  └─ scripts/verify-no-duplicate-fx.ts            (nuevo)
```

El refactor del scene-objects monolito a shards por era es clave: hoy los 6 agentes-era colisionarían en el mismo archivo, y la fragmentación elimina ese riesgo.

### Fase 1 — 7 agentes en paralelo

```
AGENTE-ERA × 6 (uno por era)
  ├─ src/lib/cues/{eventos-de-su-era}.ts          (solo los suyos, in-place edit)
  ├─ src/lib/choreography/{ERA}.ts                (solo el suyo)
  ├─ src/lib/sceneObjects/{ERA}.ts                (solo el suyo)
  └─ src/lib/dialogs/{ERA}.ts                     (solo el suyo)

AGENTE GUARDIAN × 1 (en paralelo con los 6)
  ├─ src/lib/playMode.ts                          (refactor de emitEraEnded)
  ├─ src/lib/eraEndGuard.ts                       (nuevo)
  ├─ src/lib/tts.ts                               (dispatch timeline:tts-silent)
  └─ src/components/EraClosingDialog.astro        (doble guarda en listener)
```

### Fase 1.5 — Director pasada final (opcional, serial)

Si los agentes-era dejaron TODOs `// TODO[primitive]: …` por iconografía que el catálogo de Fase 0 no cubría, el Director corre una segunda vez agregando esas primitivas faltantes y haciendo find-replace de los TODOs por los `cueId` reales. Si no hay TODOs, esta fase se salta.

### Fase 2 — Integración manual (yo, no agentes)

- `npm run build` debe pasar (astro check + build).
- `npm run verify` con los nuevos scripts debe pasar.
- Recorrido manual de las 6 eras en modo Play, con agent-browser para screenshots por evento.
- Fix puntual de regresiones por re-dispatch al agente correspondiente.

### Estrategia de despacho

- Director (Fase 0): yo lo ejecuto inline en una sesión (modelo Opus).
- Fase 1: una sola llamada con 7 invocaciones `Agent` en paralelo, `subagent_type: general-purpose`, modelo `sonnet`. Sin worktree: el diseño garantiza zero overlap, así que correr en main es seguro y más rápido. Si en testing aparece un agente que se desvía, lo cambio a `isolation: "worktree"` para ese caso puntual.

---

## 3. Style guide producido por el Director

### A) Las 4 reglas duras de no-duplicación

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

### B) Era-coherence

Todo SVG nuevo usa SOLO CSS vars de la era (`--era-primary`, `--era-secondary`, `--era-accent`, `--era-surface`, `--era-text`). Excepciones universales permitidas (verificadas por script):

- Fuego: `#ff8844`
- Sangre: `#a01010`
- Oro divino: `#ffd866`
- Texto oscuro: `#1a0f08`, `#3a261a`

Mood de cada era (lo aplica el agente en color picks dentro del rango era):

- **primordial**: dorados y polvos, cuna del mundo
- **patriarcal**: ocres y caravanas, desierto / tienda
- **exodo**: rojos faraónicos, agua, varas, fuego
- **reinos-y-exilio**: púrpuras reales y ruinas
- **evangelio**: dorado mariano y rojo pasión
- **revelacion**: verdes islámicos, caligrafía, geometría

### C) Catálogo extendido de primitivas

El Director agrega ~50-70 primitivas nuevas a `narrationFx.ts`, organizadas en 4 categorías. La pieza clave de la categoría figurativa:

```
fx:animate-scene-object       — kind: 'drift' | 'pulse' | 'shake' | 'march' | 'sway' |
                                       'rock' | 'burn' | 'glow' | 'wobble' | 'rise'
                                target id (estable, ej. 'arca'), duration?
```

#### C.1) Figurativas adicionales (objetos / animales / criaturas nombradas)

```
fx:caravan                    fx:throne                   fx:crown-descent
fx:fire-from-heaven           fx:bowing-crowd             fx:trumpet-blast
fx:angel-formation            fx:tablets-shatter          fx:moon-split
fx:kaaba-pulse                fx:tongue-of-flame          fx:crown-of-thorns
fx:fish-school                fx:plague-locust            fx:plague-frogs
fx:plague-darkness            fx:rolling-stone            fx:tomb-empty
fx:resurrection-light         fx:divine-hand              fx:sword-clash
fx:lion-roar                  fx:wolf-prowl               fx:eagle-soar
fx:raven-flight               fx:horse-gallop             fx:camel-train
fx:goat-herd                  fx:donkey-walk              fx:locust-cloud
fx:frog-rain                  fx:scorpion-skitter         fx:whale-breach
```

#### C.2) Atmosféricos one-shot (disparados por narración)

```
fx:dawn-break                 — barrido cálido de horizonte hacia arriba
fx:dusk-fall                  — barrido naranja-violeta descendente
fx:night-fall                 — cielo se oscurece, aparecen estrellas
fx:starfield-shimmer          — capa de estrellas titilando arriba del mapa
fx:starfield-rotate           — rotación lenta del campo estelar (proyección épica)
fx:eclipse-darken             — disco solar tapado, halo dorado, luz cae al 30%
fx:moon-bloodred              — luna roja sangrienta (apocalíptico)
fx:storm-clouds               — nubarrones avanzan desde un borde
fx:hailstorm                  — granizo cayendo + impactos al suelo
fx:rain-sheet                 — lluvia densa (no gotas sueltas) con escurrimiento
fx:fog-roll                   — niebla entrando desde un borde
fx:mist-rise                  — niebla saliendo del suelo (lagos, ríos)
fx:wind-streaks               — líneas blancas indicando viento fuerte
fx:sandstorm-major            — versión escalada del shake-to-sandstorm existente
fx:heat-shimmer               — distorsión de calor (filter SVG turbulence)
fx:meteor-strike              — meteoro cae diagonalmente con cola
fx:meteor-shower              — múltiples meteoros simultáneos
fx:lightning-storm            — múltiples rayos en cascada
fx:thunder-flash              — flash blanco con shake leve
fx:earthquake-major           — shake intenso de todo el SVG
fx:divine-light-beam          — columna de luz dorada del cielo a un punto
fx:incense-spiral             — espiral de humo subiendo
fx:tongue-of-flame             — llamas pequeñas sobre múltiples cabezas (Pentecostés)
fx:smoke-column               — columna de humo gruesa (sacrificio, batalla, ruina)
fx:dust-pillar                — pilar de polvo (columna divina del Éxodo: día)
fx:cloud-pillar               — pilar de nube (columna divina: noche, opacidad alta)
fx:plague-darkness            — toda la pantalla en sombra densa
```

#### C.3) Ambient per-era (capa continua, intensidad baja)

Cada era activa una capa ambiente de fondo cuando entrás a sus escenas, persistente mientras estás en eventos de esa era. Se desactiva al cambiar de era. Implementación: un loop GSAP que vive en `<g data-layer="era-ambient">` independiente del layer narration-fx.

```
primordial          — partículas doradas flotando (dust motes), wash dorado suave
patriarcal          — heat shimmer leve sobre horizonte, dust devils ocasionales lejanos
exodo               — ceniza cayendo intermitente, sand-laden wind streaks
reinos-y-exilio     — columnas de humo de incienso lejanas, beams de luz tipo vitral
evangelio           — golden hour beams a través de nubes, dove silhouettes ocasionales
revelacion          — viento de desierto, starfield shimmer arriba, geometría sutil
```

#### C.4) Cinematográficos (composición de cámara y transiciones de escena)

```
fx:vignette-pulse             — oscurece bordes para enfocar centro
fx:flash-white                — flash blanco corto (revelaciones, milagros)
fx:fade-to-black              — fundido a negro (muertes, finales de era)
fx:fade-from-black            — fundido desde negro (nacimientos, despertares)
fx:zoom-pulse                 — leve zoom-in-zoom-out sobre marker activo
fx:slow-motion                — ralentiza GSAP timeScale del SVG por N segundos
fx:silhouette-horizon         — silueta lejana apareciendo en el horizonte
fx:radial-bloom               — destello radial centrado (epifanía)
fx:shockwave                  — onda expansiva (terremoto, explosión simbólica)
```

#### C.5) Política de uso

- **Atmosféricos one-shot**: usados liberalmente por agentes-era cuando el texto narra fenómenos meteorológicos / temporales. Sustantivos como "noche", "amanecer", "tormenta", "rayo", "viento" disparan estos automáticamente vía `nounDictionary`.
- **Ambient per-era**: activado por `EraTheme.astro` al montar; NO se invoca por evento. Los agentes-era no lo tocan.
- **Cinematográficos**: reservados para eventos cumbre (crucifixión → `fx:fade-to-black`, anunciación → `fx:radial-bloom`, hégira → `fx:zoom-pulse`). 1-3 por evento cumbre máximo, cero en eventos menores.

### D) Diccionario noun → FX — `src/lib/cues/nounDictionary.ts`

El Director publica un diccionario obligatorio que cada agente-era usa como base. Cobertura objetivo: ~110-130 entradas.

```
ANIMALES (figurativas, no genéricas)
  serpiente, cordero, oveja, cabra, vaca/becerro, toro, león, leopardo,
  lobo, perro, burro/asno, mula, camello, caballo, paloma, cuervo,
  águila, halcón, gallo, codornices, pez, ballena, langosta, rana,
  mosca, piojo, mosquito, escorpión, cabrito, carnero, ciervo.

OBJETOS BÍBLICOS
  espada, escudo, lanza, arco, flecha, honda, vara/báculo, cetro,
  corona, trono, manto, túnica, sandalia, copa/cáliz, pan, uva, vid,
  olivo, higo, granada, miel, mirra, incienso, jarra, cántaro,
  canasta, urna, tabletas-piedra, rollo/pergamino, candelabro/menorá,
  arpa, trompeta/shofar, címbalo, anillo, sello, escala, velo,
  túnica-multicolor, cilicio, ceniza, llave.

LUGARES / CONSTRUCCIONES (scene-object)
  tienda, pozo, altar, columna, templo, sinagoga, palacio, torre,
  arca-noé, arca-alianza, tabernáculo, montaña, río, mar, oasis,
  ciudad-amurallada, palmera, cedro, zarza.

NATURALES / METEOROLÓGICOS (primitiva)
  lluvia, granizo, nieve, niebla, eclipse, luna, sol, estrella,
  estrella-fugaz, meteoro, cometa, rayo, trueno, terremoto, viento,
  tornado-arena, fuego, humo, agua, ola, marea-roja, oscuridad-total,
  amanecer, atardecer, arco-iris.

DIVINOS
  ángel, querubín, serafín, halo, gloria-shekiná, mano-divina,
  voz-del-cielo, columna-fuego, columna-nube.

TEMPORALES (disparan atmosféricos C.2)
  amaneció, anocheció, noche, día, alba, crepúsculo, tres días,
  cuarenta días, cuarenta noches, séptimo día, sábado.

CINEMATOGRÁFICOS (disparan C.4, solo en cumbres)
  expiró, murió, resucitó, ascendió, descendió, se reveló,
  fue arrebatado, se transfiguró.
```

Cada entrada puede tener variantes por era:

```ts
'paloma': {
  default: 'fx:dove-flight',
  era: {
    'evangelio':  'fx:dove-spirit',        // descenso radiante (bautismo)
    'primordial': 'fx:dove-olive-branch',  // rama de olivo (Noé)
  }
}
```

### E) Mandato de explicitud

Al escribir cada `cues/{evento}.ts` el agente:

1. Lee la narración del evento (`src/content/events/{id}.mdx` y `public/narrations/{id}.txt` si existe).
2. Pasada 1 (obligatoria): cada sustantivo del `nounDictionary` que aparece → cue con la primitiva. Si el evento ya tiene scene-object para ese sustantivo, el cue dispara `fx:animate-scene-object` en vez de la primitiva paralela (regla #1).
3. Pasada 2 (narrativa): cues de personajes (emerge/recede/glow), halos divinos, momentos cumbre.
4. Pasada 3 (diálogo): cues `fx:dialog` para parlamentos directos (Sección 5).

Densidad objetivo:
- Eventos estándar: **8-15 cues**.
- Eventos cumbre (Diluvio, Mar Rojo, Crucifixión, Hégira, etc.): **20-30 cues**.

---

## 4. Contrato del agente-era

Cada uno de los 6 agentes-era recibe el mismo prompt-plantilla parametrizado con `{ERA_ID, EVENT_IDS, EVENT_COUNT}`.

### Entradas

1. `docs/superpowers/STYLE_GUIDE_ANIMACIONES.md`
2. `src/lib/cues/nounDictionary.ts`
3. `src/lib/narrationFx.ts` (catálogo extendido)
4. Lista plana de sus `EVENT_IDS` con rutas absolutas a sus MDX
5. Narraciones generadas en `public/narrations/{id}.txt` cuando existan

### Outputs por evento

**1) Cues densas** — `src/lib/cues/{evento}.ts`
- 3 pasadas (sustantivo, narrativa, diálogo) según Sección 3.E.
- Cada cue con comentario corto explicando qué dispara.

**2) Choreography enriquecida** — bloque del evento en `src/lib/choreography/{ERA_ID}.ts`
- Mínimo **6 pasos GSAP** por evento.
- Cierra siempre en estado base para que `repeat: -1` no salte.
- Usa offsets reales para mostrar viajes, peleas, encuentros.
- Si hay 2+ personajes con interacción narrada → coreografía explícita (atraerse, chocar, separarse).

**3) Scene-objects** — `src/lib/sceneObjects/{ERA_ID}.ts`
- Eventos cumbre: **3-6 scene-objects** con `id` estable.
- Eventos menores: **1-2 scene-objects** decorativos.
- Solo CSS vars de la era + excepciones universales.
- Si declara scene-object con `id='X'`, ese evento NO puede disparar primitiva `fx:X` (regla #1, enforcement por script).

**4) Diálogos** — `src/lib/dialogs/{ERA_ID}.ts` (formato en Sección 5)
- Detectar frases en estilo directo en el MDX (comillas españolas «…», "…", `dijo|exclamó|preguntó|respondió`).
- Asignar a personaje hablante + receptor + timing por regex.

### Reglas duras (en el prompt del agente)

1. Nunca duplicar render (regla #1).
2. Nunca inventar primitiva nueva: si falta, deja `// TODO[primitive]: nombre — caso de uso` y dispatch genérico `fx:glow-pulse`. El Director hace pasada final.
3. Cero hardcoded colors salvo universales permitidos.
4. No tocar archivos fuera de su lista blanca.
5. Correr `scripts/verify-no-duplicate-fx.ts` antes de cerrar y reportar 0 errores.

---

## 5. Mecanismo de diálogo char-to-char

### Nuevo evento global

```ts
window.dispatchEvent(new CustomEvent('timeline:dialog', {
  detail: {
    eventId: 'akedah-sacrificio-isaac',
    speakerCharId: 'abraham',
    addresseeCharId: 'isaac',  // o null si no aplica
    text: 'Dios se proveerá el cordero, hijo mío.',
    holdMs: 4500,
  }
}));
```

### Archivo de datos por era — `src/lib/dialogs/{ERA_ID}.ts`

```ts
import type { DialogCue } from '../dialogTypes';

const DIALOGS: Record<string, DialogCue[]> = {
  'akedah-sacrificio-isaac': [
    {
      match: /padre m[íi]o.*el cordero|hijo m[íi]o.*holocausto/i,
      speaker: 'isaac',
      addressee: 'abraham',
      text: '¿Dónde está el cordero para el holocausto?',
      holdMs: 4200,
    },
    {
      match: /Dios se proveer[áa]|Dios proveer[áa]/i,
      speaker: 'abraham',
      addressee: 'isaac',
      text: 'Dios se proveerá el cordero, hijo mío.',
      holdMs: 4500,
    },
    {
      match: /no extiendas tu mano|no le hagas nada/i,
      speaker: 'yahve',        // virtual, sin pin → burbuja desde el cielo
      addressee: 'abraham',
      text: '¡Abraham, Abraham! No extiendas tu mano sobre el muchacho.',
      holdMs: 5000,
    },
  ],
  // ...
};
export default DIALOGS;
```

### Extensiones al loader y al renderer (las hace el Director)

**`narrationCues.ts`**
- Carga `dialogs/{era}.ts` además de `cues/{event}.ts`.
- Cada `DialogCue` se trata como un cue más: cuando match → dispatch `timeline:dialog`.

**`mapSpeechBubble.ts`**
- Listener nuevo para `timeline:dialog`.
- Si `speakerCharId` tiene pin → ancla la burbuja a ese pin (lógica actual reutilizada).
- Si es virtual (`'yahve'`, `'allah'`, `'angel-anonimo'`, etc.) → ancla a posición predefinida (parte superior centro del mapa) con estilo distinto: sin tail, cursiva, halo dorado.
- Si hay `addresseeCharId` → dibuja una línea curva sutil (`<path>` punteado) del speaker al addressee mientras la burbuja vive.
- Permitir hasta **2 burbujas simultáneas** (pregunta+respuesta superpuestas brevemente). Si llega una 3ª → cola FIFO.
- Auto-encolado: si llegan 2 dialog cues con holdMs solapado, el segundo entra en cola y espera (no se pisa).

### Speakers virtuales soportados (sin pin físico)

- `'yahve'` / `'allah'` / `'dios-padre'` → burbuja superior centro, halo dorado, cursiva.
- `'angel-anonimo'` → lateral superior, halo blanco.
- `'voz-multitud'` → burbuja inferior, sin tail, mayúsculas chicas.
- `'narrador-bíblico'` → reservado, no usar (lo hace el TTS).

### Eventos con diálogo obligatorio (lista guía)

- **primordial**: Caín↔Yahvé, Adán↔Eva, Noé↔Yahvé.
- **patriarcal**: Abraham↔Isaac (Akedá), Jacob↔Esaú, José↔hermanos.
- **exodo**: Yahvé↔Moisés (zarza), Moisés↔Faraón, Yahvé↔Moisés (Sinaí).
- **reinos-y-exilio**: David↔Goliat, Natán↔David, Salomón↔reina-de-saba, Elías↔baal-profetas.
- **evangelio**: Gabriel↔María, Jesús↔Pedro, Pilato↔Jesús, Jesús↔ladrón-bueno.
- **revelacion**: Gabriel↔Mahoma (Hira), Mahoma↔Quraysh, Mahoma↔seguidores.

---

## 6. Agente Guardian — cierre de era no prematuro

### Diagnóstico del bug

En `playMode.ts:251` se llama `emitEraEnded()` apenas `playOne` del último evento resuelve. `playOne` espera el `audio.ended`/`onEnd` del TTS, pero:

- Los cues regex se disparan en `onBoundary` / `onProgress` y pueden seguir hasta el último char.
- La choreography GSAP corre con `repeat: -1` y queda a mitad de ciclo.
- Las speech bubbles tienen `SHOW_MS = 5200` propio que sobrevive al `ended` del audio.
- El parchment empieza su propia narración TTS 700ms después de abrir → si la del último evento aún no se silenció hay solapamiento de voces.

### Fix

**Nuevo `src/lib/eraEndGuard.ts`** (~80 líneas, coordinador puro):

```ts
export async function awaitEraQuiescence(eventId: string): Promise<void> {
  await waitForTtsSilence();              // sin audio.playing ni speech.speaking
  await waitForLastCueToFire(eventId);    // último timeline:cue para ese event pasó
  await waitForBubblesToClose();          // [data-speech-bubble].is-visible === null
  await waitForChoreographyCycle(eventId); // un repeat completo del timeline GSAP
  await wait(GRACE_MS);                   // 2200ms para "saborear" la escena
}
```

**Cambio en `playMode.ts startPlay`:**

```ts
if (reachedEnd) {
  const lastScene = scenes[scenes.length - 1];
  await awaitEraQuiescence(lastScene?.dataset.eventId ?? '');
  emitEraEnded();
}
```

**Defensa en `EraClosingDialog.astro`:**

```ts
window.addEventListener('timeline:era-ended', async () => {
  await waitForTtsSilence(8000);   // doble guarda con timeout duro
  await waitForBubblesToClose(4000);
  open_();
});
```

### Constantes

```ts
const GRACE_MS                = 2200;   // pausa de respeto post-narración
const TTS_POLL_MS             = 200;
const CHOREO_CYCLE_TIMEOUT    = 6000;   // un loop completo de la escena final
const QUIESCENCE_TIMEOUT_MS   = 12000;  // hard ceiling para no colgar
```

### Eventos nuevos del sistema

- `timeline:tts-silent` — emitido por `tts.ts` cuando se vacía la cola y `audio.paused`.
- `timeline:cue-pulse` — emitido por `narrationCues.ts` cada vez que dispara un cue, con `{ eventId, isLast: boolean }`.

---

## 7. Validación e integración

### Scripts de verificación (suman a `npm run verify`)

**`scripts/verify-no-duplicate-fx.ts`** *(autoritativo)*
- Para cada evento: lee cues + scene-objects de su era.
- Tabla hardcoded de equivalencias (ark↔ark-boat, calf↔golden-calf, serpent↔serpent, tablets↔stone-tablets, etc.).
- ERROR si colisión.

**`scripts/verify-coverage.ts`**
- Para cada MDX: extrae sustantivos vs. `nounDictionary`.
- Verifica ≥80% tienen cue asociado.
- Reporta `[OK] 12/13 (92%)` o `[FAIL] 4/13 (30%)`.

**`scripts/verify-dialog-coverage.ts`**
- Detecta strings en `«…»`, `"…"`, `'…'` y patrones `dijo|respondió|exclamó|preguntó`.
- Verifica que cada uno tenga `DialogCue` registrado.

**`scripts/verify-choreography-depth.ts`**
- Cada evento debe tener ≥6 steps en `choreography/{era}.ts`.

**`scripts/verify-era-coherence.ts`**
- Grep prohibitivo: colores hex que no sean los universales permitidos.
- Resto debe usar `var(--era-*)`.

### Definición de "evento bien animado" (criterio de aceptación)

- ≥80% sustantivos del nounDictionary que aparecen en la narración tienen cue.
- Choreography con ≥6 steps.
- ≥1 scene-object presente.
- Si la narración contiene diálogo directo → ≥1 burbuja registrada.
- Todos los scripts de verificación pasan.

### Integración manual final (yo en main, no agentes)

1. `npm run build` (astro check + build) — debe pasar.
2. `npm run verify` con los nuevos scripts — debe pasar 0 errores.
3. `npm run dev` y recorrer las 6 eras en modo Play, screenshot por evento con agent-browser.
4. Regresiones puntuales → re-dispatch al agente responsable.
5. Test Playwright mínimo: el pergamino de cierre NO aparece mientras audio está playing.

---

## 8. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Agente-era inventa primitiva nueva por su cuenta y rompe consistencia | Regla 2 dura del prompt: prohibido inventar; deja TODO y usa fallback. Director hace pasada final. |
| Choreography con ciclo > duración TTS → loop visible feo | Director publica guía: duración total del timeline ≤ 8s, repeats limpios. Agente lo respeta. |
| `nounDictionary` queda corto y deja sustantivos sin cubrir | Coverage script reporta gaps; Director hace una segunda pasada agregando lo que faltó. |
| Burbujas char-to-char tapan el mapa cuando son densas | Cola FIFO + máximo 2 simultáneas + holdMs configurable por DialogCue. |
| Guardian se cuelga si un evento nunca termina narración | Timeout duro `QUIESCENCE_TIMEOUT_MS = 12s` después del cual emite era-ended igualmente. |
| Merge conflicts entre agentes paralelos | Propiedad estricta de archivos por agente, garantizada por design. |
| Modelo Sonnet entrega salida vacía o degradada en algún agente | Inspección manual del diff por agente antes de mergear; re-dispatch con prompt afinado si hace falta. |

---

## 9. Anexo: lista de archivos nuevos / modificados (referencia rápida)

**Nuevos**
- `src/lib/cues/nounDictionary.ts`
- `src/lib/dialogTypes.ts`
- `src/lib/eraEndGuard.ts`
- `src/lib/eraAmbient.ts` *(capa ambient C.3 que se monta una vez por era)*
- `src/lib/sceneObjects/index.ts`
- `src/lib/sceneObjects/animator.ts`
- `src/lib/sceneObjects/{primordial,patriarcal,exodo,reinos-y-exilio,evangelio,revelacion}.ts`
- `src/lib/dialogs/{primordial,patriarcal,exodo,reinos-y-exilio,evangelio,revelacion}.ts`
- `scripts/verify-no-duplicate-fx.ts`
- `scripts/verify-coverage.ts`
- `scripts/verify-dialog-coverage.ts`
- `scripts/verify-choreography-depth.ts`
- `scripts/verify-era-coherence.ts`
- `docs/superpowers/STYLE_GUIDE_ANIMACIONES.md`

**Modificados (extendidos, no rompiendo API)**
- `src/lib/narrationFx.ts`
- `src/lib/narrationCues.ts`
- `src/lib/mapSpeechBubble.ts`
- `src/lib/playMode.ts`
- `src/lib/tts.ts`
- `src/lib/cues/{121 archivos, uno por evento}.ts`
- `src/lib/choreography/{6 archivos por era}.ts`
- `src/components/EraClosingDialog.astro`
- `package.json` (npm run verify suma los 5 nuevos scripts)

**Eliminado**
- `src/lib/mapSceneObjects.ts` (reemplazado por `src/lib/sceneObjects/`)

---

© 2026 Federico Barroumeres · All Rights Reserved.
