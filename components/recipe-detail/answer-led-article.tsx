import Image from 'next/image'
import Link from 'next/link'
import type { AnswerLedRecipe } from '@/lib/answer-led'
import type { RecipeDetail } from '@/lib/recipe-details'
import type { Recipe } from '@/lib/recipes'
import { buildRecipeJsonLd } from '@/lib/schema'
import { IngredientsPanel } from './ingredients-panel'
import { KitchenNote } from './chefs-note'
import { MethodPanel } from './method-panel'
import { NoteCallout } from './note-callout'
import { PrintRecipeButton } from './print-button'
import { SourcesPanel } from './sources-panel'
import { RecipeProvenance } from './recipe-provenance'
import { ShopModule } from './shop-module'

export function AnswerLedArticle({
  recipe, detail, edition,
}: { recipe: Recipe; detail: RecipeDetail; edition: AnswerLedRecipe }) {
  const { answer, cuisine, dishType, faqs, methodHold } = edition
  const faqPage = {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
  const graph = buildRecipeJsonLd(recipe, detail, edition)
  const jsonLd = {
    '@context': graph['@context'],
    '@graph': [...graph['@graph'].filter(node => !methodHold || node['@type'] !== 'Recipe'), faqPage],
  }

  return (
    <article className="rpc-container" data-rpc="content">
      <header data-block="header">
        <h1>{recipe.name}</h1>
        <p className="rpc-meta">{cuisine} · {dishType}</p>
      </header>
      <nav data-block="jump-bar" aria-label="Page navigation">
        {!methodHold && <><a href="#rpc-card">Jump to recipe</a><a href="#rpc-method">Method</a></>}
        <a href="#rpc-faq">Common questions</a>
        {!methodHold && <PrintRecipeButton />}
      </nav>
      <figure data-block="hero">
        <Image src={recipe.image} width={1200} height={900} sizes="(max-width: 768px) 100vw, 768px" alt={recipe.name} priority />
      </figure>
      <div data-block="intro"><p className="answer-led">{answer}</p></div>

      {methodHold ? (
        <aside data-block="method-review" aria-label="Cooking method under review">
          <h2>Cooking method under review</h2>
          <p>{methodHold.message}</p>
          <a className="underline" href={methodHold.url}>{methodHold.source}</a>
        </aside>
      ) : (
        <>
          <section className="rpc-card" data-block="recipe-card" id="rpc-card">
            <h2>{recipe.name} recipe</h2>
            <p className="rpc-times"><span>{detail.timeText}</span><span>Yield · {detail.yieldText}</span></p>
            <IngredientsPanel detail={detail} />
          </section>
          <section data-block="method" id="rpc-method"><MethodPanel detail={detail} /></section>
          <div data-block="notes"><NoteCallout detail={detail} /><KitchenNote detail={detail} /></div>
        </>
      )}

      <section className="rpc-faq" data-block="faq" id="rpc-faq">
        <h2>Common questions</h2>
        {faqs.map(({ question, answer }) => (
          <details key={question}><summary>{question}</summary><p>{answer}</p></details>
        ))}
      </section>
      <SourcesPanel crossRefCodes={detail.crossRefCodes} finalizedSources={detail.finalizedSources} />
      <RecipeProvenance detail={detail} />
      {!methodHold && <ShopModule recipe={recipe} detail={detail} />}
      <Link href="/recipes" className="underline">Browse the recipe archive</Link>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </article>
  )
}
