const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    industry: {
      type: String,
      trim: true,
    },
    jobTitle: {
      type: String,
      trim: true,
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior", "executive"],
      default: "entry",
    },
    subscription: {
      plan: {
        type: String,
        enum: ["free", "pro", "enterprise"],
        default: "free",
      },
      status: {
        type: String,
        enum: ["active", "inactive", "cancelled"],
        default: "active",
      },
      stripeCustomerId: String,
      stripeSubscriptionId: String,
      currentPeriodEnd: Date,
    },
    usage: {
      interviewsThisMonth: {
        type: Number,
        default: 0,
      },
      resumeAnalysesThisMonth: {
        type: Number,
        default: 0,
      },
      lastResetDate: {
        type: Date,
        default: Date.now,
      },
    },
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      marketingEmails: {
        type: Boolean,
        default: false,
      },
      language: {
        type: String,
        default: "en",
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Get full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

// Reset monthly usage
userSchema.methods.resetMonthlyUsage = function () {
  const now = new Date()
  const lastReset = new Date(this.usage.lastResetDate)

  if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
    this.usage.interviewsThisMonth = 0
    this.usage.resumeAnalysesThisMonth = 0
    this.usage.lastResetDate = now
  }
}

// Check if user can perform action based on subscription
userSchema.methods.canPerformAction = function (action) {
  this.resetMonthlyUsage()

  const limits = {
    free: { interviews: 3, resumes: 2 },
    pro: { interviews: Number.POSITIVE_INFINITY, resumes: Number.POSITIVE_INFINITY },
    enterprise: { interviews: Number.POSITIVE_INFINITY, resumes: Number.POSITIVE_INFINITY },
  }

  const userLimits = limits[this.subscription.plan]

  switch (action) {
    case "interview":
      return this.usage.interviewsThisMonth < userLimits.interviews
    case "resume":
      return this.usage.resumeAnalysesThisMonth < userLimits.resumes
    default:
      return false
  }
}

module.exports = mongoose.model("User", userSchema)
