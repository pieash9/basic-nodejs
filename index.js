import express from "express";
import mongoose from "mongoose";
import todoRouter from "./routeHandler/todoHandler.js";
import userRouter from "./routeHandler/userHandler.js";

const app = express();
app.use(express.json());

// db connection with mongoose
mongoose
  .connect("mongodb://localhost:27017/test-mongoose")
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

// routes
app.use("/todo", todoRouter);
app.use("/user", userRouter);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send({ error: err.message });
};

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
