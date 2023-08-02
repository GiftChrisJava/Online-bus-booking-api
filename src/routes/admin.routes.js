const express = require("express");
const busController = require("../controller/busController");
const adminMiddleware = require("../middleware/AdminMiddleware");
const router = express.Router();

// controlling the bus
router.post("/bus", busController.createBus);
router.get("/bus/location", busController.getBusLocationDetails);
router.get("/buses", busController.getBuses);
router.get("/bus/:busId", busController.getBus);
router.delete("/bus/:busId", busController.deleteBus);
router.put("/bus/busId", busController.updateBus);

module.exports = router;
