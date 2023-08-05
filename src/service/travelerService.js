const entities = require("../models");

const Traveler = entities.Traveler;
const Ticket = entities.Ticket;
const Payment = entities.Payment;
const Seat = entities.Seat;
const Bus = entities.Bus;
const Location = entities.Location;

// Initialize an array to store the generated ticket numbers
const generatedTicketNumbers = [];

console.log(generatedTicketNumbers);
// traver has to search for a bus
async function searchBus(locationData) {
  const destinationLocation = locationData.destinationLocation;
  const sourceLocation = locationData.sourceLocation;
  const departureDate = locationData.departureDate;

  const locations = await Location.findAll({
    where: {
      destinationLocation,
      sourceLocation,
      departureDate,
    },
  });

  const buses = [];

  for (let i = 0; i < locations.length; i++) {
    const id = locations[i].busId;

    const bus = await Bus.findOne({
      where: { id },
      include: [
        {
          model: Location,
          attributes: ["route", "departureTime", "departureDate"],
        },
      ],
    });

    buses.push(bus);
  }

  if (!buses) {
    return { error: "Bus to the specified location not found" };
  }

  return { buses };
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
async function bookTicket(travelerId, busId, seatNumber) {
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
    const availableSeat = await Seat.findOne({
      where: {
        busId: busId,
        isAvailable: true,
        seatNumber: seatNumber,
      },
    });

    // add traveler Id to seat
    await Seat.update({ travelerId: travelerId });

    // create a new ticket for the traveler
    const ticket = await Ticket.create({
      ticketNumber: generateTicketNumber(),
      travelerId: travelerId,
      busId: busId,
    });

    // Associate the traveler with the selected seat
    await traveler.update({ travelerId: travelerId });

    // Mark the seat as unavailable
    await selectedSeat.update({ isAvailable: false });

    return { message: "Ticket booked successfully.", ticket };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

module.exports = {
  searchBus,
  bookTicket,
};
