// Generate interview questions based on parameters
async function generateInterviewQuestions({ type, industry, jobRole, difficulty, count = 5 }) {
  const questionBank = {
    behavioral: {
      beginner: [
        "Tell me about yourself and your background.",
        "Why are you interested in this position?",
        "What are your greatest strengths?",
        "Describe a challenge you faced and how you overcame it.",
        "Where do you see yourself in 5 years?",
      ],
      intermediate: [
        "Describe a time when you had to work with a difficult team member.",
        "Tell me about a project you're particularly proud of.",
        "How do you handle stress and pressure?",
        "Describe a situation where you had to learn something new quickly.",
        "Tell me about a time you failed and what you learned from it.",
      ],
      advanced: [
        "Describe a time when you had to make a difficult decision with limited information.",
        "Tell me about a time you had to influence others without authority.",
        "How do you approach conflict resolution in a team setting?",
        "Describe a situation where you had to adapt to significant change.",
        "Tell me about a time you had to give difficult feedback to someone.",
      ],
    },
    technical: {
      beginner: [
        "What programming languages are you most comfortable with?",
        "Explain the difference between a class and an object.",
        "What is version control and why is it important?",
        "Describe the software development lifecycle.",
        "What is debugging and how do you approach it?",
      ],
      intermediate: [
        "Explain the concept of object-oriented programming.",
        "What are design patterns and can you give an example?",
        "How do you ensure code quality in your projects?",
        "Describe the difference between SQL and NoSQL databases.",
        "What is API testing and why is it important?",
      ],
      advanced: [
        "Design a scalable system for handling millions of users.",
        "Explain microservices architecture and its trade-offs.",
        "How would you optimize a slow-performing database query?",
        "Describe your approach to system security and data protection.",
        "How do you handle technical debt in large codebases?",
      ],
    },
    general: {
      beginner: [
        "What interests you about our company?",
        "How do you prioritize your work?",
        "What motivates you in your career?",
        "Describe your ideal work environment.",
        "How do you stay updated with industry trends?",
      ],
      intermediate: [
        "How do you handle multiple competing priorities?",
        "Describe your leadership style.",
        "How do you approach problem-solving?",
        "Tell me about a time you had to meet a tight deadline.",
        "How do you handle constructive criticism?",
      ],
      advanced: [
        "How do you drive innovation in your field?",
        "Describe your approach to strategic planning.",
        "How do you build and maintain professional relationships?",
        "What's your approach to risk management?",
        "How do you measure success in your role?",
      ],
    },
  }

  const questions = questionBank[type]?.[difficulty] || questionBank.general.intermediate

  // Shuffle and return requested number of questions
  const shuffled = questions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

module.exports = {
  generateInterviewQuestions,
}
