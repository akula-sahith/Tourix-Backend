const handicraftSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    craftType: { type: String, required: true }, // pottery, textile, etc.
    price: { type: Number, required: true },
    stock: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Handicraft", handicraftSchema);
