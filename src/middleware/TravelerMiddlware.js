const travelerMidware = (req, res, next) => {
  if (req.userData && req.userData.role !== "traveler") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
