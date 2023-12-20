import React from "react";
import { Calendar } from "antd";
const MyCalendar = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </>
  );
};
export default MyCalendar;
