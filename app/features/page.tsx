import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, FileText, BarChart3, Clock, Target, Award, Users, BookText, LayoutTemplate } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Powerful Features</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Unlock your full potential with MockMateAI's comprehensive suite of tools.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform provides all the tools and insights you need to excel in your job search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>AI Mock Interviews</CardTitle>
                <CardDescription>
                  Practice with our advanced AI interviewer that adapts to your industry and role. Get instant, detailed
                  feedback on your responses.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>AI Resume Review</CardTitle>
                <CardDescription>
                  Get detailed feedback on your resume with suggestions for improvement and optimization. Includes ATS
                  compatibility score.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Track your progress with detailed analytics and personalized improvement recommendations across all
                  your practice sessions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Peer-to-Peer Interview Matchmaking</CardTitle>
                <CardDescription>
                  Connect with other job seekers for live practice interviews and receive mutual feedback.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BookText className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Live Question Bank</CardTitle>
                <CardDescription>
                  Access a constantly updated bank of interview questions, categorized by role, industry, and
                  difficulty.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <LayoutTemplate className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Resume Templates</CardTitle>
                <CardDescription>
                  Utilize professionally designed, ATS-friendly resume templates to build your perfect resume.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>24/7 Availability</CardTitle>
                <CardDescription>
                  Practice anytime, anywhere. Our AI is always ready to help you improve your skills.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle>Industry-Specific</CardTitle>
                <CardDescription>
                  Tailored questions and scenarios for your specific industry and job role.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Certification</CardTitle>
                <CardDescription>
                  Earn certificates to showcase your interview readiness to potential employers.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
