/*
  Page content. Packages and hampers are transcribed from Bespoke Opulence's
  own price sheets; photos are theirs, resized into public/img.
*/

export type Service = {
  id: string
  title: string
  copy: string
  img: string
  alt: string
  price: string
  /** where the card's action goes: the enquiry form, or a section of its own */
  href?: string
}

export const SERVICES: Service[] = [
  {
    id: 'wedding',
    title: 'Weddings',
    copy: 'Full planning or day-of styling: ceremony and reception décor, florals, table settings, bridal lounges and draping.',
    img: 'img/card-wedding.jpg',
    alt: 'Banquet tables with African print napkins and tall white floral arrangements',
    price: 'Quote on request',
  },
  {
    id: 'shower',
    title: 'Bridal & Baby Showers',
    copy: 'Showers, gender reveals and kitchen teas styled around your colour palette — tablescapes, backdrops, balloons and favours.',
    img: 'img/gallery/g58-sm.jpg',
    alt: 'Blush pink outdoor long table with ghost chairs and posies',
    price: 'Quote on request',
  },
  {
    id: 'party',
    title: "Kids' Parties & Birthdays",
    copy: 'Themed setups for every age, from first birthdays to milestone 21sts: balloon garlands, backdrops, dessert tables and lounge corners.',
    img: 'img/card-party.jpg',
    alt: 'Black and gold birthday dinner with balloons and a chandelier',
    price: 'Quote on request',
  },
  {
    id: 'memorial',
    title: 'Funeral & Memorial Décor',
    copy: 'Dignified, respectful décor for memorial services and after-tears: marquee draping, floral tributes, portrait stages and seating.',
    img: 'img/card-memorial.jpg',
    alt: 'Memorial stage with portrait, white flowers and a gold candle stand',
    price: 'Quote on request',
  },
  {
    id: 'hire',
    title: 'Tent, Chair & Lounge Hire',
    copy: 'Framed tents with chairs for 50 or 100 guests in five chair styles, plus velvet and Chesterfield lounge sets.',
    img: 'img/gallery/g02-sm.jpg',
    alt: 'Black velvet lounge furniture with gold-framed tables',
    price: 'From R6 000',
    href: '#packages',
  },
  {
    id: 'hamper',
    title: 'Gift Hampers',
    copy: 'Curated hampers with bubbly, chocolates, biltong and flowers — wrapped and ready to give.',
    img: 'img/hampers/le-vie-en-lux.jpg',
    alt: 'Moët & Chandon champagne with Ferrero Rocher chocolates',
    price: 'From R600',
    href: '#hampers',
  },
]

export type Package = {
  n: number
  chair: string
  img: string
  small: string
  large: string
}

/* Each package: a 6m x 12m tent with 50 chairs, or a 6m x 24m tent with 100. */
export const PACKAGES: Package[] = [
  { n: 1, chair: 'White/Black & Gold Padded', img: 'img/packages/chair-1.jpg', small: 'R7 500', large: 'R15 000' },
  { n: 2, chair: 'White Princess', img: 'img/packages/chair-2.jpg', small: 'R7 500', large: 'R15 000' },
  { n: 3, chair: 'Gold Phoenix', img: 'img/packages/chair-3.jpg', small: 'R6 000', large: 'R12 000' },
  { n: 4, chair: "O'Back", img: 'img/packages/chair-4.jpg', small: 'R6 000', large: 'R12 000' },
  { n: 5, chair: 'CrossBack', img: 'img/packages/chair-5.jpg', small: 'R6 500', large: 'R11 500' },
]

export type Hamper = {
  name: string
  img: string
  items: string[]
  price: string
}

/* Ordered by price. "Taste of the Bush" on the sheets is the same crate as
   Man's Crate, so it is listed once. */
