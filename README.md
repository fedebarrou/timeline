# Línea de Tiempo · Adán → Mahoma

Sitio web profesional de scrollytelling que compara los relatos de la
Torá, la Biblia y el Corán desde Adán hasta Mahoma, ubicando cada
evento en un mapa antiguo manuscrito.

**Autor**: Federico Barroumeres
**Contacto**: fbarroumeres@gmail.com
**Copyright**: © 2026 Federico Barroumeres. All Rights Reserved.

---

## Aviso de autoría y licencia

Este proyecto es **obra original** de Federico Barroumeres. El
repositorio es público por transparencia y referencia, pero **no es
open source**: redistribución, hosting público, comercialización o
trabajos derivados requieren autorización previa por escrito del autor.
Para detalles completos ver [`LICENSE`](./LICENSE).

> Si encontrás este proyecto desplegado, copiado o comercializado en
> otro lado sin permiso del autor, está violando esta licencia. El
> historial de commits público de GitHub funciona como evidencia
> fechada de autoría.

Para licenciamiento comercial, colaboración o cualquier uso fuera de
las condiciones del archivo `LICENSE`, escribir a
`fbarroumeres@gmail.com`.

---

## Stack

Astro · TypeScript · Tailwind · GSAP ScrollTrigger · Maplibre GL ·
Web Speech API · Edge TTS (audio pre-generado)

## Características principales

- 6 eras bíblicas (Primordial → Patriarcal → Éxodo → Reinos y Exilio →
  Evangelio → Revelación) cubriendo 121 eventos y 137 personajes.
- Comparativa Torá / Biblia / Corán por evento con texto neutro y
  contrastado.
- Mapa interactivo con marcadores, retratos de personajes con borde de
  canonicidad (canónico / apócrifo / tradicional) y rutas de viaje.
- Modo "Reproducir era" con narración text-to-speech y animaciones
  text-driven faithful: cuando la voz dice "serpiente de bronce"
  aparece una serpiente; al narrar "becerro de oro" surge un becerro;
  al decir "según la Torá" aparece una estrella de David, etc.
- 40 primitivas FX (figurativas + atmosféricas) reaccionando a regex
  patterns sobre el texto narrado, ~700 cues distribuidos en todos los
  eventos.
- Pergamino de fin de era con resumen y avance del próximo capítulo.
- Cursor SVG personalizado por era, rastro de partículas de arena
  sitewide, paleta de colores y tipografía propias por era.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Documentación interna

- Spec: `docs/superpowers/specs/2026-05-16-timeline-biblico-tora-coran-design.md`
- Plan: `docs/superpowers/plans/2026-05-16-plataforma-era-primordial.md`
- Material base: `reference/linea-tiempo.txt`

---

© 2026 Federico Barroumeres · All Rights Reserved.
