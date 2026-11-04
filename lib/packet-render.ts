/**
 * packet-render.ts — Recipe Finalz presentation-packet renderer (tasteofmedina
 * rollout). The packet's pre-built skeleton IS the markup-contract HTML; this
 * module applies deployment transforms and fails loud on drift. Hardened by
 * the fryup/hongkitchen review cycles: shot-slot-only figure cleanup (steps
 * are figure-wrapped content WITHOUT imgs and are never touched), title alts,
 * step-survival guard, spec-caption guard.
 *
 * Deterministic packet rebuild (Recipe Finalz workspace):
 *   node scripts/compose-presentation.mjs --all-final --write
 */
export interface Packet {
  meta: { slug: string };
  skeleton: string;
  jsonld: Record<string, unknown>;
}

export const ORIGIN = 'https://tasteofmedina.com';

export function packetJsonld(packet: Packet, heroSrc: string): Record<string, unknown> {
  const ld = { ...packet.jsonld };
  ld.image = [ORIGIN + heroSrc];
  // Nothing visible to match — never ship crowd data.
  delete ld.aggregateRating;
  return ld;
}

export function renderPacketArticle(packet: Packet, heroSrc: string): string {
  const title = String(packet.jsonld.name ?? packet.meta.slug);
  let body = packet.skeleton;
  const heroCap =
    body.match(/<figure data-block="hero">[\s\S]*?<figcaption>([\s\S]*?)<\/figcaption>/)?.[1] ?? '';
  const heroImg = `<img src="${heroSrc}" style="aspect-ratio:4/3;object-fit:cover" alt="${title}" fetchpriority="high" decoding="async">`;
  body = body.replace(
    /<figure data-block="hero">[\s\S]*?<\/figure>/,
    `<figure data-block="hero">${heroImg}${heroCap ? `<figcaption>${heroCap}</figcaption>` : ''}</figure>`,
  );
  body = body.replace(
    /<figure data-shot="CARD"><img[^>]*><\/figure>/,
    `<figure data-shot="CARD"><img src="${heroSrc}" style="aspect-ratio:1/1" alt="${title}" fetchpriority="high" decoding="async"></figure>`,
  );
  body = body.replace(/<img src="\/assets\/recipes\/"[^>]*>/g, '');
  // Shot-slot figures left without an image are removed whole (their captions
  // are composer spec). Content figures (steps) never carry imgs by design.
  body = body.replace(/<figure data-shot="[^"]*"[^>]*>(?:(?!<img[\s\S])[\s\S])*?<\/figure>/g, '');
  body = body.replace(/<figure data-block="pre-card-glamour"[^>]*>(?:(?!<img[\s\S])[\s\S])*?<\/figure>/g, '');
  if (body.includes('src="/assets/recipes/"'))
    throw new Error(`packet drift: ${packet.meta.slug} placeholder survived full-tag strip`);
  if (/<figcaption>[^<]*must match the card/i.test(body))
    throw new Error(`packet drift: ${packet.meta.slug} composer spec caption leaked`);
  if (!/<figure data-block="step"/.test(body))
    throw new Error(`packet drift: ${packet.meta.slug} step figures missing after cleanup`);
  const heroHits = body.split(heroSrc).length - 1;
  if (heroHits !== 2)
    throw new Error(`packet drift: ${packet.meta.slug} expected hero+card twice, got ${heroHits}`);
  const ld = `<script type="application/ld+json">${JSON.stringify(
    packetJsonld(packet, heroSrc),
  ).replace(/</g, '\\u003c')}</script>`;
  return body + ld;
}
