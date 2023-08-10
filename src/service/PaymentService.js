const stripe = require("stripe")(
  "sk_test_51NV9VgFgObjlCeyVdynrz3xEvG3d9bG8UtQs7SKomy6mpX2miMsrYhAgGSVixzSma76jNY06sJ1k6S5HhU69rSVw00rFiAG8O3"
);
const email = require("../utils/email");

const entities = require("../models");
const Payment = entities.Payment;
const Ticket = entities.Ticket;
const Location = entities.Location;
const Seat = entities.Seat;
const Bus = entities.Bus;
const Traveler = entities.Traveler;

const PaymentService = {
  async processPayment(paymentData, paymentMethodId) {
    const travelerId = paymentData.travelerId;

    try {
      // calculate total payment
      let amount = 0;

      const tickets = await Ticket.findAll({
        where: { travelerId },
        include: [
          { model: Bus, include: [{ model: Location }] },
          { model: Seat },
        ],
      });

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

      // find a seat and update availability status
      const seats = await Seat.findAll({
        where: { travelerId, isAvailable: true },
      });

      // if available
      if (seats) {
        // Create a Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100, // Stripe requires amount in cents
          currency: "mwk", // Malawi Kwacha
          payment_method: paymentMethodId, // Use paymentMethodId instead of source
          description: "Payment for Ticket",
          confirm: true, // Confirm the payment intent immediately
        });

        if (!paymentIntent) {
          return { error: "Stripe payment intent never happened" };
        }

        // update seats
        const updatedSeats = seats.map((seat) => {
          seat.update({ isAvailable: false });
        });
      } else {
        return {
          error: "Seats have already been taken before you made payment",
        };
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

      const traveler = await Traveler.findOne({ where: { id: travelerId } });

      // send email
      email.sendTicketInformation(tickets, traveler.email);

      return { payment, tickets };
    } catch (error) {
      throw new Error("something went wrong");
    }
  },
};

module.exports = PaymentService;
