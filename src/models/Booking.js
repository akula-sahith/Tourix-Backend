
const bookingSchema = new mongoose.Schema(
  {
    tourist:  [ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tourist",
      required: true,
    }, ],
    Destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination", 
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);