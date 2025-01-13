//  dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

// app object - module scafolding
const app = {};

// configuration
app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);

  server.listen(app.config.port, () => {
    console.log("listening to port " + app.config.port);
  });
};

// handle request Response
app.handleReqRes = handleReqRes;
// start the server
app.createServer();
