const { Router } = require("express");

const { getRoomInfo } = require("../controllers");
const auth = require("../middlewares/auth");

const roomRouter = Router();

roomRouter.post("/", auth, getRoomInfo);

module.exports = roomRouter;
