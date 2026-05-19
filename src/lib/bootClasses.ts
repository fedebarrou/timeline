export function applyBootClasses(nav: Navigator, doc: Document): void {
  try {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      doc.body.classList.add('is-touch');
    }
  } catch { /* matchMedia missing in SSR */ }
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) {
    doc.body.classList.add('fx-reduced');
  }
}
