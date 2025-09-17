const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
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
    verified: { type: Boolean, default: false },
    image: { type: String }, // profile photo/logo
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
