const handler = (req, res) => {
  console.log(req.get("accept"));
  res.send("Hello World from handler!");
};

module.exports = handler;
