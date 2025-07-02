import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

interface MockSupabaseClient {
  auth: {
    signInWithPassword: (credentials: { email: string; password: string }) => Promise<{ error: Error | null }>
    signInWithOAuth: (options: { provider: string; options?: { redirectTo?: string } }) => Promise<{ error: Error | null }>
    signUp: (credentials: { email: string; password: string }) => Promise<{ error: Error | null }>
    signOut: () => Promise<{ error: null }>
    getUser: () => Promise<{ data: { user: null }; error: null }>
    onAuthStateChange: () => { data: { subscription: { unsubscribe: () => void } } }
  }
}

export function createClient(): SupabaseClient | MockSupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client for build time when env vars are not available
    return {
      auth: {
        signInWithPassword: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        signInWithOAuth: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        signUp: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        signOut: () => Promise.resolve({ error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      }
    }
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}