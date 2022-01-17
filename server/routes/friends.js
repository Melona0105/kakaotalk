const { Router } = require("express");

const { addFriend, findFriend } = require("../controllers");
const auth = require("../middlewares/auth");

const friendRouter = Router();

friendRouter.post("/", auth, findFriend);
friendRouter.put("/", auth, addFriend);

module.exports = friendRouter;
