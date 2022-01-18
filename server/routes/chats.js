const { Router } = require("express");

const { getChats } = require("../controllers");
const auth = require("../middlewares/auth");

const chatRouter = Router();

chatRouter.post("/", auth, getChats);

module.exports = chatRouter;
