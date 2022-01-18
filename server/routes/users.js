const { Router } = require("express");

const {
  login,
  signup,
  userinfo,
  checkEmail,
  getFriends,
  getRooms,
} = require("../controllers");
const auth = require("../middlewares/auth");

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/userinfo", auth, userinfo);
userRouter.post("/", checkEmail);
userRouter.get("/friends", auth, getFriends);
userRouter.get("/rooms", auth, getRooms);

module.exports = userRouter;
