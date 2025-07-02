import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Bell,
  Plus,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Trash2
} from "lucide-react"

export default async function AlertsPage() {
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

  // Mock alert data
  const alerts = [
    {
      id: 1,
      type: "keyword",
      name: "Mining License Applications",
      keywords: ["mining license", "exploration permit"],
      status: "active",
      lastTriggered: "2025-01-07",
      triggerCount: 3,
      emailRecipients: ["admin@lgradar.com.au"],
    },
    {
      id: 2,
      type: "keyword",
      name: "Development Approvals",
      keywords: ["development approval", "planning permit"],
      status: "active",
      lastTriggered: "2025-01-06",
      triggerCount: 1,
      emailRecipients: ["planning@lgradar.com.au"],
    },
    {
      id: 3,
      type: "keyword",
      name: "Environmental Assessments",
      keywords: ["environmental impact", "EPA assessment"],
      status: "paused",
      lastTriggered: "2025-01-04",
      triggerCount: 0,
      emailRecipients: ["environment@lgradar.com.au"],
    },
    {
      id: 4,
      type: "keyword",
      name: "Local Government Changes",
      keywords: ["local government", "council", "boundary"],
      status: "active",
      lastTriggered: "2025-01-05",
      triggerCount: 2,
      emailRecipients: ["local@lgradar.com.au", "admin@lgradar.com.au"],
    },
  ]

  const emailAccounts = [
    {
      id: 1,
      email: "admin@lgradar.com.au",
      status: "verified",
      alertCount: 3,
      lastUsed: "2025-01-07",
    },
    {
      id: 2,
      email: "planning@lgradar.com.au",
      status: "verified",
      alertCount: 1,
      lastUsed: "2025-01-06",
    },
    {
      id: 3,
      email: "environment@lgradar.com.au",
      status: "pending",
      alertCount: 1,
      lastUsed: "Never",
    },
    {
      id: 4,
      email: "local@lgradar.com.au",
      status: "verified",
      alertCount: 1,
      lastUsed: "2025-01-05",
    },
  ]

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
            <p className="text-muted-foreground">
              Manage keyword alerts and email notifications
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Alert
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                1 paused
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Triggers Today</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                +2 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Email Accounts</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                3 verified
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Keyword Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Keyword Alerts</CardTitle>
                <CardDescription>
                  Monitor specific keywords in gazette publications
                </CardDescription>
              </div>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{alert.name}</h3>
                      <Badge
                        variant={
                          alert.status === "active"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          alert.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : ""
                        }
                      >
                        {alert.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {alert.keywords.map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="outline"
                          className="text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        Last triggered: {alert.lastTriggered}
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {alert.triggerCount} triggers this week
                      </div>
                      <div className="flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {alert.emailRecipients.length} recipients
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Email Accounts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Email Accounts</CardTitle>
                <CardDescription>
                  Manage email addresses for alert notifications
                </CardDescription>
              </div>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Email
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{account.email}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{account.alertCount} alerts</span>
                        <span>Last used: {account.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        account.status === "verified"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        account.status === "verified"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : ""
                      }
                    >
                      {account.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}