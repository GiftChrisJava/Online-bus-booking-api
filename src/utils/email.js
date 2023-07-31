const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "bed-com-09-19@unima.ac.mw",
    pass: "giftI4CU",
  },
});

const sendWelcomeEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: "bed-com-09-19@unima.ac.mw",
      to: email,
      subject: "Welcome to Simpoft Bus booking System",
      text: "Ticket information will be sent to this email after ticket purchase is done",
    });
  } catch (error) {
    console.error("Error sending Welcome email : ", error);
  }
};

module.exports = { sendWelcomeEmail };
