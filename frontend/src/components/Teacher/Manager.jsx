import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";

const Manager = ({ ma_lh }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    { title: "MSV", dataIndex: "ma_sv", width: 100 },
    { title: "Họ và tên", dataIndex: "ho_ten", width: 200 },
    {
      title: "Điểm TX",
      dataIndex: "diem_tx",
      width: 60,
      render: (text, record) => {
        if (editingRow === record.ma_sv) {
          return (
            <Form.Item name="diem_tx">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Hệ số TX",
      dataIndex: "he_so_tx",
      width: 60,
      render: (text, record) => {
        if (editingRow === record.ma_sv) {
          return (
            <Form.Item name="he_so_tx">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Điểm GK",
      dataIndex: "diem_gk",
      width: 60,
      render: (text, record) => {
        if (editingRow === record.ma_sv) {
          return (
            <Form.Item name="diem_gk">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Hệ số GK",
      dataIndex: "he_so_gk",
      width: 60,
      render: (text, record) => {
        if (editingRow === record.ma_sv) {
          return (
            <Form.Item name="he_so_gk">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Điểm CK",
      dataIndex: "diem_ck",
      width: 60,
      render: (text, record) => {
        if (editingRow === record.ma_sv) {
          return (
            <Form.Item name="diem_ck">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Hệ số CK",
      dataIndex: "he_so_ck",
      width: 60,
      render: (text, record) => {
        if (editingRow === record.ma_sv) {
          return (
            <Form.Item name="he_so_ck">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Actions",
      width: 200,
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setEditingRow(record.ma_sv);
              form.setFieldsValue({
                diem_tx: record.diem_tx,
                he_so_tx: record.he_so_tx,
                diem_gk: record.diem_gk,
                he_so_gk: record.he_so_gk,
                diem_ck: record.diem_ck,
                he_so_ck: record.he_so_ck,
              });
            }}
          >
            Edit
          </Button>
          <Button type="link" htmlType="submit">
            Save
          </Button>
        </>
      ),
    },
  ];

  // Data mẫu
  // Sau này lấy data bằng cách lấy ra các sinh viên có ma_lh này
  const [data, setData] = useState([
    {
      ma_sv: 21002110,
      ho_ten: "Nguyễn Văn A",
      diem_tx: 10,
      he_so_tx: 0.2,
      diem_gk: 9,
      he_so_gk: 0.2,
      diem_ck: 8,
      he_so_ck: 0.6,
    },
    { ma_sv: 21002111, ho_ten: "Nguyễn Văn B" },
    { ma_sv: 21002112, ho_ten: "Nguyễn Văn C" },
    { ma_sv: 21002113, ho_ten: "Nguyễn Văn D" },
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    //TODO: Update data trong bảng dang_ki của ma_lh ma_sv với values đã save
    // ma_sv = editingRow
    // values chứ các thuộc tính diem_tx, he_so_tx, ...
    const updateData = data.map((obj) =>
      obj.ma_sv === editingRow ? { ...obj, ...values } : obj,
    );
    setData(updateData);
    setEditingRow(null);
  };

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Table
          rowKey={(record) => record.ma_sv}
          columns={columns}
          dataSource={data}
          scroll={{ x: 910 }}
          pagination={false}
          size="small"
        ></Table>
      </Form>
    </>
  );
};

export default Manager;
