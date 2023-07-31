// accountService.js (services/accountService.js)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const entities = require("../models");
const emailSender = require("../utils/email");

const UserAccount = entities.Account;
const Admin = entities.Admin;
const Traveler = entities.Traveler;

function generateToken(user) {
  const payload = {
    id: user.id,
    userId: user.id,
    role: user.role,
  };

  return jwt.sign(payload, authConfig.secretKey, { expiresIn: "24h" });
}

// create an admin account
async function createAdminAccount(
  password,
  role,
  email,
  contact,
  firstName,
  lastName
) {
  try {
    // Check if email is already exists
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return { error: "Email already exists." };
    }

    const admin = await Admin.create({
      name: firstName + " " + lastName,
      email,
    });

    // Check if the username is not taken
    const existingUsername = await UserAccount.findOne({ where: { email } });
    if (existingUsername) {
      return { error: "Username already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create an admin account in the database
    const adminAccount = await UserAccount.create({
      contact,
      firstName,
      lastName,
      password: hashedPassword,
      role: admin.role,
      email: admin.email,
      adminId: admin.id,
    });

    // send a welcoming email
    await emailSender.sendWelcomeEmail(adminAccount.email);

    const token = this.generateToken(adminAccount);

    return { token, adminAccount };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// create a traveller account
async function createTravelerAccount(
  password,
  role,
  email,
  contact,
  firstName,
  lastName
) {
  try {
    // check if the given email is available
    const existingTraveler = await Traveler.findOne({
      where: { email },
    });

    const hashedPassword = await bcrypt.hash(password, 8);

    // if the email is available then user has posted a form and payment is not fully made and is creating an acount
    if (existingTraveler) {
      // create a traveler account using this travelers id
      const travelerAccount = await UserAccount.create({
        contact,
        firstName,
        lastName,
        password: hashedPassword,
        email,
        role: existingTraveler.role,
        travelerId: existingTraveler.id,
      });

      // update the hasAccount in traveler to be true and save
      await existingTraveler.update({ hasAccount: true });

      const token = generateToken(travelerAccount);

      return { token, travelerAccount };
    }

    // if email is not available then traveler is not in our system
    // create traveller
    const traveler = await Traveler.create({
      contact,
      firstName,
      lastName,
      email,
    });

    // now create the traveler account for this person
    const travelerAccount = await UserAccount.create({
      contact,
      firstName,
      lastName,
      password: hashedPassword,
      email,
      role: traveler.role,
      travelerId: traveler.id,
    });

    // update account status
    await traveler.update({ hasAccount: true });

    // send a welcoming email
    await emailSender.sendWelcomeEmail(travelerAccount.email);

    const token = generateToken(travelerAccount);
    return { token, travelerAccount };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// admin login
async function adminLogin(email, password) {
  try {
    // find the admin account
    const adminAccount = await UserAccount.findOne({
      where: { email },
    });

    if (!adminAccount) {
      return {
        error: "Adminstrator  Not found",
      };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      adminAccount.password
    );

    if (!isPasswordValid) {
      return { error: "Invalid password!!" };
    }

    const token = generateToken(adminAccount);

    return { token, adminAccount };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// traveler login
async function travelerLogin(email, password) {
  try {
    // find traveler with this email
    const travelerAccount = await UserAccount.findOne({ where: { email } });

    if (!travelerAccount) {
      return { error: "Email provided is not registered with our system" };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      travelerAccount.password
    );

    if (!isPasswordValid) {
      return { error: "Invalid password" };
    }

    const token = generateToken(travelerAccount);

    return { token, travelerAccount };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

module.exports = {
  generateToken,
  createAdminAccount,
  createTravelerAccount,
  adminLogin,
  travelerLogin,
};
