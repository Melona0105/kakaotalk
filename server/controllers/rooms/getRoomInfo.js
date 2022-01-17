// const { User, Friend, Room } = require("../../models");

module.exports = async function getRoomInfo(req, res) {
  // 더블클릭하면, 현재 유저 아이디의 방과 + 클릭한 유저 아이디의 방중 같은 방이 있는지 찾는다.
  // 방이 있다면 그 방으로 연결
  const user_id = req.userInfo.id;
  const { friend_id } = req.body;

  try {
    // 주어진 아이디에 해당하는 방들을 모두 가져온다.
    console.log(user_id, friend_id);
    const userRoomdata = await User.getProducts({});

    console.log(userRoomdata);

    return res.status(200).send({ message: "hi!" });
    // 방이 없다면, 새로 만들어서 서로 아이디에 그 방을 연결해주고 연결
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};
