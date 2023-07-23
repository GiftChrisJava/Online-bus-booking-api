const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define(
    "bus",
    {
      nameOfBus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destinationLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      routeToTake: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      NumberOfFreeSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Bus;
};
