import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { EVENT_TYPES } from './data'
import { SITE, waLink } from './site'
import { Eyebrow, type Prefill } from './Sections'
import { Arrow } from './Stage'

/*
  Contact & booking. There is no server: the form composes a WhatsApp
  message from what the visitor filled in and opens WhatsApp with it, so the
  enquiry lands in the studio's chats with every detail already written.
*/

type Fields = { name: string; phone: string; type: string; date: string; guests: string; venue: string; message: string }
const EMPTY: Fields = { name: '', phone: '', type: '', date: '', guests: '', venue: '', message: '' }

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: (ids: { id: string; describedBy?: string }) => ReactNode
}) {
  const id = useId()
  const errId = `${id}-err`
  const hintId = `${id}-hint`
  const describedBy = [error ? errId : '', hint ? hintId : ''].filter(Boolean).join(' ') || undefined
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold text-[var(--color-bone)]">
        {label}
        {required && (
          <span className="text-[var(--color-gold)]" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children({ id, describedBy })}
      {hint && !error && (
        <p id={hintId} className="m-0 text-[12px] text-white/50">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} className="m-0 text-[13px] text-[#f0a597]">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact({ prefill }: { prefill: Prefill | null }) {
  const [f, setF] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [sent, setSent] = useState(false)
  const form = useRef<HTMLFormElement>(null)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (!prefill) return
    setF((cur) => ({ ...cur, type: prefill.type, message: prefill.note || cur.message }))
    setErrors({})
    setSent(false)
  }, [prefill])

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((cur) => ({ ...cur, [k]: e.target.value }))
    if (errors[k]) setErrors((cur) => ({ ...cur, [k]: undefined }))
  }

  const validate = (v: Fields) => {
    const e: Partial<Record<keyof Fields, string>> = {}
    if (!v.name.trim()) e.name = 'Please tell us your name.'
    if (!v.type) e.type = 'Choose the kind of event so we know what to quote.'
    if (v.phone && !/^[+\d][\d\s()-]{8,}$/.test(v.phone.trim())) e.phone = 'Enter a phone number like 082 123 4567.'
    if (v.guests && !(Number(v.guests) > 0)) e.guests = 'Enter the number of guests as a number, e.g. 80.'
    return e
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(f)
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const lines = [
      `Hi ${SITE.name}! I'd like to enquire about an event.
`,
      `Name: ${f.name.trim()}`,
      f.phone && `Phone: ${f.phone.trim()}`,
      `Event: ${f.type}`,
      f.date && `Date: ${new Date(f.date + 'T00:00').toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      f.guests && `Guests: ${f.guests}`,
      f.venue && `Venue / area: ${f.venue.trim()}`,
      f.message && `\n${f.message.trim()}`,
    ].filter(Boolean)
    window.open(waLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const contacts = [
    SITE.whatsapp && { k: 'WhatsApp', v: SITE.whatsapp.replace(/^(\d{2})(\d{2})(\d{3})(\d{4})$/, '+$1 $2 $3 $4'), href: waLink(`Hi ${SITE.name}!`) },
    SITE.phone && { k: 'Call', v: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
    SITE.email && { k: 'Email', v: SITE.email, href: `mailto:${SITE.email}` },
    { k: 'Facebook', v: 'Bespoke Opulence', href: SITE.facebook },
    { k: 'Instagram', v: '@bespoke_opulence', href: SITE.instagram },
  ].filter(Boolean) as { k: string; v: string; href: string }[]

  return (
    <section id="contact" className="border-t border-white/[0.07] bg-[var(--color-ink-2)] py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1312px] gap-12 px-4 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>Contact &amp; booking</Eyebrow>
          <h2 className="display mt-5 text-[44px] leading-[0.98] sm:text-[56px] lg:text-[68px]">
            Let's plan <em className="font-normal">your day</em>
          </h2>
          <p className="mt-6 max-w-[460px] text-[16px] leading-[1.7] text-[var(--color-mist)]">
            Share a few details and we'll come back to you with ideas and a quote. The form opens WhatsApp with your message ready to send.
          </p>

          <ul className="mt-10 grid gap-0 border-t border-white/10">
            {contacts.map((c) => (
              <li key={c.k} className="border-b border-white/10">
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex min-h-[56px] items-center justify-between gap-4 py-3 text-[var(--color-bone)]"
                >
                  <span className="label text-[10.5px] text-white/50">{c.k}</span>
                  <span className="flex items-center gap-3 text-[15px] group-hover:text-[var(--color-gold)]">
                    {c.v} <Arrow />
                  </span>
                </a>
              </li>
            ))}
            <li className="flex min-h-[56px] items-center justify-between gap-6 border-b border-white/10 py-3">
              <span className="label text-[10.5px] text-white/50">Address</span>
              <a href={SITE.google} target="_blank" rel="noopener noreferrer" className="text-right text-[15px] text-[var(--color-bone)] hover:text-[var(--color-gold)]">
                {SITE.address}
              </a>
            </li>
          </ul>

          <div className="mt-8 overflow-hidden rounded-[24px] border border-white/10">
            <iframe
              title="Map showing Bespoke Opulence in Vosloorus Ext 7, Boksburg"
              src="https://maps.google.com/maps?q=Inyela%20Cres%2C%20Vosloorus%20Ext%207%2C%20Boksburg%2C%201475&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[260px] w-full border-0"
              style={{ filter: 'grayscale(1) invert(0.9) contrast(0.9) brightness(0.95)' }}
            />
          </div>
        </motion.div>

        <motion.form
          ref={form}
          noValidate
          onSubmit={submit}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="grid content-start gap-5 rounded-[28px] border border-white/10 bg-[var(--color-ink)] p-6 sm:p-10"
          aria-describedby="form-note"
        >
          <h3 className="display m-0 text-[32px] leading-none">Event enquiry</h3>
          <p id="form-note" className="-mt-2 mb-1 text-[13px] text-white/50">
            Fields marked <span className="text-[var(--color-gold)]">*</span> are required.
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" required error={errors.name}>
              {({ id, describedBy }) => (
                <input id={id} name="name" className="field" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={describedBy} aria-required="true" />
              )}
            </Field>
            <Field label="Phone number" error={errors.phone}>
              {({ id, describedBy }) => (
                <input id={id} name="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" value={f.phone} onChange={set('phone')} onBlur={() => setErrors((cur) => ({ ...cur, phone: validate(f).phone }))} aria-invalid={!!errors.phone} aria-describedby={describedBy} />
              )}
            </Field>
          </div>

          <Field label="Type of event" required error={errors.type}>
            {({ id, describedBy }) => (
              <select id={id} name="type" className="field cursor-pointer" value={f.type} onChange={set('type')} aria-invalid={!!errors.type} aria-describedby={describedBy} aria-required="true">
                <option value="" disabled>
                  Choose one…
                </option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Event date" hint="Approximate is fine.">
              {({ id, describedBy }) => (
                <input id={id} name="date" type="date" min={today} className="field" value={f.date} onChange={set('date')} aria-describedby={describedBy} />
              )}
            </Field>
            <Field label="Number of guests" error={errors.guests}>
              {({ id, describedBy }) => (
                <input id={id} name="guests" type="number" inputMode="numeric" min={1} className="field" value={f.guests} onChange={set('guests')} aria-invalid={!!errors.guests} aria-describedby={describedBy} />
              )}
            </Field>
          </div>

          <Field label="Venue or area">
            {({ id, describedBy }) => (
              <input id={id} name="venue" className="field" placeholder="e.g. our home in Vosloorus" value={f.venue} onChange={set('venue')} aria-describedby={describedBy} />
            )}
          </Field>

          <Field label="Tell us about it" hint="Colours, theme, package or hamper you're interested in — anything helps.">
            {({ id, describedBy }) => (
              <textarea id={id} name="message" rows={4} className="field resize-y" value={f.message} onChange={set('message')} aria-describedby={describedBy} />
            )}
          </Field>

          <button type="submit" className="btn-gold mt-2 w-full sm:w-auto sm:justify-self-start">
            Send on WhatsApp <Arrow />
          </button>

          <p role="status" aria-live="polite" className="m-0 min-h-[20px] text-[14px] text-[var(--color-gold)]">
            {sent && 'WhatsApp has opened with your message — just press send. Thank you!'}
          </p>
          {import.meta.env.DEV && !SITE.whatsapp && (
            <p className="m-0 rounded-xl border border-dashed border-[var(--color-gold)] p-3 text-[12px] text-white/70">
              Developer note: add the WhatsApp number in <code>src/site.ts</code> so enquiries go straight to the studio. (Only shown in development.)
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
