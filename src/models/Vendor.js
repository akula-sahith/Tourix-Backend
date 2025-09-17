import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["homestay", "guide", "transport", "handicraft"],
      required: true,
    },
    verified: {
      type: Boolean,
      default: false, // only admin can set true
    },
    image: {
      type: String, // URL or path to vendor’s image/logo
      default: "https://via.placeholder.com/150", // fallback placeholder
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
