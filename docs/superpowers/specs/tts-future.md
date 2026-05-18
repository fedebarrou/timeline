# TTS — decisión actual y plan de futuro

## Decisión actual (mayo 2026)

Se eligió **Opción A: mejor uso de Web Speech API**.

Razones:
- Sitio 100% estático (Astro 6) sin backend. No hay un lugar seguro donde alojar una API key de ElevenLabs / Google Cloud / Polly.
- Costo cero, sin dependencias adicionales, sin aumento de bundle.
- En navegadores modernos (Edge / Chrome de escritorio) las voces neurales **Microsoft Pablo Online (Natural)** y similares son sorprendentemente buenas y se invocan vía la misma `speechSynthesis` API.

## Qué se implementó

Archivo: `src/lib/tts.ts`
- **Allow-list explícita** `PREMIUM_VOICE_CANDIDATES` de voces de alta calidad ordenadas por prioridad (Microsoft \*Online (Natural)\*, Google español, Apple Mónica/Paulina/Jorge Premium, etc.).
- `getPremiumSpanishVoices()` e `isPremiumVoice()` exportadas para que la UI las muestre destacadas.
- `scoreVoice()` ahora suma 1000 puntos a las voces del allow-list (con ranking por posición), y penaliza voces locales no-neurales.
- Defaults movidos a `rate=0.95`, `pitch=1.0` (más sereno, menos robótico).
- `addNaturalPauses()` inserta whitespace extra después de `.`, `!`, `?`, `:`, `;` para forzar breves respiraciones.
- Rate y pitch ahora son persistentes en `localStorage` (`timeline-tts-rate`, `timeline-tts-pitch`).

Archivo: `src/components/VoiceSettings.astro`
- El dropdown ahora agrupa voces en dos `<optgroup>`: **Recomendadas (premium)** y **Otras voces en español**.
- Dos sliders nuevos (Velocidad y Tono) con feedback en vivo, persistidos.

## Limitaciones que persisten

- En Safari móvil y Firefox las voces siguen siendo bastante robóticas (no exponen las "Natural" de Microsoft).
- La calidad depende del SO del visitante. No podemos garantizarla.
- `onboundary` no se dispara en todas las voces remotas → la barra de progreso puede quedar quieta con algunas voces (no se modificó este comportamiento).

## Migración futura a Opción C (pre-generar MP3s)

Cuando la calidad-Web-Speech ya no alcance, la migración natural es **pre-generar audio en build time** y servirlo estático.

Pasos sugeridos:

1. **Generador de audio** — script Node en `scripts/generate-tts.mjs`:
   - Recorre todos los eventos via `getCollection('events')` (mismo loader que las páginas).
   - Para cada evento extrae `narrationText` (la misma función que ya usa `playMode.ts`).
   - Genera MP3 usando una de estas opciones (gratis, sin key):
     - `edge-tts` (paquete npm `msedge-tts` o python `edge-tts`) — usa el endpoint público de Edge Read Aloud, voces neurales de Microsoft.
     - `gtts` (Google Translate TTS) — peor calidad, pero sin restricciones.
   - Guarda en `public/audio/{era}/{event-id}.mp3`.
   - Cachea por hash del texto para no regenerar si el texto no cambió (`public/audio/.cache.json`).

2. **Hook al build** — agregar `"prebuild": "node scripts/generate-tts.mjs"` en `package.json` para que cada `astro build` regenere los faltantes.

3. **Reproducción cliente** — modificar `src/lib/tts.ts`:
   ```ts
   export function speak(eventId, fallbackText) {
     const url = `/audio/${era}/${eventId}.mp3`;
     fetch(url, { method: 'HEAD' }).then((r) => {
       if (r.ok) playAudio(url);
       else fallbackToWebSpeech(fallbackText);  // mismo código actual
     });
   }
   ```
   - `playAudio` usa un `<audio>` HTMLAudioElement con `timeupdate` para alimentar `onProgressCb`.
   - Mantenemos Web Speech como fallback si el MP3 no existe (eventos recién agregados antes de build).

4. **Peso** — ~50-200 KB por evento, ~80 eventos → 4-16 MB total. Aceptable para un CDN estático (Cloudflare/Netlify), y los browsers cachean.

5. **Voces múltiples** — generar dos sets en paralelo (uno masculino, uno femenino) y dejar al usuario elegir en `VoiceSettings`.

### Costo estimado

- `edge-tts` no oficial: $0, pero podría romperse si Microsoft cambia el endpoint.
- ElevenLabs (más natural): tier gratis cubre ~10 min/mes — no alcanza. Tier Starter US$5/mes = 30 min/mes, suficiente para los textos pero requiere pagar.
- Recomendado: empezar con `edge-tts`, migrar a ElevenLabs si el endpoint cae.

## Cuándo migrar

Disparadores razonables:
- Si Google quita "Google español" de Chrome (riesgo bajo, pero posible).
- Si llegan visitantes mobile/Safari quejándose de la voz robótica.
- Si el contenido crece a >150 eventos y queremos ofrecer "modo audiolibro" continuo de alta calidad.
