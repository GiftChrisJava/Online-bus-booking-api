const entities = require("../models");
const Location = entities.Location;

// add bus travelling details
async function createLocation(
  sourceLocation,
  destinationLocation,
  through,
  departureDate,
  hoursToDestination,
  departureTime,
  cost,
  route,
  busId
) {
  try {
    // check if details exist already exist
    const existingLocation = await findOne({
      where: {
        sourceLocation,
        destinationLocation,
        through,
        departureDate,
        hoursToDestination,
        departureTime,
        cost,
      },
    });

    if (existingLocation) {
      return { error: "Location already exists" };
    }

    // create location
    const location = await Location.create({
      sourceLocation,
      destinationLocation,
      through,
      departureDate,
      hoursToDestination,
      departureTime,
      cost,
      route:
        sourceLocation + " to " + destinationLocation + " through " + through,
      busId,
    });

    // find a bus using the specified bus Id
    const bus = await findByPk(busId);

    if (!bus) {
      return { error: "Invalid busId, Bus nor found" };
    }

    await bus.update({ hasRoute: true });

    return { location };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get bus travel details
async function getBusRoutes() {
  try {
    const routes = await Location.findAll({
      attributes: ["route", "cost"],
    });

    return { routes };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// update bus route and cost
async function updateLocation(locationId, locationDetails) {
  try {
    const location = await Location.findByPk(locationId);

    if (!location) {
      return { error: "location not found" };
    }

    await location.update(locationDetails);

    await location.update({
      route:
        locationDetails.sourceLocation +
        " to " +
        locationDetails.destinationLocation +
        " through " +
        locationDetails.through,
    });

    return { location };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// get all the locations
async function getLocations() {
  try {
    const locations = await Location.findAll();

    return { locations };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

// delete a location
async function deleteLocation(locationId) {
  try {
    const location = await Location.findByPk(locationId);

    if (!location) {
      return { error: "Location not found" };
    }

    // delete
    await location.destroy();

    return { location };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

module.exports = {
  createLocation,
  updateLocation,
  getBusRoutes,
  getLocations,
  deleteLocation,
};
