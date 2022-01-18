const { Router } = require("express");

const { getChats, sendChat } = require("../controllers");
const auth = require("../middlewares/auth");

const chatRouter = Router();

chatRouter.post("/", auth, getChats);
chatRouter.post("/:room_id", auth, sendChat);

module.exports = chatRouter;
