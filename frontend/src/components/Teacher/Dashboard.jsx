import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "antd";
import Manager from "./Manager";
import axios from "axios";


const Dashboard = ({ user }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    { title: "Môn học", dataIndex: "ten_hp", width: 300 },
    {
      title: "Lớp môn học",
      dataIndex: "ma_hp_lop",
      width: 100,
      render: (_, record) => (
        <p>
          {record.ma_hp} {record.ma_lop}
        </p>
      ),
    },
    { title: "Số SV", dataIndex: "da_dk", width: 60 },
    {
      title: "Lịch học",
      dataIndex: "lich_hoc",
      width: 200,
      render: (_, record) => {
        const time_data = record.lich_hoc;
        return time_data.map((t) => (
          <p>
            {t.thu}-({t.bd}-{t.kt})-{t.phong}
          </p>
        ));
      },
    },
    {
      title: "Xem lớp",
      dataIndex: "view",
      width: 100,
      render: (_, record) => (
        <Button onClick={() => showInfo(record)}>Chi tiết</Button>
      ),
    },
  ];

  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [semester, setSemester] = useState([]);

  const showInfo = (record) => {
    setSelectedRow(record);
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };


  const [dataSchedule, setDataSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSchedule = await axios.post('http://localhost:8000/teaching_schedule', {
          username: user
        });
        const data = responseSchedule.data;
        setDataSchedule(data.schedule);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);
  console.log(dataSchedule)

  return (
    <>
      <h1 className="pb-5 text-xl font-bold">Các lớp đang giảng dạy</h1>
      <Table
        rowKey={(record) => record.ma_lh}
        columns={columns}
        dataSource={dataSchedule}
        pagination={false}
        scroll={{ x: 810 }}
      ></Table>
      <Modal
        open={showModal}
        onCancel={handleModalCancel}
        footer={null}
        width={window.innerWidth > 800 ? 800 : "auto"}
        className="overflow-auto"
      >
        {selectedRow && (
          <>
            <h1 className="pb-3 text-xl font-bold">
              Danh sách sinh viên lớp {selectedRow.ma_hp} {selectedRow.ma_lop}
            </h1>
            <Manager ma_lh={selectedRow.ma_lh} />
          </>
        )}
      </Modal>
    </>
  );
};

export default Dashboard;
