import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useContentContext } from "../../Notification/ContentContext";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ handleForgot }) => {
  axios.defaults.withCredentials = true;
  const { openSuccessNotification, openErrorNotification } =
    useContentContext();
  const onFinish = async (values) => {
    await axios
      .post("http://localhost:8000/login", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        if (res.data.Status) {
          openSuccessNotification(
            "Đăng nhập thành công!",
            `Welcome Back ${values.username}`,
          );
          setTimeout(() => {
            const level = res.data.level;
            if (level === "SV") {
              window.location.replace("/student");
            } else if (level === "GV") {
              window.location.replace("/teacher");
            } else {
              window.location.replace("/admin");
            }
          }, 1000);
        } else {
          openErrorNotification("Lỗi", res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="p-5">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-600">
          ĐĂNG NHẬP
        </h1>
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
            <Button
              type="link"
              htmlType="button"
              onClick={() => handleForgot()}
            >
              Quên mật khẩu?
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
