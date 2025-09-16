import Tourist from "../models/Tourist.js";
import bcrypt from "bcryptjs";

// Register new tourist
export const registerTourist = async (req, res) => {
  try {
    const { name, email, password, phone, nationality, age } = req.body;

    // Check if email exists
    const existingTourist = await Tourist.findOne({ email });
    if (existingTourist) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create tourist
    const newTourist = new Tourist({
      name,
      email,
      password: hashedPassword,
      phone,
      nationality,
      age,
    });

    await newTourist.save();
    res.status(201).json({ message: "Tourist registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login tourist (no token)
export const loginTourist = async (req, res) => {
  try {
    const { email, password } = req.body;

    const tourist = await Tourist.findOne({ email });
    if (!tourist) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, tourist.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.json({
      message: "Login successful",
      tourist: {
        id: tourist._id,
        name: tourist.name,
        email: tourist.email,
        phone: tourist.phone,
        nationality: tourist.nationality,
        age: tourist.age,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tourists
export const getAllTourists = async (req, res) => {
  try {
    const tourists = await Tourist.find();
    res.json(tourists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tourist details by ID (for profile)
export const getTouristById = async (req, res) => {
  try {
    const { id } = req.params;

    const tourist = await Tourist.findById(id).populate("bookings");
    if (!tourist) return res.status(404).json({ message: "Tourist not found" });

    // Return profile-ready data
    res.json({
      id: tourist._id,
      name: tourist.name,
      email: tourist.email,
      phone: tourist.phone,
      nationality: tourist.nationality,
      age: tourist.age,
      bookings: tourist.bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
