export const getCurrentDate = () => {
  const date = new Date();
  const month = String(date.getUTCMonth() + 1).padStart(2, 0);
  const day = date.getUTCDate();

  return `${month}-${day}`;
};

export const getYesterDayDate = () => {
  const date = new Date();
  const month = String(date.getUTCMonth() + 1).padStart(2, 0);
  const day = String(date.getUTCDate() - 1).padStart(2, 0);

  return `${month}-${day}`;
};

export function printNewMsgTime(time) {
  const timeArray = time.slice(5).split("T");
  const now = timeArray[0];
  if (now === getCurrentDate()) {
    return transTimeToTwelveTime(timeArray[1]);
  } else if (now === getYesterDayDate()) {
    return "어제";
  } else {
    const msgDate = timeArray[0].split("-");
    let month = msgDate[0];
    month = removeFrontZero(month);
    let day = msgDate[1];
    day = removeFrontZero(day);
    return `${month}월 ${day}일`;
  }
}

function transTimeToTwelveTime(time) {
  const timeArray = time.split(":");
  if (+timeArray[0] >= 12) {
    return `오후 ${+timeArray[0] - 12}:${timeArray[1]}`;
  }
  return `오전 ${time}`;
}

function removeFrontZero(input) {
  if (input[0] === "0") {
    input = input.slice(1);
  }
  return input;
}

export function sortChatData(data) {
  return data.reduce((acc, cur) => {
    const now = acc[acc.length - 1];
    // 이름이 같은지 확인
    if (now?.user === cur.user) {
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
