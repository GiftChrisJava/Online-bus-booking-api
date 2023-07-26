const { DataTypes } = require("sequelize");

// get the super class
const Traveler = require("./Traveler");

module.exports = (sequelize, DataTypes) => {
  const InstitutionAccount = sequelize.define(
    "institutionaccount",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailOfInstitution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactOfInstitution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeOfInstitution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "traveler",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return InstitutionAccount;
};
