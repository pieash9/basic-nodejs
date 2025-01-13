const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  console.log("not found handler");
  callback(404, { message: "request url not found" });
};

module.exports = handler;
