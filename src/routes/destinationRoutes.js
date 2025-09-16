// routes/destinationRoutes.js

const express = require("express");
const {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
  addReview,
} = require("../controllers/destinationController");

const router = express.Router();

// Create a new destination
router.post("/create", createDestination);

// Get all destinations
router.get("/getAll", getAllDestinations);

// Get a destination by ID
router.get("/:id", getDestinationById);

// Update a destination
router.put("/:id", updateDestination);

// Delete a destination
router.delete("/:id", deleteDestination);

// Add review to a destination
router.post("/:id/reviews", addReview);

module.exports = router; // ✅ CommonJS export
