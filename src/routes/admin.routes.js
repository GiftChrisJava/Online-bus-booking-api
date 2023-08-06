const express = require("express");
const busController = require("../controller/busController");
const adminMiddleware = require("../middleware/AdminMiddleware");
const locationController = require("../controller/locationController");
const seatController = require("../controller/seatController");
const travelerController = require("../controller/travelerController");
const adminController = require("../controller/adminController");
const router = express.Router();

// controlling the bus
router.post("/bus", busController.createBus);
router.get("/bus/location/:id", busController.getBusLocationDetails);
router.get("/buses", busController.getBuses);
router.get("/bus/:id", busController.getBus);
router.delete("/bus/:id", busController.deleteBus);
router.put("/bus/:id", busController.updateBus);

// controlling bus routes
router.post("/location", locationController.createLocation);
router.put("/location/:id", locationController.updateBusRoute);
router.delete("/location/:id", locationController.deleteBusRoute);
router.get("/routes", locationController.getBusRoutes);
router.get("/locations", locationController.getBusLocations);

// seats
router.get("/seats/:busId", seatController.getBusSeats);

// basic admin duties
router.get("/paid/travelers", adminController.getTravelersWithPayments);
router.get("/unpaid/travelers", adminController.getTravelersWithoutPayments);
router.delete("/cancel-booking/:travelerId", adminController.cancelBooking);

module.exports = router;
