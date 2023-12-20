import { Card } from "antd";
import React from "react";
import {
  UserOutlined,
  FileOutlined,
  FileDoneOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Space, Table, Badge, Dropdown } from "antd";
import axios from "axios";

// const response = await axios.post('http://127.0.0.1:8001/grade');

// const columns = response.data.columns;
// const expand_columns = response.data.expand_columns;
// const data = response.data.data;       // dữ liệu này là dữ liệu cho các kì học. Ví dụ: data[0] là kì 1 năm nhất
// const expand_data = response.data.expand_data;

const columns = [
  {
    title: "Mã môn học",
    dataIndex: "ma_hp",
    key: "ma_hp",
  },
  {
    title: "Môn học",
    dataIndex: "ten_hp",
    key: "ten_hp",
  },
  {
    title: "Số tín chỉ",
    dataIndex: "so_tin",
    key: "so_tin",
  },
  {
    title: "Điểm hệ 10",
    dataIndex: "he10",
    key: "he10",
  },
  {
    title: "Điểm chữ",
    dataIndex: "diem",
    key: "diem",
  },
  {
    title: "Điểm hệ 4",
    dataIndex: "he4",
    key: "he4",
  },
];

const expand_columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Bản chất kỳ thi",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Hệ số",
    dataIndex: "he_so",
    key: "he_so",
  },
  {
    title: "Lần thi",
    dataIndex: "lan",
    key: "lan",
  },
  {
    title: "Điểm",
    dataIndex: "diem",
    key: "diem",
  },
];

// Example
const data = [
  {
    key: "1",
    ma_hp: "MAT3507",
    ten_hp: "Cơ sở dữ liệu",
    so_tin: "4",
    he10: 8.4,
    diem: "B+",
    he4: 3.5,
  },
  {
    key: "2",
    ma_hp: "MAT3372",
    ten_hp: "Các thành phần phần mềm",
    so_tin: "4",
    he10: 10,
    diem: "A+",
    he4: 4.0,
  },
  {
    key: "3",
    ma_hp: "MAT2503",
    ten_hp: "Giải tích 3",
    so_tin: "4",
    he10: 9.3,
    diem: "A+",
    he4: 4.0,
  },
];

const expand_data = [
  {
    key: "1",
    stt: 1,
    type: "Thi cuối kì",
    he_so: 0.6,
    lan: 1,
    diem: 10,
  },
  {
    key: "2",
    stt: 2,
    type: "Giữa kì",
    he_so: 0.2,
    lan: 1,
    diem: 10,
  },
  {
    key: "3",
    stt: 3,
    type: "Thường xuyên",
    he_so: 0.2,
    lan: 1,
    diem: 10,
  },
];

const expandedRowRender = () => {
  return (
    <Table
      columns={expand_columns}
      dataSource={expand_data}
      size="small"
      pagination={false}
    />
  );
};

const Dashboard = () => {
  console.log("Dashboard component rendered");
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
                  100
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
                  100
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
                  3.60
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
            className="w-2/3 shadow-lg max-lg:w-full"
          >
            <Table
              columns={columns}
              expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
              dataSource={data}
              size="small"
            />
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
