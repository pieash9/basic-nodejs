const express = require("express");

const app = express();

const router = express.Router({
  caseSensitive: true,
});

app.use(router);

app.use(
  express.static(__dirname + "/public", {
    index: "home.html",
  })
);

router.get("/About", (req, res) => {
  res.send("Hello World!");
});

router.post("/", (req, res) => {
  res.send("Hello World from post request!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
