import React from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import Logo from "../assets/logo/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center text-center">
            <a href="#">
              <img className="h-7 w-auto" src={Logo} alt="logo" />
            </a>

            <p className="mx-auto mt-4 max-w-md text-gray-500 dark:text-gray-400">
              Một sản phẩm của nhóm 2 - Môn CSDL Web và HTTT
            </p>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-center">
              <button className="order-1 mt-3 flex w-full transform items-center justify-center rounded-md border px-2 py-2 text-sm capitalize tracking-wide text-gray-600 transition-colors duration-300 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-800 sm:mx-2 sm:mt-0 sm:w-auto">
                <FaRegPlayCircle />

                <span className="mx-1">View Demo</span>
              </button>

              <button className="w-full transform rounded-md bg-black px-5 py-2 text-sm capitalize tracking-wide text-white transition-colors duration-300 hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:order-2 sm:mx-2 sm:w-auto">
                <a href="https://github.com/Harito97/UniManager">Source Code</a>
              </button>
            </div>
          </div>

          <hr className="my-10 border-gray-200 dark:border-gray-700" />

          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500">
              © Copyright 2023. All Rights Reserved.
            </p>

            <div className="-mx-2 mt-3 flex sm:mt-0">
              <a
                href="#"
                className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="Reddit"
              >
                {" "}
                Teams{" "}
              </a>

              <a
                href="#"
                className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="Reddit"
              >
                {" "}
                Privacy{" "}
              </a>

              <a
                href="#"
                className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="Reddit"
              >
                {" "}
                Cookies{" "}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
