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
const sendTicketInformation = async (tickets, email) => {
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

  try {
    await transporter.sendMail({
      from: EMAIL,
      //to: email,
      to: "bed-com-09-19@unima.ac.mw",
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

// send email to admin
const emailAdmin = async (email) => {
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: "bed-com-09-19@unima.ac.mw",
      subject: `Bus Request By : ${email}`,
      text: "A request to book a group ticket \n" + email,
    });
  } catch (error) {
    console.error("Error sending Welcome email : ", error);
  }
};

// send an email to a company
const sendCompanyWelcomeEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: EMAIL,
      //to: email,
      to: "chrisjava77@gmail.com",
      subject: "Thank you for choosing Simpoft Bus booking System",
      text: "Your request for a bus has been received. We will send you an email in less than 3 hrs. Information about the ticket you have booked will be sent to this email. Thank you for choosing us",
    });

    emailAdmin(email);
  } catch (error) {
    console.error("Error sending Welcome email : ", error);
  }
};

// send group ticket info
const sendGroupTicketInformation = async (
  groupTicket,
  emailOfInstitution,
  bus,
  institution
) => {
  // Format the departure date
  const departureDateObj = new Date(institution.departureDate);
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
  try {
    await transporter.sendMail({
      from: EMAIL,
      // to: emailOfInstitution,
      to: "chrisjava77@gmail.com",

      subject: "Bus Booking Infomation",
      text:
        `You have booked a group ticket for ${groupTicket.groupSize} people\n` +
        `GroupTicket number Is: ${groupTicket.id}.\n` +
        `The bus route is: ${institution.route},\n` +
        `Departure date is: ${formattedDepartureDate},\n` +
        `Bus company is: ${bus.company},\n` +
        `Bus number is: ${bus.plateNumber}\n Thank you for choosing SimpSoft Buses`,
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
  sendGroupTicketInformation,
  sendCompanyWelcomeEmail,
};
