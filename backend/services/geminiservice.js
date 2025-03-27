const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mongoose = require('mongoose');

const Document = require('../models/documents');

const genAI = new GoogleGenerativeAI("AIzaSyACKhB5weAwEMR6CicZ6fZFQ4b1Ap1UYX8"); // Replace with your API key

async function analyzeDocumentsWithGemini(documentIds) {
    let totalScore = 0;
    let details = [];

    for (const docId of documentIds) {
        // Fetch document details from DB
        
        
        if (!mongoose.Types.ObjectId.isValid(docId)) {
            console.error(`Invalid document ID: ${docId}`);
            continue; // Skip this iteration if the ID is invalid
        }

        const document = await Document.findById(docId);
        if (!document) continue;
        
        // Read and extract text from the PDF
        const pdfBuffer = fs.readFileSync(document.filePath);
        const pdfData = await pdfParse(pdfBuffer);
        const extractedText = pdfData.text;
        

        // Ask Gemini AI to analyze document text
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        
        
        const prompt = `
        Analyze the following document text for authenticity, completeness, and risk assessment.
        Assign a risk score from 0 (low risk) to 100 (high risk).
        Text: ${extractedText}
        `;
        
        const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
        const response = result.response.text();

        console.log(result);
        
        // Extract risk score from response
        const scoreMatch = response.match(/Risk Score:\s*(\d+)/);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 50; // Default score if not found
        console.log("score : ",scoreMatch);

        totalScore += score;
        details.push({ document: docId, textExtracted: extractedText, score, analysis: response });
    }

    return {
        score: totalScore / documentIds.length,
        details,
    };
}

module.exports = analyzeDocumentsWithGemini;
  