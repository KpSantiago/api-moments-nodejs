// src/models/Moments.js
var { DataTypes, Model } = require("sequelize");
var Moments = class extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        created_at: DataTypes.DATEONLY,
        updated_at: DataTypes.DATEONLY
      },
      {
        sequelize
      }
    );
  }
  static associete(models) {
    this.hasMany(models.Comments, {
      foreignKey: "moment_id",
      as: "comments"
    });
  }
};
module.exports = Moments;
