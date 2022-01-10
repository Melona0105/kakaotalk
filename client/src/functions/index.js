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
