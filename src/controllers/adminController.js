// controllers/adminController.js
const ServiceRequest = require("../models/serviceRequest");
const Vendor = require("../models/Vendor");
const Homestay = require("../models/Homestay");
const Transportation = require("../models/Transportation");
const Guide = require("../models/Guide");

// 1. Create a new Service Request// 1. Create a new Service Request (API)
exports.createserviceRequest = async (req, res) => {
  try {
    const { vendorId, serviceId, serviceType } = req.body;

    if (!vendorId || !serviceId || !serviceType) {
      return res.status(400).json({ message: "vendorId, serviceId, and serviceType are required" });
    }

    const newRequest = new ServiceRequest({
      vendorId,
      serviceId,
      serviceType,
      status: "pending",
    });

    await newRequest.save();
    console.log("✅ Service request created for", serviceType);

    res.status(201).json(newRequest);
  } catch (err) {
    console.error("❌ Error creating service request:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// 2. Get all requests (with vendor + service details)
exports.getAllRequests = async (req, res) => {
  console.log("Got request");
  try {
    const requests = await ServiceRequest.find({ status: "pending" })
  .populate("vendorId", "name email phone");

    const enriched = await Promise.all(
      requests.map(async (r) => {
        let serviceDetails = null;

        switch (r.serviceType) {
          case "homestay":
            serviceDetails = await Homestay.findById(r.serviceId);
            break;
          case "transportation":
            serviceDetails = await Transportation.findById(r.serviceId);
            break;
          case "guide":
            serviceDetails = await Guide.findById(r.serviceId);
            break;
        }

        return {
          ...r.toObject(),
          vendor: r.vendorId,
          service: serviceDetails,
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Approve / Reject a request
exports.handleRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // "approve" or "reject"

    const request = await ServiceRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (action === "approve") {
      request.status = "approved";

      if (request.serviceType === "homestay") {
        await Homestay.findByIdAndUpdate(request.serviceId, { verified: true });
      } else if (request.serviceType === "transportation") {
        await Transportation.findByIdAndUpdate(request.serviceId, { verified: true });
      } else if (request.serviceType === "guide") {
        await Guide.findByIdAndUpdate(request.serviceId, { verified: true });
      }
    } else if (action === "reject") {
      request.status = "rejected";
    }

    await request.save();
    res.json({ message: `Request ${action}d successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
