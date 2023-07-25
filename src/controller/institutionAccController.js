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
};

module.exports = institutionControler;
