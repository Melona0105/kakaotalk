const { Router } = require("express");

const {
  addFriend,
  findFriend,
  deleteFriend,
  blockFriend,
  hideFriend,
  rollbackFriend,
} = require("../controllers");

const auth = require("../middlewares/auth");

const friendRouter = Router();

friendRouter.post("/", auth, findFriend);
friendRouter.put("/", auth, addFriend);
friendRouter.delete("/", auth, deleteFriend);
friendRouter.put("/block", auth, blockFriend);
friendRouter.put("/hide", auth, hideFriend);
friendRouter.put("/rollback", auth, rollbackFriend);

module.exports = friendRouter;
