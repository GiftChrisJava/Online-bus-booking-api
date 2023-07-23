// get the super class
const Ticket = require("./Ticket");

module.exports = (sequelize, DataTypes) => {
  const GroupTicket = sequelize.define(
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

  GroupTicket.prototype.__proto__ = Ticket.prototype;
  return GroupTicket;
};
