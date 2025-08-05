import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge" // Assuming Badge is imported from the same path

export default function ResumeReviewPage() {
  // Placeholder state for resume review flow
  const resumeUploaded = false
  const analysisInProgress = false
  const analysisResult = {
    overallScore: 88,
    sections: {
      contactInfo: { score: 95, feedback: "Excellent, all details clear." },
      summary: { score: 80, feedback: "Good, but could be more concise." },
      experience: { score: 90, feedback: "Strong, quantifiable achievements." },
      skills: { score: 85, feedback: "Comprehensive, but categorize for clarity." },
      atsCompatibility: { score: 92, feedback: "Very high, well-optimized." },
    },
    keywords: {
      found: ["JavaScript", "React", "Node.js", "AWS"],
      missing: ["TypeScript", "Docker"],
      suggestions: ["Include more cloud technologies."],
    },
    recommendations: [
      "Add a strong professional summary.",
      "Quantify achievements with numbers.",
      "Tailor keywords to each job application.",
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">AI Resume Review</h1>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Upload Your Resume</CardTitle>
            <CardDescription>Get instant, AI-powered feedback to optimize your resume.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resumeFile">Upload File (PDF, DOCX)</Label>
              <Input id="resumeFile" type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetJob">Target Job Title (Optional)</Label>
              <Input id="targetJob" placeholder="e.g., Senior Software Engineer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetKeywords">Target Keywords (Optional, comma-separated)</Label>
              <Input id="targetKeywords" placeholder="e.g., Agile, Microservices, Cloud" />
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-medium">
              <Upload className="w-5 h-5 mr-2" />
              Upload & Analyze
            </Button>

            {analysisInProgress && (
              <div className="text-center mt-4">
                <p className="text-slate-600">Analyzing your resume...</p>
                <Progress value={50} className="w-full mt-2" />
              </div>
            )}

            {resumeUploaded && !analysisInProgress && (
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Analysis Results:</h3>
                <Card className="border-2 border-green-400 bg-green-50/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-lg font-semibold text-green-700">Overall Score:</p>
                    <p className="text-5xl font-bold text-green-700">{analysisResult.overallScore}%</p>
                    <p className="text-sm text-slate-600">
                      ATS Compatibility: {analysisResult.sections.atsCompatibility.score}%
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Section-by-Section Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(analysisResult.sections).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <p className="font-medium text-slate-900 capitalize">{key.replace(/([A-Z])/g, " $1")}:</p>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          Score: {value.score}%
                        </Badge>
                        <p className="text-sm text-slate-600 flex-1 text-right ml-4">{value.feedback}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Keyword Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium text-slate-900 mb-1">Keywords Found:</p>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.found.map((kw, i) => (
                          <Badge key={i} variant="outline" className="bg-green-100 text-green-700">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 mb-1">Missing Keywords:</p>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.missing.map((kw, i) => (
                          <Badge key={i} variant="outline" className="bg-red-100 text-red-700">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 mb-1">Suggestions:</p>
                      <p className="text-sm text-slate-600">{analysisResult.keywords.suggestions}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-slate-700">
                      {analysisResult.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
</merged_code>
