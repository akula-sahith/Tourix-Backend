// src/routes/apiRoutes.js
const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// GET /api/hello
router.get("/hello", apiController.helloWorld);

module.exports = router;
