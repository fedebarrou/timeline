# Línea de Tiempo Bíblica · Torá / Biblia / Corán — Diseño

**Fecha**: 2026-05-16
**Estado**: Aprobado por el usuario, listo para implementación
**Working dir**: `C:\Users\Federiking\Desktop\biblia`

---

## 1. Propósito

Construir una web profesional, cinematográfica e interactiva que presente una línea de tiempo unificada desde **Adán hasta Mahoma** (~4.500 años, ~80 eventos), comparando los relatos de la **Torá, la Biblia y el Corán**, ubicando geográficamente cada acontecimiento en un mapa, y mostrando las menciones de cada personaje en las escrituras de las tres tradiciones.

El sitio combina rigor investigativo (con etiquetado claro de fuentes canónicas, apócrifas, tradicionales y arqueológicas) con una experiencia visual narrativa que evoluciona estéticamente a medida que avanza el tiempo bíblico.

### Material base

El usuario aporta un archivo `Linea tiempo.txt` con ~30 eventos desde Adán (año 0) hasta la muerte de Eber (año 2187), incluyendo algunas referencias cruzadas al Corán. Este material se verifica, expande, completa hasta Mahoma, y se enriquece con citas textuales y referencias.

### Objetivos no funcionales

- Sitio público, gratuito de hostear, indexable por buscadores.
- Carga rápida (<2s en 4G), peso inicial controlado.
- Funcional en mobile (con UX adaptada).
- Accesible (WCAG AA, reduce-motion respetado, modo lectura sin animación disponible).

---

## 2. Alcance

### En alcance

- **80 eventos** aproximadamente, distribuidos en **6 eras visuales**:
  1. **Primordial** (año 0 – 1657) — Adán, Caín y Abel, Enoc, Matusalén, Diluvio
  2. **Patriarcal** (año 1657 – 2300) — Torre de Babel, Abraham, Sara, Ismael, Isaac, Jacob, las 12 tribus, José
  3. **Éxodo** (~año 2400 – 2600) — esclavitud en Egipto, Moisés, plagas, Mar Rojo, mandamientos, desierto
  4. **Reinos y Exilio** (~año 2900 – 3500) — David, Salomón, Templo, división, profetas, exilio babilónico, retorno
  5. **Evangelio** (~4 a.C. – 33 d.C.) — Jesús, ministerio, milagros, crucifixión, resurrección, Pentecostés, Pablo
  6. **Revelación** (~570 – 632 d.C.) — nacimiento de Mahoma, revelaciones, Hégira, conquista de la Meca, muerte
- Ficha completa por personaje principal (~50 personajes) con sus menciones en cada tradición.
- Mapa SVG manuscrito por era + toggle a mapa moderno (Maplibre GL).
- Comparativa en 3 columnas Torá / Biblia / Corán cuando hay divergencias.
- Páginas auxiliares: personajes, lugares, comparativa, fuentes, sobre.

### Fuera de alcance

- Audio narrativo (queda abierto a fase futura).
- Localización a otros idiomas (solo español inicialmente).
- Sistema de comentarios / cuentas de usuario.
- App nativa.

---

## 3. Decisiones tomadas

| Decisión | Elección |
|---|---|
| Alcance temporal | Adán → Mahoma (año 0 a 632 d.C.) |
| Layout principal | Scrollytelling cinematográfico con mapa lateral sticky |
| Estética base | Manuscrito antiguo |
| Sistema visual | 6 eras evolutivas (paleta, tipografía, textura, motivos, mapa cambian por era) |
| Comparativa entre tradiciones | 3 columnas paralelas cuando hay divergencias |
| Rigor de contenido | Todo incluido, etiquetado con badges: canónico / apócrifo / tradicional / arqueológico |
| Mapa principal | SVG ilustrado tipo manuscrito (evoluciona con cada era) |
| Mapa secundario | Toggle a Maplibre GL (mapa moderno dark) |
| Stack | Astro 5 + TypeScript + Tailwind CSS |
| Animaciones | GSAP ScrollTrigger + Motion One |
| Hosting | Vercel (free tier), Git en GitHub |

---

## 4. Experiencia (UX)

### Landing (`/`)

Hero con ilustración tipo grabado de las tres tradiciones convergiendo. Frase de bienvenida. CTA "Comenzar el viaje ↓". Debajo, índice navegable por era con todos los eventos como atajos.

Stats visuales: **80 eventos · 3 tradiciones · 6 eras · 4.500 años**.

