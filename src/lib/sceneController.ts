import { gsap, ScrollTrigger, setEra } from './scrollytelling';
import { activateMarker, showEventTitleToast, isFocusLocked, resetFocusLock } from './mapMarkers';
import { panTo, fitBounds, fitMarkerBBox } from './mapCamera';
import { triggerSandstorm } from './mapSandstorm';
import { flyModern } from './mapToggle';
import { drawJourney, clearJourneys } from './mapJourneys';
import { renderSceneObjects, clearSceneObjects } from './mapSceneObjects';
import { runChoreography, stopChoreography } from './characterChoreography';
import { getSvgSceneZoom, getSceneZoom, getJourneyPaddingPct } from './mapModern';

export interface SceneConfig {
  eventId: string;
  eraId: string;
  title?: string;
  svgPosition: [number, number];
  coords?: [number, number];
  modernName?: string;
  journeys?: { from: [number, number]; to: [number, number]; style: 'boat' | 'walking' | 'caravan' | 'exile' }[];
}

export function initScrollytelling(scenes: SceneConfig[]) {
  const svg = document.querySelector<SVGSVGElement>('[data-map-root]');
  if (!svg) return;

  // Map: eventId → SceneConfig so external callers (playMode in fullscreen)
  // can request an activate() without depending on ScrollTrigger firing.
  const scenesById = new Map<string, SceneConfig>();
  scenes.forEach((s) => scenesById.set(s.eventId, s));
  window.addEventListener('biblia:request-activate', (e: Event) => {
    const detail = (e as CustomEvent<{ eventId?: string }>).detail;
    if (!detail?.eventId) return;
    const scene = scenesById.get(detail.eventId);
    if (scene) activate(scene, svg, /* fromRequest */ true);
  });

  /* Track every ScrollTrigger we create so we can disable+re-enable them
     when the user toggles fullscreen mode. Disabling them during
     fullscreen prevents the `display:none` collapse on `.scenes` from
     polluting ScrollTrigger's internal "is-entered" state, which used
     to leave the map frozen after exiting fullscreen. */
  const sceneTriggers: ScrollTrigger[] = [];

  scenes.forEach((scene) => {
    const sceneEl = document.querySelector<HTMLElement>(`[data-event-scene][data-event-id="${scene.eventId}"]`);
    if (!sceneEl) return;

    /* The scene wrapper is `min-h-[120vh]` with a vertically-centered narrative.
       Using it as the ScrollTrigger means TWO neighbouring scenes overlap the
       activation zone — the later one wins because its onEnter fires last,
       which manifests as "the next event is shown while I'm reading the
       current one". We use the year-anchor element instead: it sits near the
       top of each narrative, at a unique vertical position per scene, so
       triggers never overlap. The activation now fires precisely when the
       year crosses the viewport's 45% line — i.e., right as the user begins
       to read that event's content. */
    const yearAnchor = sceneEl.querySelector<HTMLElement>('[data-event-year-anchor]') ?? sceneEl;

    const trig = ScrollTrigger.create({
      trigger: yearAnchor,
      start: 'top 45%',
      end: 'bottom 45%',
      onEnter: () => activate(scene, svg, /* fromRequest */ false),
      onEnterBack: () => activate(scene, svg, /* fromRequest */ false),
    });
    sceneTriggers.push(trig);

    gsap.fromTo(
      sceneEl.querySelector('.narrative'),
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1, y: 0, duration: 0.8, ease: 'power1.out',
        scrollTrigger: { trigger: sceneEl, start: 'top 80%', end: 'top 30%', scrub: 0.5 },
      }
    );
  });

  /* Track the last active event id while in fullscreen so we can restore
     the marker to where the user actually is when they exit. playMode and
     FullscreenTimeline both broadcast `biblia:scene-changed` on every
     navigation. */
  let lastActiveEventId: string | null = null;
  window.addEventListener('biblia:scene-changed', (e: Event) => {
    const id = (e as CustomEvent<{ eventId?: string }>).detail?.eventId;
    if (id) lastActiveEventId = id;
  });

  /* Watch body[class] for fullscreen toggles. We disable scene triggers
     entirely while fullscreen is on (their year-anchors get collapsed by
     `display:none`, so any ScrollTrigger fire is bogus), and re-enable +
     refresh + re-activate the current event on exit. */
  const isFullscreen = () => document.body.classList.contains('map-fullscreen');
  let wasFullscreen = isFullscreen();
  const fsObserver = new MutationObserver(() => {
    const now = isFullscreen();
    if (now === wasFullscreen) return;
    wasFullscreen = now;
    if (now) {
      sceneTriggers.forEach((t) => t.disable());
    } else {
      sceneTriggers.forEach((t) => t.enable());
      // Refresh AFTER `.scenes` becomes visible again so positions are
      // recomputed from the real layout (a microtask isn't enough — the
      // layout repaint settles on the next animation frame).
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        // Re-activate the event the user actually left fullscreen on so
        // the marker / camera / choreography snap back to it instead of
        // whatever ScrollTrigger picks based on raw scroll position.
        if (lastActiveEventId) {
          const scene = scenesById.get(lastActiveEventId);
          if (scene) activate(scene, svg, /* fromRequest */ true);
        }
      });
    }
  });
  fsObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

