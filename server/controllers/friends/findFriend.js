require("dotenv").config();
const { User, Friend } = require("../../models");

module.exports = async function findFriend(req, res) {
  const { id } = req.userInfo;
  // 친구 이메일
  const { email } = req.body;
  // 이메일 정보로 로그인한 유저의 정보를 가져온다.
  // 주어진 이메일로 데이터를 확인해서 그 사람의 아이디를 찾는다.
  try {
    const friendInfo = await User.findOne({ where: { email } });
    // 아이디가 유효하지 않을 경우
    if (!friendInfo) {
      return res.status(404).send({ message: "null" });
    }
    const friend_id = friendInfo.dataValues.id;
    delete friendInfo.dataValues.password;
    const checkExistaFriend = await Friend.findOne({
      where: { user_id: id, friend_id },
    });
    // 이미 친구 정보가 존재하는 경우
    if (checkExistaFriend) {
      return res.status(202).send({ friendInfo, message: "aleady exist" });
    }
    // 존재하지 않는경우, 그 사람 데이터만 보내준다 -> 추가는 나중에
    return res.status(201).send({ friendInfo, message: "ok" });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};
