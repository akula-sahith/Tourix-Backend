const homestaySchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    stayName: { type: String, required: true },
    rooms: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    pricePerNight: { type: Number, required: true },
    images: [String], // upload image URLs
  },
  { timestamps: true }
);

export default mongoose.model("Homestay", homestaySchema);
