const express = require("express");
const cors = require("cors");
const app = express();

// get the routes
const accountRoutes = require("./src/routes/account.routes");
const institutionAccountRoutes = require("./src/routes/institutionAcc.routes");
const adminRoutes = require("./src/routes/admin.routes");
const traverRoutes = require("./src/routes/traveler.routes");
const driverRoutes = require("./src/routes/driver.routes");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/account", accountRoutes);
app.use("/institution", institutionAccountRoutes);
app.use("/admin", adminRoutes);
app.use("/traveler", traverRoutes);
app.use("/driver", driverRoutes);

// define port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`listening @ http://localhost:${PORT}`);
});
