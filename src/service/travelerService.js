const { Traveler, Ticket, Payment, Seat, Bus } = require("../models");

// Initialize an array to store the generated ticket numbers
const generatedTicketNumbers = [];

console.log(generatedTicketNumbers);
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

const generateTicketNumber = () => {
  let ticketNumber;

  do {
    // generate new ticket
    ticketNumber = Math.floor(Math.random() * 1000).toString();
  } while (generatedTicketNumbers.includes(ticketNumber));

  // add the generated ticket number to the array
  generatedTicketNumbers.push(ticketNumber);

  return ticketNumber;
};

// book for a ticket
async function bookTicket(travelerId, busId) {
  try {
    const traveler = await Traveler.findByPk(travelerId);

    if (!traveler) {
      return { error: "Traveler not found." };
    }

    const bus = await Bus.findByPk(busId);

    if (!bus) {
      return { error: "Bus  not found." };
    }

    // check if seats are available
    const availableSeats = await Seat.findAll({
      where: {
        busId: busId,
        isAvailable: true,
      },
    });

    if (availableSeats.length == 0) {
      return { error: "No available seats for this bus." };
    }

    // select the 1st available seat for booking
    const selectedSeat = availableSeats[0];

    // create a new ticket for the traveler
    const ticket = await Ticket.create({
      ticketNumber: generateTicketNumber(),
      travelerId: travelerId,
      busId: busId,
    });

    // Associate the traveler with the selected seat
    await traveler.addSeat(selectedSeat);

    // Mark the seat as unavailable
    await selectedSeat.update({ isAvailable: false });

    return { message: "Ticket booked successfully.", ticket };
  } catch (error) {
    throw new Error("something went wrong");
  }
}
