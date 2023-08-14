const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Specs = sequelize.define(
    "specs",
    {
      wifi: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      usbCharger: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      refreshments: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      screen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      airCondititioning: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      other: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Specs;
};
