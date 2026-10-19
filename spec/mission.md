# Mission

> **Status:** Draft v0.1 (2026-10-19)
> **TODO:** `readme.md` (stakeholder input) was empty when this was written. Check this document against stakeholder notes once they're available.

## Mission statement

Make a quick, laugh-out-loud browser party game: friends join a room from their own devices, one person draws a random object with their mouse, and everyone else races to guess it.

## Who it's for

- **Primary:** groups of friends (about 3–8 players) playing together online or in the same room, each on their own computer.
- **Context:** casual sessions such as game nights, remote team breaks and video calls. Players pick it up in seconds and play rounds of a few minutes.
- **Not for (for now):** competitive ranked play, mobile-first touch drawing, or players who want persistent accounts.

## Core experience

1. A player creates a room and shares a short **room code**.
2. Friends join with a **nickname only**. No sign-up.
3. Each round, one player is the **drawer** and gets a **random object** to draw. Only the drawer sees the word.
4. The drawer sketches on a canvas with the mouse. Strokes appear **in real time** on every guesser's screen.
5. Guessers **type guesses**. Correct guesses are **checked automatically** and award points to both the guesser and the drawer.
6. A **countdown timer** ends each round. The drawer role rotates, and a scoreboard is shown at the end of the game.

## Guiding principles

1. **Instant to play.** Going from opening the link to drawing should take under 30 seconds. No accounts, installs or tutorials.
2. **Real-time feels real.** Guessers should see strokes with no noticeable lag (target under 200 ms). Lag ruins the fun.
3. **Simple over clever.** Few tools, done well. Every feature must make a round more fun or easier to start.
4. **Fair and friendly.** The secret word stays hidden from guessers. Guess matching is forgiving about case and spacing. Players see only nicknames.
5. **Light footprint.** The game runs in a modern desktop browser and uses a hosted backend, so we have no servers to operate.

## Success measures

- A new group can start their first round in under 1 minute.
- Stroke latency stays under 200 ms for most players.
- Groups play 3 or more rounds per session on average.
- No player can see the secret word before guessing it, through normal UI use.

## Non-goals (current scope)

- User accounts, profiles, friends lists or persistent stats
- Mobile and touch-optimized drawing (may work, but isn't a target)
- AI judging or recognizing drawings
- Monetization or ads
