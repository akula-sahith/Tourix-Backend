const homestaySchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    roomsAvailable: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: [String], // e.g., ["wifi", "parking", "meals"]
  },
  { timestamps: true }
);

export default mongoose.model("Homestay", homestaySchema);
