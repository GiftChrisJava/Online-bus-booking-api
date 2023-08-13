const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define(
    "bus",
    {
      plateNumber: {
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
        allowNull: true,
      },
      onRoad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Bus;
};
