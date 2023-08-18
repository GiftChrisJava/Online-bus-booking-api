const BusService = require("../service/busService");

const busController = {
  // create a bus
  createBus: async (req, res) => {
    try {
      const result = await BusService.createBus(req.body);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ bus: result.bus });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // update bus details
  updateBus: async (req, res) => {
    const busDetails = req.body;
    const { id } = req.params;

    try {
      const result = await BusService.updateBusDetails(id, busDetails);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ bus: result.bus });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // delete bus
  deleteBus: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await BusService.deleteBus(id);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ msg: result.msg });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get bus by id
  getBus: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await BusService.getBus(id);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ bus: result.bus, specs: result.specs });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get buses
  getBuses: async (req, res) => {
    try {
      const result = await BusService.getBuses();

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ buses: result.buses });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getBusLocationDetails: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await BusService.getBusLocationDetails(id);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ bus: result.bus });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = busController;
