import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { RECIPES } from '../lib/recipes.ts'

// Isolate both configuration paths. No request or affiliate link is published.
delete process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG
const disabled = await import('../lib/affiliates.ts?disabled')
process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG = 'test-only'
const enabled = await import('../lib/affiliates.ts?enabled')
const details = JSON.parse(readFileSync(new URL('../lib/data/recipe-details.json', import.meta.url)))
const expectedItems = {
  11: [], 12: ['harissa-paste'], 13: ['harissa-paste', 'semolina-flour'], 15: [],
  16: ['argan-oil-culinary', 'semolina-flour'], 25: ['deep-fry-thermometer'],
  49: ['preserved-lemons', 'moroccan-olives'], 56: [], 63: [], 75: [],
}

for (const [id, expected] of Object.entries(expectedItems)) {
  test(`shop suggestions match the canonical ingredients and equipment for recipe ${id}`, () => {
    const recipe = RECIPES.find(row => row.id === Number(id))
    const detail = details.find(row => row.id === recipe.id)
    const items = detail.ingredients.filter(i => i.type === 'item').map(i => i.text)
    assert.deepEqual(disabled.shopLinksForRecipe(recipe, items), [])
    assert.deepEqual(enabled.shopLinksForRecipe(recipe, items).map(link => link.id), expected)
  })
}
