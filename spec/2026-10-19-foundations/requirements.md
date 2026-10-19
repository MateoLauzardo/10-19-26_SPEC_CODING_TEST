# Requirements: Phase 0 Foundations

> **Status:** Draft v0.1 (2026-10-19)
> **Roadmap:** Phase 0 (`spec/roadmap.md`)
> **Branch:** `phase-0-foundations`

## Goal

Set up the project skeleton, tooling, backend and deployment pipeline so Phase 1 (the core drawing round) can start straight away on a working, tested, deployed base.

## In scope

1. **App scaffold.** React + Vite + TypeScript (strict mode), using **npm**.
2. **Quality tooling.** ESLint + Prettier, Vitest + React Testing Library, and Playwright.
3. **CI.** A GitHub Actions workflow that runs lint, typecheck, unit tests and e2e tests on every push and pull request.
4. **Supabase.**
   - The Supabase CLI is set up in the repo (`supabase/` with `config.toml`, `migrations/` and `seed.sql`) and runs locally in Docker.
   - A hosted Supabase project, with migrations pushed to it.
   - Anonymous auth enabled, both locally and on the hosted project.
   - Env config through `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local` (not committed), plus a committed `.env.example`.
5. **Word list.**
   - A `words` table holding about **100** simple, drawable nouns in a **flat** list (no categories or difficulty yet).
   - RLS enabled. A policy lets **authenticated** sessions (including anonymous ones) `SELECT`. Clients cannot insert, update or delete.
6. **Hello-world page.** The page signs in anonymously, fetches **one random word** from Postgres and shows it. This proves env config, auth and RLS end to end.
7. **Deployment.** The Vite build is deployed to **Vercel**, with the env vars set in the Vercel project. Preview deploys run per branch.

## Out of scope

- Any gameplay: canvas, timer, rooms, guessing (Phases 1–3).
- Realtime channels, Presence and Broadcast (Phase 2).
- Edge Functions and hiding the word server-side (Phase 4).
- Word categories, difficulty and custom lists (Phase 5).
- Custom domain, analytics and error monitoring.

## Decisions and context

| Decision | Choice | Why |
|---|---|---|
| Hosting | Vercel | Zero-config Vite support, with preview deploys per branch. Resolves the roadmap's open question. |
| Supabase setup | Local CLI + hosted project | Migrations are versioned in the repo. Local Docker gives fast, offline development and lets CI run tests against a real database. |
| Word list | About 100 words, flat | Enough variety for play testing. Categories wait until Phase 5 so we don't build what we don't use yet ("simple over clever"). |
| Word access | RLS: authenticated read | The simplest model for the MVP. It matches the tech stack's "host client is authority" stance. Phase 4 replaces it with Edge Functions. |
| Package manager | npm | It's the default, with no extra install for contributors or CI. |
| CI | GitHub Actions | The repo is already on GitHub (`origin`). |
| Hello world | Supabase round-trip | The page tests the whole stack, not just static hosting, so Phase 1 starts with known-good wiring. |

## Constraints (from `mission.md` and `tech-stack.md`)

- Only the Supabase **anon key** ships to the browser. The service-role key never appears in the client code or the repo.
- RLS is enabled on **every** table.
- Shared types live in `src/game/types.ts`. Phase 0 creates this module, even if it only holds the `Word` type at first.
- No canvas libraries, global state libraries or custom servers.
- Target the latest two versions of desktop Chrome, Edge, Firefox and Safari.

## Known risks

- **Anyone can read the full word list** once they have an anonymous session. This is accepted for Phases 0–3 and fixed in Phase 4.
- **CI needs Docker** for local Supabase during e2e tests. If that proves too slow, e2e tests in CI can mock Supabase. Write that decision down if it happens.

## Open questions

- Who owns the hosted Supabase project and the Vercel project (which org or account)?
- Supabase region: pick the one closest to most players.
