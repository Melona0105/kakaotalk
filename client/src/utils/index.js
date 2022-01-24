import axios from "axios";
import {} from "../";
import Service from "../services";

export function printNewMsgTime(input) {
  // const year = input.slice(0, 4);
  const month = input.slice(5, 7);
  const day = input.slice(8, 10);

  const hour = input.slice(11, 13);
  const min = input.slice(14, 16);

  const time = `${hour >= 12 ? String(hour - 12).padStart(2, 0) : hour}:${min}`;
  const string = hour >= 12 ? "오후" : "오전";

  const today = getCurrentTime().split(" ");

  // 날짜가 같으면 시간출력
  if (today[2] === day) {
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
  const date = new Date().toLocaleDateString().split(" ");
  const time = new Date().toLocaleTimeString().split(" ");

  const year = date[0].slice(0, -1);
  const month = date[1].slice(0, -1).padStart(2, 0);
  const day = date[2].slice(0, -1).padStart(2, 0);

  const hour =
    time[0] === "오후"
      ? +time[1].split(":")[0] + 12
      : time[1].split(":")[0].padStart(2, 0);

  const min = time[1].split(":")[1];
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
      if (now?.time !== cur.time) {
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
  await Service.friends.rollbackFriend(username);
}

export async function deleteFriend(username) {
  await Service.friends.deleteFriend(username);
}

export async function blockFriend(username) {
  await Service.friends.blockFriend(username);
}

export async function hideFriend(username) {
  await Service.friends.hideFriend(username);
}

export const server = "http://localhost:4000/";
