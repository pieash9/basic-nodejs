// dependencies
const { sampleHandler } = require("./handlers/routHandlers/sampleHandler");
const { userHandler } = require("./handlers/routHandlers/userHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;
