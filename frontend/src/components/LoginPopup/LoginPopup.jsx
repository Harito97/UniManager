import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Background from "../../assets/background.jpg";
import Login from "./Login";
import Forgot from "./Forgot";

const LoginPopup = ({ toggleLoginPopup, loginPopup }) => {
  const [showForgot, setShowForgot] = useState(false);
  const loginPopUpRef = useRef();

  const handleForgot = () => {
    setShowForgot(!showForgot);
  };

  const bgImage = {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  };

  window.addEventListener("click", (e) => {
    if (e.target === loginPopUpRef.current) {
      toggleLoginPopup(false);
    }
  });

  return (
    <>
      {loginPopup && (
        <motion.div
          ref={loginPopUpRef}
          className="fixed top-0 z-50 h-full w-full overflow-y-auto"
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
            transition: {
              duration: 0.4,
            },
          }}
        >
          <div className="absolute left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white shadow-md sm:w-auto">
            <div>
              <div className="relative grid grid-cols-1 items-center gap-4 sm:w-[600px] sm:grid-cols-2 md:w-[700px]">
                {/* Login Form section */}
                {showForgot ? (
                  <Forgot handleForgot={handleForgot} />
                ) : (
                  <Login handleForgot={handleForgot} />
                )}
                {/* Image section section */}
                <div className="w-full rounded-r-2xl" style={bgImage}></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default LoginPopup;
