const handle = (req, res) => {
  console.log(req.app.locals.title);
  res.send("Hello World from post request!");
};

module.exports = handle;
