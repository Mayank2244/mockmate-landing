const pdf = require("pdf-parse")
const fs = require("fs").promises

// Extract text from PDF file
async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath)
    const data = await pdf(dataBuffer)
    return data.text
  } catch (error) {
    console.error("PDF extraction error:", error)
    throw new Error("Failed to extract text from PDF")
  }
}

module.exports = {
  extractTextFromPDF,
}
