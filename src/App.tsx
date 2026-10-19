import { useEffect, useState } from 'react'
import type { Word } from './game/types'
import { getRandomWord } from './lib/words'

type State =
  | { status: 'loading' }
  | { status: 'ready'; word: Word }
  | { status: 'error'; message: string }

function App() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    getRandomWord()
      .then((word) => {
        if (!cancelled) setState({ status: 'ready', word })
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : String(error)
        if (!cancelled) setState({ status: 'error', message })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main>
      <h1>Drawing game</h1>
      {state.status === 'loading' && <p>Loading a word…</p>}
      {state.status === 'ready' && (
        <p className="word" data-testid="word">
          {state.word}
        </p>
      )}
      {state.status === 'error' && (
        <p role="alert">Could not load a word: {state.message}</p>
      )}
    </main>
  )
}

export default App
