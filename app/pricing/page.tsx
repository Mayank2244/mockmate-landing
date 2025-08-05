import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Flexible Pricing Plans</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Choose the plan that best fits your career goals and budget.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-slate-200 relative">
              <CardHeader>
                <CardTitle className="text-xl">Free</CardTitle>
                <div className="text-3xl font-bold">
                  $0<span className="text-base font-normal text-slate-600">/month</span>
                </div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>3 mock interviews per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Basic resume analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>General feedback</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <CheckCircle className="w-5 h-5 text-slate-300" />
                    <span>Limited performance analytics</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <CheckCircle className="w-5 h-5 text-slate-300" />
                    <span>No peer-to-peer matching</span>
                  </div>
                </div>
                <Link href="/register" passHref legacyBehavior>
                  <Button className="w-full bg-transparent" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-600 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="text-xl">Pro</CardTitle>
                <div className="text-3xl font-bold">
                  $29<span className="text-base font-normal text-slate-600">/month</span>
                </div>
                <CardDescription>For serious job seekers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Unlimited mock interviews</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Advanced resume analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Industry-specific questions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Detailed performance analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Peer-to-peer matching</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 relative">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <div className="text-3xl font-bold">
                  $99<span className="text-base font-normal text-slate-600">/month</span>
                </div>
                <CardDescription>For teams and organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Everything in Pro</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Team management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Custom branding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>API access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Dedicated support</span>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about MockMateAI pricing.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change my plan later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Yes, you can upgrade or downgrade your plan at any time from your dashboard. Changes will be prorated
                  accordingly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We accept all major credit cards (Visa, Mastercard, American Express, Discover) and PayPal.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, simply contact our
                  support team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
