# Subtribe App

Public-facing candidate interface for browsing jobs and submitting applications.

**Domain:** app.thesubtribe.com

---

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.local

# Start dev server (use port 3001 to avoid conflict with dashboard)
PORT=3001 pnpm dev
```

Visit: http://localhost:3001

---

## 📁 Project Structure

```
app/
├── src/
│   ├── app/
│   │   ├── (auth)/           # Sign in/up pages (for future candidate auth)
│   │   ├── apply/[jobId]/    # Job application pages
│   │   ├── jobs/             # Public job listings
│   │   └── sitemap.ts        # Dynamic sitemap for SEO
│   ├── components/
│   │   ├── ui/               # Base UI components
│   │   └── shared/           # App-specific components
│   ├── lib/                  # Utilities, API client, validations, SEO
│   └── types/                # TypeScript definitions
├── .github/workflows/        # CI/CD pipelines
├── public/
│   └── robots.txt            # SEO configuration (allows indexing)
└── README.md
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript 5
- **Styling:** Tailwind CSS v4 + CVA
- **Forms:** React Hook Form + Zod
- **UI Components:** Radix UI + Heroicons
- **SEO:** Dynamic sitemap, JSON-LD structured data
- **Deployment:** Docker + Google Cloud Run

---

## ✨ Features

### Public Job Listings

- Browse all active job postings
- SEO-optimized job pages with meta tags
- JSON-LD structured data for Google Jobs
- Dynamic sitemap generation

### Job Application

- View detailed job descriptions
- Submit applications with resume upload (PDF only, 5MB limit)
- Answer custom screening questions
- Mobile-responsive application forms

### SEO Optimization

- Client-branded page titles
- Auto-generated meta descriptions
- Location-based keywords
- Google Jobs integration
- Sitemap accessible at `/sitemap.xml`

### Future Features

- Candidate authentication (sign up/sign in already in place)
- Application status tracking for candidates
- Job alerts and notifications

---

## 📝 Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Lint code with ESLint
pnpm lint:fix     # Auto-fix linting issues
pnpm format       # Format code with Prettier
pnpm typecheck    # Type check with TypeScript
```

---

## ⚙️ Environment Variables

### Required Variables

```bash
# Backend API
NEXT_PUBLIC_API_URL=https://subtribe-ats-api-dev-189393113297.asia-south1.run.app

# Base URL (for SEO, canonical URLs)
NEXT_PUBLIC_BASE_URL=http://localhost:3001  # Local
# NEXT_PUBLIC_BASE_URL=https://app.thesubtribe.com  # Production
```

### Local Development (.env.local)

```bash
NEXT_PUBLIC_API_URL=https://subtribe-ats-api-dev-189393113297.asia-south1.run.app
```

---

## 🚢 Deployment

### Development (Auto-deploy)

Commits starting with `push-` automatically deploy to development:

```bash
git add .
git commit -m "push-feat: add job search functionality"
git push origin develop
```

- **Trigger:** All commits starting with `push-`
- **Branch:** Any branch (typically `develop`)
- **Target:** Cloud Run service `subtribe-app-dev`
- **URL:** Your development URL

### Production (Manual)

Requires manual trigger with confirmation:

1. Go to **Actions** tab in GitHub
2. Select "Deploy to Production (Manual)"
3. Click "Run workflow"
4. Type `deploy-to-production` to confirm
5. Click "Run workflow"

- **Trigger:** Manual only (workflow_dispatch)
- **Branch:** Typically `main`
- **Target:** Cloud Run service `subtribe-app-prod`
- **Versioning:** Semantic versioning with GitHub releases

### Required GitHub Secrets/Variables

**Secrets:**

- `GCP_SA_KEY` - Google Cloud Service Account JSON key

**Variables:**

- `GCP_PROJECT_ID` - Your GCP project ID
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_BASE_URL` - App base URL (for SEO)

---

## 🏗️ Development Workflow

### 1. Local Setup

```bash
# Clone the repository
git clone <app-repo-url>
cd app

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local

# Start dev server on port 3001
PORT=3001 pnpm dev
```

### 2. Making Changes

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Lint and format
pnpm lint
pnpm format

# Type check
pnpm typecheck

# Commit changes
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

### 3. Deploying to Development

```bash
# Method 1: Push with "push-" prefix (auto-deploys)
git commit -m "push-test: test new feature in dev"
git push origin develop

# Method 2: Regular commit (runs CI only, no deploy)
git commit -m "feat: add new feature"
git push origin develop
```

### 4. Deploying to Production

1. Merge your feature branch to `main`
2. Go to GitHub Actions
3. Manually trigger "Deploy to Production"
4. Type confirmation and deploy

---

## 🧪 Testing Before Deployment

```bash
# Build locally to catch issues
pnpm build

# If build succeeds, you're good to deploy!
```

---

## 🔍 SEO Configuration

### Robots.txt

Located at `public/robots.txt` - allows all search engines to index the site.

```
User-agent: *
Allow: /

Sitemap: https://app.thesubtribe.com/sitemap.xml
```

### Sitemap

Dynamically generated at `src/app/sitemap.ts`:

- Lists all active job postings
- Updates automatically as jobs are added/removed
- Accessible at `/sitemap.xml`

### Structured Data

Job pages include JSON-LD structured data for Google Jobs integration.

---

## 🐛 Troubleshooting

### Build fails

- Run `pnpm typecheck` to find type errors
- Run `pnpm lint` to find linting issues

### Deployment fails

- Check GitHub Actions logs
- Verify all secrets/variables are set
- Ensure Docker build succeeds locally

### Port conflicts

- Change the port: `PORT=3002 pnpm dev`
- Update `NEXT_PUBLIC_BASE_URL` accordingly

---

## 📊 Status

✅ Separated Architecture | ✅ Independent Deployment | ✅ SEO Optimized | ✅ Zero Build Errors

---

## 🔗 Related Repositories

- **Dashboard (Admin Interface):** `subtribe-dashboard` repository
- **Backend API:** Subtribe ATS API

---

## 🎨 Design Philosophy

The app is designed to:

- **Evolve independently** from the dashboard
- **Prioritize candidate experience** (fast iterations, A/B testing)
- **Scale for high traffic** (1000s of candidates vs few admins)
- **Maintain brand consistency** while allowing design language to diverge

This is intentional - the candidate-facing app receives 10x more attention and updates than the admin dashboard.

---

## 📞 Support

For issues or questions, please create an issue in the repository.
