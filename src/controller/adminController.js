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

  // create bus traveler
  createBusTraver: async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await AdminService.createBusDriver(username, password);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ driver: result.driver });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // delete a driver
  deleteDriver: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await AdminService.deleteDriver(id);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ msg: result.msg });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  testThis: async (req, res) => {
    const { travelerId } = req.params;
    try {
      const result = await AdminService.testThis(travelerId);

      return res.status(200).json({ tickets: result.tickets });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = adminController;
