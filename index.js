//  dependencies
const http = require("http");

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
app.handleReqRes = (req, res) => {
  // response handler
  res.end("Hello Programmer!");
};

// start the server
app.createServer();
