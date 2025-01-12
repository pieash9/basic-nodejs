const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.write("How are you?");
    res.end();
  } else if (req.url === "/about") {
    res.write("This is the about page");
    res.end();
  } else {
    res.write("404 not found");
    res.end();
  }
});

server.listen(3000);
console.log("Server is running on port 3000");
