require("dotenv").config();
const { User, Friend } = require("../../models");

module.exports = async function addFriend(req, res) {
  const { id } = req.userInfo;
  // 친구 이메일
  const { email } = req.body;
  // 이메일 정보로 로그인한 유저의 정보를 가져온다.
  // 주어진 이메일로 데이터를 확인해서 그 사람의 아이디를 찾는다.
  try {
    const friendInfo = await User.findOne({ where: { email } });
    console.log(friendInfo.dataValues);
    // 아이디가 유효하지 않을 경우
    if (!friendInfo) {
      return res.status(404).send({ message: "null" });
    }

    const friend_id = friendInfo.dataValues.id;
    const checkExistaFriend = await Friend.findOne({
      where: { user_id: id, friend_id },
    });

    // 이미 친구 정보가 존재하는 경우
    if (checkExistaFriend) {
      delete friendInfo.dataValues.password;
      return res
        .status(204)
        .send({ data: friendInfo.dataValues, message: "aleady exist" });
    }
    // 친구목록에 이 아이디에 해당하는 값이 없을경우
    // 찾은 친구 아이디를 내 친구목록에 넣어준다.
    await Friend.create({ user_id: id, friend_id });
    // 그 후 그 데이터를 꺼내준다.

    return res.status(201).send({ data: friendInfo, message: "ok" });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};
