import React, { useState, useEffect } from "react";
import { Table, Select, Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useContentContext } from "../Notification/ContentContext";

const SemesterConfig = () => {
  const { openSuccessNotification, openErrorNotification } =
    useContentContext();
  const [semesterData, setSemesterData] = useState([]);
  const [regisData, setRegisData] = useState([]);

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
            openErrorNotification("Có lỗi xảy ra!", "Hãy xoá các đợt đăng kí có mã học kì này")
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
          <Button>Thêm</Button>
        </>
      ) : (
        <>
          <Table columns={regisColumns} dataSource={regisData}></Table>
          <Button>Thêm</Button>
        </>
      )}
    </>
  );
};

export default SemesterConfig;
