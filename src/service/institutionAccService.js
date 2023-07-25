const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const entities = require("../models");

const InstitutionAccount = entities.InstitutionAccount;
// const Institution = entities.Institution;

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

    // register an institution
    const institutionAccount = await InstitutionAccount.create({
      name,
      emailOfInstitution,
      contactOfInstitution,
      typeOfInstitution,
      password: hashedPassword,
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

module.exports = {
  createInstitutionAccount,
  login,
};
