const TravelerService = require("../service/travelerService");

const travelerController = {
  // create traveller
  createTraveler: async (req, res) => {
    const { email, contact, firstName, lastName } = req.body;
    try {
      const result = await TravelerService.createTraveler(
        email,
        contact,
        firstName,
        lastName
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ traveler: result.traveler });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  },

  // search for a bus
  searchBus: async (req, res) => {
    try {
      const result = await TravelerService.searchBus(req.body);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ bus: result.buses });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  },

  // book a ticket after selecting a seat
  bookTicket: async (req, res) => {
    const { travelerId, busId, seatNumber } = req.params;

    try {
      const result = await TravelerService.bookTicket(
        travelerId,
        busId,
        seatNumber
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({
        message: result.message,
        ticket: result.ticket,
        seat: result.availableSeat,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  },

  // a traveller can cancel a booking
  cancelBooking: async (req, res) => {
    const { email } = req.body;

    try {
      const result = await TravelerService.cancelBooking(email);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ msg: result.msg });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = travelerController;
