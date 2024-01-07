import { Table } from 'antd'
import React, { useState, useEffect } from "react";
import axios from "axios";

function handleDownload(id) {
    axios.post('http://localhost:8000/download', {
        id: id
    })
}

const Form = ({user}) => {
   const data = [{  id: 1, 
                    name: "Đơn xét trợ cấp xã hội", 
                    description: "Dùng cho sinh viên xin xét trợ cấp xã hội",
                    classify: "Các biểu mẫu dành cho sinh viên",
                    size: "192KB",
                    dateLoaing: "01/11/2020",
                    download: "Download"},

                    {  id: 2, 
                        name: "Đơn xét trợ cấp xã hội", 
                        description: "Dùng cho sinh viên xin xét trợ cấp xã hội",
                        classify: "Các biểu mẫu dành cho sinh viên",
                        size: "192KB",
                        dateLoaing: "01/11/2020",
                        download: "Download"}
                 ]
  
    return (
        <>
            <div className='headline' style={{fontSize: '2rem'}}><strong>Danh sách biểu mẫu</strong></div>
            <div className='custom-table'>
                <table>
                    <thead>
                        <tr style={{fontSize: '0.8rem'}}>
                            <th style={{paddingLeft: '1rem', paddingRight: '1rem', border: '1px solid black'}}>STT</th>
                            <th style={{paddingLeft: '3rem', paddingRight: '3rem', border: '1px solid black'}}>Tên tệp tin</th>
                            <th style={{paddingLeft: '3rem', paddingRight: '3rem', border: '1px solid black'}}>Mô tả</th>
                            <th style={{paddingLeft: '3rem', paddingRight: '3rem', border: '1px solid black'}}>Phân loại</th>
                            <th style={{paddingLeft: '3rem', paddingRight: '3rem', border: '1px solid black'}}>Dung lượng</th>
                            <th style={{paddingLeft: '3rem', paddingRight: '3rem', border: '1px solid black'}}>Ngày tải lên</th>
                            <th style={{paddingLeft: '3rem', paddingRight: '3rem', border: '1px solid black'}}>Tải xuống</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td style={{border: '1px solid black'}}><center>{item.id}</center></td>
                                <td style={{border: '1px solid black'}}><center>{item.name}</center></td>
                                <td style={{border: '1px solid black'}}><center>{item.description}</center></td>
                                <td style={{border: '1px solid black'}}><center>{item.classify}</center></td>
                                <td style={{border: '1px solid black'}}><center>{item.size}</center></td>
                                <td style={{border: '1px solid black'}}><center>{item.dateLoaing}</center></td>
                                <td style={{border: '1px solid black'}}><a href={"#"} onClick={() => handleDownload(item.id)}><center>{item.download}</center></a></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        
    )
  }
  
  export default Form