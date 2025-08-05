const express = require("express")
const { body, validationResult } = require("express-validator")
const Interview = require("../models/Interview")
const User = require("../models/User")
const { analyzeInterviewResponse } = require("../services/aiService")
const { generateInterviewQuestions } = require("../services/questionService")

const router = express.Router()

// Get all interviews for user
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, status, type } = req.query
    const query = { userId: req.user.userId }

    if (status) query.status = status
    if (type) query.type = type

    const interviews = await Interview.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-questions.userAnswer -questions.aiAnalysis")

    const total = await Interview.countDocuments(query)

    res.json({
      success: true,
      data: {
        interviews,
        pagination: {
          current: Number.parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
    })
  } catch (error) {
    console.error("Get interviews error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Get specific interview
router.get("/:id", async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      })
    }

    res.json({
      success: true,
      data: { interview },
    })
  } catch (error) {
    console.error("Get interview error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Start new interview
router.post(
  "/start",
  [
    body("title").trim().isLength({ min: 1, max: 100 }).withMessage("Title is required"),
    body("type").isIn(["behavioral", "technical", "case-study", "general"]).withMessage("Invalid interview type"),
    body("industry").trim().isLength({ min: 1 }).withMessage("Industry is required"),
    body("jobRole").trim().isLength({ min: 1 }).withMessage("Job role is required"),
    body("difficulty").optional().isIn(["beginner", "intermediate", "advanced"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        })
      }

      // Check user's subscription limits
      const user = await User.findById(req.user.userId)
      if (!user.canPerformAction("interview")) {
        return res.status(403).json({
          success: false,
          message: "Interview limit reached for your subscription plan",
        })
      }

      const { title, type, industry, jobRole, difficulty = "intermediate" } = req.body

      // Generate initial questions
      const questions = await generateInterviewQuestions({
        type,
        industry,
        jobRole,
        difficulty,
        count: 5,
      })

      // Create interview
      const interview = new Interview({
        userId: req.user.userId,
        title,
        type,
        industry,
        jobRole,
        difficulty,
        questions: questions.map((q) => ({ question: q, userAnswer: "" })),
        metadata: {
          userAgent: req.get("User-Agent"),
          ipAddress: req.ip,
        },
      })

      await interview.save()

      // Update user usage
      user.usage.interviewsThisMonth += 1
      await user.save()

      res.status(201).json({
        success: true,
        message: "Interview started successfully",
        data: { interview },
      })
    } catch (error) {
      console.error("Start interview error:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  },
)

// Submit answer to question
router.post(
  "/:id/answer",
  [
    body("questionIndex").isInt({ min: 0 }).withMessage("Valid question index is required"),
    body("answer").trim().isLength({ min: 1 }).withMessage("Answer is required"),
    body("duration").optional().isInt({ min: 0 }).withMessage("Duration must be a positive number"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        })
      }

      const { questionIndex, answer, duration = 0 } = req.body

      const interview = await Interview.findOne({
        _id: req.params.id,
        userId: req.user.userId,
      })

      if (!interview) {
        return res.status(404).json({
          success: false,
          message: "Interview not found",
        })
      }

      if (questionIndex >= interview.questions.length) {
        return res.status(400).json({
          success: false,
          message: "Invalid question index",
        })
      }

      // Update question with user answer
      interview.questions[questionIndex].userAnswer = answer
      interview.questions[questionIndex].duration = duration

      // Analyze the answer using AI
      const analysis = await analyzeInterviewResponse({
        question: interview.questions[questionIndex].question,
        answer,
        jobRole: interview.jobRole,
        industry: interview.industry,
        type: interview.type,
      })

      interview.questions[questionIndex].aiAnalysis = analysis

      // Update total duration
      interview.duration += duration

      await interview.save()

      res.json({
        success: true,
        message: "Answer submitted successfully",
        data: {
          analysis,
          nextQuestion:
            questionIndex + 1 < interview.questions.length ? interview.questions[questionIndex + 1].question : null,
        },
      })
    } catch (error) {
      console.error("Submit answer error:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  },
)

// Complete interview
router.post("/:id/complete", async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      })
    }

    // Calculate overall score
    interview.calculateOverallScore()
    interview.status = "completed"

    // Generate AI summary
    const aiSummary = await generateInterviewSummary(interview)
    interview.aiSummary = aiSummary

    await interview.save()

    res.json({
      success: true,
      message: "Interview completed successfully",
      data: {
        interview,
        statistics: interview.getStatistics(),
      },
    })
  } catch (error) {
    console.error("Complete interview error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Get interview statistics
router.get("/:id/statistics", async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      })
    }

    const statistics = interview.getStatistics()

    res.json({
      success: true,
      data: { statistics },
    })
  } catch (error) {
    console.error("Get statistics error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Helper function to generate interview summary
async function generateInterviewSummary(interview) {
  const completedQuestions = interview.questions.filter((q) => q.aiAnalysis?.score)

  if (completedQuestions.length === 0) {
    return {
      overallFeedback: "No questions were completed.",
      keyStrengths: [],
      areasForImprovement: [],
      recommendations: [],
      confidenceLevel: 0,
    }
  }

  const averageScore = interview.overallScore
  const allStrengths = completedQuestions.flatMap((q) => q.aiAnalysis.strengths || [])
  const allImprovements = completedQuestions.flatMap((q) => q.aiAnalysis.improvements || [])

  return {
    overallFeedback: `You completed ${completedQuestions.length} questions with an average score of ${averageScore}%. ${
      averageScore >= 80
        ? "Excellent performance!"
        : averageScore >= 60
          ? "Good performance with room for improvement."
          : "Consider more practice to improve your interview skills."
    }`,
    keyStrengths: [...new Set(allStrengths)].slice(0, 5),
    areasForImprovement: [...new Set(allImprovements)].slice(0, 5),
    recommendations: [
      "Practice more behavioral questions",
      "Research the company thoroughly",
      "Prepare specific examples using the STAR method",
      "Work on clear and concise communication",
    ],
    confidenceLevel: Math.min(averageScore + 10, 100),
  }
}

module.exports = router
