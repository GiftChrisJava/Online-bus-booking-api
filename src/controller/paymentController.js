const PaymentService = require("../service/PaymentService");

const paymentController = {
  processPayment: async (req, res) => {
    const { paymentData, token } = req.body;

    // const result = await PaymentService.processPayment(
    //   // cvv,
    //   req.body
    //   // paymentDate
    // );

    const result = await PaymentService.processPayment(paymentData, token);

    if (result.error) {
      return res.status(409).json({ error: result.error });
    }

    return res.status(201).json({ bus: result.payment });
  },
};

module.exports = paymentController;
