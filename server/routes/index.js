const { Router } = require("express");
const userRouter = require("./users");
const friendRouter = require("./friends");
const roomRouter = require("./rooms");

const router = Router();
router.use("/users", userRouter);
router.use("/friends", friendRouter);
router.use("/rooms", roomRouter);

module.exports = router;
