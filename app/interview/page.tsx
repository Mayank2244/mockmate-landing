import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Play, Mic, StopCircle, RotateCcw } from "lucide-react"

export default function MockInterviewPage() {
  // Placeholder state for interview flow
  const interviewStarted = false
  const currentQuestion = "Tell me about a time you demonstrated leadership."
  const feedbackAvailable = false
  const feedback = {
    score: 85,
    strengths: ["Clear communication", "Relevant example"],
    improvements: ["Quantify impact more", "Connect to job role"],
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Mock Interview Simulator</h1>

        {!interviewStarted ? (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Start a New Interview</CardTitle>
              <CardDescription>Configure your mock interview settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Target Job Role</Label>
                <Input id="role" placeholder="e.g., Software Engineer, Product Manager" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Industry/Domain</Label>
                <Input id="domain" placeholder="e.g., Tech, Finance, Healthcare" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-medium">
                <Play className="w-5 h-5 mr-2" />
                Start Interview
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Current Interview</CardTitle>
              <CardDescription>Answer the question below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-100 p-4 rounded-lg border border-slate-200">
                <p className="text-lg font-semibold text-slate-900 mb-2">Question:</p>
                <p className="text-slate-700">{currentQuestion}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Your Answer</Label>
                <Textarea id="answer" placeholder="Type your answer here..." rows={6} />
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <Mic className="w-5 h-5 mr-2" />
                  Record Answer
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  <StopCircle className="w-5 h-5 mr-2" />
                  Stop Recording
                </Button>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium">
                Submit Answer
              </Button>
              <Button variant="ghost" className="w-full text-slate-600 hover:text-slate-900">
                <RotateCcw className="w-4 h-4 mr-2" />
                End Interview
              </Button>

              {feedbackAvailable && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">AI Feedback:</h3>
                  <Card className="border-2 border-green-400 bg-green-50/50">
                    <CardContent className="p-4">
                      <p className="text-lg font-semibold text-green-700">Score: {feedback.score}%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Strengths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-slate-700">
                        {feedback.strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Areas for Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-slate-700">
                        {feedback.improvements.map((i, idx) => (
                          <li key={idx}>{i}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
