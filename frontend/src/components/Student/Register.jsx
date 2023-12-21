import React, { useState } from "react";
import { Button, Table, Select, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const courses_table = [
  { title: "Môn học", dataIndex: "ten_hp", width: 300 },
  { title: "TC", dataIndex: "so_tin", width: 50 },
  { title: "Lớp môn học", dataIndex: "ma_hp_lop", width: 100 }, // ma_hp + " " + ma_lop
  { title: "Tổng SV", dataIndex: "so_sv", width: 70 },
  { title: "Đã ĐK", dataIndex: "da_dk", width: 60 },
  { title: "Giáo viên", dataIndex: "ten_gv", width: 100 },
  { title: "Lịch học", dataIndex: "lich_hoc", width: 200 },
];

// Data mẫu môn học theo ngành
// Lấy bằng cách lấy bảng lịch học theo ngành, năm và kì hiện tại
const dataMajor = [];
for (let i = 100; i < 200; i++) {
  dataMajor.push({
    ma_lh: i,
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
// Lấy bằng cách lấy bảng lịch học theo năm, kì hiện tại
const data = [];
for (let i = 1; i <= 100; i++) {
  data.push({
    ma_lh: i,
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
  // Data môn sinh viên đã đăng kí trong kì này
  // Lấy bằng cách select bảng đăng kí theo mã SV, năm và kì
  const [registeredData, setRegisteredData] = useState([
    { ma_lh: 1 },
    { ma_lh: 2 },
  ]);
  const registered_table = [
    {
      title: "STT",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    { title: "Môn học", dataIndex: "ten_hp", width: 300 },
    { title: "TC", dataIndex: "so_tin", width: 50 },
    { title: "Lớp môn học", dataIndex: "ma_hp_lop", width: 100 }, // ma_hp + " " + ma_lop
    { title: "Giáo viên", dataIndex: "ten_gv", width: 100 },
    { title: "Lịch học", dataIndex: "lich_hoc", width: 200 },
    { title: "Kiểu đăng kí", dataIndex: "type", width: 200 },
    {
      title: "Huỷ",
      dataIndex: "delete",
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xoá?"
          onConfirm={() => handleDelete(record)}
          okButtonProps={{ className: "bg-blue-500" }}
        >
          <DeleteOutlined className="text-red-500" />
        </Popconfirm>
      ),
    },
  ];

  const handleDelete = (record) => {
    const updateRegisteredData = registeredData.filter(
      (item) => item.ma_lh !== record.ma_lh,
    );
    setRegisteredData(updateRegisteredData);
  };
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // TODO
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onTableChange = (value) => {
    if (value === 1) {
      setShowAllCourses(false);
    } else {
      setShowAllCourses(true);
    }
  };
  const onChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const onSelect = (record, selected) => {
    if (selected) {
      const newRecord = { ...record };
      newRecord.status = true;
      // console.log(newRecord);
      // console.log(record.status);

      setRegisteredData([...registeredData, newRecord]);
    } else {
      const updateRegisteredData = registeredData.filter(
        (item) => item.ma_lh !== record.ma_lh,
      );
      //TODO: Check nếu không có thuộc tính status, thêm vào mảng để xoá
      setRegisteredData(updateRegisteredData);
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onSelect: onSelect,
    onChange: onChange,
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
            rowKey={(record) => record.ma_lh}
            rowSelection={rowSelection}
            columns={courses_table}
            dataSource={data}
            scroll={{ y: 320 }}
            pagination={false}
            size="small"
          />
        ) : (
          // Môn học theo ngành
          <Table
            rowKey={(record) => record.ma_lh}
            rowSelection={rowSelection}
            columns={courses_table}
            dataSource={dataMajor}
            scroll={{ y: 320 }}
            pagination={false}
            size="small"
          />
        )}
        <h1 className="text-xl font-bold">
          Danh sách môn đã đăng kí hoặc chọn
        </h1>
        <Table
          rowKey={(record) => record.ma_lh}
          columns={registered_table}
          dataSource={registeredData}
          pagination={false}
          size="small"
          rowClassName={(record) => {
            if (record.status !== undefined) {
              return "bg-blue-200"
            }
          }}
        />
        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
            className="bg-blue-500"
          >
            Ghi nhận
          </Button>
        </div>
      </div>
    </>
  );
};

export default Register;
