# Plan: Phase 0 Foundations

> **Status:** Draft v0.1 (2026-10-19)
> See `requirements.md` for scope and `validation.md` for the merge checklist.
> Do the task groups in order. Each group should end with a commit.

## 1. Scaffold the app

1.1 Run `npm create vite@latest` with the `react-ts` template, at the repo root.
1.2 Turn on TypeScript `strict` mode (plus `noUncheckedIndexedAccess`) in `tsconfig`.
1.3 Add `.gitignore` entries for `node_modules`, `dist`, `.env.local`, Playwright reports and `supabase/.temp`.
1.4 Create the folder layout: `src/game/types.ts` (with a `Word` type), `src/lib/`, and `src/components/`.
1.5 Add npm scripts: `dev`, `build`, `preview`, `lint`, `format`, `typecheck`, `test`, `test:e2e`.

## 2. Lint, format and unit tests

2.1 Add ESLint (flat config) with the TypeScript, React Hooks and React Refresh plugins.
2.2 Add Prettier, plus `eslint-config-prettier` so the two don't conflict.
2.3 Add Vitest with the `jsdom` environment, React Testing Library and `@testing-library/jest-dom`.
2.4 Write one smoke test: `App` renders.

## 3. End-to-end tests

3.1 Install Playwright with Chromium, Firefox and WebKit projects.
3.2 Configure `webServer` to run `npm run preview` against a build.
3.3 Write one e2e test: the page loads and shows a word (this test is finished in group 6).

## 4. Supabase: local and hosted

4.1 Run `supabase init`. Commit `supabase/config.toml`.
4.2 Enable anonymous sign-ins in `config.toml` (`[auth] enable_anonymous_sign_ins = true`).
4.3 Create the hosted Supabase project and enable anonymous sign-ins in the dashboard. Record the project ref (not its keys) in the README.
4.4 Add `.env.example` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4.5 Add `src/lib/supabase.ts`. It creates a typed client from `import.meta.env` and fails fast with a clear error if a variable is missing.

## 5. Word list schema and seed

5.1 Write migration `create_words`: a `words` table (`id bigint identity primary key`, `word text not null unique`, `created_at timestamptz default now()`).
5.2 In the same migration: `enable row level security`, plus a policy that grants `SELECT` to `authenticated`. Add no insert, update or delete policies.
5.3 Write `supabase/seed.sql` with about 100 simple, drawable nouns: lowercase, singular, no duplicates.
5.4 Generate the DB types (`supabase gen types typescript --local > src/lib/database.types.ts`) and add an npm script for it.
5.5 Run `supabase db reset` locally, check the seed, then run `supabase db push` to the hosted project and seed it.

## 6. Hello-world round-trip

6.1 Add `src/lib/words.ts` with `getRandomWord()`. It signs in anonymously if there is no session, then fetches a random word. (Count the rows and pick a random offset, or `order` + `limit`. Keep it simple: about 100 rows.)
6.2 Update `App` to show the loading, word and error states.
6.3 Add a unit test for `getRandomWord()` with a mocked Supabase client.
6.4 Finish the e2e test: against local Supabase, a non-empty word is shown.

## 7. CI (GitHub Actions)

7.1 Add `.github/workflows/ci.yml`, triggered on `push` and `pull_request`. It uses Node LTS and `npm ci`.
7.2 Steps: lint, then format check, typecheck, unit tests and build.
7.3 E2E job: `supabase/setup-cli`, then `supabase start`, export the local URL and anon key, install Playwright browsers, and run `test:e2e`. Upload the report if the job fails.
7.4 Cache npm and the Playwright browsers.

## 8. Deploy to Vercel

8.1 Import the repo into Vercel (framework preset: Vite, output folder: `dist`).
8.2 Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for Production and Preview (hosted project values).
8.3 Confirm that the branch preview deploy shows a word from the hosted DB.

## 9. Docs and wrap-up

9.1 Update `readme.md` with prerequisites (Node, Docker, Supabase CLI), setup steps, the scripts, and how to deploy.
9.2 In `spec/roadmap.md`, tick the Phase 0 items. Resolve the hosting open question (Vercel).
9.3 Work through `validation.md`, then open a PR to `main`.
