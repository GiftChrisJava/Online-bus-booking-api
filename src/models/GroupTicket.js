// get the super class
const Ticket = require("./Ticket");

module.exports = (sequelize, DataTypes) => {
  const GroupTicket = Ticket.discriminator(
    "groupTicket",
    {
      groupName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      groupSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return GroupTicket;
};
