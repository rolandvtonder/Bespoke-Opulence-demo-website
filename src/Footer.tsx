import { SITE, waLink } from './site'
import { NAV } from './Nav'
import { Arrow } from './Stage'

/*
  Footer, structured after the reference: a CTA band across the top, a rule,
  the brand column beside three link columns, a legal bar, and the
  oversized wordmark fading out at the bottom.
*/

const COLUMNS = [
  {
    head: 'Services',
    links: [
      { t: 'Weddings', href: '#services' },
      { t: 'Showers & reveals', href: '#services' },
      { t: "Kids' parties", href: '#services' },
      { t: 'Memorial décor', href: '#services' },
    ],
  },
  { head: 'Explore', links: NAV.slice(1, 5).map((n) => ({ t: n.t, href: n.href })) },
  {
    head: 'Follow',
    links: [
      { t: 'Facebook', href: SITE.facebook },
      { t: 'Instagram', href: SITE.instagram },
      { t: 'Google reviews', href: SITE.google },
      { t: 'Contact', href: '#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0a0907', padding: '24px 16px 0', position: 'relative', zIndex: 1 }}>
      <div
        className="px-6 pt-12 sm:px-14 sm:pt-14"
        style={{
          maxWidth: 1312,
          margin: '0 auto',
          border: '1px solid rgba(201,173,106,0.16)',
          borderRadius: 28,
          background: 'linear-gradient(180deg, rgba(29,26,21,0.9) 0%, rgba(14,13,11,0.9) 100%)',
          paddingBottom: 8,
          overflow: 'hidden',
        }}
      >
        {/* ---- CTA band ---- */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 420px' }}>
            <span
              className="label"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 14px',
                borderRadius: 999,
                border: '1px solid rgba(246,241,231,0.16)',
                color: 'rgba(246,241,231,0.8)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold)' }} />
              Now taking bookings
            </span>
            <h2 className="display" style={{ margin: '20px 0 0', fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: 1.02 }}>
              Your celebration,{' '}
              <em style={{ fontWeight: 400, color: 'rgba(246,241,231,0.72)' }}>your way</em>
            </h2>
            <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: '24px', color: 'rgba(246,241,231,0.6)', maxWidth: 420 }}>
              Book a consultation, reserve a tent package, or order a hamper.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-gold">
              Book a consultation
            </a>
            <a href={waLink(`Hi ${SITE.name}!`)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              WhatsApp us <Arrow />
            </a>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(246,241,231,0.10)', margin: '44px 0 40px' }} />

        {/* ---- brand + link columns ---- */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <img src="img/logo.png" alt="Bespoke Opulence — Wedding & Event Planner" width={180} height={155} style={{ width: 180, height: 'auto' }} loading="lazy" />
            <p style={{ margin: '18px 0 0', fontSize: 14, lineHeight: '22px', color: 'rgba(246,241,231,0.55)', maxWidth: 280 }}>
              Weddings, celebrations and memorial décor, with tent, chair and lounge hire. {SITE.area}.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.head} style={{ flex: '0 1 170px' }}>
              <div className="label" style={{ color: 'rgba(246,241,231,0.45)', marginBottom: 12 }}>
                {col.head}
              </div>
              {col.links.map((l) => (
                <a
                  key={l.t}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover:text-[var(--color-gold)]"
                  style={{ display: 'block', fontSize: 14, lineHeight: '36px', color: 'rgba(246,241,231,0.78)' }}
                >
                  {l.t}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* ---- legal bar ---- */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            fontSize: 13,
            color: 'rgba(246,241,231,0.45)',
            borderTop: '1px solid rgba(246,241,231,0.10)',
            marginTop: 40,
            padding: '20px 0 28px',
          }}
        >
          <span>&#169; {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>{SITE.tagline} · {SITE.area}</span>
        </div>

        {/* ---- the wordmark, fading into the panel ---- */}
        <div
          className="display"
          aria-hidden="true"
          style={{
            fontSize: 'clamp(46px, 10.5vw, 168px)',
            lineHeight: 1.04,
            textAlign: 'center',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            background: 'linear-gradient(180deg, rgba(201,173,106,0.42) 0%, rgba(201,173,106,0.03) 82%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            marginBottom: 4,
          }}
        >
          Bespoke Opulence
        </div>
      </div>
      <div style={{ height: 16 }} />
    </footer>
  )
}
