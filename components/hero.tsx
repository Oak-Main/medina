import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, Flame } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="top"
      className="relative grid min-h-screen grid-cols-1 pt-20 lg:grid-cols-2 lg:pt-24"
    >
      <div className="relative z-10 flex flex-col justify-center gap-8 px-6 py-16 md:px-12 lg:py-0 lg:pl-16 xl:pl-24">
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary">
          <span className="h-px w-10 bg-primary" />
          Vol. I — The Atlas Edition
        </p>

        <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-balance sm:text-6xl xl:text-7xl">
          The Maghreb
          <span className="block italic text-primary">Culinary Codex</span>
        </h1>

        <p className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
          A source-led archive of 120 North African and related regional recipe records.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/recipes"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] focus-visible:scale-[1.03] active:scale-[0.98]"
          >
            Browse all 120 recipes
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5" />
          </Link>
          <a href="#street-food" className="rounded-full px-3 py-3 text-sm text-primary underline underline-offset-4">
            Start with street food
          </a>
          <span className="text-sm text-muted-foreground">
            Saffron M’qualli · Paprika M’hammar
          </span>
        </div>

        <figure className="group relative mt-2 aspect-[16/7] w-full max-w-md overflow-hidden rounded-xl border border-border">
          <Image
            src="/images/harissa.webp"
            loading="eager"
            fetchPriority="high"
            alt="Deep red harissa paste with dried chilies and olive oil"
            fill
            sizes="(max-width: 768px) calc(100vw - 3rem), 28rem"
            className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus-within:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" aria-hidden="true" />
          <figcaption className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Harissa · The Ember Base
          </figcaption>
        </figure>
      </div>

      <div className="relative min-h-[52vh] overflow-hidden border-t border-border lg:min-h-screen lg:border-l lg:border-t-0">
        <Image
          src="/images/hero-tagine.webp"
          alt="Bubbling Moroccan chicken tagine with preserved lemon, olives, and saffron sauce"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="grain absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/90" aria-hidden="true" />
        <div className="absolute bottom-6 right-6 max-w-xs rounded-xl border border-border/70 bg-background/75 p-4 backdrop-blur-sm md:bottom-10 md:right-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Archive note</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            Explore ingredients, method notes, and linked source references for each record.
          </p>
        </div>
      </div>
    </section>
  )
}
