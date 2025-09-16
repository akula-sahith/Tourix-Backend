import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    costPerDay: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    location: { type: String, required: true }, // Plain text location
  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideSchema);
