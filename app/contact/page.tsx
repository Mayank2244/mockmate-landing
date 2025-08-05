import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <header className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We're here to help! Reach out to us with any questions or feedback.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Subject of your inquiry" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} required />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-medium">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-semibold text-slate-900">Email Us</p>
                      <a href="mailto:support@mockmate.ai" className="text-blue-600 hover:underline">
                        support@mockmate.ai
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-900">Call Us</p>
                      <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-slate-900">Our Office</p>
                      <p className="text-slate-600">123 MockMate Ave, Suite 100, Interview City, CA 90210</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent className="flex space-x-4">
                  {/* Placeholder for social media icons - replace with actual icons/links */}
                  <Link
                    href="#"
                    className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-300 transition-colors"
                  >
                    <span className="font-bold">F</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-300 transition-colors"
                  >
                    <span className="font-bold">T</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-300 transition-colors"
                  >
                    <span className="font-bold">in</span>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
