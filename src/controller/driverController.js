const driverService = require("../service/driverService");

const driverController = {
  //get travelers who paid
  getTravelerPaid: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await driverService.getTravellerPaid(id);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ travelers: result.travelers });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // cancel one ticket
  cancelTravelerTicket: async (req, res) => {
    const { ticketNumber } = req.body;
    try {
      const result = await driverService.cancelTravelerTicket(ticketNumber);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res
        .status(200)
        .json({ msg: result.msg, traveler: result.updatedTraveler });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // mark seats as available after
  clearSeats: async (req, res) => {
    const { busId, driverId } = req.body;

    try {
      const result = await driverService.clearSeats(busId, driverId);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ updatedSeats: result.updatedSeats });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // cancel all unpaid tickets
  cancelUnpaidTickets: async (req, res) => {
    const { busId, driverId } = req.body;

    try {
      const result = await driverService.cancelUnpaidTickets(busId, driverId);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ tickets: result.tickets });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = driverController;
