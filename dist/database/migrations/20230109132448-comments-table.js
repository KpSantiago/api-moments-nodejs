"use strict";

// src/database/migrations/20230109132448-comments-table.js
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("comments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      moment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "moments",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
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
    return queryInterface.dropTable("comments");
  }
};
