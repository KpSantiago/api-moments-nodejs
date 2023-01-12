const express = require("express");

const serverless = require("serverless-http");
const fs = require("fs");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const routes = require("./routes");

const path = require("path");

require("./database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// disponibilização da imagen no fron-end
app.use(express.static(path.resolve(__dirname, "uploads", "upload")));

// app.use(
// 	"/api/images/",
// 	express.static(`${fs.readdirSync(__dirname + "/uploads/" + "upload/")}`)
// );

app.use("/", routes);
module.exports = app;
module.exports.handler = serverless(app);
