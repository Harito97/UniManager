import React, { useState } from "react";
import { Button, Table, Modal } from "antd";
import Manager from "./Manager";

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
  const [classData, setClassData] = useState([]);

  const showInfo = (record) => {
    setSelectedRow(record);
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };


  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSchedule = await axios.post('http://localhost:8001/teaching_schedule', {
          username: user
        });
        const data = responseSchedule.data;
        setData(data.schedule);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  // Data mẫu
  // const data = [
  //   {
  //     ma_lh: 1,
  //     ten_hp: "Cơ sở dữ liệu Web và hệ thống thông tin",
  //     ma_hp: "MAT3385",
  //     ma_lop: 1,
  //     da_dk: 30,
  //     lich_hoc: [
  //       { thu: "T2", bd: 1, kt: 2, phong: "103T4" },
  //       { thu: "T5", bd: 6, kt: 10, phong: "PM" },
  //     ],
  //   },
  // ];

  return (
    <>
      <h1 className="pb-5 text-xl font-bold">Các lớp đang giảng dạy</h1>
      <Table
        rowKey={(record) => record.ma_lh}
        columns={columns}
        dataSource={data}
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
            <h1 className="pb-5 text-xl font-bold">
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
