import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { SCROLL_VH, TOTAL_MS, INTRO_MS, P, G_DESKTOP, G_MOBILE, SEAMS, SEAM_BAND, span, ramp, lerp } from './scroll'
import { GOLD, INK } from './site'

/*
  The opening scene — Marlin's scroll-choreographed hero, re-dressed.

  This is not a flow layout. Everything here is drawn on a fixed artboard at
  the coordinates it was designed at, and the artboard is scaled to the
  window. Desktop is the prototype's 1440x810 board scaled by width, so it is
  full-bleed with nothing cropped. Phones get their own 390x760 board, fitted
  to the screen, because a 1440 board scaled down to 375px would set body
  copy at 4px.

  Where Marlin scrubbed two video clips, this scrubs three of the studio's
  own photographs: each owns a stretch of the scroll, pushes in slowly across
  it, and dissolves into the next over a narrow band at a seam.

  If you want to change the design, change the coordinates in D and M below.
  Do not add a flex or grid container around them.
*/

const px = (n: number) => `${n}px`
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  position: 'absolute',
  left: px(x),
  top: px(y),
  ...(w != null ? { width: px(w) } : null),
  ...(h != null ? { height: px(h) } : null),
})

const at = (ms: number) => ms / TOTAL_MS

const SCENES = [
  { src: 'img/scene-gala.jpg', pos: '50% 55%' },
  { src: 'img/scene-table.jpg', pos: '50% 60%' },
  { src: 'img/scene-lounge.jpg', pos: '50% 55%' },
]

const TILES = [
  { art: 'card-wedding', label: ['Elegant', 'Weddings'] },
  { art: 'card-shower', label: ['Showers', '& Reveals'] },
  { art: 'card-party', label: ['Parties', '& Birthdays'] },
  { art: 'card-memorial', label: ['Memorial', 'Décor'] },
]

/* ---------------- desktop board: the prototype's own frame ---------------- */
const D_W = 1440
const D_SAFE = 96
const D_GW = D_W - D_SAFE * 2

const D = {
  W: D_W,
  H: 810,
  SAFE: D_SAFE,
  GW: D_GW,
  G: G_DESKTOP,
  rail: true,
  eyebrowTop: -44,
  word: { size: 108, line: 100, tops: [-6, 86, 178], h: 116, w: 700 },
  body: {
    lines: [
      'Weddings, celebrations and memorial décor,',
      'planned and styled by hand in Vosloorus —',
      'with tents, chairs and lounge setups on hire.',
    ],
    top: 318,
    step: 27,
    size: 17,
    w: 480,
  },
  buttons: { top: 424, primary: 'Book a consultation', secondary: 'View packages' },
  card: {
    left: D_GW - 459, top: 300, w: 459, h: 289, r: 56,
    pad: [36, 40], titleSize: 17, priceSize: 68, trackTop: 96, capTop: 112, ruleTop: 142, readTop: 166, readSize: 30,
  },
  tiles: {
    w: 255, h: 215, r: 46,
    pos: [[0, 0], [D_GW - 255, 0], [116, 240], [D_GW - 371, 240]] as [number, number][],
    labelSize: 27, labelLine: 26, labelLeft: 24, labelTop: 26, btn: 56, btnInset: 18,
  },
  g54: { headTop: 468, headSize: 84, subTop: 566, subSize: 21, subLine: 32, subW: 660 },
  g55: {
    ruleTop: 404, headTop: 428, headW: 640, headSize: 62, headLine: 60,
    paraLeft: D_GW - 440, paraTop: 434, paraW: 440, paraSize: 16, paraLine: 27, linkTop: 588,
  },
}

/* ---------------- phone board: same film, 390 wide ---------------- */
const M_W = 390
const M_SAFE = 24
const M_GW = M_W - M_SAFE * 2

