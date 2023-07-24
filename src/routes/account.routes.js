const express = require("express");
const AccoutController = require("../controller/accoutController");
const router = express.Router();

router.post("/register/admin", AccoutController.createAdminAccount);
router.post("/register/traveler", AccoutController.createAdminAccount);

module.exports = router;
