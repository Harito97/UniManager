import React, { useState } from "react";
import { Button, Table } from "antd";

const columns = [
  { title: "Môn học", dataIndex: "ten_hp" },
  { title: "TC", dataIndex: "so_tin" },
  { title: "Lớp môn học", dataIndex: "ma_hp_lop" }, // ma_hp + " " + ma_lop
  { title: "Tổng SV", dataIndex: "so_sv" },
  { title: "Đã ĐK", dataIndex: "da_dk" },
  { title: "Giáo viên", dataIndex: "ten_gv" },
  { title: "Lịch học", dataIndex: "lich_hoc" },
];

// Data mẫu
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i, //Lấy là mã lịch học theo database
    ten_hp: "Cơ sở dữ liệu Web và hệ thống thông tin",
    so_tin: 3,
    so_sv: 30,
    da_dk: 0,
    ten_gv: "Vũ Tiến Dũng",
    lich_hoc: "T4-(4-5)-103T4 CN-(1-5)-Phòng máy",
  });
}

const Register = () => {
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
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          scroll={{ y: 320 }}
          pagination={false}
        />
        <div
          style={{
            marginTop: 16,
          }}
        >
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
