// The layout adds the brand once. Reviewed dish pages own their query-facing copy.
import { ANSWER_LED_RECIPES } from './answer-led'
import type { Recipe } from './recipes'

// id -> title text (brand appended by the layout template).
const TITLE_OVERRIDES: Record<number, string> = {
  26: 'Kaak Warka Recipe — Tunisian Almond Rings',
  46: 'Camel Tagine Recipe — Moroccan Camel Meat Stew',
  54: 'Stuffed Tripe Recipe — Osban Sausage',
  5: 'Bocadillo de Calamares — Fried Squid Sandwich Recipe',
  57: 'Berkoukes — Algerian Pearl Couscous Stew Recipe',
}

const DESCRIPTION_OVERRIDES: Record<number, string> = {
  26: 'Kaak warka: rosewater pastry rings wrapped around sweet almond marzipan — Tunis celebration baking.',
  46: 'Camel tagine: Saharan camel meat slow-cooked with Moroccan savory spices — the deep camel-meat stew.',
  54: 'Osban — tripe casings packed with rice, herbs, and chickpeas, gently simmered: the stuffed-tripe sausage of Gabès.',
  5: 'Bocadillo de calamares: flour-dusted fried squid rings packed into a crusty baguette with lemon — the Tangier street sandwich, 25 minutes.',
  57: 'Berkoukes: hand-rolled semolina pearls stewed in a hearty vegetable-chickpea broth — the Algerian comfort one-pot.',
}

export function recipeSeoTitle(recipe: Recipe): string {
  return ANSWER_LED_RECIPES[recipe.id]?.title ?? TITLE_OVERRIDES[recipe.id] ?? `${recipe.name} Recipe`
}

export function recipeSeoDescription(recipe: Recipe): string {
  const base =
    ANSWER_LED_RECIPES[recipe.id]?.description ??
    DESCRIPTION_OVERRIDES[recipe.id] ??
    `${recipe.blurb} Traditional recipe from ${recipe.region}.`
  return base.slice(0, 155)
}
