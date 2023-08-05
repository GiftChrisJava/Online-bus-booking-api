const entities = require("../models");
const Bus = entities.Bus;
const Seat = entities.Seat;

// get all the seats belonging to a particular bus

async function getBusSeats(id) {
  try {
    const bus = await Bus.findByPk(id);

    if (!bus) {
      return { error: "Bus Not found" };
    }

    const seats = await Seat.findAll({
      where: {
        busId: bus.id,
      },
    });

    return { seats };
  } catch (error) {
    throw new Error("something went wrong");
  }
}

module.exports = { getBusSeats };
