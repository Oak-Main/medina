// Query-aligned <title>/<meta description> helpers for the 2026-09-29
// page-two SERP push. Query/position data lives in the PR description;
// overrides exist only where the ranking query's phrasing differs from the
// dish name. Facts (region, category, blurb) stay as authored in recipes.ts.
// Titles carry no brand suffix here — app/layout.tsx appends the site name
// via its title template, and the SERP budget is ~60 characters (the first
// deploy doubled the suffix; this keeps titles single-branded).
import type { Recipe } from './recipes'

// id -> title text (brand appended by the layout template).
const TITLE_OVERRIDES: Record<number, string> = {
  // GSC Sep: "bakoula" pos 14, "bakoula recipe" 10, "bakoula moroccan" 11
  49: 'Bakoula Recipe — Moroccan Mallow Stew',
  // GSC Sep: "amlou msemen" pos 6
  16: 'Amlou Msemen Recipe — Moroccan Flatbread',
  // GSC Sep: "algerian crepes" pos 12
  13: 'Mahjouba — Algerian Crêpes Recipe',
  // GSC 2026-10-04 striking band (food batch C): exact-query titles.
  11: 'Chapati Zanzibari Recipe — Coconut Flatbread',
  15: 'Babbouche Recipe — Moroccan Snail Broth',
  25: 'Mombar Recipe — Egyptian Rice Sausage',
  26: 'Kaak Warka Recipe — Tunisian Almond Rings',
  46: 'Camel Tagine Recipe — Moroccan Camel Meat Stew',
  54: 'Stuffed Tripe Recipe — Osban Sausage',
  56: 'Dfina Recipe — Moroccan Sabbath Stew',
  // W2 watchtower striking additions (2026-10-12): bocadillo 11.1/12i, berkoukes 20.4/5i.
  5: 'Bocadillo de Calamares — Fried Squid Sandwich Recipe',
  57: 'Berkoukes — Algerian Pearl Couscous Stew Recipe',
}

const DESCRIPTION_OVERRIDES: Record<number, string> = {
  49: 'How to cook bakoula, the Moroccan mallow greens dish — wilted with garlic, olives, and preserved lemon.',
  16: 'Msemen with amlou: flaky Moroccan flatbread squares dipped in almond-argan spread, from Agadir.',
  // GSC 2026-10-04 striking band (food batch C): answer-led, grounded in the
  // authored blurbs in lib/recipes.ts.
  11: 'Chapati ya nazi — Zanzibar coconut flatbread: ghee-brushed dough coiled, rolled, and griddled into flaky Swahili layers.',
  15: 'Babbouche is Marrakech snail broth, steeped like herbal tea with wormwood and orange peel — the night-market bowl.',
  25: 'Mombar: casings stuffed with herbed rice, boiled tender, then deep-fried golden — Giza street food.',
  26: 'Kaak warka: rosewater pastry rings wrapped around sweet almond marzipan — Tunis celebration baking.',
  46: 'Camel tagine: Saharan camel meat slow-cooked with Moroccan savory spices — the deep camel-meat stew.',
  54: 'Osban — tripe casings packed with rice, herbs, and chickpeas, gently simmered: the stuffed-tripe sausage of Gabès.',
  56: 'Dfina — Sabbath beef, chickpeas, potatoes, and shell-on eggs, cooked overnight: the Moroccan Sabbath stew.',
  5: 'Bocadillo de calamares: flour-dusted fried squid rings packed into a crusty baguette with lemon — the Tangier street sandwich, 25 minutes.',
  57: 'Berkoukes: hand-rolled semolina pearls stewed in a hearty vegetable-chickpea broth — the Algerian comfort one-pot.',
}

export function recipeSeoTitle(recipe: Recipe): string {
  return TITLE_OVERRIDES[recipe.id] ?? `${recipe.name} Recipe`
}

export function recipeSeoDescription(recipe: Recipe): string {
  const base =
    DESCRIPTION_OVERRIDES[recipe.id] ??
    `${recipe.blurb} Traditional recipe from ${recipe.region}.`
  return base.slice(0, 155)
}
