const AccountService = require("../service/accountService");

const AccoutController = {
  createAdminAccount: async (req, res) => {
    const { password, role, email, contact, firstName, lastName } = req.body;

    try {
      const result = await AccountService.createAdminAccount(
        password,
        role,
        email,
        contact,
        firstName,
        lastName
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res
        .status(201)
        .json({ token: result.token, adminAccout: result.adminAccount });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  },

  // create traveler account
  createTravelerAccount: async (req, res) => {
    const { password, role, email, contact, firstName, lastName } = req.body;

    try {
      const result = await AccountService.createTravelerAccount(
        password,
        role,
        email,
        contact,
        firstName,
        lastName
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res
        .status(201)
        .json({ token: result.token, travelerAccount: result.travelerAccount });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  },

  // admin login
  adminLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await AccountService.adminLogin(email, password);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res
        .status(201)
        .json({ token: result.token, adminAccount: result.adminAccount });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // send emails
  sendEmailsToTravelers: async (req, res) => {
    try {
      const result = await AccountService.sendEmails();

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      res.status(200).json({ msg: result.msg });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // traveler login
  travelerLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await AccountService.travelerLogin(email, password);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      res
        .status(201)
        .json({ token: result.token, travelerAccount: result.travelerAccount });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = AccoutController;
