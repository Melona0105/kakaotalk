const { Router } = require("express");

const { getRoomId, getRoomInfo } = require("../controllers");
const auth = require("../middlewares/auth");

const roomRouter = Router();

roomRouter.post("/", auth, getRoomId);
roomRouter.post("/info", auth, getRoomInfo);

module.exports = roomRouter;
