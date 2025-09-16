const guideSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    costPerDay: { type: Number, required: true },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideSchema);
