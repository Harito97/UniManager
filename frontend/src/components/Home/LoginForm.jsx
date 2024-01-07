import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginImg from "../../assets/Login.gif";
import ForgotImg from "../../assets/Forgot.gif";
import HusLogo from "../../assets/hus-logo.svg";
import Login from "./Login";
import Forgot from "./Forgot";

const LoginPopup = () => {
  const [showForgot, setShowForgot] = useState(false);

  const handleForgot = () => {
    setShowForgot(!showForgot);
  };

  return (
    <>
      <AnimatePresence>
        <div className="flex min-h-screen items-center justify-center backdrop-blur-sm">
          <motion.div
            layout
            className="relative m-6 flex flex-col space-y-8 rounded-2xl bg-white shadow-2xl md:flex-row md:space-y-0"
          >
            <div className="flex flex-col justify-center p-8 md:p-14">
              <a
                href="#"
                class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
              >
                <img class="mr-2 h-8 w-8" src={HusLogo} alt="logo" />
                HUS
              </a>
              {/* Login Form section */}
              {showForgot ? (
                <Forgot handleForgot={handleForgot} />
              ) : (
                <Login handleForgot={handleForgot} />
              )}
              {/* Image section section */}
            </div>
            <div class="relative">
              <img
                src={showForgot ? ForgotImg : LoginImg}
                alt="img"
                class="hidden h-full w-[400px] rounded-r-2xl object-cover md:block"
              />
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default LoginPopup;
