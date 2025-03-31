const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

const UPLOAD_FOLDER = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") + Date.now();

    cb(null, fileName + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      } else {
        cb(new Error("Only jpeg and png files are allowed!"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only PDF type allowed!"));
      }
    } else {
      cb(new Error("There is an unknown error!"));
    }
  },
});

app.post(
  "/",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "doc",
      maxCount: 1,
    },
  ]),

  (req, res) => {
    console.log(req.files);
    res.send("Hello world!");
  }
);

// default error
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    if (err instanceof multer.MulterError) {
      res.status(500).send("Multer error!");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("Success");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
