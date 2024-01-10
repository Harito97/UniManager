import React from "react";
import { MdDesignServices } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { FaMobileAlt } from "react-icons/fa";

const Features = () => {
  return (
    <>
      <div
        className="bg-white font-[sans-serif] text-[#333] dark:bg-gray-900"
        id="about"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-16 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
            Discover Our Features
          </h2>
          <div className="mx-auto grid grid-cols-1 gap-12 max-md:max-w-md md:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-gray-50 shadow hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
              <div className="p-6">
                <MdDesignServices className="text-4xl text-gray-900 dark:text-white" />
                <h3 className="mb-2 pt-5 text-xl font-semibold text-gray-900 dark:text-white">
                  Giao diện trực quan
                </h3>
                <p className="text-sm text-gray-900 dark:text-white">
                  Giao diện đơn giản, đẹp mắt, dễ sử dụng.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg bg-gray-50 shadow hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
              <div className="p-6">
                <CgDarkMode className="text-4xl text-gray-900 dark:text-white" />
                <h3 className="mb-2 pt-5 text-xl font-semibold text-gray-900 dark:text-white">
                  Hỗ trợ Dark Mode
                </h3>
                <p className="text-sm text-gray-900 dark:text-white">
                  Bảo vệ đôi mắt bạn với Dark Mode.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg bg-gray-50 shadow hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
              <div className="p-6">
                <FaMobileAlt className="text-4xl text-gray-900 dark:text-white" />
                <h3 className="mb-2 pt-5 text-xl font-semibold text-gray-900 dark:text-white">
                  Responsive
                </h3>
                <p className="text-sm text-gray-900 dark:text-white">
                  Tương thích trên nhiều thiết bị.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;