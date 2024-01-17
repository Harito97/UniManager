import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Button, Dropdown, Drawer } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Dashboard, Map } from "../pages";
import Sidebar from "../components/Student/Sidebar";
import Dashboard from "../components/Student/Dashboard";
import MyCalendar from "../components/Student/MyCalendar";
import Register from "../components/Student/Register";
import Exam from "../components/Student/Exam";
import Guide from "../components/Student/Guide";
import Form from "../components/Student/Form";
import StudentProfile from "../components/Student/UserProfile";
import axios from "axios";
import { useContentContext } from "../context/UserContext";
import TeamLogo from "../assets/logo/logo.png";
import Contact from "../components/Student/Contact";

const Student = () => {
  axios.defaults.withCredentials = true;
  const [collapsed, setCollapsed] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  let { openSuccessNotification, handleLogout, user } = useContentContext();

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setOpenDrawer(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
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
      handleLogout();
      openSuccessNotification(
        "Bạn đã đăng xuất!",
        `Trang sẽ chuyển hướng sau vài giây...`,
      );
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    } else {
      window.location.replace("/student/setting");
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Layout className="flex h-screen w-full flex-row">
      <Sider
        className="bg-[#EBEBEB] max-md:hidden"
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#EBEBEB" }}
      >
        <Sidebar />
      </Sider>

      <Drawer
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={250}
        styles={{
          header: { background: "#EBEBEB" },
          body: { background: "#EBEBEB", padding: 0 },
        }}
      >
        <Sidebar />
      </Drawer>
      <Layout>
        <Header style={{ padding: 0, background: "white" }}>
          <div className="flex flex-row ">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setOpenDrawer(!openDrawer);
                } else {
                  setCollapsed(!collapsed);
                }
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
              Hello, {user}!
            </Dropdown.Button>
          </div>
        </Header>

        <Content className="m-[24px] h-full overflow-auto rounded-md bg-white p-[24px]">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/calendar" element={<MyCalendar />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/exam" element={<Exam />} />
            <Route exact path="/guide" element={<Guide />} />
            <Route exact path="/form" element={<Form />} />
            <Route exact path="/contact" element={<Contact />} />

            <Route exact path="/setting" element={<StudentProfile />} />
          </Routes>
          {/* <Dashboard /> */}
        </Content>
        <Footer className="pt-0 text-center">
          Design by{" "}
          <a
            href="https://github.com/Harito97/UniManager"
            target="_blank"
            rel="noreferrer"
          >
            <img src={TeamLogo} className="inline h-5" />
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Student;
