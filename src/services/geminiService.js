// src/services/geminiService.js
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getGeminiReply(userMessage) {
  try {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const body = {
      contents: [
        {
          parts: [
            {
              text: `You are a multilingual chatbot for Jharkhand tourism. 
                     User message: "${userMessage}". 
                     Reply in the same language as the user.`
            }
          ]
        }
      ]
    };

    const headers = {
      "Content-Type": "application/json",
      "X-goog-api-key": GEMINI_API_KEY
    };

    const response = await axios.post(url, body, { headers });

    // Extract the generated text
    const reply = response.data?.candidates?.[0]?.content || "Sorry, I could not process your request.";
    return reply;

  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    return "Something went wrong while contacting Gemini API.";
  }
}

async function planTrip(userMessage) {
  try {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const prompt = `
You are a smart trip planner AI. 
Plan a trip for the user with the following details:
  ${userMessage}

Return STRICTLY valid JSON, with no markdown, no explanations, and no code blocks.
The JSON structure must be:
{
  "destination": "...",
  "budget": "...",
  "days": "...",
  "itinerary": [
    {"day": 1, "activities": ["..."]},
    {"day": 2, "activities": ["..."]}
  ]
}
`;

    const body = { contents: [{ parts: [{ text: prompt }] }] };
    const headers = {
      "Content-Type": "application/json",
      "X-goog-api-key": GEMINI_API_KEY
    };

    const response = await axios.post(url, body, { headers });

    // Extract the text from response
   let tripPlanText = response.data?.candidates?.[0]?.content;

// Check if it’s an object with parts
if (tripPlanText?.parts?.length) {
  tripPlanText = tripPlanText.parts[0].text;
}

// Now tripPlanText is a string, safe to clean
tripPlanText = tripPlanText.replace(/```json|```/g, "").trim();

// Parse JSON
const tripPlan = JSON.parse(tripPlanText);

    return tripPlan;

  } catch (err) {
    console.error("Gemini Trip Planner API error:", err.response?.data || err.message);
    return { error: "Something went wrong while planning the trip." };
  }
}


module.exports = { getGeminiReply, planTrip };
