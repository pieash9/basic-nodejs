const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON, createRandomString } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");
const { maxChecks } = require("../../helpers/environments");

const handler = {};

handler.checkHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._check[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._check = {};

// TODO Authentication
handler._check.post = (requestProperties, callback) => {
  // validate inputs
  let protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;

  let url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;

  let method =
    typeof requestProperties.body.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;

  let successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;

  let timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds > 1 &&
    requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds
      : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    let token =
      typeof requestProperties.headersObject.token === "string"
        ? requestProperties.headersObject.token
        : false;

    data.read("tokens", token, (err, tokenData) => {
      if (!err && tokenData) {
        let userPhone = parseJSON(tokenData).phone;
        data.read("users", userPhone, (err2, userData) => {
          if (!err2 && userData) {
            tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
              if (tokenIsValid) {
                let userObject = parseJSON(userData);
                let userChecks =
                  typeof userObject.checks === "object" &&
                  userObject.checks instanceof Array
                    ? userObject.checks
                    : [];

                if (userChecks.length < maxChecks) {
                  let checkId = createRandomString(20);
                  let checkObject = {
                    id: checkId,
                    userPhone,
                    protocol,
                    url,
                    method,
                    successCodes,
                    timeoutSeconds,
                  };

                  data.create("checks", checkId, checkObject, (err3) => {
                    if (!err3) {
                      userObject.checks = userChecks;
                      userObject.checks.push(checkId);

                      data.update("users", userPhone, userObject, (err4) => {
                        if (!err4) {
                          callback(200, checkObject);
                        } else {
                          callback(500, {
                            error: "There was a problem in server side!",
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        error: "There was a problem in server side!",
                      });
                    }
                  });
                } else {
                  callback(401, {
                    error: "User has already reached max checks limit!",
                  });
                }
              } else {
                callback(403, {
                  error: "Authentication problem!",
                });
              }
            });
          } else {
            callback(403, {
              err: "user not found!",
            });
          }
        });
      } else {
        callback(403, { error: "Invalid token" });
      }
    });
  } else {
    callback(400, { error: "Missing required fields" });
  }
};

handler._check.get = (requestProperties, callback) => {};

handler._check.put = (requestProperties, callback) => {};

handler._check.delete = (requestProperties, callback) => {};

module.exports = handler;
