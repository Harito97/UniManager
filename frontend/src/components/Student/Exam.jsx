import { Table } from "antd";
import React from "react";

const Exam = ({ user }) => {
  const columns = [
    {
      title: "STT",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Mã KT",
      render: (_, record) => <p>{ma_hk}-{ma_hp} {ma_lop}</p>,
      width: 150,
    },
    {
      title: "Kỳ thi",
      dataIndex: "ten_hp",
      width: 300,
    },
    {
      title: "Ca thi",
      width: 50,
    },
    {
      title: "Giờ thi",
      width: 100,
    },
    {
      title: "H.Thức thi",
      width: 150,
    },
    {
      title: "Phòng",
      width: 100,
    },
    {
      title: "Huỷ ĐK",
      width: 100,
    }
  ];

  return (
    <>
      <h1>Lịch</h1>
      <Table columns={columns}>

      </Table>
    </>
  );
};

export default Exam;
