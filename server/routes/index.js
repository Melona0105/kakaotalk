const { Router } = require("express");
const userRouter = require("./users");
const friendRouter = require("./friends");
const roomRouter = require("./rooms");
const chatRouter = require("./chats");

const router = Router();
router.use("/users", userRouter);
router.use("/friends", friendRouter);
router.use("/rooms", roomRouter);
router.use("/chats", chatRouter);

module.exports = router;
