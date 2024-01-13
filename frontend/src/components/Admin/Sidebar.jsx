import React, { useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { AppstoreOutlined, CalendarOutlined } from "@ant-design/icons";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import Logo from "../../assets/hus-logo.svg";

const Sidebar = () => {
  let path = window.location.pathname;
  console.log(path);

  useEffect(() => {}, []);

  const selectedKey = () => {
    if (path === "/admin/dashboard" || path === "/admin") {
      return "1";
    } else if (path === "/admin/user_manager") {
      return "2";
    } else if (path === "/admin/teacher_manager") {
      return "3";
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
            label: <Link to="/admin/dashboard">Tổng quan</Link>,
          },
          {
            key: "2",
            icon: <PiStudent />,
            label: <Link to="/admin/user_manager">Quản lý người dùng</Link>,
          },
          {
            key: "3",
            icon: <GiTeacher />,
            label: <Link to="/admin/teacher_manager">Quản lý giáo viên</Link>,
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
