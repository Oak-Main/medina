import type { Metadata } from 'next'
import { DetailNav } from '@/components/recipe-detail/detail-nav'
import { SiteFooter } from '@/components/site-footer'
import { SITE_NAME, SITE_URL } from '@/lib/schema'

const url = `${SITE_URL}/affiliate-disclosure`

export const metadata: Metadata = {
  title: 'Affiliate disclosure',
  description:
    'How The Maghreb Culinary Codex uses affiliate links to support the archive.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Affiliate disclosure',
    description: 'How The Maghreb Culinary Codex uses affiliate links to support the archive.',
    type: 'website',
    url,
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affiliate disclosure',
    description: 'How The Maghreb Culinary Codex uses affiliate links to support the archive.',
  },
}

export default function AffiliateDisclosurePage() {
  return (
    <>
      <DetailNav />
      <main id="main-content" className="relative min-h-screen">
        <section className="mx-auto max-w-3xl px-5 pb-24 pt-36 md:px-8">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">The Codex</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            Affiliate disclosure
          </h1>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/90">
            <p>
              The Maghreb Culinary Codex is an independent editorial archive. When a recipe
              page displays a “Shop this recipe” module, its product links may be affiliate
              links to relevant ingredients or cookware.
            </p>
            <p>
              If you follow an affiliate link and make a purchase, Oak and Main Developers LLC
              may earn a commission at no additional cost to you. A disclosure appears directly
              above those links, and product links are marked for search engines as sponsored.
            </p>
            <p>
              The archive remains available without using a product link. Affiliate
              relationships do not determine which recipe records are published, their source
              notes, or the accuracy and safety information shown in an entry.
            </p>
            <p>
              References in “Sources consulted” and “Cross-checked against” are provided for
              attribution and further reading. The book references link to Amazon and carry
              our Amazon tracking ID. As an Amazon Associate I earn from qualifying purchases.
              The website and food-safety references are plain links.
            </p>
            <p>
              Retailers process information under their own privacy policies after you leave this
              site. Please read our <a href="/privacy" className="underline underline-offset-2 hover:text-primary">Privacy notice</a> for the
              information this site and its service providers process.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
