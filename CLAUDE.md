# CLAUDE.md

Guidance for working in this repository — a real-time chat application.

## Stack

- **React** + **TypeScript** (strict)
- **TanStack Query** — server state, caching, mutations
- **Zustand** — client/UI state
- **React Router** — routing
- **Axios** — HTTP client for the REST API
- **Socket.IO** — real-time messaging
- **date-fns** — date formatting/manipulation
- **shadcn/ui** + **Tailwind CSS** — components and styling
- **React Hook Form** — form state management and submission handling
- **Zod** — schema declaration and runtime validation; infer TypeScript types from schemas

## File Naming

- All files use **kebab-case**: `password-input.tsx`, `login-page.tsx`, `auth-api.ts`.
- Named exports inside the file remain PascalCase (components) or camelCase (functions/hooks) as usual.
- Prefer **arrow functions** for handlers and callbacks inside components; use `function` declarations only when necessary (e.g. hoisting, recursion).

## TypeScript Rules (Strict — Non-Negotiable)

- **No `any`.** Use `unknown` and narrow, or define a proper type. If you reach for `any`, stop and model the type instead.
- **No type assertions** (`as`, `as unknown as`, `!`) unless genuinely unavoidable. Prefer type guards, narrowing, and schema validation. If an assertion is truly necessary, add a one-line comment explaining why.
- Type all function inputs and outputs explicitly at module boundaries.
- Prefer `type` for unions/aliases; `interface` for object shapes that may extend.
- Derive types from a single source of truth (e.g. infer from API response types/schemas) rather than redeclaring.

## Architecture Rules (SOLID + DRY)

- **Single Responsibility** — each component, hook, and module does one thing. Split when a file mixes concerns (data fetching + heavy rendering + business logic).
- **Open/Closed** — extend behavior via props, composition, and config; avoid editing shared code for one-off needs.
- **Liskov** — components/hooks accepting a type must work with any valid instance of it; don't special-case subtypes.
- **Interface Segregation** — prefer small, focused props/hook signatures over wide "god" objects.
- **Dependency Inversion** — depend on abstractions. UI calls service/hook layers, not Axios or Socket.IO directly.
- **DRY** — extract shared logic into hooks/utils once it appears a second time. Don't pre-abstract single-use code (see Simplicity First).

## Folder Structure

```
src/
├─ api/          # Shared API helpers (endpoint fns, request/response types). No React.
├─ components/
│  ├─ icons/
│  ├─ layouts/
│  ├─ shared/    # Reusable cross-feature components
│  └─ ui/        # shadcn/ui primitives
├─ constants/
├─ hooks/        # Reusable hooks (TanStack Query + Socket.IO subscriptions)
├─ lib/
│  ├─ axios-instance.ts   # Configured Axios client
│  ├─ react-query.ts      # Query client setup
│  ├─ notify.tsx          # Custom toast notifications
│  └─ ...
├─ modules/      # Feature-based modules (auth/, chat/, etc.)
│  └─ chat/      # Each module is self-contained and mirrors src/ locally:
│     ├─ api/        # Module-specific endpoint fns + request/response types
│     ├─ components/ # Components used only by this module
│     ├─ hooks/      # Module-specific Query/Socket.IO hooks
│     ├─ stores/     # Module-scoped Zustand stores
│     ├─ utils/      # Module-specific pure helpers
│     ├─ types/      # Module-specific types
│     └─ constants/  # Module-specific constants
├─ providers/    # App-level context providers
├─ routes/       # React Router route definitions, kept thin
├─ types/        # Shared/global types
└─ utils/        # Pure helpers (e.g. date-fns wrappers)
```

### Placement rules

- **Default to module-local.** A module mirrors `src/` internally — put `api/`, `components/`, `hooks/`, `stores/`, `utils/`, `types/`, `constants/` _inside_ the module when they serve only that feature. A feature's logic lives together, not scattered across top-level folders.
- **Promote to top-level only when shared by 2+ modules.** Top-level `api/`, `components/shared`, `hooks/`, `utils/`, `types/`, `constants/` are for genuinely cross-feature code. Don't pre-place things at the top level "just in case."
- **`components/ui`** — shadcn/ui primitives only. Don't put business logic here.
- The Axios instance and query client live in `lib/`; module `api/` folders use them but never reconfigure them.
- **`routes/`** stays thin — wire up routing, delegate rendering to module/feature components.
- **`stores`** — Zustand stores live in their module's `stores/`, or top-level `stores/` only if truly global. Never duplicate server state owned by TanStack Query.

## Data & State Conventions

- **Server state → TanStack Query.** Don't mirror fetched data into Zustand.
- **Client state → Zustand.** UI toggles, message drafts, active conversation, socket connection state.
- Use stable, structured query keys (e.g. `['messages', conversationId]`).
- Invalidate or update the query cache after mutations; for real-time, write incoming socket events into the cache via `queryClient.setQueryData`.
- Centralize the Axios instance (base URL, interceptors, auth headers) — components never call `axios` directly.
- Centralize the Socket.IO client; expose typed event subscriptions through hooks.
- All dates go through date-fns; don't hand-roll date math or use raw `Date` formatting.

## Styling

- Use Tailwind utility classes; avoid inline styles and ad-hoc CSS files.
- Compose UI from shadcn/ui components before building custom ones.
- Keep class lists readable; extract repeated combinations into components, not string constants.

## Markup & Accessibility

- Use semantic HTML elements (`<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<form>`, `<button>`, etc.). Use `<div>` only as a layout wrapper with no semantic meaning.
- Always define accessibility attributes: `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-invalid`, `aria-live`, `role` where applicable.
- Every interactive element must be keyboard-accessible and have a visible focus state.
- Images require `alt`; decorative images use `alt=""` and `aria-hidden="true"`.
- Form inputs must have an associated `<label>` (via `htmlFor` or wrapping).

---

## Behaviour Principles

### 1 · Think Before Coding

- State assumptions explicitly — If uncertain, ask rather than guess
- Present multiple interpretations — Don't pick silently when ambiguity exists
- Push back when warranted — If a simpler approach exists, say so
- Stop when confused — Name what's unclear and ask for clarification

### 2 · Simplicity First

- No features beyond what was asked
- No abstractions for single-use code
- No "flexibility" or "configurability" that wasn't requested
- No error handling for impossible scenarios
- If 200 lines could be 50, rewrite it

### 3 · Surgical Changes

- Touch only what the request requires. Don't "improve" adjacent code, formatting, or comments.
- Match existing style even if you'd do it differently.
- Remove imports/variables/functions made unused **by your changes**. Don't touch pre-existing dead code unless asked — mention it instead.

### 4 · Goal-Driven Execution

- For bug fixes: write a failing test first, then make it pass.
- For multi-step tasks, state a brief plan with a verify step for each: `[Step] → verify: [check]`
- Don't mark a task done until the verify step passes (`lint`, `tsc`, tests).

---

## Definition of Done

Before considering any change complete:

- `tsc` passes with no errors and no new `any`/assertions.
- Lint passes.
- Tests pass (and a new failing test was written first for bug fixes).
- Only the requested scope was touched.
