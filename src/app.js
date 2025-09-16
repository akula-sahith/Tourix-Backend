// src/app.js
const express = require("express");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");
const aiRoutes = require("./routes/aiRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const touristRoutes = require("./routes/TouristRoute");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());


app.use("/api", apiRoutes);
app.use("/ai",aiRoutes);
app.use("/tourist",touristRoutes);
app.use("/vendor",vendorRoutes);

// Hello World route
app.get("/", (req, res) => {
  res.send("Hello World from Express + MongoDB 🚀");
});

module.exports = app;
