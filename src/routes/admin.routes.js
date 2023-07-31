const express = require("express");
const busController = require("../controller/busController");
const adminMiddleware = require("../middleware/AdminMiddleware");
const router = express.Router();

// controlling the bus
router.post("/bus", adminMiddleware, busController.createBus);
