"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileText,
  Bell,
  History,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  User,
  HelpCircle
} from "lucide-react"

const navigation = [
  {
    name: "Gazettes",
    href: "/dashboard/gazettes",
    icon: FileText,
    children: [
      { name: "List", href: "/dashboard/gazettes" },
      { name: "Summaries", href: "/dashboard/gazettes/summaries" },
      { name: "Countdown", href: "/dashboard/gazettes/countdown" },
    ],
  },
  {
    name: "Alerts",
    href: "/dashboard/alerts",
    icon: Bell,
    children: [
      { name: "Email Accounts", href: "/dashboard/alerts/email" },
      { name: "Keyword Alerts", href: "/dashboard/alerts/keywords" },
    ],
  },
  {
    name: "Audit Logs",
    href: "/dashboard/audit",
    icon: History,
    children: [
      { name: "List", href: "/dashboard/audit" },
      { name: "Export", href: "/dashboard/audit/export" },
    ],
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    name: "Account",
    href: "/dashboard/account",
    icon: Settings,
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  user?: {
    id: string
    email?: string
    avatar_url?: string
    role?: string
  }
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">LG</span>
          </div>
          <span className="text-xl font-semibold">LG Radar</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <div key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-green-accent-bg text-green-accent border border-green-accent-border"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
              {item.children && isActive && (
                <div className="ml-7 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={cn(
                        "block rounded-md px-3 py-1 text-xs transition-colors",
                        pathname === child.href
                          ? "text-green-accent bg-green-accent-bg"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback>
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.email || "User"}
            </p>
            <p className="text-xs text-muted-foreground">
              {user?.role || "Member"}
            </p>
          </div>
        </div>
        <Separator className="my-3" />
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            asChild
          >
            <Link href="/contact">
              <HelpCircle className="mr-2 h-4 w-4" />
              Contact Us
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r bg-card">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:pl-64">
        {/* Top Bar */}
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex-1" />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback>
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.email || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/account">
                  <User className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}