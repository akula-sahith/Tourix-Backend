const transportSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    transportType: { type: String, required: true }, // Car, Jeep, Bike, etc.
    rentPerHour: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Transport", transportSchema);
