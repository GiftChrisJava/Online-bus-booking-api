// get the super class
const Traveler = require("./Traveler");

module.exports = (sequelize, DataTypes) => {
  const Institution = Traveler.discriminator(
    "institution",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      emailOfInstitution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactOfInstitution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeOfInstitution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Institution;
};
