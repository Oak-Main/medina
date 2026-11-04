import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnswerLedArticle } from '@/components/recipe-detail/answer-led-article'
import { ANSWER_LED_RECIPES } from '@/lib/answer-led'
import { RECIPES } from '@/lib/recipes'
import { getRecipeDetail } from '@/lib/recipe-details'
import { getPacket } from '@/lib/packet-bundle';
import { renderPacketArticle } from '@/lib/packet-render';
import { recipeSeoDescription, recipeSeoTitle } from '@/lib/seo'
import { buildRecipeJsonLd, recipeUrl, SITE_NAME } from '@/lib/schema'
import { DetailNav } from '@/components/recipe-detail/detail-nav'
import { RecipeHero } from '@/components/recipe-detail/recipe-hero'
import { IngredientsPanel } from '@/components/recipe-detail/ingredients-panel'
import { MethodPanel } from '@/components/recipe-detail/method-panel'
import { NoteCallout } from '@/components/recipe-detail/note-callout'
import { KitchenNote } from '@/components/recipe-detail/chefs-note'
import { ShopModule } from '@/components/recipe-detail/shop-module'
import { SourcesPanel } from '@/components/recipe-detail/sources-panel'
import { RecipeProvenance } from '@/components/recipe-detail/recipe-provenance'
import { PrintRecipeButton } from '@/components/recipe-detail/print-button'
import { RecipeCard } from '@/components/recipe-card'
import { SiteFooter } from '@/components/site-footer'

export function generateStaticParams() {
  return RECIPES.map((r) => ({ id: String(r.id) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const recipe = RECIPES.find((r) => r.id === Number(id))
  const detail = getRecipeDetail(Number(id))
  if (!recipe || !detail) return {}

  const title = recipeSeoTitle(recipe)
  const description = recipeSeoDescription(recipe)
  const url = recipeUrl(recipe.id)
  const edition = ANSWER_LED_RECIPES[recipe.id]

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [
        {
          url: recipe.image,
          alt: edition ? `${recipe.name} (${edition.cuisine})` : `${recipe.name}, a ${recipe.category.toLowerCase()} dish from ${recipe.region}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [recipe.image],
    },
  }
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const recipe = RECIPES.find((r) => r.id === Number(id))
  const detail = getRecipeDetail(Number(id))

  if (!recipe || !detail) notFound()

  // These reviewed IDs have a different formulation in the legacy packet bundle.
  // Select the canonical source before rendering any instructions or structured data.
  const edition = ANSWER_LED_RECIPES[recipe.id]
  if (edition) {
    return (
      <>
        <DetailNav />
        <main id="main-content" className="relative min-h-screen">
          <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
            <AnswerLedArticle recipe={recipe} detail={detail} edition={edition} />
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  // Recipe Finalz presentation-packet rollout (markup contract v1)
  const packet = getPacket(id)
  if (packet) {
    const html = renderPacketArticle(packet, recipe.image)
    return (
      <>
        <DetailNav />
        <main id="main-content" className="relative min-h-screen">
          <div className="mx-auto max-w-3xl px-5 py-10 md:px-8" dangerouslySetInnerHTML={{ __html: html }} />
        </main>
        <SiteFooter />
      </>
    )
  }

  const related = RECIPES.filter(
    (r) => r.category === recipe.category && r.id !== recipe.id,
  ).slice(0, 4)

  const jsonLd = buildRecipeJsonLd(recipe, detail)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\u003c') }}
      />
      <DetailNav />
      <main id="main-content" className="relative min-h-screen">
        <RecipeHero recipe={recipe} detail={detail} />

        <div className="mx-auto flex max-w-7xl justify-end px-5 pt-6 md:px-8" data-print-hidden>
          <PrintRecipeButton />
        </div>

        <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="space-y-14">
              <IngredientsPanel detail={detail} />
              <MethodPanel detail={detail} />
              <NoteCallout detail={detail} />
              <KitchenNote detail={detail} />
              <RecipeProvenance detail={detail} />
            </div>

            <aside className="space-y-8 lg:border-l lg:border-border lg:pl-8" aria-label="Recipe sources and resources">
              <ShopModule recipe={recipe} detail={detail} />
              <SourcesPanel
                crossRefCodes={detail.crossRefCodes}
                finalizedSources={detail.finalizedSources}
              />
            </aside>
          </div>
        </section>

        {related.length > 0 && (
          <section className="relative mx-auto max-w-7xl border-t border-border px-5 py-16 md:px-8">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Keep exploring</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-balance sm:text-4xl">
              More from {recipe.category}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
              {related.map((relatedRecipe) => (
                <RecipeCard key={relatedRecipe.id} recipe={relatedRecipe} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  )
}
