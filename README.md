# Two Men Bagel House — website prototype

Mobile-first Next.js + Tailwind prototype of the Two Men Bagel House homepage, site navigation and outlet menu pages. It's the design reference for the twomenbagels.com redesign.

Live preview: https://nataniellam.github.io/two-men-bagel-house/

## Run it

```bash
npm install
npm run dev          # development server on http://localhost:3000
npm run build        # static export to out/
npm start            # serve out/ on http://localhost:3210
```

## Deploying

Every push to `main` builds the static export and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). The workflow sets `PAGES_BASE_PATH` to the repo subpath; `lib/image-loader.ts` and `components/CommunityVideo.tsx` add it to image and video paths.

## Content

- Real content lives in `lib/content.ts` (outlets, story, links, community media) and `lib/menu.ts` (menu boards).
- Copy still to be supplied is marked `[PLACEHOLDER: …]` on the page.
- The email signup simulates a request; it is not connected to a mailing-list provider yet.
