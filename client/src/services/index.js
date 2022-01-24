import chatService from "./chats";
import friendService from "./friends";
import roomService from "./rooms";
import userService from "./users";

const Service = {
  users: userService,
  friends: friendService,
  chats: chatService,
  rooms: roomService,
};

export default Service;
