"use strict";
module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.STRING,
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  });
  Example.associate = function(models) {
    // associations can be defined here
  };
  return Example;
};
