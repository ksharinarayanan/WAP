const AnyProxy = require("anyproxy");
const options = {
  port: 6000,
  rule: require("./myRules"),
  throttle: 10000,
  forceProxyHttps: true,
  wsIntercept: false,
  silent: false,
};
const proxyServer = new AnyProxy.ProxyServer(options);

proxyServer.on("ready", () => {
  /* */
});
proxyServer.on("error", (e) => {
  /* */
});
proxyServer.start();

// PROXY API
const express = require("express");
let cookieParser = require("cookie-parser");
//setup express app
let app = express();

app.use(cookieParser());
app.use(express.json({ limit: "500mb" }));

app.post("/switchProject/", (req, res) => {
  const projectID = req.body.projectID;
  const fs = require("fs");

  fs.writeFile("activeProject", projectID, function (err) {
    if (err) console.log("Error saving the active project!");
  });
});

app.listen(6500);
