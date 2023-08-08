const stripe = require("stripe")(
  "sk_test_51NV9VgFgObjlCeyVdynrz3xEvG3d9bG8UtQs7SKomy6mpX2miMsrYhAgGSVixzSma76jNY06sJ1k6S5HhU69rSVw00rFiAG8O3"
);

const entities = require("../models");
const Payment = entities.Payment;
const Ticket = entities.Ticket;
const Location = entities.Location;

const PaymentService = {
  async processPayment(paymentData, token) {
    const travelerId = paymentData.travelerId;

    try {
      // calculate total payment
      let amount = 0;

      const tickets = await Ticket.findAll({ where: { travelerId } });

      // for each ticket update paidForBookedBus to true
      for (const ticket of tickets) {
        // update
        await ticket.update({ paidForBookedBus: true });

        let busId = ticket.busId;

        // find a location with specified busId
        const location = await Location.findOne({ where: { busId: busId } });
        if (location) {
          amount = amount + location.cost;
        } else {
          console.log("Location not found for the specified busId.");
        }
      }

      // Create a Stripe charge
      const stripeCharge = await stripe.charges.create({
        amount: amount * 100, // Stripe requires amount in cents
        currency: "mwk", // Malawi Kwacha
        source: token,
        description: "Payment for Ticket",
      });

      if (!stripeCharge) {
        return { error: "Stripe charge never happened" };
      }

      // Create a payment record in the database
      const payment = await Payment.create({
        paymentDate: new Date(),
        paymentAmount: amount,
        paymentMethod: "card",
        travelerId: travelerId,
      });

      if (!payment) {
        return { error: "Payment records not created" };
      }

      console.log(tickets);

      return { payment };
    } catch (error) {
      throw new Error("Something went wrong in the code");
    }
  },
};

module.exports = PaymentService;
