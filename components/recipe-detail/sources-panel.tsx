import { BookOpen, Globe, ShieldCheck } from 'lucide-react'
import { resolveSources, resolveFinalizedSources } from '@/lib/bibliography'

const ICONS = {
  book: BookOpen,
  site: Globe,
  'food-safety': ShieldCheck,
} as const

export function SourcesPanel({
  crossRefCodes,
  finalizedSources,
}: {
  crossRefCodes: string[]
  finalizedSources?: string[]
}) {
  const sources = resolveSources(crossRefCodes)
  const recipeSources = resolveFinalizedSources(finalizedSources)

  if (sources.length === 0 && recipeSources.length === 0) return null

  return (
    <div className="space-y-8">
      {recipeSources.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Sources consulted</p>
          <ul className="mt-4 space-y-2">
            {recipeSources.map((s) => (
              <li key={s.name}>
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Globe className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="text-pretty">{s.name}</span>
                  </a>
                ) : (
                  <span className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />
                    <span className="text-pretty">{s.name}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {sources.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Cross-checked against</p>
          <ul className="mt-4 space-y-2">
            {sources.map((s) => {
              const Icon = ICONS[s.kind]
              return (
                <li key={s.code}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel={s.kind === 'book' ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer'}
                    className="group flex items-start gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="text-pretty">{s.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
          {sources.some((s) => s.kind === 'book') && (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Book links go to Amazon. As an Amazon Associate I earn from qualifying purchases.{' '}
              <a href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-primary">
                Affiliate disclosure
              </a>
              .
            </p>
          )}
        </div>
      )}
    </div>
  )
}
