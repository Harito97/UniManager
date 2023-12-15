import React from "react";
import { MdDesignServices } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";
import { FaMobileAlt } from "react-icons/fa";

const Features = () => {
  return (
    <>
      <div class="bg-white font-[sans-serif] text-[#333] dark:bg-gray-900">
        <div class="mx-auto max-w-6xl px-4 py-16">
          <h2 class="mb-16 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
            Discover Our Features
          </h2>
          <div class="mx-auto grid grid-cols-1 gap-12 max-md:max-w-md md:grid-cols-2 lg:grid-cols-3">
            <div class="overflow-hidden rounded-lg bg-gray-50 shadow hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
              <div class="p-6">
                <MdDesignServices className="text-4xl text-gray-900 dark:text-white" />
                <h3 class="mb-2 pt-5 text-xl font-semibold text-gray-900 dark:text-white">
                  Giao diện trực quan
                </h3>
                <p class="text-sm text-gray-900 dark:text-white">
                  Giao diện đơn giản, đẹp mắt, dễ sử dụng.
                </p>
              </div>
            </div>
            <div class="overflow-hidden rounded-lg bg-gray-50 shadow hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
              <div class="p-6">
                <CgDarkMode className="text-4xl text-gray-900 dark:text-white" />
                <h3 class="mb-2 pt-5 text-xl font-semibold text-gray-900 dark:text-white">
                  Hỗ trợ Dark Mode
                </h3>
                <p class="text-sm text-gray-900 dark:text-white">
                  Bảo vệ đôi mắt bạn với Dark Mode.
                </p>
              </div>
            </div>
            <div class="overflow-hidden rounded-lg bg-gray-50 shadow hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
              <div class="p-6">
                <FaMobileAlt className="text-4xl text-gray-900 dark:text-white" />
                <h3 class="mb-2 pt-5 text-xl font-semibold text-gray-900 dark:text-white">
                  Responsive
                </h3>
                <p class="text-sm text-gray-900 dark:text-white">
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
