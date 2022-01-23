const { Router } = require("express");

const { getChats } = require("../controllers");
const auth = require("../middlewares/auth");

const chatRouter = Router();

chatRouter.get("/:room_id", auth, getChats);

module.exports = chatRouter;
