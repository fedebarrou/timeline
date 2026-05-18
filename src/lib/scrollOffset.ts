/**
 * Computes the combined height of the sticky/fixed headers
 * (SiteNav + TimelineNav) so scroll targets land below them
 * and the "— AÑO N —" indicator stays visible.
 *
 * Measured live from the real DOM (getBoundingClientRect) rather than
 * the CSS vars, because the SiteNav contains an h-8 logo that makes its
 * real height (~56px) larger than the declared --site-nav-h (3rem = 48px).
 */
const BREATHING_ROOM_PX = 16;

export function getStickyHeaderOffset(): number {
  let offset = 0;
  const siteNav = document.querySelector<HTMLElement>('nav.site-nav');
  if (siteNav) offset += siteNav.getBoundingClientRect().height;
  const timelineNav = document.querySelector<HTMLElement>('[data-timeline-nav]');
  if (timelineNav) offset += timelineNav.getBoundingClientRect().height;
  // Small breathing room so the "— AÑO N —" pill isn't flush against the bar.
  return Math.ceil(offset) + BREATHING_ROOM_PX;
}

/**
 * Smoothly scrolls so the given element's "— AÑO N —" indicator (or its
 * top, if no year anchor is present) lands just below the sticky header.
 *
 * Why we prefer the year anchor: each .event-scene is min-h-[120vh] with
 * `flex flex-col justify-center`, so its actual content is centered far
 * below the section's `offsetTop`. Scrolling to the section top would
 * land the user in empty padding. The year <p data-event-year-anchor>
 * marks where the narrative actually begins.
 */
export function scrollToElement(el: HTMLElement, behavior: ScrollBehavior = 'smooth'): void {
  const headerOffset = getStickyHeaderOffset();
  const yearAnchor = el.querySelector<HTMLElement>('[data-event-year-anchor]');
  const anchor = yearAnchor ?? el;
  const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
  const target = Math.max(0, anchorTop - headerOffset);
  window.scrollTo({ top: target, behavior });
}
