import type { Metadata } from 'next'
import { DetailNav } from '@/components/recipe-detail/detail-nav'
import { SiteFooter } from '@/components/site-footer'
import { SITE_NAME, SITE_URL } from '@/lib/schema'

const url = `${SITE_URL}/privacy`

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: 'Privacy notice for The Maghreb Culinary Codex.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Privacy notice',
    description: 'Privacy notice for The Maghreb Culinary Codex.',
    type: 'website',
    url,
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy notice',
    description: 'Privacy notice for The Maghreb Culinary Codex.',
  },
}

export default function PrivacyPage() {
  return (
    <>
      <DetailNav />
      <main id="main-content" className="relative min-h-screen">
        <article className="mx-auto max-w-3xl px-5 pb-24 pt-36 md:px-8">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Updated October 30, 2026</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            Privacy notice
          </h1>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-foreground/90">
            <section>
              <h2 className="font-serif text-2xl tracking-tight">Who operates this site</h2>
              <p className="mt-3">
                The Maghreb Culinary Codex is operated by Oak &amp; Main Developers LLC, a
                California limited liability company. Written privacy requests may be mailed to:
              </p>
              <address className="mt-3 not-italic text-muted-foreground">
                Oak &amp; Main Developers LLC<br />
                2108 N St.<br />
                Sacramento, CA 95816<br />
                United States
              </address>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-tight">Information this site processes</h2>
              <p className="mt-3">
                This is a public, read-only recipe archive. It does not offer accounts, comments,
                a contact form, or an email subscription. Search and category filtering happen in
                your browser and are not submitted to the site.
              </p>
              <p className="mt-3">
                Our hosting and security provider, Vercel, processes technical request
                information such as IP address, browser and device information, approximate
                location derived from IP address, and request or security logs to deliver and
                protect the site. Those records are governed by Vercel&apos;s service controls and
                retention practices.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-tight">Cookies, analytics, and location</h2>
              <p className="mt-3">
                This site loads a Google Analytics tag to measure site usage. The tag may use
                cookies or similar identifiers and send usage and device information to Google.
                Your browser settings may let you block or delete cookies. The site does not ask
                for precise device location. The hosting provider may also use technical
                mechanisms to deliver and secure a request.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-tight">External and affiliate links</h2>
              <p className="mt-3">
                Optional product links may be shown on some recipe pages. If you select one, the
                retailer receives information about your visit under its own privacy policy.
                Optional shop links may be affiliate links; see the{' '}
                <a href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-primary">
                  affiliate disclosure
                </a>{' '}
                for details. Bibliographic and food-safety references are shown for attribution
                and further reading.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-tight">Your choices and California rights</h2>
              <p className="mt-3">
                Oak &amp; Main Developers LLC does not sell or share personal information for
                cross-context behavioral advertising through this site. Because the site does not
                create visitor accounts or maintain a first-party marketing database, there is
                generally no profile to access or delete. You may still mail a privacy request to
                the address above. We may need limited information to verify and respond to a
                request.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-tight">Changes to this notice</h2>
              <p className="mt-3">
                We will update this page before materially changing the site&apos;s data practices.
                The date above shows when this notice was last revised.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
