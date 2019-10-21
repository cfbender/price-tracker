"use strict";
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      url: DataTypes.STRING(2048),
      name: DataTypes.STRING,
      originalPrice: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: DataTypes.STRING,
      currentPrice: DataTypes.STRING,
      lowestPrice: DataTypes.STRING
    },
    {}
  );
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};
