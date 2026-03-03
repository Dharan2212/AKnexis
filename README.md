# AKnexis Enterprise Platform

> Engineering What's Next — Complete Business Setup & Growth Partner

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: MongoDB via Mongoose
- **Auth**: JWT with HTTP-only cookies
- **Storage**: AWS S3 / Cloudflare R2 (presigned URLs)
- **Email**: SendGrid
- **Styling**: Tailwind CSS + custom design system
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

## Project Structure

```
aknexis/
├── app/                    # Next.js App Router
│   ├── (public pages)      # Marketing site (24+ pages)
│   ├── admin/              # CRM dashboard
│   ├── api/                # REST API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── heritage/           # Heritage SVG backgrounds
│   ├── layout/             # Header, Footer, TopBar, Section
│   └── sections/           # Page sections (Hero, CTA, etc.)
├── lib/
│   ├── config/             # env, seo, site config
│   ├── db/models/          # Mongoose models
│   ├── errors/             # AppError, errorHandler
│   ├── middleware/         # auth, csrf, rateLimit
│   ├── services/           # Business logic
│   ├── utils/              # Helpers
│   └── validation/         # Zod schemas
├── scripts/
│   ├── seed.ts             # Create admin users + sample data
│   └── db-export.ts        # Export DB to JSON
├── styles/globals.css      # Global styles + design tokens
└── types/                  # TypeScript declarations
```

## Quick Start

### 1. Environment Setup

```bash
cp .env.example .env.local
# Fill in your values
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Seed Database

```bash
npm run db:seed
```

Default admin: `admin@aknexis.io` / `Admin@123456`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.example` for all required variables:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Min 64-char random string |
| `AWS_ACCESS_KEY_ID` | S3/R2 access key |
| `SENDGRID_API_KEY` | SendGrid API key |

## Admin Access

- URL: `/admin/login`
- Roles: `admin`, `manager`, `staff`

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Current user |
| GET/POST | `/api/leads` | Leads (public POST) |
| GET/POST | `/api/clients` | Clients |
| GET/POST | `/api/projects` | Projects |
| GET/POST | `/api/files` | Files |
| POST | `/api/files/upload` | Get presigned URL |
| GET | `/api/dashboard` | Dashboard stats |
| GET | `/api/audit` | Audit logs |

## Deployment (Vercel)

```bash
npm run build    # Verify build passes
vercel --prod    # Deploy
```

Set environment variables in Vercel dashboard before deploying.
