import React, { useState, useEffect } from "react";
import Background from "../assets/background.jpg";
import LoginForm from "../components/Home/LoginForm";
import { useContentContext } from "../context/UserContext";

function Home() {
  const { user, level, openSuccessNotification } = useContentContext();
  if (level !== null) {
    openSuccessNotification("Đăng nhập thành công!", `Welcome back ${user}!`);
    setTimeout(() => {
      if (level === "SV") {
        window.location.replace("/student");
      } else if (level === "GV") {
        window.location.replace("/teacher");
      } else {
        window.location.replace("/admin");
      }
    }, 2000);
  }

  const bgImage = {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
  };

  return (
    <>
      <div style={bgImage}>
        <LoginForm />
      </div>
    </>
  );
}

export default Home;
