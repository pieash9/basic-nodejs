//  dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
// app object - module scafolding
const app = {};

// configuration
app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);

  server.listen(environment.port, () => {
    console.log("listening to port " + environment.port);
  });
};

// handle request Response
app.handleReqRes = handleReqRes;
// start the server
app.createServer();
