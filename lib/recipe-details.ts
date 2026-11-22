// Deep recipe content (ingredients, method, provenance) sourced from the
// North African & Related Regional Recipe Compendium, July 2026 edition.
// Kept as a separate data module from lib/recipes.ts (which powers the
// homepage grid/cards) so the detail layer can grow without touching the
// homepage's data contract.
import raw from './data/recipe-details.json'
import { nutritionForIngredientText, type IngredientNutrition } from './nutrition'

export type IngredientEntry =
  | { type: 'item'; text: string; nutrition?: IngredientNutrition }
  | { type: 'group'; text: string }

export type NoteLabel = 'Accuracy note' | 'Safety note'

export type RecipeDetail = {
  id: number
  name: string
  originStatus: string
  yieldText: string
  timeText: string
  ingredientsHeader: 'Ingredients' | 'Materials'
  ingredients: IngredientEntry[]
  method: string[]
  noteLabel: NoteLabel
  accuracyNote: string
  crossRefCodes: string[]
  /** Optional kitchen tip from the finalized recipe development pass. */
  chefsNote?: string
  /** Free-text names of the web sources consulted while finalizing the recipe.
   * Rendered as attributions; linked when the name resolves to a known source. */
  finalizedSources?: string[]
}

// Build-time nutrition join: each ingredient item is annotated with its
// verified per-100g values from the committed TrueAPI ingredient dictionary
// (USDA FoodData Central). Items without a verified match keep nutrition
// undefined and render nothing — never invented numbers. No runtime API
// calls; refresh with:
//   DICTIONARY_PATH=<updated bundle> node scripts/build-nutrition.mjs
// Mombar's ingredient mappings contain invalid per-100 g values. Withhold
// all nutrition on this recipe until those mappings have been verified.
const NUTRITION_REVIEW_RECIPE_IDS = new Set([25])

export const RECIPE_DETAILS: RecipeDetail[] = (raw as RecipeDetail[]).map((detail) => ({
  ...detail,
  ingredients: detail.ingredients.map((entry) =>
    entry.type === 'item'
      ? {
          ...entry,
          nutrition: NUTRITION_REVIEW_RECIPE_IDS.has(detail.id)
            ? undefined
            : nutritionForIngredientText(entry.text) ?? undefined,
        }
      : entry,
  ),
}))

const BY_ID = new Map<number, RecipeDetail>(RECIPE_DETAILS.map((r) => [r.id, r]))

export function getRecipeDetail(id: number): RecipeDetail | undefined {
  return BY_ID.get(id)
}
