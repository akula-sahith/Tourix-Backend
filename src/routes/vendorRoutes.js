const express = require("express");
const {
  registerVendor,
  getAllVendors,
  getVendorById,
  getVendorProfile,
  updateVendorProfile,
  requestService,
} = require("../controllers/vendorController.js");

const router = express.Router();

// Vendor routes
router.post("/register", registerVendor);
router.get("/", getAllVendors);
router.get("/:id", getVendorById);
router.get("/profile/:id", getVendorProfile);
router.patch("/:id", updateVendorProfile);
router.post("/request-service/:id", requestService);

module.exports = router;   // ✅ now matches CommonJS
