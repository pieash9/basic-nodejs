import express from "express";
import { loginController } from "../controller/loginController.js";

const loginRouter = express.Router();

loginRouter.get("/", loginController.getLogin);

export default loginRouter;
