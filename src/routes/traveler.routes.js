const express = require("express");
const travelerController = require("../controller/travelerController");

const router = express.Router();

router.get("/search", travelerController.searchBus);
router.get(
  "/bookticket/:travelerId/:busId/:seatNumber",
  travelerController.bookTicket
);

module.exports = router;
