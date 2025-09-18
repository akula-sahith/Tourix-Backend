import { Schema, model } from "mongoose";
const vendorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    destination : { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    types: {
      type: [String], // approved services
      enum: ["homestay", "guide", "transport", "handicraft"],
      default: [],
    },
    pendingServices: {
      type: [String], // services waiting for admin approval
      enum: ["homestay", "guide", "transport", "handicraft"],
      default: [],
    },
    image: { type: String }, // profile photo/logo
  },
  { timestamps: true }
);

export default model("Vendor", vendorSchema);
