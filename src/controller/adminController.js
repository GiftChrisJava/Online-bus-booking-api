const AdminService = require("../service/adminService");

const adminController = {
  // cancel booking
  cancelBooking: async (req, res) => {
    const { travelerId } = req.params;
    try {
      const result = await AdminService.cancelBooking(travelerId);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ msg: result.msg });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get all the travelers who paid
  getTravelersWithPayments: async (req, res) => {
    try {
      const result = await AdminService.getTravelersWithPayments();

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ travelers: result.travelers });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get all the travelers who have not paid for their ticket
  getTravelersWithoutPayments: async (req, res) => {
    try {
      const result = await AdminService.getTravelersWithoutPayments();

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ travelers: result.travelers });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = adminController;
