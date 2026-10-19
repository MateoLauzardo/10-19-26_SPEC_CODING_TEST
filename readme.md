# Drawing game

A multiplayer drawing and guessing game built with React, Vite, TypeScript and Supabase. See `spec/` for the mission, tech stack and roadmap.

## Prerequisites

- **Node.js** 24 LTS (includes npm)
- **Docker Desktop**, running (local Supabase runs in containers)
- **Supabase CLI**: installed with the project's dev dependencies, so run it as `npx supabase`. No global install is needed.

## Setup (clone to a word on screen)

```sh
npm ci
npx playwright install chromium firefox webkit   # only needed for e2e tests
npx supabase start                               # first run pulls Docker images (a few minutes)
```

Create `.env.local` from `.env.example`. `npx supabase status` prints the values: use **API URL** for `VITE_SUPABASE_URL` and **anon key** for `VITE_SUPABASE_ANON_KEY`.

```sh
npm run dev
```

Open the printed URL. The page signs in anonymously and shows a random word.

`.env.local` is git-ignored. Only the anon key belongs in it. Never put the service-role key in the client or the repo.

## Scripts

| Script                 | What it does                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                                                                                           |
| `npm run build`        | Typecheck and build to `dist/`                                                                                      |
| `npm run preview`      | Serve the built `dist/`                                                                                             |
| `npm run lint`         | ESLint                                                                                                              |
| `npm run format`       | Format all files with Prettier                                                                                      |
| `npm run format:check` | Check formatting without writing (used by CI)                                                                       |
| `npm run typecheck`    | TypeScript, strict mode                                                                                             |
| `npm test`             | Unit tests (Vitest + React Testing Library)                                                                         |
| `npm run test:e2e`     | Build, serve and run Playwright in Chromium, Firefox and WebKit. Needs local Supabase running and `.env.local` set. |
| `npm run gen:types`    | Regenerate `src/lib/database.types.ts` from the local database                                                      |

## Database

Migrations live in `supabase/migrations/` and the word list in `supabase/seed.sql`.

```sh
npx supabase db reset    # re-apply all migrations and the seed locally
npm run gen:types        # after changing the schema
```

To add a migration, create `supabase/migrations/<timestamp>_<name>.sql`. Every table must enable row level security.

### Hosted project

- Project ref: `rxgarlncjyzuaydunqcu` (never record its keys here)
- Anonymous sign-ins must be enabled in the dashboard: **Authentication > Sign In / Providers > Allow anonymous sign-ins**.

```sh
npx supabase login
npx supabase link --project-ref rxgarlncjyzuaydunqcu
npx supabase db push --include-seed
```

## CI

`.github/workflows/ci.yml` runs on every push and pull request:

- **checks**: lint, format check, typecheck, unit tests and build.
- **e2e**: starts local Supabase in Docker, builds the app against it and runs Playwright in all three browsers. The Playwright report is uploaded when the job fails.

## Deploy (Vercel)

1. Import the GitHub repo in Vercel. Framework preset: **Vite**. Output directory: `dist`.
2. In **Settings > Environment Variables**, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the **hosted** project's values, for both **Production** and **Preview**.
3. Every push to `main` deploys to production. Every other branch gets a preview deploy.

## Stakeholder input

- I am an engineer that wants a reliable site with a popular and easy to read tech stack that incorporates python and written as simplicistic as possible.
- marketing waants an attartive site taht works well in modern browsers
