const Sequelize = require("sequelize");

const databaseConfig = require("../config/database");

const Comments = require("../models/Comments");
const Moments = require("../models/Moments");

const connection = new Sequelize(databaseConfig);

Comments.init(connection);
Moments.init(connection);

Comments.associete(connection.models);
Moments.associete(connection.models);

module.exports = connection;
