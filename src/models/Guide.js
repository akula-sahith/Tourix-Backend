const guideSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    languages: [String], // e.g., ["English", "Hindi", "Santhali"]
    experienceYears: { type: Number, default: 0 },
    chargePerDay: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideSchema);
