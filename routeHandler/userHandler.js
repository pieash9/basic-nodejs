import express from "express";
import USER from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new USER({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      message: "Signup successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Signup failed",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await USER.find({
      username: req.body.username,
    });

    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (isValidPassword) {
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({
          access_token: token,
          message: "Login successfully",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Login failed",
    });
  }
});

export default userRouter;
