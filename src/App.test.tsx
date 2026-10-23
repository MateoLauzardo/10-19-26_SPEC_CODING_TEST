import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { getRandomWord } from './lib/words'

vi.mock('./lib/words', () => ({ getRandomWord: vi.fn() }))

describe('App', () => {
  beforeEach(() => {
    vi.mocked(getRandomWord).mockReset()
  })

  it('renders', () => {
    vi.mocked(getRandomWord).mockReturnValue(new Promise(() => {}))
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'Drawing game' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Loading a word…')).toBeInTheDocument()
  })

  it('shows the word', async () => {
    vi.mocked(getRandomWord).mockResolvedValue('apple')
    render(<App />)
    expect(await screen.findByTestId('word')).toHaveTextContent('apple')
  })

  it('shows an error', async () => {
    vi.mocked(getRandomWord).mockRejectedValue(new Error('offline'))
    render(<App />)
    expect(await screen.findByRole('alert')).toHaveTextContent('offline')
  })

  it('shows an error that is not an Error instance', async () => {
    vi.mocked(getRandomWord).mockRejectedValue('timed out')
    render(<App />)
    expect(await screen.findByRole('alert')).toHaveTextContent('timed out')
  })
})
