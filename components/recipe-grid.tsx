'use client'

import { useEffect, useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { CATEGORIES, RECIPES, type Category } from '@/lib/recipes'
import { RecipeCard } from '@/components/recipe-card'

type Filter = 'All' | Category

export function RecipeGrid({ query }: { query: string }) {
  const [filter, setFilter] = useState<Filter>('All')

  useEffect(() => {
    const applyHashFilter = () => {
      const slug = window.location.hash.slice(1)
      const category = CATEGORIES.find((entry) => entry.slug === slug)
      setFilter(category?.label ?? 'All')
    }

    applyHashFilter()
    window.addEventListener('hashchange', applyHashFilter)
    return () => window.removeEventListener('hashchange', applyHashFilter)
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(
    () =>
      RECIPES.filter((recipe) => {
        const matchesFilter = filter === 'All' || recipe.category === filter
        const matchesQuery =
          !normalizedQuery ||
          recipe.name.toLowerCase().includes(normalizedQuery) ||
          recipe.region.toLowerCase().includes(normalizedQuery) ||
          recipe.category.toLowerCase().includes(normalizedQuery)
        return matchesFilter && matchesQuery
      }),
    [filter, normalizedQuery],
  )

  const filters: Filter[] = ['All', ...CATEGORIES.map((category) => category.label)]

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8" aria-labelledby="recipe-index-heading">
      {CATEGORIES.map((category) => (
        <span key={category.slug} id={category.slug} className="block -translate-y-24" aria-hidden="true" />
      ))}

      <div className="flex flex-col gap-6 border-b border-border pb-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">The index</p>
            <h2 id="recipe-index-heading" className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
              120 culinary records
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-muted-foreground md:block">
            Browse records by region, heat, category, and culinary tradition.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter recipe records">
          {filters.map((option) => {
            const active = filter === option
            const count =
              option === 'All'
                ? RECIPES.length
                : RECIPES.filter((recipe) => recipe.category === option).length

            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={active}
                className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {option}
                <span className="ml-1.5 text-xs">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground" role="status" aria-live="polite" aria-atomic="true">
        Showing <span className="text-foreground">{filtered.length}</span>{' '}
        {filtered.length === 1 ? 'entry' : 'entries'}
        {normalizedQuery && (
          <>
            {' '}
            for “<span className="text-primary">{query}</span>”
          </>
        )}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
          <p className="font-serif text-2xl">No records found</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try a region such as “Fez” or a dish such as “tagine”.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </section>
  )
}
