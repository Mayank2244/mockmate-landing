const mongoose = require("mongoose")

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      required: true,
    },
    analysis: {
      overallScore: {
        type: Number,
        min: 0,
        max: 100,
      },
      sections: {
        contactInfo: {
          score: Number,
          feedback: String,
          suggestions: [String],
        },
        summary: {
          score: Number,
          feedback: String,
          suggestions: [String],
        },
        experience: {
          score: Number,
          feedback: String,
          suggestions: [String],
        },
        education: {
          score: Number,
          feedback: String,
          suggestions: [String],
        },
        skills: {
          score: Number,
          feedback: String,
          suggestions: [String],
        },
        formatting: {
          score: Number,
          feedback: String,
          suggestions: [String],
        },
      },
      keywords: {
        found: [String],
        missing: [String],
        suggestions: [String],
      },
      strengths: [String],
      weaknesses: [String],
      recommendations: [String],
      atsCompatibility: {
        score: Number,
        issues: [String],
        suggestions: [String],
      },
    },
    targetJob: {
      title: String,
      industry: String,
      keywords: [String],
    },
    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
    processingTime: {
      type: Number, // in milliseconds
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Calculate overall score based on section scores
resumeSchema.methods.calculateOverallScore = function () {
  const sections = this.analysis.sections
  const sectionKeys = Object.keys(sections)

  if (sectionKeys.length === 0) return 0

  const totalScore = sectionKeys.reduce((sum, key) => {
    return sum + (sections[key].score || 0)
  }, 0)

  this.analysis.overallScore = Math.round(totalScore / sectionKeys.length)
  return this.analysis.overallScore
}

// Get resume statistics
resumeSchema.methods.getStatistics = function () {
  return {
    overallScore: this.analysis.overallScore,
    wordCount: this.extractedText.split(" ").length,
    keywordsFound: this.analysis.keywords.found.length,
    keywordsMissing: this.analysis.keywords.missing.length,
    atsScore: this.analysis.atsCompatibility.score,
    processingTime: this.processingTime,
  }
}

module.exports = mongoose.model("Resume", resumeSchema)
