import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginImg from "../../assets/login.jpg";
import ForgotImg from "../../assets/forgot.jpg";
import Login from "./Login";
import Forgot from "./Forgot";

const LoginPopup = ({ toggleLoginPopup, loginPopup }) => {
  const [showForgot, setShowForgot] = useState(false);

  const handleForgot = () => {
    setShowForgot(!showForgot);
  };

  const loginImage = {
    backgroundImage: `url(${LoginImg})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  };

  const forgotImage = {
    backgroundImage: `url(${ForgotImg})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  };

  return (
    <AnimatePresence>
      {loginPopup && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            className="fixed top-0 h-full w-full bg-black/30 backdrop-blur-sm"
            onClick={() => {
              toggleLoginPopup(false);
              setShowForgot(false);
            }}
          ></motion.div>
          <motion.div
            initial={{
              scale: 0,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: 1,
              x: "-50%",
              y: "-50%",
              transition: {
                duration: 0.3,
              },
            }}
            className="fixed left-1/2 top-1/2 w-[90%] rounded-2xl bg-white shadow-md sm:w-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="relative grid grid-cols-1 items-center gap-4 sm:w-[600px] sm:grid-cols-2 md:w-[700px]"
            >
              {/* Login Form section */}
              {showForgot ? (
                <Forgot handleForgot={handleForgot} />
              ) : (
                <Login handleForgot={handleForgot} />
              )}
              {/* Image section section */}
              <div
                className="w-full rounded-r-2xl"
                style={showForgot ? forgotImage : loginImage}
              ></div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup;
