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
};

module.exports = AccoutController;
