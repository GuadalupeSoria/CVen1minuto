import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Profile {
  id: string
  email: string | null
  is_premium: boolean
  premium_expires_at: string | null
  cv_data: unknown | null
  created_at: string
  updated_at: string
}
