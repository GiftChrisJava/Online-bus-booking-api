const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define(
    "seat",
    {
      seatNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return Seat;
};
