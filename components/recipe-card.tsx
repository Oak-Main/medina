import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, Flame } from 'lucide-react'
import type { Recipe } from '@/lib/recipes'

function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest ? `${hours}h ${rest}m` : `${hours}h`
}

export function RecipeCard({ recipe, eager = false }: { recipe: Recipe; eager?: boolean }) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-300 hover:-translate-y-2 focus-visible:-translate-y-2"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={recipe.image || '/placeholder.svg'}
          alt={`${recipe.name}, a ${recipe.category.toLowerCase()} dish from ${recipe.region}`}
          fill
          priority={eager}
          loading={eager ? undefined : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90" aria-hidden="true" />

        <span className="absolute left-3 top-3 rounded-full bg-background/70 px-2.5 py-1 font-mono text-[0.65rem] tracking-widest text-primary backdrop-blur-sm">
          №{String(recipe.id).padStart(3, '0')}
        </span>

        <div className="absolute right-3 top-3 rounded-full bg-background/70 px-2 py-1 backdrop-blur-sm">
          <div className="flex gap-0.5" aria-hidden="true">
            {[1, 2, 3].map((level) => (
              <Flame
                key={level}
                className={`h-3 w-3 ${
                  level <= recipe.heat ? 'text-accent' : 'text-muted-foreground/30'
                }`}
                fill={level <= recipe.heat ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="sr-only">Heat level {recipe.heat} of 3</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <p className="text-sm leading-snug text-foreground/90 text-pretty">{recipe.blurb}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
          <span>{recipe.region}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {formatMinutes(recipe.minutes)}
          </span>
        </div>
        <h3 className="font-serif text-lg leading-tight tracking-tight text-balance">{recipe.name}</h3>
        <div className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          Read the entry
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}
