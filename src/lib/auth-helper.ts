import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

export async function getAuthenticatedUser(searchParams?: Promise<{ demo?: string }>) {
  let user = null
  let isDemo = false
  
  if (searchParams) {
    const resolvedSearchParams = await searchParams
    isDemo = resolvedSearchParams.demo === 'true'
  }
  
  if (!isDemo) {
    try {
      const supabase = await createClient()
      
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      
      user = authUser
    } catch (error) {
      // If auth fails, treat as not authenticated
      console.warn('Auth check failed:', error)
    }

    if (!user) {
      redirect("/login")
    }
  } else {
    // Demo user
    user = {
      id: 'demo-user',
      email: 'demo@lgradar.com.au',
      avatar_url: undefined,
      role: 'Demo User'
    }
  }
  
  return { user, isDemo }
}