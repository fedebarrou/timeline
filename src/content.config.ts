import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const eras = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/eras' }),
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

const proposedLocationSchema = z.object({
  name: z.string(),
  coords: z.tuple([z.number(), z.number()]),
  svgPosition: z.tuple([z.number(), z.number()]),
  support: z.string(),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/locations' }),
  schema: z.object({
    id: z.string(),
    ancientName: z.string(),
    modernName: z.string().optional(),
    portrait: z.string().optional(),
    coords: z.tuple([z.number(), z.number()]).optional(),
    svgPosition: z.tuple([z.number(), z.number()]).optional(),
    region: z.string(),
    disputed: z.boolean().default(false),
    proposedLocations: z.array(proposedLocationSchema).optional(),
    description: z.string(),
    events: z.array(z.string()).default([]),
  }).refine(
    (data) => data.disputed ? !!data.proposedLocations : !!data.coords,
    { message: 'Disputed locations need proposedLocations; non-disputed need coords' }
  ),
});

const traditionMention = z.object({
  summary: z.string(),
  citation: z.string(),
  fullText: z.string(),
  keyDifferences: z.array(z.string()).default([]),
});

const sourceSchema = z.object({
  type: z.enum(['canonical', 'apocryphal', 'traditional', 'archaeological']),
  title: z.string(),
  weight: z.enum(['primary', 'secondary']).optional(),
  note: z.string().optional(),
});

const mediaItemSchema = z.object({
  src: z.string(),
  caption: z.string().optional(),
  credit: z.string(),
  license: z.enum(['public-domain', 'cc0', 'cc-by', 'cc-by-sa', 'open-access', 'fair-use', 'ai-generated']),
  source: z.string().optional(),
});

const videoSchema = z.object({
  provider: z.enum(['youtube', 'vimeo', 'internal']),
  id: z.string(),
  title: z.string().optional(),
  creator: z.string(),
  duration: z.string(),
  language: z.string().default('es'),
  label: z.string().optional(),
});

const deepDiveLinkSchema = z.object({
  tradition: z.enum(['tora', 'biblia', 'coran']).optional(),
  type: z.string().optional(),
  url: z.string().url(),
  label: z.string(),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/events' }),
  schema: z.object({
    id: z.string(),
    order: z.number().int(),
    title: z.string(),
    subtitle: z.string().optional(),
    biblicalYear: z.number(),
    gregorianYear: z.number(),
    duration: z.string().optional(),
    era: z.string(),
    locations: z.array(z.object({
      id: z.string(),
      role: z.enum(['origen', 'destino', 'escenario']),
      ancientName: z.string(),
      modernName: z.string().optional(),
      coords: z.tuple([z.number(), z.number()]).optional(),
      svgPosition: z.tuple([z.number(), z.number()]),
    })),
    journey: z.array(z.object({
      from: z.string(),
      to: z.string(),
      label: z.string(),
      style: z.enum(['boat', 'walking', 'caravan', 'exile']),
    })).default([]),
    characters: z.array(z.object({
      id: z.string(),
      role: z.string(),
      lore: z.string().optional(),
    })).default([]),
    tags: z.array(z.string()).default([]),
    precededBy: z.array(z.string()).default([]),
    followedBy: z.array(z.string()).default([]),
    comparative: z.object({
      unified: z.string(),
      divergent: z.boolean().default(false),
      tora: traditionMention.optional(),
      biblia: traditionMention.optional(),
      coran: traditionMention.optional(),
    }),
    sources: z.array(sourceSchema).default([]),
    trivia: z.array(z.string()).default([]),
    media: z.object({
      hero: mediaItemSchema.optional(),
      gallery: z.array(mediaItemSchema).default([]),
      video: videoSchema.optional(),
      illustration: z.object({
        src: z.string(),
        style: z.enum(['engraving', 'line', 'mosaic', 'geometry']),
      }).optional(),
      audio: z.string().nullable().default(null),
    }).default({ gallery: [], audio: null }),
    deepDive: z.object({
      originalTexts: z.array(deepDiveLinkSchema).default([]),
      academic: z.array(deepDiveLinkSchema).default([]),
      videos: z.array(videoSchema).default([]),
      archaeology: z.array(deepDiveLinkSchema).default([]),
    }).default({ originalTexts: [], academic: [], videos: [], archaeology: [] }),
  }),
});

const traditionRefSchema = z.object({
  book: z.string().optional(),
  sura: z.string().optional(),
  number: z.number().optional(),
  reference: z.string().optional(),
  verses: z.string().optional(),
  summary: z.string(),
  fullText: z.string().optional(),
});

const characters = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/characters' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    group: z.enum(['patriarcas', 'vigilantes', 'descendientes-cain', 'linaje-set']).optional(),
    portrait: z.string().optional(),
    avatar: z.string().optional(),
    alternateNames: z.object({
      hebrew: z.string().optional(),
      arabic: z.string().optional(),
      greek: z.string().optional(),
      meaning: z.string().optional(),
    }).default({}),
    birthYear: z.number().optional(),
    deathYear: z.number().optional(),
    ageAtDeath: z.number().optional(),
    parents: z.array(z.string()).default([]),
    spouse: z.string().optional(),
    children: z.array(z.string()).default([]),
    events: z.array(z.string()).default([]),
    mentions: z.object({
      tora: z.array(traditionRefSchema).default([]),
      biblia: z.array(traditionRefSchema).default([]),
      coran: z.array(traditionRefSchema).default([]),
    }).default({ tora: [], biblia: [], coran: [] }),
    extraBiblical: z.array(z.object({
      source: z.string(),
      summary: z.string(),
    })).default([]),
    roles: z.array(z.string()).default([]),
    titles: z.array(z.object({
      tradition: z.string(),
      title: z.string(),
    })).default([]),
    significance: z.string().optional(),
    trivia: z.array(z.string()).default([]),
  }),
});

export const collections = { eras, locations, events, characters };
