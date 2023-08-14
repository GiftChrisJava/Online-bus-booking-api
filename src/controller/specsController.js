const specsService = require("../service/specsService");

const busSpecsController = {
  // update bus specs
  updateBusSpecs: async (req, res) => {
    const busSpecs = req.body;
    const { busId } = req.params;
    try {
      const result = await specsService.updateBusSpecs(busId, busSpecs);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ specs: result.specs });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get bus specs using busId
  getBusSpecs: async (req, res) => {
    const { busId } = req.params;
    try {
      const result = await specsService.getBusSpecs(busId);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ specs: result.specs });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get specs for all buses
  getAllBusSpecs: async (req, res) => {
    try {
      const result = await specsService.getAllBusSpecs();

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ specs: result.specs });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = busSpecsController;
