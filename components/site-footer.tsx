import Link from 'next/link'
import { CATEGORIES } from '@/lib/recipes'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
              Explore the codex.
              <span className="block italic text-primary">At your own pace.</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground text-pretty">
              Recipe records, source notes, and safety annotations—without an account or email
              sign-up.
            </p>
          </div>
          <div className="flex items-center lg:justify-end">
            <Link
              href="/recipes"
              className="inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] focus-visible:scale-[1.03] active:scale-[0.98]"
            >
              Browse recipe records
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:justify-between md:px-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 font-serif text-lg text-primary">
                ✳
              </span>
              <span className="font-serif text-lg leading-none">
                The Maghreb
                <span className="block text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">
                  Culinary Codex
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A source-led editorial archive of North African and related regional recipe records.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3" aria-label="Footer">
            <div>
              <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Browse
              </h3>
              <ul className="space-y-2 text-sm">
                {CATEGORIES.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-foreground/80 transition-colors hover:text-primary"
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/recipes" className="text-foreground/80 transition-colors hover:text-primary">
                    All recipe records
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Standards
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/editorial-standards" className="text-foreground/80 transition-colors hover:text-primary">
                    Editorial standards
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate-disclosure" className="text-foreground/80 transition-colors hover:text-primary">
                    Affiliate disclosure
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-foreground/80 transition-colors hover:text-primary">
                    Privacy notice
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Archive scope
              </h3>
              <p className="max-w-40 text-sm leading-relaxed text-muted-foreground">
                North African and related regional food traditions.
              </p>
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Oak &amp; Main Developers LLC.</p>
          <p>From the Atlantic Coast to the Red Sea.</p>
        </div>
      </div>
    </footer>
  )
}
