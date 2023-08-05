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
