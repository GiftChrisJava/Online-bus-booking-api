const moment = require("moment/moment");
const entities = require("../models");

const Traveler = entities.Traveler;
const Ticket = entities.Ticket;
const Payment = entities.Payment;
const Seat = entities.Seat;
const Bus = entities.Bus;
const Location = entities.Location;
const emailSender = require("../utils/email");

// Initialize an array to store the generated ticket numbers
const generatedTicketNumbers = [];

// traver has to search for a bus
async function searchBus(locationData) {
  const destinationLocation = locationData.destinationLocation;
  const sourceLocation = locationData.sourceLocation;
  const departureDate = locationData.departureDate;

  // function to calculate time difference in hours
  function calculateTimeDifference(departureTime) {
    const departure = moment(departureTime, "HH:mm");
    return departure.diff(moment.now, "hours");
  }

  const locations = await Location.findAll({
    where: {
      destinationLocation,
      sourceLocation,
      departureDate,
    },
  });

  const currentTime = moment(); // Get the current time
  console.log(currentTime);

  const buses = [];

  for (let i = 0; i < locations.length; i++) {
    const id = locations[i].busId;

    const bus = await Bus.findOne({
      where: { id, onRoad: false },
      include: [
        {
          model: Location,
          attributes: ["route", "departureTime", "departureDate"],
        },
      ],
    });

    const timeDifference = calculateTimeDifference(bus.Location.departureTime);

    // check if the time difference between depature time and current time is 2hrs
    if (timeDifference >= 2) {
      buses.push(bus);
    }
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

    if (!availableSeat) {
      return { error: "Seat already taken." };
    }

    // add traveler Id to seat
    await availableSeat.update({ travelerId: travelerId });

    // create a new ticket for the traveler
    const ticket = await Ticket.create({
      ticketNumber: generateTicketNumber(),
      travelerId: travelerId,
      busId: busId,
      seatId: availableSeat.id,
    });

    if (availableSeat.travelerId) {
      // Associate the traveler with the selected seat
      await traveler.update({ travelerId: travelerId });
    } else {
      return { error: "Seat already taken." };
    }

    return { message: "Ticket booked successfully.", ticket, availableSeat };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// create a traveller without account
async function createTraveler(email, contact, firstName, lastName) {
  try {
    // check if the given email is available
    const existingTraveler = await Traveler.findOne({
      where: { email },
    });

    // if the email is available then user has posted a form and payment is not fully made and is creating an acount
    if (!existingTraveler) {
      // if email is not available then traveler is not in our system
      // create traveller
      const traveler = await Traveler.create({
        contact,
        firstName,
        lastName,
        email,
      });

      // send a welcoming email
      await emailSender.sendWelcomeEmail(travelerAccount.email);

      return { traveler };
    }

    return { existingTraveler };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// cancel a ticket booking for a traveler
async function cancelBooking(email) {
  try {
    const traveler = await Traveler.findOne({ where: { email } });

    if (!traveler) {
      return { error: "Traveler not found." };
    }

    const ticket = await Ticket.findOne({ where: { travelerId: id } });

    if (!ticket) {
      return { error: "Ticket not found." };
    }

    //Mark the seat associated with the ticket as available
    const seat = await Seat.findOne({
      where: { travelerId: ticket.travelerId },
    });

    if (seat) {
      await seat.update({ isAvailable: true });
    }

    // delete the ticket
    await ticket.destroy();

    // send email about the cancelation
    await emailSender.sendCancelationEmail(travelerAccount.email);

    return { msg: "Booking canceled successfully" };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

module.exports = {
  searchBus,
  bookTicket,
  createTraveler,
  cancelBooking,
};
