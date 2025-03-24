const fs = require("fs");
const path = require("path");

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, "/../.data/");

// write data to file
lib.create = function (dir, file, data, callback) {
  // open file for write
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);
        // write data to file and close it
        fs.writeFile(fileDescriptor, stringData, function (err) {
          if (!err) {
            fs.close(fileDescriptor, function (err) {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing new file!");
              }
            });
          } else {
            callback("Error writing to new file!");
          }
        });
      } else {
        callback(`Could not crete new file, It may already exist!, ${err}`);
      }
    }
  );
};

// read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(
    lib.basedir + dir + "/" + file + ".json",
    "utf-8",
    (err, data) => {
      callback(err, data);
    }
  );
};

// update existing file
lib.update = (dir, file, data, callback) => {
  // file open for writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert the data to string
        const stringData = JSON.stringify(data);

        // truncate the file
        fs.ftruncate(fileDescriptor, (err) => {
          if (!err) {
            // write the file and close it
            fs.writeFile(fileDescriptor, stringData, (err) => {
              if (!err) {
                // close the file
                fs.close(fileDescriptor, (err) => {
                  if (!err) {
                    callback(false);
                  } else {
                    callback(`Error closing file`, err);
                  }
                });
              } else {
                callback(`Error writing the file`, err);
              }
            });
          } else {
            callback(`Error truncate file`, err);
          }
        });
      } else {
        callback(`Error updating file may not exist!`, err);
      }
    }
  );
};

// delete existing file
lib.delete = (dir, file, callback) => {
  // unlink file
  fs.unlink(lib.basedir + dir + "/" + file + ".json", (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(`Error deleting file`, err);
    }
  });
};

// list all the items
lib.list = (dir, callback) => {
  fs.readdir(lib.basedir + dir + "/", (err, fileNames) => {
    if (!err && fileNames && fileNames.length > 0) {
      let trimmedFileNames = [];
      fileNames.forEach((fileName) => {
        trimmedFileNames.push(fileName.replace(".json", ""));
      });

      callback(false, trimmedFileNames);
    } else {
      callback("Error reading directory!");
    }
  });
};

module.exports = lib;
