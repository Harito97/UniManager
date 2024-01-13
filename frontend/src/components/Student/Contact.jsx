import React from "react";
import { Button, Form, Input, Table, Modal } from "antd";
import { useContentContext } from "../Notification/ContentContext";
import axios from "axios";

const Contact = ({user}) => {
  const { openSuccessNotification, openErrorNotification } =
    useContentContext();

  const onFinish = (values) => {
    openSuccessNotification("Thành công", "Đã gửi yêu cầu!");
    form.resetFields();
    try {
      axios.post('http://localhost:8000/send_support', {
      username: user,
      email: values.email,
      title: values.title,
      content: values.content
      })
      .then((res) => console.log(res.message));
    } catch (e) {
      console.log(e);
    }
    
  };

  const [form] = Form.useForm();

  return (
    <>
      <div class="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
        <h2 class="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900">
          Liên hệ
        </h2>
        <p class=" text-center font-light text-gray-500 sm:text-xl">
          Gặp vấn đề với hệ thống? Sai điểm? Sai thông tin? Không thay đổi thông
          tin được?
        </p>
        <p class="mb-8 text-center font-light text-gray-500  sm:text-xl lg:mb-16">
          Liên hệ với người quản trị ngay bây giờ
        </p>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div>
            <Form.Item
              label={
                <p className="block text-sm font-medium text-gray-900 ">
                  Nhập email của bạn
                </p>
              }
              name="email"
              rules={[
                { required: true, message: "Không được bỏ trống ô này!" },
              ]}
            >
              <Input type="email" size="large" />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label={
                <p className="block text-sm font-medium text-gray-900 ">
                  Tiêu đề
                </p>
              }
              name="title"
              rules={[
                { required: true, message: "Không được bỏ trống ô này!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <div class="sm:col-span-2">
            <Form.Item
              label={
                <p className="block text-sm font-medium text-gray-900 ">
                  Nội dung
                </p>
              }
              name="content"
              rules={[
                { required: true, message: "Không được bỏ trống ô này!" },
              ]}
            >
              <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
            </Form.Item>
          </div>
          <Button htmlType="submit">Ghi nhận</Button>
        </Form>
      </div>
    </>
  );
};

export default Contact;
