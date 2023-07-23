module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "ticket",
    {
      ticketNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paidForBookedBus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Ticket;
};
