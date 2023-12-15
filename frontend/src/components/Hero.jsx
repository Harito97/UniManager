import React from "react";
import { FaHeart } from "react-icons/fa";
import { Button } from "antd";

const Hero = ({ toggleLoginPopup }) => {
  return (
    <>
      <main>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <h1 className="text-center font-dancing text-4xl text-white sm:text-6xl md:w-[750px] md:text-8xl ">
            Sáng tạo
          </h1>
          <h1 className="text-center font-dancing text-4xl text-white sm:text-6xl md:w-[750px] md:text-8xl ">
            Tiên phong
          </h1>
          <h1 className="text-center font-dancing text-4xl text-white sm:text-6xl md:w-[750px] md:text-8xl ">
            Trách nhiệm xã hội
          </h1>
          <p className="text-center text-white">
            {" "}
            Website Quản lý trường học về đăng ký môn học, giảng viên, sinh viên
            và điểm số
          </p>
          <p className="text-white ">
            {" "}
            Made with <FaHeart className="inline text-red-600" /> by Group 2
          </p>
          <Button
            type="primary"
            className="bg-blue-500"
            onClick={() => toggleLoginPopup(true)}
          >
            Start Now
          </Button>
        </div>
      </main>
    </>
  );
};

export default Hero;
