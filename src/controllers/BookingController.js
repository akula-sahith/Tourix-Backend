const Booking = require("../models/Booking").default;
const Tourist = require("../models/Tourist").default;
const Destination = require("../models/Destination").default;

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { tourist, Destination: destinationId, travelDate, numberOfPeople, totalPrice } = req.body;

    // Optional: validate tourists and destination exist
    const foundDestination = await Destination.findById(destinationId);
    if (!foundDestination) return res.status(404).json({ message: "Destination not found" });

    for (const touristId of tourist) {
      const foundTourist = await Tourist.findById(touristId);
      if (!foundTourist) return res.status(404).json({ message: `Tourist ${touristId} not found` });
    }

    const newBooking = new Booking({
      tourist,
      Destination: destinationId,
      travelDate,
      numberOfPeople,
      totalPrice,
    });

    await newBooking.save();

    // Add this booking to each tourist's bookings array
    for (const touristId of tourist) {
      await Tourist.findByIdAndUpdate(touristId, { $push: { bookings: newBooking._id } });
    }

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tourist", "name email")
      .populate("Destination", "name location");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("tourist", "name email")
      .populate("Destination", "name location");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, paymentStatus },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking updated", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Remove booking from tourists' bookings array
    for (const touristId of booking.tourist) {
      await Tourist.findByIdAndUpdate(touristId, { $pull: { bookings: booking._id } });
    }

    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
