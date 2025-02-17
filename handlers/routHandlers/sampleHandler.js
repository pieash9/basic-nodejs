const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  callback(200, { message: "hello world sample url" });
};

module.exports = handler;
