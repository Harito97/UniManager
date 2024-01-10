import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Table, Modal } from "antd";
import axios from "axios";

const Manager = ({ ma_lh }) => {
  const [showModal, setShowModel] = useState(false);

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

  const [dataStudentClass, setDataStudentClass] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .post("http://localhost:8000/student_class", {
            ma_lh: ma_lh,
          })
          .then((res) => {
            setDataStudentClass(res.data.studentClass);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [ma_lh]);

  //Data hệ số, lấy từ bảng lịch học có ma_lh trùng
  const [factorData, setFactorData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .post("http://localhost:8000/coefficient_subject", {
            ma_lh: ma_lh,
          })
          .then((res) => {
            setFactorData(res.data.coefficient);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [ma_lh]);

  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [factorForm] = Form.useForm();

  const onChange = (e) => {
    const formData = factorForm.getFieldsValue();
    // console.log(formData);
    const he_so_tx = parseFloat(formData.he_so_tx);
    const he_so_gk = parseFloat(formData.he_so_gk);
    if (!isNaN(he_so_tx) && !isNaN(he_so_gk)) {
      factorForm.setFieldsValue({
        he_so_ck: (1 - he_so_tx - he_so_gk).toFixed(2).toString(),
      });
    } else {
      factorForm.setFieldsValue({
        he_so_ck: "",
      });
    }
  };

  const onFactorFinish = (values) => {
    const he_so_tx = parseFloat(values.he_so_tx);
    const he_so_gk = parseFloat(values.he_so_gk);
    const he_so_ck = parseFloat(values.he_so_ck);

    try {
      axios.put("http://localhost:8000/put_coefficient", {
        ma_lh: ma_lh,
        he_so_tx: isNaN(he_so_tx) ? null : he_so_tx,
        he_so_gk: isNaN(he_so_gk) ? null : he_so_gk,
        he_so_ck: isNaN(he_so_ck) ? null : he_so_ck,
      });
    } catch (e) {
      console.log(e);
    }

    setFactorData(values);
    setShowModel(false);
  };

  const onFinish = (values) => {
    const diem_tx = parseFloat(values.diem_tx);
    const diem_gk = parseFloat(values.diem_gk);
    const diem_ck = parseFloat(values.diem_ck);

    try {
      axios.put("http://localhost:8000/put_dangky", {
        ma_lh: ma_lh,
        ma_sv: editingRow,
        diem_tx: isNaN(diem_tx) ? null : parseFloat(diem_tx.toFixed(2)),
        diem_gk: isNaN(diem_gk) ? null : parseFloat(diem_gk.toFixed(2)),
        diem_ck: isNaN(diem_ck) ? null : parseFloat(diem_ck.toFixed(2)),
      });
    } catch (e) {
      console.log(e);
    }

    const updateData = dataStudentClass.map((obj) =>
      obj.ma_sv === editingRow ? { ...obj, ...values } : obj,
    );

    setDataStudentClass(updateData);
    setEditingRow(null);
  };

  return (
    <>
      <Modal
        open={showModal}
        onCancel={() => setShowModel(false)}
        footer={null}
        closable={false}
      >
        <h1 className="pb-5 text-xl font-bold">Điều chỉnh hệ số</h1>
        <Form form={factorForm} onFinish={onFactorFinish}>
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
                  return Promise.reject("Hệ số phải trong khoảng (0, 0.4) ");
                },
              }),
            ]}
          >
            <Input
              pattern="^\d*\.\d{0,2}$"
              className="[&::-webkit-inner-spin-button]:appearance-none"
              onChange={onChange}
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
                  return Promise.reject("Hệ số phải trong khoảng (0, 0.4) ");
                },
              }),
            ]}
          >
            <Input
              pattern="^\d*\.\d{0,2}$"
              className="[&::-webkit-inner-spin-button]:appearance-none"
              onChange={onChange}
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
            <Input disabled />
          </Form.Item>
          <Button htmlType="submit">Save</Button>
        </Form>
      </Modal>
      <div className="mb-2 flex gap-5">
        <p className="mt-1.5 font-bold">Hệ số TX: {factorData.he_so_tx}</p>
        <p className="mt-1.5 font-bold">Hệ số GK: {factorData.he_so_gk}</p>
        <p className="mt-1.5 font-bold">Hệ số CK: {factorData.he_so_ck}</p>
        <Button
          className="mb-1 flex"
          onClick={() => {
            setShowModel(true);
            factorForm.setFieldsValue(factorData);
          }}
        >
          Edit
        </Button>
      </div>
      <Form form={form} onFinish={onFinish}>
        <Table
          rowKey={(record) => record.ma_sv}
          columns={columns}
          dataSource={dataStudentClass}
          scroll={{ x: 730 }}
          pagination={false}
          size="small"
        ></Table>
      </Form>
    </>
  );
};

export default Manager;
