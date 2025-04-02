const axios = require("axios");
const createError = require("../utils/createError");
const TryCatch = require("../utils/TryCatch");

const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

const API_KEY = "AIzaSyDhl4T1qVGWpskgs98vn1aL10ZaFGh02RY"

exports.postChatAI = TryCatch(async (req, res) => {
    try {
        const { message } = req.body;
        console.log("message:", message);

        // ✅ ใช้โครงสร้าง JSON ที่ถูกต้อง
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${API_KEY}`,
            {
                contents: [{ role: "user", parts: [{ text: message }] }]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        // ✅ ตรวจสอบว่า AI มีคำตอบหรือไม่
        const reply =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "AI ไม่สามารถตอบคำถามนี้ได้";

        console.log("reply:", reply);
        res.json({ reply });
    } catch (error) {
        console.error("❌ AI API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "AI Error" });
    }
});
