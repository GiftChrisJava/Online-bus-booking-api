const express = require("express");
const busController = require("../controller/busController");
const adminMiddleware = require("../middleware/AdminMiddleware");
const locationController = require("../controller/locationController");
const seatController = require("../controller/seatController");
const adminController = require("../controller/adminController");
const bookingController = require("../controller/bookingController");
const busSpecsController = require("../controller/specsController");
const InstitutionController = require("../controller/institutionController");

const router = express.Router();

// controlling the bus
router.post("/bus", busController.createBus);
router.get("/bus/location/:id", busController.getBusLocationDetails);
router.get("/buses", busController.getBuses);
router.get("/bus/:id", busController.getBus);
router.delete("/bus/:id", busController.deleteBus);
router.put("/bus/:id", busController.updateBus);

// bus specs
router.put("/specs", busSpecsController.updateBusSpecs);
router.get("/specs", busSpecsController.getAllBusSpecs);
router.get("/specs/:busId", busSpecsController.getBusSpecs);

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
router.get("/test/:travelerId", adminController.testThis);

// driver
router.post("/driver", adminController.createBusDriver);
router.delete("/driver", adminController.deleteDriver);
router.get("/drivers", adminController.getDrivers);

// booking
router.get("/history", bookingController.getAllBookingHistory);
router.get("/history/date", bookingController.getBookingHistoryOnDate);
router.get(
  "/history/traveler/email",
  bookingController.getTravelerBookingHistoryOnEmail
);
router.get(
  "/history/traveler/:travelerId",
  bookingController.getTravelerBookingHistoryOnTravelerId
);
router.get("/history/never", bookingController.getBookingHistoryOffBoard);
router.get(
  "/history/institution/email",
  bookingController.getInstitutionBookingHistory
);
router.get(
  "/history/institution/:institutionId",
  bookingController.getInstitutionBookingHistoryOnId
);

// institution
router.get("/institutions", InstitutionController.getInstitutions);
router.get("/institution/:id", InstitutionController.getInstitutionById);

module.exports = router;
