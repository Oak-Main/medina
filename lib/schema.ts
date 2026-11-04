import type { AnswerLedRecipe } from './answer-led'
import type { Recipe } from './recipes'
import type { RecipeDetail } from './recipe-details'

export const SITE_URL = 'https://www.tasteofmedina.com'
export const SITE_NAME = 'The Maghreb Culinary Codex'

// This is the commit date for the current published recipe-record corpus.
// Keep it aligned with the documented content-review process; do not use it
// to imply that each recipe was kitchen-tested on this date.
export const RECIPE_RECORD_UPDATED_AT = '2026-07-13'

/** Best-effort ISO 8601 duration parse from freeform text like "1 hour 30 minutes".
 * Returns undefined when the text doesn't contain a clean, parseable time
 * (e.g. "Several hours", "Variable; depends on equipment") rather than guessing. */
export function parseIsoDuration(text: string): string | undefined {
  const hourMatch = text.match(/(\d+)\s*hour/i)
  const minuteMatch = text.match(/(\d+)\s*min/i)
  if (!hourMatch && !minuteMatch) return undefined
  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0
  if (hours === 0 && minutes === 0) return undefined
  let out = 'PT'
  if (hours) out += `${hours}H`
  if (minutes) out += `${minutes}M`
  return out
}

export function buildRecipeJsonLd(recipe: Recipe, detail: RecipeDetail, edition?: AnswerLedRecipe) {
  const ingredientLines: string[] = []
  for (const entry of detail.ingredients) {
    if (entry.type === 'item') {
      ingredientLines.push(entry.text)
    }
  }

  // A range or a duration excluding resting/soaking is not an exact total.
  const exactDuration = /^(?:\d+ hours?(?: \d+ minutes?)?|\d+ minutes?)$/i
  const totalTime = !edition || exactDuration.test(detail.timeText) ? parseIsoDuration(detail.timeText) : undefined

  const url = recipeUrl(recipe.id)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Recipe',
        '@id': `${url}#recipe`,
        name: recipe.name,
        description: edition?.description ?? detail.originStatus,
        image: [`${SITE_URL}${recipe.image}`],
        recipeCategory: edition?.dishType ?? recipe.category,
        recipeCuisine: edition?.cuisine ?? 'North African',
        recipeYield: detail.yieldText,
        ...(totalTime ? { totalTime } : {}),
        recipeIngredient: ingredientLines,
        recipeInstructions: detail.method.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          text: step,
        })),
        author: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
        },
        dateModified: RECIPE_RECORD_UPDATED_AT,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'The Maghreb Culinary Codex',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: recipe.name,
            item: url,
          },
        ],
      },
    ],
  }
}

export function recipeUrl(id: number): string {
  return `${SITE_URL}/recipes/${id}`
}
