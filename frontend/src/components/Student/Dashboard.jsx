import { Card } from "antd";
import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  FileOutlined,
  FileDoneOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Space, Table, Badge, Dropdown } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = ({ user }) => {
  const columns = [
    {
      title: "Mã môn học",
      dataIndex: "ma_hp",
      key: "ma_hp",
      width: 150,
    },
    {
      title: "Môn học",
      dataIndex: "ten_hp",
      key: "ten_hp",
      width: 200,
    },
    {
      title: "Số TC",
      dataIndex: "so_tin",
      key: "so_tin",
      width: 60,
    },
    {
      title: "Điểm hệ 10",
      dataIndex: "he10",
      key: "he10",
      width: 60,
    },
    {
      title: "Điểm chữ",
      dataIndex: "diem",
      key: "diem",
      width: 60,
    },
    {
      title: "Điểm hệ 4",
      dataIndex: "he4",
      key: "he4",
      width: 60,
    },
  ];

  const expand_columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "stt",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Bản chất kỳ thi",
      dataIndex: "type",
      key: "type",
      width: 200,
    },
    {
      title: "Hệ số",
      dataIndex: "he_so",
      key: "he_so",
      width: 60,
    },
    {
      title: "Lần thi",
      dataIndex: "lan",
      key: "lan",
      width: 60,
    },
    {
      title: "Điểm",
      dataIndex: "diem",
      key: "diem",
      width: 60,
    },
  ];
  const expandedRowRender = (record) => {
    return (
      <Table
        columns={expand_columns}
        dataSource={record.expand}
        size="small"
        pagination={false}
      />
    );
  };

  const [tong_so_tin, setTongSoTin] = useState(null);
  const [tong_so_tin_tich_luy, setTongSoTinTichLuy] = useState(null);
  const [gpa, setGpa] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .post("http://localhost:8000/overview", {
            username: user,
          })
          .then((res) => {
            setTongSoTin(res.data.tong_so_tin);
            setTongSoTinTichLuy(res.data.tong_so_tin_tich_luy);
            setGpa(res.data.gpa);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  const [semesters, setSemester] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .post("http://localhost:8000/grade", {
            username: user,
          })
          .then((res) => {
            setSemester(res.data.data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
      <div className="flex w-full flex-col gap-5">
        <div className="mt-8 flex flex-row justify-evenly gap-2 max-lg:flex-col md:gap-4 xl:gap-8">
          <Card
            hoverable={true}
            loading={false}
            className="w-1/3 shadow-lg max-lg:w-full"
          >
            <div className="flex flex-col items-center justify-center ">
              <div className="flex w-full flex-row justify-between">
                <div className="text-3xl font-bold text-black xl:text-5xl">
                  {tong_so_tin}
                </div>
                <FileOutlined className="flex rounded-full bg-[#2944df] p-4 text-2xl text-white hover:shadow-xl xl:text-3xl" />
              </div>
              <div className="mt-4 text-xl font-bold  text-black xl:text-2xl">
                Tổng tín chỉ
              </div>
            </div>
          </Card>
          <Card
            hoverable={true}
            loading={false}
            className="w-1/3 shadow-lg max-lg:w-full"
          >
            <div className="flex flex-col items-center justify-center ">
              <div className="flex w-full flex-row justify-between">
                <div className="text-3xl font-bold text-black xl:text-5xl">
                  {tong_so_tin_tich_luy}
                </div>
                <FileDoneOutlined className="flex rounded-full bg-[#1aaa6e] p-4 text-2xl text-white hover:shadow-xl xl:text-3xl" />
              </div>
              <div className="mt-4 text-xl font-bold text-black xl:text-2xl">
                Tổng tín chỉ tích luỹ
              </div>
            </div>
          </Card>
          <Card
            hoverable={true}
            loading={false}
            className="w-1/3 shadow-lg max-lg:w-full"
          >
            <div className="flex flex-col items-center justify-center ">
              <div className="flex w-full flex-row justify-between">
                <div className="text-3xl font-bold text-black xl:text-5xl">
                  {gpa}
                </div>
                <UserOutlined className="flex rounded-full bg-[#b36f16] p-4 text-2xl text-white hover:shadow-xl xl:text-3xl" />
              </div>
              <div className="mt-4 text-center text-xl font-bold text-black xl:text-2xl">
                GPA
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-8 flex flex-row justify-evenly gap-2 max-lg:flex-col md:gap-4 xl:gap-8">
          <Card
            hoverable={true}
            loading={false}
            className="w-2/3 overflow-auto shadow-lg max-lg:w-full"
          >
            {semesters.length == 0 ? (
              <>
                <Table
                  columns={columns}
                  pagination={false}
                  size="small"
                  scroll={{ x: 590 }}
                />
              </>
            ) : (
              <>
                {semesters.map((semester) => (
                  <>
                    <h1 className="pb-5 text-xl font-bold">
                      KÌ {semester.ki} NĂM {semester.nam} - {semester.nam + 1}
                    </h1>
                    <div className="pb-5">
                      <Table
                        rowKey={(record) => record.ma_hp}
                        columns={columns}
                        expandable={{
                          expandedRowRender: (record) =>
                            expandedRowRender(record),
                          // defaultExpandedRowKeys: ["0"],
                        }}
                        dataSource={semester.data}
                        pagination={false}
                        size="small"
                        scroll={{ x: 590 }}
                      />
                    </div>
                  </>
                ))}
              </>
            )}
          </Card>
          <Card
            hoverable={true}
            loading={false}
            className="w-1/3 self-start shadow-lg max-lg:w-full"
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur nobis cupiditate, excepturi optio molestiae impedit
              deserunt officiis, ratione ab dolores maiores expedita, esse modi
              consectetur nulla eos reprehenderit dolorum porro?
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
