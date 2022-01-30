import Service from "../services";

export const server = "http://localhost:8080";
// export const server =
//   "http://ec2-3-36-51-139.ap-northeast-2.compute.amazonaws.com:8080";

export function printNewMsgTime(input) {
  // const year = input.slice(0, 4);
  const month = input.slice(5, 7);
  const day = input.slice(8, 10);

  const hour = input.slice(11, 13);
  const min = input.slice(14, 16);

  let newHour = +hour + 9;
  if (newHour >= 24) {
    newHour = String(newHour - 24).padStart(2, 0);
  } else {
    newHour = String(newHour).padStart(2, 0);
  }
  const string = newHour >= 12 ? "오후" : "오전";

  newHour >= 12 && (newHour = newHour - 12);
  const time = `${newHour}:${min}`;

  const today = getCurrentTime().split(" ");

  // 날짜가 같으면 시간출력
  if (String(today[2]) === String(day)) {
    return `${string} ${time}`;
    // 하루차이면 '어제'
  } else if (+today[2] - 1 === +day) {
    return "어제";
  } else {
    // 그 이상이면 그냥 날짜출력
    return `${month}월 ${day}일`;
  }
}

export function getCurrentTime(type) {
  const date = new Date().toISOString();
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);

  const hour = date.slice(11, 13);

  const min = date.slice(14, 16);
  const second = date.slice(17, 19);

  if (type === "birth") {
    return `${month}-${day}`;
  } else {
    return `${year} ${month} ${day} ${hour}:${min}`;
  }
}

export function sortChatData(data) {
  return data.reduce((acc, cur) => {
    const now = acc[acc.length - 1];
    // 이름이 같은지 확인
    if (now?.user_id === cur.user_id) {
      // 이름이 같다면, 시간이 같은지 확인한다.
      // 시간이 같다면 그냥 넘어가고,
      // 다르면 데이터에 넣어줘야함
      if (now?.time.slice(0, -3) !== cur.time.slice(0, -3)) {
        acc.push({ ...cur, content: [cur.content] });
      } else {
        now.content.push(cur.content);
      }
    } else {
      // 이름이 다르면 시간 넣어버림
      acc.push({ ...cur, content: [cur.content] });
    }
    return acc.sort((a, b) => {
      return new Date(a.time) - new Date(b.time);
    });
  }, []);
}

export function checkKorean(input) {
  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  return korean.test(input);
}

export function checkInvalidString(string, email) {
  const now = email.split("").findIndex((el) => el === string);
  if (now === -1) {
    return false;
  } else {
    return true;
  }
}

export function filterDataByKeyWord(data, keyword) {
  const len = keyword.length;
  const newData = data.split("");
  const arr = [];
  for (let i = 0; i < newData.length; i++) {
    if (i + len <= newData.length) {
      arr.push(newData.slice(i, i + len).join(""));
    }
  }

  const result = arr.filter((el) => el === keyword);
  if (result.length) {
    return true;
  } else {
    return false;
  }
}

export function sortDataToAlphabeticalOrder(data) {
  data.sort((a, b) => {
    if (a.username < b.username) {
      return -1;
    }
  });
}

export async function rollbackFriend(username) {
  try {
    await Service.friends.rollbackFriend(username);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFriend(username) {
  try {
    await Service.friends.deleteFriend(username);
  } catch (err) {
    console.log(err);
  }
}

export async function blockFriend(username) {
  try {
    await Service.friends.blockFriend(username);
  } catch (err) {
    console.log(err);
  }
}

export async function hideFriend(username) {
  try {
    await Service.friends.hideFriend(username);
  } catch (err) {
    console.log(err);
  }
}

export async function getRoomData(friend_id, callback) {
  try {
    await Service.rooms.fetchRoomId(friend_id, callback);
  } catch (err) {
    console.log(err);
  }
}
