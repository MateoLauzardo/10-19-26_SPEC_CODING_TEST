import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { supabase } from './supabase'
import { getRandomWord } from './words'

vi.mock('./supabase', () => ({
  supabase: {
    auth: { getSession: vi.fn(), signInAnonymously: vi.fn() },
    from: vi.fn(),
  },
}))

const auth = vi.mocked(supabase.auth)
const from = vi.mocked(supabase.from)

// Mimics the two queries getRandomWord makes: a head count, then one row.
function mockWords(words: string[]) {
  const range = vi.fn((from: number) => ({
    single: () => Promise.resolve({ data: { word: words[from] }, error: null }),
  }))
  const select = vi.fn((_columns: string, options?: { head?: boolean }) =>
    options?.head
      ? Promise.resolve({ count: words.length, error: null })
      : { order: () => ({ range }) },
  )
  from.mockReturnValue({ select } as never)
  return { range }
}

describe('getRandomWord', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('signs in anonymously when there is no session', async () => {
    auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    } as never)
    auth.signInAnonymously.mockResolvedValue({ error: null } as never)
    mockWords(['apple'])

    await expect(getRandomWord()).resolves.toBe('apple')
    expect(auth.signInAnonymously).toHaveBeenCalledOnce()
    expect(from).toHaveBeenCalledWith('words')
  })

  it('reuses an existing session and picks a random offset', async () => {
    auth.getSession.mockResolvedValue({
      data: { session: {} },
      error: null,
    } as never)
    const { range } = mockWords(['apple', 'boat', 'cat', 'dog'])
    vi.spyOn(Math, 'random').mockReturnValue(0.6)

    await expect(getRandomWord()).resolves.toBe('cat')
    expect(auth.signInAnonymously).not.toHaveBeenCalled()
    expect(range).toHaveBeenCalledWith(2, 2)
  })

  it('throws when the anonymous sign-in fails', async () => {
    auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    } as never)
    auth.signInAnonymously.mockResolvedValue({
      error: new Error('sign-ins disabled'),
    } as never)

    await expect(getRandomWord()).rejects.toThrow('sign-ins disabled')
  })

  it('throws when the word list is empty', async () => {
    auth.getSession.mockResolvedValue({
      data: { session: {} },
      error: null,
    } as never)
    mockWords([])

    await expect(getRandomWord()).rejects.toThrow('The word list is empty.')
  })

  it('throws when counting the words fails', async () => {
    auth.getSession.mockResolvedValue({
      data: { session: {} },
      error: null,
    } as never)
    from.mockReturnValue({
      select: () =>
        Promise.resolve({ count: null, error: new Error('permission denied') }),
    } as never)

    await expect(getRandomWord()).rejects.toThrow('permission denied')
  })
})
