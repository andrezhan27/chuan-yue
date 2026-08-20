# Chuan Yue

Restaurant website for Chuan Yue in Lisbon, built with Next.js 16, React 19,
TypeScript, and Tailwind CSS.

## Requirements

- Node.js 22
- npm 10

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Both variables are optional:

- `SITE_URL`: canonical production URL for non-Vercel hosts. On Vercel, the
  app uses `VERCEL_PROJECT_PRODUCTION_URL` automatically when system environment
  variables are enabled.
- `NEXT_PUBLIC_PRIVACY_URL`: absolute URL for the privacy policy. The footer
  hides this link when the value is empty.

Copy `.env.example` to `.env.local` for local overrides. Never commit `.env.local`
or Vercel credentials.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

`npm test` runs all three checks. GitHub Actions runs the same verification for
pull requests and pushes to `main`.

## Deploying with Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel and keep the detected Next.js defaults.
3. In the Vercel project settings, enable system environment variables so the
   canonical URL and social metadata use the production domain.
4. Add `NEXT_PUBLIC_PRIVACY_URL` for Preview and Production if a privacy policy
   is available. Add `SITE_URL` only when you need to override the production
   domain selected by Vercel.
5. Deploy. Pull requests receive Preview deployments; pushes to `main` become
   Production deployments when `main` is the configured production branch.

The menu PDF and all restaurant images are served from `public/`; no database or
server-side secret is required.
