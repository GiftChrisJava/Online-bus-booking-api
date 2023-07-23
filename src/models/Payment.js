const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "payment",
    {
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

  return Payment;
};
