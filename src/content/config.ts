import { defineCollection, z } from 'astro:content';

const eras = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    order: z.number().int(),
    name: z.string(),
    tagline: z.string(),
    yearRange: z.object({ from: z.number(), to: z.number() }),
    gregorianRange: z.object({ from: z.number(), to: z.number() }),
    palette: z.object({
      bg: z.string(),
      bgGradient: z.string(),
      surface: z.string(),
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
      text: z.string(),
      muted: z.string(),
      border: z.string(),
    }),
    typography: z.object({
      display: z.string(),
      body: z.string(),
      ui: z.string(),
      displayWeight: z.number(),
      letterSpacing: z.string(),
    }),
    texture: z.object({
      type: z.string(),
      url: z.string(),
      blendMode: z.string(),
      opacity: z.number(),
    }),
    motifs: z.object({
      ornaments: z.array(z.string()),
      dividers: z.string(),
      iconStyle: z.string(),
    }),
    map: z.object({
      paperColor: z.string(),
      landStroke: z.string(),
      landFill: z.string(),
      waterStyle: z.string(),
      routeStyle: z.string(),
      labelFont: z.string(),
      labelColor: z.string(),
    }),
    ambience: z.object({
      particles: z.string().nullable(),
      sound: z.string().nullable(),
      scrollFeel: z.string(),
    }),
    transition: z.object({
      intoNext: z.string(),
      duration: z.number(),
    }),
  }),
});

export const collections = { eras };
