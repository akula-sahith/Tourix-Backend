// routes/vendorRoutes.js
const express = require("express");
const {
  registerVendor,
  loginVendor,
  getAllVendors,
  getVendorById,
  verifyVendor,
} = require("../controllers/vendorController");

const router = express.Router();

// Public routes
router.post("/register", registerVendor);  // Register vendor
router.post("/login", loginVendor);        // Login vendor

// Protected/Admin routes (you can later add auth middleware here)
router.get("/getAll", getAllVendors);            // Get all vendors
router.get("/:id", getVendorById);         // Get vendor by ID
router.patch("/:id/verify", verifyVendor); // Verify vendor (admin use)

module.exports = router;