/**
 * Module-scope memo of the most-recent eventId passed to activate(). Used
 * to detect "event actually changed" so we can hard-reset the global
 * focus-lock counter at the right moment (the previously-hovered pin's
 * mouseleave is unreliable when its pointer-events flips to none, and a
 * stuck lock froze the fullscreen play-advance — see activate()'s guard).
 */
let lastActivatedEventId: string | null = null;

function activate(scene: SceneConfig, svg: SVGSVGElement, fromRequest = false) {
  // In fullscreen mode the `.scenes` container is `display:none`, which
  // collapses every year-anchor to y=0 in the layout. ScrollTrigger's
  // refresh on the fullscreen-induced `resize` then fires `onEnterBack`
  // for ALL triggers in DOM order — the LAST one wins, snapping the
  // marker to the final event. Ignore those scroll-driven calls. The
  // playMode controller, FullscreenTimeline dots, and EventNavArrows
  // all go through `biblia:request-activate` (fromRequest=true), so the
  // explicit user gestures still work normally.
  if (!fromRequest && document.body.classList.contains('map-fullscreen')) return;
  // Don't yank the camera/marker away while the user is hovering on a
  // character pin or location portrait — their focus should win over a
  // scroll-driven scene swap. mapMarkers.ts ups the lock on mouseenter
  // of any pin/portrait and releases on mouseleave.
  //
  // BUT: an explicit user gesture (play-mode auto-advance, FullscreenTimeline
  // dot/arrow click, EventNavArrows, keyboard) goes through
  // `biblia:request-activate` with fromRequest=true and MUST bypass the
  // lock — otherwise a stale lock (the browser sometimes drops `mouseleave`
  // when pointer-events flips to none under the cursor, especially in
  // fullscreen) freezes the map on the previous event forever.
  if (!fromRequest && isFocusLocked()) return;
  // Hard-reset the lock whenever a new event becomes active. The pin that
  // raised the lock on mouseenter is about to have pointer-events:none
  // applied by activateMarker(), so the matching mouseleave is unreliable.
  // Clearing here keeps subsequent scroll-driven activates working.
  if (lastActivatedEventId !== scene.eventId) {
    resetFocusLock();
  }
  lastActivatedEventId = scene.eventId;
  setEra(scene.eraId);
  activateMarker(svg, scene.eventId);
  stopChoreography();
  runChoreography(svg, scene.eventId);
  clearSceneObjects(svg);
  renderSceneObjects(svg, scene.eventId, scene.svgPosition);
  clearJourneys(svg);

  // Sandstorm — particles converge on the marker & every character pin
  // when a new scene activates. Read the pin offsets from the rendered
  // marker group so they match what the user will see.
  const sandTargets: [number, number][] = [scene.svgPosition];
  const markerGroup = svg.querySelector<SVGGElement>(`[data-marker="${scene.eventId}"]`);
  if (markerGroup) {
    markerGroup.querySelectorAll<SVGGElement>('[data-char-pin-wrap]').forEach((pin) => {
      const t = pin.getAttribute('transform') ?? '';
      const m = /translate\(\s*(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)\s*\)/.exec(t);
      if (m) sandTargets.push([scene.svgPosition[0] + parseFloat(m[1]), scene.svgPosition[1] + parseFloat(m[2])]);
    });
  }
  triggerSandstorm(svg, sandTargets);

  if (scene.journeys && scene.journeys.length > 0) {
    // Draw each journey first so they're part of the marker group bbox.
    scene.journeys.forEach((j) => {
      drawJourney(svg, {
        id: `${scene.eventId}-journey-${j.from.join(',')}-${j.to.join(',')}`,
        from: j.from,
        to: j.to,
        style: j.style,
      });
    });
    // Include origin/destination in the bbox so all journey points stay visible.
    const allPts: [number, number][] = [];
    scene.journeys.forEach((j) => { allPts.push(j.from); allPts.push(j.to); });
    const fit = fitMarkerBBox(svg, scene.eventId, {
      extraPoints: allPts,
      paddingPct: getJourneyPaddingPct(),
      maxZoom: 2.4,
      minZoom: 1.0,
      duration: 2.0,
    });
    if (!fit) fitBounds(svg, allPts, getJourneyPaddingPct(), 2.0);
  } else {
    /* Bbox-based fit so EVERY element (marker + pins + location portrait)
       stays in frame. Falls back to the fixed-zoom panTo if the marker
       group isn't ready yet (e.g. very first frame after navigation). */
    const fit = fitMarkerBBox(svg, scene.eventId, {
      paddingPct: 0.35,
      maxZoom: Math.max(getSvgSceneZoom(), 2.5),  // ensure at least 2.5 zoom on wide bboxes
      minZoom: 2.3,                                // always meaningfully zoomed in for drama
      duration: 2.0,
    });
    if (!fit) {
      panTo(svg, { cx: scene.svgPosition[0], cy: scene.svgPosition[1], zoom: getSvgSceneZoom() }, 2.0);
    }
  }

  if (scene.coords) flyModern(scene.coords, getSceneZoom());

  // Event title toast (prominent)
  if (scene.title) showEventTitleToast(scene.title);

  // Notify floating fullscreen controls so they reset their idle/hide timer
  // and re-show the timeline pill on every scene change.
  try {
    window.dispatchEvent(new CustomEvent('biblia:scene-changed', { detail: { eventId: scene.eventId } }));
  } catch {}
}
