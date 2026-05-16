import { gsap } from './scrollytelling';

type SceneObject = {
  /** Display name shown on hover */
  name: string;
  /** SVG markup (innerHTML of a <g> element) — must be valid SVG with var(--era-*) colors */
  svg: string;
  /** Position offset from the marker (svg pixels) */
  offset: [number, number];
  /** Optional GSAP animation factory; receives the <g> element. */
  animate?: (el: SVGGElement) => void;
};

const SCENE_OBJECTS: Record<string, SceneObject[]> = {
  'expulsion-eden': [
    {
      name: 'Árbol del conocimiento',
      // Tree
      offset: [-30, -10],
      svg: `
        <path d="M0 8 L0 -14 M-6 -10 Q0 -22 6 -10 M-4 -6 Q0 -16 4 -6 M-3 -2 Q0 -10 3 -2"
              stroke="var(--era-primary)" stroke-width="0.8" fill="none" />
        <circle cx="0" cy="-12" r="6" fill="var(--era-accent)" opacity="0.18" />
        <circle cx="0" cy="-8" r="1.2" fill="#e74c3c" opacity="0.85" />
      `,
    },
    {
      name: 'Espada flameante',
      // Flaming sword
      offset: [-20, -28],
      svg: `
        <path d="M0 0 L0 -10 L-1.5 -12 L0 -14 L1.5 -12 L0 -10"
              stroke="var(--era-accent)" stroke-width="0.6" fill="var(--era-accent)" opacity="0.7" />
        <path d="M-3 0 L3 0" stroke="var(--era-primary)" stroke-width="0.8" />
      `,
      animate: (el) => {
        gsap.to(el, { opacity: 0.9, duration: 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut', startAt: { opacity: 0.5 } });
      },
    },
  ],

  'cain-mata-abel': [
    {
      name: 'Altar (primera ofrenda)',
      // Altar (stone block) with smoke
      offset: [22, -5],
      svg: `
        <rect x="-4" y="-2" width="8" height="6" rx="0.5" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.5" />
        <path d="M0 -2 Q-2 -8 0 -12 Q2 -16 0 -20" stroke="var(--era-secondary)" stroke-width="0.6" fill="none" opacity="0.7" />
        <circle cx="0" cy="-4" r="1.5" fill="#e74c3c" opacity="0.6" />
      `,
      animate: (el) => {
        const path = el.querySelector('path');
        if (path) gsap.to(path, { y: -3, opacity: 0.4, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      },
    },
  ],

  'orden-construir-arca': [
    {
      name: 'El arca en construcción',
      // Ark frame (under construction)
      offset: [18, -8],
      svg: `
        <path d="M-10 0 L-7 -5 L7 -5 L10 0 Z" stroke="var(--era-primary)" stroke-width="0.6" fill="none" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="var(--era-primary)" stroke-width="0.5" />
        <line x1="-5" y1="-5" x2="-5" y2="0" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.6" />
        <line x1="0" y1="-5" x2="0" y2="0" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.6" />
        <line x1="5" y1="-5" x2="5" y2="0" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.6" />
      `,
    },
  ],

  'diluvio': [
    {
      name: 'El arca',
      // Ark afloat
      offset: [18, -3],
      svg: `
        <path d="M-10 0 Q0 4 10 0 L8 -5 L-8 -5 Z" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.6" />
        <rect x="-5" y="-8" width="10" height="3" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.4" />
      `,
      animate: (el) => {
        gsap.to(el, { y: '+=1.2', duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      },
    },
    {
      name: 'Lluvia de 40 días',
      // Rain — 6 drops cycling
      offset: [0, -25],
      svg: `
        <line x1="-15" y1="0" x2="-13" y2="5" stroke="var(--era-accent)" stroke-width="0.5" opacity="0.7" />
        <line x1="-8" y1="2" x2="-6" y2="7" stroke="var(--era-accent)" stroke-width="0.5" opacity="0.7" />
        <line x1="0" y1="0" x2="2" y2="5" stroke="var(--era-accent)" stroke-width="0.5" opacity="0.7" />
        <line x1="8" y1="3" x2="10" y2="8" stroke="var(--era-accent)" stroke-width="0.5" opacity="0.7" />
        <line x1="15" y1="1" x2="17" y2="6" stroke="var(--era-accent)" stroke-width="0.5" opacity="0.7" />
        <line x1="-3" y1="-3" x2="-1" y2="2" stroke="var(--era-accent)" stroke-width="0.5" opacity="0.7" />
      `,
      animate: (el) => {
        // Continuously move the rain group down then snap back
        gsap.fromTo(el, { y: -3 }, { y: 6, duration: 0.8, repeat: -1, ease: 'none' });
      },
    },
  ],

  'alianza-arcoiris': [
    {
      name: 'Arcoíris — señal de la alianza',
      // Rainbow arc
      offset: [0, -20],
      svg: `
        <path d="M-22 0 A 22 22 0 0 1 22 0" stroke="#e74c3c" stroke-width="2" fill="none" />
        <path d="M-19 0 A 19 19 0 0 1 19 0" stroke="#f39c12" stroke-width="2" fill="none" />
        <path d="M-16 0 A 16 16 0 0 1 16 0" stroke="#f1c40f" stroke-width="2" fill="none" />
        <path d="M-13 0 A 13 13 0 0 1 13 0" stroke="#27ae60" stroke-width="2" fill="none" />
        <path d="M-10 0 A 10 10 0 0 1 10 0" stroke="#3498db" stroke-width="2" fill="none" />
        <path d="M-7 0 A 7 7 0 0 1 7 0" stroke="#9b59b6" stroke-width="2" fill="none" />
      `,
    },
  ],

  'asuncion-enoc': [
    {
      name: 'Asunción de Enoc',
      // Upward arrow + small cloud
      offset: [0, -25],
      svg: `
        <ellipse cx="0" cy="0" rx="10" ry="3" fill="var(--era-surface)" stroke="var(--era-primary)" stroke-width="0.4" opacity="0.7" />
        <path d="M0 -3 L0 -14 M-3 -10 L0 -14 L3 -10" stroke="var(--era-accent)" stroke-width="0.8" fill="none" />
      `,
      animate: (el) => {
        gsap.to(el, { y: -4, opacity: 0.6, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      },
    },
  ],

  'nacimiento-adan-eva': [
    {
      name: 'Aliento de vida',
      // Sun rising (creation)
      offset: [-22, -15],
      svg: `
        <circle cx="0" cy="0" r="6" fill="var(--era-accent)" opacity="0.6" />
        <path d="M-10 0 L-8 0 M10 0 L8 0 M0 -10 L0 -8 M-7 -7 L-6 -6 M7 -7 L6 -6 M-7 7 L-6 6 M7 7 L6 6"
              stroke="var(--era-accent)" stroke-width="0.6" />
      `,
      animate: (el) => {
        const c = el.querySelector('circle');
        if (c) gsap.to(c, { r: 7, opacity: 0.8, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      },
    },
  ],
};

export function renderSceneObjects(svgRoot: SVGSVGElement, eventId: string, markerPos: [number, number]) {
  const layer = svgRoot.querySelector('[data-layer="scene-objects"]');
  if (!layer) return;
  // clear
  layer.innerHTML = '';

  const items = SCENE_OBJECTS[eventId];
  if (!items || items.length === 0) return;

  const ns = 'http://www.w3.org/2000/svg';
  items.forEach((obj, i) => {
    const g = document.createElementNS(ns, 'g') as SVGGElement;
    g.setAttribute('transform', `translate(${markerPos[0] + obj.offset[0]}, ${markerPos[1] + obj.offset[1]})`);
    g.setAttribute('data-scene-object', `${eventId}-${i}`);
    g.innerHTML = obj.svg;
    g.style.opacity = '0';
    g.style.pointerEvents = 'auto';
    g.style.cursor = 'help';

    // Native SVG <title> for accessibility / native tooltip
    const titleEl = document.createElementNS(ns, 'title');
    titleEl.textContent = obj.name;
    g.insertBefore(titleEl, g.firstChild);

    // Custom styled tooltip on hover
    const showTooltip = (e: MouseEvent) => {
      let tip = document.querySelector<HTMLElement>('[data-scene-tooltip]');
      if (!tip) {
        tip = document.createElement('div');
        tip.setAttribute('data-scene-tooltip', '');
        tip.style.position = 'fixed';
        tip.style.padding = '4px 10px';
        tip.style.background = 'var(--era-surface)';
        tip.style.border = '1px solid var(--era-primary)';
        tip.style.borderRadius = '999px';
        tip.style.fontFamily = "var(--era-display, 'Cinzel', serif)";
        tip.style.fontSize = '11px';
        tip.style.letterSpacing = '0.12em';
        tip.style.textTransform = 'uppercase';
        tip.style.color = 'var(--era-primary)';
        tip.style.pointerEvents = 'none';
        tip.style.zIndex = '60';
        tip.style.boxShadow = '0 4px 12px rgba(0,0,0,0.45)';
        tip.style.opacity = '0';
        tip.style.transition = 'opacity 120ms ease';
        document.body.appendChild(tip);
      }
      tip.textContent = obj.name;
      tip.style.left = `${e.clientX + 12}px`;
      tip.style.top = `${e.clientY + 12}px`;
      tip.style.opacity = '1';
    };
    const moveTooltip = (e: MouseEvent) => {
      const tip = document.querySelector<HTMLElement>('[data-scene-tooltip]');
      if (!tip) return;
      tip.style.left = `${e.clientX + 12}px`;
      tip.style.top = `${e.clientY + 12}px`;
    };
    const hideTooltip = () => {
      const tip = document.querySelector<HTMLElement>('[data-scene-tooltip]');
      if (!tip) return;
      tip.style.opacity = '0';
    };
    g.addEventListener('mouseenter', showTooltip);
    g.addEventListener('mousemove', moveTooltip);
    g.addEventListener('mouseleave', hideTooltip);

    layer.appendChild(g);
    gsap.fromTo(g, { opacity: 0, scale: 0.6 }, {
      opacity: 1, scale: 1, duration: 0.7, delay: 0.4 + i * 0.15, ease: 'power1.out',
      transformOrigin: '50% 50%',
    });
    if (obj.animate) obj.animate(g);
  });
}

export function clearSceneObjects(svgRoot: SVGSVGElement) {
  const layer = svgRoot.querySelector('[data-layer="scene-objects"]');
  if (!layer) return;
  layer.innerHTML = '';
  const tip = document.querySelector<HTMLElement>('[data-scene-tooltip]');
  if (tip) tip.style.opacity = '0';
}
