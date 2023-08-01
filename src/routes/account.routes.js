const express = require("express");
const AccoutController = require("../controller/accoutController");
const router = express.Router();

router.post("/register/admin", AccoutController.createAdminAccount);
router.post("/register/traveler", AccoutController.createTravelerAccount);
router.post("/login/admin", AccoutController.adminLogin);
router.post("/login/traveler", AccoutController.travelerLogin);
router.get("/send/emails", AccoutController.sendEmailsToTravelers);
module.exports = router;
