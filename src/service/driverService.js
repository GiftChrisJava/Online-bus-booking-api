const { where } = require("sequelize");
const entities = require("../models");
const Traveler = entities.Traveler;
const Ticket = entities.Ticket;
const Booking = entities.Booking;
const Seat = entities.Seat;
const Bus = entities.Bus;

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

    // confirm that a traveler bought a bus
    const updatedTraveler = await Traveler.update(
      { boardBus: true },
      { where: { id: existingTicket.travelerId } }
    );

    const booking = await Booking.findOne({
      where: { travelerId: existingTicket.travelerId },
    });

    if (!booking) {
      return { error: "Payment was not made" };
    }

    await booking.update({ boardBus: true });

    return { msg: "Ticket Removed!!", updatedTraveler };
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
    const existingBus = await Bus.findOne({
      where: { id: busId, driverId, onRoad: true },
    });

    if (!existingBus) {
      return { error: "Bus Not availabe or Its not on the road" };
    }

    // destroy all tickets
    const tickets = await Ticket.destroy({
      where: { paidForBookedBus: false, busId },
    });

    return { tickets };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get all the travellers who paid for this bus and on board
async function getTravellerPaid(busId) {
  try {
    // we are talking abou this bus you are driving
    const existingBus = await Bus.findOne({ where: { id: busId } });

    if (!existingBus) {
      return { error: "Bus Not availabe" };
    }

    const travelers = [];

    // find all paid tickets
    const tickets = await Ticket.findAll({
      where: { paidForBookedBus: true, busId },
    });

    tickets.map((ticket) => {
      const traveler = Traveler.findOne({
        where: { id: ticket.travelerId, boardBus: true },
      });
      travelers.push(traveler);
    });

    return { travelers };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// set bus that its onRoad.
async function setBusOnRoad(busId) {
  const id = busId;
  try {
    const existingBus = await Bus.findByPk(id);

    if (!existingBus) {
      return { error: "Bus Not availabe" };
    }

    await existingBus.update({ onRoad: true });

    return { msg: `on the road : ${existingBus.onRoad}` };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

async function setBusOffRoad(busId) {
  const id = busId;
  try {
    const existingBus = await Bus.findByPk(id);

    if (!existingBus) {
      return { error: "Bus Not availabe" };
    }

    await existingBus.update({ onRoad: false });

    return { msg: `on the road : ${existingBus.onRoad}` };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

module.exports = {
  cancelTravelerTicket,
  cancelUnpaidTickets,
  clearSeats,
  getTravellerPaid,
  setBusOnRoad,
  setBusOffRoad,
};
