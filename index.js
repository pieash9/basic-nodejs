//  dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const lib = require("./lib/data");
const { sendTwilioSms } = require("./helpers/notifications");

// app object - module scafolding
const app = {};

// TODO Remove  later
// sendTwilioSms("01627001665", "Hello world", (err) => {
//   console.log(err);
// });

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
