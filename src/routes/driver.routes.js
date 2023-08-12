const express = require("express");
const AccoutController = require("../controller/accoutController");
const driverMiddleware = require("../middleware/DriverMiddleware");
const router = express.Router();

router.post("/login", driverMiddleware, AccoutController.driverLogin);

module.exports = router;
