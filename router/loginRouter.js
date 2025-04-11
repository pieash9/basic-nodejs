import express from "express";
import { loginController } from "../controller/loginController.js";
import decorateHtmlResponse from "../middlewares/common/decorateHtmlResponse.js";

const loginRouter = express.Router();

loginRouter.get("/", decorateHtmlResponse("Login"), loginController.getLogin);

export default loginRouter;
