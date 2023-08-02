const express = require("express");
const busController = require("../controller/busController");
const adminMiddleware = require("../middleware/AdminMiddleware");
const locationController = require("../controller/locationController");
const router = express.Router();

// controlling the bus
router.post("/bus", busController.createBus);
router.get("/bus/location", busController.getBusLocationDetails);
router.get("/buses", busController.getBuses);
router.get("/bus/:busId", busController.getBus);
router.delete("/bus/:busId", busController.deleteBus);
router.put("/bus/busId", busController.updateBus);

// controlling bus routes
router.post("/route", locationController.createLocation);
router.put("/route/:locationId", locationController.updateBusRoute);
router.delete("/route/:locationId", locationController.deleteBusRoute);
router.get("/routes", locationController.getBusRoutes);
router.get("/locations", locationController.getBusLocations);

module.exports = router;
