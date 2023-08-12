const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Traveler = sequelize.define(
    "traveler",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hasAccount: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "traveler",
      },
      boardBus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Traveler;
};
