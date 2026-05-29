# Chat App

A real-time chat application built with React, TypeScript, and Socket.IO. The current implementation covers a complete authentication flow with JWT-based sessions, token refresh, and Google OAuth.

## Tech Stack

| Layer        | Technology                                    |
| ------------ | --------------------------------------------- |
| UI           | React 19, shadcn/ui, Tailwind CSS v4          |
| Language     | TypeScript (strict)                           |
| Routing      | React Router v7                               |
| Server state | TanStack Query v5                             |
| Forms        | React Hook Form + Zod                         |
| HTTP         | Axios (with silent token refresh interceptor) |
| Build        | Vite 7                                        |
| Linting      | ESLint 9 (flat config) + Prettier             |
| Git hooks    | Husky + lint-staged                           |

## Prerequisites

- **Node.js** >= 20
- **npm** >= 10
- A running backend API (see [Environment](#environment-variables))

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url>
cd react-typescript-socketio-tailwind

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env .env
# Edit .env — see Environment Variables below

# 4. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start Vite dev server with HMR               |
| `npm run build`     | Type-check and produce a production bundle   |
| `npm run preview`   | Serve the production bundle locally          |
| `npm run typecheck` | Run `tsc --noEmit` without emitting files    |
| `npm run lint`      | Run ESLint across the entire codebase        |
| `npm run format`    | Format all `.ts`, `.tsx` files with Prettier |

## Environment Variables

Create a `.env.local` file in the project root (it is gitignored). All Vite env vars must be prefixed with `VITE_`.

| Variable            | Required | Description                                                     |
| ------------------- | -------- | --------------------------------------------------------------- |
| `VITE_API_BASE_URL` | Yes      | Base URL of the backend REST API (e.g. `http://localhost:3000`) |

The Axios instance picks up `VITE_API_BASE_URL` at build time via `import.meta.env`. Requests are sent with `withCredentials: true` so the browser includes the session cookie needed for token refresh.

## Project Structure

```
src/
├─ api/                  # Shared API helpers and response types
├─ components/
│  ├─ shared/            # Reusable cross-feature components
│  └─ ui/                # shadcn/ui primitives (Button, Input, …)
├─ constants/            # Route paths, API routes, query keys
├─ hooks/                # Shared TanStack Query and utility hooks
├─ lib/
│  ├─ axios-instance.ts  # Configured Axios client + refresh interceptor
│  └─ react-query.ts     # QueryClient singleton
├─ modules/
│  └─ auth/              # Self-contained auth feature
│     ├─ api/            # Auth endpoint functions + types
│     ├─ components/     # Login, Signup, ForgotPassword … forms
│     ├─ hooks/          # Mutations: useLogin, useSignup, …
│     ├─ pages/          # Route-level page components
│     └─ schemas/        # Zod validation schemas
├─ providers/            # QueryClientProvider, ThemeProvider
├─ routes/               # Router definition, public/private guards
└─ types/                # Shared TypeScript types
```

## Authentication Flow

The app implements a cookie-based JWT flow:

- **Access token** — short-lived, stored in an httpOnly cookie.
- **Refresh token** — long-lived, stored in an httpOnly cookie.
- **Silent refresh** — the Axios response interceptor catches `401` responses and calls `POST /auth/refresh` once. Concurrent requests that fail while a refresh is in flight queue behind a single promise and retry automatically. On refresh failure the user is redirected to `/login`.

### Auth routes

| Route              | Description                        |
| ------------------ | ---------------------------------- |
| `/login`           | Email + password sign-in           |
| `/signup`          | New account registration           |
| `/verify-email`    | Email verification after signup    |
| `/resend-email`    | Re-send verification email         |
| `/forgot-password` | Request a password-reset link      |
| `/reset-password`  | Set a new password via reset token |

Google OAuth is wired up via a redirect button on the login/signup pages.

## Tooling

### ESLint

Flat config (`eslint.config.js`) with:

- `typescript-eslint` (strict)
- `eslint-plugin-react` + `react-hooks` + `react-refresh`
- `@tanstack/eslint-plugin-query`
- `eslint-plugin-simple-import-sort` + `eslint-plugin-unused-imports`
- `eslint-config-prettier` (disables formatting rules that conflict with Prettier)

### Prettier

Plugins: `prettier-plugin-tailwindcss` (class sorting) + `prettier-plugin-classnames`.

### Husky + lint-staged

A `pre-commit` hook runs lint-staged on staged files:

- `.ts` / `.tsx` → `eslint --fix` then `prettier --write`
- `.json` / `.md` / `.css` → `prettier --write`
