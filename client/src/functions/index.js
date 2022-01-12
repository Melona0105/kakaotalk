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
