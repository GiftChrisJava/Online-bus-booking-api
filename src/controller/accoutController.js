const AccountService = require("../service/accountService");

const AccoutController = {
  createAdminAccount: async (req, res) => {
    const { username, password, role, email } = req.body;

    try {
      const result = await AccountService.createAdminAccount(
        username,
        password,
        role,
        email
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
};

module.exports = AccoutController;
