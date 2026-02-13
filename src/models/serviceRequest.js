// models/ServiceRequest.js
const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  serviceType: { type: String, enum: ["homestay", "transportation", "guide"], required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