export const HAMPERS: Hamper[] = [
  { name: 'Bunny Chaser', img: 'bunny-chaser', items: ['Hat box of Nestlé chocolates'], price: 'R600' },
  {
    name: 'Inkomo in a Hat',
    img: 'inkomo-in-a-hat',
    items: ['Biltong', 'Dry wors', 'Low-GI mix', 'Lifestyle immune-support mix'],
    price: 'R600 · R750 · R850',
  },
  {
    name: "An Elegant Orchid's Lover",
    img: 'orchids-lover',
    items: ['Mini phalaenopsis orchid in pink & red', 'Heart balloons', 'Orchid colour & balloons may vary'],
    price: 'R700',
  },
  {
    name: 'Ferrero Fatale',
    img: 'ferrero-fatale',
    items: ['Edible chocolate arrangement', 'Ferrero Rocher truffles', 'Chocolate-shaped hearts'],
    price: 'R700',
  },
  {
    name: "Man's Crate",
    img: 'mans-crate',
    items: ['Bottle of red wine', 'Variety of biltong', 'Variety of nuts'],
    price: 'R750',
  },
  {
    name: "La Nuit d'Amour",
    img: 'la-nuit-damour',
    items: ['Lindt chocolate balls', 'Fluffy handcuffs', 'Bottle of Pongrácz, gift-boxed with a bow'],
    price: 'R750',
  },
  {
    name: 'Sip & Snack? On Me!',
    img: 'sip-and-snack',
    items: ['Van Loveren River red wine', 'Dried fruit, cashews & almonds', 'Biltong or dry wors', 'Nougat bonbons & shortbread'],
    price: 'R800',
  },
  {
    name: 'Indulge Me',
    img: 'indulge-me',
    items: ['Wooden crate of sweet chocolates', 'Nestlé, Cadbury & Lindt treats'],
    price: 'R900',
  },
  {
    name: 'La Vida Crush',
    img: 'la-vida-crush',
    items: ['Vida coffee', 'Red Espresso hot chocolate', 'Assorted cookies'],
    price: 'R900',
  },
  {
    name: 'Tuscan Temptation',
    img: 'tuscan-temptation',
    items: ['Red rose bouquet', 'Wrapped around Ferrero Rocher truffles'],
    price: 'R1 100',
  },
  {
    name: 'Love in the Vineyards',
    img: 'love-in-the-vineyards',
    items: ['Woven picnic basket', 'Sparkling wine & white Lindt chocolate', '2 plates, cutlery & wine glasses', 'Bottle opener, salt & pepper shakers'],
    price: 'R1 200',
  },
  {
    name: 'Voluptuous Moments',
    img: 'voluptuous-moments',
    items: ['Johnnie Walker Black Label', '150 g Lindt Les Grandes hazelnut chocolate', 'Luxury gift box'],
    price: 'R1 200',
  },
  {
    name: 'Le Vie en Lux',
    img: 'le-vie-en-lux',
    items: ['Moët Impérial Brut', 'Box of Ferrero Rocher', 'Gift box & bow'],
    price: 'R1 800',
  },
]

export type Shot = { id: string; cat: Category; w: number; h: number; alt: string }
export type Category = 'Weddings' | 'Celebrations' | 'Memorials' | 'Hire & Lounge' | 'Events'
export const CATEGORIES: Category[] = ['Weddings', 'Celebrations', 'Memorials', 'Hire & Lounge', 'Events']

