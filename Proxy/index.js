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
