const express = require("express");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const routes = require("./routes");

const path = require("path");

require("./database");

const app = express();

app.listen(process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(routes);

// disponibilização da imagen no fron-end
app.use(
	"/api/images/",
	express.static(path.resolve(__dirname, "uploads", "upload"))
);
