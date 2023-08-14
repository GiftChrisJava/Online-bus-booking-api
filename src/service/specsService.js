const entities = require("../models");
const Specs = entities.Specs;

// update bus specs
async function updateBusSpecs(busId, busSpecs) {
  try {
    const specs = await Specs.findOne({ where: busId });

    if (!specs) {
      return { error: "Bus has not specifications" };
    }

    // update
    await specs.update(busSpecs);

    return { specs };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get bus specs using busId
async function getBusSpecs(busId) {
  try {
    const specs = await Specs.findOne({ where: busId });

    if (!specs) {
      return { error: "Bus has not specifications" };
    }

    return { specs };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get specs for all buses
async function getAllBusSpecs() {
  try {
    const specs = await Specs.findAll();

    if (!specs) {
      return { error: "Bus has not specifications" };
    }

    return { specs };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

module.exports = {
  updateBusSpecs,
  getAllBusSpecs,
  getBusSpecs,
};
