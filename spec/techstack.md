# Tech Stack

> **Status:** Draft v0.1 (2026-10-19)

## Summary

| Layer | Choice |
|---|---|
| Language | **TypeScript** (strict mode) |
| UI framework | **React** |
| Build / dev server | **Vite** |
| Drawing surface | Native **HTML5 Canvas** (2D context) wrapped in a React component, using **Pointer Events** |
| Realtime + backend | **Supabase**: Realtime (Broadcast + Presence), Postgres, Anonymous Auth |
| Identity | Nickname only, backed by a Supabase anonymous session |
| Unit tests | **Vitest** + React Testing Library |
| End-to-end tests | **Playwright** (multi-browser-context tests simulate several players) |
| Lint / format | ESLint + Prettier |
| Hosting | Static hosting for the Vite build (e.g. Vercel or Netlify; TBD) |

## Front end

- **React + Vite + TypeScript.** Components handle the lobby, room, canvas, guess chat, timer and scoreboard.
- **Canvas.** Draw directly on a `<canvas>` through a ref, with no canvas library. Model strokes as data: `{ id, color, size, tool, points[] }`. That makes undo and redraw-on-join simple.
- **Input.** Use Pointer Events (`pointerdown/move/up`) so mouse works now and touch is possible later.
- **State.** Use React state/context for UI. Keep game state in a single reducer, typed as `GameState`. Add a state library only if this becomes painful.

## Realtime and backend (Supabase)

- **Rooms.** Each room is a Supabase Realtime channel named after its room code.
- **Presence** tracks who is in the room (nickname, score, connected).
- **Broadcast** carries low-latency events. Strokes are sent in batches (e.g. every 30–50 ms) instead of per point. Events are typed:
  - `stroke:start | stroke:points | stroke:end | stroke:undo | canvas:clear`
  - `round:start | round:end | timer:sync`
  - `guess:submit | guess:correct`
- **Postgres** stores the word list and any room/round records that need to persist.
- **Authority (MVP).** The room host's client runs round state, timer and guess checking. *Known risk:* a modified host client could cheat or leak the word. The roadmap moves word selection and guess checking to **Supabase Edge Functions** so the word never reaches guessers' clients.
- **Secrets.** Only the Supabase **anon key** ships to the browser. Row Level Security (RLS) is enabled on every table.

## Conventions

- Shared message and state types live in one module (e.g. `src/game/types.ts`). Never send untyped payloads.
- Guess matching is case-insensitive and ignores surrounding whitespace and punctuation.
- Environment config comes through `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`, which is not committed.

## Browser support

- Latest two versions of Chrome, Edge, Firefox and Safari on desktop.

## Deliberately not using (for now)

- A custom Node or WebSocket server. Supabase covers realtime.
- Canvas libraries (Fabric.js, Konva). Not needed for freehand strokes.
- Global state libraries (Redux, Zustand). Add one only when justified.
