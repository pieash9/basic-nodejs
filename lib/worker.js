//  dependencies
const http = require("http");
const { handleReqRes } = require("../helpers/handleReqRes");
const environment = require("../helpers/environments");
const data = require("./data");
const { parseJSON } = require("../helpers/utilities");
const url = require("url");

// app object - module scafolding
const worker = {};

worker.gatherAllChecks = () => {
  data.list("checks", (err, checks) => {
    if (!err && checks.length > 0) {
      checks.forEach((check) => {
        data.read("checks", check, (err2, originalCheckData) => {
          if (!err2 && originalCheckData) {
            worker.validateCheckData(parseJSON(originalCheckData));
          } else {
            console.log(`Error: Reading one of the check data!`);
          }
        });
      });
    } else {
      console.log(`Error : Could not find any process to checks!`);
    }
  });
};

// validate individual check data
worker.validateCheckData = (originalCheckData) => {
  let originalData = originalCheckData;

  if (originalCheckData && originalCheckData.id) {
    originalData.state =
      typeof originalCheckData.state === "string" &&
      ["up", "down"].indexOf(originalCheckData.state) > -1
        ? originalCheckData.state
        : "down";

    originalData.lastChecked =
      typeof originalCheckData.lastChecked === "number" &&
      originalCheckData.lastChecked > 0
        ? originalCheckData.lastChecked
        : false;

    // pass to the next process
    worker.performCheck(originalData);
  } else {
    console.log(`Error: Check was invalid or not properly formatter!`);
  }
};

// perform check
worker.performCheck = (originalCheckData) => {
  // parse the hostname and full url from original data
  let parsedUrl = url.parse(
    originalCheckData.protocol + "://" + originalCheckData.url,
    true
  );

  const hostname = parsedUrl.hostname;
  const path = parsedUrl.path;

  const request = {
    protocol: originalCheckData.protocol + ":",
    hostname: "",
  };
};

worker.loop = () => {
  setInterval(() => {
    worker.gatherAllChecks();
  }, 1000 * 60);
};

// start the workers
worker.init = () => {
  worker.gatherAllChecks();

  // call the loop so that checks continue
  worker.loop();
};

module.exports = worker;
