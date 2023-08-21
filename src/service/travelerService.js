const entities = require("../models");

const Traveler = entities.Traveler;
const Ticket = entities.Ticket;
const Seat = entities.Seat;
const Bus = entities.Bus;
const Location = entities.Location;
const emailSender = require("../utils/email");

// Initialize an array to store the generated ticket numbers
const generatedTicketNumbers = [];

function calculateTimeDifference(departureTime) {
  const now = new Date();
  const [hours, minutes] = departureTime.split(":");
  const departure = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );

  console.log("now " + now);
  console.log("depart " + departure);

  const timeDifferenceInMilliseconds = departure - now;
  const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

  return timeDifferenceInHours;
}

// traver has to search for a bus
async function searchBus(locationData) {
  const destinationLocation = locationData.destinationLocation;
  const sourceLocation = locationData.sourceLocation;
  const departureDate = locationData.departureDate;

  try {
    const locations = await Location.findAll({
      where: {
        destinationLocation: destinationLocation,
        sourceLocation: sourceLocation,
        departureDate: departureDate,
      },
    });

    const buses = [];

    for (let i = 0; i < locations.length; i++) {
      const id = locations[i].busId;

      const bus = await Bus.findOne({
        where: { id: id, onRoad: false },
        include: [
          {
            model: Location,
            attributes: ["route", "departureTime", "departureDate"],
          },
        ],
      });

      const timeDifference = calculateTimeDifference(
        locations[i].departureTime
      );
      console.log("Diff " + timeDifference);

      // include buses who have 2hrs or more before departure
      if (timeDifference >= 2) {
        buses.push(bus);
      }
    }

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
      await emailSender.sendWelcomeEmail(traveler.email);

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

// get all travellers
async function getTravelers() {
  try {
    const travelers = await Traveler.findAll();

    return { travelers };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get all travellers with account
async function getTravelersHasAccount() {
  try {
    const travelers = await Traveler.findAll({ where: { hasAccount: true } });

    return { travelers };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get all travellers without account
async function getTravelersHasNoAccount() {
  try {
    const travelers = await Traveler.findAll({ where: { hasAccount: false } });

    return { travelers };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// delete a traveler without account
async function removeTravelerNoAccount(id) {
  try {
    const traveler = await Traveler.findOne({
      where: { id, hasAccount: false },
    });

    if (!traveler) {
      return { error: "Traveler not found." };
    }

    // remove
    await Traveler.destroy();

    return { msg: "Traveler removed" };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

module.exports = {
  searchBus,
  bookTicket,
  createTraveler,
  cancelBooking,
  getTravelers,
  getTravelersHasAccount,
  getTravelersHasNoAccount,
  removeTravelerNoAccount,
};
