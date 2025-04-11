import express from "express";
import { inboxController } from "../controller/inboxController.js";
import decorateHtmlResponse from "../middlewares/common/decorateHtmlResponse.js";

const inboxRouter = express.Router();

inboxRouter.get("/", decorateHtmlResponse("Inbox"), inboxController.getInbox);

export default inboxRouter;
