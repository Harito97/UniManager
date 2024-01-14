import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Table,
  Input,
  Space,
  Tag,
  Modal,
  Popconfirm,
  Form,
  Select,
} from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useContentContext } from "../Notification/ContentContext";

const UserManager = () => {
  const { openSuccessNotification, openErrorNotification } =
    useContentContext();
  const [userData, setUserData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const success = (new_pass) => {
    Modal.success({
      content: `Mật khẩu mới là ${new_pass}`,
    });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className="bg-blue-500"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:8000/get_all_user")
          .then((res) => setUserData(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChangePass = (record) => {
    axios
      .put("http://localhost:8000/reset_pass", {
        username: record.username,
      })
      .then((res) => {
        success(res.data.new_pass);
      });
    // console.log(record);
  };

  const handleDelete = (record) => {
    axios.delete(
      "http://localhost:8000/delete_user/" +
        record.username +
        "_" +
        record.access_level,
    );
    const updateUserData = userData.filter(
      (item) => item.username !== record.username,
    );
    setUserData(updateUserData);
  };

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      width: 200,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Quyền hạn",
      dataIndex: "access_level",
      width: 100,
      ...getColumnSearchProps("access_level"),
      render: (_, record) => {
        const role = record.access_level;
        if (role === "SV") {
          return (
            <Tag color="geekblue" key={role}>
              {role}
            </Tag>
          );
        } else if (role === "GV") {
          return (
            <Tag color="green" key={role}>
              {role}
            </Tag>
          );
        } else {
          return (
            <Tag color="volcano" key={role}>
              {role}
            </Tag>
          );
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 200,
      render: (_, record) => (
        <>
          <Popconfirm
            title="Bạn có chắc chắn muốn đặt lại mật khẩu?"
            onConfirm={() => handleChangePass(record)}
            okButtonProps={{ className: "bg-blue-500" }}
          >
            <Button type="link">Reset Password</Button>
          </Popconfirm>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá?"
            onConfirm={() => handleDelete(record)}
            okButtonProps={{ className: "bg-blue-500" }}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    axios.post("http://localhost:8000/add_new_user", values).then((res) => {
      if (res.data) {
        openSuccessNotification(
          "Thành công",
          `Đã thêm user ${values.username}`,
        );
        form.resetFields();
      } else {
        openErrorNotification("Lỗi", "Tên đăng nhập đã tồn tại!");
      }
    });
    // form.resetFields();
  };

  return (
    <>
      <Table
        rowKey={(record) => record.username}
        columns={columns}
        dataSource={userData}
        size="small"
      ></Table>
      <Button
        onClick={() => setOpenModal(true)}
        type="primary"
        className="bg-blue-500"
      >
        Thêm user
      </Button>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        // width={window.innerWidth > 800 ? 800 : "auto"}
        className="overflow-auto"
      >
        <p className="mb-5 text-xl font-bold">Thêm người dùng</p>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            required
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            required
            label="Quyền hạn"
            name="access_level"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Chọn quyền hạn cho tài khoản trên" allowClear>
              <Select.Option value="SV">SV</Select.Option>
              <Select.Option value="GV">GV</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            required
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Button htmlType="submit">Ghi nhận</Button>
        </Form>
      </Modal>
    </>
  );
};

export default UserManager;
