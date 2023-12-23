import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useContentContext } from "../../Notification/ContentContext";
import axios from "axios";
import Cookies from "js-cookie";


const Login = ({ handleForgot }) => {
  const { openSuccessNotification } = useContentContext();

  // const onFinish = async (values) => {
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/login', {
  //       username: values.username,
  //       password: values.password
  //     });

  //     if (response.data!=null) {
  //       Cookies.set("logged_in", true);
  //       Cookies.set("username", values.username);
  //       window.location.href = "http://localhost:5173/student/";
  //     }

  //     else {
  //       alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
  //     };
  //     // console.log(response.data);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Để test đã, sẽ sửa sau :>>
  const onFinish = (values) => {
    localStorage.setItem("token", "testtoken");
    openSuccessNotification("Đăng nhập thành công!", "Chào mừng quay trở lại");
    window.location.replace("/student");
    // console.log(values);
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
          <Form.Item
            initialValue={"student"}
            label="Tôi là:"
            name="type"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: "student", label: "Sinh viên" },
                { value: "teacher", label: "Giảng viên" },
                { value: "admin", label: "Admin" },
              ]}
            ></Select>
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
