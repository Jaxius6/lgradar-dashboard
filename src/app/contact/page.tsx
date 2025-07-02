import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">LG</span>
              </div>
              <span className="text-xl font-semibold">LG Radar</span>
            </Link>
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our team for support, questions, or feedback
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" placeholder="Enter your company name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is this regarding?" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get in touch</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">support@lgradar.com.au</p>
                      <p className="text-sm text-muted-foreground">sales@lgradar.com.au</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+61 8 1234 5678</p>
                      <p className="text-xs text-muted-foreground">Monday to Friday, 9am to 5pm AWST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        Level 1, 123 St Georges Terrace<br />
                        Perth WA 6000<br />
                        Australia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9:00 AM - 5:00 PM AWST<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Resources</CardTitle>
                  <CardDescription>
                    Quick links to help you get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Knowledge Base
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    Schedule a Demo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    API Documentation
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Support</CardTitle>
                  <CardDescription>
                    For urgent technical issues
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you&apos;re experiencing critical system issues that affect your business operations,
                    please contact our emergency support line.
                  </p>
                  <Button variant="destructive" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Emergency Support: +61 8 1234 5679
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about LG Radar services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">How often are gazettes updated?</h4>
                  <p className="text-sm text-muted-foreground">
                    Government gazettes are typically published weekly, and our system monitors 
                    for new publications daily to ensure you receive timely alerts.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Can I customize my alert keywords?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can create custom keyword alerts and modify them at any time 
                    through your dashboard&apos;s Alerts section.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What file formats are supported for exports?</h4>
                  <p className="text-sm text-muted-foreground">
                    We support PDF, CSV, and Excel formats for gazette downloads and 
                    audit log exports.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Is there an API available?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, we provide a REST API for enterprise customers to integrate 
                    LG Radar data with their existing systems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}