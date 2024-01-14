require('dotenv').config()
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env
module.exports = {
	dialect: "postgres",
	database: PGDATABASE,
	host: PGHOST,
	username: PGUSER,
	password: PGPASSWORD,
	define: {
		timestamp: false,
		underscored: true,
	},
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
};
