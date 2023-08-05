const SeatService = require("../service/SeatService");

const seatController = {
  // get all seats for a bus
  getBusSeats: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await SeatService.getBusSeats(id);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ seats: result.seats });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  },
};

module.exports = seatController;
