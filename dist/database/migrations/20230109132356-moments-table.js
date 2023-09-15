"use strict";

// src/database/migrations/20230109132356-moments-table.js
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("moments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW()
      },
      updated_at: {
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.createTable("moments");
  }
};
