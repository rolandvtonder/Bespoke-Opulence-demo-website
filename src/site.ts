/*
  Business details, in one place. Fill in the blanks before going live —
  anything left empty is simply hidden on the page.

  whatsapp: international format, digits only (e.g. 27821234567 for 082 123 4567).
*/
export const SITE: Record<
  'name' | 'tagline' | 'area' | 'address' | 'whatsapp' | 'phone' | 'email' | 'facebook' | 'facebookReviews' | 'instagram' | 'google',
  string
> = {
  name: 'Bespoke Opulence',
  tagline: 'Wedding & Event Planner',
  area: 'Vosloorus, Boksburg',
  address: 'Inyela Cres, Vosloorus Ext 7, Boksburg, 1475',
  whatsapp: '27833718737',
  phone: '083 371 8737',
  email: '',
  facebook: 'https://www.facebook.com/BespokeEven/',
  facebookReviews: 'https://www.facebook.com/BespokeEven/reviews',
  instagram: 'https://www.instagram.com/bespoke_opulence/',
  google: 'https://www.google.com/maps/search/?api=1&query=Bespoke%20Opulence%20Vosloorus',
}

/** wa.me link with a pre-filled message. With no number set, WhatsApp asks who to send it to. */
export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

/** As shown on the Google Business listing. Update when it changes. */
export const GOOGLE_RATING = { score: '5.0', count: 4 }

export const GOLD = '#c9ad6a'
export const INK = '#0e0d0b'
