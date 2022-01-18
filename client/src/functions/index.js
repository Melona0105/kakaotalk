export function printNewMsgTime(input) {
  const time = getFilteredTime(input).split("-");
  const now = getFilteredTime(new Date().toLocaleString()).split("-");

  // 데이터의 날짜가 현재 달과 같고

  if (time[1] === now[1]) {
    // 일수가 같을경우,
    if (time[2] === now[2]) {
      // 시간을 리턴한다.
      return `${time[3]} ${time[4]}`;
    } else if (Number(time[2]) === Number(now[2]) - 1) {
      return "어제";
    } else {
      return `${time[1]}월 ${time[2]}일`;
    }
  }
}

export function getFilteredTime(input) {
  const data = input.split(" ");
  // 2022. 1. 18. 오후 11:17:52
  const year = data[0].slice(0, -1);
  const month = data[1].slice(0, -1).padStart(2, 0);
  const string = data[3];
  const day = data[2].slice(0, -1).padStart(2, 0);
  const time = data[4].slice(0, -3);
  return `${year}-${month}-${day}-${string}-${time}`;
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
