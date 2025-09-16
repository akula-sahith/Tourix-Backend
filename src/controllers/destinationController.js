// controllers/destinationController.js

import Destination from "../models/Destination.js";
import Tourist from "../models/Tourist.js";

// Create new destination
export const createDestination = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      coordinates,
      pricePerPerson,
      duration,
      category,
      images,
    } = req.body;

    const newDestination = new Destination({
      title,
      description,
      location,
      coordinates,
      pricePerPerson,
      duration,
      category,
      images,
    });

    await newDestination.save();
    res.status(201).json({ message: "Destination created successfully", destination: newDestination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all destinations
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().populate("reviews.tourist", "name email");
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get destination by ID
export const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id).populate("reviews.tourist", "name email");
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update destination
export const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDestination = await Destination.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDestination) return res.status(404).json({ message: "Destination not found" });

    res.json({ message: "Destination updated successfully", destination: updatedDestination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete destination
export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDestination = await Destination.findByIdAndDelete(id);
    if (!deletedDestination) return res.status(404).json({ message: "Destination not found" });

    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review to destination
export const addReview = async (req, res) => {
  try {
    const { id } = req.params; // destination id
    const { touristId, comment, rating } = req.body;

    const tourist = await Tourist.findById(touristId);
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    const destination = await Destination.findById(id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const review = {
      tourist: tourist._id,
      comment,
      rating,
    };

    destination.reviews.push(review);

    // Update average rating
    const totalRating = destination.reviews.reduce((acc, r) => acc + r.rating, 0);
    destination.rating = totalRating / destination.reviews.length;

    await destination.save();

    res.json({ message: "Review added successfully", destination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
