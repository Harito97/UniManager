import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Background from "./assets/background.jpg";
import LoginPopup from "./components/LoginPopup/LoginPopup";

function App() {
  const [loginPopup, setLoginPopup] = useState(false);

  const toggleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };

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
      <div className={loginPopup ? "bg-black/30 blur-sm" : ""}>
        <div style={bgImage}>
          <NavBar toggleLoginPopup={toggleLoginPopup} />
          <Hero toggleLoginPopup={toggleLoginPopup} />
        </div>
      </div>
      <LoginPopup toggleLoginPopup={toggleLoginPopup} loginPopup={loginPopup} />
    </>
  );
}

export default App;
