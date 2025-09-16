// routes/vendorRoutes.js
import express from "express";
import {
  registerVendor,
  loginVendor,
  getAllVendors,
  getVendorById,
  verifyVendor,
} from "../controllers/vendorController.js";

const router = express.Router();

// Public routes
router.post("/register", registerVendor);  // Register vendor
router.post("/login", loginVendor);        // Login vendor

// Protected/Admin routes (you can later add auth middleware here)
router.get("/", getAllVendors);            // Get all vendors
router.get("/:id", getVendorById);         // Get vendor by ID
router.patch("/:id/verify", verifyVendor); // Verify vendor (admin use)

export default router;

Give module.exports