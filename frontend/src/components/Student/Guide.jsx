import { Table } from 'antd'
import React, { useState, useEffect } from "react";
import axios from "axios";

const Guide = ({user}) => {
  const columns = [
    {title: "Đợt đăng ký",
     dataIndex: "dot",
     key: "dot",
     render: (_, record) => (
      <p>
        Đợt {record.dot} - {record.ma_hk}
      </p>
    ),},
    {title: "Ngày bắt đầu",
     dataIndex: "time_start",
     key: "time_start"},
    {title: "Ngày kết thúc",
     dataIndex: "time_end",
     key: "time_end"}]

  const [guide, setGuide] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get('http://localhost:8000/guide').then((res) => setGuide(res.data.guide));
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <>
    <div>
      <div className="flex justify-center font-bold text-[#00FF00] xl:text-2xl"><u>Hướng dẫn</u></div>
      <div className="mt-3 xl:text-1xl">
        <div className="font-bold text-[#FF0000]">Hệ thống đào tạo và đăng ký học đã được nâng cấp vào ngày 04/01/2024. Với hệ thống đăng ký học</div>
        <div className="mt-3 text-black">
          <ul>
            <li className='mt-2'>
              Thời gian sử dụng hệ thống mỗi lần đăng nhập sẽ chỉ giới hạn trong 20 phút.
            </li>
            <li className='mt-2'>
              Sau khi ghi nhận đăng ký học thành công hoặc hết thời gian 20 phút sử dụng, hệ thống sẽ tự động đăng xuất tài khoản (dành vị trí cho các bạn khác đăng ký). Khi đăng xuất tài khoản, sinh viên chỉ có thể đăng nhập lại sau 30 phút kể từ lần login cuối cùng. 
            </li>
            <li className='mt-2'>
              Hệ thống sẽ tạm dừng để bảo trì định kỳ từ 1h đến muộn nhất là 4h sáng hàng ngày.
            </li>
          </ul>
        </div>
        <div className="mt-3 text-[#FF0000]">Các bạn sinh viên lưu ý: Chỉ nên đăng nhập trước thời gian đăng ký từ 5 đến 10 phút.</div>
        <div className="mt-3  text-[#3333FF]">
          <ul>
            <li className='mt-2'>
              <a href='https://www.youtube.com/watch?v=o2ErRk2WQ3w'><u>(Video) Hướng dẫn sử dụng Cổng thông tin đào tạo - Đăng ký học năm 2024 </u></a>
            </li>
            <li className='mt-2'>
              <a href='https://sinhvienvnu.edu.vn/video/ky-nang-hoc-dai-hoc-hieu-qua'><u>Kỹ năng học tập hiệu quả ở bậc đại học </u></a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <div className="flex justify-center mt-3 font-bold text-[#00FF00] xl:text-2xl"><u>Các đợt đăng ký môn</u></div>
      <div className="mt-2 text-black">
          <Table
            columns={columns}
            dataSource={guide}
            pagination={false}
          />
      </div>
    </div>
      

    </>
    
  )
}

export default Guide