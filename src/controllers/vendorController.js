import Vendor from "../models/vendorModel.js";

// 📌 Register Vendor
export const registerVendor = async (req, res) => {
  try {
    const { name, email, phone, image } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already registered" });
    }

    const newVendor = new Vendor({
      name,
      email,
      phone,
      image,
    });

    await newVendor.save();

    res.status(201).json({
      message: "Vendor registered successfully, awaiting admin verification",
      vendor: newVendor,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering vendor", error });
  }
};

// 📌 Get all vendors (for dashboard or listing)
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors", error });
  }
};

// 📌 Get vendor by ID
export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendor", error });
  }
};

// 📌 Get logged-in vendor profile (same as getVendorById, but for self)
export const getVendorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendor profile", error });
  }
};

// 📌 Update vendor profile
export const updateVendorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const vendor = await Vendor.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor profile updated", vendor });
  } catch (error) {
    res.status(500).json({ message: "Error updating vendor profile", error });
  }
};

// 📌 Vendor requests a new service (homestay, guide, etc.)
export const requestService = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceType } = req.body;

    const allowedServices = ["homestay", "guide", "transport", "handicraft"];
    if (!allowedServices.includes(serviceType)) {
      return res.status(400).json({ message: "Invalid service type" });
    }

    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Prevent duplicates
    if (vendor.types.includes(serviceType)) {
      return res.status(400).json({ message: "Service already approved" });
    }
    if (vendor.pendingServices.includes(serviceType)) {
      return res.status(400).json({ message: "Service request already pending" });
    }

    vendor.pendingServices.push(serviceType);
    await vendor.save();

    res.status(200).json({
      message: `Service request for ${serviceType} submitted, awaiting admin approval`,
      vendor,
    });
  } catch (error) {
    res.status(500).json({ message: "Error requesting service", error });
  }
};
