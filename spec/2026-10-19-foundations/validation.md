# Validation: Phase 0 Foundations

> **Status:** Draft v0.1 (2026-10-19)
> The branch `phase-0-foundations` can be merged into `main` when **every** box below is checked.

## Automated checks (must pass locally and in CI)

- [x] `npm ci` succeeds on a clean clone.
- [x] `npm run lint` and `npm run format:check` pass with no errors.
- [x] `npm run typecheck` passes under `strict` mode.
- [x] `npm test` (Vitest) passes, including:
  - [x] the `App` smoke test.
  - [x] the `getRandomWord()` unit test with a mocked client.
- [x] `npm run build` produces `dist/` with no warnings that are treated as errors.
- [x] `npm run test:e2e` passes in Chromium, Firefox and WebKit against local Supabase. The page shows a non-empty word.
- [x] The GitHub Actions CI workflow is green on the PR. _(PRs #1 and #2: both jobs passed.)_

## Database and security

- [x] `supabase db reset` applies the migrations and seed cleanly from scratch.
- [x] `select count(*) from words` returns about 100 (at least 90), with no duplicates.
- [x] RLS is enabled on `words` (`relrowsecurity = true`).
- [x] An **unauthenticated** request (anon key, no session) cannot read `words`.
- [x] An **anonymous-auth** session can `SELECT` from `words`.
- [x] An anonymous-auth session **cannot** `INSERT`, `UPDATE` or `DELETE` on `words`.
- [x] No service-role key appears in the repo, the client bundle or the Vercel client env (`grep -r service_role` over `src/` and `dist/` finds nothing).
- [x] `.env.local` is git-ignored, and `.env.example` is committed.

## Deployment

- [x] The Vercel production URL loads, signs in anonymously and shows a random word from the **hosted** database. _(https://10-19-26-spec-coding-test.vercel.app/)_
- [x] Reloading shows a (usually) different word.
- [ ] A preview deploy is created for the branch and works the same way.
- [x] Spot-checked in the latest desktop Chrome, Firefox and Safari (or Edge). _(Checked with Playwright Chromium, Firefox and WebKit.)_

## Developer experience

- [ ] A new contributor can follow `readme.md` from clone to a word on screen locally in under 15 minutes.
- [x] The repo has `src/game/types.ts` as the home for shared types.

## Docs and roadmap

- [x] The Phase 0 items are ticked in `spec/roadmap.md`.
- [x] The roadmap's hosting open question is resolved (Vercel).
- [x] Any change from `plan.md` (for example, mocking Supabase in CI e2e tests) is written down in `requirements.md`.

## Out-of-scope check

- [x] No gameplay, realtime or Edge Function code was added. Those belong to Phases 1–4.