const M: typeof D = {
  W: M_W,
  H: 760,
  SAFE: M_SAFE,
  GW: M_GW,
  G: G_MOBILE,
  rail: false,
  eyebrowTop: -30,
  word: { size: 66, line: 62, tops: [-4, 54, 112], h: 72, w: M_GW },
  body: {
    lines: [
      'Weddings, celebrations and memorial',
      'décor, planned and styled by hand in',
      'Vosloorus — with tents, chairs and',
      'lounge setups on hire.',
    ],
    top: 206,
    step: 23,
    size: 15,
    w: M_GW,
  },
  buttons: { top: 312, primary: 'Plan my event', secondary: 'Packages' },
  card: {
    left: 0, top: 384, w: M_GW, h: 222, r: 34,
    pad: [24, 24], titleSize: 15, priceSize: 50, trackTop: 72, capTop: 86, ruleTop: 112, readTop: 128, readSize: 24,
  },
  tiles: {
    w: 165, h: 150, r: 30,
    pos: [[0, 0], [177, 0], [0, 162], [177, 162]],
    labelSize: 21, labelLine: 21, labelLeft: 16, labelTop: 16, btn: 38, btnInset: 12,
  },
  g54: { headTop: 338, headSize: 46, subTop: 446, subSize: 16, subLine: 25, subW: M_GW },
  g55: {
    ruleTop: 300, headTop: 322, headW: M_GW, headSize: 40, headLine: 42,
    paraLeft: 0, paraTop: 470, paraW: M_GW, paraSize: 15, paraLine: 24, linkTop: 636,
  },
}

/** Reveals behind a clip mask, rising. */
function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ ...style, overflow: 'hidden' }} aria-hidden="true">
      <div style={{ height: '100%', transform: `translateY(${(1 - t) * 115}%)`, willChange: 'transform' }}>
        {children}
      </div>
    </div>
  )
}

