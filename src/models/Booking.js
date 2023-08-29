const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "booking",
    {
      travelerId: {
        type: DataTypes.INTEGER,
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
      contactOfInstitution: {
        type: DataTypes.STRING,
      },

      // traveler
      travelerEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      travelerContact: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.STRING,
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
