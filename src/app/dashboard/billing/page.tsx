import { getAuthenticatedUser } from "@/lib/auth-helper"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  CheckCircle,
  Receipt
} from "lucide-react"

// Force dynamic rendering since we use cookies for auth
export const dynamic = 'force-dynamic'

export default async function BillingPage({
  searchParams,
}: {
  searchParams?: Promise<{ demo?: string }>
}) {
  const { user } = await getAuthenticatedUser(searchParams)

  // Mock billing data
  const currentPlan = {
    name: "Professional",
    price: 99,
    currency: "AUD",
    interval: "month",
    status: "active",
    nextBilling: "2025-02-07",
    features: [
      "Unlimited gazette monitoring",
      "Custom keyword alerts",
      "Email notifications",
      "Audit log exports",
      "API access",
      "Priority support"
    ]
  }

  const invoices = [
    {
      id: "INV-2025-001",
      date: "2025-01-07",
      amount: 99.00,
      status: "paid",
      description: "Professional Plan - January 2025",
      downloadUrl: "#"
    },
    {
      id: "INV-2024-012",
      date: "2024-12-07",
      amount: 99.00,
      status: "paid",
      description: "Professional Plan - December 2024",
      downloadUrl: "#"
    },
    {
      id: "INV-2024-011",
      date: "2024-11-07",
      amount: 99.00,
      status: "paid",
      description: "Professional Plan - November 2024",
      downloadUrl: "#"
    },
    {
      id: "INV-2024-010",
      date: "2024-10-07",
      amount: 99.00,
      status: "paid",
      description: "Professional Plan - October 2024",
      downloadUrl: "#"
    }
  ]

  const paymentMethod = {
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2027
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing information
          </p>
        </div>

        {/* Current Plan */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Plan</CardTitle>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  Active
                </Badge>
              </div>
              <CardDescription>
                Your current subscription details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                <p className="text-3xl font-bold text-green-600">
                  ${currentPlan.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{currentPlan.interval}
                  </span>
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  Next billing: {currentPlan.nextBilling}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Plan Features:</h4>
                <ul className="space-y-1">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="mr-2 h-3 w-3 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" className="flex-1">
                  Change Plan
                </Button>
                <Button variant="outline" className="flex-1">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Your default payment method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-8 bg-blue-100 dark:bg-blue-900/20 rounded">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {paymentMethod.brand} •••• {paymentMethod.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" className="flex-1">
                  Update Payment Method
                </Button>
                <Button variant="outline" className="flex-1">
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$99.00</div>
              <p className="text-xs text-muted-foreground">
                Professional plan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Year to Date</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$99.00</div>
              <p className="text-xs text-muted-foreground">
                1 month billed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$99.00</div>
              <p className="text-xs text-muted-foreground">
                Due Feb 7, 2025
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Current</div>
              <p className="text-xs text-muted-foreground">
                All payments up to date
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>
                  Download and view your past invoices
                </CardDescription>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Receipt className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {invoice.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      >
                        {invoice.status}
                      </Badge>
                    </div>
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

        {/* Billing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>
              Update your billing address and tax information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Billing Address</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>LG Radar Pty Ltd</p>
                  <p>Level 1, 123 St Georges Terrace</p>
                  <p>Perth WA 6000</p>
                  <p>Australia</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Tax Information</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>ABN: 12 345 678 901</p>
                  <p>GST Registered: Yes</p>
                  <p>Tax Rate: 10% GST</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="mt-4">
              Update Billing Information
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}