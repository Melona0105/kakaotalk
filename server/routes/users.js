const { Router } = require("express");

const { login, signup, userinfo } = require("../controllers");
const auth = require("../middlewares/auth");

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/", auth, userinfo);

module.exports = userRouter;
