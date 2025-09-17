import mongoose from "mongoose";

const transportSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    transportType: { type: String, required: true }, // Car, Jeep, Bike, etc.
    rentPerHour: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    image: { type: String },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Tourist", default: null }, // Tourist who booked
  },
  { timestamps: true }
);

export default mongoose.model("Transport", transportSchema);
