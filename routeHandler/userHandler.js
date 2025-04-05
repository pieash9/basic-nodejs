import express from "express";
import USER from "../schemas/userSchema.js";
import bcrypt from "bcrypt";

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

export default userRouter;
