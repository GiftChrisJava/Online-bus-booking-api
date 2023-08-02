const entities = require("../models");
const Bus = entities.Bus;

// create a bus
async function createBus(busData) {
  try {
    busData.NumberOfFreeSeats = busData.capacity;

    const bus = await Bus.create(busData);

    return { bus };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// update bus information
async function updateBusDetails(busId, busDetails) {
  try {
    const bus = await Bus.findByPk(busId);

    if (!bus) {
      return { error: "Bus not found" };
    }

    // update
    await bus.update(busDetails);

    return { bus };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// delete a bus
async function deleteBus(busId) {
  try {
    const bus = await Bus.findByPk(busId);

    if (!bus) {
      return { error: "Bus not found" };
    }

    await bus.destroy();

    return { msg: "Bus removed successfuly" };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get a bus by Id
async function getBus(busId) {
  try {
    const bus = await Bus.findByPk(busId);

    if (!bus) {
      return { error: "Bus not found" };
    }

    return { bus };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get all buses in the system
async function getBuses() {
  try {
    const buses = await Bus.findAll();

    return { buses };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get bus location details
async function getBusLocationDetails(busId) {
  try {
    // find a location with the specified bus Id
    const bus = await findOne({
      where: { busId },
      include: Location,
    });

    if (!bus) {
      return { error: "Bus not found: Location" };
    }

    return { bus };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

module.exports = {
  getBus,
  getBusLocationDetails,
  getBuses,
  deleteBus,
  createBus,
  updateBusDetails,
};
