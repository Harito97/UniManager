import React, { useState, useEffect } from "react";
import {
  Table,
  Select,
  Popconfirm,
  Button,
  Form,
  DatePicker,
  Input,
  Modal,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useContentContext } from "../Notification/ContentContext";

const SemesterConfig = () => {
  const { openSuccessNotification, openErrorNotification } =
    useContentContext();
  const [semesterData, setSemesterData] = useState([]);
  const [regisData, setRegisData] = useState([]);
  const [openHKForm, setOpenHKForm] = useState(false);
  const [openDKForm, setOpenDKForm] = useState(false);
  const [HKform] = Form.useForm();
  const [DKform] = Form.useForm();

  const semesterColumns = [
    { title: "Mã HK", dataIndex: "ma_hk", width: 100 },
    { title: "Ngày BĐ", dataIndex: "ng_bat_dau", width: 150 },
    { title: "Ngày KT", dataIndex: "ng_ket_thuc", width: 150 },
    {
      title: "Huỷ",
      dataIndex: "delete",
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xoá?"
          onConfirm={() => handleDeleteSemester(record)}
          okButtonProps={{ className: "bg-blue-500" }}
        >
          <DeleteOutlined className="text-red-500" />
        </Popconfirm>
      ),
    },
  ];

  const regisColumns = [
    { title: "Đợt ĐK", dataIndex: "dot", width: 100 },
    { title: "Mã HK", dataIndex: "ma_hk", width: 100 },
    { title: "Ngày BĐ", dataIndex: "ng_bat_dau", width: 150 },
    { title: "Ngày KT", dataIndex: "ng_ket_thuc", width: 150 },
    {
      title: "Huỷ",
      dataIndex: "delete",
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xoá?"
          onConfirm={() => handleDeleteRegis(record)}
          okButtonProps={{ className: "bg-blue-500" }}
        >
          <DeleteOutlined className="text-red-500" />
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:8000/get_semester")
          .then((res) => setSemesterData(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:8000/get_regis")
          .then((res) => setRegisData(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [showHK, setShowHK] = useState(true);

  const handleDeleteSemester = (record) => {
    axios
      .delete(
        "http://localhost:8000/delete_semester/" + record.ma_hk.toString(),
      )
      .then((res) => {
        if (res.data) {
          const updateSemesterData = semesterData.filter(
            (item) => item.ma_hk !== record.ma_hk,
          );
          setSemesterData(updateSemesterData);
        } else {
          openErrorNotification(
            "Có lỗi xảy ra!",
            "Hãy xoá các đợt đăng kí có mã học kì này",
          );
        }
      });
  };

  const handleDeleteRegis = (record) => {
    axios.delete(
      "http://localhost:8000/delete_regis/" +
        record.ma_hk.toString() +
        "_" +
        record.dot.toString(),
    );
    const updateRegisData = regisData.filter(
      (item) => !(item.ma_hk === record.ma_hk && item.dot === record.dot),
    );
    setRegisData(updateRegisData);
  };

  const onSelectChange = (value) => {
    if (value == 1) {
      setShowHK(true);
    } else {
      setShowHK(false);
    }
  };

  const onSemesAdd = (values) => {
    const ng_bat_dau = values.ng_bat_dau.$d
      .toLocaleString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");
    const ng_ket_thuc = values.ng_ket_thuc.$d
      .toLocaleString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");

    const newRecord = {
      ma_hk: values.ma_hk,
      ng_bat_dau: ng_bat_dau,
      ng_ket_thuc: ng_ket_thuc,
    };

    axios.post("http://localhost:8000/add_semes/", newRecord).then((res) => {
      if (res.data) {
        openSuccessNotification("Thành công", `Đã thêm học kì ${values.ma_hk}`);
        const updateSemesterData = [newRecord, ...semesterData];
        setSemesterData(updateSemesterData);
        HKform.resetFields();
        setOpenHKForm(false);
      } else {
        openErrorNotification("Lỗi", "Học kì đã tồn tại");
      }
    });
  };

  const onRegisAdd = (values) => {
    const ng_bat_dau = values.ng_bat_dau.$d
      .toLocaleString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");
    const ng_ket_thuc = values.ng_ket_thuc.$d
      .toLocaleString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");
    const newRecord = {
      dot: values.dot,
      ma_hk: values.ma_hk,
      ng_bat_dau: ng_bat_dau,
      ng_ket_thuc: ng_ket_thuc,
    };

    axios.post("http://localhost:8000/add_regis/", newRecord).then((res) => {
      if (res.data) {
        openSuccessNotification(
          "Thành công",
          `Đã thêm đợt ${values.dot} của học kì ${values.ma_hk}`,
        );
        const updateRegisData = [newRecord, ...regisData];
        setRegisData(updateRegisData);
        DKform.resetFields();
        setOpenDKForm(false);
      } else {
        openErrorNotification("Lỗi", "Đợt đăng kí đã tồn tại");
      }
    });
  };

  return (
    <>
      <Select
        defaultValue={1}
        options={[
          { value: 1, label: "Học kì" },
          { value: 2, label: "Đợt đăng kí" },
        ]}
        onChange={onSelectChange}
        className="mb-5"
      ></Select>
      {showHK ? (
        <>
          <Table columns={semesterColumns} dataSource={semesterData}></Table>
          <Button onClick={() => setOpenHKForm(true)}>Thêm</Button>
        </>
      ) : (
        <>
          <Table columns={regisColumns} dataSource={regisData}></Table>
          <Button onClick={() => setOpenDKForm(true)}>Thêm</Button>
        </>
      )}
      <Modal
        open={openHKForm}
        onCancel={() => setOpenHKForm(false)}
        footer={null}
        // width={window.innerWidth > 800 ? 800 : "auto"}
        className="overflow-auto"
      >
        <p className="mb-5 text-xl font-bold">Thêm học kì</p>
        <Form form={HKform} onFinish={onSemesAdd}>
          <Form.Item
            label="Mã HK"
            name="ma_hk"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày BĐ"
            name="ng_bat_dau"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker allowClear />
          </Form.Item>
          <Form.Item
            label="Ngày KT"
            name="ng_ket_thuc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker allowClear />
          </Form.Item>
          <Button htmlType="submit">Ghi nhận</Button>
        </Form>
      </Modal>
      <Modal
        open={openDKForm}
        onCancel={() => setOpenDKForm(false)}
        footer={null}
        // width={window.innerWidth > 800 ? 800 : "auto"}
        className="overflow-auto"
      >
        <p className="mb-5 text-xl font-bold">Thêm đợt đăng kí</p>
        <Form form={DKform} onFinish={onRegisAdd}>
          <Form.Item
            label="Đợt"
            name="dot"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã HK"
            name="ma_hk"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Chọn mã học kì" allowClear>
              {semesterData.map((item) => (
                <Select.Option value={item.ma_hk}>{item.ma_hk}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Ngày BĐ"
            name="ng_bat_dau"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker allowClear />
          </Form.Item>
          <Form.Item
            label="Ngày KT"
            name="ng_ket_thuc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker allowClear />
          </Form.Item>
          <Button htmlType="submit">Ghi nhận</Button>
        </Form>
      </Modal>
    </>
  );
};

export default SemesterConfig;
