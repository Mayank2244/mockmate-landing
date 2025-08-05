import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Lightbulb, Handshake } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About MockMateAI</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Our mission is to empower job seekers with cutting-edge AI tools to confidently land their dream jobs.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Our Story</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            MockMateAI was born from a simple idea: job interviews and resume building shouldn't be a guessing game. Our
            founders, a team of experienced software engineers and HR professionals, recognized the immense stress and
            uncertainty job seekers face. They envisioned a platform that could democratize access to high-quality
            interview coaching and resume feedback, leveraging the power of artificial intelligence.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            We started with a small prototype for AI mock interviews, and the feedback was overwhelmingly positive.
            Users found the instant, unbiased feedback invaluable. This led us to expand into comprehensive resume
            analysis and performance analytics, continuously refining our AI models with real-world data and expert
            insights. Today, MockMateAI is a testament to our commitment to helping individuals unlock their full
            potential and achieve career success.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-lg">
              <CardHeader className="flex flex-col items-center">
                <Lightbulb className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl font-semibold text-slate-900">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We constantly push the boundaries of AI to provide the most effective and intelligent tools.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 shadow-lg">
              <CardHeader className="flex flex-col items-center">
                <Handshake className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl font-semibold text-slate-900">Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We empower every job seeker with the confidence and skills needed to succeed.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 shadow-lg">
              <CardHeader className="flex flex-col items-center">
                <Users className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle className="text-xl font-semibold text-slate-900">User-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our users are at the heart of everything we do, driving our development and improvements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Join Our Mission</h2>
          <p className="text-lg text-slate-600 mb-8">
            Ready to transform your job search? Join the thousands of successful professionals who trust MockMateAI.
          </p>
          <Link href="/register" passHref legacyBehavior>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-medium"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
