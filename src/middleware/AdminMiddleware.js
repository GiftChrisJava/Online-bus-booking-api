const AdminMidware = (req, res, next) => {
  if (req.userData && req.userData.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
