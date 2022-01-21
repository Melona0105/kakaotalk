const { Router } = require("express");

const { username } = require("../controllers");
const auth = require("../middlewares/auth");

const editRouter = Router();

editRouter.put("/username", auth, username);

module.exports = editRouter;
