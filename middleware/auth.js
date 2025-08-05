const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Authenticate token middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from database
    const user = await User.findById(decoded.userId).select("-password")

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or user not found",
      })
    }

    // Add user to request object
    req.user = {
      userId: user._id,
      email: user.email,
      subscription: user.subscription,
    }

    next()
  } catch (error) {
    console.error("Authentication error:", error)

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      })
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      })
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

// Check subscription middleware
const checkSubscription = (requiredPlan) => {
  return (req, res, next) => {
    const userPlan = req.user.subscription.plan
    const planHierarchy = { free: 0, pro: 1, enterprise: 2 }

    if (planHierarchy[userPlan] >= planHierarchy[requiredPlan]) {
      next()
    } else {
      res.status(403).json({
        success: false,
        message: `${requiredPlan} subscription required`,
      })
    }
  }
}

// Admin only middleware
const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      })
    }

    next()
  } catch (error) {
    console.error("Admin check error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

module.exports = {
  authenticateToken,
  checkSubscription,
  adminOnly,
}
