const jwt = require("jsonwebtoken")

// Generate access token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "24h" })
}

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" })
}

// Verify token
const verifyToken = (token, secret = process.env.JWT_SECRET) => {
  return jwt.verify(token, secret)
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
}
