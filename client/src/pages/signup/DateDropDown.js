import { useEffect, useState } from "react";
import useDateDropDown from "./DateDropDown.hook";
import Dropdown from "./Dropdown";
import "./DropDown.css";

export default function DateDropDown({ getUserbirth }) {
  const { models } = useDateDropDown(getUserbirth);
  const { menus } = models;
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
