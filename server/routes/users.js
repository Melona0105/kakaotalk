const { Router } = require("express");

const { login, signup } = require("../controllers");

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);

module.exports = userRouter;
