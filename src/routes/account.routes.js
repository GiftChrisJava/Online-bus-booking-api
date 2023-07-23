const express = require("express");
const AccoutController = require("../controller/accoutController");
const router = express.Router();

router.post("/register", AccoutController.createAdminAccount);

module.exports = router;
