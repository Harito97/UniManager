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

// const columns = [
//   {
//     title: "Mã môn học",
//     dataIndex: "ma_hp",
//     key: "ma_hp",
//   },
//   {
//     title: "Môn học",
//     dataIndex: "ten_hp",
//     key: "ten_hp",
//   },
//   {
//     title: "Số tín chỉ",
//     dataIndex: "so_tin",
//     key: "so_tin",
//   },
//   {
//     title: "Điểm hệ 10",
//     dataIndex: "he10",
//     key: "he10",
//   },
//   {
//     title: "Điểm chữ",
//     dataIndex: "diem",
//     key: "diem",
//   },
//   {
//     title: "Điểm hệ 4",
//     dataIndex: "he4",
//     key: "he4",
//   },
// ];

// const expand_columns = [
//   {
//     title: "STT",
//     dataIndex: "index",
//     key: "stt",
//     render: (text, record, index) => index + 1,
//   },
//   {
//     title: "Bản chất kỳ thi",
//     dataIndex: "type",
//     key: "type",
//   },
//   {
//     title: "Hệ số",
//     dataIndex: "he_so",
//     key: "he_so",
//   },
//   {
//     title: "Lần thi",
//     dataIndex: "lan",
//     key: "lan",
//   },
//   {
//     title: "Điểm",
//     dataIndex: "diem",
//     key: "diem",
//   },
// ];

// // Data mẫu, sau sẽ dùng api để lấy
// const semesters = [
//   {
//     ki: 1,
//     nam: 2022,
//     data: [
//       {
//         ma_hp: "MAT3507",
//         ten_hp: "Cơ sở dữ liệu",
//         so_tin: "4",
//         he10: 8.4,
//         diem: "B+",
//         he4: 3.5,
//         expand: [
//           {
//             type: "Thi cuối kì",
//             he_so: 0.6,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Giữa kì",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Thường xuyên",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//         ],
//       },
//       {
//         ma_hp: "MAT3372",
//         ten_hp: "Các thành phần phần mềm",
//         so_tin: "4",
//         he10: 10,
//         diem: "A+",
//         he4: 4.0,
//         expand: [
//           {
//             type: "Thi cuối kì",
//             he_so: 0.6,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Giữa kì",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Thường xuyên",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//         ],
//       },
//       {
//         ma_hp: "MAT2503",
//         ten_hp: "Giải tích 3",
//         so_tin: "4",
//         he10: 9.3,
//         diem: "A+",
//         he4: 4.0,
//         expand: [
//           {
//             type: "Thi cuối kì",
//             he_so: 0.6,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Giữa kì",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Thường xuyên",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     ki: 2,
//     nam: 2022,
//     data: [
//       {
//         ma_hp: "MAT3507",
//         ten_hp: "Cơ sở dữ liệu",
//         so_tin: "4",
//         he10: 8.4,
//         diem: "B+",
//         he4: 3.5,
//         expand: [
//           {
//             type: "Thi cuối kì",
//             he_so: 0.6,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Giữa kì",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Thường xuyên",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//         ],
//       },
//       {
//         ma_hp: "MAT3372",
//         ten_hp: "Các thành phần phần mềm",
//         so_tin: "4",
//         he10: 10,
//         diem: "A+",
//         he4: 4.0,
//         expand: [
//           {
//             type: "Thi cuối kì",
//             he_so: 0.6,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Giữa kì",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Thường xuyên",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//         ],
//       },
//       {
//         ma_hp: "MAT2503",
//         ten_hp: "Giải tích 3",
//         so_tin: "4",
//         he10: 9.3,
//         diem: "A+",
//         he4: 4.0,
//         expand: [
//           {
//             type: "Thi cuối kì",
//             he_so: 0.6,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Giữa kì",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//           {
//             type: "Thường xuyên",
//             he_so: 0.2,
//             lan: 1,
//             diem: 10,
//           },
//         ],
//       },
//     ],
//   },
// ];

const expandedRowRender = (record) => {
  return (
    <Table
      columns={window.expand_columns}
      dataSource={record.expand}
      size="small"
      pagination={false}
    />
  );
};

const Dashboard = ({ user }) => {
  const [tong_so_tin, setTongSoTin] = useState(null);
  const [tong_so_tin_tich_luy, setTongSoTinTichLuy] = useState(null);
  const [gpa, setGpa] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseOverView = await axios.post('http://localhost:8000/overview', {
          username: user
        });
        const data = responseOverView.data;
        setTongSoTin(data.tong_so_tin);
        setTongSoTinTichLuy(data.tong_so_tin_tich_luy);
        setGpa(data.gpa);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);


  const [columns, setColumns] = useState([]);
  const [expand_columns, setExpand_Columns] = useState([]);
  const [semesters, setSemester] = useState([]);

  window.expand_columns = expand_columns;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGrade = await axios.post('http://localhost:8000/grade', {
          username: user
        });
        const data = responseGrade.data;
        setColumns(data.columns);
        setExpand_Columns(data.expand_columns);
        setSemester(data.data);
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
                      expandedRowRender: (record) => expandedRowRender(record),
                      // defaultExpandedRowKeys: ["0"],
                    }}
                    dataSource={semester.data}
                    pagination={false}
                    size="small"
                  />
                </div>
              </>
            ))}
          </Card>
          <Card
            hoverable={true}
            loading={false}
            className="w-1/3 shadow-lg max-lg:w-full"
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
