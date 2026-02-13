const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// 1. Create a new service request
// POST /admin/requests
router.post("/create", adminController.createserviceRequest);

// 2. Get all service requests (with vendor + service details)
// GET /admin/requests
router.get("/requests", adminController.getAllRequests);

// 3. Approve / Reject a specific request
// PUT /admin/requests/:requestId
router.put("/requests/:requestId", adminController.handleRequest);

module.exports = router;
