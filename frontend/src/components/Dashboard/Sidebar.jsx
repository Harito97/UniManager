import React, { useEffect } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  SolutionOutlined,
  BarsOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/hus-logo.svg";

const Sidebar = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center bg-[#EBEBEB] py-4">
        <img src={Logo} alt="logo" className="w-10" />
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultActiveFirst="1"
        className="bg-[#EBEBEB] text-base font-normal text-black"
        items={[
          { key: "1", icon: <AppstoreOutlined />, label: <a>Tổng quan</a> },
          { key: "2", icon: <CalendarOutlined />, label: <a>Calendar</a> },
          { key: "3", icon: <SolutionOutlined />, label: <a>Đăng ký học</a> },
          { key: "4", icon: <BarsOutlined />, label: <a>Lịch thi</a> },
          { key: "5", icon: <DownOutlined />, label: <a>Khác</a> },
        ]}
      />
    </>
  );
};

export default Sidebar;
