import React from "react";

const Forgot = ({ handleForgot }) => {
  return (
    <>
      <div className="p-5">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-600">
          QUÊN MẬT KHẨU
        </h1>
        <form action="" className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="input-label">
              Tên đăng nhập:
            </label>
            <input type="text" id="username" className="input" />
          </div>
        </form>
        <button className="mt-7 block w-full rounded-full bg-blue-500 px-5 py-1 text-white hover:bg-blue-500/80">
          Gửi lại mật khẩu
        </button>
        <p
          className="my-3 cursor-pointer text-center text-sm text-gray-500 hover:text-blue-500"
          onClick={() => handleForgot()}
        >
          Đăng nhập?
        </p>
      </div>
    </>
  );
};

export default Forgot;
