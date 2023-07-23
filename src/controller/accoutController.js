const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const entities = require("../models");
const authConfig = require("../config/authConfig");
const UserAccount = entities.Account;
const Traveler = entities.Traveler;
const Admin = entities.Admin;

// generate token admin
const generateToken = (user) => {
  const payload = {
    id: user.id,
    userId: user.id,
    role: user.role,
  };

  return jwt.sign(payload, authConfig.secretKey, { expiresIn: "24h" });
};

// authentication and authorization
const accountController = {
  // register admin
  createAdminAccount: async (req, res) => {
    try {
      // admins account
      let { username, password, role, email } = req.body;

      // check if email is already exists
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        return res.status(409).json({ error: "Email already exists." });
      }

      const admin = await Admin.create({ name: username, email });

      // check if the username is not taken
      const existingUsername = await UserAccount.findOne({ where: { email } });
      if (existingUsername) {
        return res.status(409).json({ error: "username already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      // create an admin accout in the database
      const adminAccount = await UserAccount.create({
        username,
        password: hashedPassword,
        role: admin.role,
        email: admin.email,
      });

      const token = generateToken(adminAccount);

      res.status(201).json({ token, adminAccount });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  },
};
