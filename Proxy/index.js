const AnyProxy = require("anyproxy");
const options = {
  port: 8001,
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

const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  var fs = require("fs");
  fs.readFile("requests.txt", function (err, data) {
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
