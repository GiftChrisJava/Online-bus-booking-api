const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    "driver",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "driver",
      },
    },
    {
      timestamps: false,
    }
  );

  return Driver;
};