### Experiencia scrollytelling (`/timeline`)

**Estructura visual**:

```
┌─────────────────────────────────────────────────────────────┐
│  [≡]   Línea de Tiempo · Adán → Mahoma   [🗺 mapa actual]  │
├──────────────────────┬──────────────────────────────────────┤
│   PANEL NARRATIVO    │           MAPA MANUSCRITO            │
│   (40%, scroll)      │           (60%, sticky)              │
│                      │                                      │
│  — AÑO 1656 —        │     SVG del mundo antiguo,           │
│  El Gran Diluvio     │     estilo de la era actual          │
│  [narrativa]         │                                      │
│  [3 col. comparativa]│     ✦ marker del evento              │
│  [fuentes con badges]│     ⤳ migración animándose          │
└──────────────────────┴──────────────────────────────────────┘
```

**Cómo se siente el scroll**:

1. Cada evento es una "scene" de ~120vh. Al entrar al viewport, se activa.
2. El **mapa es sticky** y persiste mientras cambia el panel narrativo.
3. **Transiciones del mapa**:
   - Mismo lugar → pulso del marker (~300ms)
   - Lugar cercano → pan/zoom suave (~1.2s)
   - Otro continente → zoom out, pan, zoom in (~2s)
   - Con `journey` → línea punteada se dibuja desde origen a destino mientras marker se desplaza
4. **Transiciones del panel narrativo**: fade-out hacia arriba del actual, fade-in desde abajo del siguiente. Bloque comparativo de 3 columnas entra con stagger 200ms entre tradiciones.
5. **Transición entre eras**: scene dedicada de viewport completo. Fade-out de paleta actual, frase de cierre, fade-in de la siguiente con nueva textura, motivos y estilo de mapa. ~3s. Scroll "engancha" momentáneamente para que se aprecie.

### Toggle "ver en mapa actual"

Botón en nav superior. Al activarlo: SVG manuscrito hace fade-out, aparece Maplibre GL con tiles minimalistas dark centrado en el mismo punto. Markers persisten con nombres modernos. Toggle off vuelve sin perder scroll.

### Navegación durante el scrollytelling

- **Barra de progreso lateral derecha** con marcadores de era. Click → salta.
- **Teclado**: `←` / `→` evento anterior/siguiente, `M` toggle mapa moderno, `Esc` vuelve al índice.
- **URLs profundas**: `/timeline#diluvio`, shareable.

### Bloque comparativo de 3 columnas

Solo se muestra cuando el evento tiene `comparative.divergent: true`.

```
┌─────────────────────────────────────────────────────────┐
│  Las tradiciones difieren                               │
├─────────────────┬──────────────────┬───────────────────┤
│  📜 TORÁ        │  ✝ BIBLIA        │  ☪ CORÁN         │
│  Génesis 7-9    │  Gn 7-9 · Hb 11  │  Hud · Nuh        │
│  [summary]      │  [summary]       │  [summary]        │
│  [+ ver cita]   │  [+ ver cita]    │  [+ ver cita]     │
└─────────────────┴──────────────────┴───────────────────┘
```

Diferencias clave resaltadas con `<mark>` del color de su tradición. Botón "ver cita" expande el `fullText` original.

### Páginas auxiliares

- **`/personajes`** — lista visual con mini-timeline de cada uno. Filtrable por era y por tradición.
- **`/personajes/[id]`** — perfil completo (ver sección 6).
- **`/lugares`** — lugares con eventos asociados.
- **`/comparativa`** — tabla filtrable de divergencias Torá/Biblia/Corán sin narrativa.
- **`/fuentes`** — índice académico de todas las referencias.
- **`/sobre`** — propósito, metodología, contacto.

### Mobile

- Layout vertical: mapa sticky en el tope de cada scene (~40vh).
- Las 3 columnas comparativas se vuelven tabs deslizables.
- Transiciones entre eras simplificadas (fade sin "enganche").

### Accesibilidad

- Reduce-motion: animaciones simplificadas a transiciones instantáneas.
- Modo lectura: toggle que presenta eventos como artículos verticales sin animación.
- Contraste WCAG AA en todas las paletas.

---

## 5. Sistema visual de eras

Cada era es un archivo JSON en `src/content/eras/<id>.json` que define un tema visual completo aplicado vía CSS variables al `<body>` cuando el scroll está dentro de esa era.

### Eras

