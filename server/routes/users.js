const { Router } = require("express");

const {
  login,
  signup,
  userinfo,
  checkEmail,
  getFriends,
} = require("../controllers");
const auth = require("../middlewares/auth");

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/userinfo", auth, userinfo);
userRouter.post("/", checkEmail);
userRouter.post("/friend", auth, getFriends);

module.exports = userRouter;
