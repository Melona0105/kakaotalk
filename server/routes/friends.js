const { Router } = require("express");

const {
  addFriend,
  findFriend,
  deleteFriend,
  blockFriend,
  hideFriend,
  rollbackFriend,
  getFriendInfo,
} = require("../controllers");

const auth = require("../middlewares/auth");

const friendRouter = Router();

friendRouter.get("/:friendEmail", auth, findFriend);
friendRouter.put("/", auth, addFriend);
friendRouter.delete("/", auth, deleteFriend);
friendRouter.put("/block", auth, blockFriend);
friendRouter.put("/hide", auth, hideFriend);
friendRouter.put("/rollback", auth, rollbackFriend);
friendRouter.get("/info/:friend_id", auth, getFriendInfo);

module.exports = friendRouter;
