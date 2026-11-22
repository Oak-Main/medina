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
  /** Optional per-packet Q&A — rendered visibly and as a FAQPage node. Copy
   * must be grounded in the packet's own text (never invented). */
  faqs?: { q: string; a: string }[];
  /** Optional cross-category internal links — fills the composer's empty
   * related-placeholder div. */
  related?: { title: string; url: string }[];
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
  // FAQ section (per-packet, grounded copy) — visible Q&A mirroring the
  // FAQPage node emitted below.
  if (packet.faqs?.length) {
    const esc = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const items = packet.faqs
      .map((f) => `<div class="rpc-faq-item"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`)
      .join('');
    body = body.replace(
      '</article>',
      `<div data-block="faq" id="rpc-faq"><h2>Frequently asked questions</h2>${items}</div></article>`,
    );
  }
  // Related strip — fills the composer's empty placeholder with
  // cross-category links to the archive's striking-distance pages.
  if (packet.related?.length) {
    const esc = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const links = packet.related
      .map((r) => `<li><a href="${esc(r.url)}">${esc(r.title)}</a></li>`)
      .join('');
    body = body.replace(
      /<div data-block="related" data-rpc="related-placeholder">[\s\S]*?<\/div>/,
      `<div data-block="related"><h2>From the archive</h2><ul class="rpc-related-list">${links}</ul></div>`,
    );
  }
  const ld = `<script type="application/ld+json">${JSON.stringify(
    packetJsonld(packet, heroSrc),
  ).replace(/</g, '\\u003c')}</script>`;
  const faqLd = packet.faqs?.length
    ? `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: packet.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }).replace(/</g, '\\u003c')}</script>`
    : '';
  return body + ld + faqLd;
}
