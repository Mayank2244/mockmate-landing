const express = require("express")
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const Interview = require("../models/Interview")
const Resume = require("../models/Resume")

const router = express.Router()

// Get user profile
router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      data: { user },
    })
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Update user profile
router.put(
  "/profile",
  [
    body("firstName").optional().trim().isLength({ min: 1, max: 50 }),
    body("lastName").optional().trim().isLength({ min: 1, max: 50 }),
    body("industry").optional().trim(),
    body("jobTitle").optional().trim(),
    body("experienceLevel").optional().isIn(["entry", "mid", "senior", "executive"]),
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

      const updates = req.body
      const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true, runValidators: true }).select(
        "-password",
      )

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: { user },
      })
    } catch (error) {
      console.error("Update profile error:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  },
)

// Get user dashboard data
router.get("/dashboard", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password")

    // Get recent interviews
    const recentInterviews = await Interview.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title type overallScore status createdAt")

    // Get recent resumes
    const recentResumes = await Resume.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("originalName analysis.overallScore status createdAt")

    // Calculate statistics
    const totalInterviews = await Interview.countDocuments({ userId: req.user.userId })
    const completedInterviews = await Interview.countDocuments({
      userId: req.user.userId,
      status: "completed",
    })

    const avgScore = await Interview.aggregate([
      { $match: { userId: user._id, status: "completed" } },
      { $group: { _id: null, avgScore: { $avg: "$overallScore" } } },
    ])

    const totalResumes = await Resume.countDocuments({ userId: req.user.userId })

    res.json({
      success: true,
      data: {
        user,
        recentInterviews,
        recentResumes,
        statistics: {
          totalInterviews,
          completedInterviews,
          averageScore: avgScore.length > 0 ? Math.round(avgScore[0].avgScore) : 0,
          totalResumes,
          usageThisMonth: {
            interviews: user.usage.interviewsThisMonth,
            resumes: user.usage.resumeAnalysesThisMonth,
          },
        },
      },
    })
  } catch (error) {
    console.error("Get dashboard error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Update user preferences
router.put(
  "/preferences",
  [
    body("emailNotifications").optional().isBoolean(),
    body("marketingEmails").optional().isBoolean(),
    body("language").optional().isIn(["en", "es", "fr", "de"]),
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

      const user = await User.findById(req.user.userId)
      user.preferences = { ...user.preferences, ...req.body }
      await user.save()

      res.json({
        success: true,
        message: "Preferences updated successfully",
        data: { preferences: user.preferences },
      })
    } catch (error) {
      console.error("Update preferences error:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  },
)

// Delete user account
router.delete("/account", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)

    // Soft delete - mark as inactive
    user.isActive = false
    user.email = `deleted_${Date.now()}_${user.email}`
    await user.save()

    res.json({
      success: true,
      message: "Account deleted successfully",
    })
  } catch (error) {
    console.error("Delete account error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

module.exports = router
