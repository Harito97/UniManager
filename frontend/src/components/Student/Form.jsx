import { Table } from "antd";
import React, {useState} from "react";
import axios from "axios";
import {
   CloudDownloadOutlined
 } from "@ant-design/icons";

function handleDownload(id) {
    axios.post('http://localhost:8000/download', {
        id: id
    })
}

const Form = ({user}) => {

   const columns = [
      {
        title: <p><center>{"STT"}</center></p>,
        dataIndex: 'id',
        render: (text, record, index) => <p><center>{index + 1}</center></p>,
        width: 50,
      },
      {
        title: <p><center>{"Tên tệp tin"}</center></p>,
        dataIndex: 'name',
        render: (_, record) => <p><center>{record.name}</center></p>,
        width: 150,
      },
      {
        title: <p><center>{"Mô tả"}</center></p>,
        dataIndex: "description",
        render: (_, record) => <p><center>{record.description}</center></p>,
        width: 300,
      },
      {
        title: <p><center>{"Phân loại"}</center></p>,
        dataIndex: 'classify',
        render: (_, record) => <p><center>{record.classify}</center></p>,
        width: 150,
      },
      {
        title: <p><center>{"Dung lượng"}</center></p>,
        dataIndex: 'size',
        render: (_, record) => <p><center>{record.size}</center></p>,
        width: 100,
      },
      {
        title: <p><center>{"Ngày tải lên"}</center></p>,
        dataIndex: 'dateLoading',
        render: (_, record) => <p><center>{record.dateLoading}</center></p>,
        width: 150,
      },
      {
        title: <p><center>{"Tải xuống"}</center></p>,
        dataIndex: 'download',
        render: (_, record) => <a href={"#"} onClick={() => handleDownload(record.id)}><center><CloudDownloadOutlined className="xl:text-2xl text-[#33FF99]"/></center></a>, 
        width: 100,
      },
    ];
  

   const data = [{  id: 1, 
                    name: "Đơn xét trợ cấp xã hội", 
                    description: "Dùng cho sinh viên xin xét trợ cấp xã hội",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "192KB",
                    dateLoading: "01/11/2020",
                    },

                 {  id: 2, 
                    name: "Đơn xét hỗ trợ chi phí học tập", 
                    description: "Dùng cho sinh viên dân tộc thiểu số hộ nghèo, cận nghèo theo quy định của Thủ tướng Chính phủ thi đỗ vào đại học chính quy",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "174KB",
                    dateLoading: "02/11/2020",
                    },

                 {  id: 3, 
                    name: "Đơn xác nhận vay vốn ở địa phương", 
                    description: "Dùng cho sinh viên vay vốn ở địa phương",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "298KB",
                    dateLoading: "03/11/2020",
                    },
                
                 {  id: 4, 
                    name: "Mẫu đánh giá điểm rèn luyện", 
                    description: "Dùng cho sinh viên tự đánh giá điểm rèn luyện cuối mỗi học kỳ",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "288KB",
                    dateLoading: "04/11/2020",
                    },

                 {  id: 5, 
                    name: "Đơn xin rút hồ sơ", 
                    description: "Dùng cho sinh viên rút hồ sơ khi có quyết định thôi học hoặc hết thời gian đào tạo",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "206KB",
                    dateLoading: "05/11/2020",
                    },

                 {  id: 6, 
                    name: "Đơn xin thôi học", 
                    description: "Dùng cho sinh viên xin thôi học vì lí do cá nhân, đi du học...",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "205KB",
                    dateLoading: "06/11/2020",
                    },

                 {  id: 7, 
                    name: "Đơn xin nghỉ học (bảo lưu)", 
                    description: "Dùng cho sinh viên xin nghỉ học (bảo lưu) học kì hay năm học (sinh viên lưu ý cần có bảng điểm tích lũy học tập từ 2.0 trở lên hoặc các lí do cá nhân theo quy định của quy chế đào tạo)",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "197KB",
                    dateLoading: "07/11/2020",
                    },


                 {  id: 8, 
                    name: "Đơn xin tiếp tục vào học", 
                    description: "Dùng cho sinh viên sau khi hết thời gian nghỉ học bảo lưu",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "196KB",
                    dateLoading: "08/11/2020",
                    },

                 {  id: 9, 
                    name: "Đơn xin chuyển trường", 
                    description: "Dùng cho sinh viên để xin chuyển sang trường khác (SV lưu ý trước khi làm đơn cần phải có xác nhận đồng ý của Trường nơi sinh viên sẽ đến học)",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "210KB",
                    dateLoading: "09/11/2020",
                    },

                 {  id: 10, 
                    name: "Đơn đề nghị ", 
                    description: "Dùng cho sinh viên có thắc mắc, đề nghị về các vấn đề như học bổng, học phí, điểm rèn luyện,...",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "198KB",
                    dateLoading: "10/11/2020",
                    },

                 {  id: 11, 
                    name: "Quy chế đào tạo", 
                    description: "Ban hành kèm theo quyết định của ĐHQGHN và áp dụng cho sinh viên hệ đại học chính quy",
                    classify: "Quy định, quy chế",
                    size: "819KB",
                    dateLoading: "11/11/2020",
                    },

                 {  id: 12, 
                    name: "Quy chế Công tác sinh viên", 
                    description: "Ban hành kèm theo quyết định của ĐHQGHN và áp dụng cho sinh viên hệ đại học chính quy",
                    classify: "Quy định, quy chế",
                    size: "751KB",
                    dateLoading: "12/11/2020",
                    },

                 {  id: 13, 
                    name: "Sơ yếu lí lịch", 
                    description: "Dùng cho sinh viên xin học bổng, việc làm...",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "210KB",
                    dateLoading: "13/11/2020",
                    },

                 {  id: 14, 
                    name: "Giấy xác nhận sinh viên _ Tiếng Việt", 
                    description: "Dùng cho sinh viên xác nhận nghĩa vụ quân sự, báo cáo địa phương, thi học kì khi mất thẻ SV,...",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "41KB",
                    dateLoading: "14/11/2020",
                    },

                 {  id: 15, 
                    name: "Giấy xác nhận sinh viên _ Tiếng Anh", 
                    description: "Dùng cho sinh viên để xin học bổng, visa đi nước ngoài,...",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "50KB",
                    dateLoading: "15/11/2020",
                    },

                 {  id: 16, 
                    name: "Giấy xác nhận điểm rèn luyện cá nhân", 
                    description: "Dùng xác nhận điểm rèn luyện cho sinh viên để xin học bổng",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "40KB",
                    dateLoading: "16/11/2020",
                    },

                 {  id: 17, 
                    name: "Mẫu đăng ký  làm lại Thẻ sinh viên tích hợp thẻ ngân hàng BIDV", 
                    description: "Dùng cho sinh viên làm lại thẻ sinh viên tích hợp thẻ ngân hàng BIDV chi nhánh Thanh Xuân",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "141KB",
                    dateLoading: "17/11/2020",
                    },
                 ]

   return (
        <>
            <div className='headline' style={{fontSize: '1.5rem', marginBottom: '10px'}}><strong>Danh sách biểu mẫu</strong></div>

            <Table 
               rowKey={(record) => record.id}
               columns={columns}
               dataSource={data}
               pagination={false}
               
            />
        </>
        
    )
  }
  
  export default Form