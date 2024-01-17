import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContentContext } from "../../context/UserContext";
import axios from "axios";

const Forgot = ({ handleForgot }) => {
  const { openSuccessNotification, openErrorNotification } =
    useContentContext();
  const handleSubmit = async (values) => {
    try {
      const response = await axios
        .post("http://localhost:8000/forgot_password", {
          username: values.username,
        })
        .then((res) => {
          if (res.data) {
            openSuccessNotification(
              "Đổi mật khẩu thành công",
              "Mật khẩu đã được gửi qua email của bạn!",
            );
          } else {
            openErrorNotification("Lỗi", "Người dùng không tồn tại!");
          }
        });
    } catch (error) {
      openErrorNotification("Lỗi", "Đã có lỗi xảy ra");
    }
  };

  return (
    <>
      <span className="mb-3 text-2xl font-bold">Quên mật khẩu?</span>
      <span className="font-light text-gray-400">Nhập tên đăng nhập của bạn</span>
      <span className="mb-8 font-light text-gray-400">
        Mật khẩu mới sẽ được gửi về email của bạn
      </span>
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
          <Button type="link" htmlType="button" onClick={() => handleForgot()}>
            Đăng nhập?
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Forgot;
