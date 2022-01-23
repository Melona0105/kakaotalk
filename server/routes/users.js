const { Router } = require("express");

const upload = require("../multer");

const {
  login,
  signup,
  userinfo,
  checkEmail,
  getFriends,
  getRooms,
  editUserName,
  editUserPhoto,
} = require("../controllers");
const auth = require("../middlewares/auth");

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/userinfo", auth, userinfo);
userRouter.post("/email", checkEmail);
userRouter.get("/friends", auth, getFriends);
userRouter.get("/rooms", auth, getRooms);
userRouter.put("/username", auth, editUserName);
userRouter.put("/photo", auth, upload.single("img"), editUserPhoto);
module.exports = userRouter;