| # | Era | Años bíblicos | Paleta dominante | Display | Textura | Mapa | Ambiente |
|---|---|---|---|---|---|---|---|
| 1 | Primordial | 0 – 1657 | Tierra quemada, brasa, ocre | Cinzel | Roca cavernaria | Contornos crudos, sin nombres | Brasas |
| 2 | Patriarcal | 1657 – 2300 | Dorado tenue, marrón, sepia | Trajan | Pergamino + cuneiforme | Mesopotamia detallada | Polvo del desierto |
| 3 | Éxodo | ~2400 – 2600 | Azul Nilo, dorado egipcio, lapislázuli | Monumental serif | Papiro + jeroglíficos | Egipto y Sinaí, Mar Rojo animado | Bruma del Nilo |
| 4a | Reinos | ~2900 – 3300 | Púrpura real, oro pleno, rojo | Trajan ornado | Tela bordada / oro batido | Israel detallado, Templo marcado | Incienso |
| 4b | Exilio | ~3300 – 3500 | Gris ceniza, azul melancólico | Estrecha y oscura | Tela rasgada | Babilonia, ríos del exilio | Lluvia tenue |
| 5 | Evangelio | ~4 a.C. – 33 d.C. | Oliva, marfil, dorado pálido, índigo | Cormorant caligráfica | Mosaico bizantino | Galilea, Judea, Roma | Luz suave |
| 6 | Revelación | ~570 – 632 d.C. | Azul profundo, turquesa, dorado islámico | Geometría con serifas | Arabescos, estrellas 8 puntas | Arabia, Meca, Medina | Estrellas del desierto |

### Esquema de era (JSON)

```json
{
  "id": "primordial",
  "order": 1,
  "name": "Primordial",
  "tagline": "Cuna del mundo",
  "yearRange": { "from": 0, "to": 1657 },
  "gregorianRange": { "from": -3760, "to": -2103 },
  "palette": {
    "bg": "#1a0f0a",
    "bgGradient": "linear-gradient(180deg,#1a0f0a 0%,#2a1810 100%)",
    "surface": "#2a1f17",
    "primary": "#d4a574",
    "secondary": "#8b5a3c",
    "accent": "#e8b87a",
    "text": "#e8d5b7",
    "muted": "rgba(232,213,183,.55)",
    "border": "rgba(212,165,116,.2)"
  },
  "typography": {
    "display": "'Cinzel', serif",
    "body": "'EB Garamond', Georgia, serif",
    "ui": "'Inter', system-ui",
    "displayWeight": 400,
    "letterSpacing": "0.08em"
  },
  "texture": {
    "type": "cave-rock",
    "url": "/textures/primordial.png",
    "blendMode": "multiply",
    "opacity": 0.12
  },
  "motifs": {
    "ornaments": ["/svg/motifs/primordial-glyph.svg"],
    "dividers": "/svg/motifs/primordial-divider.svg",
    "iconStyle": "crude"
  },
  "map": {
    "paperColor": "#2a1810",
    "landStroke": "#d4a574",
    "landFill": "transparent",
    "waterStyle": "wavy-lines",
    "routeStyle": "dashed-ember",
    "labelFont": "'Cinzel', serif",
    "labelColor": "#d4a574"
  },
  "ambience": {
    "particles": "embers",
    "sound": null,
    "scrollFeel": "heavy"
  },
  "transition": {
    "intoNext": "dawn-warming",
    "duration": 2000
  }
}
```

### Aplicación de temas

- El `<body>` recibe `data-era="primordial"`. El scrollytelling actualiza este atributo según el evento activo.
- Cada CSS de era (en `src/styles/eras/`) define `:root[data-era="primordial"] { --bg: ...; --primary: ...; }`.
- Transiciones entre eras interpolan colores y opacities con GSAP por ~2s.
- Texturas y motivos hacen fade-out / fade-in.
- Mapas se regeneran (mismas posiciones, diferente apariencia).

---

## 6. Sistema de mapa

### Mapa manuscrito (principal)

SVG construido a partir de un dataset GeoJSON simplificado de la región (Mesopotamia, Egipto, Levante, Arabia, Anatolia, Grecia, Roma). Estilizado por la era activa: papel, contornos de tierra, agua, rutas, tipografía de labels, todo definido por el JSON de era.

**Coordenadas en SVG**: cada `location` declara `svgPosition: [x, y]` en el sistema de coordenadas del SVG (viewBox fijo). Esto desacopla la posición de proyección moderna y permite "mapas estilizados" donde la geografía está ligeramente exagerada en favor de la legibilidad.

