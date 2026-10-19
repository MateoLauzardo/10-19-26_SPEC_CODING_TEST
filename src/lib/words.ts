import type { Word } from '../game/types'
import { supabase } from './supabase'

/** Signs in anonymously if needed, then returns one random word. */
export async function getRandomWord(): Promise<Word> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    const { error } = await supabase.auth.signInAnonymously()
    if (error) throw error
  }

  const { count, error: countError } = await supabase
    .from('words')
    .select('*', { count: 'exact', head: true })
  if (countError) throw countError
  if (!count) throw new Error('The word list is empty.')

  const offset = Math.floor(Math.random() * count)
  const { data, error } = await supabase
    .from('words')
    .select('word')
    .order('id')
    .range(offset, offset)
    .single()
  if (error) throw error
  return data.word
}
