const { DataTypes } = require("sequelize");

// get the super class
const Traveler = require("./Traveler");

module.exports = (sequelize, DataTypes) => {
  const Institution = sequelize.define(
    "institution",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberOfPeople: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      route: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      departureDate: {
        type: DataTypes.STRING,
      },
      busId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  // Institution.prototype.__proto__ = Traveler.prototype;

  return Institution;
};
