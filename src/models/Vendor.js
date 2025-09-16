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
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination", // link to the destination where they operate
      required: true,
    },
    verified: {
      type: Boolean,
      default: false, // only admin can set true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
