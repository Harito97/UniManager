import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

const Login = ({ handleForgot }) => {
  // const onFinish = async (values) => {
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/login', {
  //       username: values.username,
  //       password: values.password
  //     });

  //     if (response.data) {
  //       window.location.href = "https://web.facebook.com/HusFanpage";
  //     }

  //     else {
  //       alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
  //     };

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Để test đã, sẽ sửa sau :>>
  const onFinish = (values) => {
    localStorage.setItem("token", "testtoken");
    window.location.replace("/student");
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.location.replace("/student");
    }
  }, []);

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
