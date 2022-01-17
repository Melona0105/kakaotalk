const { Router } = require("express");
const userRouter = require("./users");
const friendRouter = require("./friends");

const router = Router();

router.use("/users", userRouter);
router.use("/friends", friendRouter);

module.exports = router;
