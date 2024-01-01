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
                diem_gk: record.diem_gk,
                diem_ck: record.diem_ck,
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
      diem_gk: 9,
      diem_ck: 8,
    },
    {
      ma_sv: 21002111,
      ho_ten: "Nguyễn Văn B",
      diem_tx: null,
      diem_gk: null,
      diem_ck: null,
    },
    {
      ma_sv: 21002112,
      ho_ten: "Nguyễn Văn C",
      diem_tx: null,
      diem_gk: null,
      diem_ck: null,
    },
    {
      ma_sv: 21002113,
      ho_ten: "Nguyễn Văn D",
      diem_tx: null,
      diem_gk: null,
      diem_ck: null,
    },
  ]);

  //Data hệ số, lấy từ bảng lịch học có ma_lh trùng
  const [factorData, setFactorData] = useState([
    { he_so_tx: null, he_so_gk: null, he_so_ck: null },
  ]);

  const [editingFactor, setEditingFactor] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [factorForm] = Form.useForm();

  const onChange = (e) => {
    const formData = factorForm.getFieldsValue();
    console.log(formData);
    const he_so_tx = parseFloat(formData.he_so_tx);
    const he_so_gk = parseFloat(formData.he_so_gk);
    if (!isNaN(he_so_tx) && !isNaN(he_so_gk)) {
      factorForm.setFieldsValue({
        he_so_ck: (1 - he_so_tx - he_so_gk).toFixed(2).toString(),
      });
    }
  };

  const onFactorFinish = (values) => {
    console.log(values);
    //TODO: Update hệ số trong bảng lich_hoc có ma_lh tương ứng
    // Lưu ý, các values đang là String, cần parseFloat trước khi gửi
    setFactorData(values);
    setEditingFactor(false);
  };

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
      <div className="mb-5 flex flex-col md:flex-row justify-between">
        {editingFactor ? (
          <>
            <Form
              layout={window.innerWidth > 768 ? "inline" : "horizontal"}
              form={factorForm}
              onFinish={onFactorFinish}
            >
              <Form.Item
                label="Hệ số TX"
                name="he_so_tx"
                rules={[
                  () => ({
                    validator(_, value) {
                      const he_so_tx = parseFloat(value);
                      if (
                        isNaN(he_so_tx) ||
                        (!isNaN(he_so_tx) && he_so_tx > 0 && he_so_tx < 0.4)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Hệ số phải trong khoảng (0, 0.4) ",
                      );
                    },
                  }),
                ]}
              >
                <Input
                  type="number"
                  className="[&::-webkit-inner-spin-button]:appearance-none"
                  onChange={onChange}
                  style={{ width: "100px" }}
                />
              </Form.Item>
              <Form.Item
                label="Hệ số GK"
                name="he_so_gk"
                rules={[
                  () => ({
                    validator(_, value) {
                      const he_so_gk = parseFloat(value);
                      if (
                        isNaN(he_so_gk) ||
                        (!isNaN(he_so_gk) && he_so_gk > 0 && he_so_gk < 0.4)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Hệ số phải trong khoảng (0, 0.4) ",
                      );
                    },
                  }),
                ]}
              >
                <Input
                  type="number"
                  className="[&::-webkit-inner-spin-button]:appearance-none"
                  onChange={onChange}
                  style={{ width: "100px" }}
                />
              </Form.Item>
              <Form.Item
                label="Hệ số CK"
                name="he_so_ck"
                rules={[
                  () => ({
                    validator(_, value) {
                      const he_so_ck = parseFloat(value);
                      if (
                        isNaN(he_so_ck) ||
                        (!isNaN(he_so_ck) && he_so_ck >= 0.6 && he_so_ck < 1)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Hệ số phải trong nửa khoảng [0.6, 1) ",
                      );
                    },
                  }),
                ]}
              >
                <Input
                  type="number"
                  className="[&::-webkit-inner-spin-button]:appearance-none"
                  disabled
                  style={{ width: "100px" }}
                />
              </Form.Item>
              <Button htmlType="submit">Save</Button>
            </Form>
          </>
        ) : (
          <>
            <p>Hệ số TX: {factorData.he_so_tx}</p>
            <p>Hệ số GK: {factorData.he_so_gk}</p>
            <p>Hệ số CK: {factorData.he_so_ck}</p>
            <Button
              onClick={() => {
                setEditingFactor(true);
              }}
            >
              Edit
            </Button>
          </>
        )}
      </div>
      <Form form={form} onFinish={onFinish}>
        <Table
          rowKey={(record) => record.ma_sv}
          columns={columns}
          dataSource={data}
          scroll={{ x: 730 }}
          pagination={false}
          size="small"
        ></Table>
      </Form>
    </>
  );
};

export default Manager;
