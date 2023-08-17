const driverMiddleware = (req, res, next) => {
  if (req.userData && req.userData.role !== "driver") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

module.exports = driverMiddleware;
