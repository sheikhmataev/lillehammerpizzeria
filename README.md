# Lillehammer Restaurant & Bar

Static site for Lillehammer Restaurant & Bar, Storgata 61, Lillehammer.
Next.js static export, Tailwind v4, Motion.

```bash
npm run dev     # local development
npm run build   # static export to ./out
```

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes `out/` on every push to
`main`. Enable it once in the repository settings: **Settings → Pages →
Build and deployment → Source: GitHub Actions**.

The workflow picks the base path itself:

| Where it is served | Base path | What to do |
| --- | --- | --- |
| `lillehammerpizzeria.no` (custom domain) | none | Add `public/CNAME` containing the bare domain, and point the DNS at GitHub Pages |
| `<user>.github.io/lillehammerpizzeria` (project page) | `/lillehammerpizzeria` | Nothing, this is the default |

A project page is served from a sub-directory, and Next only rewrites the
paths it owns. Everything else, `<img src>`, inline `background-image`, plain
`<a href>`, goes through `lib/asset.ts`, and the three flame frames that live
in CSS are reached through custom properties that `app/layout.tsx` overrides
when a base path is set. To reproduce a project-page build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/lillehammerpizzeria npm run build
```

`public/.nojekyll` stops GitHub from hiding the `_next` directory.

## Things the restaurant still has to supply

- Which dish each photograph in `components/Pass.tsx` is. Fill in the `dish`
  field on a row and it prints the number next to the name.
- Higher-resolution photography. Only the `DSC*` set is 2560px wide; the rest
  are phone-resolution and go soft on a retina screen.
- Confirmation to flip `ORDERING_LIVE` in `lib/links.ts`, which points every
  call to action at the live GetFood and Delivia endpoints.
