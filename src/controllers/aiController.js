const { getGeminiReply, planTrip } = require("../services/geminiService");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const reply = await getGeminiReply(message);
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.planner = async (req,res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const reply = await planTrip(message);
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}