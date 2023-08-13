const express = require("express");
const AccoutController = require("../controller/accoutController");
const driverMiddleware = require("../middleware/DriverMiddleware");
const driverController = require("../controller/driverController");
const router = express.Router();

router.post("/login", driverMiddleware, AccoutController.driverLogin);
router.get("/paid-travelers/:busId", driverController.getTravelerPaid);
router.delete("/cancel/ticket", driverController.cancelTravelerTicket);
router.delete("/clear/seats", driverController.clearSeats);
router.delete("/cancel/unpaid/tickets", driverController.cancelUnpaidTickets);
router.put("/onRoad/:busId", driverController.updateBusOnRoadTrue);
router.put("/offRoad/:busId", driverController.updateBusOnRoadFalse);

module.exports = router;
