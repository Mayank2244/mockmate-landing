import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Play, Upload, Users, Settings } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Placeholder data - in a real app, this would be fetched from your backend
  const userName = "John Doe"
  const subscriptionPlan = "Pro"
  const interviewsThisMonth = 7
  const interviewsLimit = "Unlimited" // Or a number for Free plan
  const resumesThisMonth = 3
  const resumesLimit = "Unlimited" // Or a number for Free plan
  const averageInterviewScore = 82
  const recentInterviews = [
    { id: "1", title: "Technical Interview - SWE", score: 85, date: "2024-07-25" },
    { id: "2", title: "Behavioral Interview - PM", score: 78, date: "2024-07-20" },
  ]
  const recentResumes = [
    { id: "1", name: "Software Engineer Resume.pdf", score: 90, date: "2024-07-22" },
    { id: "2", name: "Product Manager Resume.docx", score: 85, date: "2024-07-18" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Welcome, {userName}!</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Start practicing or reviewing your documents.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/interview" passHref legacyBehavior>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-medium">
                  <Play className="w-5 h-5 mr-2" />
                  Start Mock Interview
                </Button>
              </Link>
              <Link href="/resume-review" passHref legacyBehavior>
                <Button
                  variant="outline"
                  className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-lg font-medium bg-transparent"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Resume
                </Button>
              </Link>
              <Link href="/peer-connect" passHref legacyBehavior>
                <Button
                  variant="outline"
                  className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-lg font-medium bg-transparent"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Peer Connect
                </Button>
              </Link>
              <Link href="/profile-settings" passHref legacyBehavior>
                <Button
                  variant="outline"
                  className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 text-lg font-medium bg-transparent"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Profile Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Usage & Subscription */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Your Plan</CardTitle>
              <CardDescription>Current usage and subscription details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-lg font-semibold text-slate-900">Plan: {subscriptionPlan}</p>
                <p className="text-sm text-slate-600">
                  Interviews this month: {interviewsThisMonth} / {interviewsLimit}
                </p>
                {interviewsLimit !== "Unlimited" && (
                  <Progress
                    value={(interviewsThisMonth / Number.parseInt(interviewsLimit)) * 100}
                    className="w-full mt-2"
                  />
                )}
              </div>
              <div>
                <p className="text-sm text-slate-600">
                  Resume analyses this month: {resumesThisMonth} / {resumesLimit}
                </p>
                {resumesLimit !== "Unlimited" && (
                  <Progress value={(resumesThisMonth / Number.parseInt(resumesLimit)) * 100} className="w-full mt-2" />
                )}
              </div>
              <Separator />
              <Link href="/pricing" passHref legacyBehavior>
                <Button variant="link" className="p-0 text-purple-600 hover:text-purple-700">
                  Manage Subscription
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recent Interviews</CardTitle>
              <CardDescription>Your latest mock interview sessions.</CardDescription>
            </CardHeader>
            <CardContent>
              {recentInterviews.length > 0 ? (
                <ul className="space-y-4">
                  {recentInterviews.map((interview) => (
                    <li key={interview.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{interview.title}</p>
                        <p className="text-sm text-slate-600">{interview.date}</p>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        Score: {interview.score}%
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600">No recent interviews. Start one now!</p>
              )}
              <Separator className="my-4" />
              <Link href="/interviews" passHref legacyBehavior>
                <Button variant="link" className="p-0 text-blue-600 hover:text-blue-700">
                  View All Interviews
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recent Resume Reviews</CardTitle>
              <CardDescription>Your latest resume analysis reports.</CardDescription>
            </CardHeader>
            <CardContent>
              {recentResumes.length > 0 ? (
                <ul className="space-y-4">
                  {recentResumes.map((resume) => (
                    <li key={resume.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{resume.name}</p>
                        <p className="text-sm text-slate-600">{resume.date}</p>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        Score: {resume.score}%
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-600">No recent resume reviews. Upload one now!</p>
              )}
              <Separator className="my-4" />
              <Link href="/resume-history" passHref legacyBehavior>
                <Button variant="link" className="p-0 text-blue-600 hover:text-blue-700">
                  View All Resumes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Overall Performance */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
            <CardDescription>Your average score across all completed interviews.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-green-600 mb-4">{averageInterviewScore}%</div>
            <p className="text-lg text-slate-600">Average Mock Interview Score</p>
            <Separator className="my-4" />
            <Link href="/performance-analytics" passHref legacyBehavior>
              <Button variant="link" className="p-0 text-blue-600 hover:text-blue-700">
                View Detailed Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
