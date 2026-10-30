import type { Metadata } from 'next'
import { DetailNav } from '@/components/recipe-detail/detail-nav'
import { SiteFooter } from '@/components/site-footer'
import { SITE_NAME, SITE_URL } from '@/lib/schema'

const url = `${SITE_URL}/editorial-standards`

export const metadata: Metadata = {
  title: 'Editorial standards',
  description: 'How The Maghreb Culinary Codex presents recipe records, sources, and safety notes.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Editorial standards',
    description: 'How The Maghreb Culinary Codex presents recipe records, sources, and safety notes.',
    type: 'website',
    url,
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editorial standards',
    description: 'How The Maghreb Culinary Codex presents recipe records, sources, and safety notes.',
  },
}

export default function EditorialStandardsPage() {
  return (
    <>
      <DetailNav />
      <main id="main-content" className="relative min-h-screen">
        <article className="mx-auto max-w-3xl px-5 pb-24 pt-36 md:px-8">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">The Codex</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            Editorial standards
          </h1>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-foreground/90">
            <section>
              <h2 className="font-serif text-2xl tracking-tight">What this archive is</h2>
              <p className="mt-3">
                The Maghreb Culinary Codex is an editorial collection of North African and
                related regional recipe records. It is designed to help readers explore dishes,
                techniques, source material, and regional variation. It is not a claim that every
                entry is a single definitive version of a living food tradition.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-tight">Sources and attribution</h2>
              <p className="mt-3">
                Entries display source references and, where available, named sources consulted
                during editorial development. Source links are included for attribution and
                further reading. A source list does not turn an entry into a substitute for the
                original work, regional expertise, or independent kitchen testing.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-tight">Recipe status and accuracy notes</h2>
              <p className="mt-3">
                Regional dishes have legitimate household, seasonal, and historical variation.
                When a record is an adaptation, an editorial reconstruction, or needs a food
                safety limitation, the entry&apos;s accuracy or safety note should say so. We avoid
                presenting unverified historical detail or a single recipe formula as universally
                authoritative.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-tight">Safety and dietary decisions</h2>
              <p className="mt-3">
                Recipe records are editorial information, not medical, nutritional, allergy, or
                professional food-safety advice. Check ingredient labels, temperatures, local
                food-safety guidance, and individual dietary needs before preparing or serving a
                dish. Follow linked government food-safety guidance where it is provided.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-tight">Independence and corrections</h2>
              <p className="mt-3">
                Optional affiliate links are separated from citations and are disclosed before a
                reader encounters them. They do not determine editorial coverage or safety notes.
                To report a factual issue, write to Oak &amp; Main Developers LLC at 2108 N St.,
                Sacramento, CA 95816, United States, identifying the relevant recipe URL and
                source where possible.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
