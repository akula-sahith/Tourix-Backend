import { Schema, model } from "mongoose";

const touristSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    phone: {
      type: String,
    },
    nationality: {
      type: String,
    },
    age: {
      type: Number,
      min: 10,
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking", // will link to Booking model
      },
    ],
  },
  { timestamps: true }
);

export default model("Tourist", touristSchema);
