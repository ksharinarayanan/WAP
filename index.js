// import dotenv package to get information from the env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const routes = require("./routes/main");

// DB config
const db = require("./config/keys").mongoURI;

// use routes

app.use("/", routes);

// connecting to mongo DB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err));

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started at port ${port}`));
