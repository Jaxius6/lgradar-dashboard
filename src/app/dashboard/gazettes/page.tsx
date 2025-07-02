import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FileText, 
  Search, 
  Filter, 
  Download,
  Calendar,
  Eye,
  Clock
} from "lucide-react"

export default async function GazettesPage() {
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

  // Mock gazette data
  const gazettes = [
    {
      id: 1,
      title: "WA Government Gazette No. 234",
      subtitle: "Planning Applications and Development Approvals",
      publishDate: "2025-01-07",
      status: "new",
      category: "Planning",
      pages: 45,
      keywords: ["mining", "development", "approval"],
    },
    {
      id: 2,
      title: "WA Government Gazette No. 233",
      subtitle: "Mining Tenement Applications",
      publishDate: "2025-01-06",
      status: "reviewed",
      category: "Mining",
      pages: 32,
      keywords: ["mining", "tenement", "application"],
    },
    {
      id: 3,
      title: "WA Government Gazette No. 232",
      subtitle: "Environmental Impact Assessments",
      publishDate: "2025-01-05",
      status: "archived",
      category: "Environment",
      pages: 28,
      keywords: ["environment", "assessment", "impact"],
    },
    {
      id: 4,
      title: "WA Government Gazette No. 231",
      subtitle: "Local Government Notices",
      publishDate: "2025-01-04",
      status: "reviewed",
      category: "Local Government",
      pages: 18,
      keywords: ["local", "government", "notice"],
    },
  ]

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gazettes</h1>
            <p className="text-muted-foreground">
              Monitor and review government gazette publications
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Search Gazettes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, category, or keywords..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gazettes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">
                +12 this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Awaiting review
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gazettes List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Gazettes</CardTitle>
            <CardDescription>
              Latest government gazette publications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gazettes.map((gazette) => (
                <div
                  key={gazette.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{gazette.title}</h3>
                      <Badge
                        variant={
                          gazette.status === "new"
                            ? "default"
                            : gazette.status === "reviewed"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          gazette.status === "new"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : ""
                        }
                      >
                        {gazette.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {gazette.subtitle}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {gazette.publishDate}
                      </div>
                      <div className="flex items-center">
                        <FileText className="mr-1 h-3 w-3" />
                        {gazette.pages} pages
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {gazette.category}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {gazette.keywords.map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="secondary"
                          className="text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
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