const entities = require("../models");
const email = require("../utils/email");
const bcrypt = require("bcryptjs");

const Traveler = entities.Traveler;
const Ticket = entities.Ticket;
const Seat = entities.Seat;
const Driver = entities.Driver;

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

// create a bus driver in the database
async function createBusDriver(username, password) {
  try {
    const existingDriver = await Driver.findOne({
      where: { username, password },
    });

    if (existingDriver) {
      return { error: "Driver with these credentials already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await Driver.create({
      username,
      password: hashedPassword,
    });

    return { driver };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// delete a bus driver
async function deleteDriver(id) {
  try {
    const existingDriver = await Driver.findByPk(id);

    if (!existingDriver) {
      return { error: "Driver with these credentials already exists" };
    }

    await existingDriver.destroy();

    return { msg: "Driver deleted successfully" };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

async function getDriver(id) {
  try {
    const existingDriver = await Driver.findOne({
      where: { id },
      include: [{ model: entities.Bus }],
    });

    if (!existingDriver) {
      return { error: "Driver not found" };
    }

    return { driver: existingDriver };
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

// get drivers
async function getDrivers() {
  try {
    const drivers = await Driver.findAll();

    return { drivers };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// assign driver a bus
async function assignDriverAbus(driverId, busId) {
  try {
    const existingDriver = await Driver.findOne({ where: { id: driverId } });

    if (!existingDriver) {
      return { error: "Driver Not found" };
    }

    const existingBus = await entities.Bus.findOne({ where: { id: busId } });

    if (!existingBus) {
      return { error: "Bus not found" };
    }

    // include driver ID on the bus
    await existingBus.update({ driverId });

    return { existingBus };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

module.exports = {
  assignDriverAbus,
  getTravelersWithPayments,
  getTravelersWithoutPayments,
  cancelBooking,
  testThis,
  createBusDriver,
  deleteDriver,
  getDrivers,
  getDriver,
};
