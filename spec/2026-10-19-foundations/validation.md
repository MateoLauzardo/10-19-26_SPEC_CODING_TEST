# Validation: Phase 0 Foundations

> **Status:** Draft v0.1 (2026-10-19)
> The branch `phase-0-foundations` can be merged into `main` when **every** box below is checked.

## Automated checks (must pass locally and in CI)

- [ ] `npm ci` succeeds on a clean clone.
- [ ] `npm run lint` and `npm run format -- --check` pass with no errors.
- [ ] `npm run typecheck` passes under `strict` mode.
- [ ] `npm test` (Vitest) passes, including:
  - [ ] the `App` smoke test.
  - [ ] the `getRandomWord()` unit test with a mocked client.
- [ ] `npm run build` produces `dist/` with no warnings that are treated as errors.
- [ ] `npm run test:e2e` passes in Chromium, Firefox and WebKit against local Supabase. The page shows a non-empty word.
- [ ] The GitHub Actions CI workflow is green on the PR.

## Database and security

- [ ] `supabase db reset` applies the migrations and seed cleanly from scratch.
- [ ] `select count(*) from words` returns about 100 (at least 90), with no duplicates.
- [ ] RLS is enabled on `words` (`relrowsecurity = true`).
- [ ] An **unauthenticated** request (anon key, no session) cannot read `words`.
- [ ] An **anonymous-auth** session can `SELECT` from `words`.
- [ ] An anonymous-auth session **cannot** `INSERT`, `UPDATE` or `DELETE` on `words`.
- [ ] No service-role key appears in the repo, the client bundle or the Vercel client env (`grep -r service_role` over `src/` and `dist/` finds nothing).
- [ ] `.env.local` is git-ignored, and `.env.example` is committed.

## Deployment

- [ ] The Vercel production URL loads, signs in anonymously and shows a random word from the **hosted** database.
- [ ] Reloading shows a (usually) different word.
- [ ] A preview deploy is created for the branch and works the same way.
- [ ] Spot-checked in the latest desktop Chrome, Firefox and Safari (or Edge).

## Developer experience

- [ ] A new contributor can follow `readme.md` from clone to a word on screen locally in under 15 minutes.
- [ ] The repo has `src/game/types.ts` as the home for shared types.

## Docs and roadmap

- [ ] The Phase 0 items are ticked in `spec/roadmap.md`.
- [ ] The roadmap's hosting open question is resolved (Vercel).
- [ ] Any change from `plan.md` (for example, mocking Supabase in CI e2e tests) is written down in `requirements.md`.

## Out-of-scope check

- [ ] No gameplay, realtime or Edge Function code was added. Those belong to Phases 1–4.
