import React, { useEffect, useContext } from "react";
import { Form, Input, Button, Select } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useContentContext } from "../../context/UserContext";
import axios from "axios";

const Login = ({ handleForgot }) => {
  const { handleLogin, openErrorNotification } = useContentContext();
  const onFinish = async (values) => {
    await axios
      .post(
        "http://localhost:8000/token",
        JSON.stringify(
          `grant_type=&username=${values.username}&password=${values.password}&scope=&client_id=&client_secret=`,
        ),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .then((res) => {
        handleLogin(res.data.access_token);
      })
      .catch((err) =>
        openErrorNotification(
          "Lỗi",
          "Tên đăng nhập hoặc mật khẩu không chính xác!",
        ),
      );
  };

  return (
    <>
      <span className="mb-3 text-2xl font-bold">Welcome back!</span>
      <span className="mb-8 font-light text-gray-400">
        Hãy nhập thông tin đăng nhập của bạn
      </span>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên đăng nhập:"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          label="Mật khẩu:"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Đăng nhập
          </Button>
          <Button type="link" htmlType="button" onClick={() => handleForgot()}>
            Quên mật khẩu?
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
