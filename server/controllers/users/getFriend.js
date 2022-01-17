require("dotenv").config();
const { User, Friend } = require("../../models");

module.exports = async function getFriend(req, res) {
  const { id } = req.userInfo;
  // 이메일 정보로 로그인한 유저의 정보를 가져온다.
  try {
    // 배열로 나옴 이 아래정보는
    const friendDataArray = await Friend.findAll({
      where: { user_id: id },
    }).then((res) => res);
    // 친구 데이터가 없을 경우,
    if (!friendDataArray.length) {
      return res.status(204).send({ data: null });
    }
    const friendsData = [];

    for (let i = 0; i < friendDataArray.length; i++) {
      const friendId = friendDataArray[i].friend_id;
      const currentFriendData = await User.findOne({ where: { id: friendId } });
      delete currentFriendData.dataValues.password;
      friendsData.push(currentFriendData.dataValues);
    }
    // TODO : 그 데이터를 순회하면서 그 아이디들을 담아서 준다.
    // const friend
    // 친구정보가 있을경우, 친구의 데이터를 찾아서 준다.

    // 비밀번호 지우고 줌
    return res.status(201).send({ data: friendsData, message: "ok" });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};
