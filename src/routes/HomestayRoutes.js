import express from "express";
import {
  addHomestay,
  getAllHomestays,
  getHomestaysByLocation,
  updateHomestay,
  deleteHomestay,
} from "../controllers/HomestayController.js";

const router = express.Router();

// Vendor
router.post("/", addHomestay);
router.put("/:id", updateHomestay);
router.delete("/:id", deleteHomestay);

// Tourist
router.get("/", getAllHomestays);
router.get("/location/:location", getHomestaysByLocation);

export default router;
