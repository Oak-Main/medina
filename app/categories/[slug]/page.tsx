import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DetailNav } from '@/components/recipe-detail/detail-nav'
import { RecipeCard } from '@/components/recipe-card'
import { SiteFooter } from '@/components/site-footer'
import { CATEGORIES, RECIPES } from '@/lib/recipes'
import { SITE_NAME, SITE_URL } from '@/lib/schema'

const STARTING_POINTS: Record<string, { note: string; ids: number[] }> = {
  'street-food': { note: 'Compare a filled pastry with potato fritters.', ids: [1, 3] },
  'tagines-stews': { note: 'Choose between a preserved-lemon chicken braise and tomato-sauce meatballs.', ids: [31, 33] },
  'sephardic-traditions': { note: 'Explore an egg dish alongside a spiced fish record.', ids: [61, 64] },
  condiments: { note: 'Compare a dried-chile paste with an herb marinade; each has its own ingredients and method.', ids: [91, 93] },
}

function getCategory(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug)
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}

  const url = `${SITE_URL}/categories/${category.slug}`
  const description = `${category.label} recipe records in The Maghreb Culinary Codex, a source-led North African and related regional food archive.`

  return {
    title: `${category.label} recipes`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.label} recipes`,
      description,
      type: 'website',
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.label} recipes`,
      description,
      images: ['/opengraph-image'],
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const recipes = RECIPES.filter((recipe) => recipe.category === category.label)
  const url = `${SITE_URL}/categories/${category.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.label} recipes`,
    description: `${category.label} recipe records in The Maghreb Culinary Codex.`,
    url,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <DetailNav />
      <main id="main-content" className="relative min-h-screen">
        <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 md:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link href="/" className="underline underline-offset-2 hover:text-primary">
              The Codex
            </Link>{' '}
            <span aria-hidden="true">/</span> {category.label}
          </nav>
          <p className="mt-10 text-xs uppercase tracking-[0.4em] text-primary">{category.note}</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            {category.label}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {recipes.length} editorial recipe records from North African and related regional food
            traditions. Use each entry&apos;s source and safety notes alongside your own judgment.
          </p>

          <aside className="mt-8 rounded-xl border border-border bg-card p-5" aria-labelledby="starting-points">
            <h2 id="starting-points" className="font-serif text-2xl">Where to start</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{STARTING_POINTS[category.slug].note}</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {STARTING_POINTS[category.slug].ids.map((id) => {
                const recipe = recipes.find((entry) => entry.id === id)
                if (!recipe) return null
                return <li key={id}><Link href={`/recipes/${id}`} className="inline-flex min-h-6 items-center text-primary underline underline-offset-4">{recipe.name}</Link></li>
              })}
            </ul>
          </aside>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
