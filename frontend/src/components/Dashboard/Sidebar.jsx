import React, { useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  CalendarOutlined,
  SolutionOutlined,
  BarsOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/hus-logo.svg";

const Sidebar = () => {
  let path = window.location.pathname;
  console.log(path);

  useEffect(() => {}, []);

  const selectedKey = () => {
    if (path === "student/dashboard") {
      return "1";
    } else if (path === "student/calendar") {
      return "2";
    } else {
      return "1";
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center bg-[#EBEBEB] py-4">
        <img src={Logo} alt="logo" className="w-10" />
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[selectedKey()]}
        className="bg-[#EBEBEB] text-base font-normal text-black"
        items={[
          {
            key: "1",
            icon: <AppstoreOutlined />,
            label: <Link to="/student/dashboard">Tổng quan</Link>,
          },
          {
            key: "2",
            icon: <CalendarOutlined />,
            label: <Link to="/student/calendar">Lịch</Link>,
          },
          { key: "3", icon: <SolutionOutlined />, label: <a>Đăng ký học</a> },
          { key: "4", icon: <BarsOutlined />, label: <a>Lịch thi</a> },
          { key: "5", icon: <DownOutlined />, label: <a>Khác</a> },
        ]}
      />
    </>
  );
};

export default Sidebar;
