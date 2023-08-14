const entities = require("../models");
const Traveler = entities.Traveler;
const Ticket = entities.Ticket;
const Booking = entities.Booking;
const Seat = entities.Seat;
const Bus = entities.Bus;

// get booking history
async function getBookingHistory() {
  try {
    const bookingHistory = await Booking.findAll();

    return { bookingHistory };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get booking history for a particular date
async function getBookingHistoryOnDate(departureDate) {
  try {
    const bookingHistory = await Booking.findAll({ where: { departureDate } });

    return { bookingHistory };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get traveler booking history based on email
async function getTravelerBookingHistoryOnEmail(email) {
  try {
    const bookingHistory = await Booking.findAll({
      where: { travelerEmail: email },
    });

    return { bookingHistory };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get traveler booking history based on travelerId
async function getTravelerBookingHistoryOnTravelerId(travelerId) {
  try {
    const bookingHistory = await Booking.findAll({
      where: { travelerId },
    });

    return { bookingHistory };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get all travelers who booked a bus but did not make it
async function getBookingHistoryOffBoard() {
  try {
    const bookingHistory = await Booking.findAll({
      where: { boardBus: false },
    });

    return { bookingHistory };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get institution bus booking history using institution email
async function getInstitutionBookingHistory(email) {
  try {
    const bookingHistory = await Booking.findAll({
      where: { institutionEmail: email },
    });

    return { bookingHistory };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get institution bus booking history using institution id
async function getInstitutionBookingHistoryOnId(institutionId) {
  try {
    const bookingHistory = await Booking.findAll({
      where: { institutionId },
    });

    return { bookingHistory };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

module.exports = {
  getBookingHistory,
  getBookingHistoryOnDate,
  getTravelerBookingHistoryOnEmail,
  getTravelerBookingHistoryOnTravelerId,
  getBookingHistoryOffBoard,
  getInstitutionBookingHistory,
  getInstitutionBookingHistoryOnId,
};
