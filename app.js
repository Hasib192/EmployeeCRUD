const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const createError = require("http-errors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const morgan = require("morgan");

const { URI } = require("./secret");

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
// setup the logger
app.use(morgan("dev", { stream: accessLogStream }));

mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    if (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  });

fs.readdirSync("./src/routes").map(function (r) {
  return app.use("/api/v1", apiLimiter, require(`./src/routes/${r}`));
});

// Universal route for handling unmatched paths
app.all("*", (req, res) => {
  res.status(404).send("404 - Page not found");
});

module.exports = app;