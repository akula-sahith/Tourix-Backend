const Homestay = require("../models/Homestay");

// Add a new homestay
exports.createHomestay = async (req, res) => {
  try {
    // Collect uploaded image paths
     const imagePaths = req.file ? [req.file.path] : [];

    const homestay = new Homestay({
      ...req.body,
      images: imagePaths,
    });

    await homestay.save();
    res.status(201).json(homestay);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all homestays (optionally filter by location, vendor, verified)
exports.getHomestays = async (req, res) => {
  try {
    const { location, vendorId, verified } = req.query;
    let filter = {};

    if (location) filter.location = new RegExp(location, "i"); // case-insensitive search
    if (vendorId) filter.vendorId = vendorId;
    if (verified !== undefined) filter.verified = verified === "true";

    const homestays = await Homestay.find(filter).populate("vendorId");
    res.json(homestays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single homestay by ID
exports.getHomestayById = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id).populate("vendorId");
    if (!homestay) return res.status(404).json({ message: "Homestay not found" });
    res.json(homestay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update homestay
exports.updateHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!homestay) return res.status(404).json({ message: "Homestay not found" });
    res.json(homestay);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete homestay
exports.deleteHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndDelete(req.params.id);
    if (!homestay) return res.status(404).json({ message: "Homestay not found" });
    res.json({ message: "Homestay deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
