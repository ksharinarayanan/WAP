// import dotenv package to get information from the env file
require("dotenv").config();

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const socketIO = require("socket.io");

const testSocket = require("./socket/testSocket");

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

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server started at port ${port}`));

const io = socketIO(server);

let interval;

const onConnection = (socket) => {
  testSocket(io, socket);
};

io.on("connection", onConnection);

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