**Animaciones**:
- Marker del evento activo: pulso suave con halo dorado.
- Pan/zoom: GSAP anima viewBox del SVG.
- Migraciones (`journey`): líneas SVG se dibujan con `stroke-dasharray` animado.

### Mapa moderno (toggle)

Maplibre GL con tiles oscuros (estilo Carto Dark Matter o equivalente sin API key). Activado con botón de la nav o tecla `M`.

**Coordenadas reales**: cada `location` declara `coords: [lat, lng]` además del `svgPosition`.

**Comportamiento**: misma posición scroll, mismo evento activo. Los markers muestran tooltips con nombres modernos (`modernName`) en lugar de antiguos (`ancientName`).

### Localizaciones disputadas

Para lugares como el Edén, donde la identificación es académicamente disputada, el `location` tiene `disputed: true` y un array `proposedLocations` con 2-3 alternativas. El UI muestra un badge "localización disputada" y permite alternar entre las propuestas.

---

## 7. Modelo de datos

### Evento (`src/content/events/<id>.mdx`)

```yaml
---
id: "diluvio"
order: 12
title: "El Gran Diluvio"
subtitle: "Cuarenta días y cuarenta noches"
biblicalYear: 1656
gregorianYear: -2104
duration: "1 año"
era: "primordial"

locations:
  - id: "monte-ararat"
    role: "destino"        # origen | destino | escenario
    ancientName: "Ararat"
    modernName: "Monte Ararat, Turquía oriental"
    coords: [39.7, 44.3]
    svgPosition: [320, 180]

journey:
  - from: "tierra-pre-diluvio"
    to: "monte-ararat"
    label: "El arca a la deriva"
    style: "boat"          # boat | walking | caravan | exile

characters:
  - { id: "noe", role: "protagonista" }
  - { id: "matusalen", role: "muere-antes" }

tags: ["diluvio", "alianza", "juicio", "agua", "patriarca"]
precededBy: ["matusalen-muerte"]
followedBy: ["nacimiento-arfaxad"]

comparative:
  unified: "Texto narrativo único, o introducción..."
  divergent: true
  tora:
    summary: "..."
    citation: "Génesis 7:11-24"
    fullText: "..."
    keyDifferences: ["..."]
  biblia:
    summary: "..."
    citation: "Génesis 7-9; Hebreos 11:7; 2 Pedro 2:5"
    fullText: "..."
    keyDifferences: ["..."]
  coran:
    summary: "..."
    citation: "Sura Hud 25-49; Sura Nuh 1-28"
    fullText: "..."
    keyDifferences: ["..."]

sources:
  - { type: "canonical",      title: "Génesis 7-9",            weight: "primary" }
  - { type: "canonical",      title: "Sura Hud 25-49",         weight: "primary" }
  - { type: "apocryphal",     title: "Libro de Enoc 65-67" }
  - { type: "traditional",    title: "Midrash Tanjuma · Noé" }
  - { type: "archaeological", title: "Tablilla XI de Gilgamesh" }

trivia:
  - "Matusalén muere 7 días antes del diluvio..."
  - "El arco iris aparece como señal de la alianza"

media:
  hero:
    src: "/images/events/diluvio-hero.jpg"
    credit: "Gustave Doré, 1865"
    license: "public-domain"
    source: "Wikimedia Commons"
  gallery:
    - src: "/images/events/arca-miniatura-medieval.jpg"
      caption: "Miniatura del Beato de Liébana, siglo X"
      credit: "Biblioteca Nacional de España"
      license: "public-domain"
    - src: "/images/events/gilgamesh-tablilla.jpg"
      caption: "Tablilla XI de Gilgamesh, relato del diluvio sumerio"
      credit: "British Museum"
      license: "open-access"
  video:
    provider: "youtube"        # youtube | vimeo | internal
    id: "AaC65vCO_28"
    title: "Noé y el Diluvio"
    creator: "BibleProject"
    duration: "5:12"
    language: "es"
  illustration:
    src: "/svg/events/arca.svg"
    style: "engraving"          # engraving | line | mosaic | geometry
  audio: null                    # opcional: lectura narrada

deepDive:
  originalTexts:
    - { tradition: "tora",   url: "https://www.sefaria.org/Genesis.7?lang=es", label: "Génesis 7-9 en Sefaria" }
    - { tradition: "biblia", url: "https://www.biblegateway.com/passage/?search=Genesis+7-9&version=RVR1960", label: "Génesis 7-9 en BibleGateway" }
    - { tradition: "coran",  url: "https://quran.com/11?from=25&to=49", label: "Sura Hud 25-49 en Quran.com" }
  academic:
    - { type: "wikipedia", url: "https://es.wikipedia.org/wiki/Diluvio_universal", label: "Diluvio universal" }
    - { type: "article",   url: "https://www.bibleodyssey.org/...", label: "Bible Odyssey · The Flood and Ancient Near East" }
  videos:
    - { provider: "youtube", id: "AaC65vCO_28", creator: "BibleProject", duration: "5:12", label: "Noé y el Diluvio" }
    - { provider: "youtube", id: "...",         creator: "Khan Academy",  duration: "8:30", label: "La epopeya de Gilgamesh" }
  archaeology:
    - { url: "https://www.britishmuseum.org/collection/object/W_K-3375", label: "Tablilla XI de Gilgamesh · British Museum" }
---

## Cuerpo MDX

Texto narrativo, con componentes <Quote/>, <Compare/>, <MapZoom/>, etc.
```

