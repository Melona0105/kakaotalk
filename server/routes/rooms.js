const { Router } = require("express");

const { getRoomId, getRoomInfo, leaveRoom } = require("../controllers");
const auth = require("../middlewares/auth");

const roomRouter = Router();

roomRouter.get("/:friend_id", auth, getRoomId);
roomRouter.get("/info/:room_id", auth, getRoomInfo);
roomRouter.put("/", auth, leaveRoom);

module.exports = roomRouter;
