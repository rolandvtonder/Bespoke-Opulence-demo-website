import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { SERVICES, PACKAGES, HAMPERS, GALLERY, CATEGORIES, REVIEWS, type Category } from './data'
import { SITE, GOOGLE_RATING, waLink } from './site'
import { Arrow } from './Stage'

/*
  Everything after the opening scene is ordinary flow — a real responsive
  layout rather than coordinates — so it reads as cleanly on a phone as on a
  wide screen. Sections rise into place once as they enter, which motion
  skips for visitors who ask for reduced motion (see MotionConfig in App).
*/

export type Prefill = { type: string; note: string; key: number }

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="label" style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span aria-hidden="true" style={{ width: 28, height: 1, background: 'var(--color-gold)' }} />
      {children}
    </div>
  )
}

function Head({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <motion.div {...rise} className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="display mt-5 text-[44px] leading-[0.98] sm:text-[56px] lg:text-[68px]">{title}</h2>
      </div>
      {intro && <p className="max-w-[520px] text-[16px] leading-[1.7] text-[var(--color-mist)] lg:justify-self-end">{intro}</p>}
    </motion.div>
  )
}

const wrap = 'mx-auto w-full max-w-[1312px] px-4 sm:px-8'

/* ============================== Services ============================== */

export function Services({ onEnquire }: { onEnquire: (type: string, note?: string) => void }) {
  const typeFor: Record<string, string> = {
    wedding: 'Wedding',
    shower: 'Bridal or baby shower',
    party: "Kids' party or birthday",
    memorial: 'Funeral or memorial',
  }
  return (
    <section id="services" className="py-24 md:py-32">
      <div className={wrap}>
        <Head
          eyebrow="What we do"
          title={
            <>
              Every occasion, <em className="font-normal">beautifully</em> dressed
            </>
          }
          intro="Tell us the feeling you want your guests to walk into. We design the look, source the décor and florals, and set it all up — big celebrations, quiet farewells and everything in between."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.id}
              {...rise}
              transition={{ ...rise.transition, delay: (i % 3) * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[var(--color-ink-2)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[rgba(14,13,11,0.6)] to-transparent" />
                <span className="label absolute left-5 top-5 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[10px] backdrop-blur-md">
                  0{i + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="display text-[30px] leading-[1.05]">{s.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.65] text-[var(--color-mist)]">{s.copy}</p>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <span className="text-[14px] font-semibold text-[var(--color-gold)]">{s.price}</span>
                  {s.href ? (
                    <a href={s.href} className="btn-ghost" style={{ minHeight: 44, padding: '0 18px', fontSize: 13 }}>
                      View <Arrow />
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn-ghost"
                      style={{ minHeight: 44, padding: '0 18px', fontSize: 13, background: 'transparent' }}
                      onClick={() => onEnquire(typeFor[s.id] ?? 'Other')}
                    >
                      Enquire <Arrow />
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================== Packages ============================== */

export function Packages({ onEnquire }: { onEnquire: (type: string, note?: string) => void }) {
  return (
    <section id="packages" className="border-y border-white/[0.07] bg-[var(--color-ink-2)] py-24 md:py-32">
      <div className={wrap}>
        <Head
          eyebrow="Tent & chair hire"
          title={
            <>
              Packages for <em className="font-normal">50 or 100</em> guests
            </>
          }
          intro="Every package pairs a framed tent with your choice of chair. Pick the style, then the size: a 6 m × 12 m tent with 50 chairs, or a 6 m × 24 m tent with 100."
        />

        <motion.div {...rise} className="mb-8 grid gap-5 overflow-hidden rounded-[28px] border border-white/10 bg-[var(--color-ink)] md:grid-cols-[1fr_1.3fr]">
          <img
            src="img/packages/tent.jpg"
            alt="White framed marquee with draped sides, set up on a lawn with white lounge couches"
            loading="lazy"
            className="h-full max-h-[340px] w-full object-cover md:max-h-none"
          />
          <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
            <h3 className="display text-[34px] leading-[1.05]">What every package includes</h3>
            <ul className="grid gap-3 text-[15px] leading-[1.6] text-[var(--color-mist)]">
              {[
                'A framed tent: 6 m × 12 m or 6 m × 24 m',
                '50 or 100 chairs in the style you choose',
                'Décor, draping, lounge furniture and styling available as add-ons',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[9px] h-[6px] w-[6px] shrink-0 rotate-45 bg-[var(--color-gold)]" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-white/50">Ask about delivery, setup and availability for your date when you enquire.</p>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PACKAGES.map((k, i) => (
            <motion.article
              key={k.n}
              {...rise}
              transition={{ ...rise.transition, delay: i * 0.05 }}
              className="flex flex-col rounded-[28px] border border-white/10 bg-[var(--color-ink)] p-4"
            >
              <div className="aspect-square overflow-hidden rounded-[20px] bg-white">
                <img src={k.img} alt={`${k.chair} chair`} loading="lazy" className="h-full w-full object-contain p-2" />
              </div>
              <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                <div className="label text-[var(--color-gold)]">Package {k.n}</div>
                <h3 className="display mt-2 text-[26px] leading-[1.05]">{k.chair} chairs</h3>
                <dl className="mt-5 grid gap-3 text-[14px]">
                  {[
                    ['6 m × 12 m · 50 chairs', k.small],
                    ['6 m × 24 m · 100 chairs', k.large],
                  ].map(([d, v]) => (
                    <div key={d} className="flex items-baseline justify-between gap-3 border-t border-white/10 pt-3">
                      <dt className="text-[var(--color-mist)]">{d}</dt>
                      <dd className="display shrink-0 text-[22px] font-semibold tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
                <button
                  type="button"
                  className="btn-ghost mt-6 w-full"
                  style={{ minHeight: 44, fontSize: 13, background: 'transparent' }}
                  onClick={() =>
                    onEnquire('Tent & chair hire', `Package ${k.n} (${k.chair} chairs): 50 chairs ${k.small} / 100 chairs ${k.large}`)
                  }
                >
                  Enquire about package {k.n}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================== Hampers ============================== */

export function Hampers() {
  return (
    <section id="hampers" className="py-24 md:py-32">
      <div className={wrap}>
        <Head
          eyebrow="Gift hampers"
          title={
            <>
              Gifts, <em className="font-normal">wrapped</em> and ready
            </>
          }
          intro="Bubbly, chocolates, biltong and flowers, put together into hampers that arrive gift-wrapped. Order any of them on WhatsApp."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {HAMPERS.map((h, i) => (
            <motion.article
              key={h.name}
              {...rise}
              transition={{ ...rise.transition, delay: (i % 4) * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[var(--color-ink-2)] sm:rounded-[28px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <img
                  src={`img/hampers/${h.img}.jpg`}
                  alt={`${h.name} hamper`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h3 className="display text-[22px] leading-[1.05] sm:text-[26px]">{h.name}</h3>
                <ul className="mt-3 flex-1 space-y-1 text-[13px] leading-[1.5] text-[var(--color-mist)] sm:text-[14px]">
                  {h.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="display text-[22px] font-semibold tabular-nums text-[var(--color-gold)]">{h.price}</span>
                  <a
                    href={waLink(`Hi ${SITE.name}! I'd like to order the "${h.name}" hamper (${h.price}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex min-h-[44px] items-center gap-2 text-[11px] text-[var(--color-bone)] hover:text-[var(--color-gold)]"
                    aria-label={`Order the ${h.name} hamper on WhatsApp`}
                  >
                    Order <Arrow />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-8 text-[13px] text-white/50">
          Inkomo in a Hat comes in Standard, Medium and Large. Hampers with alcohol are not for sale to persons under the age of 18.
        </p>
      </div>
    </section>
  )
}

/* ============================== Gallery ============================== */

export function Gallery() {
  const [cat, setCat] = useState<Category | 'All'>('All')
  const [open, setOpen] = useState<number | null>(null)
  const shots = cat === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === cat)
  const opener = useRef<HTMLElement | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(null)
    opener.current?.focus()
  }, [])
  const step = useCallback((d: number) => setOpen((o) => (o == null ? o : (o + d + shots.length) % shots.length)), [shots.length])

  useEffect(() => {
    if (open == null) return
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  const cur = open == null ? null : shots[open]

  return (
    <section id="gallery" className="border-y border-white/[0.07] bg-[var(--color-ink-2)] py-24 md:py-32">
      <div className={wrap}>
        <Head
          eyebrow="Gallery"
          title={
            <>
              Our recent <em className="font-normal">work</em>
            </>
          }
          intro="Weddings, milestone birthdays, memorials and lounge setups we have styled. Tap any photo to see it larger."
        />

        <div role="group" aria-label="Filter photos" className="mb-8 flex flex-wrap gap-2">
          {(['All', ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`min-h-[44px] cursor-pointer rounded-full border px-5 text-[13px] font-semibold transition-colors ${
                cat === c
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-ink)]'
                  : 'border-white/20 text-[var(--color-bone)] hover:border-[var(--color-gold)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {shots.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget
                setOpen(i)
              }}
              className="group relative mb-3 block w-full cursor-zoom-in overflow-hidden rounded-[18px] sm:mb-4 sm:rounded-[22px]"
              aria-label={`View larger: ${g.alt}`}
            >
              <img
                src={`img/gallery/${g.id}-sm.jpg`}
                alt=""
                width={g.w}
                height={g.h}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span
                aria-hidden="true"
                className="label absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1.5 text-[9.5px] opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100"
              >
                {g.cat}
              </span>
            </button>
          ))}
        </div>
      </div>

      {cur && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${open! + 1} of ${shots.length}`}
          className="fixed inset-0 z-[60] flex flex-col bg-[rgba(8,7,6,0.96)]"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <span className="label text-white/60">
              {open! + 1} / {shots.length} · {cur.cat}
            </span>
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              aria-label="Close photo"
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/25 text-[var(--color-bone)] hover:border-[var(--color-gold)]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && close()}>
            <img src={`img/gallery/${cur.id}.jpg`} alt={cur.alt} className="max-h-full max-w-full rounded-[14px] object-contain" />
            {(
              [
                [-1, 'Previous photo', 'left-2 sm:left-6', 'M10 3L5 8l5 5'],
                [1, 'Next photo', 'right-2 sm:right-6', 'M6 3l5 5-5 5'],
              ] as const
            ).map(([d, label, pos, path]) => (
              <button
                key={label}
                type="button"
                onClick={() => step(d)}
                aria-label={label}
                className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/25 bg-black/40 text-[var(--color-bone)] backdrop-blur-md hover:border-[var(--color-gold)] ${pos}`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path} />
                </svg>
              </button>
            ))}
          </div>
          <p className="mx-auto max-w-[640px] px-6 py-5 text-center text-[14px] text-white/70">{cur.alt}</p>
        </div>
      )}
    </section>
  )
}

/* ============================== Reviews ============================== */

function Stars() {
  return (
    <span className="flex gap-[3px]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M8 1.2l2.03 4.3 4.7.56-3.47 3.22.91 4.65L8 11.6l-4.17 2.33.91-4.65L1.27 6.06l4.7-.56L8 1.2z"
            fill="var(--color-gold)"
          />
        </svg>
      ))}
    </span>
  )
}

export function Reviews() {
  return (
    <section id="reviews" className="py-24 md:py-32">
      <div className={wrap}>
        <Head
          eyebrow="Kind words"
          title={
            <>
              Loved by our <em className="font-normal">clients</em>
            </>
          }
          intro={
            <a
              href={SITE.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 rounded-full border border-white/15 py-2 pl-3 pr-5 text-[var(--color-bone)] hover:border-[var(--color-gold)]"
              aria-label={`Rated ${GOOGLE_RATING.score} out of 5 from ${GOOGLE_RATING.count} Google reviews — read them on Google`}
            >
              <span className="display text-[40px] leading-none">{GOOGLE_RATING.score}</span>
              <span>
                <Stars />
                <span className="mt-1 block text-[13px] text-[var(--color-mist)]">{GOOGLE_RATING.count} Google reviews</span>
              </span>
            </a>
          }
        />
        {REVIEWS.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <motion.figure
                key={r.name + i}
                {...rise}
                transition={{ ...rise.transition, delay: (i % 3) * 0.06 }}
                className="m-0 flex flex-col rounded-[28px] border border-white/10 bg-[var(--color-ink-2)] p-7 sm:p-8"
              >
                <div aria-hidden="true" className="display text-[64px] leading-[0.6] text-[var(--color-gold)]">
                  &ldquo;
                </div>
                <blockquote className="m-0 mt-4 flex-1 text-[16px] leading-[1.7] text-[var(--color-bone)]">{r.text}</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <div className="font-semibold">{r.name}</div>
                  <div className="label mt-1 text-[10px] text-white/50">{r.event}</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        ) : (
          <motion.div
            {...rise}
            className="grid items-center gap-8 rounded-[28px] border border-white/10 bg-[var(--color-ink-2)] p-8 sm:p-12 md:grid-cols-[1.4fr_1fr]"
          >
            <div>
              <div aria-hidden="true" className="display text-[80px] leading-[0.6] text-[var(--color-gold)]">
                &ldquo;
              </div>
              <p className="display mt-4 text-[30px] leading-[1.15] sm:text-[38px]">
                Every client who has reviewed us on Google gave five stars. Read their words there, or on our Facebook page.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a href={SITE.google} target="_blank" rel="noopener noreferrer" className="btn-gold">
                Read our Google reviews <Arrow />
              </a>
              <a href={SITE.facebookReviews} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Facebook recommendations
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
