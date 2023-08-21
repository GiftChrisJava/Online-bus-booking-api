const LocationService = require("../service/locationService");

const locationController = {
  // create location
  createLocation: async (req, res) => {
    try {
      const result = await LocationService.createLocation(req.body);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(201).json({ location: result.location });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // update bus route
  updateBusRoute: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await LocationService.updateRoute(id, req.body);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ location: result.location });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // update location
  updateLocation: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await LocationService.updateLocation(id, req.body);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ location: result.location });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // delete bus route
  deleteBusRoute: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await LocationService.deleteLocation(id);

      if (result.error) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ location: result.location });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get all bus routes
  getBusRoutes: async (req, res) => {
    try {
      const result = await LocationService.getBusRoutes();

      return res.status(200).json({ routes: result.routes });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get all bus locations
  getBusLocations: async (req, res) => {
    try {
      const result = await LocationService.getLocations();

      return res.status(200).json({ routes: result.locations });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = locationController;
