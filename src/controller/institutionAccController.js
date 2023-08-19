const InstitutionService = require("../service/institutionAccService");

const institutionControler = {
  // create institution account
  createInstitutionAccount: async (req, res) => {
    const {
      name,
      role,
      emailOfInstitution,
      contactOfInstitution,
      typeOfInstitution,
      password,
    } = req.body;

    try {
      const result = await InstitutionService.createInstitutionAccount(
        name,
        role,
        emailOfInstitution,
        contactOfInstitution,
        typeOfInstitution,
        password
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({
        token: result.token,
        institutionAccount: result.institutionAccount,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // log in
  institutionLogin: async (req, res) => {
    const { emailOfInstitution, password } = req.body;

    try {
      const result = await InstitutionService.login(
        emailOfInstitution,
        password
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({
        token: result.token,
        institutionAccount: result.institutionAccount,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // get account by email
  getInstitutionByEmail: async (req, res) => {
    const { emailOfInstitution } = req.body;

    try {
      const result = await InstitutionService.getInstitutionByEmail(
        emailOfInstitution
      );

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({
        institutionAccount: result.institutionAccount,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // get institution accounts
  getInstitutions: async (req, res) => {
    try {
      const result = await InstitutionService.getInstitutions();

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({
        institutionAccounts: result.institutionAccounts,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // delete account
  removeAccount: async (req, res) => {
    const { emailOfInstitution } = req.body;

    try {
      const result = await InstitutionService.removeAccount(emailOfInstitution);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({
        msg: result.msg,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // update account
  updateAccount: async (req, res) => {
    const { updateData } = req.body;
    const { id } = req.params;

    try {
      const result = await InstitutionService.updateAccount(id, updateData);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({
        institutionAccount: result.institutionAccount,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = institutionControler;
