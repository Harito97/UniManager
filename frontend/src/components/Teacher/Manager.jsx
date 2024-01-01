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
            <Form.Item
              name="diem_tx"
              rules={[
                () => ({
                  validator(_, value) {
                    const diem_tx = parseFloat(value);
                    if (
                      isNaN(diem_tx) ||
                      (!isNaN(diem_tx) && diem_tx >= 0 && diem_tx <= 10)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Điểm phải trong đoạn [0, 10]");
                  },
                }),
              ]}
            >
              <Input
                type="number"
                className="[&::-webkit-inner-spin-button]:appearance-none"
              />
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
            <Form.Item
              name="he_so_tx"
              rules={[
                () => ({
                  validator(_, value) {
                    const he_so_tx = parseFloat(value);
                    if (
                      isNaN(he_so_tx) ||
                      (!isNaN(he_so_tx) && he_so_tx > 0 && he_so_tx < 1)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Hệ số phải trong khoảng (0, 1) ");
                  },
                }),
              ]}
            >
              <Input
                type="number"
                className="[&::-webkit-inner-spin-button]:appearance-none"
              />
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
            <Form.Item
              name="diem_gk"
              rules={[
                () => ({
                  validator(_, value) {
                    const diem_gk = parseFloat(value);
                    if (
                      isNaN(diem_gk) ||
                      (!isNaN(diem_gk) && diem_gk >= 0 && diem_gk <= 10)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Điểm phải trong đoạn [0, 10]");
                  },
                }),
              ]}
            >
              <Input
                type="number"
                className="[&::-webkit-inner-spin-button]:appearance-none"
              />
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
            <Form.Item
              name="he_so_gk"
              rules={[
                () => ({
                  validator(_, value) {
                    const he_so_gk = parseFloat(value);
                    if (
                      isNaN(he_so_gk) ||
                      (!isNaN(he_so_gk) && he_so_gk > 0 && he_so_gk < 1)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Hệ số phải trong khoảng (0, 1) ");
                  },
                }),
              ]}
            >
              <Input
                type="number"
                className="[&::-webkit-inner-spin-button]:appearance-none"
              />
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
            <Form.Item
              name="diem_ck"
              rules={[
                () => ({
                  validator(_, value) {
                    const diem_ck = parseFloat(value);
                    if (
                      isNaN(diem_ck) ||
                      (!isNaN(diem_ck) && diem_ck >= 0 && diem_ck <= 10)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Điểm phải trong đoạn [0, 10]");
                  },
                }),
              ]}
            >
              <Input
                type="number"
                className="[&::-webkit-inner-spin-button]:appearance-none"
              />
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
            <Form.Item
              name="he_so_ck"
              rules={[
                () => ({
                  validator(_, value) {
                    const he_so_ck = parseFloat(value);
                    if (
                      isNaN(he_so_ck) ||
                      (!isNaN(he_so_ck) && he_so_ck > 0 && he_so_ck < 1)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Hệ số phải trong khoảng (0, 1) ");
                  },
                }),
              ]}
            >
              <Input
                type="number"
                className="[&::-webkit-inner-spin-button]:appearance-none"
              />
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
    // Lưu ý các giá trị đang là kiểu String, cần parseFloat và làm tròn đến số thập phân thứ 2 trước khi update vào server
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
