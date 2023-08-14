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
const InstitutionAccount = require("../models/InstitutionAccount")(
  sequelize,
  DataTypes
);
const Location = require("../models/Location")(sequelize, DataTypes);
const Driver = require("../models/Driver")(sequelize, DataTypes);
const Booking = require("../models/Booking")(sequelize, DataTypes);
const Specs = require("../models/Specs")(sequelize, DataTypes);
// Associations

// a driver can drive multiple buses
Driver.hasMany(Bus, { foreignKey: "driverId" });
Bus.belongsTo(Driver, { foreignKey: "driverId" });

// A traveller has an account
Account.belongsTo(Traveler, { foreignKey: "travelerId" });

// a bus some specific cool features
Specs.belongsTo(Bus, { foreignKey: "busId" });

// admin has an account
Account.belongsTo(Admin, { onDelete: "CASCADE", foreignKey: "adminId" });

InstitutionAccount.belongsTo(Institution, { foreignKey: "institutionId" });

// a traveler can choose multiple seats
Traveler.hasMany(Seat, { foreignKey: "travelerId" });
Seat.belongsTo(Traveler, { foreignKey: "travelerId" });

// Traveler.hasOne(Payment);
Payment.belongsTo(Traveler, { foreignKey: "travelerId" });

// ticket needs to have a seatId
Ticket.belongsTo(Seat, { foreignKey: "seatId" });

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

// A bus has several locations to travel
Location.belongsTo(Bus, { foreignKey: "busId" });
Bus.hasMany(Location, { onDelete: "CASCADE", foreignKey: "busId" });

// A bus has several seats
Seat.belongsTo(Bus, { foreignKey: "busId" });
Bus.hasMany(Seat, { onDelete: "CASCADE", foreignKey: "busId" });

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
db.InstitutionAccount = InstitutionAccount;
db.Location = Location;
db.Driver = Driver;
db.Booking = Booking;
db.Specs = Specs;

// run database
db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done...");
});

module.exports = db;
