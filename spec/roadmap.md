# Roadmap

> **Status:** Draft v0.1 (2026-10-19)
> Phases are ordered. Each phase ends in a playable, demo-able build.

## Phase 0: Foundations

- [ ] Scaffold React + Vite + TypeScript, ESLint/Prettier, Vitest, Playwright
- [ ] Create a Supabase project, wire up env config, enable anonymous auth
- [ ] Seed a starter word list of simple, drawable objects in Postgres
- [ ] Deploy a "hello world" build to static hosting

## Phase 1: MVP (core drawing round)

**Goal:** one player can get a random object and draw it with mouse and tools against a timer.

- [ ] **Random prompt.** Show a random object from the word list.
- [ ] **Canvas.** Freehand mouse drawing and a clear button.
- [ ] **Countdown timer.** Fixed time per round (default 60 s). Drawing locks when time runs out.
- [ ] **Drawing tools.** Color palette, brush sizes, eraser, undo.
- [ ] Strokes stored as data, so redraw and undo work.

## Phase 2: Online rooms (multiplayer)

**Goal:** friends play together in real time from their own devices.

- [ ] Create or join a room with a short room code and a nickname
- [ ] Lobby with a player list (Supabase Presence) and a host "Start game" button
- [ ] Real-time stroke streaming to guessers (Broadcast, batched), including undo and clear
- [ ] Late joiners receive the current canvas
- [ ] Drawer rotation across rounds. Only the drawer sees the word.
- [ ] Timer synchronized across clients

## Phase 3: Guessing and scoring

- [ ] Guess input and chat feed
- [ ] Automatic guess checking (case, whitespace and punctuation insensitive)
- [ ] Points for guessers (faster guesses earn more) and for the drawer (per correct guesser)
- [ ] Round-end reveal and end-of-game scoreboard
- [ ] Hide correct answers from players who haven't guessed yet

## Phase 4: Fairness and robustness

- [ ] Move word selection and guess checking to Supabase Edge Functions, so the secret word never reaches guessers
- [ ] Handle host disconnects (migrate host) and player reconnects
- [ ] Rate-limit guesses and broadcasts
- [ ] Basic nickname filtering

## Phase 5: Polish and extras (backlog)

- [ ] Room settings: round time, number of rounds, word categories, difficulty
- [ ] Hints (reveal letters over time)
- [ ] Sound effects and animations
- [ ] Touch and mobile drawing support
- [ ] Custom word lists per room

## Open questions

- Stakeholder input in `readme.md` hasn't been reviewed yet. Reconcile this roadmap once it's available.
- Hosting provider (Vercel or Netlify)?
- Maximum players per room (proposed: 8)?
