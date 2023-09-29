require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//init db
require("./dbs/init.mongodb");
const { checkOverload } = require("./utils/check.connect");
checkOverload();

//init routes
app.use("/", require("./routes"));
// handler error

module.exports = app;
