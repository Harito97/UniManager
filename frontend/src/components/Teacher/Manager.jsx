import React from "react";
import { Table } from "antd";

const Manager = ({ ma_lh }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    { title: "Họ và tên", dataIndex: "ho_ten", width: 200 },
    { title: "Điểm TX", dataIndex: "diem_tx", width: 60 },
    { title: "Hệ số TX", dataIndex: "he_so_tx", width: 60 },
    { title: "Điểm GK", dataIndex: "diem_gk", width: 60 },
    { title: "Hệ số GK", dataIndex: "he_so_gk", width: 60 },
    { title: "Điểm CK", dataIndex: "diem_ck", width: 60 },
    { title: "Hệ số CK", dataIndex: "he_so_ck", width: 60 },
  ];
  return (
    <>
     <Table columns={columns} scroll={{ x: 610 }} size="small"></Table>
    </>
  );
};

export default Manager;
