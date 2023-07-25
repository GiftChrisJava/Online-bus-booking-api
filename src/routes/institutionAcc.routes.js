const express = require("express");
const institutionControler = require("../controller/institutionAccController");
const router = express.Router();

router.post("/register", institutionControler.createInstitutionAccount);
router.post("/login", institutionControler.institutionLogin);

module.exports = router;
