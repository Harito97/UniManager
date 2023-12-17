import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Layout, Button, Dropdown } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import { Route, Routes } from "react-router-dom";
// import { Dashboard, Map } from "../pages";
// import Sidebar from "./Sidebar";
// import { useContentContext } from "../providers/ContentContext";

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);

  // let { openSuccessNotification } = useContentContext();

  useEffect(() => {
    if (window.innerWidth < 426) {
      setCollapsed(true);
    }
  }, []);

  // Navigation Menu Options
  const items = [
    {
      label: "Logout",
      key: "1",
      icon: <PoweroffOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    // if (e.key === "1") {
    //   //Logout
    //   openSuccessNotification("Logged Out!", "Logout Success!");
    //   localStorage.clear();
    //   window.location.replace("/login");
    // }
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
        {/* <Sidebar /> */}
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

        <Content className="m-[24px] h-full overflow-scroll rounded-md bg-white p-[24px]">
          {/* <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/map" element={<Map />} />
          </Routes> */}
        </Content>
        <Footer className="pt-0 text-center">
          Copyright 2023 © ALL RIGHTS RESERVED. Design by{" "}
          <a href="https://github.com/Harito97/UniManager" target="_blank" rel="noreferrer">
            HADT Team
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
