import Vendor from "../models/vendorModel.js";

// ✅ Get all vendors (for admin dashboard)
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors", error });
  }
};

// ✅ Approve vendor
export const verifyVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.verified = true;
    await vendor.save();

    res.status(200).json({ message: "Vendor verified successfully", vendor });
  } catch (error) {
    res.status(500).json({ message: "Error verifying vendor", error });
  }
};
