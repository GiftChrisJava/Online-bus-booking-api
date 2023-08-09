const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("./env");

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

module.exports = { sendWelcomeEmail, sendMultipleEmails, sendCancelationEmail };
