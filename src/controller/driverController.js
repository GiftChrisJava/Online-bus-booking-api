const driverService = require("../service/driverService");

const driverController = {
  //get travelers who paid
  getTravelerPaid: async (req, res) => {
    const { busId } = req.params;

    try {
      const result = await driverService.getTravellerPaid(busId);

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
    const { ticketNumber, departureDate } = req.body;
    try {
      const result = await driverService.cancelTravelerTicket(
        ticketNumber,
        departureDate
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ msg: result.msg, booking: result.booking });
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

  // cancel all unpaid tickets if the bus in onRoad
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

  // update bus on road
  updateBusOnRoadTrue: async (req, res) => {
    const { busId } = req.params;

    try {
      const result = await driverService.setBusOnRoad(busId);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ msg: result.msg });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // update bus off road
  updateBusOnRoadFalse: async (req, res) => {
    const { busId } = req.params;

    try {
      const result = await driverService.setBusOffRoad(busId);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ msg: result.msg });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // update institution took bus
  updateInstitutionOnBoard: async (req, res) => {
    const { groupTicketId, departureDate } = req.body;
    try {
      const result = await driverService.updateInstitution(
        groupTicketId,
        departureDate
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ bookings: result.bookings });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // driver has to set update seat
  updateSeat: async (req, res) => {
    const { busId, seatNumber } = req.body;

    try {
      const result = await driverService.updateSeat(busId, seatNumber);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ existingSeat: result.existingSeat });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = driverController;
