# satu-apotek-fe

Frontend for **Satu Apotek** — a cost-efficient pharmacy SaaS.

Built with **TanStack Router + Query**, React, Vite, and Tailwind CSS.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 |
| Routing | [TanStack Router](https://tanstack.com/router) |
| Data fetching | [TanStack Query](https://tanstack.com/query) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Validation | Zod |
| Language | TypeScript |

## Prerequisites

- **Node.js** 20+ ([Link](https://nodejs.org/))
- **npm** (comes with Node) or **pnpm**

Optional:
- Backend (`satu-apotek-be`) running on `http://localhost:8080`

## Quick Start

```bash
# 1. Clone
git clone https://github.com/danivideda/satu-apotek-fe.git
cd satu-apotek-fe

# 2. Install dependencies
npm install

# 3. Environment
cp .env.example .env

# 4. Start development server
npm run dev
```

The app runs on `http://localhost:3000` by default.

## Environment Variables

Copy `.env.example` to `.env` (the latter is gitignored).

| Variable | Purpose | Example (local) |
|----------|---------|-----------------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080/v1` |

> All values are for **local development only**.

## Available Scripts

```bash
npm run dev        # Start development server (port 3000)
npm run build      # Build for production
npm run preview    # Preview production build
npm run test       # Run tests with Vitest
npm run prettier   # Format code with Prettier
```

## Project Structure (high level)

```
src/
├── lib/                 # Shared utilities (auth, fetch, env, cn)
├── routes/
│   ├── __root.tsx       # Root layout
│   ├── _public/         # Public routes (login, register)
│   ├── _owner/          # Owner dashboard routes
│   │   └── dashboard/
│   └── app/             # Pharmacy app routes (connect, landing, dashboard)
├── constants.ts
├── main.tsx
└── styles.css
```

## Notes

- The frontend talks to the backend using cookies + CSRF (`credentials: 'include'`).
- Make sure the backend CORS allows `http://localhost:3000`.
- File-based routing is handled by TanStack Router. New routes are added under `src/routes/`.

## Related

- Backend: https://github.com/danivideda/satu-apotek-be