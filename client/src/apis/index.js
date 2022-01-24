import friendApis from "./friends";
import userApis from "./users";
import chatApis from "./chats";
import roomApis from "./rooms";

const Apis = {
  users: userApis,
  friends: friendApis,
  chats: chatApis,
  rooms: roomApis,
};

export default Apis;
