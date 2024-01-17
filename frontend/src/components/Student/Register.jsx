import React, { useState, useEffect } from "react";
import { Button, Table, Select, Popconfirm, Alert, ConfigProvider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useContentContext } from "../../context/UserContext";
import axios from "axios";
import generateDocument from "../../utils/RenderDocx";

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

const Register = () => {
  // axios.defaults.withCredentials = true;
  const { openSuccessNotification, openErrorNotification, getToken } =
    useContentContext();
  const [dataMajor, setDataMajor] = useState([]);
  // const [dataAll, setDataAll] = useState(data2);
  // Data môn sinh viên đã đăng kí trong kì này
  // Lấy bằng cách select bảng đăng kí theo mã SV, năm và kì

  const [semester, setSemester] = useState(null);
  const [dataAll, setDataAll] = useState([]);
  // const [dataMajor, setDataMajor] = useState([]);

  const [dataSubjectLearned, setDataSubjectLearned] = useState([]);
  const [registeredData, setRegisteredData] = useState([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Mảng chứa ma_lh đăng kí
  const [deSelected, setDeSelected] = useState([]); // Mảng chứa ma_lh bỏ đăng kí
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:8000/current_registration")
          .then((res) => {
            if (res.data.Status) {
              const ma_hk = res.data.current.ma_hk;
              setSemester(ma_hk);

              axios
                .get(
                  "http://localhost:8000/subject_major/" + ma_hk.toString(),
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + getToken(),
                    },
                  },
                )
                .then((res) => setDataMajor(res.data.dataMajor));

              axios
                .get("http://localhost:8000/subject_all/" + ma_hk.toString(), {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getToken(),
                  },
                })
                .then((res) => setDataAll(res.data.dataAll));
              return ma_hk;
            } else {
              setSemester(0);
              return 0;
            }
          })
          .then((ma_hk) => {
            if (ma_hk != 0) {
              axios
                .get(
                  "http://localhost:8000/subject_learned/" + ma_hk.toString(),
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + getToken(),
                    },
                  },
                )
                .then((res) => setDataSubjectLearned(res.data.subjectLearned));
            }
            return ma_hk;
          })
          .then((ma_hk) => {
            if (ma_hk != 0) {
              axios
                .get(
                  "http://localhost:8000/registered_subject/" +
                    ma_hk.toString(),
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + getToken(),
                    },
                  },
                )
                .then((res) => {
                  const data = res.data.subjectRegister;
                  data.forEach((obj) => {
                    obj.status = false;
                  });
                  const updateSelected = data.map((obj) => obj.ma_lh);
                  setSelected(updateSelected);
                  setRegisteredData(data);
                });
            }
          })
          .finally(() => setLoading(false));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
    {
      title: "Kiểu đăng kí",
      dataIndex: "type",
      width: 200,
      render: (_, record) => {
        return <p>Đăng ký lần {record.lan + 1}</p>;
      },
    },
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
    if (!record.status) {
      const newDeSelected = [...deSelected, record.ma_lh];
      setDeSelected(newDeSelected);
      const updateSelected = selected.filter((item) => item !== record.ma_lh);
      setSelected(updateSelected);
    } else {
      const updateSelectedRowKeys = selectedRowKeys.filter(
        (item) => item !== record.ma_lh,
      );
      setSelectedRowKeys(updateSelectedRowKeys);
      const updateSelected = selected.filter((item) => item !== record.ma_lh);
      setSelected(updateSelected);
    }

    const updateRegisteredData = registeredData.filter(
      (item) => item.ma_lh !== record.ma_lh,
    );
    setRegisteredData(updateRegisteredData);

    // for (let i = 0; i < dataAll.length; i++) {
    //   if (dataAll[i].ma_p === record.ma_hp) {
    //     dataAll[i].disabled = false;
    //   }
    // }
    // console.log(selectedRowKeys);
  };

  const start = () => {
    try {
      for (let i = 0; i < selectedRowKeys.length; i++) {
        axios.post(
          "http://localhost:8000/post_dangky",
          {
            ma_lh: selectedRowKeys[i],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getToken(),
            },
          },
        );
      }
    } catch (e) {
      console.log(e);
    }

    try {
      for (let i = 0; i < deSelected.length; i++) {
        axios.delete(
          "http://localhost:8000/delete_dangky/" + deSelected[i].toString(),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getToken(),
            },
          },
        );
      }
    } catch (e) {
      console.log(e);
    }

    if (selectedRowKeys.length === 0 && deSelected.length === 0) {
      openErrorNotification(
        "Lỗi",
        "Bạn chưa thực hiện đăng kí hoặc xóa học phần!",
      );
    } else if (selectedRowKeys.length !== 0 && deSelected.length === 0) {
      openSuccessNotification(
        "Đăng kí thành công",
        "Bạn vừa đăng kí thêm được " +
          selectedRowKeys.length.toString() +
          " học phần!",
      );
    } else if (selectedRowKeys.length === 0 && deSelected.length !== 0) {
      openSuccessNotification(
        "Xóa thành công",
        "Bạn vừa xóa được " + deSelected.length.toString() + " học phần!",
      );
    } else {
      openSuccessNotification(
        "Thành công",
        "Bạn vừa đăng kí thêm được " +
          selectedRowKeys.length.toString() +
          " học phần!",
      );
      openSuccessNotification(
        "Thành công",
        "Bạn vừa xóa thành công " +
          deSelected.length.toString() +
          " học phần !",
      );
    }

    registeredData.forEach((obj) => {
      obj.status = false;
    });

    setSelectedRowKeys([]);
    setDeSelected([]);
  };

  const onTableChange = (value) => {
    if (value === 1) {
      setShowAllCourses(false);
    } else {
      setShowAllCourses(true);
    }
  };

  const onSelect = (record, isSelect) => {
    if (isSelect) {
      setSelected([...selected, record.ma_lh]);
      if (deSelected.includes(record.ma_lh)) {
        const newRecord = { ...record };
        newRecord.status = false;
        setRegisteredData([...registeredData, newRecord]);
        const updateDeSelected = deSelected.filter(
          (item) => item !== record.ma_lh,
        );
        setDeSelected(updateDeSelected);
      } else {
        const newRecord = { ...record };
        newRecord.status = true;
        setRegisteredData([...registeredData, newRecord]);
        setSelectedRowKeys([...selectedRowKeys, record.ma_lh]);
      }
    } else {
      const updateRegisteredData = registeredData.filter(
        (item) => item.ma_lh !== record.ma_lh,
      );
      const updateSelectedRowKeys = selectedRowKeys.filter(
        (item) => item !== record.ma_lh,
      );
      const updateSelected = selected.filter((item) => item !== record.ma_lh);
      setSelectedRowKeys(updateSelectedRowKeys);
      setSelected(updateSelected);
      setRegisteredData(updateRegisteredData);
    }
  };
  const rowSelection = {
    onSelect: onSelect,
    hideSelectAll: true,
    getCheckboxProps: (record) => ({ disabled: record.disabled }),
    selectedRowKeys: selected,
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
    // dataMajor.forEach((obj) => {
    //   obj.disabled = checkBoxDisabled(obj.lich_hoc);
    // });
    // data.forEach((obj) => {
    //   obj.disabled = checkBoxDisabled(obj.lich_hoc);
    // });

    // const newDataMajor = [...dataMajor];
    // for (let i = 0; i < newDataMajor.length; i++) {
    //   newDataMajor[i] = {
    //     ...newDataMajor[i],
    //     disabled: checkBoxDisabled(newDataMajor[i].lich_hoc),
    //   };
    // }
    // setDataMajor(newDataMajor);

    const newDataMajor = [...dataMajor];
    for (let i = 0; i < newDataMajor.length; i++) {
      if (selectedRowKeys.includes(newDataMajor[i].ma_lh)) {
        newDataMajor[i].disabled = false;
        continue;
      }
      if (
        dataSubjectLearned
          .map((record) => record.ma_hp)
          .includes(newDataMajor[i].ma_hp)
      ) {
        newDataMajor[i].disabled = true;
      } else {
        newDataMajor[i].disabled = checkBoxDisabled(newDataMajor[i].lich_hoc);
      }
    }
    setDataMajor(newDataMajor);

    // const newDataAll = [...dataAll];
    // for (let i = 0; i < newDataAll.length; i++) {
    //   newDataAll[i] = {
    //     ...newDataAll[i],
    //     disabled: checkBoxDisabled(newDataAll[i].lich_hoc),
    //   };
    // }
    // setDataAll(newDataAll);

    const newDataAll = [...dataAll];
    for (let i = 0; i < newDataAll.length; i++) {
      if (selectedRowKeys.includes(newDataAll[i].ma_lh)) {
        newDataAll[i].disabled = false;
        continue;
      }
      if (
        dataSubjectLearned
          .map((record) => record.ma_hp)
          .includes(newDataAll[i].ma_hp)
      ) {
        newDataAll[i].disabled = true;
      } else {
        newDataAll[i].disabled = checkBoxDisabled(newDataAll[i].lich_hoc);
      }
    }
    setDataAll(newDataAll);
  }, [registeredData, deSelected, selectedRowKeys]);

  if (semester == 0) {
    return (
      <Alert
        message="Đang khoá đăng kí học, bạn vui lòng thử lại sau!"
        type="error"
        showIcon
      />
    );
  } else if (semester === null) {
    return <></>;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowHoverBg: "none",
          },
        },
      }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-between sm:flex-row">
          <h1 className="text-xl font-bold">
            Đăng kí học - Học kì {semester.toString().slice(-1)} Năm học 20
            {semester.toString().slice(0, 2)} - 20
            {(semester + 10).toString().slice(0, 2)}
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
            loading={loading}
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
            loading={loading}
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
            if (record.status) {
              return "bg-blue-200";
            } else {
              return "bg-pink-200";
            }
          }}
          loading={loading}
        />
        <div className="flex justify-end gap-3">
          <Button
            type="primary"
            onClick={start}
            disabled={!(hasSelected || hasDeSelected)}
            // disabled={false}
            className="bg-blue-500"
          >
            Ghi nhận
          </Button>
          <Button onClick={() => generateDocument(semester, getToken())}>
            Xuất file
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Register;
