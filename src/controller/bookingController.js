const bookingService = require("../service/BookingService");

const bookingController = {
  // get booking history
  getAllBookingHistory: async (req, res) => {
    try {
      const result = await bookingService.getBookingHistory();

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ bookingHistory: result.bookingHistory });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get booking history for a particular date
  getBookingHistoryOnDate: async (req, res) => {
    const { departureDate } = req.body;
    try {
      const result = await bookingService.getBookingHistoryOnDate(
        departureDate
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ bookingHistory: result.bookingHistory });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get traveler booking history based on email
  getTravelerBookingHistoryOnEmail: async (req, res) => {
    const { email } = req.body;
    try {
      const result = await bookingService.getTravelerBookingHistoryOnEmail(
        email
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ bookingHistory: result.bookingHistory });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get traveler booking history based on travelerId
  getTravelerBookingHistoryOnTravelerId: async (req, res) => {
    const { travelerId } = req.params;
    try {
      const result = await bookingService.getTravelerBookingHistoryOnTravelerId(
        travelerId
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ bookingHistory: result.bookingHistory });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get all travelers who booked a bus but did not make it
  getBookingHistoryOffBoard: async (req, res) => {
    try {
      const result = await bookingService.getBookingHistoryOffBoard();

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ bookingHistory: result.bookingHistory });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get institution bus booking history using institution email
  getInstitutionBookingHistory: async (req, res) => {
    const { email } = req.body;
    try {
      const result = await bookingService.getInstitutionBookingHistory(email);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ bookingHistory: result.bookingHistory });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get institution bus booking history using institution id
  getInstitutionBookingHistoryOnId: async (req, res) => {
    const { institutionId } = req.params;
    try {
      const result = await bookingService.getInstitutionBookingHistoryOnId(
        institutionId
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ bookingHistory: result.bookingHistory });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = bookingController;
