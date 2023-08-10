const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("./env");
const entities = require("../models");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

const sendWelcomeEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject: "Welcome to Simpoft Bus booking System",
      text: "Information about the ticket you have booked will be sent to this email. Thank you for choosing us",
    });
  } catch (error) {
    console.error("Error sending Welcome email : ", error);
  }
};

// send ticket booking summary
const sendTicketInformation = async (tickets, travelerId) => {
  const ticketNumbers = tickets.map((ticket) => ticket.ticketNumber).join(", ");
  const seatNumbers = tickets
    .map((ticket) => ticket.seat.seatNumber)
    .join(", ");
  const route = tickets[0].bus.locations[0].route;
  const departureDate = tickets[0].bus.locations[0].departureDate;
  const departureTime = tickets[0].bus.locations[0].departureTime;
  const cost = tickets[0].bus.locations[0].cost;
  const plateNumber = tickets[0].bus.plateNumber;

  // Format the departure date
  const departureDateObj = new Date(departureDate);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDepartureDate = departureDateObj.toLocaleDateString(
    "en-US",
    options
  );

  const traveler = entities.Traveler.findOne({ where: { id: travelerId } });
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: traveler.email,
      subject: "Bus Booking Infomation",
      text:
        `You have booked ${tickets.length} tickets:\n` +
        `Ticket numbers are: ${ticketNumbers} and the seat numbers are ${seatNumbers}.\n` +
        `The bus route is: ${route},\n` +
        `Departure date is: ${formattedDepartureDate},\n` +
        `Departure time is: ${departureTime},\n` +
        `Cost is: Mwk${cost},\n` +
        `Bus number is: ${plateNumber}\n Thank you for choosing SimpSoft Buses`,
    });
  } catch (error) {
    console.error("Error sending Welcome email : ", error);
  }
};
// alert user that the ticket bought has been canceled succesfully.
const sendCancelationEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject: "Cancelation of a Bus Ticket",
      text: "Your ticket has been canceled. Please wait as we process a refund. Email us your account number.",
    });
  } catch (error) {
    console.error("Error sending Welcome email : ", error);
  }
};

const sendMultipleEmails = async (traveler) => {
  const firstName = traveler.firstName;
  const email = traveler.email;
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject: "Hello " + firstName + ", Welcome to Simpoft Bus booking System",
      text: "Last test!!",
    });
  } catch (error) {
    console.error("Error sending Welcome email : ", error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendMultipleEmails,
  sendCancelationEmail,
  sendTicketInformation,
};
