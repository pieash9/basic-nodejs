import express from "express";
import { usersController } from "../controller/usersController.js";
import decorateHtmlResponse from "../middlewares/common/decorateHtmlResponse.js";

const userRouter = express.Router();

userRouter.get("/", decorateHtmlResponse("Users"), usersController.getUsers);

export default userRouter;
