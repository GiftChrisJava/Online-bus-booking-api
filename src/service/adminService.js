const entities = require("../models");
const email = require("../utils/email");

const Traveler = entities.Traveler;
const Ticket = entities.Ticket;
const Seat = entities.Seat;

// cancel a ticket booking for a traveler
async function cancelBooking(id) {
  try {
    const traveler = await Traveler.findByPk(id);

    if (!traveler) {
      return { error: "Traveler not found." };
    }

    const ticket = await Ticket.findOne({ where: { travelerId: id } });

    if (!ticket) {
      return { error: "Ticket not found." };
    }

    //Mark thr seat associated with the ticket as available
    const seat = await Seat.findOne({
      where: { travelerId: ticket.travelerId },
    });

    if (seat) {
      await seat.update({ isAvailable: true });
    }

    // delete the ticket
    await ticket.destroy();

    return { msg: "Booking canceled successfully" };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get all the traveler who have booked a ticket and paid
async function getTravelersWithPayments() {
  try {
    const travelers = await Traveler.findAll({
      include: [
        {
          model: Ticket,
          include: [{ model: entities.Payment }],
          where: { paidForBookedBus: true },
        },
      ],
    });

    return { travelers };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

async function testThis(travelerId) {
  try {
    const tickets = await Ticket.findAll({
      where: { travelerId: 1 },
      include: [
        { model: entities.Bus, include: [{ model: entities.Location }] },
        { model: Seat },
      ],
    });

    email.sendTicketInformation(tickets, travelerId);

    return { tickets };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get all the traveler who have booked a ticket
// but have did not make any payment
async function getTravelersWithoutPayments() {
  try {
    const travelers = await Traveler.findAll({
      include: [
        {
          model: Ticket,
          where: { paidForBookedBus: false },
        },
      ],
    });

    return { travelers };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

module.exports = {
  getTravelersWithPayments,
  getTravelersWithoutPayments,
  cancelBooking,
  testThis,
};
