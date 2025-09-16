// src/routes/aiRoutes.js
const express = require("express");
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.send("AI Route is working!");
});

module.exports = router; // ✅ must export the router
