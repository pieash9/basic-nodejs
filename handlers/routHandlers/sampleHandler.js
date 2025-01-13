const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200, { message: "hello world sample url" });
};

module.exports = handler;
