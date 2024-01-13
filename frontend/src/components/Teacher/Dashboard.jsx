import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Select } from "antd";
import Manager from "./Manager";
import axios from "axios";
import Loading from "../../pages/Loading";

const Dashboard = ({ user }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Mã HK",
      dataIndex: "ma_hk",
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

  const [option, setOption] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [semester, setSemester] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const showInfo = (record) => {
    setSelectedRow(record);
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const onTableChange = (value, option) => {
    setSelectedSemester(option);
  };

  const [dataSchedule, setDataSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:8000/get_all_semester")
          .then((res) => {
            setOption(res.data);
            setSelectedSemester(res.data[0]);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    setTableLoading(true);
    const fetchData = async () => {
      try {
        if (selectedSemester !== null) {
          await axios
            .post("http://localhost:8000/teaching_schedule", {
              username: user,
              ma_hk: selectedSemester.value,
            })
            .then((res) => {
              setDataSchedule(res.data.schedule);
              setTableLoading(false);
            });
        }
      } catch (error) {
        console.log(error);
        setTableLoading(false);
      }
    };

    fetchData();
  }, [selectedSemester]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="flex flex-col justify-between sm:flex-row">
          <h1 className="text-xl font-bold m-1">Các lớp giảng dạy</h1>
          <Select
            defaultValue={option[0].value}
            options={option}
            onChange={onTableChange}
            className="m-1"
          ></Select>
        </div>
        <Table
          rowKey={(record) => record.ma_lh}
          columns={columns}
          dataSource={dataSchedule}
          pagination={false}
          scroll={{ x: 860 }}
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
  }
};

export default Dashboard;
