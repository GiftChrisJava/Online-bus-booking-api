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
      text: "Thank you for each and every help you offered to me last semi. I appriate you it a lot not matter how small it seemed. AM CODING A BUS BOOKING SYSTEM AND I WANT IT TO BE SENDING EMAILS TO TRAVELERS",
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
      subject: "Hey" + firstName + ", Welcome to Simpoft Bus booking System",
      text: "Thank you for each and every help you offered to me last semi. I appriate you it a lot not matter how small it seemed. AM CODING A BUS BOOKING SYSTEM AND I WANT IT TO BE SENDING EMAILS TO TRAVELERS",
    });
  } catch (error) {
    console.error("Error sending Welcome email : ", error);
  }
};

module.exports = { sendWelcomeEmail, sendMultipleEmails };
