const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs").promises
const { body, validationResult } = require("express-validator")
const Resume = require("../models/Resume")
const User = require("../models/User")
const { extractTextFromPDF } = require("../services/pdfService")
const { analyzeResume } = require("../services/aiService")

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Only PDF and Word documents are allowed"))
    }
  },
})

// Get all resumes for user
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    const query = { userId: req.user.userId }

    if (status) query.status = status

    const resumes = await Resume.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-extractedText")

    const total = await Resume.countDocuments(query)

    res.json({
      success: true,
      data: {
        resumes,
        pagination: {
          current: Number.parseInt(page),
          pages: Math.ceil(total / limit),
          total,
        },
      },
    })
  } catch (error) {
    console.error("Get resumes error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Get specific resume
router.get("/:id", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      })
    }

    res.json({
      success: true,
      data: { resume },
    })
  } catch (error) {
    console.error("Get resume error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Upload and analyze resume
router.post(
  "/upload",
  upload.single("resume"),
  [
    body("targetJobTitle").optional().trim(),
    body("targetIndustry").optional().trim(),
    body("targetKeywords").optional().isArray(),
  ],
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Resume file is required",
        })
      }

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        // Clean up uploaded file
        await fs.unlink(req.file.path).catch(console.error)
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        })
      }

      // Check user's subscription limits
      const user = await User.findById(req.user.userId)
      if (!user.canPerformAction("resume")) {
        await fs.unlink(req.file.path).catch(console.error)
        return res.status(403).json({
          success: false,
          message: "Resume analysis limit reached for your subscription plan",
        })
      }

      const { targetJobTitle, targetIndustry, targetKeywords } = req.body
      const startTime = Date.now()

      try {
        // Extract text from uploaded file
        const extractedText = await extractTextFromPDF(req.file.path)

        // Create resume record
        const resume = new Resume({
          userId: req.user.userId,
          fileName: req.file.filename,
          originalName: req.file.originalname,
          filePath: req.file.path,
          fileSize: req.file.size,
          mimeType: req.file.mimetype,
          extractedText,
          targetJob: {
            title: targetJobTitle,
            industry: targetIndustry,
            keywords: targetKeywords || [],
          },
          status: "processing",
        })

        await resume.save()

        // Analyze resume in background
        analyzeResumeAsync(
          resume._id,
          extractedText,
          {
            targetJobTitle,
            targetIndustry,
            targetKeywords,
          },
          startTime,
        )

        // Update user usage
        user.usage.resumeAnalysesThisMonth += 1
        await user.save()

        res.status(201).json({
          success: true,
          message: "Resume uploaded successfully. Analysis in progress.",
          data: {
            resumeId: resume._id,
            status: "processing",
          },
        })
      } catch (extractError) {
        // Clean up file and resume record on error
        await fs.unlink(req.file.path).catch(console.error)
        throw extractError
      }
    } catch (error) {
      console.error("Upload resume error:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  },
)

// Get resume analysis status
router.get("/:id/status", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    }).select("status analysis.overallScore processingTime")

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      })
    }

    res.json({
      success: true,
      data: {
        status: resume.status,
        overallScore: resume.analysis?.overallScore,
        processingTime: resume.processingTime,
      },
    })
  } catch (error) {
    console.error("Get resume status error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Download resume file
router.get("/:id/download", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      })
    }

    // Check if file exists
    try {
      await fs.access(resume.filePath)
    } catch {
      return res.status(404).json({
        success: false,
        message: "Resume file not found",
      })
    }

    res.download(resume.filePath, resume.originalName)
  } catch (error) {
    console.error("Download resume error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Delete resume
router.delete("/:id", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      })
    }

    // Delete file
    await fs.unlink(resume.filePath).catch(console.error)

    // Delete resume record
    await Resume.findByIdAndDelete(resume._id)

    res.json({
      success: true,
      message: "Resume deleted successfully",
    })
  } catch (error) {
    console.error("Delete resume error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Async function to analyze resume
async function analyzeResumeAsync(resumeId, extractedText, targetJob, startTime) {
  try {
    const analysis = await analyzeResume(extractedText, targetJob)

    const resume = await Resume.findById(resumeId)
    if (resume) {
      resume.analysis = analysis
      resume.status = "completed"
      resume.processingTime = Date.now() - startTime
      resume.calculateOverallScore()
      await resume.save()
    }
  } catch (error) {
    console.error("Resume analysis error:", error)

    const resume = await Resume.findById(resumeId)
    if (resume) {
      resume.status = "failed"
      resume.processingTime = Date.now() - startTime
      await resume.save()
    }
  }
}

module.exports = router
