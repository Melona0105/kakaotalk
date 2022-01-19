const db = require("../../database");

module.exports = async function getRooms(req, res) {
  // 유저가 속해있는 방들을 들어간다.
  const user_id = req.userInfo.id;
  try {
    db.query(
      `select room_id from rooms as R INNER JOIN users_in_rooms as UR ON R.id=UR.room_id where user_id=${user_id}`,
      (err, result1) => {
        if (err) {
          throw err;
        }

        const rooms = result1;
        // 방이 없으면 데이터
        if (!rooms.length) {
          return res.status(203).send();
        }

        const data = [];
        // 방이 있으면, 이방으로 데이터를  찾는다.
        for (let i = 0; i < rooms.length; i++) {
          const { room_id } = rooms[i];

          db.query(
            `select R.id, R.noti, U.username, U.photo, C.content, C.time, C.view, C.user_id from rooms as R
           left JOIN users_in_rooms AS UR ON R.id=UR.room_id 
           left JOIN users as U ON U.id=UR.user_id 
           inner JOIN (select * from chats) AS C ON R.id=C.room_id 
           where UR.user_id !=${user_id} AND R.id=${room_id}`,
            (err, result2) => {
              if (err) {
                throw err;
              }
              // console.log(result2);
              // const chats = result2[result2.length - 1];
              // // 채팅방이 있는 경우의 데이터만 돌려준다.
              // data.push(chats);
              // if (i === rooms.length - 1) {
              //   return res.status(201).send({ rooms: data });
              // }
              const chats = result2;
              // 채팅방이 있는 경우의 데이터만 돌려준다.
              data.push(chats);
              if (i === rooms.length - 1) {
                return res.status(201).send({ rooms: data });
              }
              // 여기까지
            }
          );
        }
      }
    );
  } catch {
    return res.status(500).send({ message: "server error" });
  }
};