### Personaje (`src/content/characters/<id>.mdx`)

```yaml
---
id: "noe"
name: "Noé"
alternateNames:
  hebrew: "נֹחַ (Noaj)"
  arabic: "نُوح (Nūh)"
  meaning: "Descanso / Consuelo"
birthYear: 1056
deathYear: 2006
ageAtDeath: 950
parents: ["lemec"]
spouse: "Naamah"
children: ["sem", "cam", "jafet"]
events: ["construccion-arca", "diluvio", "alianza-arcoiris", "muerte-noe"]

mentions:
  tora:
    - book: "Génesis"
      reference: "5:28-32"
      summary: "Nacimiento de Noé, hijo de Lemec"
      fullText: "Vivió Lamec ciento ochenta y dos años..."
    - book: "Génesis"
      reference: "6:8-9:29"
      summary: "Construcción del arca, diluvio, alianza, muerte"
      fullText: "..."
  biblia:
    - book: "Génesis"
      reference: "6-9"
      summary: "Mismas menciones que la Torá"
    - book: "Hebreos"
      reference: "11:7"
      summary: "Noé como ejemplo de fe"
      fullText: "Por la fe Noé, cuando fue advertido por Dios..."
    - book: "1 Pedro"
      reference: "3:20"
      summary: "El arca y el bautismo"
    - book: "2 Pedro"
      reference: "2:5"
      summary: "Predicador de justicia"
    - book: "Mateo"
      reference: "24:37-39"
      summary: "Comparación con la segunda venida"
  coran:
    - sura: "Nuh"
      number: 71
      verses: "1-28"
      summary: "Sura dedicada a Noé. Predica 950 años."
      fullText: "Enviamos a Noé a su pueblo..."
    - sura: "Hud"
      number: 11
      verses: "25-49"
      summary: "Diálogo, construcción, hijo incrédulo se ahoga"
    # ... 27 menciones más

extraBiblical:
  - { source: "Libro de Enoc 106",        summary: "Cuerpo brillante al nacer" }
  - { source: "Libro de los Jubileos",    summary: "División de la tierra entre hijos" }
  - { source: "Talmud · Sanedrín 108b",   summary: "Debates sobre su rectitud" }
  - { source: "Hadiz Bukhari 3:55:553",   summary: "Primer profeta post-Adán" }

roles: ["patriarca", "profeta", "salvador-humanidad"]
titles:
  - { tradition: "judaísmo",     title: "Tzadik (justo)" }
  - { tradition: "cristianismo", title: "Predicador de justicia" }
  - { tradition: "islam",        title: "Ulu al-Azm (de los 5 profetas mayores)" }

significance: |
  Por qué Noé es importante en cada tradición y cómo se interpretan sus actos.

trivia:
  - "Único humano descrito como 'caminando con Dios' además de Enoc"
  - "Las 3 tradiciones lo consideran profeta"
---

## Cuerpo MDX

Texto narrativo extenso sobre Noé.
```

### Lugar (`src/content/locations/<id>.json`)

```json
{
  "id": "monte-ararat",
  "ancientName": "Ararat",
  "modernName": "Monte Ararat, Turquía oriental",
  "coords": [39.7, 44.3],
  "svgPosition": [320, 180],
  "region": "anatolia",
  "disputed": false,
  "description": "Cima donde reposó el arca según las tres tradiciones.",
  "events": ["diluvio", "alianza-arcoiris"]
}
```

Para localizaciones disputadas:

