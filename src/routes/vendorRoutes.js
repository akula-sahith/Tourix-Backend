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
router.post("/register", registerVendor);  // Register vendor      // Login vendor

// Protected/Admin routes (you can later add auth middleware here)
router.get("/getAll", getAllVendors);            // Get all vendors
router.get("/:id", getVendorById);         // Get vendor by ID


module.exports = router;