/* w/h are the -sm thumbnail sizes, so the grid reserves space before load. */
export const GALLERY: Shot[] = [
  { id: 'g12', cat: 'Weddings', w: 720, h: 720, alt: 'Long banquet tables with African print napkins, tall floral arrangements and a head-table sofa' },
  { id: 'g04', cat: 'Weddings', w: 540, h: 720, alt: 'Round reception tables with gold chargers, gold runners and white linen in a draped marquee' },
  { id: 'g20', cat: 'Weddings', w: 720, h: 720, alt: 'Cream tufted bridal sofa with white floral arrangements on gold stands' },
  { id: 'g10', cat: 'Weddings', w: 540, h: 720, alt: 'Wedding reception with gold Phoenix chairs and floral centrepieces' },
  { id: 'g58', cat: 'Weddings', w: 540, h: 720, alt: 'Outdoor long-table setting in blush pink with ghost chairs and posies' },
  { id: 'g13', cat: 'Weddings', w: 720, h: 720, alt: 'Place setting with African print napkin, woven charger and gold-rimmed glassware' },
  { id: 'g05', cat: 'Weddings', w: 540, h: 720, alt: 'Three-tier black and white wedding cake with pink roses and a gold name topper' },
  { id: 'g07', cat: 'Weddings', w: 540, h: 720, alt: 'Gold and white wedding place settings with a table number' },
  { id: 'g06', cat: 'Weddings', w: 540, h: 720, alt: 'Marquee reception with crystal chairs, gold sashes and floral centrepieces' },
  { id: 'g11', cat: 'Weddings', w: 540, h: 720, alt: 'Wide view of a wedding marquee with ghost chairs and gold accents' },
  { id: 'g09', cat: 'Weddings', w: 540, h: 720, alt: 'Wedding marquee laid with white linen, gold chargers and Tiffany chairs' },
  { id: 'g18', cat: 'Weddings', w: 720, h: 720, alt: 'Pampas grass and gold hoop installation at a traditional celebration' },
  { id: 'g23', cat: 'Celebrations', w: 539, h: 720, alt: 'Black and gold birthday dinner with chandelier, balloons and velvet seating' },
  { id: 'g24', cat: 'Celebrations', w: 539, h: 720, alt: 'Black sequin tablescape with candles, blue glassware and fresh flowers' },
  { id: 'g22', cat: 'Celebrations', w: 539, h: 720, alt: 'Emerald velvet lounge corner with black and gold balloons' },
  { id: 'g28', cat: 'Celebrations', w: 539, h: 720, alt: 'Black and gold balloon garland above a candlelit dinner table' },
  { id: 'g25', cat: 'Celebrations', w: 539, h: 720, alt: 'Black and gold dining chairs around a sequin-covered table' },
  { id: 'g29', cat: 'Celebrations', w: 539, h: 720, alt: 'Personalised 21st birthday bar with a row of champagne glasses' },
  { id: 'g26', cat: 'Celebrations', w: 539, h: 720, alt: 'Black velvet chairs with gold trim lining a dinner table' },
  { id: 'g41', cat: 'Celebrations', w: 514, h: 720, alt: 'Christmas décor with tartan bows, emerald chairs and red napkins' },
  { id: 'g14', cat: 'Memorials', w: 540, h: 720, alt: 'Memorial stage with portrait, white flowers and a gold candle stand under draped ceiling' },
  { id: 'g16', cat: 'Memorials', w: 540, h: 720, alt: 'Memorial service tent with black chairs, red aisle carpet and draped ceiling' },
  { id: 'g17', cat: 'Memorials', w: 540, h: 720, alt: 'Family at a memorial stage with candles and floral tributes' },
  { id: 'g21', cat: 'Memorials', w: 540, h: 720, alt: 'Memorial tent laid out with rows of chairs and a red aisle' },
  { id: 'g02', cat: 'Hire & Lounge', w: 720, h: 540, alt: 'Black velvet couches and gold-framed glass tables set up in a hall' },
  { id: 'g01', cat: 'Hire & Lounge', w: 720, h: 540, alt: 'Black tufted sofa and armchairs around a gold-frame coffee table' },
  { id: 'g15', cat: 'Hire & Lounge', w: 720, h: 480, alt: 'Outdoor VIP lounge with black Chesterfield couches under a black gazebo' },
  { id: 'g00', cat: 'Hire & Lounge', w: 720, h: 405, alt: 'Function hall furnished with black velvet lounge sets' },
  { id: 'g31', cat: 'Events', w: 480, h: 720, alt: 'Guests at a branded photo wall with black and gold lounge chairs' },
  { id: 'g19', cat: 'Events', w: 720, h: 480, alt: 'Crowd at an outdoor day event under umbrellas' },
  { id: 'g33', cat: 'Events', w: 720, h: 480, alt: 'Guests celebrating at an outdoor day party' },
  { id: 'g34', cat: 'Events', w: 720, h: 480, alt: 'Crowd enjoying an outdoor event at sunset' },
]

export type Review = { name: string; event: string; text: string }

/* Paste real client reviews here (e.g. from Facebook recommendations).
   While this is empty, the Reviews section points to the Facebook page instead. */
export const REVIEWS: Review[] = []

export const EVENT_TYPES = [
  'Wedding',
  'Bridal or baby shower',
  "Kids' party or birthday",
  'Funeral or memorial',
  'Tent & chair hire',
  'Gift hamper',
  'Other',
]
