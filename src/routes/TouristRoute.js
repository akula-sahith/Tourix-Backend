const express = require("express");
const {
  registerTourist,
  loginTourist,
  getAllTourists,
  getTouristById,
} = require("../controllers/TouristController");

const router = express.Router();

// Public routes
router.post("/register", registerTourist); // Register tourist
router.post("/login", loginTourist);       // Login tourist

// Get tourists
router.get("/", getAllTourists);           // Get all tourists
router.get("/:id", getTouristById);        // Get tourist profile by ID

module.exports = router; // ✅ CommonJS export
