const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define(
    "bus",
    {
      nameOfBus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hasRoute: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
