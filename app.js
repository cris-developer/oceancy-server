const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("./config/db.config");

//Router definition
//const userRouter = require("./routes/user.route");


const app = express();

//CORS configuration
app.use(
  cors({
    credentials: true,
    //origin: process.env.ORIGIN,
    origin: "http://localhost:3000",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", require("./routes/user.routes"));
app.use("/destinations",require("./routes/destinations.routes"));
app.use("/activities",require("./routes/activities.routes"));
app.use('/', require('./routes/index.routes'));


module.exports = app;
