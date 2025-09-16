import { Schema, model } from "mongoose";

const destinationSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Destination title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Destination description is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    pricePerPerson: {
      type: Number,
      required: [true, "Price per person is required"],
    },
    duration: {
      type: String, // e.g., "3 days 2 nights"
    },
    category: {
      type: String, // e.g., "Adventure", "Beach", "Cultural"
    },
    images: {
      type: [String], // store image URLs
      default: [],
    },
    rating: {
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
  },
  { timestamps: true }
);

export default model("Destination", destinationSchema);
