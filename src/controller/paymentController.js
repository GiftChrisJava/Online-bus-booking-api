const PaymentService = require("../service/PaymentService");

const paymentController = {
  processPayment: async (req, res) => {
    try {
      const { paymentData, token } = req.body;

      const result = await PaymentService.processPayment(paymentData, token);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ bus: result.payment });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = paymentController;
