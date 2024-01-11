import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaCalendarDay } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [totalStudent, setTotalStudent] = useState(null);
  const [totalTeacher, setTotalTeacher] = useState(null);
  const [semester, setSemester] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:8000/get_total_student")
          .then((res) => {
            setTotalStudent(res.data.totalStudent);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:8000/get_total_teacher")
          .then((res) => {
            setTotalTeacher(res.data.totalTeacher);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:8000/semester_year_current")
          .then((res) => {
            if (res.data.Status) {
              setSemester(res.data.current.ma_hk);
            }
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (semester === null) {
    return <></>;
  } else {
    return (
      <>
        <div className="mt-8 flex flex-row justify-evenly gap-2 max-lg:flex-col md:gap-4 xl:gap-8">
          <Card
            hoverable={true}
            loading={false}
            className="w-1/3 shadow-lg max-lg:w-full"
          >
            <div className="flex flex-col items-center justify-center ">
              <div className="flex w-full flex-row justify-between">
                <div className="text-3xl font-bold text-black xl:text-5xl">
                  {totalStudent}
                </div>
                <div className="flex rounded-full bg-[#2944df] p-4 text-2xl text-white hover:shadow-xl xl:text-3xl">
                  <PiStudent />
                </div>
              </div>
              <div className="mt-4 text-xl font-bold  text-black xl:text-2xl">
                Tổng sinh viên
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
                  {totalTeacher}
                </div>
                <div className="flex rounded-full bg-[#1aaa6e] p-4 text-2xl text-white hover:shadow-xl xl:text-3xl">
                  <GiTeacher />
                </div>
              </div>
              <div className="mt-4 text-xl font-bold text-black xl:text-2xl">
                Tổng giáo viên
              </div>
            </div>
          </Card>
          <Card
            hoverable={true}
            loading={false}
            className="w-1/3 shadow-lg max-lg:w-full"
          >
            <div className="flex w-full flex-row justify-between">
              <div>
                {semester == 0 ? (
                  <>
                    <p className="text-xl font-bold text-black xl:text-3xl">
                      Ngoài kì học
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-bold text-black xl:text-3xl">
                      Học kì {semester.toString().slice(-1)}
                    </p>
                    <p className="text-xl font-bold text-black xl:text-3xl">
                      Năm học 20
                      {semester.toString().slice(0, 2)} - 20
                      {(semester + 10).toString().slice(0, 2)}
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center rounded-full bg-[#b36f16] p-4 text-2xl text-white hover:shadow-xl xl:text-3xl">
                <FaCalendarDay />
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  }
};

export default Dashboard;
