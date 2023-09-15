// src/models/Comments.js
var { DataTypes, Model } = require("sequelize");
var Comments = class extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING,
        text: DataTypes.TEXT,
        updated_at: DataTypes.DATEONLY
      },
      {
        sequelize
      }
    );
  }
  static associete(models) {
    this.belongsTo(models.Moments, {
      foreignKey: "moment_id",
      as: "moment"
    });
  }
};
module.exports = Comments;
