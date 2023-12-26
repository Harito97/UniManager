import React, { useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  ReconciliationOutlined,
  CalendarOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/hus-logo.svg";

const Sidebar = () => {
  let path = window.location.pathname;
  console.log(path);

  useEffect(() => {}, []);

  const selectedKey = () => {
    if (path === "/teacher/dashboard") {
      return "1";
    } else if (path === "/teacher/classes") {
      return "2";
    } else if (path === "/teacher/calendar") {
      return "3";
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
            label: <Link to="/teacher/dashboard">Tổng quan</Link>,
          },
          {
            key: "2",
            icon: <ReconciliationOutlined />,
            label: <Link to="/teacher/classes">Lớp học</Link>,
          },
          {
            key: "3",
            icon: <CalendarOutlined />,
            label: <Link to="/teacher/calendar">Lịch</Link>,
          },
          {
            key: "4",
            icon: <AppstoreAddOutlined />,
            label: <Link>Khác</Link>,
            children: [
              {
                key: "5.1",
                icon: <FileTextOutlined />,
                label: <Link>Biểu mẫu</Link>,
              },
              {
                key: "5.2",
                icon: <QuestionCircleOutlined />,
                label: <Link>Hỗ trợ</Link>,
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
