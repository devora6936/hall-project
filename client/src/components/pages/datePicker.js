import { useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
require("react-jewish-datepicker/dist/index.css");

export default function Datepicker(props) {

  return (
    <ReactJewishDatePicker
      value={props.date}
      isHebrew
      onClick={(day) => {
        props.setDate(day.date);
      }}
    />
  );
}
