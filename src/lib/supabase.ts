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
    console.warn('Supabase environment variables not configured. Using mock client.')
    console.warn('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.')
    
    // Return a mock client for development when env vars are not available
    return {
      auth: {
        signInWithPassword: () => Promise.resolve({
          error: new Error('Authentication is not configured. Please set up Supabase environment variables.')
        }),
        signInWithOAuth: () => Promise.resolve({
          error: new Error('Authentication is not configured. Please set up Supabase environment variables.')
        }),
        signUp: () => Promise.resolve({
          error: new Error('Authentication is not configured. Please set up Supabase environment variables.')
        }),
        signOut: () => Promise.resolve({ error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      }
    }
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}