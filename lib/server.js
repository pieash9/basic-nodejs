//  dependencies
const http = require("http");
const { handleReqRes } = require("../helpers/handleReqRes");
const environment = require("../helpers/environments");

// app object - module scafolding
const server = {};

// TODO Remove  later
// sendTwilioSms("01627001665", "Hello world", (err) => {
//   console.log(err);
// });

// configuration
server.config = {
  port: 3000,
};

// create server
server.createServer = () => {
  const createServerVariable = http.createServer(server.handleReqRes);

  createServerVariable.listen(environment.port, () => {
    console.log("listening to port " + environment.port);
  });
};

// handle request Response
server.handleReqRes = handleReqRes;
// start the server
server.init = () => {
  server.createServer();
};

module.exports = server;
