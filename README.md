# aczel.design

The portfolio of Dániel Z. Aczél, migrated from Wix to a self-contained Astro site.

## Stack

- Astro static output
- Tailwind CSS 4 and a customized daisyUI theme
- Markdown/MDX content collections
- Lucide and Simple Icons
- GitHub Pages and GitHub Actions

All required software is free and open source. The production site has no runtime dependency on Wix.

## Local development

```sh
npm install
npm run dev
```

The configured local URL is `http://localhost:4321/design/` because the GitHub Pages deployment uses a repository subpath.

Run all checks with:

```sh
npm run verify
```

## Editing projects with Codex

Projects live in `src/content/projects/`. Each MDX file contains validated metadata followed by the case-study copy. Images live in `src/assets/projects/` and are optimized automatically during the Astro build.

When adding a project:

1. Add its source images to `src/assets/projects/`.
2. Duplicate a similar MDX entry and update every frontmatter field.
3. Use one of the existing categories: `ux-ui`, `web-design`, `brand-logo`, or `graphics`.
4. Give every image a concise, meaningful alternative description.
5. Run `npm run verify` before committing.

## Components and styling

Reusable primitives are in `src/components/ui/`; portfolio components are in `src/components/`. Pages should use those wrappers instead of duplicating daisyUI classes. Global design tokens and the custom daisyUI theme live in `src/styles/global.css`.

The non-indexed `/component-library/` page is the visual reference for approved tokens, typography, buttons, fields, alerts and cards.

## Contact form

Create a form on Formspree’s free plan and set its endpoint locally:

```sh
cp .env.example .env
```

For GitHub Pages, add `PUBLIC_FORMSPREE_ENDPOINT` as a repository Actions secret. Without an endpoint, the form falls back to the visitor’s email application and the visible email link always remains available.

## Deployment

Pushes to `main` run validation and deploy `dist/` to GitHub Pages. Pull requests run the same validation without deploying.

The initial Astro configuration targets:

- site: `https://aczel-ux.github.io`
- base: `/design`

## Moving to the custom domain

After purchasing `aczel.design`:

1. Configure the domain in the repository’s Pages settings and update DNS as GitHub instructs.
2. Add `public/CNAME` containing `aczel.design`.
3. Set Astro `site` to `https://aczel.design` and remove `base`.
4. Update `public/robots.txt` to the new sitemap URL.
5. Build, deploy, verify canonical URLs and enable enforced HTTPS.

## Content notes

The downloadable CV is the current 2026 edition. Keep future replacements at
`public/downloads/daniel-aczel-cv.pdf` so existing links remain stable.
