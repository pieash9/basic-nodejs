import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";

const __dirname = path.resolve();

const app = express();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// router setup

// error handling

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
