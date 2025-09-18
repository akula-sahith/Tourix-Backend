const handicraftSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 1 },
    
    image: { type: String }, // single product image
  },
  { timestamps: true }
);

export default mongoose.model("Handicraft", handicraftSchema);
