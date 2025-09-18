const mongoose = require("mongoose"); // CommonJS

const homestaySchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  stayName: { type: String, required: true },
  rooms: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  pricePerNight: { type: Number, required: true },
  verified: { type: Boolean, default: false },
  location: { type: String, required: true },
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model("Homestay", homestaySchema);
