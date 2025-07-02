import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Bell,
  History,
  CreditCard,
  TrendingUp,
  Clock
} from "lucide-react"

export default async function DashboardPage() {
  let user = null
  
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

  // Mock data for dashboard stats
  const stats = [
    {
      title: "Active Gazettes",
      value: "24",
      description: "Currently monitored",
      icon: FileText,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Pending Alerts",
      value: "8",
      description: "Require attention",
      icon: Bell,
      trend: "-5%",
      trendUp: false,
    },
    {
      title: "Audit Events",
      value: "156",
      description: "This month",
      icon: History,
      trend: "+23%",
      trendUp: true,
    },
    {
      title: "Account Status",
      value: "Active",
      description: "Next billing: Jan 15",
      icon: CreditCard,
      trend: "Paid",
      trendUp: true,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "gazette",
      title: "New Government Gazette Published",
      description: "WA Government Gazette No. 234 - Planning Applications",
      time: "2 hours ago",
      status: "new",
    },
    {
      id: 2,
      type: "alert",
      title: "Keyword Alert Triggered",
      description: "Found 3 matches for 'mining license' in recent publications",
      time: "4 hours ago",
      status: "pending",
    },
    {
      id: 3,
      type: "audit",
      title: "Export Completed",
      description: "Audit log export for December 2024 completed",
      time: "1 day ago",
      status: "completed",
    },
    {
      id: 4,
      type: "billing",
      title: "Payment Processed",
      description: "Monthly subscription payment of $99.00 processed",
      time: "3 days ago",
      status: "completed",
    },
  ]

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your LG Radar account.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <div className="flex items-center pt-1">
                  <Badge
                    variant={stat.trendUp ? "default" : "secondary"}
                    className={
                      stat.trendUp
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : ""
                    }
                  >
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates from your monitored gazettes and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {activity.type === "gazette" && (
                        <FileText className="h-5 w-5 text-blue-500" />
                      )}
                      {activity.type === "alert" && (
                        <Bell className="h-5 w-5 text-orange-500" />
                      )}
                      {activity.type === "audit" && (
                        <History className="h-5 w-5 text-purple-500" />
                      )}
                      {activity.type === "billing" && (
                        <CreditCard className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                        <Badge
                          variant={
                            activity.status === "new"
                              ? "default"
                              : activity.status === "pending"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Latest Gazettes
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Create New Alert
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <History className="mr-2 h-4 w-4" />
                Export Audit Logs
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Billing
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              System Status
            </CardTitle>
            <CardDescription>
              All systems operational
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Gazette Monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Alert System</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Data Processing</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}