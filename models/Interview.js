const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  userAnswer: {
    type: String,
    required: true,
  },
  aiAnalysis: {
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    feedback: String,
    strengths: [String],
    improvements: [String],
    keywords: [String],
  },
  duration: {
    type: Number, // in seconds
    default: 0,
  },
})

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["behavioral", "technical", "case-study", "general"],
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    questions: [questionSchema],
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    duration: {
      type: Number, // total duration in seconds
      default: 0,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed", "abandoned"],
      default: "in-progress",
    },
    aiSummary: {
      overallFeedback: String,
      keyStrengths: [String],
      areasForImprovement: [String],
      recommendations: [String],
      confidenceLevel: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
    metadata: {
      userAgent: String,
      ipAddress: String,
      sessionId: String,
    },
  },
  {
    timestamps: true,
  },
)

// Calculate overall score based on individual question scores
interviewSchema.methods.calculateOverallScore = function () {
  if (this.questions.length === 0) return 0

  const totalScore = this.questions.reduce((sum, q) => {
    return sum + (q.aiAnalysis?.score || 0)
  }, 0)

  this.overallScore = Math.round(totalScore / this.questions.length)
  return this.overallScore
}

// Get interview statistics
interviewSchema.methods.getStatistics = function () {
  const completedQuestions = this.questions.filter((q) => q.aiAnalysis?.score)

  return {
    totalQuestions: this.questions.length,
    completedQuestions: completedQuestions.length,
    averageScore: this.overallScore,
    totalDuration: this.duration,
    averageQuestionDuration: this.duration / this.questions.length || 0,
  }
}

module.exports = mongoose.model("Interview", interviewSchema)
