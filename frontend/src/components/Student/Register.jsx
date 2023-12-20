import React, { useState } from "react";
import { Button, Table, Select } from "antd";

const columns = [
  { title: "Môn học", dataIndex: "ten_hp", width: 300 },
  { title: "TC", dataIndex: "so_tin", width: 50 },
  { title: "Lớp môn học", dataIndex: "ma_hp_lop", width: 100 }, // ma_hp + " " + ma_lop
  { title: "Tổng SV", dataIndex: "so_sv", width: 70 },
  { title: "Đã ĐK", dataIndex: "da_dk", width: 60 },
  { title: "Giáo viên", dataIndex: "ten_gv", width: 100 },
  { title: "Lịch học", dataIndex: "lich_hoc", width: 200 },
];

// Data mẫu môn học theo ngành
const data_major = [];
for (let i = 100; i < 200; i++) {
  data_major.push({
    key: i, //Lấy là mã lịch học theo database
    ten_hp: "Cơ sở dữ liệu Web và hệ thống thông tin",
    ma_hp_lop: "MAT3385 1",
    so_tin: 3,
    so_sv: 30,
    da_dk: 0,
    ten_gv: "Vũ Tiến Dũng",
    lich_hoc: "T4-(4-5)-103T4 CN-(1-5)-Phòng máy",
  });
}

// Data mẫu toàn trường
const data = [];
for (let i = 1; i <= 100; i++) {
  data.push({
    key: i, //Lấy là mã lịch học theo database
    ten_hp: "Triết học Marx-Lenin",
    ma_hp_lop: "PHI1006 " + i,
    so_tin: 3,
    so_sv: 30,
    da_dk: 0,
    ten_gv: "",
    lich_hoc: "T4-(3-5)-103T4",
  });
}

const Register = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onTableChange = (value) => {
    if (value === 1) {
      setShowAllCourses(false);
      console.log(1);
    } else {
      setShowAllCourses(true);
      console.log(2);
    }
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideSelectAll: true,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-between sm:flex-row">
          <h1 className="text-xl font-bold">
            Đăng kí học - Học kì 1 năm học 2022 - 2023
          </h1>
          <Select
            defaultValue={1}
            options={[
              { value: 1, label: "Môn học theo ngành" },
              { value: 2, label: "Môn học toàn trường" },
            ]}
            onChange={onTableChange}
          ></Select>
        </div>
        {showAllCourses ? (
          //Môn học toàn trường
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            scroll={{ y: 320 }}
            pagination={false}
            size="small"
          />
        ) : (
          // Môn học theo ngành
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data_major}
            scroll={{ y: 320 }}
            pagination={false}
            size="small"
          />
        )}
        <div>
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
            className="bg-blue-500"
          >
            Đăng kí
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
