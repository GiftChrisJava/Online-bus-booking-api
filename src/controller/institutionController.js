const institutionService = require("../service/institutionService");

const InstitutionController = {
  // update institution
  updateInstitution: async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const result = await institutionService.updateInstitution(id, updateData);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ institution: result.institution });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get institution by Id
  getInstitutionById: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await institutionService.getInstitutionById(id);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ institution: result.institution });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get institutions
  getInstitutions: async (req, res) => {
    try {
      const result = await institutionService.getInstitutions();

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ institutions: result.institutions });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // provide group travel information
  requestBus: async (req, res) => {
    const travelPlan = req.body;

    try {
      const result = await institutionService.requestBus(travelPlan);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ msg: result.msg });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // process payment and create booking history
  processPayment: async (req, res) => {
    try {
      const { paymentData, paymentMethodId } = req.body;

      const result = await institutionService.processPayment(
        paymentData,
        paymentMethodId
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ msg: result.msg });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = InstitutionController;
