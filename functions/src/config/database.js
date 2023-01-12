module.exports = {
	database: "railway",
	username: "root",
	dialect: "mysql",
	host: "containers-us-west-25.railway.app",
	port: "7229",
	password: "NHjrn7mpa7ZmukWqH38a",
	url: process.env.DATABASE_URL,
	define: {
		timestamp: false,
		underscored: true,
	},
};
