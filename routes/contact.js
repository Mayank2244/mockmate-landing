const express = require("express")
const { body, validationResult } = require("express-validator")
const { sendEmail } = require("../services/emailService")
const rateLimit = require("express-rate-limit")

const router = express.Router()

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 requests per hour
  message: "Too many contact form submissions, please try again later.",
})

// Contact form submission
router.post(
  "/",
  contactLimiter,
  [
    body("name").trim().isLength({ min: 1, max: 100 }).withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("subject").trim().isLength({ min: 1, max: 200 }).withMessage("Subject is required"),
    body("message")
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage("Message must be between 10 and 2000 characters"),
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

      const { name, email, subject, message } = req.body

      // Send email to support team
      await sendEmail({
        to: process.env.SUPPORT_EMAIL || "support@mockmate.ai",
        subject: `Contact Form: ${subject}`,
        html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toISOString()}</small></p>
        </div>
      `,
      })

      // Send confirmation email to user
      await sendEmail({
        to: email,
        subject: "Thank you for contacting MockMateAI",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #9333ea;">Thank you for contacting us!</h1>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p>Best regards,<br>The MockMateAI Team</p>
        </div>
      `,
      })

      res.json({
        success: true,
        message: "Thank you for your message. We will get back to you soon!",
      })
    } catch (error) {
      console.error("Contact form error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later.",
      })
    }
  },
)

module.exports = router
