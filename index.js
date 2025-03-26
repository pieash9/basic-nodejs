const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("Hello World from post request!");
  res.render("pages/about");
});

app.all("/", (req, res) => {
  res.send({
    err: "path not found!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
