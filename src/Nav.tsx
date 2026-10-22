import { useEffect, useRef, useState } from 'react'
import { SITE } from './site'

/*
  The nav sits outside the scaled artboard, at natural size, so it stays
  readable at any width. A gradient rather than a bar — a solid fill draws a
  hard seam across the photography — and the same gradient masks the blur so
  it fades out with the tint. Under 960px the links move into a sheet.
*/

export const NAV = [
  { t: 'Services', href: '#services' },
  { t: 'Packages', href: '#packages' },
  { t: 'Hampers', href: '#hampers' },
  { t: 'Gallery', href: '#gallery' },
  { t: 'Reviews', href: '#reviews' },
  { t: 'Contact', href: '#contact' },
]

export function Wordmark({ size = 36 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <img src="img/logo-mark.png" alt="" width={size} height={size * 0.75} style={{ objectFit: 'contain', height: size * 0.75 }} />
      <span
        className="display"
        style={{ fontSize: size * 0.48, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}
      >
        Bespoke Opulence
      </span>
    </span>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)
  const sheet = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    sheet.current?.querySelector('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <a
        href="#services"
        className="label"
        style={{ position: 'fixed', left: 16, top: -60, zIndex: 100, padding: '12px 16px', background: 'var(--color-gold)', color: 'var(--color-ink)', borderRadius: 8 }}
        onFocus={(e) => (e.currentTarget.style.top = '12px')}
        onBlur={(e) => (e.currentTarget.style.top = '-60px')}
      >
        Skip to content
      </a>

      <header
        style={{
          position: 'fixed',
          inset: '0 0 auto 0',
          height: 112,
          zIndex: 50,
          pointerEvents: 'none',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,9,7,0.82) 0%, rgba(10,9,7,0.45) 48%, rgba(10,9,7,0) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maskImage: 'linear-gradient(180deg, #000 0%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 40%, transparent 100%)',
          }}
        />
        <nav
          aria-label="Main"
          className="px-4 sm:px-8 lg:px-10"
          style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 32, height: 76, pointerEvents: 'auto' }}
        >
          <a href="#top" aria-label="Bespoke Opulence — back to top" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Wordmark />
          </a>
          <div className="nav-links" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 36 }}>
            {NAV.map((n) => (
              <a
                key={n.t}
                href={n.href}
                className="label transition-colors hover:text-[var(--color-gold)]"
                style={{ color: 'rgba(246,241,231,0.82)', whiteSpace: 'nowrap', padding: '10px 0' }}
              >
                {n.t}
              </a>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="#contact" className="btn-gold hidden sm:inline-flex" style={{ minHeight: 42, padding: '0 20px', fontSize: 13 }}>
              Book now
            </a>
            <button
              ref={btn}
              type="button"
              className="nav-menu-btn"
              aria-expanded={open}
              aria-controls="nav-sheet"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                border: '1px solid rgba(246,241,231,0.3)',
                background: 'rgba(14,13,11,0.35)',
                color: 'var(--color-bone)',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                {open ? (
                  <path d="M4 4l10 10M14 4L4 14" />
                ) : (
                  <path d="M2 5h14M2 9h14M2 13h14" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          id="nav-sheet"
          ref={sheet}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          style={{ position: 'fixed', inset: 0, zIndex: 45, background: 'rgba(10,9,7,0.97)', display: 'flex', flexDirection: 'column', padding: '108px 24px 32px' }}
        >
          {NAV.map((n, i) => (
            <a
              key={n.t}
              href={n.href}
              onClick={() => setOpen(false)}
              className="display"
              style={{
                fontSize: 40,
                padding: '10px 0',
                borderBottom: '1px solid rgba(246,241,231,0.1)',
                color: 'var(--color-bone)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
              }}
            >
              <span className="label" style={{ color: 'var(--color-gold)', fontSize: 11 }}>
                0{i + 1}
              </span>
              {n.t}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-gold" style={{ marginTop: 28 }}>
            Book a consultation
          </a>
          <div className="label" style={{ marginTop: 'auto', color: 'rgba(246,241,231,0.5)' }}>
            {SITE.tagline} · {SITE.area}
          </div>
        </div>
      )}
    </>
  )
}
