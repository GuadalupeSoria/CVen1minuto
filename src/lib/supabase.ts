import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Si las env vars no están configuradas, devolvemos un cliente dummy que no crashea la app
// (las funciones de auth simplemente no harán nada)
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key-for-build')

export async function activatePremiumForUser(userId: string): Promise<boolean> {
  const expiresAt = new Date()
  expiresAt.setMonth(expiresAt.getMonth() + 1)
  const { error } = await supabase
    .from('profiles')
    .update({
      is_premium: true,
      premium_expires_at: expiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
  return !error
}

export interface Profile {
  id: string
  email: string | null
  is_premium: boolean
  premium_expires_at: string | null
  cv_data: unknown | null
  created_at: string
  updated_at: string
}
