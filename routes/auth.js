const express = require("express")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const { sendEmail } = require("../services/emailService")
const { generateToken, generateRefreshToken } = require("../utils/tokenUtils")
const rateLimit = require("express-rate-limit")

const router = express.Router()

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many authentication attempts, please try again later.",
})

// Register
router.post(
  "/register",
  [
    body("firstName").trim().isLength({ min: 1, max: 50 }).withMessage("First name is required"),
    body("lastName").trim().isLength({ min: 1, max: 50 }).withMessage("Last name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("industry").optional().trim(),
    body("jobTitle").optional().trim(),
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

      const { firstName, lastName, email, password, industry, jobTitle } = req.body

      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        })
      }

      // Create new user
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        industry,
        jobTitle,
      })

      await user.save()

      // Generate tokens
      const token = generateToken(user._id)
      const refreshToken = generateRefreshToken(user._id)

      // Send welcome email
      await sendEmail({
        to: user.email,
        subject: "Welcome to MockMateAI!",
        template: "welcome",
        data: {
          firstName: user.firstName,
          email: user.email,
        },
      })

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            subscription: user.subscription,
          },
          token,
          refreshToken,
        },
      })
    } catch (error) {
      console.error("Registration error:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  },
)

// Login
router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
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

      const { email, password } = req.body

      // Find user
      const user = await User.findOne({ email, isActive: true })
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        })
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        })
      }

      // Update last login
      user.lastLogin = new Date()
      await user.save()

      // Generate tokens
      const token = generateToken(user._id)
      const refreshToken = generateRefreshToken(user._id)

      res.json({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            subscription: user.subscription,
          },
          token,
          refreshToken,
        },
      })
    } catch (error) {
      console.error("Login error:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  },
)

// Refresh token
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      })
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      })
    }

    // Generate new tokens
    const newToken = generateToken(user._id)
    const newRefreshToken = generateRefreshToken(user._id)

    res.json({
      success: true,
      data: {
        token: newToken,
        refreshToken: newRefreshToken,
      },
    })
  } catch (error) {
    console.error("Token refresh error:", error)
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    })
  }
})

// Forgot password
router.post(
  "/forgot-password",
  [body("email").isEmail().normalizeEmail().withMessage("Valid email is required")],
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

      const { email } = req.body
      const user = await User.findOne({ email, isActive: true })

      if (!user) {
        // Don't reveal if user exists or not
        return res.json({
          success: true,
          message: "If an account with that email exists, we have sent a password reset link.",
        })
      }

      // Generate reset token
      const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

      user.passwordResetToken = resetToken
      user.passwordResetExpires = new Date(Date.now() + 3600000) // 1 hour
      await user.save()

      // Send reset email
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        template: "password-reset",
        data: {
          firstName: user.firstName,
          resetLink: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
        },
      })

      res.json({
        success: true,
        message: "If an account with that email exists, we have sent a password reset link.",
      })
    } catch (error) {
      console.error("Forgot password error:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  },
)

// Reset password
router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Reset token is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
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

      const { token, password } = req.body

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findOne({
        _id: decoded.userId,
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() },
        isActive: true,
      })

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset token",
        })
      }

      // Update password
      user.password = password
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save()

      res.json({
        success: true,
        message: "Password reset successfully",
      })
    } catch (error) {
      console.error("Reset password error:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  },
)

module.exports = router
