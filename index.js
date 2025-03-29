const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
const adminRouter = express.Router();

app.use(cookieParser());

const loggerWrapper = (options) => {
  return function (req, res, next) {
    if (options.log) {
      console.log(
        `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
          req.originalUrl
        } - ${req.protocol} - ${req.ip}`
      );
      next();
    } else {
      throw new Error("Server side error!");
    }
  };
};

adminRouter.use(loggerWrapper({ log: false }));

adminRouter.get("/dashboard", (req, res) => {
  res.send("Admin Dashboard");
});

app.use("/admin", adminRouter);

app.get("/about", (req, res) => {
  res.send("About");
});

const errorMiddleware = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send("Server side error!");
};

adminRouter.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
