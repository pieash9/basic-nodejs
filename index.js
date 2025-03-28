const express = require("express");

const app = express();
app.set("view engine", "ejs");

app.use(express.json());

app.get("/about", (req, res) => {
  res.set("name", "PIeash ahmed");
  console.log(res.get("name"));
  res.end();
});

app.get("/test", (req, res) => {
  res.send("Redirect from about");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
