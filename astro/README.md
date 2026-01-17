# Baldwinson HQ - Frontend

Astro-based frontend for Baldwinson HQ.

## Tech Stack

- [Astro](https://astro.build/) v5 - Static site generator with islands architecture
- [TailwindCSS](https://tailwindcss.com/) v4 - Utility-first CSS
- [Lucide](https://lucide.dev/) - Icon library
- TypeScript
- Deployed on [Vercel](https://vercel.com/)

## Project Structure

```
src/
├── assets/       # Static assets (images, etc.)
├── components/   # Reusable Astro/React components
├── layouts/      # Page layouts
├── lib/          # Utility functions
├── pages/        # File-based routing
└── styles/       # Global styles
```

## Getting Started

```sh
pnpm install
pnpm dev
```

Dev server runs at `http://localhost:4321`

## Commands

| Command          | Action                                      |
| :--------------- | :------------------------------------------ |
| `pnpm install`   | Install dependencies                        |
| `pnpm dev`       | Start dev server at `localhost:4321`        |
| `pnpm build`     | Build production site to `./dist/`          |
| `pnpm preview`   | Preview production build locally            |
| `pnpm astro ...` | Run Astro CLI commands                      |

## Environment Variables

Copy `.env.example` to `.env` and configure:

```sh
cp .env.example .env
```

See `.env.example` for available variables.