```json
{
  "id": "eden",
  "disputed": true,
  "proposedLocations": [
    {
      "name": "Mesopotamia meridional (Tigris-Éufrates)",
      "coords": [31.0, 47.5],
      "svgPosition": [380, 230],
      "support": "Texto bíblico menciona Tigris y Éufrates"
    },
    {
      "name": "Meseta de Armenia",
      "coords": [40.0, 44.0],
      "svgPosition": [330, 170],
      "support": "Tradición rabínica"
    }
  ]
}
```

### Era (`src/content/eras/<id>.json`)

Ver sección 5.

---

## 8. Media y enlaces externos

Cada evento puede incluir imágenes, video y links a materiales externos para "profundizar". Esto enriquece el contenido sin saturar la experiencia principal del scrollytelling — los recursos viven en una sección expandible al final de cada evento.

### Imágenes

**Por evento** se manejan tres roles:

| Rol | Uso |
|---|---|
| `hero` | Imagen principal a casi pantalla completa que acompaña la lectura del evento |
| `gallery` | 2-4 imágenes adicionales (arte, miniaturas, mapas históricos, artefactos) en grid expandible |
| `illustration` | Grabado / dibujo de línea SVG integrado al panel narrativo, en estilo de la era activa |

**Fuentes de imágenes** (todas legalmente usables, con atribución visible):

- 🟢 **Wikimedia Commons / dominio público** — grabados de Gustave Doré (Biblia ilustrada 1865), pinturas renacentistas (Miguel Ángel, Caravaggio, Rembrandt), miniaturas medievales, mapas históricos
- 🟢 **Met Museum Open Access** — arte bíblico de alta resolución, dominio público
- 🟢 **British Museum, Louvre, Vaticano** — colecciones con licencia abierta (Tablilla de Gilgamesh, Códice Sinaítico, papiros)
- 🟢 **Unsplash / Pexels** — fotos modernas de locaciones (Monte Ararat, Petra, Jerusalén, Meca)
- 🟡 **AI-generadas** — para eventos sin material visual histórico. Estilo grabado siglo XIX. Etiquetadas como "ilustración generada"
- 🟡 **SVG custom** — iconos, ornamentos y motivos por era dibujados como parte del proyecto

### Videos

| Tipo | Uso |
|---|---|
| Embedded (YouTube / Vimeo) | Documentales y explicaciones cortas (1-5 min) de canales con embed permitido: BibleProject, Khan Academy, Yale Divinity, History Channel oficial, museos |
| Animaciones SVG propias | Migraciones complejas (40 años en el desierto, conquistas de Mahoma) hechas como animaciones SVG en el mapa |
| Clips de películas | **No incluidos por defecto** (riesgo de copyright). Solo si encontramos material Creative Commons |

Cada video se renderiza como botón "Ver explicación en video (X min) ↓" que abre reproductor inline con `loading="lazy"` para no impactar la carga inicial.

### Enlaces externos — "Profundizá"

Bloque expandible al final de cada evento con cuatro categorías:

