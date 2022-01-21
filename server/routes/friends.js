const { Router } = require("express");

const { addFriend, findFriend, deleteFriend } = require("../controllers");
const auth = require("../middlewares/auth");

const friendRouter = Router();

friendRouter.post("/", auth, findFriend);
friendRouter.put("/", auth, addFriend);
friendRouter.delete("/", auth, deleteFriend);

module.exports = friendRouter;
