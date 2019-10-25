"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING(2048)
      },
      name: {
        type: Sequelize.STRING
      },
      originalPrice: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      currentPrice: {
        type: Sequelize.STRING
      },
      lowestPrice: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Items");
  }
};
