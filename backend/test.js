const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyACKhB5weAwEMR6CicZ6fZFQ4b1Ap1UYX8"); // Replace with your API key

async function testGemini() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent({ 
            contents: [{ parts: [{ text: "Hello, how are you?" }] }] 
        });

        console.log("Gemini API Response:", result);
    } catch (error) {
        console.error("Gemini API Error:", error);
    }
}

testGemini();
