# Anuj — Developer Portfolio

A dark, expressive portfolio for a full-stack developer and data scientist, built with Next.js, JavaScript, Tailwind CSS, GSAP, and Framer Motion.

## Profiles

- [GitHub](https://github.com/Anuj10110)
- [LinkedIn](https://www.linkedin.com/in/anuj-taneja-635281375/)
- [Email](mailto:anuj.10110.taneja@gmail.com)

## Getting started

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev    # Start the development server
npm run build  # Create an optimized production build
npm run start  # Serve the production build
```

## Configuration

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the deployed origin (for example, `https://your-domain.com`). The value is used to generate canonical metadata, `robots.txt`, and the sitemap. Leave it unset during local development.

## Project structure

- `app/` — App Router routes, global styles, metadata, sitemap, and robots rules.
- `components/` — reusable page sections, project cards, visuals, and project dialog.
- `components/data.js` — project and capability content.

Development and production builds use separate output directories (`.next-dev` and `.next`) to avoid mixing chunks when switching between `npm run dev` and `npm run build`.

## Deploying to GitHub Pages

The `main` branch is configured to build and deploy the static export through `.github/workflows/deploy.yml`. For the first deployment, open **Settings → Pages → Build and deployment** in the repository and select **GitHub Actions** as the source. After that one-time setting, pushes to `main` publish the site at [anuj10110.github.io/portfolio-dev](https://anuj10110.github.io/portfolio-dev/).

## Before launch

The project entries in `components/data.js` are clearly labeled concepts. Replace them with completed work and accurate case studies as those projects are built. Add a résumé link when you have a public résumé file to share.
