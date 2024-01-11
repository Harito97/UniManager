import { Table } from "antd";
import React, { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const Exam = ({ user }) => {
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Mã KT",
      dataIndex: "ma_kt",
      render: (_, record) => (
        <p>
          {record.ma_hk}-{record.ma_hp} {record.ma_lop}
        </p>
      ),
      width: 150,
    },
    {
      title: "Kỳ thi",
      dataIndex: "ten_hp",
      width: 280,
    },
    {
      title: "Ca thi",
      dataIndex: "ca_thi",
      render: (_, record) => {
        const data_exam = record.lich_thi;
        return data_exam.map((info) => (
          <p>
            {info.ca_thi}({info.gio_thi})
          </p>
        ));
      },
      width: 70,
    },
    {
      title: "Ngày thi",
      dataIndex: "ngay_thi",
      render: (_, record) => {
        const data_exam = record.lich_thi;
        return data_exam.map((info) => <p>{info.ngay_thi}</p>);
      },
      width: 100,
    },
    {
      title: "H.Thức thi",
      dataIndex: "hinh_thuc",
      render: (_, record) => {
        const data_exam = record.lich_thi;
        return data_exam.map((info) => <p>{info.hinh_thuc}</p>);
      },
      width: 150,
    },
    {
      title: "Phòng",
      dataIndex: "phong",
      render: (_, record) => {
        const data_exam = record.lich_thi;
        return data_exam.map((info) => <p>{info.phong}</p>);
      },
      width: 100,
    },
    {
      title: "Huỷ ĐK",
      dataIndex: "huy",
      render: (_, record) => (
        <a href={"#"}>
          <DeleteOutlined className="text-red-700" />
        </a>
      ),
      width: 100,
    },
  ];

  const [exam, setExam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .post("http://localhost:8000/schedule_exam", {
            username: user,
          })
          .then((res) => setExam(res.data.exam))
          .finally(() => setLoading(false));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <div
        className="headline"
        style={{ fontSize: "1.5rem", marginBottom: "10px" }}
      >
        <strong>Lịch thi</strong>
      </div>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={exam}
        pagination={false}
        loading={loading}
      />
    </>
  );
};

export default Exam;
