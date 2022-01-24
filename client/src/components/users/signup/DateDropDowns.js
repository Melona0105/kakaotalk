import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import "../../../css/components/users/signup/DropDown.css";

export default function DateDropDowns({ getUserbirth }) {
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
  return (
    <div className="dropdown-container">
      {menus.map((el) => (
        <Dropdown
          key={el.id}
          title={el.title}
          type={el.type}
          method={el.method}
          month={el.monthdata}
        />
      ))}
    </div>
  );
}
