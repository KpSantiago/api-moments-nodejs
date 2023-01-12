const { DataTypes, Model } = require("sequelize");

class Comments extends Model {
	static init(sequelize) {
		super.init(
			{
				username: DataTypes.STRING,
				text: DataTypes.TEXT,
				updated_at: DataTypes.DATEONLY,
			},
			{
				sequelize,
			}
		);
	}
	static associete(models) {
		this.belongsTo(models.Moments, {
			foreignKey: "moment_id",
			as: "moment",
		});
	}
}

module.exports = Comments;
