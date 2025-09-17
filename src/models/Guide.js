import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  cost: { type: Number, required: true },
  available: { type: Boolean, default: true },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tourist",
    default: null, // when booked, assign tourist ID
  },
}, { timestamps: true });

export default mongoose.model("Guide", guideSchema);
