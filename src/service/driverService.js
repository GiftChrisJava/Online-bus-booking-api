const entities = require("../models");
const Traveler = entities.Traveler;
const Ticket = entities.Ticket;
const Payment = entities.Payment;
const Seat = entities.Seat;
const Bus = entities.Bus;
const Location = entities.Location;

// cancel a ticket when traveler is on board
async function cancelTravelerTicket(ticketNumber) {
  try {
    // find if the ticket exists
    const existingTicket = await Ticket.findOne({ where: { ticketNumber } });

    if (!existingTicket) {
      return { error: "Ticket Not availabe" };
    }

    // remove ticket
    await existingTicket.destroy();

    return { msg: "Ticket Removed!!" };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// after travel mark the seats as available
async function clearSeats(busId, driverId) {
  try {
    // we are talking abou this bus you are driving
    const existingBus = await Bus.findOne({ where: { id: busId, driverId } });

    if (!existingBus) {
      return { error: "Bus Not availabe" };
    }

    // find all seats with the given busId
    const seats = await Seat.findAll({ where: { busId } });

    const updatedSeats = seats.map((seat) => {
      seat.update({ travelerId: null, isAvailable: true });
    });

    return { updatedSeats };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// cancel all tickets who were not paid for
async function cancelUnpaidTickets(busId, driverId) {
  try {
    // we are talking abou this bus you are driving
    const existingBus = await Bus.findOne({ where: { id: busId, driverId } });

    if (!existingBus) {
      return { error: "Bus Not availabe" };
    }

    // destroy all tickets
    const tickets = await Ticket.destroy({
      where: { paidForBookedBus: false },
    });

    return { tickets };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get all the travellers who paid for this bus
