const { Router } = require("express");

const {
  login,
  signup,
  userinfo,
  checkEmail,
  getFriend,
} = require("../controllers");
const auth = require("../middlewares/auth");

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/userinfo", auth, userinfo);
userRouter.post("/", checkEmail);
userRouter.post("/friend", auth, getFriend);

module.exports = userRouter;
