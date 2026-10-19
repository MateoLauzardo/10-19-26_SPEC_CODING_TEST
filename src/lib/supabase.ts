import { createClient } from '@supabase/supabase-js'

type EnvName = 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY'

function requireEnv(name: EnvName): string {
  const value = import.meta.env[name]
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and fill it in.`,
    )
  }
  return value
}

export const supabase = createClient(
  requireEnv('VITE_SUPABASE_URL'),
  requireEnv('VITE_SUPABASE_ANON_KEY'),
)
