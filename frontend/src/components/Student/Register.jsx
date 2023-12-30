import React, { useState, useEffect } from "react";
import { Button, Table, Select, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const courses_table = [
  { title: "Môn học", dataIndex: "ten_hp", width: 300 },
  { title: "TC", dataIndex: "so_tin", width: 50 },
  {
    title: "Lớp môn học",
    dataIndex: "ma_hp_lop",
    width: 100,
    render: (_, record) => (
      <p>
        {record.ma_hp} {record.ma_lop}
      </p>
    ),
  }, // ma_hp + " " + ma_lop
  { title: "Tổng SV", dataIndex: "so_sv", width: 70 },
  { title: "Đã ĐK", dataIndex: "da_dk", width: 60 }, //TODO: render bằng cách select count bảng đăng kí theo năm, kì, mã lịch học
  {
    title: "Giáo viên",
    dataIndex: "ten_gv",
    width: 100,
    render: (_, record) => {
      return record.ten_gv.map((n) => <p>{n}</p>);
    },
  },
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
];

// Data mẫu môn học theo ngành
// Lấy bằng cách lấy bảng lịch học theo ngành, năm và kì hiện tại
const data1 = [];
for (let i = 100; i < 200; i++) {
  data1.push({
    ma_lh: i,
    ten_hp: "Cơ sở dữ liệu Web và hệ thống thông tin",
    ma_hp: "MAT3385",
    ma_lop: i,
    so_tin: 3,
    so_sv: 30,
    da_dk: 1,
    ten_gv: ["Vũ Tiến Dũng", "Phạm Duy Phương"],
    lich_hoc: [
      { thu: "T2", bd: 1, kt: 2, phong: "103T4" },
      { thu: "T5", bd: 6, kt: 10, phong: "PM" },
    ],
    disabled: false,
  });
}

// Data mẫu toàn trường
// Lấy bằng cách lấy bảng lịch học theo năm, kì hiện tại
const data2 = [];
for (let i = 1; i <= 100; i++) {
  data2.push({
    ma_lh: i,
    ten_hp: "Triết học Marx-Lenin",
    ma_hp: "PHI1006 ",
    ma_lop: i,
    so_tin: 3,
    so_sv: 30,
    da_dk: 1,
    ten_gv: ["Vũ Tiến Dũng", "Phạm Duy Phương"],
    lich_hoc: [
      { thu: "T4", bd: 3, kt: 5, phong: "308T5" },
      { thu: "T4", bd: 3, kt: 5, phong: "308T5" },
    ],
    disabled: false,
  });
}

const Register = ({ user }) => {
  const [dataMajor, setDataMajor] = useState(data1);
  // const [dataAll, setDataAll] = useState(data2);
  // Data môn sinh viên đã đăng kí trong kì này
  // Lấy bằng cách select bảng đăng kí theo mã SV, năm và kì

  const [dataMonth, setDataMonth] = useState(null);
  const [dataYear, setDataYear] = useState(null);
  const [dataAll, setDataAll] = useState([]);
  // const [dataMajor, setDataMajor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDataTime = await axios.post(
          "http://localhost:8001/semester_year_current",
        );
        const data = responseDataTime.data;
        setDataMonth(data.semester);
        setDataYear(data.year);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDataAll = await axios.post(
          "http://localhost:8001/subject_all",
          {
            username: user,
          },
        );
        const data = responseDataAll.data;
        setDataAll(data.dataAll);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responseDataMajoy = await axios.post('http://localhost:8001/subject_majoy', {
  //         username: user
  //       });
  //       const data = responseDataMajoy.data;
  //       setDataMajor(data.dataMajor);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [user]);

  const [registeredData, setRegisteredData] = useState([
    // {
    //   ten_hp: "Cấu trúc dữ liệu và thuật toán",
    //   so_tin: 4,
    //   ma_hp: "MAT3585",
    //   ma_lop: 1,
    //   ten_gv: ["Vũ Tiến Dũng, Phạm Duy Phương"],
    //   lich_hoc: [{ thu: "T3", bd: 1, kt: 2, phong: "103T4" },
    //              { thu: "T3", bd: 1, kt: 2, phong: "103T4" }],
    //   lan: 1
    // },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDataSubjectRegister = await axios.post(
          "http://localhost:8001/registered_subject",
          {
            username: user,
          },
        );
        const data = responseDataSubjectRegister.data;
        setRegisteredData(data.subjectRegister);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);


  const registered_table = [
    {
      title: "STT",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    { title: "Môn học", dataIndex: "ten_hp", width: 300 },
    { title: "TC", dataIndex: "so_tin", width: 50 },
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
    { title: "Giáo viên", dataIndex: "ten_gv", width: 100 },
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
    if (record.status === undefined) {
      const newDeSelected = [...deSelected, record.ma_lh];
      console.log("Deselected changed: ", newDeSelected);
      setDeSelected(newDeSelected);
    }
    
    const updateRegisteredData = registeredData.filter(
      (item) => item.ma_lh !== record.ma_lh,
    );
    setRegisteredData(updateRegisteredData);
    const updateSelectedRowKeys = selectedRowKeys.filter(
      (item) => item !== record.ma_lh,
    );
    setSelectedRowKeys(updateSelectedRowKeys);
    // console.log(selectedRowKeys);
  };
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Mảng chứa ma_lh đăng kí
  const [deSelected, setDeSelected] = useState([]); // Mảng chứa ma_lh bỏ đăng kí
  const [loading, setLoading] = useState(false);
  const start = () => {
    try {
      for (let i = 0; i < selectedRowKeys.length; i++) {
        const add = axios.post('http://localhost:8002/post_dangky', {
          ma_lh: selectedRowKeys[i],
          ma_sv: user,
          diem_tx: null,
          he_so_tk: null,
          diem_gk: null,
          he_so_gk: null,
          diem_ck: null,
          he_so_ck: null
        });
        console.log(add);
      }
    }
    
    catch(e) {
      console.log(e);
    }
  

    try {
      for (let i = 0; i < deSelected.length; i++) {
        const deleted = axios.delete('http://localhost:8002/delete_dangky/' + deSelected[i].toString() + "_" + user, {
          ma_lh: deSelected[i],
          ma_sv: user
        });
        console.log(deleted);
      }
    }
   
    catch(e) {
      console.log(e);
    }
  
    setLoading(true);
    // TODO
    // ajax request after empty completing
    setTimeout(() => {
      console.log(selectedRowKeys);
      console.log(deSelected);
      setSelectedRowKeys([]);
      setDeSelected([]);
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
    onSelect: onSelect,
    onChange: onChange,
    hideSelectAll: true,
    getCheckboxProps: (record) => ({ disabled: record.disabled }),
    selectedRowKeys: selectedRowKeys,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const hasDeSelected = deSelected.length > 0;

  const checkBoxDisabled = (data1) => {
    for (let i = 0; i < registeredData.length; i++) {
      const data2 = registeredData[i].lich_hoc;
      for (let j = 0; j < data1.length; j++) {
        for (let k = 0; k < data2.length; k++) {
          if (checkIfOverlapping(data1[j], data2[k])) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const checkIfOverlapping = (o1, o2) => {
    if (o1.thu === o2.thu) {
      return (
        (o1.bd >= o2.bd && o1.bd <= o2.kt) || (o1.kt >= o2.bd && o1.kt <= o2.kt)
      );
    }
    return false;
  };

  useEffect(() => {
    console.log("Độ dài mảng đã thay đổi: ", registeredData.length);
    // dataMajor.forEach((obj) => {
    //   obj.disabled = checkBoxDisabled(obj.lich_hoc);
    // });
    // data.forEach((obj) => {
    //   obj.disabled = checkBoxDisabled(obj.lich_hoc);
    // });
    const newDataMajor = [...dataMajor];
    for (let i = 0; i < newDataMajor.length; i++) {
      newDataMajor[i] = {
        ...newDataMajor[i],
        disabled: checkBoxDisabled(newDataMajor[i].lich_hoc),
      };
    }
    setDataMajor(newDataMajor);
    const newDataAll = [...dataAll];
    for (let i = 0; i < newDataAll.length; i++) {
      newDataAll[i] = {
        ...newDataAll[i],
        disabled: checkBoxDisabled(newDataAll[i].lich_hoc),
      };
    }
    setDataAll(newDataAll);
  }, [registeredData]);



  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-between sm:flex-row">
          <h1 className="text-xl font-bold">
            Đăng kí học - Học kì {dataMonth} năm học {dataYear} - {dataYear + 1}
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
            dataSource={dataAll}
            scroll={{ x: 880, y: 320 }}
            pagination={false}
            size="small"
            rowClassName={(record) => {
              if (record.disabled) {
                return "bg-yellow-200";
              }
            }}
          />
        ) : (
          // Môn học theo ngành
          <Table
            rowKey={(record) => record.ma_lh}
            rowSelection={rowSelection}
            columns={courses_table}
            dataSource={dataMajor}
            scroll={{ x: 880, y: 320 }}
            pagination={false}
            size="small"
            rowClassName={(record) => {
              if (record.disabled) {
                return "bg-yellow-200";
              }
            }}
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
          scroll={{ x: 1100 }}
          rowClassName={(record) => {
            if (record.status !== undefined) {
              return "bg-blue-200";
            }
          }}
        />
        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={start}
            disabled={!(hasSelected || hasDeSelected)}
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
