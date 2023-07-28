const entities = require("../models");
const Bus = entities.Bus;

// create a bus
async function createBus(nameOfBus, capacity) {
  try {
    const bus = await Bus.create({
      nameOfBus,
      capacity,
      NumberOfFreeSeats: capacity,
    });

    return bus;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// update bus information
async function updateBusDetails(busId, busDetails) {
  try {
    const bus = await Bus.findByPk(busId);

    if (!bus) {
      throw new Error("Bus not found");
    }

    // update
    await bus.update(busDetails);

    return bus;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// delete a bus
async function deleteBus(busId) {
  try {
    const bus = await Bus.findByPk(busId);

    if (!bus) {
      throw new Error("Bus not found");
    }

    await bus.destroy();

    return "Bus removed successfuly";
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get a bus by Id
async function getBus(busId) {
  try {
    const bus = await Bus.findByPk(busId);

    if (!bus) {
      throw new Error("Bus not found");
    }

    return bus;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get all buses in the system
async function getBuses() {
  try {
    const buses = await Bus.findAll();

    return courses;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
