const express = require("express");
const cors = require("cors");
const app = express();

// get the routes
const accountRoutes = require("./src/routes/account.routes");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/account", accountRoutes);

// define port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`listening @ http://localhost:${PORT}`);
});
