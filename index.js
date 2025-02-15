//  dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const lib = require("./lib/data");

// app object - module scafolding
const app = {};

// testing file system
lib.create(
  "test",
  "newFile",
  { name: "Bangladesh", language: "Bangla" },
  (err) => console.log({ err })
);

// lib.read("test", "newFile", (err, data) => console.log({ data }));

// update
lib.update("test", "newFile", { name: "England", language: "English" }, (err) =>
  console.log({ err })
);

// lib.delete("test", "newFile", (err) => console.log({ err }));

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
