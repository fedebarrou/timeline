import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setEra(eraId: string) {
  if (document.body.dataset.era !== eraId) {
    document.body.dataset.era = eraId;
  }
}

export function initEraTransition(sceneEl: HTMLElement, targetEraId: string) {
  ScrollTrigger.create({
    trigger: sceneEl,
    start: 'top 60%',
    end: 'bottom 40%',
    onEnter: () => setEra(targetEraId),
    onEnterBack: () => setEra(targetEraId),
  });
}

export { gsap, ScrollTrigger };
