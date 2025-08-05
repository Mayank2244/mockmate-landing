const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const User = require("../models/User")
const Interview = require("../models/Interview")
const Resume = require("../models/Resume")

async function seedDatabase() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Interview.deleteMany({})
    await Resume.deleteMany({})
    console.log("Cleared existing data")

    // Create sample users
    const users = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: await bcrypt.hash("password123", 12),
        industry: "Technology",
        jobTitle: "Software Engineer",
        experienceLevel: "mid",
        subscription: {
          plan: "pro",
          status: "active",
        },
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        password: await bcrypt.hash("password123", 12),
        industry: "Marketing",
        jobTitle: "Marketing Manager",
        experienceLevel: "senior",
        subscription: {
          plan: "free",
          status: "active",
        },
      },
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@mockmate.ai",
        password: await bcrypt.hash("admin123", 12),
        industry: "Technology",
        jobTitle: "System Administrator",
        experienceLevel: "senior",
        role: "admin",
        subscription: {
          plan: "enterprise",
          status: "active",
        },
      },
    ]

    const createdUsers = await User.insertMany(users)
    console.log(`Created ${createdUsers.length} users`)

    // Create sample interviews
    const sampleInterviews = [
      {
        userId: createdUsers[0]._id,
        title: "Software Engineer Interview - Google",
        type: "technical",
        industry: "Technology",
        jobRole: "Software Engineer",
        difficulty: "advanced",
        status: "completed",
        overallScore: 85,
        duration: 1800,
        questions: [
          {
            question: "Explain the difference between REST and GraphQL APIs.",
            userAnswer:
              "REST is a stateless architecture that uses HTTP methods, while GraphQL allows clients to request specific data fields.",
            aiAnalysis: {
              score: 80,
              feedback: "Good understanding of both technologies. Could elaborate more on specific use cases.",
              strengths: ["Clear explanation", "Accurate technical knowledge"],
              improvements: ["Add more examples", "Discuss performance implications"],
              keywords: ["REST", "GraphQL", "API", "HTTP"],
            },
            duration: 300,
          },
        ],
      },
    ]

    const createdInterviews = await Interview.insertMany(sampleInterviews)
    console.log(`Created ${createdInterviews.length} interviews`)

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Seeding error:", error)
    process.exit(1)
  }
}

seedDatabase()
