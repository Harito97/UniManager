import React, { useState, useEffect } from "react";
import ProfileImg from "../../assets/avatar/default.jpg";
import { Button, Form, Input, Upload, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { storage } from "../../constants/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useContentContext } from "../../context/UserContext";
import axios from "axios";
import ChangePwdForm from "../Home/ChangePwdForm";

const UserProfile = () => {
  const { openSuccessNotification, openErrorNotification, getToken, user } =
    useContentContext();

  const [form] = Form.useForm();
  const [passForm] = Form.useForm();
  const [imgURL, setimgURL] = useState(null);

  const uploadImage = (values) => {
    const imageRef = ref(storage, `images/${values.file.name + v4()}`);
    uploadBytes(imageRef, values.file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        //TODO: thay đổi đường link avatar trong DB
        setimgURL(url);
        axios.put(
          "http://localhost:8000/put_image",
          {
            avatar: url,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getToken(),
            },
          },
        );
      });
    });
  };

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:8000/info_student", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getToken(),
            },
          })
          .then((res) => {
            setUserData(res.data.info);
            setimgURL(res.data.info.avatar);
            form.setFieldsValue({
              sdt: res.data.info.sdt,
              email: res.data.info.email,
            });
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const submitData = (values) => {
    try {
      axios
        .put(
          "http://localhost:8000/put_info_student",
          {
            sdt: values.sdt,
            email: values.email,
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
            openSuccessNotification(
              "Thành công",
              "Thông tin đã được cập nhật!",
            );
          } else {
            openErrorNotification("Lỗi", res.data.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAvatar = () => {
    setimgURL(null);
    //TODO: chuyển giá trị avatar về null
    try {
      axios.delete("http://localhost:8000/delete_avatar", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 px-4 pt-6  xl:grid-cols-3 xl:gap-4">
        <div className="col-span-full mb-4 xl:mb-2">
          <h1 className="text-xl font-bold text-gray-900  sm:text-2xl">
            Thông tin sinh viên
          </h1>
        </div>
        <div className="col-span-full xl:col-auto">
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm   sm:p-6 2xl:col-span-2">
            <div className="items-center sm:flex sm:space-x-4 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4">
              <img
                className="mb-4 h-28 w-28 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0"
                src={imgURL !== null ? imgURL : ProfileImg}
                alt="Avatar"
              />
              <div>
                <p className="mb-1 text-xl font-bold text-gray-900 ">
                  {userData.ho_ten}
                </p>
                <p className="mb-1 text-gray-900 ">Mã SV: {user}</p>
                <p className="mb-1 text-gray-900 ">
                  Lớp: {userData.lop} {userData.nganh}
                </p>
                <p className="mb-1 text-gray-900 ">
                  Ngày sinh: {userData.ngsinh}
                </p>
                <p className="mb-1 text-gray-900 ">
                  Giới tính: {userData.gioi_tinh}
                </p>
                <div className="flex items-center space-x-4">
                  <ImgCrop
                    rotationSlider
                    modalProps={{ okButtonProps: { className: "bg-blue-500" } }}
                  >
                    <Upload
                      accept=".png,.jpeg"
                      showUploadList={false}
                      listType="picture"
                      multiple={false}
                      // beforeUpload={() => false}
                      // onChange={uploadImage}
                      customRequest={uploadImage}
                    >
                      <Button
                        type="primary"
                        icon={<UploadOutlined />}
                        className="bg-blue-500"
                      >
                        Tải ảnh lên
                      </Button>
                    </Upload>
                  </ImgCrop>
                  <Popconfirm
                    title="Xoá ảnh"
                    description="Bạn có chắc chắn muốn xoá ảnh ?"
                    onConfirm={deleteAvatar}
                    okButtonProps={{ className: "bg-blue-500" }}
                  >
                    <Button danger>Xoá ảnh</Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 2xl:col-span-2">
            <h3 className="mb-4 text-xl font-semibold ">Thông tin chung</h3>
            <Form layout="vertical" form={form} onFinish={submitData}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Form.Item
                    label={
                      <p className="block text-sm font-medium text-gray-900 ">
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
                      <p className="block text-sm font-medium text-gray-900 ">
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
          <ChangePwdForm />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
