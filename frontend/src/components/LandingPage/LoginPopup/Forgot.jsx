import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";

const Forgot = ({ handleForgot }) => {

  const handleSubmit = async (values) => {

    try {
      const response = await axios.post('http://127.0.0.1:8000/forgot_password', {
        username: values.username,
      });
      
      if (response.data) {
        alert("Mật khẩu đã được gửi qua email của bạn!")
      } 
      
      else {
        alert("Người dùng không tồn tại!");
      }; 
    } 
    
    catch (error) {
      console.error(error);
    } 
  };

  return (
    <>
      <div className="p-5">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-600">
          QUÊN MẬT KHẨU
        </h1>
        <Form layout="vertical" onFinish={handleSubmit}>
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
