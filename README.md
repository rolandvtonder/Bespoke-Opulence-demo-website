# Bespoke Opulence — demo website

Demo site for **Bespoke Opulence**, Wedding & Event Planner in Vosloorus, Boksburg.

**Live preview:** https://rolandvtonder.github.io/Bespoke-Opulence-demo-website/

A scroll-driven opening scene over the studio's own event photography, followed by
Services, Tent & Chair Packages, Gift Hampers, Gallery, Reviews and a WhatsApp booking form.

## Run locally

```bash
npm install
npm run dev
```

## Edit content

- Contact details, address and Google rating: `src/site.ts`
- Services, packages, hampers, gallery and reviews: `src/data.ts`
- Photos: `public/img/`

Every push to `main` rebuilds and publishes the site through GitHub Actions
(`.github/workflows/deploy.yml`).

Built with Vite, React, TypeScript, Tailwind CSS v4 and Motion.
