const express = require("express");
const institutionAccControler = require("../controller/institutionAccController");
const InstitutionController = require("../controller/institutionController");

const router = express.Router();

router.post("/register", institutionAccControler.createInstitutionAccount);
router.post("/login", institutionAccControler.institutionLogin);
router.post("/request-bus", InstitutionController.requestBus);
router.post("/pay", InstitutionController.processPayment);
router.put("/update", institutionAccControler.updateAccount);

module.exports = router;
