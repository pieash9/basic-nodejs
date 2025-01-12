const fs = require("fs");

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

// ourReadStream.on("data", (chunk) => {
//   console.log(chunk);
//   ourWriteStream.write(chunk);
// });

// console.log("hello");

ourReadStream.pipe(ourWriteStream);
