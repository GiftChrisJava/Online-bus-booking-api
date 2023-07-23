// accountService.js (services/accountService.js)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const entities = require("../models");
const UserAccount = entities.Account;
const Admin = entities.Admin;

function generateToken(user) {
  const payload = {
    id: user.id,
    userId: user.id,
    role: user.role,
  };

  return jwt.sign(payload, authConfig.secretKey, { expiresIn: "24h" });
}

async function createAdminAccount(username, password, role, email) {
  try {
    // Check if email is already exists
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return { error: "Email already exists." };
    }

    const admin = await Admin.create({ name: username, email });

    // Check if the username is not taken
    const existingUsername = await UserAccount.findOne({ where: { email } });
    if (existingUsername) {
      return { error: "Username already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    // Create an admin account in the database
    const adminAccount = await UserAccount.create({
      username,
      password: hashedPassword,
      role: admin.role,
      email: admin.email,
      adminId: admin.id,
    });

    const token = this.generateToken(adminAccount);

    return { token, adminAccount };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

module.exports = {
  generateToken,
  createAdminAccount,
};
