const PaymentService = require("../service/PaymentService");
const email = require("../utils/email");

const paymentController = {
  processPayment: async (req, res) => {
    const { paymentData, paymentMethodId } = req.body;

    const result = await PaymentService.processPayment(
      paymentData,
      paymentMethodId
    );

    if (result.error) {
      return res.status(409).json({ error: result.error });
    }

    console.log(result.tickets);
    return res.status(201).json({ bus: result.payment });
  },
};

module.exports = paymentController;
