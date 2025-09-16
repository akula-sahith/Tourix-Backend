// controllers/vendorController.js
const Vendor = require("../models/Vendor").default;

// Register new vendor
exports.registerVendor = async (req, res) => {
  try {
    const { name, email, phone, type, destination } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newVendor = new Vendor({
      name,
      email,
      phone,
      type,
      destination,
    });

    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("destination", "title location");
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vendor details by ID
exports.getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id).populate("destination", "title location");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
