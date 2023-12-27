import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Button, Dropdown } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Dashboard, Map } from "../pages";
import Sidebar from "../components/Student/Sidebar";
import Dashboard from "../components/Student/Dashboard";
import MyCalendar from "../components/Student/MyCalendar";
import Register from "../components/Student/Register";
import Exam from "../components/Student/Exam";
import axios from "axios";
import { useContentContext } from "../components/Notification/ContentContext";

// import { useContentContext } from "../providers/ContentContext";

const Student = ({ user }) => {
  axios.defaults.withCredentials = true;
  const [collapsed, setCollapsed] = useState(false);

  let { openSuccessNotification } = useContentContext();

  useEffect(() => {
    if (window.innerWidth < 426) {
      setCollapsed(true);
    }
  }, []);

  // Navigation Menu Options
  const items = [
    {
      label: "Profile",
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      label: "Logout",
      key: "2",
      icon: <PoweroffOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "2") {
      //Logout
      axios.get("http://localhost:8000/logout");
      openSuccessNotification(
        "Bạn đã đăng xuất!",
        `Trang sẽ chuyển hướng sau vài giây...`,
      );
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Layout className="flex h-screen w-full flex-row">
      <Sider
        className={
          collapsed
            ? "bg-[#EBEBEB] max-md:hidden"
            : "sider visible bg-[#EBEBEB]"
        }
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#EBEBEB" }}
      >
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "white" }}>
          <div className="flex flex-row ">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                zIndex: 999,
              }}
            />

            <Dropdown.Button
              menu={menuProps}
              icon={<UserOutlined />}
              className="m-4 flex justify-end"
            >
              Hello, User!
            </Dropdown.Button>
          </div>
        </Header>

        <Content className="m-[24px] h-full overflow-auto rounded-md bg-white p-[24px]">
          <Routes>
            <Route exact path="/" element={<Dashboard user={user} />} />
            <Route
              exact
              path="/dashboard"
              element={<Dashboard user={user} />}
            />
            <Route
              exact
              path="/calendar"
              element={<MyCalendar user={user} />}
            />
            <Route exact path="/register" element={<Register user={user} />} />
            <Route exact path="/exam" element={<Exam user={user} />} />
          </Routes>
          {/* <Dashboard /> */}
        </Content>
        <Footer className="pt-0 text-center">
          Copyright 2023 © ALL RIGHTS RESERVED. Design by{" "}
          <a
            href="https://github.com/Harito97/UniManager"
            target="_blank"
            rel="noreferrer"
          >
            HADT Team
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Student;
