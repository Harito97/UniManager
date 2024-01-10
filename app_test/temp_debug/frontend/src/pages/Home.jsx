import React, { useState, useEffect } from "react";
import Background from "../assets/background.jpg";
import LoginForm from "../components/Home/LoginForm";
import { useContentContext } from "../components/Notification/ContentContext";

function Home({ level }) {
  const { openSuccessNotification } = useContentContext();
  if (level !== null) {
    openSuccessNotification(
      "Bạn đã đăng nhập trước đó!",
      `Trang sẽ chuyển hướng sau vài giây...`,
    );
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
        <LoginForm/>
      </div>
    </>
  );
}

export default Home;
