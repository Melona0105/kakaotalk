const { Router } = require("express");

const { getRoomId, getRoomInfo } = require("../controllers");
const auth = require("../middlewares/auth");

const roomRouter = Router();

roomRouter.post("/", auth, getRoomId);
roomRouter.get("/info/:room_id", auth, getRoomInfo);

module.exports = roomRouter;
