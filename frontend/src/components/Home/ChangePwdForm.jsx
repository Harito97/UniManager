import React from "react";
import { useContentContext } from "../../context/UserContext";
import { Button, Form, Input } from "antd";
import axios from "axios";

const ChangePwdForm = () => {
  const { openSuccessNotification, openErrorNotification, getToken } =
    useContentContext();
  const [passForm] = Form.useForm();

  const changePwd = (values) => {
    try {
      axios
        .put(
          "http://localhost:8000/change_pass",
          {
            current_pass: values.current_pass,
            new_pass: values.new_pass,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getToken(),
            },
          },
        )
        .then((res) => {
          if (res.data.Status) {
            openSuccessNotification("Successfully!", "Đổi mật khẩu thành công");
            setTimeout(function () {}, 700);
          } else {
            openErrorNotification("Lỗi", res.data.message);
            setTimeout(function () {}, 700);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 2xl:col-span-2">
        <h3 className="mb-4 text-xl font-semibold ">Đổi mật khẩu</h3>
        <Form layout="vertical" onFinish={changePwd} form={passForm}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Form.Item
                label={
                  <p className="block text-sm font-medium text-gray-900 ">
                    Mật khẩu hiện tại
                  </p>
                }
                name="current_pass"
                rules={[
                  { required: true, message: "Không được bỏ trống ô này!" },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Form.Item
                label={
                  <p className="block text-sm font-medium text-gray-900 ">
                    Mật khẩu mới
                  </p>
                }
                name="new_pass"
                rules={[
                  { required: true, message: "Không được bỏ trống ô này!" },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item
                label={
                  <p className="block text-sm font-medium text-gray-900 ">
                    Nhập lại mật khẩu
                  </p>
                }
                name="check"
                dependencies={["new_pass"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống ô này!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_pass") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không trùng khớp!"),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
            </div>
          </div>
          <Button htmlType="submit">Ghi nhận</Button>
        </Form>
      </div>
    </>
  );
};

export default ChangePwdForm;
