import { useEffect, useState } from "react";

function useDateDropDown(getUserbirth) {
  const [selectedYear, setSelectedYear] = useState(1993);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(5);

  const menus = [
    {
      id: "first-dropdown",
      title: "연도",
      type: "year",
      method: setSelectedYear,
    },
    {
      id: "second-dropdown",
      title: "월",
      type: "month",
      method: setSelectedMonth,
    },
    {
      id: "third-dropdown",
      title: "일",
      type: "day",
      method: setSelectedDay,
      monthdata: selectedMonth,
    },
  ];
  useEffect(() => {
    const currentDate = `${selectedYear}-${String(selectedMonth).padStart(
      2,
      0
    )}-${String(selectedDay).padStart(2, "0")}`;

    getUserbirth(currentDate);
  }, [selectedYear, selectedMonth, selectedDay]);
  return { models: { menus } };
}

export default useDateDropDown;
