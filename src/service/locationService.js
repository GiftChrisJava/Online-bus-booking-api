const entities = require("../models");
const Location = entities.Location;
const Bus = entities.Bus;

// add bus travelling details
async function createLocation(routeData) {
  let sourceLocation = routeData.sourceLocation;
  let destinationLocation = routeData.destinationLocation;
  let through = routeData.through;
  let departureDate = routeData.departureDate;
  let hoursToDestination = routeData.hoursToDestination;
  let departureTime = routeData.departureTime;
  let cost = routeData.cost;
  let route = "";
  let busId = routeData.busId;

  try {
    // check if details exist already exist
    const existingLocation = await Location.findOne({
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
    const bus = await Bus.findOne(id);

    if (!bus) {
      return { error: "Invalid busId, Bus not found" };
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
async function updateLocation(id, locationDetails) {
  try {
    const location = await Location.findByPk(id);

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
async function deleteLocation(id) {
  try {
    const location = await Location.findByPk(id);

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
