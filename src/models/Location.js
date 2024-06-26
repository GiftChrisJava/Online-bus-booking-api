const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "location",
    {
      destinationLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      through: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      sourceLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hoursToDestination: {
        type: DataTypes.INTEGER,
      },
      departureTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      route: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );

  return Location;
};
