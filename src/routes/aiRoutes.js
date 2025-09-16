// src/routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
// Example route
router.get("/", (req, res) => {
  res.send("AI Route is working!");
});

router.post("/chat", aiController.chat);
router.post("/plan",aiController.planner);

module.exports = router; // ✅ must export the router
