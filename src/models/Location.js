const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "location",
    {
      sourceLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destinationLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      through: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      departureDate: {
        type: DataTypes.DATE,
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
