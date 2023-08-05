const { Traveler, Ticket, Payment, Seat, Bus } = require("../models");

// traver has to search for a bus
async function searchBus(sourceDestination, targetDestination) {
  try {
    const buses = await Bus.findAll({
      where: {
        departureLocation: sourceDestination,
        destinationLocation: targetDestination,
      },
    });

    if (!buses) {
      return { error: "Bus to the specified location not found" };
    }

    return { buses };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// book a ticket for a traveller
// async function bookTicket
