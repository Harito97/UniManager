import { Table } from "antd";
import React, { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const Exam = ({ user }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: 'id',
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Mã KT",
      dataIndex: 'ma_kt',
      render: (_, record) => <p>{record.ma_hk}-{record.ma_hp} {record.ma_lop}</p>,
      width: 150,
    },
    {
      title: "Kỳ thi",
      dataIndex: "ten_hp",
      width: 280,
    },
    {
      title: "Ca thi",
      dataIndex: 'ca_thi',
      render: (_, record) => {
        const data_exam = record.lich_thi;
        return data_exam.map((info) => (
          <p>
            {info.ca_thi}({info.gio_thi})
          </p>
        ));
      },
      width: 70,
    },
    {
      title: "Ngày thi",
      dataIndex: 'ngay_thi',
      render: (_, record) => {
        const data_exam = record.lich_thi;
        return data_exam.map((info) => (
          <p>
            {info.ngay_thi}
          </p>
        ));
      },
      width: 100,
    },
    {
      title: "H.Thức thi",
      dataIndex: 'hinh_thuc',
      render: (_, record) => {
        const data_exam = record.lich_thi;
        return data_exam.map((info) => (
          <p>
            {info.hinh_thuc}
          </p>
        ));
      },
      width: 150,
    },
    {
      title: "Phòng",
      dataIndex: 'phong',
      render: (_, record) => {
        const data_exam = record.lich_thi;
        return data_exam.map((info) => (
          <p>
            {info.phong}
          </p>
        ));
      },
      width: 100,
    },
    {
      title: "Huỷ ĐK",
      dataIndex: 'huy',
      render: (_,record) => 
        <a href={"#"}><DeleteOutlined className="text-red-700"/></a>
      ,
      width: 100,
    }
  ];

  const [exam, setExam] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseExam = await axios.post('http://localhost:8000/schedule_exam', {
          username: user,
        });
        setExam(responseExam.data.exam);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  // const exam = [
  //   {ma_hk: 231,
  //   ma_hp: "MAT2300",
  //   ma_lop: 1,
  //   ten_hp: "Cấu trúc dữ liệu và giải thuật",
  //   lich_thi: [{ca_thi: 1, gio_thi: "08:20", ngay_thi: "20/02/2023", hinh_thuc: "Tự luận", phong: "102T5"}]
  // }
  // ]


  return (  
    <>
      <div className='headline' style={{fontSize: '1.5rem', marginBottom: '10px'}}><strong>Lịch thi</strong></div>
      <Table 
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={exam}
        pagination={false}
        
      />
    </>
  );
};

export default Exam;
