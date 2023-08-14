const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "booking",
    {
      travelerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      busId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      //institution
      institutionEmail: {
        type: DataTypes.STRING,
      },

      institutionId: {
        type: DataTypes.INTEGER,
      },

      // traveler
      travelerEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      travelerContact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      boardBus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      //bus
      route: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      //payment
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Booking;
};
