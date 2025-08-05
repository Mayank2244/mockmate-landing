const nodemailer = require("nodemailer")

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Email templates
const templates = {
  welcome: (data) => ({
    subject: "Welcome to MockMateAI!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #9333ea;">Welcome to MockMateAI, ${data.firstName}!</h1>
        <p>Thank you for joining MockMateAI, the AI-powered interview preparation platform.</p>
        <p>You can now:</p>
        <ul>
          <li>Practice with AI mock interviews</li>
          <li>Get detailed resume analysis</li>
          <li>Track your progress with analytics</li>
        </ul>
        <p>Get started by logging into your account and taking your first mock interview!</p>
        <a href="${process.env.FRONTEND_URL}/dashboard" style="background: linear-gradient(135deg, #9333ea, #2563eb); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Go to Dashboard</a>
        <p>Best regards,<br>The MockMateAI Team</p>
      </div>
    `,
  }),

  "password-reset": (data) => ({
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #9333ea;">Password Reset Request</h1>
        <p>Hi ${data.firstName},</p>
        <p>You requested to reset your password for your MockMateAI account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${data.resetLink}" style="background: linear-gradient(135deg, #9333ea, #2563eb); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The MockMateAI Team</p>
      </div>
    `,
  }),

  "subscription-welcome": (data) => ({
    subject: "Welcome to MockMateAI Pro!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #9333ea;">Welcome to MockMateAI Pro!</h1>
        <p>Hi ${data.firstName},</p>
        <p>Thank you for upgrading to MockMateAI Pro! You now have access to:</p>
        <ul>
          <li>Unlimited mock interviews</li>
          <li>Advanced resume analysis</li>
          <li>Industry-specific questions</li>
          <li>Detailed performance analytics</li>
          <li>Priority support</li>
        </ul>
        <p>Your subscription will renew on ${data.renewalDate}.</p>
        <a href="${process.env.FRONTEND_URL}/dashboard" style="background: linear-gradient(135deg, #9333ea, #2563eb); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Start Using Pro Features</a>
        <p>Best regards,<br>The MockMateAI Team</p>
      </div>
    `,
  }),
}

// Send email function
async function sendEmail({ to, subject, template, data, html, text }) {
  try {
    let emailContent = {}

    if (template && templates[template]) {
      emailContent = templates[template](data)
    } else {
      emailContent = { subject, html, text }
    }

    const mailOptions = {
      from: `"MockMateAI" <${process.env.SMTP_USER}>`,
      to,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", result.messageId)
    return result
  } catch (error) {
    console.error("Email sending error:", error)
    throw error
  }
}

// Send bulk emails
async function sendBulkEmails(emails) {
  const results = []

  for (const email of emails) {
    try {
      const result = await sendEmail(email)
      results.push({ success: true, messageId: result.messageId, email: email.to })
    } catch (error) {
      results.push({ success: false, error: error.message, email: email.to })
    }
  }

  return results
}

module.exports = {
  sendEmail,
  sendBulkEmails,
}