export function Arrow({ size = 12, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true" fill="none">
      <path d="M3 9L9 3M4 3h5v5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const rands = (n: number) => `R${Math.round(n).toLocaleString('en-ZA').replace(/,/g, ' ')}`

export default function Stage() {
  const wrap = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [vp, setVp] = useState({ w: 1440, h: 810 })
  const [p, setP] = useState(0)
  const [intro, setIntro] = useState(0)

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))

  useLayoutEffect(() => {
    const fit = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  /* The hero's own clock: runs the word stagger once on load, then hands
     over to the scrollbar. With reduced motion it simply arrives. */
  useEffect(() => {
    if (reduce) {
      setIntro(at(INTRO_MS))
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const ms = Math.min(now - t0 - 250, INTRO_MS)
      setIntro(Math.max(0, at(ms)))
      if (ms < INTRO_MS) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  const mobile = vp.w < 768
  const L = mobile ? M : D
  const scale = mobile ? Math.min(vp.w / L.W, vp.h / L.H) : vp.w / L.W
  const offX = mobile ? (vp.w - L.W * scale) / 2 : 0
  const offY = mobile ? Math.max(0, (vp.h - L.H * scale) / 2) : 0

  /* hero reveals take whichever is further along: the intro clock or the scroll */
  const hp = Math.max(p, intro)

  /* group positions, interpolated across the four frames */
  const m1 = ramp(p, P.move1)
  const m2 = ramp(p, P.move2)
  const y53 = lerp(L.G.g53.start, L.G.g53.end, m1)
  const y54 = lerp(lerp(L.G.g54.enter, L.G.g54.mid, m1), L.G.g54.end, m2)
  const y55 = lerp(lerp(L.G.g55.enter, L.G.g55.mid, m1), L.G.g55.end, m2)

  /* the seams: each photograph dissolves into the next over a narrow band */
  const h = SEAM_BAND / 2
  const mix = SEAMS.map((s) => ramp(p, [s - h, s + h]))
  const sceneOpacity = [1 - mix[0], mix[0] * (1 - mix[1]), mix[1]]
  const sceneRange: [number, number][] = [
    [0, SEAMS[0] + h],
    [SEAMS[0] - h, SEAMS[1] + h],
    [SEAMS[1] - h, 1],
  ]

  const stat = span(hp, P.stat)

  return (
    <div ref={wrap} style={{ height: `${SCROLL_VH}vh`, background: INK }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          /* Desktop: the width-locked board, never shorter than the window.
             Phones: exactly the screen; the board is fitted inside it. */
          height: mobile ? '100svh' : `max(calc(100vw * ${L.H} / ${L.W}), 100vh)`,
          overflow: 'hidden',
        }}
      >
        {SCENES.map((s, i) => {
          const k = ramp(p, sceneRange[i])
          const z = reduce ? 1.04 : 1.04 + 0.12 * k
          return (
            <img
              key={s.src}
              src={s.src}
              alt=""
              aria-hidden="true"
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: s.pos,
                opacity: sceneOpacity[i],
                transform: `scale(${z}) translateY(${reduce ? 0 : (0.5 - k) * 2}%)`,
                willChange: 'transform, opacity',
              }}
            />
          )
        })}

        {/* section scrims, viewport-wide so they never leave strips of bare photo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: mobile
              ? 'linear-gradient(180deg, rgba(14,13,11,0.78) 0%, rgba(14,13,11,0.55) 42%, rgba(14,13,11,0.88) 100%)'
              : 'linear-gradient(90deg, rgba(14,13,11,0.9) 0%, rgba(14,13,11,0.6) 36%, rgba(14,13,11,0.25) 62%, rgba(14,13,11,0.45) 100%)',
            opacity: 1 - ramp(p, P.move1),
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(70% 60% at 50% 72%, rgba(14,13,11,0.88) 0%, rgba(14,13,11,0.5) 58%, rgba(14,13,11,0.2) 100%)',
            opacity: ramp(p, P.move1) * (1 - ramp(p, P.move2)),
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(14,13,11,0.2) 30%, rgba(14,13,11,0.82) 68%, rgba(14,13,11,0.92) 100%)',
            opacity: ramp(p, P.move2),
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        {/* a soft fade at the foot so the page below continues the ink */}
        <div
          style={{
            position: 'absolute',
            inset: 'auto 0 0 0',
            height: 120,
            background: `linear-gradient(180deg, rgba(14,13,11,0) 0%, ${INK} 100%)`,
            opacity: ramp(p, [0.9, 1]),
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: px(offX),
            top: px(offY),
            width: px(L.W),
            height: px(L.H),
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            zIndex: 2,
          }}
        >
          {/* ---- index rail: in the right margin, clear of the hero card ---- */}
          {L.rail && (
            <div style={box(L.W - 64, 451, 36, 272)} aria-hidden="true">
              {['01', '02', '03', '04', '05'].map((n, i) => (
                <div
                  key={n}
                  className="label"
                  style={{
                    position: 'absolute',
                    top: px(i * 64),
                    right: 0,
                    fontSize: px(15),
                    letterSpacing: '0.12em',
                    color: i === Math.min(4, Math.floor(p * 5)) ? GOLD : 'rgba(246,241,231,0.4)',
                    transition: 'color 300ms ease',
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          )}

          {/* ================= GROUP 53 — the hero ================= */}
          {/* Groups that have travelled off the board are made inert, so
              keyboard focus never lands on something out of sight. */}
          <div
            style={{ ...box(L.SAFE, 0, L.GW, 642), transform: `translateY(${y53}px)`, willChange: 'transform' }}
            inert={y53 < -560}
          >
            <div
              className="label"
              style={{
                position: 'absolute',
                left: 0,
                top: px(L.eyebrowTop),
                color: GOLD,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: span(hp, P.word),
              }}
            >
              <span style={{ width: 28, height: 1, background: GOLD }} />
              Wedding &amp; Event Planner · Vosloorus
            </div>

            <h1 aria-label="Moments made opulent" style={{ margin: 0 }}>
              {(['Moments', 'Made', 'Opulent.'] as const).map((word, i) => (
                <Mask
                  key={word}
                  t={span(hp, [P.word, P.word2, P.word3][i])}
                  style={{ position: 'absolute', left: 0, top: px(L.word.tops[i]), width: px(L.word.w), height: px(L.word.h) }}
                >
                  <div
                    className="display"
                    style={{
                      fontSize: px(L.word.size),
                      lineHeight: px(L.word.line + 8),
                      fontStyle: i === 2 ? 'italic' : 'normal',
                      fontWeight: i === 2 ? 400 : 500,
                    }}
                  >
                    {word}
                  </div>
                </Mask>
              ))}
            </h1>

            <p style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
              {L.body.lines.join(' ')}
            </p>
            {L.body.lines.map((line, i) => (
              <Mask
                key={line}
                t={span(hp, [at(200 + i * 75), at(500 + i * 75)])}
                style={{ position: 'absolute', left: 0, top: px(L.body.top + i * L.body.step), width: px(L.body.w), height: px(L.body.step + 6) }}
              >
                <div style={{ fontSize: px(L.body.size), lineHeight: px(L.body.step), color: 'rgba(246,241,231,0.84)' }}>{line}</div>
              </Mask>
            ))}

            {/* the two actions */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: px(L.buttons.top),
                opacity: span(hp, P.body3),
                display: 'flex',
                gap: px(12),
              }}
            >
              <a href="#contact" className="btn-gold">
                {L.buttons.primary}
              </a>
              <a href="#packages" className="btn-ghost" style={{ paddingRight: 8 }}>
                {L.buttons.secondary}
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(246,241,231,0.14)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Arrow />
                </span>
              </a>
            </div>

            {/* The packages card — Marlin's telemetry card, carrying the
                studio's real hire figures instead of efficiency numbers. */}
            <a
              href="#packages"
              aria-label="Tent and chair hire packages from R6 000 — view packages"
              className="glass"
              style={{
                position: 'absolute',
                left: px(L.card.left),
                top: px(L.card.top),
                width: px(L.card.w),
                height: px(L.card.h),
                borderRadius: px(L.card.r),
                opacity: stat,
                transform: `translateY(${(1 - stat) * 28}px)`,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <div style={{ position: 'absolute', inset: `${px(L.card.pad[0])} ${px(L.card.pad[1])}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: px(L.card.titleSize), lineHeight: 1.35, color: 'rgba(246,241,231,0.9)' }}>
                    Tent &amp; chair
                    <br />
                    hire packages
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="label" style={{ fontSize: 10, color: 'rgba(246,241,231,0.55)' }}>
                      from
                    </div>
                    <div className="display" style={{ fontSize: px(L.card.priceSize), lineHeight: 0.9, fontWeight: 500 }}>
                      {rands(6000 * stat)}
                    </div>
                  </div>
                </div>

                {/* a gold hairline that draws in with the figure */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: px(L.card.trackTop),
                    height: 3,
                    borderRadius: 999,
                    background: 'rgba(246,241,231,0.14)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ width: `${100 * stat}%`, height: '100%', borderRadius: 999, background: GOLD, boxShadow: `0 0 12px ${GOLD}` }} />
                </div>
                <div
                  className="label"
                  style={{ position: 'absolute', left: 0, top: px(L.card.capTop), fontSize: 10, letterSpacing: '0.14em', color: 'rgba(246,241,231,0.5)' }}
                >
                  6 m × 12 m and 6 m × 24 m framed tents
                </div>

                <div style={{ position: 'absolute', left: 0, right: 0, top: px(L.card.ruleTop), height: 1, background: 'rgba(246,241,231,0.14)' }} />

                <div style={{ position: 'absolute', left: 0, right: 0, top: px(L.card.readTop), display: 'flex' }}>
                  {(
                    [
                      ['Guests', 100, 'max'],
                      ['Chair styles', 5, ''],
                      ['Packages', 5, ''],
                    ] as const
                  ).map(([k, v, u], i) => (
                    <div
                      key={k}
                      style={{
                        flex: 1,
                        paddingLeft: i ? px(18) : 0,
                        borderLeft: i ? '1px solid rgba(246,241,231,0.14)' : undefined,
                      }}
                    >
                      <div className="display" style={{ fontSize: px(L.card.readSize), lineHeight: 1 }}>
                        {Math.round(v * stat)}
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, opacity: 0.6, marginLeft: 3 }}>{u}</span>
                      </div>
                      <div className="label" style={{ marginTop: 7, fontSize: 9.5, letterSpacing: '0.14em', color: 'rgba(246,241,231,0.55)' }}>
                        {k}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </div>

          {/* ================= GROUP 54 — the four tiles ================= */}
          <div
            style={{ ...box(L.SAFE, 0, L.GW, 640), transform: `translateY(${y54}px)`, willChange: 'transform' }}
            inert={y54 > L.H - 80 || y54 < -560}
          >
            {TILES.map((c, i) => {
              const t = span(p, [P.g54In[0] + i * 0.004, P.g54In[1]])
              const T = L.tiles
              return (
                <a
                  key={c.art}
                  href="#services"
                  aria-label={`${c.label.join(' ')} — see services`}
                  style={{
                    position: 'absolute',
                    left: px(T.pos[i][0]),
                    top: px(T.pos[i][1]),
                    width: px(T.w),
                    height: px(T.h),
                    opacity: t,
                    color: 'inherit',
                    borderRadius: px(T.r),
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, borderRadius: px(T.r), overflow: 'hidden' }}>
                    <img
                      src={`img/${c.art}.jpg`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* the label sits on a photograph, so it gets its own ground */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(150deg, rgba(14,13,11,0.82) 0%, rgba(14,13,11,0.35) 52%, rgba(14,13,11,0.08) 100%)',
                      }}
                    />
                  </div>
                  <div
                    style={{ position: 'absolute', inset: 0, borderRadius: px(T.r), border: '1px solid rgba(201,173,106,0.38)', pointerEvents: 'none' }}
                  />
                  <div
                    className="display"
                    style={{ position: 'absolute', left: px(T.labelLeft), top: px(T.labelTop), fontSize: px(T.labelSize), lineHeight: px(T.labelLine), fontWeight: 600 }}
                  >
                    {c.label[0]}
                    <br />
                    <span style={{ fontStyle: 'italic', fontWeight: 400 }}>{c.label[1]}</span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      right: px(T.btnInset),
                      bottom: px(T.btnInset),
                      width: px(T.btn),
                      height: px(T.btn),
                      borderRadius: '50%',
                      background: 'rgba(246,241,231,0.18)',
                      border: '1px solid rgba(246,241,231,0.4)',
                      display: 'grid',
                      placeItems: 'center',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    <Arrow size={mobile ? 11 : 14} />
                  </div>
                </a>
              )
            })}

            <h2
              className="display"
              style={{
                position: 'absolute',
                left: 0,
                width: px(L.GW),
                top: px(L.g54.headTop),
                margin: 0,
                fontSize: px(L.g54.headSize),
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              Styled to the <em style={{ fontWeight: 400 }}>last detail</em>
            </h2>
            <p
              style={{
                position: 'absolute',
                left: px((L.GW - L.g54.subW) / 2),
                top: px(L.g54.subTop),
                width: px(L.g54.subW),
                margin: 0,
                fontSize: px(L.g54.subSize),
                lineHeight: px(L.g54.subLine),
                textAlign: 'center',
                color: 'rgba(246,241,231,0.86)',
              }}
            >
              From intimate showers to 100-guest marquees — every chair, drape and centrepiece chosen with you.
            </p>
          </div>

          {/* ================= GROUP 55 — the close ================= */}
          <div
            style={{ ...box(L.SAFE, 0, L.GW, 810), transform: `translateY(${y55}px)`, willChange: 'transform' }}
            inert={y55 > L.H - L.g55.headTop}
          >
            <div style={{ position: 'absolute', left: 0, top: px(L.g55.ruleTop), width: px(56), height: px(2), background: GOLD }} />
            <h2
              className="display"
              style={{
                position: 'absolute',
                left: 0,
                top: px(L.g55.headTop),
                width: px(L.g55.headW),
                margin: 0,
                fontSize: px(L.g55.headSize),
                lineHeight: px(L.g55.headLine),
              }}
            >
              Beautifully handled, from first call to <em style={{ fontWeight: 400 }}>final toast.</em>
            </h2>
            <p
              style={{
                position: 'absolute',
                left: px(L.g55.paraLeft),
                top: px(L.g55.paraTop),
                width: px(L.g55.paraW),
                margin: 0,
                fontSize: px(L.g55.paraSize),
                lineHeight: px(L.g55.paraLine),
                color: 'rgba(246,241,231,0.8)',
              }}
            >
              We plan, style and supply — décor, florals, draping, tents, chairs, lounge furniture and gift hampers — so
              you can be fully present on the day. Proudly based in Vosloorus, Boksburg.
            </p>
            <a
              href="#services"
              className="btn-ghost"
              style={{ position: 'absolute', left: px(L.g55.paraLeft), top: px(L.g55.linkTop) }}
            >
              Explore our services <Arrow />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
