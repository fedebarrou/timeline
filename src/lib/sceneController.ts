import { gsap, ScrollTrigger, setEra } from './scrollytelling';
import { activateMarker } from './mapMarkers';
import { panTo } from './mapCamera';
import { flyModern } from './mapToggle';
import { drawJourney, clearJourneys } from './mapJourneys';

export interface SceneConfig {
  eventId: string;
  eraId: string;
  svgPosition: [number, number];
  coords?: [number, number];
  journeys?: { from: [number, number]; to: [number, number]; style: 'boat' | 'walking' | 'caravan' | 'exile' }[];
}

export function initScrollytelling(scenes: SceneConfig[]) {
  const svg = document.querySelector<SVGSVGElement>('[data-map-root]');
  if (!svg) return;

  scenes.forEach((scene) => {
    const sceneEl = document.querySelector<HTMLElement>(`[data-event-scene][data-event-id="${scene.eventId}"]`);
    if (!sceneEl) return;

    ScrollTrigger.create({
      trigger: sceneEl,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => activate(scene, svg),
      onEnterBack: () => activate(scene, svg),
    });

    gsap.fromTo(
      sceneEl.querySelector('.narrative'),
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1, y: 0, duration: 0.8, ease: 'power1.out',
        scrollTrigger: { trigger: sceneEl, start: 'top 80%', end: 'top 30%', scrub: 0.5 },
      }
    );
  });
}

function activate(scene: SceneConfig, svg: SVGSVGElement) {
  setEra(scene.eraId);
  activateMarker(svg, scene.eventId);
  panTo(svg, { cx: scene.svgPosition[0], cy: scene.svgPosition[1], zoom: 3.0 }, 1.4);
  if (scene.coords) flyModern(scene.coords, 7);
  clearJourneys(svg);
  if (scene.journeys && scene.journeys.length > 0) {
    scene.journeys.forEach((j) => {
      drawJourney(svg, {
        id: `${scene.eventId}-journey-${j.from.join(',')}-${j.to.join(',')}`,
        from: j.from,
        to: j.to,
        style: j.style,
      });
    });
  }
}
