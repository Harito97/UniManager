import React, { useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  CalendarOutlined,
  SolutionOutlined,
  BarsOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/hus-logo.svg";

const Sidebar = () => {
  let path = window.location.pathname;
  console.log(path);

  useEffect(() => {}, []);

  const selectedKey = () => {
    if (path === "/student/dashboard") {
      return "1";
    } else if (path === "/student/calendar") {
      return "2";
    } else if (path === "/student/register") {
      return "3";
    } else if (path === "/student/exam") {
      return "4";
    } else if (path === "/student/guide") {
      return "0";
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
            key: "0",
            icon: <AlertOutlined />,
            label: <Link to="/student/guide">Hướng Dẫn</Link>,
          },
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
          {
            key: "3",
            icon: <SolutionOutlined />,
            label: <Link to="/student/register">Đăng ký học</Link>,
          },
          {
            key: "4",
            icon: <BarsOutlined />,
            label: <Link to="/student/exam">Lịch thi</Link>,
          },
          {
            key: "5",
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
