// src/app.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");
const aiRoutes = require("./routes/aiRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const touristRoutes = require("./routes/TouristRoute");
const destRoutes = require("./routes/destinationRoutes");
const homeRoutes = require("./routes/HomestayRoutes");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());


app.use("/api", apiRoutes);
app.use("/ai",aiRoutes);
app.use("/tourist",touristRoutes);
app.use("/vendor",vendorRoutes);
app.use("/homestay",homeRoutes);
app.use("/destination",destRoutes);

// Hello World route
app.get("/", (req, res) => {
  res.send("Hello World from Express + MongoDB 🚀");
});

module.exports = app;
