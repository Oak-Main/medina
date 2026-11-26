// Source guide for the compendium's "Cross-check references." Every recipe
// cites at least two of these. Book entries use retailer search links tagged
// with the site's Associates ID (BOOK_CITATION_TAG) and render with
// rel="sponsored"; they stay separate from the optional shop module. Site
// entries (W#) and food-safety entries (FS#) link directly to the reference.
import { amazonBookUrl } from './affiliates'

export type SourceKind = 'book' | 'site' | 'food-safety'

export type Source = {
  code: string
  kind: SourceKind
  label: string
  url: string
}

export const SOURCES: Record<string, Source> = {
  B1: {
    code: 'B1',
    kind: 'book',
    label: "Paula Wolfert, The Food of Morocco (Ecco, 2011)",
    url: amazonBookUrl('Paula Wolfert The Food of Morocco book'),
  },
  B2: {
    code: 'B2',
    kind: 'book',
    label: 'Claudia Roden, Arabesque: A Taste of Morocco, Turkey, and Lebanon (Knopf, 2006)',
    url: amazonBookUrl('Claudia Roden Arabesque book'),
  },
  B3: {
    code: 'B3',
    kind: 'book',
    label: 'Claudia Roden, The New Book of Middle Eastern Food (Knopf, 2000)',
    url: amazonBookUrl('Claudia Roden New Book of Middle Eastern Food'),
  },
  B4: {
    code: 'B4',
    kind: 'book',
    label: 'Claudia Roden, The Book of Jewish Food (Knopf, 1996)',
    url: amazonBookUrl('Claudia Roden The Book of Jewish Food'),
  },
  B5: {
    code: 'B5',
    kind: 'book',
    label: 'Gil Marks, Encyclopedia of Jewish Food (Wiley, 2010)',
    url: amazonBookUrl('Gil Marks Encyclopedia of Jewish Food'),
  },
  B6: {
    code: 'B6',
    kind: 'book',
    label: 'Anissa Helou, Feast: Food of the Islamic World (Ecco, 2018)',
    url: amazonBookUrl('Anissa Helou Feast Food of the Islamic World'),
  },
  B7: {
    code: 'B7',
    kind: 'book',
    label: 'Suzanne Zeidy, Cairo Kitchen (Hardie Grant, 2013)',
    url: amazonBookUrl('Suzanne Zeidy Cairo Kitchen book'),
  },
  B8: {
    code: 'B8',
    kind: 'book',
    label: 'Jeff Koehler, Morocco: A Culinary Journey with Recipes (Chronicle Books, 2012)',
    url: amazonBookUrl('Jeff Koehler Morocco Culinary Journey'),
  },
  B9: {
    code: 'B9',
    kind: 'book',
    label: 'Nargisse Benkabbou, Casablanca: My Moroccan Food (Mitchell Beazley, 2018)',
    url: amazonBookUrl('Nargisse Benkabbou Casablanca My Moroccan Food'),
  },
  B10: {
    code: 'B10',
    kind: 'book',
    label: 'Janna Gur, Jewish Soul Food: From Minsk to Marrakesh (Schocken, 2014)',
    url: amazonBookUrl('Janna Gur Jewish Soul Food'),
  },
  W1: {
    code: 'W1',
    kind: 'site',
    label: 'Taste of Maroc — Moroccan cooking techniques and regional recipes',
    url: 'https://tasteofmaroc.com/',
  },
  W2: {
    code: 'W2',
    kind: 'site',
    label: "My Moroccan Food — Nargisse Benkabbou's Moroccan recipe archive",
    url: 'https://www.mymoroccanfood.com/',
  },
  W3: {
    code: 'W3',
    kind: 'site',
    label: 'My Moorish Plate — Moroccan and Maghrebi recipe archive',
    url: 'https://mymoorishplate.com/',
  },
  W4: {
    code: 'W4',
    kind: 'site',
    label: 'Our Tunisian Table — Tunisian family recipes and culinary context',
    url: 'https://www.ourtunisiantable.com/',
  },
  W5: {
    code: 'W5',
    kind: 'site',
    label: 'The Mediterranean Dish — regional recipe archive',
    url: 'https://www.themediterraneandish.com/',
  },
  W6: {
    code: 'W6',
    kind: 'site',
    label: 'Amira’s Pantry — Egyptian and Middle Eastern recipes',
    url: 'https://amiraspantry.com/',
  },
  W7: {
    code: 'W7',
    kind: 'site',
    label: 'The Matbakh — Egyptian and Arab home-cooking references',
    url: 'https://thematbakh.com/',
  },
  W8: {
    code: 'W8',
    kind: 'site',
    label: 'Serious Eats — technique-focused recipe testing',
    url: 'https://www.seriouseats.com/',
  },
  W9: {
    code: 'W9',
    kind: 'site',
    label: 'Saveur — international culinary reporting and tested recipes',
    url: 'https://www.saveur.com/',
  },
  W10: {
    code: 'W10',
    kind: 'site',
    label: 'Jewish Food Society — recipe archive from North African Jewish communities',
    url: 'https://www.jewishfoodsociety.org/collections/recipes-from-north-africas-jewish-communities',
  },
  W11: {
    code: 'W11',
    kind: 'site',
    label: 'The Nosher / My Jewish Learning — North African Jewish cuisine',
    url: 'https://www.myjewishlearning.com/the-nosher/the-jewish-cuisine-of-north-africa/',
  },
  W12: {
    code: 'W12',
    kind: 'site',
    label: 'Rhodes Jewish Museum — Sephardic Recipes by Sol Menashe',
    url: 'https://www.rhodesjewishmuseum.org/wp-content/uploads/2023/09/SEPHARDIC-RECIPES-by-Sol-Menashe.pdf',
  },
  W13: {
    code: 'W13',
    kind: 'site',
    label: "Spanish Sabores — Spanish culinary reference",
    url: 'https://spanishsabores.com/',
  },
  W14: {
    code: 'W14',
    kind: 'site',
    label: 'African Bites — East African technique reference',
    url: 'https://www.africanbites.com/',
  },
  W15: {
    code: 'W15',
    kind: 'site',
    label: '196 Flavors — international origin and recipe comparisons',
    url: 'https://www.196flavors.com/',
  },
  W16: {
    code: 'W16',
    kind: 'site',
    label: 'TasteAtlas — secondary origin and terminology cross-check',
    url: 'https://www.tasteatlas.com/',
  },
  FS1: {
    code: 'FS1',
    kind: 'food-safety',
    label: 'USDA FSIS — safe minimum internal temperature chart',
    url: 'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart',
  },
  FS2: {
    code: 'FS2',
    kind: 'food-safety',
    label: 'National Center for Home Food Preservation — pickling guidance',
    url: 'https://nchfp.uga.edu/how/pickle/general-information-pickling/',
  },
  FS3: {
    code: 'FS3',
    kind: 'food-safety',
    label: 'National Center for Home Food Preservation — garlic-in-oil guidance',
    url: 'https://nchfp.uga.edu/how/freeze/vegetable/freezing-garlic-in-oil/',
  },
  FS4: {
    code: 'FS4',
    kind: 'food-safety',
    label: 'FoodSafety.gov — safe minimum cooking temperatures',
    url: 'https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures',
  },
}

export function resolveSources(codes: string[]): Source[] {
  return codes.map((c) => SOURCES[c]).filter(Boolean)
}

// Maps the free-text web-source names captured during the finalized recipe
// development pass to a vetted URL, but ONLY when the name matches a source
// already present in the bibliography above. Unmatched names are shown as
// plain-text attributions (no fabricated links).
const FINALIZED_SOURCE_URLS: Record<string, string> = {
  'taste of maroc': SOURCES.W1.url,
  'my moroccan food': SOURCES.W2.url,
  'my moorish plate': SOURCES.W3.url,
  'our tunisian table': SOURCES.W4.url,
  'the mediterranean dish': SOURCES.W5.url,
  "amira's pantry": SOURCES.W6.url,
  'spanish sabores': SOURCES.W13.url,
  'jewish food society': SOURCES.W10.url,
  'tasteatlas': SOURCES.W16.url,
}

export type FinalizedSource = { name: string; url?: string }

export function resolveFinalizedSources(names: string[] | undefined): FinalizedSource[] {
  if (!names) return []
  return names.map((name) => {
    const url = FINALIZED_SOURCE_URLS[name.trim().toLowerCase()]
    return url ? { name, url } : { name }
  })
}
