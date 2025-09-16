import { Schema, model } from "mongoose";

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Vendor name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    serviceType: {
      type: String,
      required: [true, "Service type is required"], // e.g., "Guide", "Transport", "Food", "Souvenir Shop"
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    description: {
      type: String,
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: "Destination", // ✅ linked to a particular destination
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        tourist: { type: Schema.Types.ObjectId, ref: "Tourist" },
        comment: String,
        rating: { type: Number, min: 0, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    verified: {
      type: Boolean,
      default: false, // admin can verify vendor
    },
  },
  { timestamps: true }
);

export default model("Service", serviceSchema);