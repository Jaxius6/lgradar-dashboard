import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

// Force dynamic rendering since we use cookies for auth
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  try {
    const supabase = await createClient()
    
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If user is authenticated, redirect to dashboard
    if (user) {
      redirect("/dashboard")
    }
  } catch (error) {
    // If auth fails, treat as not authenticated
    console.warn('Auth check failed:', error)
  }

  // If not authenticated, redirect to login
  redirect("/login")
}
