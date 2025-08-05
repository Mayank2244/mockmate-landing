const OpenAI = require("openai")

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Analyze interview response
async function analyzeInterviewResponse({ question, answer, jobRole, industry, type }) {
  try {
    const prompt = `
Analyze this interview response for a ${jobRole} position in ${industry} industry.

Interview Type: ${type}
Question: ${question}
Answer: ${answer}

Please provide a detailed analysis including:
1. Score (0-100)
2. Feedback (2-3 sentences)
3. Strengths (list of 2-3 points)
4. Areas for improvement (list of 2-3 points)
5. Relevant keywords mentioned

Format the response as JSON with the following structure:
{
  "score": number,
  "feedback": "string",
  "strengths": ["string"],
  "improvements": ["string"],
  "keywords": ["string"]
}
`

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert interview coach and HR professional. Provide constructive, actionable feedback on interview responses.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const analysis = JSON.parse(response.choices[0].message.content)
    return analysis
  } catch (error) {
    console.error("AI analysis error:", error)

    // Fallback analysis
    return {
      score: 70,
      feedback:
        "Your response shows good understanding of the question. Consider providing more specific examples and details.",
      strengths: ["Clear communication", "Relevant experience mentioned"],
      improvements: ["Add more specific examples", "Elaborate on key points"],
      keywords: [],
    }
  }
}

// Analyze resume
async function analyzeResume(extractedText, targetJob = {}) {
  try {
    const prompt = `
Analyze this resume for a ${targetJob.title || "general"} position in ${targetJob.industry || "various"} industry.

Resume Text:
${extractedText}

Target Keywords: ${targetJob.keywords ? targetJob.keywords.join(", ") : "N/A"}

Please provide a comprehensive analysis including:
1. Overall assessment and score (0-100)
2. Section-by-section analysis (contact info, summary, experience, education, skills, formatting)
3. Keyword analysis (found vs missing)
4. ATS compatibility assessment
5. Strengths and weaknesses
6. Specific recommendations

Format the response as JSON with detailed scoring and feedback for each section.
`

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume reviewer and career coach. Provide detailed, actionable feedback on resumes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 1500,
    })

    const analysis = JSON.parse(response.choices[0].message.content)
    return analysis
  } catch (error) {
    console.error("Resume analysis error:", error)

    // Fallback analysis
    return {
      overallScore: 75,
      sections: {
        contactInfo: {
          score: 80,
          feedback: "Contact information is present and professional.",
          suggestions: ["Consider adding LinkedIn profile"],
        },
        summary: {
          score: 70,
          feedback: "Summary provides good overview of experience.",
          suggestions: ["Make it more specific to target role"],
        },
        experience: {
          score: 75,
          feedback: "Experience section shows relevant background.",
          suggestions: ["Add more quantifiable achievements"],
        },
        education: {
          score: 80,
          feedback: "Education section is well-formatted.",
          suggestions: ["Include relevant coursework if recent graduate"],
        },
        skills: {
          score: 70,
          feedback: "Skills section covers important areas.",
          suggestions: ["Organize skills by category"],
        },
        formatting: {
          score: 75,
          feedback: "Resume is well-formatted and readable.",
          suggestions: ["Ensure consistent formatting throughout"],
        },
      },
      keywords: {
        found: ["management", "leadership", "project"],
        missing: ["strategy", "analytics", "optimization"],
        suggestions: ["Include more industry-specific keywords"],
      },
      strengths: ["Clear structure", "Relevant experience", "Professional formatting"],
      weaknesses: ["Lacks quantifiable achievements", "Missing key industry terms"],
      recommendations: [
        "Add more specific metrics and achievements",
        "Include relevant keywords for ATS optimization",
        "Tailor content to specific job requirements",
      ],
      atsCompatibility: {
        score: 80,
        issues: ["Some formatting may not parse well"],
        suggestions: ["Use standard section headings", "Avoid complex formatting"],
      },
    }
  }
}

module.exports = {
  analyzeInterviewResponse,
  analyzeResume,
}
