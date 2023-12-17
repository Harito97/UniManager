import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Forgot = ({ handleForgot }) => {
  return (
    <>
      <div className="p-5">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-600">
          QUÊN MẬT KHẨU
        </h1>
        <Form layout="vertical">
          <Form.Item
            label="Tên đăng nhập:"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Gửi lại mật khẩu
            </Button>
            <Button
              type="link"
              htmlType="button"
              onClick={() => handleForgot()}
            >
              Đăng nhập?
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Forgot;
