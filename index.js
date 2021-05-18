// import dotenv package to get information from the env file
require("dotenv").config();

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Emitter = require("events");
const socketIO = require("socket.io");

const app = express();

app.use(express.json({ limit: "500mb" }));
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

server.listen(port, () =>
  console.log(`Backend node JS server started at port ${port}`)
);

// Event emitter
const eventEmitter = new Emitter();

app.set("eventEmitter", eventEmitter);

const io = socketIO(server);

io.on("connection", (socket) => {
  eventEmitter.on("newRRpair", (data) => {
    socket.emit("newRRpair", data);
  });
  eventEmitter.on("newIssue", (data) => {
    socket.emit("newIssue", data);
  });
});
