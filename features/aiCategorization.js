const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBi5MxPAGSLWTc1NLjUIBhrvpW20M_NO7A");

async function categorizeEmail(emailText) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(`Categorize this email into one of these categories: Interested, Meeting Booked, Not Interested, Spam, Out of Office: "${emailText}"`);
        console.error("Category details ----> ", result.response.text());
        return result.response.text();
    } catch (err) {
        console.error("Error categorizing email:", err.message);
        return "Unknown";
    }
}
// const result = categorizeEmail('Nodejs project Test email')
module.exports = { categorizeEmail };
