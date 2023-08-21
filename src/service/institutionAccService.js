const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const entities = require("../models");

const InstitutionAccount = entities.InstitutionAccount;
const Institution = entities.Institution;

// token generator
function generateToken(institution) {
  const payload = {
    id: institution.id,
    userId: institution.id,
    role: institution.role,
  };

  return jwt.sign(payload, authConfig.secretKey, { expiresIn: "24h" });
}

// register an institution
async function createInstitutionAccount(
  name,
  role,
  emailOfInstitution,
  contactOfInstitution,
  typeOfInstitution,
  password
) {
  try {
    // check if the email already exists
    const existingInstitutionAccount = await InstitutionAccount.findOne({
      where: { emailOfInstitution },
    });

    if (existingInstitutionAccount) {
      return { error: "Institution already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    // create an institution
    const institution = await entities.Institution.create({
      name,
      emailOfInstitution,
      contactOfInstitution,
      typeOfInstitution,
    });

    // register an institution
    const institutionAccount = await InstitutionAccount.create({
      name,
      emailOfInstitution,
      contactOfInstitution,
      typeOfInstitution,
      password: hashedPassword,
      institutionId: institution.id,
    });

    const token = generateToken(institutionAccount);

    return { token, institutionAccount };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// institution login
async function login(emailOfInstitution, password) {
  try {
    const institutionAccount = await InstitutionAccount.findOne({
      where: { emailOfInstitution },
    });

    if (!institutionAccount) {
      return { error: "email not found. Account does not exist" };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      institutionAccount.password
    );

    if (!isPasswordValid) {
      return { error: "Invalid password!!" };
    }

    const token = generateToken(institutionAccount);

    return { token, institutionAccount };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// update account
async function updateAccount(id, updateData) {
  try {
    const institutionAccount = await InstitutionAccount.findByPk(id);

    if (!institutionAccount) {
      return { error: "Account does not exist" };
    }

    let emailOfInstitution = institutionAccount.emailOfInstitution;

    const institution = await Institution.findOne({
      where: { emailOfInstitution },
    });

    // update
    await institutionAccount.update(updateData);
    await institution.update(updateData);

    return { institutionAccount: institutionAccount };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// delete account
async function removeAccount(emailOfInstitution) {
  try {
    const institutionAccount = await InstitutionAccount.findOne({
      where: { emailOfInstitution },
    });

    if (!institutionAccount) {
      return { error: "email not found. Account does not exist" };
    }

    const institution = await Institution.findOne({
      where: { emailOfInstitution },
    });

    // remove
    await institutionAccount.destroy();
    await institution.destroy();

    return { msg: "account removed" };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get accounts
async function getInstitutions() {
  try {
    const institutionAccounts = await InstitutionAccount.findAll();

    return { institutionAccounts };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

// get account by email
async function getInstitutionByEmail(emailOfInstitution) {
  try {
    const institutionAccount = await InstitutionAccount.findOne({
      where: { emailOfInstitution },
    });

    if (!institutionAccount) {
      return { error: "email not found. Account does not exist" };
    }

    return { institutionAccount };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

module.exports = {
  createInstitutionAccount,
  login,
  getInstitutionByEmail,
  removeAccount,
  updateAccount,
  getInstitutions,
};
