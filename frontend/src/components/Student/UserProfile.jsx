import React from "react";
import ProfileImg from "../../assets/avatar/DA.jpg";
import { Button, Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UserProfile = ({ user }) => {
  const [form] = Form.useForm();
  const [passForm] = Form.useForm();

  //Data mẫu
  const userData = {
    ho_ten: "Nguyễn Văn A",
    gioi_tinh: "Nam",
    ngsinh: "1/1/2003",
    sdt: "0912312345",
    email: "fakeemail@gmail.com",
    nganh: "Khoa học dữ liệu",
    lop: "K66A5",
  };

  // Set field của form
  form.setFieldsValue({
    sdt: userData.sdt,
    email: userData.email,
  });

  const submitData = (values) => {
    console.log(values);
    //TODO: Update data tương ứng
  };

  const changePwd = (values) => {
    console.log(values);
    //TODO: Update data tương ứng
  };

  return (
    <>
      <div className="grid grid-cols-1 px-4 pt-6 dark:bg-gray-900 xl:grid-cols-3 xl:gap-4">
        <div className="col-span-full mb-4 xl:mb-2">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            Thông tin sinh viên
          </h1>
        </div>
        <div className="col-span-full xl:col-auto">
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 2xl:col-span-2">
            <div className="items-center sm:flex sm:space-x-4 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4">
              <img
                className="mb-4 h-28 w-28 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0"
                src={ProfileImg}
                alt="Avatar"
              />
              <div>
                <p className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                  {userData.ho_ten}
                </p>
                <p className="mb-1 text-gray-900 dark:text-white">
                  Mã SV: {user}
                </p>
                <p className="mb-1 text-gray-900 dark:text-white">
                  Lớp: {userData.lop} {userData.nganh}
                </p>
                <p className="mb-1 text-gray-900 dark:text-white">
                  Ngày sinh: {userData.ngsinh}
                </p>
                <p className="mb-1 text-gray-900 dark:text-white">
                  Giới tính: {userData.gioi_tinh}
                </p>
                <div className="flex items-center space-x-4">
                  <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    className="bg-blue-500"
                  >
                    Tải ảnh lên
                  </Button>
                  <Button danger>Xoá ảnh</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 2xl:col-span-2">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Thông tin chung
            </h3>
            <Form layout="vertical" form={form} onFinish={submitData}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Form.Item
                    label={
                      <p className="block text-sm font-medium text-gray-900 dark:text-white">
                        Số ĐT
                      </p>
                    }
                    name="sdt"
                  >
                    <Input type="tel" size="large" pattern="^\d{10}" />
                  </Form.Item>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Form.Item
                    label={
                      <p className="block text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </p>
                    }
                    name="email"
                  >
                    <Input size="large" type="email" />
                  </Form.Item>
                </div>
              </div>
              <Button htmlType="submit">Ghi nhận</Button>
            </Form>
          </div>
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 2xl:col-span-2">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Đổi mật khẩu
            </h3>
            <Form layout="vertical" onFinish={changePwd} form={passForm}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Form.Item
                    label={
                      <p className="block text-sm font-medium text-gray-900 dark:text-white">
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
                      <p className="block text-sm font-medium text-gray-900 dark:text-white">
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
                      <p className="block text-sm font-medium text-gray-900 dark:text-white">
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
        </div>
      </div>
    </>
  );
};

export default UserProfile;