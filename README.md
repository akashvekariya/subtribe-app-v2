# Subtribe App

The candidate side of Subtribe, a multi-tenant applicant tracking system with AI candidate evaluation. Candidates browse open roles and apply with their resume in a couple of minutes.

Part of the Subtribe platform: [backend](https://github.com/akashvekariya/subtribe-backend-v2), [recruiter dashboard](https://github.com/akashvekariya/subtribe-dashboard-v2), [AI engine](https://github.com/akashvekariya/subtribe-ai-v2).

## Features

- **Job board**: public listing of open roles across companies, with SEO metadata and a sitemap.
- **Apply flow**: one form per job with resume upload and validation; the application is evaluated by the AI engine as soon as it lands.
- **Candidate accounts**: sign up and sign in.
- **Legal pages**: privacy policy, terms and cookie policy written for India and US compliance.

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Radix UI, React Hook Form with Zod. Docker, deployed on Cloud Run through GitHub Actions with PR checks and smoke tests.

## Run locally

```bash
pnpm install
cp .env.example .env.local     # point NEXT_PUBLIC_API_URL at the backend
PORT=3001 pnpm dev
```

Open `http://localhost:3001`.

## Layout

```
src/
  app/jobs/          job board
  app/apply/[jobId]/ application form
  app/(auth)/        sign-in, sign-up
  app/(legal)/       privacy, terms, cookies
  components/        forms and shared UI
  lib/               API client and helpers
```
