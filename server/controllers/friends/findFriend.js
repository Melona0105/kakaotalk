const db = require("../../database/");

module.exports = async function findFriend(req, res) {
  // 로그인한 유저의 정보를 가져온다.
  const { id } = req.userInfo;
  // 친구 이메일
  const { friendEmail } = req.params;
  // 주어진 이메일로 데이터를 확인해서 그 사람의 아이디를 찾는다.
  try {
    const result1 = await new Promise((res, rej) => {
      db.query(
        `select * from users where email="${friendEmail}"`,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });

    const friendInfo = result1[0];
    // 아이디가 존재하지 않을 경우
    if (!friendInfo) {
      return res.status(404).send();
    }

    // 친구정보 획득
    const friend_id = friendInfo.id;

    // 나 스스로를 검색하면 에러
    if (friend_id === id) {
      return res.status(404).send();
    }
    delete friendInfo.password;

    // 이미 있는 친구인지 확인한다.
    const result2 = await new Promise((res, rej) => {
      db.query(
        `select * from friends where user_id='${id}' and friend_id='${friend_id}'`,
        (err, result) => {
          if (err) {
            return rej(err);
          } else {
            return res(result);
          }
        }
      );
    });

    const data = result2[0];
    // 친구 정보가 있다면,
    if (data) {
      return res.status(202).send({ friendInfo, message: "aleady exist" });
    }
    // 친구 정보가 없다면
    return res.status(201).send({ friendInfo, message: "ok" });
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};