1. **Texto original** — link directo al pasaje en su fuente canónica:
   - **[Sefaria.org](https://www.sefaria.org)** — Torá hebrea + traducción + comentarios rabínicos
   - **[BibleGateway.com](https://www.biblegateway.com)** — Biblia en múltiples traducciones (RVR60, NVI, etc.)
   - **[Quran.com](https://quran.com)** — Corán con traducciones múltiples y tafsir
2. **Material académico**:
   - Wikipedia (intro y referencias)
   - Bible Odyssey (sociedad bíblica académica)
   - Encyclopedia Britannica
   - Stanford Encyclopedia of Philosophy (temas teológicos)
3. **Videos** — documentales y explicaciones (BibleProject, Khan Academy, Yale, etc.)
4. **Arqueología y museos** — páginas oficiales de British Museum, Louvre, Met, Vaticano, etc.

**Renderizado**:

```
┌─────────────────────────────────────────────────────────┐
│  PROFUNDIZÁ EN ESTE EVENTO                              │
├─────────────────────────────────────────────────────────┤
│  📖 LEÉ EL TEXTO ORIGINAL                              │
│    → Génesis 7-9 en Sefaria.org (hebreo + español)     │
│    → Génesis 7-9 en BibleGateway (RV60 + NVI)          │
│    → Sura Hud 25-49 en Quran.com (árabe + español)     │
│                                                         │
│  🎥 VIDEOS                                             │
│    → "Noé y el Diluvio" · BibleProject (5 min)         │
│    → "La epopeya de Gilgamesh" · Khan Academy (8 min)  │
│                                                         │
│  🔍 MATERIAL ACADÉMICO                                 │
│    → Wikipedia · Diluvio universal                     │
│    → Bible Odyssey · The Flood and Ancient Near East   │
│                                                         │
│  🏛 ARQUEOLOGÍA Y MUSEOS                               │
│    → Tablilla XI de Gilgamesh · British Museum         │
└─────────────────────────────────────────────────────────┘
```

### Licencias, atribución y verificación

- **Cada imagen** muestra su crédito en hover/expand: autor, año, museo o repositorio, licencia.
- **Cada video** muestra el creador y enlace al canal original.
- **Schema del campo `license`** acepta valores cerrados: `public-domain` | `cc0` | `cc-by` | `cc-by-sa` | `open-access` | `fair-use` | `ai-generated`.
- **Pipeline de build verifica**:
  - Toda imagen tiene `credit` y `license`.
  - Las imágenes con licencia `fair-use` se marcan como warning (revisión manual).
  - Las URLs externas se chequean (HTTP 200) en build periódico — los links rotos se reportan.
- **Página `/fuentes`** consolida toda la lista de atribuciones en un índice navegable.

### Optimización de carga

- Imágenes servidas vía Astro `<Image>` (genera AVIF + WebP automáticamente, lazy load por defecto).
- Videos cargan solo cuando el usuario hace click (placeholder con thumbnail).
- Galería se carga al expandir, no en el render inicial.
- Los archivos pesados (>500KB) se hostean en un CDN externo (Cloudinary free tier o similar) si Vercel free tier resulta apretado en banda.

---

## 9. Research y verificación

### Fuentes primarias

- **Torá**: texto masorético (Génesis, Éxodo, Levítico, Números, Deuteronomio).
- **Biblia cristiana**: Reina-Valera 1960 y NVI (español); incluye NT cuando aporta interpretación.
- **Corán**: traducción Cortés (académica) + traducción de Asad para matices teológicos.

### Fuentes secundarias

- **Midrashim**: Bereshit Rabbá, Tanjuma, Pirkei de-Rabbí Eliezer.
- **Hadices**: Sahih Bukhari, Sahih Muslim.
- **Pseudepigrafía**: 1 Enoc, 2 Enoc, Libro de los Jubileos.
- **Padres de la Iglesia**: Agustín, Jerónimo (interpretación cristiana temprana).

### Arqueología e historia

- Para eventos con paralelos arqueológicos: Gilgamesh (diluvio), tablillas de Mari, ostraca de Laquis, papiros egipcios.
- Cronología comparada con dinastías egipcias y mesopotámicas conocidas.

### Geolocalización

- Identificaciones académicas aceptadas (Ur = Tell el-Muqayyar; Harán = Harran moderna en Turquía).
- Lugares disputados marcados con badge **"localización disputada"** y 2-3 alternativas mostradas.

### Verificación automática

Pipeline de build que valida:

1. Toda afirmación tiene cita textual o source identificada.
2. Divergencias entre tradiciones están textualmente verificadas (no inventadas).
3. Años explicitados en sistema bíblico **y** gregoriano.
4. Coordenadas geográficas válidas (no markers en el océano).
5. Referencias bíblicas existen — verificación contra dataset local de referencias (libros, capítulos, versículos) generado a partir de fuentes abiertas (ej. bible-api.com, quran.com API).

### Etiquetado de fuentes

Cada `source` tiene `type`:
- 🔵 **canonical** — texto canónico de la tradición (Torá, NT, Corán)
- 🟡 **apocryphal** — apócrifo/pseudepigráfico (Enoc, Jubileos)
- 🟢 **traditional** — tradición rabínica o islámica (midrashim, hadices)
- 🟤 **archaeological** — arqueología, paralelos históricos

Se renderiza con badge de color visible junto a cada referencia.

---

## 10. Stack y arquitectura

### Tecnologías

- **Astro 5** — framework estático; renderiza HTML puro + islas interactivas.
- **TypeScript** — autocompletado y validación de schemas de contenido.
- **Tailwind CSS** — utilidades + variables CSS por era.
- **GSAP ScrollTrigger** — animaciones del scrollytelling.
- **Motion One** — micro-interacciones más livianas.
- **Maplibre GL** — mapa moderno (toggle), sin API key.
- **D3-geo** — proyecciones para el SVG manuscrito.
- **MDX** — contenido enriquecido por evento y por personaje.
- **Astro Content Collections** — schemas tipados con Zod para events, characters, eras, locations.
- **Sharp** — optimización de imágenes en build.

### Hosting y despliegue

- **GitHub** repo público o privado.
- **Vercel** free tier, deploy automático en `push` a `main`.
- Dominio inicial: `<proyecto>.vercel.app`. Opción de dominio propio más adelante.

### Estructura del repositorio

```
biblia/
├── src/
│   ├── content/
│   │   ├── config.ts           # Zod schemas
│   │   ├── events/             # ~80 MDX, uno por evento
│   │   ├── characters/         # ~50 MDX, uno por personaje
│   │   ├── eras/               # 7 JSON (6 eras + 4b exilio)
│   │   └── locations/          # JSON con coordenadas
│   ├── components/
│   │   ├── EventScene.astro
│   │   ├── ManuscriptMap.astro
│   │   ├── ModernMapLayer.astro
│   │   ├── ComparativeBlock.astro
│   │   ├── EraTransition.astro
│   │   ├── SourceBadge.astro
│   │   ├── CharacterCard.astro
│   │   ├── CharacterTimeline.astro
│   │   └── ProgressBar.astro
│   ├── layouts/
│   │   └── Scrollytelling.astro
│   ├── styles/
│   │   ├── eras/               # 1 CSS por era
│   │   ├── tokens.css
│   │   └── global.css
│   ├── lib/
│   │   ├── scrollytelling.ts   # GSAP wrapper
│   │   ├── mapManuscript.ts    # lógica del SVG mapa
│   │   ├── mapModern.ts        # Maplibre GL wrapper
│   │   └── citations.ts        # verificación de citas
│   └── pages/
│       ├── index.astro
│       ├── timeline.astro
│       ├── personajes/
│       │   ├── index.astro
│       │   └── [id].astro
│       ├── lugares/
│       │   ├── index.astro
│       │   └── [id].astro
│       ├── comparativa.astro
│       ├── fuentes.astro
│       └── sobre.astro
├── public/
│   ├── maps/                   # GeoJSON base + SVGs por era
│   ├── textures/               # Pergamino, papiro, mosaico
│   ├── fonts/                  # Cormorant, EB Garamond, Cinzel, etc.
│   └── images/
├── scripts/
│   ├── verify-citations.ts     # Pre-build: valida referencias
│   └── seed-events.ts          # Generador inicial desde Linea tiempo.txt
├── docs/
│   └── superpowers/specs/
└── astro.config.mjs
```

---

## 11. Implementación

El usuario eligió hacer todo de una vez (sin fases). El plan de implementación (siguiente paso) decidirá la secuencia óptima de tareas, pero el spec define el alcance completo:

- 80 eventos con texto narrativo, comparativas, fuentes, locations.
- ~50 personajes con menciones en las 3 tradiciones, biografía y significado.
- 6 (+1) eras visuales con paleta, tipografía, textura, motivos y estilo de mapa propios.
- Mapa SVG manuscrito que se adapta por era + toggle a Maplibre GL moderno.
- Páginas: landing, timeline (scrollytelling), personajes, lugares, comparativa, fuentes, sobre.
- Mobile responsive, accesibilidad WCAG AA, modo lectura sin animación.
- Deploy en Vercel.

---

## 12. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Volumen de research (~80 eventos × 3 tradiciones × verificación) es alto | Pipeline de verificación automática contra dataset de citas; división por era; uso del archivo del usuario como punto de partida verificable |
| Animaciones del scrollytelling pesadas en mobile | Reduce-motion respetado; modo lectura como fallback; lazy-load de imágenes |
| Localizaciones disputadas pueden generar debate | Etiqueta explícita "localización disputada" con propuestas alternativas; nunca afirmamos una sola |
| Tradiciones con interpretaciones sensibles | Tono académico, citas textuales, sin opinar; el sitio describe lo que cada tradición dice, no juzga |
| 6 sistemas visuales distintos podrían sentirse inconsistentes | Cada era comparte estructura (h1, h2, panel comparativo, badges) — varía solo paleta/tipografía/textura/motivos |

---

## 13. Fuera de alcance (explícito)

- Audio narrativo / voz en off
- Localización a inglés, francés, árabe, hebreo
- Sistema de cuentas / favoritos / comentarios
- Apps nativas (iOS/Android)
- Versión imprimible / PDF
- Integración con redes sociales más allá de meta tags Open Graph
- Modo edición colaborativa
