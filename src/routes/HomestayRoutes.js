const express = require("express");
const router = express.Router();
const homestayController = require("../controllers/homestayController");
const upload = require("../middlewares/upload");

// 📌 Create homestay with multiple images
router.post("/create", upload.single("images"), homestayController.createHomestay);

// Other routes
router.get("/", homestayController.getHomestays);
router.get("/:id", homestayController.getHomestayById);
router.put("/:id", homestayController.updateHomestay);
router.delete("/:id", homestayController.deleteHomestay);

module.exports = router;
