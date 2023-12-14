import React from "react";
import { Form, Input, Button } from "antd";

const Login = ({ handleForgot }) => {
  // const onFinish = (e) => {
  //   console.log(e);
  // };

  return (
    <>
      <div className="p-5">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-600">
          ĐĂNG NHẬP
        </h1>
        <Form layout="vertical">
          <Form.Item
            label="Tên đăng nhập:"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu:"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
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
