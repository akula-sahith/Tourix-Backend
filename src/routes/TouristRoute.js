import express from "express";
import {
  registerTourist,
  loginTourist,
  getAllTourists,
  getTouristById,
} from "../controllers/TouristController.js";

const router = express.Router();

// Public routes
router.post("/register", registerTourist); // Register tourist
router.post("/login", loginTourist);       // Login tourist

// Get tourists
router.get("/", getAllTourists);           // Get all tourists
router.get("/:id", getTouristById);        // Get tourist profile by ID

export default router;
