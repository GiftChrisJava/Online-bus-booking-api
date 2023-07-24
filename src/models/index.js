// get database configurations
const config = require("../config/db");

// acquire sequelize
const { Sequelize, DataTypes } = require("sequelize");

// sequelize object
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// authenticate
sequelize
  .authenticate()
  .then(() => {
    console.log("connected to DB");
  })
  .catch(console.error());

const db = {}; // db object

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Admin = require("../models/Admin")(sequelize, DataTypes);
const Bus = require("../models/Bus")(sequelize, DataTypes);
const GroupTicket = require("../models/GroupTicket")(sequelize, DataTypes);
const Institution = require("../models/Institution")(sequelize, DataTypes);
const Payment = require("../models/Payment")(sequelize, DataTypes);
const Seat = require("../models/seat")(sequelize, DataTypes);
const Ticket = require("../models/Ticket")(sequelize, DataTypes);
const Traveler = require("../models/Traveler")(sequelize, DataTypes);
const Account = require("../models/Account")(sequelize, DataTypes);

// Associations
// A traveller has many accounts
Traveler.hasMany(Account, { onDelete: "CASCADE", foreignKey: "travelerId" });
Account.belongsTo(Traveler, { foreignKey: "travelerId" });

// admin has accounts
Admin.hasMany(Account, { onDelete: "CASCADE", foreignKey: "adminId" });
Account.belongsTo(Admin, { foreignKey: "adminId" });

// a traveler can choose multiple seats
Traveler.belongsToMany(Seat, { through: "travelerseat" });
Seat.belongsToMany(Traveler, { through: "travelerseat" });

// traveller can book many tickets
Traveler.hasMany(Ticket, { onDelete: "CASCADE", foreignKey: "travelerId" });
Ticket.belongsTo(Traveler, { foreignKey: "travelerId" });

// institutions book group tickets
Institution.hasMany(GroupTicket, {
  onDelete: "CASCADE",
  foreignKey: "travelerId",
});
GroupTicket.belongsTo(Institution, { foreignKey: "travelerId" });

// a ticket belongs to a bus
Ticket.belongsTo(Bus, { foreignKey: "busId" });
Bus.hasMany(Ticket, { onDelete: "CASCADE", foreignKey: "busId" });

// A group ticket also belongs to a bus
GroupTicket.belongsTo(Bus, { foreignKey: "busId" });
Bus.hasMany(GroupTicket, { onDelete: "CASCADE", foreignKey: "busId" });

// Payment can be made for one or more tickets
Payment.belongsToMany(Ticket, {
  through: "ticketpayment",
  onDelete: "CASCADE",
});
Ticket.belongsToMany(Payment, {
  through: "ticketpayment",
  onDelete: "CASCADE",
});

// Payment can be made for one or more group tickets
Payment.belongsToMany(GroupTicket, {
  through: "groupticketpayment",
  onDelete: "CASCADE",
});
GroupTicket.belongsToMany(Payment, {
  through: "groupticketpayment",
  onDelete: "CASCADE",
});

db.Admin = Admin;
db.Account = Account;
db.Bus = Bus;
db.GroupTicket = GroupTicket;
db.Institution = Institution;
db.Payment = Payment;
db.Seat = Seat;
db.Ticket = Ticket;
db.Traveler = Traveler;

// run database
db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done...");
});

module.exports = db;
